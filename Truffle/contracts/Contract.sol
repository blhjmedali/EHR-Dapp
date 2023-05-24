// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract  Contract {

    address public admin;

    constructor(){
        admin=msg.sender;
        isAdmin[admin]=true;
        ////////////////////////////////
        createDoctor(0xff640B68F773729E8A352cCa92888dc3535dB90d,"Mahboubi","Houssem","Houssem@gmail.com","Generalist","USTO","Oran","02/05/2000","0788996655","Male","2023");
        createDoctor(0x695553ff7eAAdb81BCeb8DEEE24118dC36c486AF,"Ferkach","Zaki","zaki@gmail.com","cardiologue","SBA","EL-BAYADH","12/12/2000","0788996655","Male","2022");

        createPatient(0x9fE7AF5782D9bf27ECC304EE6ED34c0FF97b9eE0,"Belhadj","Mohamed Ali","blhj.medali@gmail.com"," El-Bayadh","25/10/2000","0788996655","male","2023")  ;
        createPatient(0xb5b6d0E2C523ec14618D44F9AFB73195414F8786,"Aibout","Sidahmed","sidou23@hotmail.com"," Saida","10/11/2001","0788996655","male","2020")  ;

        CreateCompany(0x7cC31808e194EBb20429DF1FCC8056aa18062835, "CNAS","EL-BAYADH","0491234","cnas@mail.com","www.cnas.com","assurance company 1" )  ;
        CreateCompany(0xA3bd68241A59379646109a7b399450d3E8dA1FD8, "CASNOS","SAIDA","0491234","casnos@mail.com","www.casnos.com","assurance company 2" )  ;
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
        string join_date ;
    }
    struct Patient{
        string first_name ;
        string last_name ;
        string email ;
        string wilaya ;
        string birth_date ;
        string phone ;
        string gender ;
        string join_date ;
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

    address[]  all_doctors_adresses ;    //****
    address[]  all_patiens_adresses ;    //****

    mapping (address => Doctor) public doctors;
    mapping (address => Patient) public patients;
    mapping (address => MedicalRecord) public  medicalRecords;

    mapping (address => mapping(address => bool ) ) appreovedDoctors ;  // P_adr =>( D_adr => bool )
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
        string memory _gender,
        string memory _join_date
    )public onlyAdmin {
        Doctor memory newDoctor = Doctor({
            first_name: _first_name,    last_name    : _last_name    ,  email : _email,
            specialite: _specialite,    hospital_name: _hospital_name,  wilaya: _wilaya,
            birth_date: _birth_date,    phone        : _phone        ,  gender: _gender,
            join_date : _join_date
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
        string memory _gender,
        string memory _join_date

    )public onlyAdmin {
        Patient memory newPatient = Patient({
            first_name: _first_name  , last_name : _last_name    ,    email : _email  ,
            wilaya    : _wilaya      , birth_date: _birth_date   ,    phone : _phone  ,
            gender    : _gender      , join_date : _join_date
        });
        patients[_patientAddress] = newPatient;
        isPatient[_patientAddress]=true;
        all_patiens_adresses.push(_patientAddress);
        //string []memory emptyStr = new string[](0);
        //createMedicalRecord(_patientAddress ,"","","","",emptyStr,emptyStr,emptyStr );
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
    public onlyDoctor {
        require(isPatient[_patientAddress]  , "This is not a patient address wla not registred");
        //require(isPatient[_patientAddress]  , "This is not a patient address wla not registred");
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
    }                                                                                                   //        /\       //
    function getPatieninfo(address _adr) public view returns (Patient memory) {                         //       //\\      //
        return patients[_adr];                                                                          //      ///\\\     //
    }                                                                                                   //     ////\\\\    //
                                                                                                        //    /////\\\\\   //
    function getMedicalRecordinfo(address _adr) public view returns (MedicalRecord memory) {            //   /////()\\\\\  //
        require(!appreovedDoctors[msg.sender][_adr] , "This not your patient !"); //   \\\\|()|////  //
        return medicalRecords[_adr];                                                                    //   ////    \\\\  //
    }                                                                                                   //  ////||||||\\\\ //


    //// get count
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

        array_of_patient = deleteFromArray( msg.sender , array_of_patient ); // delete patient from List of patients of Doctor
        myPations[_doctor_address] = array_of_patient;
    }

    function getMyDoctors() public onlyPatient view returns  (address[] memory)  {
        address[] memory myDoctorsList = new address[](0);
        address[] memory allDoctors = getAllDoctorAddresses();

        for (uint i = 0; i < allDoctors.length ; i++) {
            if(appreovedDoctors[msg.sender][all_doctors_adresses[i]]){
                myDoctorsList = _addDoctor(myDoctorsList, allDoctors[i]);
            }
        }
        return myDoctorsList ;
    }





    //////////////////////////////////////////////////////////////////////////////////////
    // For Doctor
    function getMyPatientsCount ()public view onlyDoctor returns(uint){
        return myPations[msg.sender].length   ;
    }
    function getAddressesOfMyPatiens ()public  view onlyDoctor returns(address [] memory){
        return myPations[msg.sender]   ;
    }




    // *****  Functions for code
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

        return newArray; // n7tajha fi dasapproveDoctor()
    }

    function _addDoctor(address[] memory doctorsList, address doctor) private pure returns (address[] memory) {
        uint256 newLength = doctorsList.length + 1;
        address[] memory newDoctorsList = new address[](newLength);

        for (uint256 i = 0; i < doctorsList.length; i++) {
            newDoctorsList[i] = doctorsList[i];
        }

        newDoctorsList[newLength - 1] = doctor;
        return newDoctorsList; // n7tajha fi getMyDoctors
    }

    function exist(address _addr , address[] memory _arr) private pure returns(bool){
        for (uint i=0 ; i<_arr.length ; i++){
            if(_arr[i] == _addr){
                return true ;
            }
        }
        return false ; // if address kayna fi address[]
    }



    function whoIam() public view returns (address){
        return msg.sender;
    }
    /////////////////////////////////////////////////////////////////////////////////

    struct CompanyAs {
        string company_name;
        string location ;
        string number ;
        string email ;
        string website ;
        string description ;
    }

    mapping (address => bool) public isCompanyAs ;              //// 2
    mapping (address => CompanyAs) private  companyAs;          ////  2
    mapping (address => mapping(address => bool ) ) allowedCompanies ;  // P_adr =>( C_adr => bool )
    mapping (address => address[] ) myCustomers ;      // List of the company customers


    function CreateCompany (
        address _companyAddress,
        string memory _company_name,
        string memory _location,
        string memory _number,
        string memory _email,
        string memory _website,
        string memory _description
    )public{
        CompanyAs memory newCompany = CompanyAs(
            _company_name   ,
            _location ,
            _number   ,
            _email    ,
            _website  ,
            _description);

        companyAs[_companyAddress]=newCompany ;
        isCompanyAs[_companyAddress] = true ;
    }

    function getCompanyinfo(address _adr) public view returns (CompanyAs memory) {
        return companyAs[_adr];
    }
    function getAddressesOfMyCustomers ()public  view  returns(address [] memory){
        //require(!isCompanyAs[msg.sender]  , "Only company can perform this operation");
        return myCustomers[msg.sender]   ;
    }


    //mapping (address => address[] ) joinRequests ;    // yerselha customer ll Company
    function allow(address _company_address) public {
        //require(isPatient[msg.sender] , "Only Patient can allow company");
        //require(isCompanyAs[_company_address] , "This address doesn't belong to a Company");
        require(!allowedCompanies[msg.sender][_company_address],"You already allow this comp to see your medical record" );

        allowedCompanies[msg.sender][_company_address]=true;
        myCustomers[_company_address].push(msg.sender);
    }
    function disAllow (address _comp_address) public  {
        address[] memory array_of_customers  = myCustomers[_comp_address];

        require(allowedCompanies[msg.sender][_comp_address] ,"Not approved");
        //require(exist(msg.sender,array_of_customers) , "Doesn't exist in List of patiens of that Doctor" );

        allowedCompanies[msg.sender][_comp_address]=false ;                // delete Company from approved doctors list

        array_of_customers = deleteFromArray( msg.sender , array_of_customers ); // delete patient from List of patients of Company
        myCustomers[_comp_address] = array_of_customers;
    }




    /////////////////////////////////////////////////////////////////////////////////



}
