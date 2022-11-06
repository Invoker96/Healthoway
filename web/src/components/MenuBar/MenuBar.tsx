import { injectIntl } from 'react-intl';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from '../../assets/logo.png';
import './MenuBar.scss';
import { Typography } from '@mui/material';

type Props = {
  intl: any;
  isCustomView: any;
  title: any;
};

const MenuBar = ({ intl, isCustomView, title }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' } }}>
            <img className="home_logo" src={Image}></img>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' } }}>
            <Typography variant="h1">
              {intl.formatMessage({
                id: title
              })}
            </Typography>
          </Box>

          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{ position: 'absolute', right: '0', top: '15px' }}
          >
            {!isCustomView ? (
              <>
                <Button
                  className="actionBtn"
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={'/login'}
                >
                  {intl.formatMessage({
                    id: 'authForm.button.submit'
                  })}
                </Button>
                <Button
                  className="actionBtn"
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={'/register'}
                >
                  {intl.formatMessage({
                    id: 'authForm.button.signup'
                  })}
                </Button>
              </>
            ) : (
              <Button
                className="actionBtn"
                variant="outlined"
                color="secondary"
                component={Link}
                to={'/'}
              >
                {intl.formatMessage({
                  id: 'authForm.button.logout'
                })}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default injectIntl(MenuBar);
