import React, { useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signUp, login } from '../../api/user';
import { AuthContext } from '../../context/auth';
import styles from './auth.module.scss';

const { wrapper, formTitle } = styles;

function Auth() {
  const { updateToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUpPage = location.pathname === '/signUp';
  const isLoginPage = location.pathname === '/login';
  const currentPathname = useMemo(() => {
    if (isSignUpPage) return 'sign up';
    if (isLoginPage) return 'login';
  }, [isLoginPage, isSignUpPage]);

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
    const { emailField, passwordField } = event.currentTarget;
    const email = emailField.value;
    const password = passwordField.value;

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
        updateToken(token);
        navigate('/todos');
      } catch (error) {
        console.log(error);
        alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  const handleChangeForm = event => {
    let isDisabled = false;
    const { emailField, passwordField, submit } = event.currentTarget;

    if (
      !validateEmailCondition(emailField.value) ||
      !validatePasswordCondition(passwordField.value)
    ) {
      isDisabled = true;
    }

    submit.disabled = isDisabled;
  };

  return (
    <form onSubmit={handleSubmit} onChange={handleChangeForm}>
      <fieldset className={wrapper}>
        <legend className={formTitle}>{currentPathname}</legend>
        <input type="email" required name="emailField" />
        <input type="password" required name="passwordField" />
        <input type="submit" name="submit" value={currentPathname} disabled />
      </fieldset>
    </form>
  );
}

export default Auth;
