// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    address public admin;

    struct Doctor {
        string firstName;
        string lastName;
        string email;
        string speciality;
        string hospitalName;
        string wilaya;
        string birthDate;
        string phone;
        string gender;
    }

    struct Patient {
        string firstName;
        string lastName;
        string email;
        string wilaya;
        string birthDate;
        string phone;
        string gender;
        string bloodType;
        uint height;
        uint weight;
        string visionTest;
        string[] treatments;
        string[] diagnosticTests;
        string[] medicalHistory;
        mapping(address => bool) allowedDoctors;
    }

    mapping(address => Doctor) public doctors;
    mapping(address => Patient) public patients;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this operation");
        _;
    }

    modifier onlyPatient() {
        require(msg.sender == address(patients[msg.sender]), "Only patient can perform this operation");
        _;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender].email != '', "Only doctor can perform this operation");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createDoctor(string memory _firstName, string memory _lastName, string memory _email, string memory _speciality, string memory _hospitalName, string memory _wilaya, string memory _birthDate, string memory _phone, string memory _gender) public onlyAdmin {
        address doctorAddress = address(bytes20(keccak256(abi.encodePacked(_email))));
        require(doctors[doctorAddress].email == '', "Doctor already exists");

        Doctor memory doctor = Doctor(_firstName, _lastName, _email, _speciality, _hospitalName, _wilaya, _birthDate, _phone, _gender);
        doctors[doctorAddress] = doctor;
    }

    function createPatient(string memory _firstName, string memory _lastName, string memory _email, string memory _wilaya, string memory _birthDate, string memory _phone, string memory _gender, string memory _bloodType, uint _height, uint _weight, string memory _visionTest) public onlyAdmin {
        address patientAddress = address(bytes20(keccak256(abi.encodePacked(_email))));
        require(patients[patientAddress].email == '', "Patient already exists");

        Patient memory patient = Patient(_firstName, _lastName, _email, _wilaya, _birthDate, _phone, _gender, _bloodType, _height, _weight, _visionTest, new string[](0), new string[](0), new string[](0));
        patients[patientAddress] = patient;
    }

    function addTreatment(string memory _treatment) public onlyDoctor {
        Patient storage patient = patients[msg.sender];
        require(patient.allowedDoctors[msg.sender], "You are not allowed to access this patient's records");

        patient.treatments.push(_treatment);
    }

    function addDiagnosticTest(string memory _diagnosticTest) public onlyDoctor {
        Patient storage patient = patients[msg.sender];
        require(patient.allowedDoctors[msg.sender], "You are not allowed to access this patient's records");

        patient.diagnosticTests.push(_diagnosticTest);
    }

    function addMedicalHistory(string memory _medicalHistory) public onlyDoctor {
        Patient storage patient = patients[msg.sender];
        require(patient.allowedDoctors[msg.sender], "You are not allowed to access this patient's records");

        patient.medicalHistory.push(_medicalHistory);
    }

    function getPatient()
    public view onlyPatient returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, uint, uint, string memory, string[] memory, string[] memory, string[] memory) {
        Patient storage patient = patients[msg.sender];
        return (patient.firstName, patient.lastName, patient.email, patient.wilaya, patient.birthDate, patient.phone, patient.gender, patient.bloodType, patient.height, patient.weight, patient.visionTest, patient.treatments, patient.diagnosticTests, patient.medicalHistory);
    }

    function grantAccess(address _doctorAddress) public onlyPatient {
        Patient storage patient = patients[msg.sender];
        patient.allowedDoctors[_doctorAddress] = true;
    }

    function revokeAccess(address _doctorAddress) public onlyPatient {
        Patient storage patient = patients[msg.sender];
        patient.allowedDoctors[_doctorAddress] = false;
    }

    function getPatientsForDoctor() public view onlyDoctor returns (address[] memory) {
        uint count;
        for (uint i = 0; i < patients.length; i++) {
            if (patients[i].allowedDoctors[msg.sender]) {
                count++;
            }
        }

        address[] memory patientAddresses = new address[](count);
        count = 0;
        for (uint i = 0; i < patients.length; i++) {
            if (patients[i].allowedDoctors[msg.sender]) {
                patientAddresses[count] = address(i);
                count++;
            }
        }
        return patientAddresses;
    }
}
