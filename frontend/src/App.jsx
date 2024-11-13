import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import { useDispatch } from 'react-redux'
import { authActions } from './store/auth'
import NoPage from './pages/noPage'
import Podcasts from './pages/podcasts'
import AddPodcast from './pages/addpodcast'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/check-cookie', { credentials: 'include' });
        const data = await response.json();
        if (data.message) {
          dispatch(authActions.login());
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NoPage />}></Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/all-podcasts" element={<Podcasts />} />
          <Route path="/add-podcasts" element={<AddPodcast />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
