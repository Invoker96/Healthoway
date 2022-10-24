import { injectIntl } from 'react-intl';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { LocalHospital, Masks, PsychologyAlt } from '@mui/icons-material';

type Props = {
  intl: any;
};

const RoleInfo = ({ intl }: Props) => {
  return (
    <Grid>
      <Typography>
        {intl.formatMessage({
          id: 'role.label'
        })}
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <IconButton size="large">
            <Masks />
            <Typography>{intl.formatMessage({ id: 'role.button.patient' })}</Typography>
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton size="large">
            <PsychologyAlt />
            <Typography>{intl.formatMessage({ id: 'role.button.counsellor' })}</Typography>
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton size="large">
            <LocalHospital />
            <Typography>{intl.formatMessage({ id: 'role.button.doctor' })}</Typography>
          </IconButton>
        </Grid>
      </Grid>
      <Button variant="contained">
        {intl.formatMessage({
          id: 'role.button.next'
        })}
      </Button>
    </Grid>
  );
};

export default injectIntl(RoleInfo);
