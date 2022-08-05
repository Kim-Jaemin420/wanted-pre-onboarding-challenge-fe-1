import { ACCESS_TOKEN } from '../consts/net';
import http from './base';

export const signUp = async ({ email, password }) => {
  const { data } = await http.post({
    url: '/users/create',
    data: { email, password },
  });

  if (data.token) {
    localStorage.setItem(ACCESS_TOKEN, data.token);
  }
};
