import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import AppSnackbar from '../../../components/AppSnackbar/AppSnackbar';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import MenuBar from '../../../components/MenuBar/MenuBar';
import { getAppointmentsByDateRange } from '../../../services/managerService';
import { formatDateTimeString, formatDateToString } from '../../../utils/DateUtil';

type Props = {
  intl: any;
};

const AppointmentReport = ({ intl }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async (from: Date, to: Date) => {
    setIsLoading(true);
    await getAppointmentsByDateRange(formatDateToString(from), formatDateToString(to)).then(
      ({ data }) => {
        setAppointments(data);
      }
    );
    setIsLoading(false);
  };

  const columns = ['appointmentDate', 'patientName', 'fullName', 'role'];

  // trigger on mount - get appointments from one month ago on initialize
  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    getAppointments(oneMonthAgo, today);
  }, []);

  return (
    <Grid container>
      <LoadingSpinner isOpen={isLoading} />
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
      <Grid component="form" container className="main-container">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
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
              {appointments.map((appt) => (
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>
                      {column === 'appointmentDate'
                        ? formatDateTimeString(appt[column])
                        : appt[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default injectIntl(AppointmentReport);
