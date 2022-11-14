import { injectIntl } from 'react-intl';
import { Button, Grid, Typography } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import './PatientHome.scss';
import FooterComp from '../../components/FooterComp/FooterComp';
import { Link } from 'react-router-dom';

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

  return (
    <>
      <MenuBar
        isLoggedIn={true}
        title={intl.formatMessage({
          id: 'patient.title'
        })}
        noBtn={false}
      />
      {/* <div style={{ backgroundImage: `url('${background}')` }}> */}
      <Grid sx={{ mt: 10 }}>
        <Typography
          variant="h1"
          sx={{ display: { xs: 'flex', sm: 'flex', justifyContent: 'center' } }}
          style={{ margin: '20px' }}
        >
          <u>
            {intl.formatMessage({
              id: 'patient.desc'
            })}
          </u>
        </Typography>
        <Typography
          variant="h3"
          sx={{ display: { xs: 'flex', sm: 'flex' } }}
          style={{ margin: '60px' }}
        >
          {intl.formatMessage({
            id: 'patient.self_assessment_title'
          })}
        </Typography>
        <Button
          variant="contained"
          style={{ margin: '60px' }}
          sx={{ display: { xs: 'flex', sm: 'flex', justifyContent: 'center' } }}
        >
          {intl.formatMessage({
            id: 'patient.self_assessment'
          })}
        </Button>
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
      {/* <Grid container justifyContent="space-around">
        <table className="table table-stripped table-container">
          <thead>
            <tr>
              <th
                style={{ padding: '10px', border: 'none', background: '#673ab7', color: 'white' }}
              >
                {' '}
                <Typography variant="h3">
                  {intl.formatMessage({
                    id: 'global.s_no'
                  })}
                </Typography>
              </th>
              <th
                style={{ padding: '10px', border: 'none', background: '#673ab7', color: 'white' }}
              >
                <Typography variant="h3">
                  {intl.formatMessage({
                    id: 'patient.appointment_with'
                  })}
                </Typography>
              </th>
              <th
                style={{ padding: '10px', border: 'none', background: '#673ab7', color: 'white' }}
              >
                <Typography variant="h3">
                  {intl.formatMessage({
                    id: 'patient.name_title'
                  })}
                </Typography>
              </th>
              <th
                style={{ padding: '10px', border: 'none', background: '#673ab7', color: 'white' }}
              >
                <Typography variant="h3">
                  {intl.formatMessage({
                    id: 'global.date'
                  })}
                </Typography>
              </th>
              <th
                style={{ padding: '10px', border: 'none', background: '#673ab7', color: 'white' }}
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
      </Grid> */}
      <FooterComp />
    </>
  );
};

export default injectIntl(PatientHome);
