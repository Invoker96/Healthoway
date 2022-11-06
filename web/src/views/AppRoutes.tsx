import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CounsellorHome from './Counsellor/CounsellorHome';
import DoctorHome from './Doctor/DoctorHome';
import Login from './Login/Login';
import ManagerHome from './Manager/ManagerHome';
import PatientHome from './Patient/PatientHome';
import LandingPage from './LandingPage/LandingPage';
import CounsellorAppointments from './CounsellorAppointments/CounsellorAppointments';
import SignUp from './SignUp/SignUp';
import DoctorAppointments from './DoctorAppointments/DoctorAppointments';
import SelfAssessmentForm from './Patient/SelfAssessmentForm';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="doctor" element={<DoctorHome />}>
          <Route path="home" element={<DoctorHome />} />
          <Route path="appointments" element={<DoctorAppointments />} />
        </Route>
        <Route path="patient">
          <Route path="home" element={<PatientHome />} />
          <Route path="selfAssessment" element={<SelfAssessmentForm />} />
        </Route>
        <Route path="counsellor">
          <Route path="home" element={<CounsellorHome />} />
          <Route path="appointments" element={<CounsellorAppointments />} />
        </Route>
        <Route path="manager">
          <Route path="home" element={<ManagerHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
