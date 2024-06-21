/* eslint-disable no-undef */
import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// routes
import { ToastContainer } from 'react-toastify';
import { RiRobot2Fill } from "react-icons/ri";
import Routers from './routes';

// theme
// components
import 'react-toastify/dist/ReactToastify.css';
import './assets/style.css';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import UserLayout from './layouts/user';
import About from './layouts/user/components/aboutUs/index';
import ContactUs from './layouts/user/components/contactUs/ContactUs';
import Agencies from './layouts/user/components/esgAdvisory/Agencies/agencies';
import Exhibitions from './layouts/user/components/esgAdvisory/exhibitions/exhibitions';
import Hospitality from './layouts/user/components/esgAdvisory/hospitality/hospitality';
import EsgAdvisory from './layouts/user/components/esgAdvisory/index';
import EventExecutionAgency from './layouts/user/components/esgAdvisory/organisations/EventExecutionAgency';
import EventVenue from './layouts/user/components/esgAdvisory/organisations/EventVenue';
import Counsulting from './layouts/user/components/esgAdvisory/organisations/counsulting';
import Organisations from './layouts/user/components/esgAdvisory/organisations/index';
import SustainableEvents from './layouts/user/components/esgAdvisory/organisations/sustainableEvents';
import Faq from './layouts/user/components/faq/faq';
import Footer from './layouts/user/components/footer/footer';
import Header from './layouts/user/components/header/header';
import Services from './layouts/user/components/services/index';
import NewRoom from './layouts/user/components/newsRoom';
import PrivacyPolicy from './layouts/user/components/privacyPolicy/privacyPolicy';
import TermConditions from './layouts/user/components/termCondition/termConditions';
import LoginPage from './pages/LoginPage';
import ThemeProvider from './theme';
import Blog1 from './layouts/user/components/newsRoom/blog1';
import Blog2 from './layouts/user/components/newsRoom/blog2';
import Blog3 from './layouts/user/components/newsRoom/blog3';
import Bot from './layouts/user/components/bot';
// ----------------------------------------------------------------------

export default function App() {

  const token = sessionStorage.getItem('token');

  // eslint-disable-next-line react-hooks/exhaustive-deps, prefer-const
  const user = JSON.parse(sessionStorage.getItem('user'))
  useNavigate()

  const [openBot, setOpenBot] = useState(false);
  const handleCloseBot = () => setOpenBot(false);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <ToastContainer />
      {token && user ? (
        <Routers />
      ) : (
        <>
          <Header />
          <div className='template-outer-theme'>
            <Routes>
              <Route path="/" element={<UserLayout />} />
              <Route path="/measure-ghg-emissions" element={<Services />} />
              <Route path="/netZero-consulting" element={<EsgAdvisory />} />
              <Route path="/netZero-consulting/organisations/" element={<Organisations />} />
              <Route path="/event-venue" element={<EventVenue />} />
              <Route path="/event-execution-agency" element={<EventExecutionAgency />} />
              <Route path="/netZero-consulting/organisations/esg-consulting" element={<Counsulting />} />
              <Route path="/netZero-consulting/organisations/sustainable-events" element={<SustainableEvents />} />
              <Route path="/netZero-consulting/service-providers/" element={<Agencies />} />
              <Route path="/netZero-consulting/hospitality-industry/" element={<Hospitality />} />
              <Route path="/netZero-consulting/exhibition-organiser/" element={<Exhibitions />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/blogs" element={<NewRoom />} />
              <Route path="/blogs/blog1" element={<Blog1 />} />
              <Route path="/blogs/blog2" element={<Blog2 />} />
              <Route path="/blogs/blog3" element={<Blog3 />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/faqs" element={<Faq />} />
              <Route path="/terms-conditions" element={<TermConditions />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
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
              border: 'none'
            }}>
            <RiRobot2Fill style={{ fontSize: '3rem', color: '#007BFF' }} />
          </button>
          <Bot openBot={openBot} handleCloseBot={handleCloseBot}  />
          <Footer />
        </>

      )}
    </ThemeProvider>
  );
}
