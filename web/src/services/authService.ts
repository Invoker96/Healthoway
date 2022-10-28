import axios from 'axios';
import { API_URL } from '../constants';
import { Auth } from '../types';

export const authenticator = (payload: Auth) => {
  return axios.post(`${API_URL}/healthoway/login`, payload);
};
