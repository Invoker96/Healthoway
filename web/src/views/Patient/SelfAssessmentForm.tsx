import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
  Grid,
  Typography,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormHelperText
} from '@mui/material';
import QUESTIONS from '../../data/selfAssessmentQuestions.json';
import { Controller, useForm } from 'react-hook-form';
import { saveAssessmentForm } from '../../services/patientService';
import { getUserName, getEmail } from '../../services/userInfoService';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';

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

  const { control, handleSubmit } = useForm({
    reValidateMode: 'onBlur'
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
        //.then(() => })
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
          id: 'selfAssessment.error'
        })}
        open={isError}
      />
      <Typography variant="h1">{intl.formatMessage({ id: 'selfAssessment.title' })}</Typography>
      <Grid component="form" container>
        {QUESTIONS.map((set: QuestionSet) => {
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
            <Grid item key={set.question}>
              <FormLabel>{set.question}</FormLabel>
              <Controller
                control={control}
                name={set.id}
                //rules={{ required: true }}
                render={({ field, fieldState: { error } }: any) => {
                  return (
                    <FormControl>
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
        <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
          {intl.formatMessage({ id: 'selfAssessment.button.submit' })}
        </Button>
      </Grid>
    </Grid>
  );
};

export default injectIntl(SelfAssessmentForm);
