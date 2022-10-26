import { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import RoleForm from '../../components/SignUp/RoleForm';
import UserForm from '../../components/SignUp/UserForm';
import { UserType } from '../../types';
import { createUser } from '../../services/userService';

const SignUp = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  //state for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: UserType.PATIENT
  });

  const signUpPages = useMemo(() => {
    return [
      <RoleForm page={page} setPage={setPage} formData={formData} setFormData={setFormData} />,
      <UserForm page={page} setPage={setPage} formData={formData} setFormData={setFormData} />
    ];
  }, [formData, page]);

  useEffect(() => {
    //submitted clicked
    if (page >= signUpPages.length) {
      createUser(formData);
      navigate('/');
    }
  }, [page, formData, signUpPages, navigate]);

  return <Grid>{signUpPages[page]}</Grid>;
};

export default injectIntl(SignUp);
