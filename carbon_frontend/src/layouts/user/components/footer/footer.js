import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMail } from 'react-icons/md';
import { IoCallOutline } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedin, FaQq } from 'react-icons/fa';
import { Box, Button } from '@mui/material';
import { Padding } from '@mui/icons-material';
import TweetMetrics from '../../../../components/twitterAnalytics';
import LinkedInButton, { handleLogoClick } from '../../../../components/Linkendin';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="text-light text-center py-4 template-inner-theme" style={{ backgroundColor: '#4ABD43' }}>
      <p className="px-2">
        <Link to="/" className="px-2 text-decoration-none text-light">
          Home{' '}
        </Link>{' '}
        |
        {/* <Link to="/netzero-platform" className="px-2 text-decoration-none text-light">
          NetZero Platform{' '}
        </Link>
        | */}
        <Link to="/enterprise-solutions" className="px-2 text-decoration-none text-light">
          {' '}
          Enterprise Solutions{' '}
        </Link>
        |
        <Link to="/about-us" className="px-2 text-decoration-none text-light">
          {' '}
          About Us{' '}
        </Link>
        |
        <Link to="/news-room" className="px-2 text-decoration-none text-light">
          {' '}
          News Room{' '}
        </Link>
        |
        <Link to="/contact" className="px-2 text-decoration-none text-light">
          {' '}
          Contact{' '}
        </Link>
        |
        <Link to="/terms-conditions" className="px-2 text-decoration-none text-light">
          {' '}
          Terms & Conditions{' '}
        </Link>
        |
        <Link to="/privacy-policy" className="px-2 text-decoration-none text-light">
          {' '}
          Privacy Policy{' '}
        </Link>
        |
        <Link to="/faqs" className="px-2 text-decoration-none text-light">
          {' '}
          FAQs{' '}
        </Link>
        {/* <Link to="/team" className='px-2 text-decoration-none text-light'> Our Team </Link> */}
      </p>
      <div className="d-flex justify-content-center py-2 pb-4">
        {/* <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#ff0000", color: "#fff", borderRadius: "5px" }}><MdMail /></Box> */}
        {/* <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#69727d", color: "#fff", borderRadius: "5px" }}><IoCallOutline /></Box> */}
        <Box
          onClick={handleLogoClick}
          style={{
            padding: '2px 10px 4px 10px',
            fontSize: '20px',
            marginRight: '10px',
            backgroundColor: '#0077b5',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          <Link target="_blank" to="https://www.linkedin.com/company/sirat-earth/">
          {/* <LinkedInButton/> */}
            <FaLinkedin style={{ cursor: 'pointer', color: 'white' }} />
          </Link>
        </Box>
        <Box
          style={{
            padding: '2px 10px 4px 10px',
            fontSize: '20px',
            marginRight: '10px',
            backgroundColor: '#000000',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          <Link target="_blank" to="https://x.com/Sirat_Earth">
            <TweetMetrics tweetId="1891457655572738048" />
            <FaXTwitter style={{ cursor: 'pointer', color: 'white' }} />
          </Link>
        </Box>
      </div>
      <p className="px-2"> Copyright &copy; {year} Sirat2Sustainability Pvt Ltd. All Rights Reserved</p>
    </div>
  );
};
export default Footer;
