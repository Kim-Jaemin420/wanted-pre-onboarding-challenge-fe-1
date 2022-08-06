import http from './base';

export const signUp = ({ email, password }) => {
  return http.post({
    url: '/users/create',
    data: { email, password },
  });
};

export const login = ({ email, password }) => {
  return http.post({
    url: '/users/login',
    data: { email, password },
  });
};
