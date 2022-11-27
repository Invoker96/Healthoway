import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AppBar, Grid, Box, Toolbar, Button, Typography, IconButton, Avatar } from '@mui/material';
import {
  LogoutOutlined,
  LocalHospitalOutlined,
  MasksOutlined,
  PsychologyAltOutlined,
  AdminPanelSettingsOutlined
} from '@mui/icons-material';
import { getUserName, getUserRole, getFullName } from '../../services/userInfoService';
import Image from '../../assets/logo.png';
import './MenuBar.scss';
import { indigo } from '@mui/material/colors';

type Props = {
  intl: any;
  title: string;
  noBtn: boolean;
};

const MenuBar = ({ intl, title, noBtn }: Props) => {
  const isLoggedIn = Boolean(getUserName());
  const userRole = getUserRole();

  const MENU_ITEMS = {
    Patient: [
      {
        id: 'dashboard',
        link: '/patient/home'
      }
    ],
    Counsellor: [
      {
        id: 'dashboard',
        link: '/counsellor/home'
      },
      {
        id: 'myAppointments',
        link: '/counsellor/appointments'
      }
    ],
    Doctor: [
      {
        id: 'dashboard',
        link: '/doctor/home'
      },
      {
        id: 'myAppointments',
        link: '/doctor/appointments'
      }
    ],
    Manager: [
      {
        id: 'dashboard',
        link: '/manager/home'
      },
      { id: 'manageUsers', link: '/manager/users' },
      { id: 'viewReports', link: '/manager/reports' }
    ]
  };

  const doLogout = () => {
    localStorage.clear();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="sticky">
        <Toolbar className="menu-bar-container">
          <Grid container alignItems="center">
            <img className="home_logo" src={Image}></img>
            {isLoggedIn &&
              userRole &&
              (MENU_ITEMS as any)[userRole].map((nav: any) => (
                <Typography className="menu-bar-link" component={Link} to={nav.link}>
                  {intl.formatMessage({ id: `navigation.${nav.id}` })}
                </Typography>
              ))}
          </Grid>
          <Grid container>
            {isLoggedIn && (
              <Grid container className="userProfile-container end-container">
                <Avatar sx={{ bgcolor: indigo[100], width: '30px', height: '30px' }}>
                  {userRole === 'Doctor' && <LocalHospitalOutlined color="primary" />}
                  {userRole === 'Counsellor' && <PsychologyAltOutlined color="primary" />}
                  {userRole === 'Patient' && <MasksOutlined color="primary" />}
                  {userRole === 'Manager' && <AdminPanelSettingsOutlined color="primary" />}
                </Avatar>
                <Typography>{getFullName()}</Typography>
                <IconButton color="secondary" component={Link} to={'/'} onClick={doLogout}>
                  <LogoutOutlined />
                </IconButton>
              </Grid>
            )}
            {!isLoggedIn && !noBtn && (
              <Grid container className="end-container">
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
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default injectIntl(MenuBar);
