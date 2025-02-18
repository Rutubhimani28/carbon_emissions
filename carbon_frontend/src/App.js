/* eslint-disable no-undef */
import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// routes
import { RiRobot2Fill } from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';

// theme
// components
import ReactGA from 'react-ga4';
import 'react-toastify/dist/ReactToastify.css';
import './assets/style.css';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import UserLayout from './layouts/user';
import About from './layouts/user/components/aboutUs/index';
import Bot from './layouts/user/components/bot';
import ContactUs from './layouts/user/components/contactUs/ContactUs';
import Agencies from './layouts/user/components/esgAdvisory/Agencies/agencies';
import Exhibitions from './layouts/user/components/esgAdvisory/exhibitions/exhibitions';
import Hospitality from './layouts/user/components/esgAdvisory/hospitality/hospitality';
import EsgAdvisory from './layouts/user/components/esgAdvisory/index';
import Counsulting from './layouts/user/components/esgAdvisory/organisations/counsulting';
import Organisations from './layouts/user/components/esgAdvisory/organisations/index';
import SustainableEvents from './layouts/user/components/esgAdvisory/organisations/sustainableEvents';
import Faq from './layouts/user/components/faq/faq';
import Footer from './layouts/user/components/footer/footer';
import Header from './layouts/user/components/header/header';
import NewRoom from './layouts/user/components/newsRoom';
import Blog1 from './layouts/user/components/newsRoom/blog1';
import Blog2 from './layouts/user/components/newsRoom/blog2';
import Blog3 from './layouts/user/components/newsRoom/blog3';
import Blog4 from './layouts/user/components/newsRoom/blog4';
import Blog5 from './layouts/user/components/newsRoom/blog5';
import Blog6 from './layouts/user/components/newsRoom/blog6';
import Blog7 from './layouts/user/components/newsRoom/blog7';
import PrivacyPolicy from './layouts/user/components/privacyPolicy/privacyPolicy';
import TermConditions from './layouts/user/components/termCondition/termConditions';
import ForgotPswdPage from './pages/ForgotPswdPage';
import LoginPage from './pages/LoginPage';
import ResetPswdPage from './pages/ResetPswdPage';
import ThemeProvider from './theme';
import GoogleAnalytics from './components/GoogleAnalytics';

// ----------------------------------------------------------------------

export default function App() {
  const token = sessionStorage.getItem('token');

  // eslint-disable-next-line react-hooks/exhaustive-deps, prefer-const
  const user = JSON.parse(sessionStorage.getItem('user'));
  useNavigate();

  const [openBot, setOpenBot] = useState(false);
  const handleCloseBot = () => setOpenBot(false);

  return (
    <ThemeProvider>
      <GoogleAnalytics />
      <ScrollToTop />
      <StyledChart />
      {/* <Routers /> */}
      <ToastContainer />
      {token && user ? (
        <>
          <DashboardLayout />
        </>
      ) : (
        <>
          {window.location.pathname !== '/login' &&
            window.location.pathname !== '/forgot-password' &&
            window.location.pathname !== '/reset-password' && <Header />}
          <div className="template-outer-theme">
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={<UserLayout />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPswdPage />} />
              <Route path="/reset-password" element={<ResetPswdPage />} />
              {/* <Route path="/netzero-platform" element={<Services />} /> */}
              <Route path="/enterprise-solutions" element={<EsgAdvisory />} />
              <Route path="/enterprise-solutions/organisations/" element={<Organisations />} />
              {/* <Route path="/event-venue" element={<EventVenue />} /> */}
              {/* <Route path="/event-execution-agency" element={<EventExecutionAgency />} /> */}
              <Route path="/enterprise-solutions/organisations/esg-consulting" element={<Counsulting />} />
              <Route path="/enterprise-solutions/organisations/sustainable-events" element={<SustainableEvents />} />
              <Route path="/enterprise-solutions/service-providers/" element={<Agencies />} />
              <Route path="/enterprise-solutions/hospitality-industry/" element={<Hospitality />} />
              <Route path="/enterprise-solutions/exhibition-organiser/" element={<Exhibitions />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/news-room" element={<NewRoom />} />
              <Route path="/news-room/blog1" element={<Blog1 />} />
              <Route path="/news-room/blog2" element={<Blog2 />} />
              <Route path="/news-room/blog3" element={<Blog3 />} />
              <Route path="/news-room/blog4" element={<Blog4 />} />
              <Route path="/news-room/blog5" element={<Blog5 />} />
              <Route path="/news-room/blog6" element={<Blog6 />} />
              <Route path="/news-room/blog7" element={<Blog7 />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/faqs" element={<Faq />} />
              <Route path="/terms-conditions" element={<TermConditions />} />
              {/* <Route path="/team" element={<Team />} /> */}
            </Routes>
          </div>

          <button
            onClick={() => setOpenBot(true)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: '1000',
              padding: '5px',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '30%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: 'none',
            }}
          >
            <RiRobot2Fill style={{ fontSize: '3rem', color: '#007BFF' }} />
          </button>
          <Bot openBot={openBot} handleCloseBot={handleCloseBot} subject="Feedback or Questions" />
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}
