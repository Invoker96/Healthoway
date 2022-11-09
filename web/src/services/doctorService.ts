import axios from 'axios';
import { API_URL } from '../constants';

export const listOfPatient = (payload: object) => {
  return axios.post(`${API_URL}/doctor/listOfPatient`, payload);
};

export const getSelfAssesmentResult = (payload: object) => {
  return axios.post(`${API_URL}/getSelfAssesmentResult`, payload);
};

export const removePatient = (payload: object) => {
  return axios.post(`${API_URL}/remove`, payload);
};

export const assignToSelf = (payload: object) => {
  return axios.post(`${API_URL}/scheduleAppointment`, payload);
};

export const myAppointments = (payload: object) => {
  return axios.post(`${API_URL}/myAppointments`, payload);
};
