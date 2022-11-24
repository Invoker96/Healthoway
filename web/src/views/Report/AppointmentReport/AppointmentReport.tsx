import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { FormControl, Grid, MenuItem, Select, Typography, Button } from '@mui/material';
import AppointmentCountGraph from '../../../components/AppointmentCountGraph/AppointmentCountGraph';
import AppointmentList from '../../../components/AppointmentList/AppointmentList';
import MenuBar from '../../../components/MenuBar/MenuBar';
import './AppointmentReport.scss';

type Props = {
  intl: any;
};

const AppointmentReport = ({ intl }: Props) => {
  const [selectedReport, setSelectedReport] = useState('count');

  const handleSelectedReportChanged = (event: any) => {
    const value = event.target.value as string;
    setSelectedReport(value);
  };

  return (
    <Grid container>
      <MenuBar title={intl.formatMessage({ id: 'report.appointments.title' })} noBtn={true} />

      <Grid container className="main-container">
        <Button variant="contained" component={Link} to={'/manager/home'}>
          {intl.formatMessage({ id: 'global.my_dashboard' })}
        </Button>
        <Grid container className="report-selection-container">
          <Typography>
            {intl.formatMessage({ id: 'report.appointmnets.dropdown.label' })}
          </Typography>
          <FormControl className="report-dropdown">
            <Select value={selectedReport} onChange={handleSelectedReportChanged}>
              <MenuItem value="count">
                {intl.formatMessage({ id: 'report.appointments.dropdown.count' })}
              </MenuItem>
              <MenuItem value="list">
                {intl.formatMessage({ id: 'report.appointments.dropdown.list' })}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container>
          {selectedReport === 'count' && <AppointmentCountGraph />}
          {selectedReport === 'list' && <AppointmentList />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default injectIntl(AppointmentReport);
