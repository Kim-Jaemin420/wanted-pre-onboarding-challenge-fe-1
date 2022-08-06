import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth, TodoList, TodoDetails } from './pages/index.js';
import { AuthContext } from './context/auth.jsx';
import './App.css';

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
                <TodoList />
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
                <TodoList />
              </RequiredAuth>
            }
          />
          <Route
            path="/todos/*"
            element={
              <RequiredAuth isAuth={token}>
                <TodoDetails />
              </RequiredAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
