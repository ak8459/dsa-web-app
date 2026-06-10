import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': return { ...state, user: action.payload, loading: false };
    case 'LOGOUT': return { user: null, loading: false };
    default: return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { user: null, loading: true });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch({ type: 'LOGOUT' });
      return;
    }
    api.get('/auth/me')
      .then(r => {
        dispatch({ type: 'LOGIN', payload: r.data.user || r.data });
      })
      .catch(() => dispatch({ type: 'LOGOUT' }));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    dispatch({ type: 'LOGIN', payload: data.user });
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    dispatch({ type: 'LOGIN', payload: data.user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
