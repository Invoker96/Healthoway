import * as React from 'react';
import { injectIntl } from 'react-intl';
import {
  AppBar,
  Button,
  Card,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import './PatientHome.scss';
import FooterComp from '../../components/FooterComp/FooterComp';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';
import { getFullName, getUserName, getUserRole } from '../../services/userInfoService';
import PatientAppointments from '../PatientAppointments/PatientAppointments';
import { patientsAppointments } from '../../services/patientService';
import { getSelfAssesmentResult } from '../../services/counsellorService';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

type Props = {
  intl: any;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PatientHome = ({ intl }: Props) => {
  interface SelfAssesment {
    question: string;
    answer: string;
  }

  interface Patient {
    patientName: string;
    userName: string;
    appointment: string;
    req: number;
  }

  //clear state on refresh so snack bar is not shown
  window.history.replaceState({}, document.title);

  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  const navigateToSelfAssessment = () => {
    navigate('/patient/selfAssessment');
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = (type: string) => {
    if (type === 'selfAssessment') {
      setOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [appointmentsList, setAppointmentsList] = React.useState<Array<Patient>>([]);
  const [selfAssesmentResult, setSelfAssesmentResult] = React.useState<Array<SelfAssesment>>([]);
  function getMyAppointments() {
    const payload = {
      userName: getUserName(),
      userRole: getUserRole()
    };
    patientsAppointments(payload)
      .then((response: any) => {
        console.log(response);
        setAppointmentsList(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  function callSelfAssesmentResult() {
    const payload = {
      username: getUserName()
    };
    getSelfAssesmentResult(payload)
      .then((response: any) => {
        console.log(response.data);
        setSelfAssesmentResult(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  React.useEffect(() => {
    getMyAppointments();
    callSelfAssesmentResult();
  }, []);

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={() => handleClose('selfAssessment')}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton> */}
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {getFullName()}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => handleClose('selfAssessment')}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {selfAssesmentResult.length > 0 &&
            selfAssesmentResult.map((selfAssesment, index) => {
              return (
                <ListItem button key={index}>
                  <ListItemText primary={selfAssesment.question} secondary={selfAssesment.answer} />
                </ListItem>
              );
            })}
        </List>
      </Dialog>

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
          {appointmentsList.length == 0 && selfAssesmentResult.length == 0 && (
            <Card className="patientHome-greeting-container-form">
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
          )}
          {appointmentsList.length == 0 && selfAssesmentResult.length > 0 && (
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
                  id: 'patient.label.message-underReview'
                })}
              </Typography>
              <Button variant="contained" onClick={() => handleClickOpen()}>
                {intl.formatMessage({
                  id: 'global.self_assessment_title'
                })}
              </Button>
            </Card>
          )}
          {appointmentsList.length > 0 && selfAssesmentResult.length > 0 && (
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
                  id: 'patient.label.message-appointment'
                })}
              </Typography>
            </Card>
          )}
        </Grid>
        <Grid container className="abc">
          <PatientAppointments></PatientAppointments>
        </Grid>
        {/* <Grid container justifyContent="center" className="appointment-container">
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
        </Grid> */}
      </Grid>
      <FooterComp />
    </>
  );
};

export default injectIntl(PatientHome);
