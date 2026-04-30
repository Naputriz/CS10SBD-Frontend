const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const api = {

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),


  register: (userData) =>
    request('/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getUser: (email) => request(`/user/${email}`),


  getItems: () => request('/items'),


  createTransaction: (data) =>
    request('/transaction/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
