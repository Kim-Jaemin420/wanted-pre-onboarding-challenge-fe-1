import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signUp, login } from '../api/user';
import { ACCESS_TOKEN } from '../consts/net';
import { setLocalStorage } from '../utils/common';

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUpPage = location.pathname === '/signUp';
  const isLoginPage = location.pathname === '/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const validateEmailCondition = email => {
    const EMAIL_REGEX =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (EMAIL_REGEX.test(email)) {
      return true;
    }

    return false;
  };

  const validatePasswordCondition = password => {
    const PASSWORD_MINIMUM_LENGTH = 8;

    if (password.length >= PASSWORD_MINIMUM_LENGTH) {
      return true;
    }

    return false;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (isSignUpPage) {
      try {
        const { message } = await signUp({ email, password });
        alert(message);
        navigate('/login');
      } catch (error) {
        alert('이미 가입된 회원입니다');
      }
    }

    if (isLoginPage) {
      try {
        const { token } = await login({ email, password });
        setLocalStorage(ACCESS_TOKEN, token);
        navigate('/');
      } catch (error) {
        console.log(error);
        alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" required value={email} onChange={handleChangeEmail} />
      <input type="password" required value={password} onChange={handleChangePassword} />
      <input
        type="submit"
        disabled={!(validateEmailCondition(email) && validatePasswordCondition(password))}
      />
    </form>
  );
}

export default Auth;
