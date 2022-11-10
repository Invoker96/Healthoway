import { Link } from 'react-router-dom';

import { Grid } from '@mui/material';
import LoginForm from '../../components/Login/LoginForm';
import { useMemo, useState } from 'react';
import img from '../../assets/logo.png';
import './Login.scss';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const loginPage = useMemo(() => {
    return [<LoginForm formData={formData} setFormData={setFormData} />];
  }, [formData]);

  return (
    <Grid container direction="column" className="sign-up-container">
      <img src={img} className="logo" height="230" width="230" />
      {loginPage}
    </Grid>
  );
};

export default Login;
