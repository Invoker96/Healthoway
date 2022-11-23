import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Label } from 'recharts';
import AppointmentCountGraph from '../../../components/AppointmentCountGraph/AppointmentCountGraph';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import MenuBar from '../../../components/MenuBar/MenuBar';
import './AppointmentReport.scss';

type Props = {
  intl: any;
};

const AppointmentReport = ({ intl }: Props) => {
  const [selectedReport, setSelectedReport] = useState('count');
  const columns = ['appointmentDate', 'patientName', 'fullName', 'role'];

  // const handleFromDateChanged = (date: Dayjs | null) => {
  //   if (date) {
  //     setFromDate(date.toDate());
  //   }
  // };

  // const handleToDateChanged = (date: Dayjs | null) => {
  //   if (date) {
  //     setToDate(date.toDate());
  //   }
  // };

  const handleSelectedReportChanged = (event: any) => {
    const value = event.target.value as string;
    setSelectedReport(value);
  };

  return (
    <Grid container>
      {/*
  <AppSnackbar
    type="error"
    message={intl.formatMessage({
      id: 'selfAssessment.submit.error'
    })}
    open={isError}
  /> */}
      <MenuBar
        isLoggedIn={false}
        title={intl.formatMessage({ id: 'report.appointments.title' })}
        noBtn={true}
      />

      <Grid container className="main-container">
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
        <Grid container>{selectedReport === 'count' && <AppointmentCountGraph />}</Grid>
        {/* {selectedDateRange === 'monthly' && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="From"
                inputFormat="MM/DD/YYYY"
                value={fromDate}
                onChange={handleFromDateChanged}
                className="datepicker-input"
                renderInput={(params: any) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="To"
                inputFormat="MM/DD/YYYY"
                value={toDate}
                onChange={handleToDateChanged}
                className="datepicker-input"
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          )} */}
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column}>
                    {intl.formatMessage({ id: `report.appointment.table.header.${column}` })}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column}>
                        {column === 'appointmentDate'
                          ? formatDateTimeString(appt[column])
                          : appt[column]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    {intl.formatMessage({ id: 'report.appointments.table.noData' })}
                  </TableCell>
                </TableRow>
              )}
            </TableBody> */}
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default injectIntl(AppointmentReport);
