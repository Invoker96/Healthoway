import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { getAppointmentsByDateRange } from '../../services/managerService';
import { formatDateTimeString, formatDateToString } from '../../utils/DateUtil';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

import './AppointmentList.scss';

type Props = {
  intl: any;
};

const AppointmentList = ({ intl }: Props) => {
  const columns = ['appointmentDate', 'patientName', 'fullName', 'role'];
  const [isLoading, setIsLoading] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs().subtract(1, 'month').toDate());
  const [toDate, setToDate] = useState(dayjs().toDate());
  const [appointments, setAppointments] = useState([]);

  // trigger on mount - get appointments from one month ago on initialize
  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFromDateChanged = (date: Dayjs | null) => {
    if (date) {
      setFromDate(date.toDate());
    }
  };

  const handleToDateChanged = (date: Dayjs | null) => {
    if (date) {
      setToDate(date.toDate());
    }
  };

  const getAppointments = async () => {
    setIsLoading(true);

    await getAppointmentsByDateRange(formatDateToString(fromDate), formatDateToString(toDate)).then(
      ({ data }: any) => {
        setAppointments(data);
      }
    );
    setIsLoading(false);
  };

  return (
    <Grid className="main-container">
      <LoadingSpinner isOpen={isLoading} />
      <Grid className="dateRange-container">
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
        <Button variant="contained" onClick={getAppointments}>
          {intl.formatMessage({ id: 'report.appointments.button.generate' })}
        </Button>
      </Grid>
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
          <TableBody>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
export default injectIntl(AppointmentList);
