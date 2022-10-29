import { injectIntl } from 'react-intl';
import { Grid, Typography, Box } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import bg from '../../assets/LandingImg.jpg';
import './LandingPage.scss';

type Props = {
  intl: any;
};

const LandingPage = ({ intl }: Props) => {
  return (
    <>
      <MenuBar />
      <img className="bg-img" src={bg}></img>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' } }}></Box>
      <Grid container className="footer-container">
        <Grid item xs={4} sx={{ borderRight: 1 }}>
          <Typography variant="h1" sx={{ borderBottom: 1, width: '70%', ml: '15%' }}>
            {intl.formatMessage({
              id: 'landingPage.workingHoursTitle'
            })}
          </Typography>
          <Typography variant="h5" sx={{ p: 2, color: '#9e9e9e' }}>
            {intl.formatMessage({
              id: 'landingPage.workingHours1'
            })}
          </Typography>
          <Typography variant="h5" sx={{ p: 2, color: '#9e9e9e' }}>
            {intl.formatMessage({
              id: 'landingPage.workingHours2'
            })}
          </Typography>
          <Typography variant="h5" sx={{ p: 2, color: '#9e9e9e' }}>
            {intl.formatMessage({
              id: 'landingPage.workingHours3'
            })}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ borderRight: 1 }}>
          <Typography variant="h1" sx={{ borderBottom: 1, width: '70%', ml: '15%' }}>
            {intl.formatMessage({
              id: 'landingPage.patientReviewTitle'
            })}
          </Typography>
          <Typography variant="h5" sx={{ p: 2, color: '#9e9e9e', width: '70%', ml: '15%' }}>
            {intl.formatMessage({
              id: 'landingPage.patientReview'
            })}
          </Typography>
          <Typography variant="h5" sx={{ p: 2, color: '#9e9e9e', width: '70%', ml: '15%' }}>
            {intl.formatMessage({
              id: 'landingPage.patientName'
            })}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h1" sx={{ borderBottom: 1, width: '70%', ml: '15%' }}>
            {intl.formatMessage({
              id: 'landingPage.addressTitle'
            })}
          </Typography>
          <Typography variant="h5" sx={{ p: 2, color: '#9e9e9e', width: '70%', ml: '15%' }}>
            {intl.formatMessage({
              id: 'landingPage.addressLine1'
            })}
          </Typography>
          <Typography variant="h5" sx={{ p: 2, color: '#9e9e9e', width: '70%', ml: '15%' }}>
            {intl.formatMessage({
              id: 'landingPage.addressLine2'
            })}
          </Typography>
        </Grid>
      </Grid>
      {/* </Container> */}
    </>
  );
};

export default injectIntl(LandingPage);
