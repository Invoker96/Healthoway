import { injectIntl } from 'react-intl';
import './Footer.scss';
import { BottomNavigation, Grid, Typography, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';

type Props = {
  intl: any;
};

const Footer = ({ intl }: Props) => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation className="footer-container">
        <Grid container>
          <Grid item xs={4} className="footer-section-container">
            <Typography className="footer-title">
              {intl.formatMessage({
                id: 'landingPage.workingHoursTitle'
              })}
            </Typography>
            <Typography className="footer-description">
              {intl.formatMessage({
                id: 'landingPage.workingHours1'
              })}
            </Typography>
            <Typography className="footer-description">
              {intl.formatMessage({
                id: 'landingPage.workingHours2'
              })}
            </Typography>
            <Typography className="footer-description">
              {intl.formatMessage({
                id: 'landingPage.workingHours3'
              })}
            </Typography>
          </Grid>
          <Grid item xs={4} className="footer-section-container">
            <PersonIcon className="footer-icons" />

            <Typography className="footer-title">
              {intl.formatMessage({
                id: 'landingPage.patientReviewTitle'
              })}
            </Typography>
            <Typography className="footer-description">
              {intl.formatMessage({
                id: 'landingPage.patientReview'
              })}
            </Typography>
          </Grid>
          <Grid item xs={4} className="footer-section-container">
            <BusinessIcon className="footer-icons" />

            <Typography className="footer-title">
              {intl.formatMessage({
                id: 'landingPage.addressTitle'
              })}
            </Typography>
            <Typography className="footer-description">
              {intl.formatMessage({
                id: 'landingPage.addressLine1'
              })}
            </Typography>
            <Typography className="footer-description">
              {intl.formatMessage({
                id: 'landingPage.addressLine2'
              })}
            </Typography>
          </Grid>
        </Grid>
      </BottomNavigation>
    </Paper>
  );
};

export default injectIntl(Footer);
