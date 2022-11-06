import { injectIntl } from 'react-intl';
import { Grid, Typography, Box } from '@mui/material';
import MenuBar from '../../components/MenuBar/MenuBar';
import bg from '../../assets/LandingImage.jpg';
import './LandingPage.scss';
import Footer from '../../components/Footer/Footer';

type Props = {
  intl: any;
};

const LandingPage = ({ intl }: Props) => {
  return (
    <>
      <MenuBar
        isCustomView={false}
        title={intl.formatMessage({
          id: 'global.empty'
        })}
      />
      <img className="bg-img" src={bg}></img>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' } }}></Box>
      <Footer />
    </>
  );
};

export default injectIntl(LandingPage);
