import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth, TodoList, TodoDetails } from './pages/index.js';
import './App.css';
import { getLocalStorage } from './utils/common.js';
import { ACCESS_TOKEN } from './consts/net.js';

function App() {
  const TOKEN = getLocalStorage(ACCESS_TOKEN);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/signUp" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/todos/*" element={<TodoDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
