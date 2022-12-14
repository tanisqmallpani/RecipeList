import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/collapse';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { auth } from './firebase/firebase';

import './App.css';

import RecipePage from './components/recipes/RecipePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Navbar from './components/common/Navbar';
import RequireAuth from './components/common/RequireAuth';
import Spinner from './components/common/Spinner';

export default function App() {

  const [user, setUser] = useState(null);
  const [userRetrieved, setUserRetrieved] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserRetrieved(true);
    });
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      {
        userRetrieved ?
          <Routes>
            <Route path='/' element={
              <RequireAuth user={user}>
                <RecipePage />
              </RequireAuth>
            } />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
          :
          <div className='text-center mt-5'>
            <Spinner variant='info' />
          </div>
      }

    </BrowserRouter>
  )
}