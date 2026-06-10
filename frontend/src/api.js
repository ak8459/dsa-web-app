const BASE_URL = 'http://localhost:5000/api';

const headers = (token = null) => {
  const h = { 'Content-Type': 'application/json' };
  if (token) {
    h['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

export const register = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const getMe = async (token) => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: headers(token)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Session verification failed');
  return data.user;
};

export const getTopics = async (token) => {
  const res = await fetch(`${BASE_URL}/topics`, {
    method: 'GET',
    headers: headers(token)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch topics');
  return data;
};

export const getProgress = async (token) => {
  const res = await fetch(`${BASE_URL}/progress`, {
    method: 'GET',
    headers: headers(token)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch progress');
  return data.map(item => item.problemId); // Return plain array of problem IDs
};

export const markCompleted = async (token, problemId) => {
  const res = await fetch(`${BASE_URL}/progress/${problemId}`, {
    method: 'POST',
    headers: headers(token)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to mark problem completed');
  return data;
};

export const unmarkCompleted = async (token, problemId) => {
  const res = await fetch(`${BASE_URL}/progress/${problemId}`, {
    method: 'DELETE',
    headers: headers(token)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to unmark problem progress');
  return data;
};
