import './App.css';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import { AuthProvider } from './context/authContext';
import AdminHomepage from './pages/AdminHomepage/AdminHomepage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login/" element={<AuthProvider><Login/> </AuthProvider>} />
        <Route path="/admin/home/" element={<AuthProvider><AdminHomepage/> </AuthProvider>} />
      </Routes>
    </Router>
  );
}

export default App;
