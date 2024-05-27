/* eslint-disable no-undef */
import React, { } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// routes
import { ToastContainer } from 'react-toastify';
import Routers from './routes';
import UserRoutes from './UserRouters'

// theme
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import LoginPage from './pages/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from './theme';
import './assets/style.css'
import UserLayout from './layouts/user';
import Services from './layouts/user/components/landingPage/services/index'
import About from './layouts/user/components/aboutUs/index';
import EsgAdvisory from './layouts/user/components/esgAdvisory/index'
import Organisations from './layouts/user/components/esgAdvisory/organisations/index';

// ----------------------------------------------------------------------

export default function App() {

  const token = sessionStorage.getItem('token');

  // eslint-disable-next-line react-hooks/exhaustive-deps, prefer-const
  const user = JSON.parse(sessionStorage.getItem('user'))
  useNavigate()

  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <ToastContainer />
      {token && user ? (
        <Routers />
      ) : (

        <Routes>
          <Route path="/" element={<UserLayout />} />
          <Route path="/measure-ghg-emissions" element={<Services />} />
          <Route path="/esg-advisory-services" element={<EsgAdvisory />} />
          <Route path="/esg-advisory-services/organisations/" element={<Organisations />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

      )}
    </ThemeProvider>
  );
}
