import { useState } from 'react';
import { Grid } from '@mui/material';
import { injectIntl } from 'react-intl';
import RoleForm from '../../components/SignUp/RoleForm';
import UserForm from '../../components/SignUp/UserForm';

const SignUp = () => {
  const [page, setPage] = useState(0);

  const signUpPages = [
    <RoleForm page={page} setPage={setPage} />,
    <UserForm page={page} setPage={setPage} />
  ];

  return <Grid>{signUpPages[page]}</Grid>;
};

export default injectIntl(SignUp);
