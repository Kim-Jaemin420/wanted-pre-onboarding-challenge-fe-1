import http from './base';

export const getTodos = () => {
  return http.get({
    url: '/todos',
  });
};

export const postTodo = ({ title, content }) => {
  return http.post({
    url: '/todos',
    data: { title, content },
  });
};

export const putTodo = ({ title, content, id }) => {
  return http.put({
    url: `/todos/${id}`,
    data: { title, content },
  });
};

export const deleteTodo = id => {
  return http.delete({
    url: `/todos/${id}`,
  });
};
