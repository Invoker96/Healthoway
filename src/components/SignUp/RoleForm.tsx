import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { LocalHospital, Masks, PsychologyAlt } from '@mui/icons-material';
import { User, UserType } from '../../types';

type Props = {
  intl: any;
  page: number;
  setPage: React.Dispatch<number>;
  formData: User;
  setFormData: React.Dispatch<User>;
};

const RoleForm = ({ page, setPage, formData, setFormData, intl }: Props) => {
  const [userType, setUserType] = useState(UserType.PATIENT);

  useEffect(() => {
    setFormData({ ...formData, type: userType });
  }, [userType]);

  return (
    <Grid>
      <Typography>
        {intl.formatMessage({
          id: 'role.label'
        })}
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <IconButton size="large" onClick={() => setUserType(UserType.PATIENT)}>
            <Masks />
            <Typography>{intl.formatMessage({ id: 'role.button.patient' })}</Typography>
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton size="large" onClick={() => setUserType(UserType.COUNSELLOR)}>
            <PsychologyAlt />
            <Typography>{intl.formatMessage({ id: 'role.button.counsellor' })}</Typography>
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton size="large" onClick={() => setUserType(UserType.DOCTOR)}>
            <LocalHospital />
            <Typography>{intl.formatMessage({ id: 'role.button.doctor' })}</Typography>
          </IconButton>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        {intl.formatMessage({
          id: 'role.button.next'
        })}
      </Button>
    </Grid>
  );
};

export default injectIntl(RoleForm);
