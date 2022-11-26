import axios from 'axios';
import { API_URL } from '../constants';
import { User } from '../types';

export const createUser = (user: User) => {
  return axios.post(`${API_URL}/users`, user);
};

export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const deleteUser = (username: string) => {
  return axios.delete(`${API_URL}/users?username=${username}`);
};
