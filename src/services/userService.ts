import axios from 'axios';
import { API_URL } from '../constants';
import { User } from '../types';

export const createUser = (user: User) => {
  return axios.post(`${API_URL}/user`, user);
};
