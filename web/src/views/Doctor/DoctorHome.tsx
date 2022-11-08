import { injectIntl } from 'react-intl';
import { Button, Grid, Typography } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import Footer from '../../components/Footer/Footer';
import './DoctorHome.scss';

type Props = {
  intl: any;
};

const DoctorHome = ({ intl }: Props) => {
  const PATIENTS_DATA = [
    {
      patient_name: 'Altouf',
      assessment_form: 'text',
      date: '11/28/2022',
      time: '14:30 EST'
    },
    {
      patient_name: 'Haider',
      assessment_form: 'text',
      date: '12/15/2022',
      time: '12:00 EST'
    },
    {
      patient_name: 'Dalie',
      assessment_form: 'text',
      date: '11/15/2022',
      time: '08:00 EST'
    },
    {
      patient_name: 'Ray',
      assessment_form: 'text',
      date: '12/02/2022',
      time: '11:00 EST'
    },
    {
      patient_name: 'Jack',
      assessment_form: 'text',
      date: '12/14/2022',
      time: '14:00 EST'
    },
    {
      patient_name: 'Oliver',
      assessment_form: 'text',
      date: '11/28/2022',
      time: '13:00 EST'
    }
  ];

  const tableRows = PATIENTS_DATA.map((info, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{info.patient_name}</td>
        <td>
          {' '}
          <Button variant="contained">
            {intl.formatMessage({
              id: 'global.self_assessment_title'
            })}
          </Button>
        </td>
        <td>{info.date}</td>
        <td>{info.time}</td>
        <td>
          {' '}
          <Typography variant="h3">
            {intl.formatMessage({
              id: 'global.reject'
            })}
          </Typography>
        </td>
      </tr>
    );
  });

  return (
    <>
      <MenuBar
        isLoggedIn={true}
        title={intl.formatMessage({
          id: 'doctor.title'
        })}
      />
      <Grid sx={{ mt: 20 }}>
        <Grid container sx={{ display: { xs: 'flex', sm: 'flex', justifyContent: 'center' } }}>
          <Typography
            variant="h1"
            sx={{ display: { xs: 'flex', sm: 'flex', justifyContent: 'center' } }}
            style={{ margin: '10px' }}
          >
            <u>
              {intl.formatMessage({
                id: 'global.my_appointments'
              })}
            </u>
          </Typography>
          <Grid container justifyContent="space-around" sx={{ mt: 3 }}>
            <table className="table table-stripped table-wrapper">
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
                        id: 'global.patient_name_title'
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
                    {' '}
                    <Typography variant="h3">
                      {intl.formatMessage({
                        id: 'global.results'
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
                        id: 'global.reject_title'
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
    </>
  );
};

export default injectIntl(DoctorHome);
