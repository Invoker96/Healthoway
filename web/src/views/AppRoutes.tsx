import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CounsellorHome from './Counsellor/CounsellorHome';
import DoctorHome from './Doctor/DoctorHome';
import Login from './Login/Login';
import ManagerHome from './Manager/ManagerHome';
import PatientHome from './Patient/PatientHome';
import LandingPage from './LandingPage/LandingPage';
import CounsellorAppointments from './CounsellorAppointments/CounsellorAppointments';
import SignUp from './SignUp/SignUp';
import DoctorAppointments from './DoctorAppointments/DoctorAppointments';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="doctorHome" element={<DoctorHome />} />
        <Route path="patientHome" element={<PatientHome />} />
        <Route path="counsellorHome" element={<CounsellorHome />} />
        <Route path="counsellor/appointments" element={<CounsellorAppointments />} />
        <Route path="doctor/appointments" element={<DoctorAppointments />} />
        <Route path="managerHome" element={<ManagerHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
