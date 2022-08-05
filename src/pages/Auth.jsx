import React, { useState } from 'react';

function Auth() {
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

  return (
    <form>
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
