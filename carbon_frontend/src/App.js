/* eslint-disable no-undef */
import { react } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// routes
import { ToastContainer } from 'react-toastify';
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
import EsgAdvisory from './layouts/user/components/esgAdvisory/index';
import Counsulting from './layouts/user/components/esgAdvisory/organisations/counsulting';
import Organisations from './layouts/user/components/esgAdvisory/organisations/index';
import Footer from './layouts/user/components/footer/footer';
import Header from './layouts/user/components/header/header';
import Services from './layouts/user/components/landingPage/services/index';
import LoginPage from './pages/LoginPage';
import ThemeProvider from './theme';
import SustainableEvents from './layouts/user/components/esgAdvisory/organisations/sustainableEvents';
import Agencies from './layouts/user/components/esgAdvisory/Agencies/agencies';
import Hospitality from './layouts/user/components/esgAdvisory/hospitality/hospitality';
import Exhibitions from './layouts/user/components/esgAdvisory/exhibitions/exhibitions';
import PrivacyPolicy from './layouts/user/components/privacyPolicy/privacyPolicy';
import Faq from './layouts/user/components/faq/faq';
import TermConditions from './layouts/user/components/termCondition/termConditions';
import EventVenue from './layouts/user/components/esgAdvisory/organisations/EventVenue';
import NewRoom from './layouts/user/components/newRoom/index'
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
        <>
          <Header />
            <Routes>
            <Route path="/" element={<UserLayout />} />
            <Route path="/measure-ghg-emissions" element={<Services />} />
            <Route path="/esg-advisory-services" element={<EsgAdvisory />} />
            <Route path="/esg-advisory-services/organisations/" element={<Organisations />} />
            <Route path="/event-venue" element={<EventVenue />} />
            <Route path="/esg-advisory-services/organisations/esg-consulting" element={<Counsulting />} />
            <Route path="/esg-advisory-services/organisations/sustainable-events" element={<SustainableEvents />} />
            <Route path="/esg-advisory-services/service-providers/" element={<Agencies />} />
            <Route path="/esg-advisory-services/hospitality-industry/" element={<Hospitality />} />
            <Route path="/esg-advisory-services/exhibition-organiser/" element={<Exhibitions />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/blogs" element={<NewRoom />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/terms-conditions" element={<TermConditions />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <Footer />
        </>

      )}
    </ThemeProvider>
  );
}
