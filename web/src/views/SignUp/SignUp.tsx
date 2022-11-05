import { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Grid, Link, Typography } from '@mui/material';
import RoleForm from '../../components/SignUp/RoleForm';
import UserForm from '../../components/SignUp/UserForm';
import DisclaimerForm from '../../components/SignUp/DisclaimerForm';
import { RoleType } from '../../types';
import { createUser } from '../../services/userService';
import './SignUp.scss';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';

type Props = {
  intl: any;
};

const SignUp = ({ intl }: Props) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  //state for form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userRole: RoleType.PATIENT
  });

  const signUpPages = useMemo(() => {
    return [
      <RoleForm page={page} setPage={setPage} formData={formData} setFormData={setFormData} />,
      <UserForm page={page} setPage={setPage} formData={formData} setFormData={setFormData} />,
      <DisclaimerForm page={page} setPage={setPage} formData={formData} setFormData={setFormData} />
    ];
  }, [formData, page]);

  useEffect(() => {
    //submitted clicked
    if (page >= signUpPages.length) {
      setLoading(true);
      createUser(formData);
      setLoading(false);
      navigate('/');
    }
  }, [page, formData, signUpPages, navigate]);

  const onClickBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Grid container className="sign-up-container">
      <LoadingSpinner isOpen={loading} />
      <Link onClick={onClickBackToLogin}>{intl.formatMessage({ id: 'button.backToLogin' })}</Link>
      {signUpPages[page]}
    </Grid>
  );
};

export default injectIntl(SignUp);
