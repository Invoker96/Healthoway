import { injectIntl } from 'react-intl';
import { Button, Card, Grid, Typography } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import './ManagerHome.scss';
import FooterComp from '../../components/FooterComp/FooterComp';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';
import { getFullName } from '../../services/userInfoService';
import AdminDashboard from '../../assets/AdminDashboard.png';

type Props = {
  intl: any;
};

const ManagerHome = ({ intl }: Props) => {
  //clear state on refresh so snack bar is not shown
  window.history.replaceState({}, document.title);

  const location = useLocation();

  const successMessage = location.state?.successMessage;

  return (
    <>
      {successMessage && <AppSnackbar type="success" message={successMessage} open={true} />}
      <MenuBar
        title={intl.formatMessage({
          id: 'manager.title'
        })}
        noBtn={false}
      />
      <Grid container className="main-container">
        <Grid container justifyContent="center">
          <Card className="manager-greeting-container">
            <img src={AdminDashboard} className="manager-dashboard-image" />
            <Typography variant="h1" style={{ margin: '20px' }}>
              {intl.formatMessage(
                {
                  id: 'manager.label.greetings'
                },
                {
                  fullName: getFullName()
                }
              )}
            </Typography>
            <Typography variant="h3" style={{ margin: '20px' }}>
              {intl.formatMessage({
                id: 'manager.label.desc'
              })}
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <FooterComp />
    </>
  );
};

export default injectIntl(ManagerHome);
