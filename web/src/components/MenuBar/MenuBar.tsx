import { injectIntl } from 'react-intl';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from '../../assets/logo.png';
import './MenuBar.scss';

type Props = {
  intl: any;
};

const MenuBar = ({ intl }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' } }}>
            <img className="home_logo" src={Image}></img>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button className="actionBtn" variant="contained" component={Link} to={'/login'}>
              {intl.formatMessage({
                id: 'authForm.button.submit'
              })}
            </Button>
            <Button className="actionBtn" variant="contained" component={Link} to={'/register'}>
              {intl.formatMessage({
                id: 'authForm.button.signup'
              })}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default injectIntl(MenuBar);
