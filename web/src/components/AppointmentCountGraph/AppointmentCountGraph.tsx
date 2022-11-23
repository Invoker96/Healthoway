import { Grid, FormControl, Select, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LabelList,
  ResponsiveContainer
} from 'recharts';
import { getAppointmentsByDateRange } from '../../services/managerService';
import { formatDateToString, formatDisplayDate, getMonthNameShort } from '../../utils/DateUtil';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

import './AppointmentCountGraph.scss';
import variables from '../../variables.scss';

type Props = {
  intl: any;
};

type GraphType = {
  date: string;
  count: number;
};

const AppointmentCountGraph = ({ intl }: Props) => {
  dayjs.extend(weekOfYear);
  dayjs.extend(weekday);

  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<GraphType[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState('daily');
  const [fromDate, setFromDate] = useState(dayjs().subtract(1, 'month').toDate());
  const [toDate, setToDate] = useState(dayjs().toDate());

  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDateRange]);

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

  const handleSelectedDateRangeChanged = (event: any) => {
    const value = event.target.value as string;
    setSelectedDateRange(value);
    value === 'monthly'
      ? setFromDate(dayjs().subtract(6, 'month').toDate())
      : setFromDate(dayjs().subtract(1, 'month').toDate());
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

  return (
    <Grid className="main-container">
      <LoadingSpinner isOpen={isLoading} />
      <Grid className="dateRange-container">
        <FormControl className="dropdown-range">
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
      </Grid>
      <Grid className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={appointments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={handleDisplayXAxis} />
            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#8884d8">
              <LabelList dataKey="count" position="top" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default injectIntl(AppointmentCountGraph);
