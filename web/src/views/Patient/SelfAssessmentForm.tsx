import {} from 'react';
import { injectIntl } from 'react-intl';
import { Grid, Typography, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material';
import QUESTIONS from '../../data/selfAssessmentQuestions.json';

type Props = {
  intl: any;
};

interface QuestionSet {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

const SelfAssessmentForm = ({ intl }: Props) => {
  return (
    <Grid container>
      <Typography variant="h1">{intl.formatMessage({ id: 'selfAssessment.title' })}</Typography>
      <Grid component="form" container>
        {QUESTIONS.map((set) => {
          const options = Object.keys(set).filter((key) => key.match(/option.*/));
          const optionComponent = options.map((opt, idx) => (
            <FormControlLabel
              value={idx}
              control={<Radio />}
              label={set[opt as keyof QuestionSet]}
            />
          ));
          return (
            <Grid item>
              <FormLabel id="demo-radio-buttons-group-label">{set.question}</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {optionComponent}
              </RadioGroup>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default injectIntl(SelfAssessmentForm);
