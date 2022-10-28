import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CounsellorHome from './Counsellor/CounsellorHome';
import DoctorHome from './Doctor/DoctorHome';
import Login from './Login/Login';
import ManagerHome from './Manager/ManagerHome';
import PatientHome from './Patient/PatientHome';
import LandingPage from './LandingPage/LandingPage';
import SignUp from './SignUp/SignUp';

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
        <Route path="managerHome" element={<ManagerHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
