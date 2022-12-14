import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase/firebase';
import utils from '../../services/util.service';
import Button from '../common/Button';
import Alert from '../common/Alert';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function onFormSubmit(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userCred);
      navigate('/');
    } catch (err) {
      setError(utils.getFirebaseError(err));
    }
    setLoading(false);
  }

  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-header'>
          <h1 className='m-0'>Login</h1>
        </div>

        <div className='card-body'>
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
                className="form-control" />
            </div>

            <div className='d-grid mt-4'>
              <Button type='submit' loading={loading}>
                Login
              </Button>
            </div>
          </form>

          {
            error ?
              <Alert className='mt-4 mb-0'>
                {error}
              </Alert>
              :
              <></>
          }
        </div>
      </div>
    </div>
  )
}