import { injectIntl } from 'react-intl';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from '../../assets/logo.png';
import './Footer.scss';
import { Grid, Typography } from '@mui/material';

type Props = {
  intl: any;
};

const Footer = ({ intl }: Props) => {
  return (
    <Grid container className="footer-container">
      <Grid item xs={4} sx={{ borderRight: 1 }}>
        <Typography variant="h1" sx={{ borderBottom: 1, width: '70%', ml: '15%', pt: 3 }}>
          {intl.formatMessage({
            id: 'landingPage.workingHoursTitle'
          })}
        </Typography>
        <Typography variant="h5" sx={{ color: '#fff' }}>
          {intl.formatMessage({
            id: 'landingPage.workingHours1'
          })}
        </Typography>
        <Typography variant="h5" sx={{ color: '#fff' }}>
          {intl.formatMessage({
            id: 'landingPage.workingHours2'
          })}
        </Typography>
        <Typography variant="h5" sx={{ color: '#fff' }}>
          {intl.formatMessage({
            id: 'landingPage.workingHours3'
          })}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ borderRight: 1 }}>
        <Typography variant="h1" sx={{ borderBottom: 1, width: '70%', ml: '15%', pt: 3 }}>
          {intl.formatMessage({
            id: 'landingPage.patientReviewTitle'
          })}
        </Typography>
        <Typography variant="h5" sx={{ color: '#fff', width: '70%', ml: '15%' }}>
          {intl.formatMessage({
            id: 'landingPage.patientReview'
          })}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h1" sx={{ borderBottom: 1, width: '70%', ml: '15%', pt: 3 }}>
          {intl.formatMessage({
            id: 'landingPage.addressTitle'
          })}
        </Typography>
        <Typography variant="h5" sx={{ color: '#fff', width: '70%', ml: '15%' }}>
          {intl.formatMessage({
            id: 'landingPage.addressLine1'
          })}
        </Typography>
        <Typography variant="h5" sx={{ color: '#fff', width: '70%', ml: '15%' }}>
          {intl.formatMessage({
            id: 'landingPage.addressLine2'
          })}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default injectIntl(Footer);
