import { injectIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import Background from '../../assets/LandingImage.jpg';
import './LandingPage.scss';
import Footer from '../../components/Footer/Footer';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';
import Login from '../Login/Login';
import { Grid } from '@mui/material';

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
      <MenuBar title={intl.formatMessage({ id: 'global.app_title' })} noBtn={true} />
      <img className="landing-page-background" src={Background} />
      <Grid container className="landing-page-container">
        <Grid item xs={6}></Grid>
        <Grid item xs={6} className="login">
          <Login></Login>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default injectIntl(LandingPage);
