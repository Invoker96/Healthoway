import { injectIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { Button, Grid, Typography, TextField } from '@mui/material';
import './CounsellorHome.scss';

type Props = {
  intl: any;
};

const CounsellorHome = ({ intl }: Props) => {
  const PATIENTS_DATA = [
    {
      patient_name: 'Altouf',
      assessment_form: 'text'
    },
    {
      patient_name: 'Haider',
      assessment_form: 'text'
    },
    {
      patient_name: 'Dalie',
      assessment_form: 'text'
    },
    {
      patient_name: 'Ray',
      assessment_form: 'text'
    },
    {
      patient_name: 'Jack',
      assessment_form: 'text'
    },
    {
      patient_name: 'Oliver',
      assessment_form: 'text'
    }
  ];

  const tableRows = PATIENTS_DATA.map((info, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{info.patient_name}</td>
        <td>
          {' '}
          <Button variant="contained">
            {intl.formatMessage({
              id: 'counsellor.self_assessment_title'
            })}
          </Button>
        </td>
        <td>
          {' '}
          <Button variant="contained">
            {intl.formatMessage({
              id: 'counsellor.self_assign'
            })}
          </Button>
        </td>
        <td>
          {' '}
          <Button variant="contained">
            {intl.formatMessage({
              id: 'counsellor.doctor_assign'
            })}
          </Button>
        </td>
        <td>
          {' '}
          <Button variant="contained">
            {intl.formatMessage({
              id: 'counsellor.reject'
            })}
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Grid sx={{ mt: 3 }}>
      <Grid container justifyContent="center">
        <Typography variant="h1">
          {intl.formatMessage({
            id: 'counsellor.title'
          })}
        </Typography>
        <Button variant="contained" className="my_appointment_btn">
          {intl.formatMessage({
            id: 'counsellor.appointments'
          })}
        </Button>
      </Grid>
      <Grid container>
        <Grid container justifyContent="space-around">
          <table className="table table-stripped">
            <thead>
              <tr>
                <th style={{ padding: '10px' }}>
                  {' '}
                  <Typography variant="h3">
                    {intl.formatMessage({
                      id: 'global.s_no'
                    })}
                  </Typography>
                </th>
                <th>
                  <Typography variant="h3">
                    {intl.formatMessage({
                      id: 'counsellor.patient_name_title'
                    })}
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default injectIntl(CounsellorHome);
