import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AppBar, Grid, Box, Toolbar, Button, Typography } from '@mui/material';
import { getUserName, getUserRole } from '../../services/userInfoService';
import Image from '../../assets/logo.png';
import './MenuBar.scss';

type Props = {
  intl: any;
  title: string;
  noBtn: boolean;
};

const MenuBar = ({ intl, title, noBtn }: Props) => {
  const isLoggedIn = Boolean(getUserName());
  const userRole = getUserRole();

  const menuItems = {
    Patient: [
      {
        id: 'myAppointments',
        link: 'appointments'
      }
    ],
    Counsellor: [
      {
        id: 'myAppointments',
        link: 'appointments'
      }
    ],
    Doctor: [
      {
        id: 'myAppointments',
        link: 'appointments'
      }
    ],
    Admin: [
      { id: 'manageUsers', link: 'users' },
      { id: 'viewReports', link: 'reports' }
    ]
  };

  const doLogout = () => {
    localStorage.clear();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="sticky">
        <Toolbar className="menu-bar-container">
          <img className="home_logo" src={Image}></img>
          <Typography variant="h6">{title}</Typography>
          <Grid>
            {isLoggedIn && (
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
            )}
            {!isLoggedIn && !noBtn && (
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
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default injectIntl(MenuBar);
