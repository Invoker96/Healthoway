import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Grid, Typography } from '@mui/material';
import { LocalHospital, Masks, PsychologyAlt } from '@mui/icons-material';
import { User, RoleType } from '../../types';
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
  const [userRole, setUserRole] = useState(RoleType.PATIENT);

  useEffect(() => {
    setFormData({ ...formData, userRole: userRole });
  }, [setFormData, userRole]);

  return (
    <Grid className="form-card">
      <Typography variant="h1">
        {intl.formatMessage({
          id: 'roleForm.title'
        })}
      </Typography>
      <Typography variant="h2">
        {intl.formatMessage({
          id: 'roleForm.label'
        })}
      </Typography>
      <Grid container justifyContent="space-around">
        <Grid
          item
          xs={3}
          className={`role-card-container ${userRole === RoleType.PATIENT ? 'selected' : ''}`}
        >
          <Button size="large" onClick={() => setUserRole(RoleType.PATIENT)}>
            <Masks />
            <Typography>{intl.formatMessage({ id: 'role.patient' })}</Typography>
          </Button>
        </Grid>
        <Grid
          item
          xs={3}
          className={`role-card-container ${userRole === RoleType.COUNSELLOR ? 'selected' : ''}`}
        >
          <Button size="large" onClick={() => setUserRole(RoleType.COUNSELLOR)}>
            <PsychologyAlt />
            <Typography>{intl.formatMessage({ id: 'role.counsellor' })}</Typography>
          </Button>
        </Grid>
        <Grid
          item
          xs={3}
          className={`role-card-container ${userRole === RoleType.DOCTOR ? 'selected' : ''}`}
        >
          <Button size="large" onClick={() => setUserRole(RoleType.DOCTOR)}>
            <LocalHospital />
            <Typography>{intl.formatMessage({ id: 'role.doctor' })}</Typography>
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
            id: 'userForm.button.next'
          })}
        </Button>
      </Grid>
    </Grid>
  );
};

export default injectIntl(RoleForm);
