import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [completed, setCompleted] = useState(new Set());

  useEffect(() => {
    if (!user) {
      setCompleted(new Set());
      return;
    }
    api.get('/progress').then(r => {
      setCompleted(new Set(r.data.map(p => p.problemId)));
    }).catch(err => {
      console.error('Failed to fetch progress:', err.message);
    });
  }, [user]);

  const toggle = async (problemId) => {
    const isDone = completed.has(problemId);
    // Optimistic update
    setCompleted(prev => {
      const next = new Set(prev);
      if (isDone) {
        next.delete(problemId);
      } else {
        next.add(problemId);
      }
      return next;
    });
    
    try {
      if (isDone) {
        await api.delete(`/progress/${problemId}`);
      } else {
        await api.post(`/progress/${problemId}`);
      }
    } catch (err) {
      console.error('Failed to sync progress with server, rolling back:', err.message);
      // Rollback on failure
      setCompleted(prev => {
        const next = new Set(prev);
        if (isDone) {
          next.add(problemId);
        } else {
          next.delete(problemId);
        }
        return next;
      });
    }
  };

  return (
    <ProgressContext.Provider value={{ completed, toggle }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
