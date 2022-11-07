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
