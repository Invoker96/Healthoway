import { injectIntl } from 'react-intl';
import { BottomNavigation, Paper, Typography } from '@mui/material';
import './FooterComp.scss';

type Props = {
  intl: any;
};

const FooterComp = ({ intl }: Props) => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation className="footer-wrapper">
        <Typography>
          {intl.formatMessage({
            id: 'global.copyright'
          })}
        </Typography>
      </BottomNavigation>
    </Paper>
  );
};

export default injectIntl(FooterComp);
