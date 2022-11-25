import axios from 'axios';
import { API_URL } from '../constants';
import { AssessmentForm } from '../types';

export const saveAssessmentForm = (assessmentForm: AssessmentForm) => {
  return axios.post(`${API_URL}/patient/assessmentForm`, assessmentForm);
};
export const patientsAppointments = (payload: object) => {
  return axios.post(`${API_URL}/myAppointments`, payload);
};
