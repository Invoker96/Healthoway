import { Grid } from '@mui/material';
import { injectIntl } from 'react-intl';
import RoleForm from '../../components/SignUp/RoleForm';
import UserForm from '../../components/SignUp/UserForm';

const SignUp = () => {
  return (
    <Grid>
      <RoleForm />
      <UserForm />
    </Grid>
  );
};

export default injectIntl(SignUp);
