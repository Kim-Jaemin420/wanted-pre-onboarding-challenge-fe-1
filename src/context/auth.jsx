import { createContext, useState } from 'react';
import { ACCESS_TOKEN } from '../consts/net';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/common';

const AuthContext = createContext({
  token: null,
  updateToken: () => {},
  removeToken: () => {},
});

const AuthProvider = ({ children }) => {
  const token = getLocalStorage(ACCESS_TOKEN);
  const [state, setState] = useState(token);

  const updateToken = token => {
    setLocalStorage(ACCESS_TOKEN, token);
    setState(token);
  };

  const removeToken = () => {
    removeLocalStorage(ACCESS_TOKEN);
    setState(null);
  };

  return (
    <AuthContext.Provider value={{ token: state, updateToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
