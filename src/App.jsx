import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth, Todos, TodoDetail } from './pages/index.js';
import { AuthContext } from './context/auth.jsx';
import './styles/index.scss';

const RequiredAuth = ({ children, isAuth, to = '/login' }) => {
  if (!isAuth) {
    return <Navigate to={to} />;
  }
  return <>{children}</>;
};

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequiredAuth isAuth={token}>
                <Todos />
              </RequiredAuth>
            }
          />
          <Route
            path="/signUp"
            element={
              <RequiredAuth isAuth={!token} to="/todos">
                <Auth />
              </RequiredAuth>
            }
          />
          <Route
            path="/login"
            element={
              <RequiredAuth isAuth={!token} to="/todos">
                <Auth />
              </RequiredAuth>
            }
          />
          <Route
            path="/todos"
            element={
              <RequiredAuth isAuth={token}>
                <Todos />
              </RequiredAuth>
            }
          />
          <Route
            path="/todos/*"
            element={
              <RequiredAuth isAuth={token}>
                <TodoDetail />
              </RequiredAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
