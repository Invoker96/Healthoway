import { useState } from 'react';

import { injectIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Auth } from '../../types';
import { login } from '../../services/authService';
import { setUserInfo } from '../../services/userInfoService';
import './LoginForm.scss';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import AppSnackbar from '../AppSnackbar/AppSnackbar';

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
    const doLogin = async () => {
      await setLoginError(false);
      await setLoading(true);
      await setFormData({ ...formData, ...data });
      await login(data)
        .then((response: any) => {
          if (response?.data?.userRole !== 'NA') {
            setUserInfo(response?.data);
            const role = response.data.role.toLowerCase();
            navigate(`/${role}/home`);
          } else {
            setLoginError(true);
          }
        })
        .catch((err: any) => {
          console.log(err);
          setLoginError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    doLogin();
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
      <LoadingSpinner isOpen={loading} />
      <AppSnackbar
        type="error"
        message={intl.formatMessage({
          id: 'authForm.form.error'
        })}
        open={isLoginError}
      />
      <Grid container className="login-card">
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
