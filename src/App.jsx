import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
