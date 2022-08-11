import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './todoForm.module.scss';
import { postTodo } from '../../api/todo';

const { wrapper, label } = styles;

function TodoForm({ setTodos }) {
  const handleChangeContent = event => {
    setContent(event.target.value);
  };

  const handleSubmitForm = async event => {
    event.preventDefault();

    const { titleField, contentField } = event.currentTarget;
    const title = titleField.value;
    const content = contentField.value;

    try {
      const { data: todo } = await postTodo({ title, content });

      await setTodos(todos => [todo, ...todos]);

      titleField.value = '';
      contentField.value = '';
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeForm = event => {
    let isDisabled = false;
    const { titleField, contentField, submit } = event.currentTarget;

    if (!titleField.value || !contentField.value) {
      isDisabled = true;
    }

    submit.disabled = isDisabled;
  };

  return (
    <form onSubmit={handleSubmitForm} onChange={handleChangeForm} className={wrapper}>
      <label htmlFor="title" className={classNames(label, 'a11yHidden')}>
        title
      </label>
      <input type="text" id="title" name="titleField" placeholder="title" />
      <label htmlFor="content" className={classNames(label, 'a11yHidden')}>
        content
      </label>
      <textarea
        id="content"
        name="contentField"
        cols="30"
        rows="3"
        placeholder="what do you need to do?"
      ></textarea>
      <input type="submit" name="submit" value="추가" disabled />
    </form>
  );
}

export default TodoForm;
