import axios from 'axios';
import { API_URL } from '../constants';

export const getAppointmentsByDateRange = (dateFrom: string, dateTo: string) => {
  return axios.get(`${API_URL}/manager/appointments?from=${dateFrom}&to=${dateTo}`);
};
