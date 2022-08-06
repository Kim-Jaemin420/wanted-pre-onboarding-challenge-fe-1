import React, { useState } from 'react';
import { postTodo } from '../api/todo';

function TodoForm({ setTodos }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };

  const handleChangeContent = event => {
    setContent(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data: todo } = await postTodo({ title, content });

      await setTodos(todos => [todo, ...todos]);

      setTitle('');
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">title</label>
      <input type="text" id="title" value={title} onChange={handleChangeTitle} />
      <label htmlFor="content">content</label>
      <textarea
        id="content"
        name="contentField"
        cols="30"
        rows="3"
        value={content}
        onChange={handleChangeContent}
      ></textarea>

      <input type="submit" value="추가" disabled={!(title && content)} />
    </form>
  );
}

export default TodoForm;
