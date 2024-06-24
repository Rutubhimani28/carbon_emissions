import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MdMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaQq } from "react-icons/fa";
import { Box, Button } from '@mui/material';
import { Padding } from '@mui/icons-material';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear()
    return (
        <div className='text-light text-center py-4 template-inner-theme' style={{ backgroundColor: "#4ABD43" }} >
            <p>
                <Link to="/" className='px-2 text-decoration-none text-light'>Home </Link> |
                <Link to="/measure-ghg-emissions" className='px-2 text-decoration-none text-light'>NetZero Platform </Link>|
                <Link to="/netZero-consulting" className='px-2 text-decoration-none text-light'> NetZero Consulting </Link>|
                <Link to="/blogs" className='px-2 text-decoration-none text-light'> News Room </Link>|
                <Link to="/about-us" className='px-2 text-decoration-none text-light'> About Us </Link>|
                <Link to="/contact-us" className='px-2 text-decoration-none text-light'> Contact </Link>|
                <Link to="/terms-conditions" className='px-2 text-decoration-none text-light'> Terms & Conditions </Link>|
                <Link to="/privacy-policy" className='px-2 text-decoration-none text-light'> Privacy Policy </Link>|
                <Link to="/faqs" className='px-2 text-decoration-none text-light'> FAQs </Link>
            </p>
            <div className='d-flex justify-content-center py-2 pb-4'>
                {/* <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#ff0000", color: "#fff", borderRadius: "5px" }}><MdMail /></Box> */}
                {/* <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#69727d", color: "#fff", borderRadius: "5px" }}><IoCallOutline /></Box> */}
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#0077b5", color: "#fff", borderRadius: "5px", textDecoration: 'none' }}><Link to="https://www.linkedin.com/in/shafeeqm/"><FaLinkedin style={{ color: 'white' }} /></Link></Box>
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#000000", color: "#fff", borderRadius: "5px", textDecoration: 'none' }}><Link to="https://x.com/shafeeqm"><FaXTwitter style={{ color: 'white' }} /></Link></Box>
            </div>
            <p> Copyright  &copy; {year} Sirat2Sustainability Pvt Ltd. All Rights Reserved</p>
        </div>
    )
}
export default Footer