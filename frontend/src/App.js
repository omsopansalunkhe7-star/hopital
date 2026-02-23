import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import PatientLogin from './components/patient/Login'
import PatientRegister from './components/patient/Register'
import PatientDashboard from './components/patient/dashboard/Dashboard'
import DoctorLogin from './components/doctor/Login'
import DoctorRegister from './components/doctor/Register'
import DoctorDashboard from './components/doctor/dashboard/Dashboard'
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
          <Route path="/patient/dashboard" element={<PatientDashboard />} />

          {/* Doctor Options  */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

           {/* Insurance Company Login  */}
          <Route path="/insurance/login" element={<InsuranceLogin />} />
          <Route path="/insurance/register" element={<InsuranceRegister />} />
          <Route path="/insurance/dashboard" element={<InsuranceDashboard />} />

          {/* Hospital Login  */}
          <Route path="/hospital/login" element={<HospitalLogin />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
