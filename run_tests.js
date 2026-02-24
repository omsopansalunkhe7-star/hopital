const axios = require('axios');

const baseUrl = 'http://localhost:5000';

const state = {
    patient: { email: `patient_${Date.now()}@test.com`, password: 'password123', sessionKey: null },
    doctor: { email: `doctor_${Date.now()}@test.com`, password: 'password123', sessionKey: null },
    hospital: { email: `hospital_${Date.now()}@test.com`, password: 'password123', sessionKey: null },
    insurance: { email: `insurance_${Date.now()}@test.com`, password: 'password123', sessionKey: null },
    admin: { email: 'admin@hospital.com', password: 'admin123', sessionKey: null }
};

const results = { passed: 0, failed: 0 };

async function test(name, fn) {
    try {
        await fn();
        console.log(`✅ PASS: ${name}`);
        results.passed++;
    } catch (error) {
        console.log(`❌ FAIL: ${name} -> ${error.response?.data?.message || error.message}`);
        results.failed++;
    }
}

async function runTests() {
    console.log("🚀 Starting API Integration Tests...\n");

    // --- PATIENT TESTS ---
    await test("Register Patient", () => axios.post(`${baseUrl}/patient/register`, { email: state.patient.email, password: state.patient.password }));
    await test("Login Patient", async () => {
        const res = await axios.post(`${baseUrl}/patient/login`, { email: state.patient.email, password: state.patient.password });
        state.patient.sessionKey = res.data.sessionKey;
    });
    await test("Patient Session Check", () => axios.post(`${baseUrl}/patient/session`, { email: state.patient.email, sessionKey: state.patient.sessionKey }));
    await test("Update Patient Profile", () => axios.post(`${baseUrl}/patient/profile`, {
        email: state.patient.email,
        sessionKey: state.patient.sessionKey,
        name: "Test Patient",
        mobile: "1234567890",
        gender: "Male",
        DOB: "1995-01-01",
        address: "123 Test St"
    }));

    // --- DOCTOR TESTS ---
    await test("Register Doctor", () => axios.post(`${baseUrl}/doctor/register`, { email: state.doctor.email, password: state.doctor.password }));
    await test("Login Doctor", async () => {
        const res = await axios.post(`${baseUrl}/doctor/login`, { email: state.doctor.email, password: state.doctor.password });
        state.doctor.sessionKey = res.data.sessionKey;
    });
    await test("Doctor Session Check", () => axios.post(`${baseUrl}/doctor/session`, { email: state.doctor.email, sessionKey: state.doctor.sessionKey }));
    await test("Update Doctor Profile", () => axios.post(`${baseUrl}/doctor/profile`, {
        email: state.doctor.email,
        sessionKey: state.doctor.sessionKey,
        name: "Dr. Test",
        registration: "REG999",
        degree: "MD",
        fees: "1000",
        mobile: "9876543210"
    }));

    // --- HOSPITAL TESTS ---
    await test("Register Hospital", () => axios.post(`${baseUrl}/hospital/register`, { email: state.hospital.email, password: state.hospital.password }));
    await test("Login Hospital", async () => {
        const res = await axios.post(`${baseUrl}/hospital/login`, { email: state.hospital.email, password: state.hospital.password });
        state.hospital.sessionKey = res.data.sessionKey;
    });
    await test("Hospital Session Check", () => axios.post(`${baseUrl}/hospital/session`, { email: state.hospital.email, sessionKey: state.hospital.sessionKey }));

    // --- INSURANCE TESTS ---
    await test("Register Insurance", () => axios.post(`${baseUrl}/insurance/register`, { email: state.insurance.email, password: state.insurance.password }));
    await test("Login Insurance", async () => {
        const res = await axios.post(`${baseUrl}/insurance/login`, { email: state.insurance.email, password: state.insurance.password });
        state.insurance.sessionKey = res.data.sessionKey;
    });
    await test("Insurance Session Check", () => axios.post(`${baseUrl}/insurance/session`, { email: state.insurance.email, sessionKey: state.insurance.sessionKey }));

    // --- DOCTOR ADDS REPORT TO PATIENT ---
    await test("Doctor Add Medical Report", () => axios.post(`${baseUrl}/doctor/add-report`, {
        doctorEmail: state.doctor.email,
        sessionKey: state.doctor.sessionKey,
        patientEmail: state.patient.email,
        name: "Heart Rate",
        value: "72 bpm"
    }));

    // --- ADMIN TESTS ---
    await test("Admin Login", async () => {
        const res = await axios.post(`${baseUrl}/admin/login`, { email: state.admin.email, password: state.admin.password });
        state.admin.sessionKey = res.data.sessionKey;
    });
    
    const adminHeaders = { headers: { 'admin-session-key': state.admin.sessionKey } };
    await test("Admin Get All Patients", () => axios.get(`${baseUrl}/admin/patients`, adminHeaders));
    await test("Admin Get All Doctors", () => axios.get(`${baseUrl}/admin/doctors`, adminHeaders));
    await test("Admin Get All Hospitals", () => axios.get(`${baseUrl}/admin/hospitals`, adminHeaders));
    await test("Admin Get All Insurances", () => axios.get(`${baseUrl}/admin/insurances`, adminHeaders));

    console.log("\n--- TEST SUMMARY ---");
    console.log(`Total Tests Passed: ${results.passed}`);
    console.log(`Total Tests Failed: ${results.failed}`);
    console.log("--------------------");
}

runTests();