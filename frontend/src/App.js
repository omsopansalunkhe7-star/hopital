import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import PatientLogin from './components/patient/Login'
import PatientRegister from './components/patient/Register'
import PatientDashboardLayout from './components/patient/layout/PatientDashboardLayout'
import PatientDashboard from './components/patient/dashboard/pages/PatientDashboard'
import PatientAppointments from './components/patient/dashboard/pages/Appointments'
import PatientProfile from './components/patient/dashboard/pages/Profile'
import PatientPrescriptions from './components/patient/dashboard/pages/Prescriptions'
import PatientBookAppointment from './components/patient/dashboard/pages/BookAppointment'
import LabReports from './components/patient/dashboard/pages/LabReports'
import TreatmentHistory from './components/patient/dashboard/pages/TreatmentHistory'
import DoctorLogin from './components/doctor/Login'
import DoctorRegister from './components/doctor/Register'
import DoctorDashboardLayout from './components/doctor/layout/DoctorDashboardLayout'
import DoctorDashboard from './components/doctor/dashboard/pages/DoctorDashboard'
import DoctorAppointments from './components/doctor/dashboard/pages/DoctorAppointments'
import DoctorPatients from './components/doctor/dashboard/pages/DoctorPatients'
import DoctorProfile from './components/doctor/dashboard/pages/DoctorProfile'
import DoctorDocuments from './components/doctor/dashboard/pages/DoctorDocuments'
import HospitalLogin from './components/hospital/Login'
import HospitalRegister from './components/hospital/Register'
import HospitalDashboardLayout from './components/hospital/layout/HospitalDashboardLayout'
import HospitalDashboard from './components/hospital/dashboard/pages/HospitalDashboard'
import HospitalDoctors from './components/hospital/dashboard/pages/HospitalDoctors'
import HospitalPatients from './components/hospital/dashboard/pages/HospitalPatients'
import HospitalAppointments from './components/hospital/dashboard/pages/HospitalAppointments'
import HospitalProfile from './components/hospital/dashboard/pages/HospitalProfile'
import PatientRecords from './components/hospital/dashboard/pages/PatientRecords'
import DoctorManagement from './components/hospital/dashboard/pages/DoctorManagement'
import HospitalDocuments from './components/hospital/dashboard/pages/HospitalDocuments'
import InsuranceLogin from './components/insurance/Login'
import InsuranceRegister from './components/insurance/Register'
import InsuranceDashboardLayout from './components/insurance/layout/InsuranceDashboardLayout'
import InsuranceDashboard from './components/insurance/dashboard/pages/InsuranceDashboard'
import InsuranceClaims from './components/insurance/dashboard/pages/InsuranceClaims'
import InsurancePatients from './components/insurance/dashboard/pages/InsurancePatients'
import InsuranceProfile from './components/insurance/dashboard/pages/InsuranceProfile'
import InsuranceDocuments from './components/insurance/dashboard/pages/InsuranceDocuments'
import ForgotPassword from './components/ForgotPassword'
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
    <div className="App min-h-screen">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/forget" element={<ForgotPassword />} />

          {/* Patient Options  */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/patient" element={<PatientDashboardLayout />}>
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="prescriptions" element={<PatientPrescriptions />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="book-appointment" element={<PatientBookAppointment />} />
            <Route path="lab-reports" element={<LabReports />} />
            <Route path="treatment-history" element={<TreatmentHistory />} />
          </Route>

          {/* Doctor Options  */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
          <Route path="/doctor" element={<DoctorDashboardLayout />}>
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="patients" element={<DoctorPatients />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="documents" element={<DoctorDocuments />} />
          </Route>

          {/* Hospital Options  */}
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/hospital/register" element={<HospitalRegister />} />
          <Route path="/hospital" element={<HospitalDashboardLayout />}>
            <Route path="dashboard" element={<HospitalDashboard />} />
            <Route path="doctors" element={<HospitalDoctors />} />
            <Route path="patients" element={<HospitalPatients />} />
            <Route path="appointments" element={<HospitalAppointments />} />
            <Route path="profile" element={<HospitalProfile />} />
            <Route path="patient-records" element={<PatientRecords />} />
            <Route path="doctor-management" element={<DoctorManagement />} />
            <Route path="documents" element={<HospitalDocuments />} />
          </Route>

          {/* Insurance Company Options  */}
          <Route path="/insurance/login" element={<InsuranceLogin />} />
          <Route path="/insurance/register" element={<InsuranceRegister />} />
          <Route path="/insurance" element={<InsuranceDashboardLayout />}>
            <Route path="dashboard" element={<InsuranceDashboard />} />
            <Route path="claims" element={<InsuranceClaims />} />
            <Route path="patients" element={<InsurancePatients />} />
            <Route path="profile" element={<InsuranceProfile />} />
            <Route path="documents" element={<InsuranceDocuments />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
