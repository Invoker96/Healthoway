import React from 'react';
import { injectIntl } from 'react-intl';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../types';
import './SignUp.scss';

type Props = {
  intl: any;
  page: number;
  setPage: React.Dispatch<number>;
  formData: User;
  setFormData: React.Dispatch<User>;
};

const RoleForm = ({ page, setPage, formData, setFormData, intl }: Props) => {
  const { control, handleSubmit, getValues } = useForm({
    reValidateMode: 'onBlur'
  });

  const onSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    setPage(page + 1);
  };

  const USER_FIELDS = [
    {
      id: 'username',
      type: 'text',
      rules: { required: true }
    },
    {
      id: 'fullName',
      type: 'text',
      rules: { required: true }
    },
    {
      id: 'email',
      type: 'email',
      rules: { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ }
    },
    {
      id: 'address',
      type: 'text',
      rules: { required: true }
    },
    {
      id: 'password',
      type: 'password',
      rules: { required: true }
    },
    {
      id: 'confirmPassword',
      type: 'password',
      rules: { required: true, validate: (value: string) => getValues('password') === value }
    }
  ];

  return (
    <>
      <Grid container className="form-card">
        <Typography variant="h1">
          {intl.formatMessage({
            id: 'userForm.title'
          })}
        </Typography>
        <Typography variant="h2">
          {intl.formatMessage({
            id: 'userForm.label'
          })}
        </Typography>
        <Grid component="form" container spacing={3}>
          {USER_FIELDS.map((key) => {
            return (
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name={key.id}
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
        <Grid container className="button-container">
          <Button variant="contained" onClick={() => setPage(page - 1)}>
            {intl.formatMessage({
              id: 'userForm.button.back'
            })}
          </Button>
          <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
            {intl.formatMessage({
              id: 'userForm.button.next'
            })}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default injectIntl(RoleForm);
