import { injectIntl } from 'react-intl';
import { Button, Grid, Typography } from '@mui/material';

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
          <Button variant="contained">
            {intl.formatMessage({
              id: 'global.reject'
            })}
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Grid sx={{ mt: 3 }}>
      <Grid container justifyContent="center">
        <Typography variant="h1">
          {intl.formatMessage({
            id: 'doctor.title'
          })}
        </Typography>
      </Grid>
      <Grid container sx={{ display: { xs: 'flex', sm: 'flex', justifyContent: 'center' } }}>
        <Typography variant="h3" style={{ margin: '20px' }}>
          {intl.formatMessage({
            id: 'global.my_appointments'
          })}
        </Typography>
        <Grid container justifyContent="space-around">
          <table className="table table-stripped">
            <thead>
              <tr>
                <th style={{ padding: '10px' }}>
                  {' '}
                  <Typography variant="h3">
                    {intl.formatMessage({
                      id: 'global.s_no'
                    })}
                  </Typography>
                </th>
                <th>
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
  );
};

export default injectIntl(DoctorHome);
