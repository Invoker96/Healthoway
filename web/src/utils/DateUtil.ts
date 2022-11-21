export const formatDateToString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const formatDateTimeString = (date: string) => {
  return new Date(date).toLocaleString('en-US');
};
