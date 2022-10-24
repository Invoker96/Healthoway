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

  const SIGNUP_FIELDS = [
    {
      id: 'firstName',
      defaultValue: '',
      type: 'text',
      rules: { required: true }
    },
    {
      id: 'lastName',
      defaultValue: '',
      type: 'text',
      rules: { required: true }
    },
    {
      id: 'email',
      defaultValue: '',
      type: 'email',
      rules: { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ }
    },
    {
      id: 'userId',
      defaultValue: '',
      type: 'text',
      rules: { required: true }
    },
    {
      id: 'password',
      defaultValue: '',
      type: 'password',
      rules: { required: true }
    },
    {
      id: 'confirmPassword',
      defaultValue: '',
      type: 'password',
      rules: { required: true, validate: (value: string) => getValues('password') === value }
    }
  ];

  return (
    <Grid>
      <Typography>
        {intl.formatMessage({
          id: 'userForm.label'
        })}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid container spacing={3}>
          {SIGNUP_FIELDS.map((key) => {
            return (
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name={key.id}
                  defaultValue={key.defaultValue}
                  rules={key.rules}
                  render={({ field, fieldState: { error } }: any) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      label={intl.formatMessage({ id: `userForm.form.label.${key.id}` })}
                      error={error !== undefined}
                      type={key.type}
                      helperText={
                        error
                          ? intl.formatMessage({
                              id: `userForm.form.error.${key.id}.${[error.type]}`
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
