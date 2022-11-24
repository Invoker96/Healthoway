import { injectIntl } from 'react-intl';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from '../../assets/logo.png';
import './MenuBar.scss';
import { Typography } from '@mui/material';
import { getUserName } from '../../services/userInfoService';

type Props = {
  intl: any;
  title: string;
  noBtn: boolean;
};

const MenuBar = ({ intl, title, noBtn }: Props) => {
  const isLoggedIn = Boolean(getUserName());

  const doLogout = () => {
    localStorage.clear();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="sticky">
        <Toolbar className="menu-bar-container">
          <img className="home_logo" src={Image}></img>
          <Typography variant="h6">{title}</Typography>
          <Box>
            {!isLoggedIn && !noBtn ? (
              <>
                <Button variant="outlined" color="secondary" component={Link} to={'/login'}>
                  {intl.formatMessage({
                    id: 'authForm.button.submit'
                  })}
                </Button>
                <Button variant="outlined" color="secondary" component={Link} to={'/register'}>
                  {intl.formatMessage({
                    id: 'authForm.button.signup'
                  })}
                </Button>
              </>
            ) : (
              !noBtn && (
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={'/'}
                  onClick={doLogout}
                >
                  {intl.formatMessage({
                    id: 'authForm.button.logout'
                  })}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default injectIntl(MenuBar);
