import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';

import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import MenuBar from '../../../components/MenuBar/MenuBar';
import { getAppointmentsByDateRange } from '../../../services/managerService';
import { formatDisplayDate, formatDateToString, getMonthNameShort } from '../../../utils/DateUtil';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, LabelList } from 'recharts';
import './AppointmentReport.scss';
import variables from '../../../variables.scss';

type Props = {
  intl: any;
};

type GraphType = {
  date: string;
  count: number;
};

const AppointmentReport = ({ intl }: Props) => {
  dayjs.extend(weekOfYear);
  dayjs.extend(weekday);

  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<GraphType[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState('daily');
  const [fromDate, setFromDate] = useState(dayjs().subtract(1, 'month').toDate());
  const [toDate, setToDate] = useState(dayjs().toDate());

  const columns = ['appointmentDate', 'patientName', 'fullName', 'role'];

  const formatDailyAppointments = (data: any) => {
    const groups = data.reduce((groups: any, appointment: any) => {
      const date = formatDateToString(appointment.appointmentDate);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push({
        appointment
      });
      return groups;
    }, {});

    const allDatesGroup = {} as any;

    getDates().forEach((date: string) => {
      groups[date] ? (allDatesGroup[date] = groups[date]) : (allDatesGroup[date] = []);
    });

    return Object.keys(allDatesGroup).length > 0
      ? Object.keys(allDatesGroup).map((date: string) => {
          return { date, count: allDatesGroup[date].length };
        })
      : [];
  };

  const formatWeeklyAppointments = (data: any) => {
    const groups = data.reduce((groups: any, appointment: any) => {
      const weekOfYear = dayjs(formatDateToString(appointment.appointmentDate)).week();
      if (!groups[weekOfYear]) {
        groups[weekOfYear] = [];
      }
      groups[weekOfYear].push({
        appointment
      });
      return groups;
    }, {});

    const allDatesGroup = {} as any;

    getWeeks().forEach((week: number) => {
      groups[week] ? (allDatesGroup[week] = groups[week]) : (allDatesGroup[week] = []);
    });

    return Object.keys(allDatesGroup).length > 0
      ? Object.keys(allDatesGroup).map((date: string) => {
          return { date, count: allDatesGroup[date].length };
        })
      : [];
  };

  const formatMonthlyAppointments = (data: any) => {
    const groups = data.reduce((groups: any, appointment: any) => {
      const month = dayjs(formatDateToString(appointment.appointmentDate)).month() + 1;
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push({
        appointment
      });
      return groups;
    }, {});

    const allDatesGroup = {} as any;

    getMonths().forEach((month: number) => {
      groups[month] ? (allDatesGroup[month] = groups[month]) : (allDatesGroup[month] = []);
    });

    return Object.keys(allDatesGroup).length > 0
      ? Object.keys(allDatesGroup).map((date: string) => {
          return { date, count: allDatesGroup[date].length };
        })
      : [];
  };

  const getDates = () => {
    const dateArray = [];
    let currentDate = fromDate;
    while (currentDate <= toDate) {
      dateArray.push(formatDateToString(currentDate));
      currentDate = dayjs(currentDate).add(1, 'day').toDate();
    }
    return dateArray;
  };

  const getWeeks = () => {
    const weekArray = [];
    let currentWeek = dayjs(fromDate).week() + 1;
    while (Number(currentWeek) <= dayjs(toDate).week()) {
      weekArray.push(currentWeek);
      currentWeek += 1;
    }

    return weekArray;
  };

  const getMonths = () => {
    const monthArray = [];
    let currentMonth = dayjs(fromDate).month() + 1;
    while (Number(currentMonth) <= dayjs(toDate).month() + 1) {
      monthArray.push(currentMonth);
      currentMonth += 1;
    }
    return monthArray;
  };

  const getAppointments = async () => {
    setIsLoading(true);

    await getAppointmentsByDateRange(formatDateToString(fromDate), formatDateToString(toDate)).then(
      ({ data }) => {
        if (selectedDateRange === 'daily') {
          return setAppointments(formatDailyAppointments(data));
        } else if (selectedDateRange === 'weekly') {
          return setAppointments(formatWeeklyAppointments(data));
        } else {
          return setAppointments(formatMonthlyAppointments(data));
        }
      }
    );
    setIsLoading(false);
  };

  // trigger on mount - get appointments from one month ago on initialize
  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDateRange]);

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

  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="range">{handleDisplayXAxis(label)}</p>
          <p className="label">{`${intl.formatMessage({
            id: `report.appointments.chart.tooltip.label`
          })} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value } = props;
    const radius = 10;

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          fill={variables.GREY_03}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value !== 0 ? value : ''}
        </text>
      </g>
    );
  };

  const handleDisplayXAxis = (label: any) => {
    if (selectedDateRange === 'daily') {
      return formatDisplayDate(label);
    } else if (selectedDateRange === 'weekly') {
      const from = formatDisplayDate(dayjs().day(0).week(label).toDate());
      const to = formatDisplayDate(dayjs().day(6).week(label).toDate());
      return `${from} - ${to}`;
    } else if (selectedDateRange === 'monthly') {
      return getMonthNameShort(label);
    }

    return label;
  };

  const handleSelectedDateRangeChanged = (event: any) => {
    const value = event.target.value as string;
    setSelectedDateRange(value);
    value === 'monthly'
      ? setFromDate(dayjs().subtract(6, 'month').toDate())
      : setFromDate(dayjs().subtract(1, 'month').toDate());
  };

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

      <Grid container className="main-container">
        <Grid className="dateRange-container">
          <FormControl>
            <Select value={selectedDateRange} onChange={handleSelectedDateRangeChanged}>
              <MenuItem value="daily">
                {intl.formatMessage({ id: 'report.appointments.chart.dropdown.daily' })}
              </MenuItem>
              <MenuItem value="weekly">
                {intl.formatMessage({ id: 'report.appointments.chart.dropdown.weekly' })}
              </MenuItem>
              <MenuItem value="monthly">
                {intl.formatMessage({ id: 'report.appointments.chart.dropdown.monthly' })}
              </MenuItem>
            </Select>
          </FormControl>
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
        </Grid>
        <Grid>
          <BarChart width={730} height={250} data={appointments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={handleDisplayXAxis} />
            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#8884d8">
              <LabelList dataKey="count" position="top" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
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
