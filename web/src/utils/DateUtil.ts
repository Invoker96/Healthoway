import dayjs from 'dayjs';

//returns date in "yyyy-MM-dd" string
export const formatDateToString = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDateTimeString = (date: string) => {
  return dayjs(date).format('D MMM YYYY h:m A');
};

export const formatDisplayDate = (date: Date) => {
  return dayjs(date).format('DD MMM YYYY');
};

export const getMonthNameShort = (date: Date) => {
  return dayjs(date).format('MMM');
};

export const getMonthName = (date: Date) => {
  return dayjs(date).format('MMMM');
};
