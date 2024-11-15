import './App.css';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Inductee from './pages/Inductee/Inductee';
import Login from './pages/Login/Login';
import { AuthProvider } from './context/authContext';
import { ToastProvider } from './context/toastContext/toastContext';
import AdminHomepage from './pages/AdminHomepage/AdminHomepage';
import AdminInductee from './pages/AdminInductee/AdminInductee';


function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/inductee" element={<Inductee />} />
        </Routes>
        <AuthProvider>
          <Routes>
            <Route path="/login/" element={<Login/>} />
            <Route path="/admin/home/" element={<AdminHomepage/>} />
            <Route path="/admin/inductee" element={<AdminInductee/>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ToastProvider>
  );
}

export default App;
