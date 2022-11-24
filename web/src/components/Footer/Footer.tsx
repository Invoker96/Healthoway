import { injectIntl } from 'react-intl';
import './Footer.scss';
import { Grid, Typography } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';

type Props = {
  intl: any;
};

const Footer = ({ intl }: Props) => {
  return (
    <Grid container className="footer-container">
      <Grid item xs={4}>
        <Typography className="footer-header">
          <WorkHistoryIcon className="footer-icons" />
          {intl.formatMessage({
            id: 'landingPage.workingHoursTitle'
          })}
        </Typography>
        <Typography className="footer-values">
          {intl.formatMessage({
            id: 'landingPage.workingHours1'
          })}
        </Typography>
        <Typography className="footer-values">
          {intl.formatMessage({
            id: 'landingPage.workingHours2'
          })}
        </Typography>
        <Typography className="footer-values">
          {intl.formatMessage({
            id: 'landingPage.workingHours3'
          })}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className="footer-header">
          <PersonIcon className="footer-icons" />
          {intl.formatMessage({
            id: 'landingPage.patientReviewTitle'
          })}
        </Typography>
        <Typography className="footer-values">
          {intl.formatMessage({
            id: 'landingPage.patientReview'
          })}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className="footer-header">
          <BusinessIcon className="footer-icons" />
          {intl.formatMessage({
            id: 'landingPage.addressTitle'
          })}
        </Typography>
        <Typography className="footer-values">
          {intl.formatMessage({
            id: 'landingPage.addressLine1'
          })}
        </Typography>
        <Typography className="footer-values">
          {intl.formatMessage({
            id: 'landingPage.addressLine2'
          })}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default injectIntl(Footer);
