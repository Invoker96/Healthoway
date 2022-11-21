import { Grid } from '@mui/material';
import { injectIntl } from 'react-intl';
import AppSnackbar from '../../../components/AppSnackbar/AppSnackbar';
import MenuBar from '../../../components/MenuBar/MenuBar';

type Props = {
  intl: any;
};

const AppointmentReport = ({ intl }: Props) => {
  return (
    <Grid container>
      {/* <LoadingSpinner isOpen={isLoading} />
  <AppSnackbar
    type="error"
    message={intl.formatMessage({
      id: 'selfAssessment.submit.error'
    })}
    open={isError}
  /> */}

      <MenuBar
        isLoggedIn={false}
        title={intl.formatMessage({ id: 'report.appointments.title' })}
        noBtn={true}
      />
      <Grid component="form" container className="main-container"></Grid>
    </Grid>
  );
};

export default injectIntl(AppointmentReport);
