import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/sign_in', { email, password });
      localStorage.setItem('token', res.data.session.access_token);
      API.defaults.headers.common['Authorization'] = `Bearer ${res.data.session.access_token}`;
      nav('/dashboard');
    } catch {
      alert('Login failed');
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl mb-4">Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-4" />
      <button type="submit" className="bg-blue-500 px-4 py-2 text-white">Log In</button>
    </form>
  );
}
