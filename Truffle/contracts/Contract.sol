// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract  Contract {

    address public admin;
    constructor(){
        admin=msg.sender;
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

    address[]  all_doctors_adresses ;
    address[]  all_patiens_adresses ;

    mapping (address => Doctor)  doctors;
    mapping (address => Patient)  patients;
    mapping (address => MedicalRecord)  MedicalRecords;



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
    )public{
        Doctor memory newDoctor = Doctor({
        first_name: _first_name,    last_name    : _last_name    ,  email : _email,
        specialite: _specialite,    hospital_name: _hospital_name,  wilaya: _wilaya,
        birth_date: _birth_date,    phone        : _phone        ,  gender: _gender
        });
        doctors[_doctorAddress] = newDoctor;
        isDoctor[_doctorAddress]=true;
        all_doctors_adresses.push(_doctorAddress);
    }

    ////////// Create Patient ////////////
    function createPatient(
        address _patientAddress,
        string memory _first_name,
        string memory _last_name,
        string memory _email,
        string memory _wilaya,
        string memory _birth_date,
        string memory _phone,
        string memory _gender
    )public{
        Patient memory newPatient = Patient({
        first_name: _first_name  , last_name : _last_name    ,    email : _email  ,
        wilaya    : _wilaya      , birth_date: _birth_date   ,    phone : _phone  ,
        gender    : _gender
        });
        patients[_patientAddress] = newPatient;
        isPatient[_patientAddress]=true;
        all_patiens_adresses.push(_patientAddress);
    }
    ////////// Create Medical Record ////////////
    function createMedicalRecord (
        address  _patientAddress,
        string memory _blood_type ,
        string memory _height ,
        string memory _weight ,
        string memory _vision_test,
        string [] memory _medical_history,
        string [] memory _diagnostic_tests,
        string [] memory _treatments )
    public{
        MedicalRecord memory newMedicalRecord = MedicalRecord({
        blood_type  : _blood_type ,
        height      : _height ,
        weight      : _weight ,
        vision_test : _vision_test ,
        medical_history:_medical_history,
        diagnostic_tests:_diagnostic_tests,
        treatments:_treatments
        });
        MedicalRecords[_patientAddress]=newMedicalRecord;

    }
    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////         Functions       ///////////////////////////
    function getDoctorsCount() public view returns (uint) {
        return all_doctors_adresses.length;
    }
    function getPatiensCount() public view returns (uint) {
        return all_patiens_adresses.length;
    }





}
