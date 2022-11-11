import { injectIntl } from 'react-intl';
import { Button, Card, Grid, Typography } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import './PatientHome.scss';
import FooterComp from '../../components/FooterComp/FooterComp';
import { useNavigate, useLocation } from 'react-router-dom';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';
import { getFullName } from '../../services/userInfoService';

type Props = {
  intl: any;
};

const PatientHome = ({ intl }: Props) => {
  const APPOINTMENTS = [
    {
      type: 'Counsellor',
      name: 'Oliver',
      date: '11/28/2022',
      time: '13:00 EST'
    },
    {
      type: 'Doctor',
      name: 'Oliver',
      date: '11/22/2022',
      time: '11:00 EST'
    }
  ];

  const tableRows = APPOINTMENTS.map((info, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{info.type}</td>
        <td>{info.name}</td>
        <td>{info.date}</td>
        <td>{info.time}</td>
      </tr>
    );
  });
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
          <Typography variant="h3">
            {intl.formatMessage({
              id: 'global.my_appointments'
            })}
          </Typography>
          <Grid container justifyContent="space-around">
            <table className="table table-stripped table-container">
              <thead>
                <tr>
                  <th
                    style={{
                      padding: '10px',
                      border: 'none',
                      background: '#673ab7',
                      color: 'white'
                    }}
                  >
                    {' '}
                    <Typography variant="h3">
                      {intl.formatMessage({
                        id: 'global.s_no'
                      })}
                    </Typography>
                  </th>
                  <th
                    style={{
                      padding: '10px',
                      border: 'none',
                      background: '#673ab7',
                      color: 'white'
                    }}
                  >
                    <Typography variant="h3">
                      {intl.formatMessage({
                        id: 'patient.appointment_with'
                      })}
                    </Typography>
                  </th>
                  <th
                    style={{
                      padding: '10px',
                      border: 'none',
                      background: '#673ab7',
                      color: 'white'
                    }}
                  >
                    <Typography variant="h3">
                      {intl.formatMessage({
                        id: 'patient.name_title'
                      })}
                    </Typography>
                  </th>
                  <th
                    style={{
                      padding: '10px',
                      border: 'none',
                      background: '#673ab7',
                      color: 'white'
                    }}
                  >
                    <Typography variant="h3">
                      {intl.formatMessage({
                        id: 'global.date'
                      })}
                    </Typography>
                  </th>
                  <th
                    style={{
                      padding: '10px',
                      border: 'none',
                      background: '#673ab7',
                      color: 'white'
                    }}
                  >
                    <Typography variant="h3">
                      {intl.formatMessage({
                        id: 'global.time'
                      })}
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </Grid>
        </Grid>
      </Grid>
      <FooterComp />
    </>
  );
};

export default injectIntl(PatientHome);
