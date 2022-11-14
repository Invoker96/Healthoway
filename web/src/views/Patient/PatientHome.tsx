import { injectIntl } from 'react-intl';
import { Button, Card, Grid, Typography } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import './PatientHome.scss';
import FooterComp from '../../components/FooterComp/FooterComp';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';
import { getFullName } from '../../services/userInfoService';

type Props = {
  intl: any;
};

const PatientHome = ({ intl }: Props) => {
  //clear state on refresh so snack bar is not shown
  window.history.replaceState({}, document.title);

  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  const navigateToSelfAssessment = () => {
    navigate('/patient/selfAssessment');
  };

  return (
    <>
      {successMessage && <AppSnackbar type="success" message={successMessage} open={true} />}
      <MenuBar
        isLoggedIn={true}
        title={intl.formatMessage({
          id: 'patient.title'
        })}
        noBtn={false}
      />
      <Grid container className="main-container">
        <Grid container justifyContent="center">
          <Card className="patientHome-greeting-container">
            <Typography variant="h3">
              {intl.formatMessage(
                {
                  id: 'patient.label.greetings'
                },
                {
                  fullName: getFullName()
                }
              )}
            </Typography>
            <Typography>
              {intl.formatMessage({
                id: 'patient.label.completeSelfAssessment'
              })}
            </Typography>
            <Button fullWidth variant="contained" onClick={navigateToSelfAssessment}>
              {intl.formatMessage({
                id: 'patientHome.button.selfAssessment'
              })}
            </Button>
          </Card>
        </Grid>
        <Grid container justifyContent="center" className="appointment-container">
          <Button
            variant="contained"
            style={{ margin: '60px' }}
            sx={{ display: { xs: 'flex', sm: 'flex', width: 'fit-content' } }}
            component={Link}
            to={'/patient/appointments'}
          >
            {intl.formatMessage({
              id: 'global.my_appointments'
            })}
          </Button>
        </Grid>
      </Grid>
      <FooterComp />
    </>
  );
};

export default injectIntl(PatientHome);
