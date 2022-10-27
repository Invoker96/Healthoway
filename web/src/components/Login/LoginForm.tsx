import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Auth } from '../../types';
import './LoginForm.scss';
import { authenticator } from '../../services/authService';

type Props = {
  intl: any;
  formData: Auth;
  setFormData: React.Dispatch<Auth>;
};

const LoginForm = ({ formData, setFormData, intl }: Props) => {
  const { control, handleSubmit } = useForm({
    reValidateMode: 'onBlur'
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setFormData({ ...formData, ...data });
    authenticator(data)
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
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
  );
};

export default injectIntl(LoginForm);
