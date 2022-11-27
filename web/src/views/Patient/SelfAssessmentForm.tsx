import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
  Grid,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormHelperText,
  Typography
} from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
import { saveAssessmentForm } from '../../services/patientService';
import { getUserName, getEmail } from '../../services/userInfoService';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';
import MenuBar from '../../components/MenuBar/MenuBar';

import QUESTIONS from '../../data/selfAssessmentQuestions.json';

import './SelfAssessmentForm.scss';

type Props = {
  intl: any;
};

interface QuestionSet {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

const SelfAssessmentForm = ({ intl }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm({
    reValidateMode: 'onBlur',
    mode: 'onChange'
  });

  const onSubmit = (data: any) => {
    const saveSelfAssessmentForm = async () => {
      setIsLoading(true);
      setIsError(false);
      const request = {
        username: getUserName(),
        email: getEmail(),
        ...data
      };
      await saveAssessmentForm(request)
        .then(() => {
          navigate('/patient/home', {
            state: { successMessage: intl.formatMessage({ id: 'selfAssessment.submit.success' }) }
          });
        })
        .catch((err: any) => {
          console.log(err);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    saveSelfAssessmentForm();
  };

  return (
    <Grid container>
      <LoadingSpinner isOpen={isLoading} />
      <AppSnackbar
        type="error"
        message={intl.formatMessage({
          id: 'selfAssessment.submit.error'
        })}
        open={isError}
      />

      <MenuBar title={intl.formatMessage({ id: 'selfAssessment.title' })} noBtn={true} />
      <Grid component="form" container className="main-container">
        {QUESTIONS.map((set: QuestionSet, qIndex: number) => {
          const options = Object.keys(set).filter((key) => key.match(/option.*/));
          const optionComponent = options.map((opt, idx) => {
            return (
              <FormControlLabel
                key={idx}
                value={set[opt as keyof QuestionSet]}
                control={<Radio />}
                label={set[opt as keyof QuestionSet]}
              />
            );
          });
          return (
            <Grid item key={set.question} className="selfAssessment-question-container">
              <Typography variant="h6" className="label-question">{`${intl.formatMessage({
                id: 'selfAssessment.label.question'
              })} ${qIndex + 1}`}</Typography>
              <FormLabel className="question">{set.question}</FormLabel>
              <Controller
                control={control}
                name={set.id}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }: any) => {
                  return (
                    <FormControl className="question-answer-container">
                      <RadioGroup
                        {...field}
                        onChange={(event, value) => field.onChange(value)}
                        value={field.value}
                      >
                        {optionComponent}
                      </RadioGroup>
                      {error && (
                        <FormHelperText>
                          {intl.formatMessage({ id: 'selfAssessment.question.error.required' })}
                        </FormHelperText>
                      )}
                    </FormControl>
                  );
                }}
              />
            </Grid>
          );
        })}
        <Grid container className="button-container">
          <Button variant="contained" component={Link} to={'/patient/home'}>
            {intl.formatMessage({ id: 'selfAssessment.button.cancel' })}
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={!isDirty || !isValid}
            onClick={handleSubmit(onSubmit)}
          >
            {intl.formatMessage({ id: 'selfAssessment.button.submit' })}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default injectIntl(SelfAssessmentForm);
