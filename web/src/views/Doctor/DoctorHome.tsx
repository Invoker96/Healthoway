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
          <Grid container justifyContent="space-around">
            <table className="table table-stripped table-wrapper">
              <thead>
                <tr>
                  <th style={{ padding: '10px', border: 'none' }}>
                    {' '}
                    <Typography variant="h3">
                      {intl.formatMessage({
                        id: 'global.s_no'
                      })}
                    </Typography>
                  </th>
                  <th style={{ padding: '10px', border: 'none' }}>
                    <Typography variant="h3">
                      {intl.formatMessage({
                        id: 'global.patient_name_title'
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
      <Footer />
    </>
  );
};

export default injectIntl(DoctorHome);
