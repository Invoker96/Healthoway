import { injectIntl } from 'react-intl';
import { Button, Grid, Box, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  intl: any;
};

const RoleForm = ({ intl }: Props) => {
  const { control, handleSubmit, getValues } = useForm({
    reValidateMode: 'onBlur'
  });

  const handleOnSubmit = (evt: any) => {
    console.log(evt);
  };

  return (
    <Grid>
      <Typography>
        {intl.formatMessage({
          id: 'userForm.label'
        })}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid container>
          <Grid container>
            <Controller
              control={control}
              name="firstName"
              defaultValue=""
              rules={{
                required: true
              }}
              render={({ field, fieldState: { error } }: any) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  label={intl.formatMessage({ id: 'userForm.form.label.firstName' })}
                  error={error !== undefined}
                  helperText={
                    error
                      ? intl.formatMessage({ id: `userForm.form.error.firstName.${[error.type]}` })
                      : ''
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              defaultValue=""
              rules={{
                required: true
              }}
              render={({ field, fieldState: { error } }: any) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  label={intl.formatMessage({ id: 'userForm.form.label.lastName' })}
                  error={error !== undefined}
                  helperText={
                    error
                      ? intl.formatMessage({ id: `userForm.form.error.lastName.${[error.type]}` })
                      : ''
                  }
                />
              )}
            />
          </Grid>
          <Grid container>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              rules={{
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
              }}
              render={({ field, fieldState: { error } }: any) => (
                <TextField
                  {...field}
                  fullWidth
                  type="email"
                  variant="outlined"
                  error={error !== undefined}
                  label={intl.formatMessage({ id: 'userForm.form.label.email' })}
                  helperText={
                    error
                      ? intl.formatMessage({ id: `userForm.form.error.email.${[error.type]}` })
                      : ''
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="userId"
              defaultValue=""
              rules={{
                required: true
              }}
              render={({ field, fieldState: { error } }: any) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  label={intl.formatMessage({ id: 'userForm.form.label.userId' })}
                  error={error !== undefined}
                  helperText={
                    error
                      ? intl.formatMessage({ id: `userForm.form.error.userId.${[error.type]}` })
                      : ''
                  }
                />
              )}
            />
          </Grid>
          <Grid container>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              rules={{
                required: true
              }}
              render={({ field, fieldState: { error } }: any) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  type="password"
                  label={intl.formatMessage({ id: 'userForm.form.label.password' })}
                  error={error !== undefined}
                  helperText={
                    error
                      ? intl.formatMessage({ id: `userForm.form.error.password.${[error.type]}` })
                      : ''
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              defaultValue=""
              rules={{
                required: true,
                validate: (value) => getValues('password') === value
              }}
              render={({ field, fieldState: { error } }: any) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  type="password"
                  label={intl.formatMessage({ id: 'userForm.form.label.confirmPassword' })}
                  error={error !== undefined}
                  helperText={
                    error
                      ? intl.formatMessage({
                          id: `userForm.form.error.password.${[error.type]}`
                        })
                      : ''
                  }
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid>
          <Button variant="contained">
            {intl.formatMessage({
              id: 'userForm.button.back'
            })}
          </Button>
          <Button variant="contained" type="submit">
            {intl.formatMessage({
              id: 'userForm.button.submit'
            })}
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};

export default injectIntl(RoleForm);
