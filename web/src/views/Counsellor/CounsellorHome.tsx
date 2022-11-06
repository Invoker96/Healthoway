import { injectIntl } from 'react-intl';
import { Button, Grid, Typography, TextField } from '@mui/material';
import './CounsellorHome.scss';
import MenuBar from '../../components/MenuBar/MenuBar';
import Footer from '../../components/Footer/Footer';
import './CounsellorHome.scss';

type Props = {
  intl: any;
};

const CounsellorHome = ({ intl }: Props) => {
  const PATIENTS_DATA = [
    {
      patient_name: 'Altouf',
      assessment_form: 'text'
    },
    {
      patient_name: 'Haider',
      assessment_form: 'text'
    },
    {
      patient_name: 'Dalie',
      assessment_form: 'text'
    },
    {
      patient_name: 'Ray',
      assessment_form: 'text'
    },
    {
      patient_name: 'Jack',
      assessment_form: 'text'
    },
    {
      patient_name: 'Oliver',
      assessment_form: 'text'
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
        <td>
          {' '}
          <Button variant="contained">
            {intl.formatMessage({
              id: 'counsellor.self_assign'
            })}
          </Button>
        </td>
        <td>
          {' '}
          <Button variant="contained">
            {intl.formatMessage({
              id: 'counsellor.doctor_assign'
            })}
          </Button>
        </td>
        <td>
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
        isCustomView
        title={intl.formatMessage({
          id: 'counsellor.title'
        })}
      />
      <Grid sx={{ mt: 20 }}>
        <Grid container justifyContent="center">
          <Typography
            variant="h1"
            sx={{ display: { xs: 'flex', sm: 'flex', justifyContent: 'center' } }}
            style={{ margin: '20px' }}
          >
            <u>
              {intl.formatMessage({
                id: 'global.list_of_patients'
              })}
            </u>
          </Typography>
          <Button variant="contained" className="my_appointment_btn">
            {intl.formatMessage({
              id: 'global.my_appointments'
            })}
          </Button>
        </Grid>
        <Grid container justifyContent="space-around" sx={{ mt: 3 }}>
          <table className="table table-stripped">
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
                      id: 'global.patient_name_title'
                    })}
                  </Typography>
                </th>
                <th
                  style={{ padding: '10px', border: 'none', background: '#673ab7', color: 'white' }}
                >
                  {' '}
                  <Typography variant="h3">
                    {intl.formatMessage({
                      id: 'global.results'
                    })}
                  </Typography>
                </th>
                <th
                  style={{ padding: '10px', border: 'none', background: '#673ab7', color: 'white' }}
                >
                  <Typography variant="h3">
                    {intl.formatMessage({
                      id: 'global.schedule_appointment'
                    })}
                  </Typography>
                </th>
                <th
                  style={{ padding: '10px', border: 'none', background: '#673ab7', color: 'white' }}
                >
                  <Typography variant="h3">
                    {intl.formatMessage({
                      id: 'global.schedule_appointment'
                    })}
                  </Typography>
                </th>
                <th
                  style={{ padding: '10px', border: 'none', background: '#673ab7', color: 'white' }}
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
      <Footer />
    </>
  );
};

export default injectIntl(CounsellorHome);
