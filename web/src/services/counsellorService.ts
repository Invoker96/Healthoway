import axios from 'axios';
import { API_URL } from '../constants';

export const listOfPatient = () => {
  return axios.get(`${API_URL}/listOfPatient`);
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

export const listOfDoctors = () => {
  return axios.get(`${API_URL}/listOfDoctors`);
};

export const assignToDoctor = (payload: object) => {
  return axios.post(`${API_URL}/assignToDoctor`, payload);
};

export const myAppointments = (payload: object) => {
  return axios.post(`${API_URL}/myAppointments`, payload);
};
