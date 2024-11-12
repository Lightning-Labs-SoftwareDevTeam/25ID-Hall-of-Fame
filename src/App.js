import './App.css';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login/" element={<AuthProvider><Login/> </AuthProvider>} />
      </Routes>
    </Router>
  );
}

export default App;
