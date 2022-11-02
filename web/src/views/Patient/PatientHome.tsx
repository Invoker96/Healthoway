import { injectIntl } from 'react-intl';
import { Button, Grid, Typography } from '@mui/material';

type Props = {
  intl: any;
};

const PatientHome = ({ intl }: Props) => {
  return (
    <Grid sx={{ mt: 3 }}>
      <Grid container justifyContent="center">
        <Typography variant="h1">
          {intl.formatMessage({
            id: 'patient.title'
          })}
        </Typography>
      </Grid>
      <Grid container sx={{ display: { xs: 'flex', sm: 'flex' } }}>
        <Button variant="contained" style={{ margin: '20px' }}>
          {intl.formatMessage({
            id: 'patient.self_assessment'
          })}
        </Button>
      </Grid>
      <Grid container>
        <Typography
          variant="h3"
          sx={{ display: { xs: 'flex', sm: 'flex', justifyContent: 'center' } }}
          style={{ margin: '20px' }}
        >
          <u>
            {intl.formatMessage({
              id: 'global.my_appointments'
            })}
          </u>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default injectIntl(PatientHome);
