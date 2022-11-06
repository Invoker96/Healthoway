import { injectIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Auth } from '../../types';
import './LoginForm.scss';
import { authenticator } from '../../services/authService';
import ClearIcon from '@mui/icons-material/Clear';
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from 'react';

type Props = {
  intl: any;
  formData: Auth;
  setFormData: React.Dispatch<Auth>;
};

const LoginForm = ({ formData, setFormData, intl }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isLoginError, setLoginError] = useState(false);
  const { control, handleSubmit } = useForm({
    reValidateMode: 'onBlur'
  });
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    setLoading(true);
    setFormData({ ...formData, ...data });
    setLoginError(false);
    authenticator(data)
      .then(function (response) {
        if (response?.data?.userRole !== 'NA') {
          const role = response.data.userRole.toLowerCase();

          if (role === 'doctor') {
            navigate('/doctorHome');
          } else if (role === 'patient') {
            navigate('/patientHome');
          } else if (role === 'manager') {
            navigate('/managerHome');
          } else if (role === 'counsellor') {
            navigate('/counsellorHome');
          }
        } else {
          setLoginError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      });
    setLoading(false);
  };

  const LOGIN_FIELDS = [
    {
      id: 'username',
      type: 'text',
      rules: { required: true }
    },
    {
      id: 'password',
      type: 'password',
      rules: { required: true }
    }
  ];

  return (
    <>
      {loading && <CircularProgress />}
      <Grid container className="login-card">
        {isLoginError && (
          <Grid component="form" container spacing={3}>
            <Grid item xs={12}>
              <div className="login-error">
                <ErrorIcon className="login-svg" />
                {intl.formatMessage({
                  id: 'authForm.form.error'
                })}
              </div>
            </Grid>
          </Grid>
        )}
        <Grid component="form" container spacing={3} justifyContent="center" alignItems="center">
          {LOGIN_FIELDS.map((key, index) => {
            return (
              <Grid key={index} item xs={12}>
                <Controller
                  control={control}
                  name={key.id}
                  rules={key.rules}
                  render={({ field, fieldState: { error } }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      label={intl.formatMessage({ id: `authForm.form.label.${key.id}` })}
                      error={error !== undefined}
                      type={key.type}
                      helperText={
                        error
                          ? intl.formatMessage({
                              id: `authForm.form.error.${key.id}.${[error.type]}`
                            })
                          : ''
                      }
                    />
                  )}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container className="button-container" spacing={3}>
          <Button component={Link} to={'/register'}>
            {intl.formatMessage({
              id: 'authForm.button.signup'
            })}
          </Button>
          <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
            {intl.formatMessage({
              id: 'authForm.button.submit'
            })}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default injectIntl(LoginForm);
