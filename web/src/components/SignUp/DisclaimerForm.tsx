import { injectIntl } from 'react-intl';
import { Button, Grid, Checkbox, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../types';
import './DisclaimerForm.scss';
import './SignUp.scss';

type Props = {
  intl: any;
  page: number;
  setPage: React.Dispatch<number>;
  formData: User;
  setFormData: React.Dispatch<User>;
};

const DisclaimerForm = ({ page, setPage, formData, setFormData, intl }: Props) => {
  const { control, handleSubmit } = useForm({
    reValidateMode: 'onBlur'
  });

  const disclaimerTypes = ['website', 'professional'];

  const onSubmit = () => {
    setFormData({ ...formData });
    setPage(page + 1);
  };

  return (
    <Grid container className="form-card">
      <Typography variant="h1">
        {intl.formatMessage({
          id: 'disclaimerForm.title'
        })}
      </Typography>
      <Typography variant="h2">
        {intl.formatMessage({
          id: 'disclaimerForm.label'
        })}
      </Typography>
      <Grid container className="disclaimer-container">
        {disclaimerTypes.map((type) => (
          <Grid item className="disclaimer-type-container">
            <Typography variant="h3">
              {intl.formatMessage({ id: `disclaimerForm.${type}.title` })}
            </Typography>
            <Typography>
              {intl.formatMessage({ id: `disclaimerForm.${type}.description` })}
            </Typography>
          </Grid>
        ))}
        <Grid item className="disclaimer-checkbox-container">
          <Controller
            name={'disclaimer'}
            control={control}
            render={({ field: props }) => (
              <Checkbox
                {...props}
                checked={props.value}
                onChange={(e) => props.onChange(e.target.checked)}
              />
            )}
          />
          <Typography>{intl.formatMessage({ id: 'disclaimerForm.agree.label' })}</Typography>
        </Grid>
      </Grid>
      <Grid container className="button-container">
        <Button variant="contained" onClick={() => setPage(page - 1)}>
          {intl.formatMessage({
            id: 'userForm.button.back'
          })}
        </Button>
        <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
          {intl.formatMessage({
            id: 'userForm.button.submit'
          })}
        </Button>
      </Grid>
    </Grid>
  );
};

export default injectIntl(DisclaimerForm);
