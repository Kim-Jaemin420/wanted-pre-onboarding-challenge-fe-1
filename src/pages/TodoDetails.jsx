import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTodoById, putTodo } from '../api/todo';
import { TodoItem } from '../components';

function TodoDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { title, content },
        } = await getTodoById(id);

        setTitle(title);
        setContent(content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await putTodo({ title, content, id });
      console.log(data);

      setTitle('');
      setContent('');
      navigate('/todos');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TodoItem
      title={title}
      content={content}
      setTitle={setTitle}
      setContent={setContent}
      handleSubmit={handleSubmit}
    />
  );
}

export default TodoDetails;
