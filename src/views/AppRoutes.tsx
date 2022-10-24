import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
