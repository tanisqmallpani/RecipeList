import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebase';


export default function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      console.log(userCred);
      navigate('/');
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='container mt-5'>
      <div className='card card-body'>
        <h1 className='text-center'>Login</h1>
        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>

          <div className='d-grid'>
            <button className='btn btn-secondary'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}