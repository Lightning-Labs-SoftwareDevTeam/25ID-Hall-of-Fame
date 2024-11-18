import React, { createContext, useState, useContext, useEffect } from 'react';
import loginService from '../services/loginService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', userToken);
    } else {
      localStorage.removeItem('userToken');
    }
  }, [userToken]);

  const login = async (loginData) => {   
    if (loginData.username === '' || !loginData.username) {
      setError('Enter username');
      return;
    } 
    else if (loginData.password === '' || !loginData.password) {
      setError('Enter password');
      return;
    }
    try {
      setError('');
      const data = await loginService(loginData);
      if (!data.getToken()) {
        throw new Error('Network error')
      }
      setUserToken(data.getToken());
      return true;
    } catch (error) {
      if (error.message === 'Invalid username/password') {
        setError(error.message);
      }
      else {
        setError('Network error')
      }
      return false;
    }
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);