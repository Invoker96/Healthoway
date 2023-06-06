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
  Button,
  TablePagination
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { getAppointmentsByDateRange } from '../../services/appointmentService';
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid className="main-container">
      <LoadingSpinner isOpen={isLoading} />
      <Grid className="dateRange-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label={intl.formatMessage({ id: 'report.appointments.list.from' })}
            inputFormat="MM/DD/YYYY"
            value={fromDate}
            onChange={handleFromDateChanged}
            className="datepicker-input"
            renderInput={(params: any) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label={intl.formatMessage({ id: 'report.appointments.list.to' })}
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
              appointments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((appt) => (
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Grid>
  );
};
export default injectIntl(AppointmentList);
