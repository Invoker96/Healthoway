import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { LocalHospital, Masks, PsychologyAlt } from '@mui/icons-material';
import { User, UserType } from '../../types';
import './SignUp.scss';
import './RoleForm.scss';

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
    <Grid className="form-card">
      <Typography variant="h1">
        {intl.formatMessage({
          id: 'role.title'
        })}
      </Typography>
      <Typography variant="h2">
        {intl.formatMessage({
          id: 'role.label'
        })}
      </Typography>
      <Grid container justifyContent="space-around">
        <Grid
          item
          xs={3}
          className={`role-card-container ${userType === UserType.PATIENT ? 'selected' : ''}`}
        >
          <Button size="large" onClick={() => setUserType(UserType.PATIENT)}>
            <Masks />
            <Typography>{intl.formatMessage({ id: 'role.button.patient' })}</Typography>
          </Button>
        </Grid>
        <Grid
          item
          xs={3}
          className={`role-card-container ${userType === UserType.COUNSELLOR ? 'selected' : ''}`}
        >
          <Button size="large" onClick={() => setUserType(UserType.COUNSELLOR)}>
            <PsychologyAlt />
            <Typography>{intl.formatMessage({ id: 'role.button.counsellor' })}</Typography>
          </Button>
        </Grid>
        <Grid
          item
          xs={3}
          className={`role-card-container ${userType === UserType.DOCTOR ? 'selected' : ''}`}
        >
          <Button size="large" onClick={() => setUserType(UserType.DOCTOR)}>
            <LocalHospital />
            <Typography>{intl.formatMessage({ id: 'role.button.doctor' })}</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid container className="button-container">
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
    </Grid>
  );
};

export default injectIntl(RoleForm);
