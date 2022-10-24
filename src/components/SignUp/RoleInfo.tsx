import { injectIntl } from 'react-intl';
import { Typography } from '@mui/material';

type Props = {
  intl: any;
};

const RoleInfo = ({ intl }: Props) => {
  return (
    <Typography>
      {intl.formatMessage({
        id: 'role.label'
      })}
    </Typography>
  );
};

export default injectIntl(RoleInfo);
