import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import PatientLogin from './components/patient/Login'
import PatientRegister from './components/patient/Register'
import PatientDashboardLayout from './components/patient/layout/PatientDashboardLayout'
import PatientDashboard from './components/patient/dashboard/pages/PatientDashboard'
import PatientAppointments from './components/patient/dashboard/pages/Appointments'
import PatientRecords from './components/patient/dashboard/pages/Records'
import DoctorLogin from './components/doctor/Login'
import DoctorRegister from './components/doctor/Register'
import DoctorDashboardLayout from './components/doctor/layout/DoctorDashboardLayout'
import DoctorDashboard from './components/doctor/dashboard/pages/Dashboard'
import DoctorAppointments from './components/doctor/dashboard/pages/Appointments'
import DoctorPatients from './components/doctor/dashboard/pages/Patients'
import InsuranceLogin from './components/insurance/Login'
import InsuranceRegister from './components/insurance/Register'
import InsuranceDashboard from './components/insurance/dashboard/Dashboard'
import HospitalLogin from './components/hospital/Login'
import HospitalDashboard from "./pages/HospitalDashboard";

function App() {
  return (
    <div className="App min-h-screen">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* Patient Options  */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/patient" element={<PatientDashboardLayout />}>
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="records" element={<PatientRecords />} />
          </Route>

          {/* Doctor Options  */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
          <Route path="/doctor" element={<DoctorDashboardLayout />}>
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="patients" element={<DoctorPatients />} />
          </Route>

           {/* Insurance Company Login  */}
          <Route path="/insurance/login" element={<InsuranceLogin />} />
          <Route path="/insurance/register" element={<InsuranceRegister />} />
          <Route path="/insurance/dashboard" element={<InsuranceDashboard />} />

          {/* Hospital Login  */}
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
