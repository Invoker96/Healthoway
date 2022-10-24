import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

const Login = () => {
  return (
    <Button component={Link} to={'/register'}>
      Sign up
    </Button>
  );
};

export default Login;
