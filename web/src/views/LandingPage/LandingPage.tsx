import { injectIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import bg from '../../assets/LandingImage.jpg';
import './LandingPage.scss';
import Footer from '../../components/Footer/Footer';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';
import Login from '../Login/Login';
import LoginForm from '../../components/Login/LoginForm';

type Props = {
  intl: any;
};

const LandingPage = ({ intl }: Props) => {
  //clear state on refresh so snack bar is not shown
  window.history.replaceState({}, document.title);

  const location = useLocation();
  const createdUserId = location.state?.id;

  return (
    <>
      {createdUserId && (
        <AppSnackbar
          type="success"
          message={intl.formatMessage({
            id: 'userForm.createUser.success'
          })}
          open={true}
        />
      )}
      <MenuBar
        isLoggedIn={false}
        title={intl.formatMessage({
          id: 'global.empty'
        })}
        noBtn={true}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {' '}
          <img className="bg-img" src={bg}></img>
        </Grid>
        <Grid item xs={6} className="login">
          <Login></Login>
        </Grid>
      </Grid>

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' } }}></Box>
      <Footer />
    </>
  );
};

export default injectIntl(LandingPage);
