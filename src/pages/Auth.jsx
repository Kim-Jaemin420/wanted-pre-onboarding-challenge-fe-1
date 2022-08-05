import React, { useState } from 'react';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = e => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  return (
    <form>
      <input type="email" required value={email} onChange={handleChangeEmail} />
      <input type="password" required value={password} onChange={handleChangePassword} />
      <input type="submit" disabled={true} />
    </form>
  );
}

export default Auth;
