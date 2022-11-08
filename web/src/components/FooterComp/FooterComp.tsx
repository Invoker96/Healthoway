import { injectIntl } from 'react-intl';
import './FooterComp.scss';
import { Grid, Typography } from '@mui/material';

type Props = {
  intl: any;
};

const FooterComp = ({ intl }: Props) => {
  return (
    <Grid className="footer-wrapper">
      <Typography variant="h3">
        {intl.formatMessage({
          id: 'global.copyright'
        })}
      </Typography>
    </Grid>
  );
};

export default injectIntl(FooterComp);
