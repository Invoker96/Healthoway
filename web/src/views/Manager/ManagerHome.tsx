import { injectIntl } from 'react-intl';
import { Button, Card, Grid, Typography } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import './ManagerHome.scss';
import FooterComp from '../../components/FooterComp/FooterComp';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';
import { getFullName } from '../../services/userInfoService';

type Props = {
  intl: any;
};

const ManagerHome = ({ intl }: Props) => {
  //clear state on refresh so snack bar is not shown
  window.history.replaceState({}, document.title);

  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  const navigateToManagerRegister = () => {
    navigate('/manager/home/add');
  };

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
          <Card className="doctorHome-greeting-container">
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
                id: 'manager.label.desc1'
              })}
            </Typography>
            <Typography variant="h3" style={{ margin: '20px' }}>
              {intl.formatMessage({
                id: 'manager.label.desc2'
              })}
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container className="margin-left">
        <Button
          onClick={navigateToManagerRegister}
          variant="contained"
          style={{ margin: '20px' }}
          sx={{ display: { xs: 'flex', sm: 'flex', width: 'fit-content' } }}
        >
          {intl.formatMessage({
            id: 'manager.add'
          })}
        </Button>
      </Grid>
      <Grid container className="margin-left">
        <Button
          variant="contained"
          style={{ margin: '20px' }}
          sx={{ display: { xs: 'flex', sm: 'flex', width: 'fit-content' } }}
          component={Link}
          to={'/'}
        >
          {intl.formatMessage({
            id: 'manager.remove'
          })}
        </Button>
      </Grid>
      <Grid container className="margin-left">
        <Button
          variant="contained"
          style={{ margin: '20px' }}
          sx={{ display: { xs: 'flex', sm: 'flex', width: 'fit-content' } }}
          component={Link}
          to={'/'}
        >
          {intl.formatMessage({
            id: 'manager.users'
          })}
        </Button>
      </Grid>
      <FooterComp />
    </>
  );
};

export default injectIntl(ManagerHome);
