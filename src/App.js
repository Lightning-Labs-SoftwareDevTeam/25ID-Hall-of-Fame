import './App.css';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
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
          <Route path="/login/" element={<AuthProvider><Login/> </AuthProvider>} />
          <Route path="/admin/home/" element={<AuthProvider><AdminHomepage/> </AuthProvider>} />
          <Route path="/admin/inductee" element={<AuthProvider><AdminInductee/> </AuthProvider>} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
