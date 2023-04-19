// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract  Contract {

    address public admin;

    constructor(){
        admin=msg.sender;
        isAdmin[admin]=true;
        //////////////////
        createDoctor(0xff640B68F773729E8A352cCa92888dc3535dB90d,"first_name of Doctor","last_name of Doctor","email of Doctor","specialite of Doctor","hospital_name of Doctor","wilaya of Doctor","birth_date of Doctor","phone of Doctor","gender of Doctor");
        createDoctor(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db ,"doc2","doc2","doc2","doc2","doc2","doc2","doc2","doc2","doc2");

        createPatient(0x695553ff7eAAdb81BCeb8DEEE24118dC36c486AF,"pat1","pat12","pat13","pat14","pat15","pat16","pat17")  ;
        createPatient(0x583031D1113aD414F02576BD6afaBfb302140225,"pat2","pat2","pat2","pat2","pat2","pat2","pat2")  ;
    }



    struct Doctor{
        string first_name ;
        string last_name ;
        string email ;
        string specialite ;
        string hospital_name ;
        string wilaya ;
        string birth_date ;
        string phone ;
        string gender ;
    }
    struct Patient{
        string first_name ;
        string last_name ;
        string email ;
        string wilaya ;
        string birth_date ;
        string phone ;
        string gender ;
    }
    struct MedicalRecord{
        string blood_type ;
        string height ;
        string weight ;
        string vision_test ;
        string [] medical_history;
        string [] diagnostic_tests;
        string [] treatments;
    }
    mapping (address => bool) public isDoctor;
    mapping (address => bool) public isPatient;
    mapping (address => bool) public isAdmin;

    address[]  all_doctors_adresses ;
    address[]  all_patiens_adresses ;

    mapping (address => Doctor) public doctors;
    mapping (address => Patient) public patients;
    mapping (address => MedicalRecord) public  medicalRecords;

    mapping (address => mapping(address => bool ) ) appreovedDoctors ;
    mapping (address => address[] ) myPations ;

    mapping (address => address[] ) doctorsHistory ;

    ///////////////////////////////////////////////////////////////////////////////
    modifier onlyAdmin() {
        require(msg.sender == admin   , "Only admin can perform this operation");
        _;
    }
    modifier onlyDoctor() {
        require(isDoctor[msg.sender]  , "Only Doctor can perform this operation");
        _;
    }
    modifier onlyPatient() {
        require(isPatient[msg.sender] , "Only Patient can perform this operation");
        _;
    }
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////// Create Doctor ////////////////////////////////
    function createDoctor(
        address _doctorAddress,
        string memory _first_name,
        string memory _last_name,
        string memory _email,
        string memory _specialite,
        string memory _hospital_name,
        string memory _wilaya,
        string memory _birth_date,
        string memory _phone,
        string memory _gender
    )public onlyAdmin {
        Doctor memory newDoctor = Doctor({
            first_name: _first_name,    last_name    : _last_name    ,  email : _email,
            specialite: _specialite,    hospital_name: _hospital_name,  wilaya: _wilaya,
            birth_date: _birth_date,    phone        : _phone        ,  gender: _gender
        });
        doctors[_doctorAddress] = newDoctor;
        isDoctor[_doctorAddress]=true;
        all_doctors_adresses.push(_doctorAddress);
    }

    ////////////////////////////// Create Patient //////////////////////////////
    function createPatient(
        address _patientAddress,
        string memory _first_name,
        string memory _last_name,
        string memory _email,
        string memory _wilaya,
        string memory _birth_date,
        string memory _phone,
        string memory _gender
    )public onlyAdmin {
        Patient memory newPatient = Patient({
            first_name: _first_name  , last_name : _last_name    ,    email : _email  ,
            wilaya    : _wilaya      , birth_date: _birth_date   ,    phone : _phone  ,
            gender    : _gender
        });
        patients[_patientAddress] = newPatient;
        isPatient[_patientAddress]=true;
        all_patiens_adresses.push(_patientAddress);
        string []memory emptyStr = new string[](0);
        createMedicalRecord(_patientAddress ,"","","","",emptyStr,emptyStr,emptyStr );
    }
    ////////////////////////////// Create Medical Record //////////////////////////////
    function createMedicalRecord (
        address  _patientAddress,
        string memory _blood_type ,
        string memory _height ,
        string memory _weight ,
        string memory _vision_test,
        string [] memory _medical_history,
        string [] memory _diagnostic_tests,
        string [] memory _treatments )
    public /*onlyDoctor*/ {
        require(isPatient[_patientAddress]  , "This is not a patient address wla not registred");
        MedicalRecord memory newMedicalRecord = MedicalRecord({
            blood_type  : _blood_type ,
            height      : _height ,
            weight      : _weight ,
            vision_test : _vision_test ,
            medical_history:_medical_history,
            diagnostic_tests:_diagnostic_tests,
            treatments:_treatments
        });

        medicalRecords[_patientAddress]=newMedicalRecord;

    }
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////         Functions       //////////////////////////////
    //// get addresses
    function getAllDoctorAddresses() public view returns (address[] memory) {
        return all_doctors_adresses;
    }

    function getAllPatientAddresses() public view returns (address[] memory) {
        return all_patiens_adresses;
    }
    //// get info
    function getDoctorinfo(address _adr) public view returns (Doctor memory) {
        return doctors[_adr];
    }
    function getPatieninfo(address _adr) public view returns (Patient memory) {
        return patients[_adr];
    }
    //////////////////////////////////////////////////////////////////////////////////////
    function getDoctorsCount() public view returns (uint) {
        return all_doctors_adresses.length;
    }
    function getPatiensCount() public view returns (uint) {
        return all_patiens_adresses.length;
    }
    //////////////////////////////////////////////////////////////////////////////////////
    //// For Patient
    // Patient add the address of the Doctor to Allow him
    function approveDoctor(address _doctor_address) public {
        require(isPatient[msg.sender] , "Only Patient can add approved Dorctor");
        require(isDoctor[_doctor_address] , "This address doesn't belong to a Doctor");
        require(!appreovedDoctors[msg.sender][_doctor_address],"You already approve this doc" );

        appreovedDoctors[msg.sender][_doctor_address]=true;
        myPations[_doctor_address].push(msg.sender);
    }

    function disapproveDoctor (address _doctor_address) public  {
        address[] memory array_of_patient  = myPations[_doctor_address];

        require(appreovedDoctors[msg.sender][_doctor_address] ,"Not approved");
        require(exist(msg.sender,array_of_patient) , "Doesn't exist in List of patiens of that Doctor" );


        appreovedDoctors[msg.sender][_doctor_address]=false ;                // delete Doctor from approved doctors list

        array_of_patient = deleteFromArray( msg.sender , array_of_patient ); // delete patient from List of patient of Doctor
        myPations[_doctor_address] = array_of_patient;
    }



    //////////////////////////////////////////////////////////////////////////////////////
    // For Doctor
    function getMyPatientsCount ()public view onlyDoctor returns(uint){
        return myPations[msg.sender].length   ;
    }
    function getAddressesOfMyPatiens ()public  view onlyDoctor returns(address [] memory){
        return myPations[msg.sender]   ;
    }

    function getPatientName(address _adr) public view returns(string memory){
        //Patient memory p =
        return getPatieninfo(_adr).first_name;
    }

    function getMyPatientsNames ()public view onlyDoctor returns(string [] memory){
        address [] memory addresses = getAddressesOfMyPatiens();
        string [] memory names ;

        for (uint i= 0 ; i< addresses.length ; i++){
            names[i]= getPatieninfo(addresses[i]).first_name;
        }
        return names ;
    }










    // Functions for code
    function deleteFromArray(address _addr , address[] memory _arr) private pure returns(address[] memory ) {
        uint indexToRemove = _arr.length ;
        address [] memory newArray = new address[](_arr.length-1); //
        // get index of item ( indexToRemove )
        for (uint i=0 ; i<_arr.length ; i++){
            if(_arr[i] == _addr){
                indexToRemove = i ;
                break;
            }
        }
        // bdal blays f Array
        for(uint j = indexToRemove ; j<_arr.length-1  ; j++){
            _arr[j]=_arr[j+1];
        }
        // 3mar Array jdida
        for (uint k = 0 ;  k <_arr.length-1 ; k++ ){
            newArray[k]= _arr[k];
        }

        return newArray;
    }

    function exist(address _addr , address[] memory _arr) private pure returns(bool){
        for (uint i=0 ; i<_arr.length ; i++){
            if(_arr[i] == _addr){
                return true ;
            }
        }
        return false ;
    }



    function whoIam() public view returns (address){
        return msg.sender;
    }




}
