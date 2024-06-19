import React from 'react'
import { MdMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { Box } from '@mui/material';
import { Padding } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Footer = () => {
    const date = new Date();
    const year = date.getFullYear()
    return (
        <div className='text-light text-center py-4 template-inner-theme' style={{ backgroundColor: "#4ABD43" }} >
            <p>
                <Link to="/" className='px-2 text-decoration-none text-light'>Home </Link> |
                <Link to="/about-us" className='px-2 text-decoration-none text-light'> About Us </Link>|
                <Link to="/netZero-consulting" className='px-2 text-decoration-none text-light'> ESG Advisory Services </Link>|
                <Link to="/measure-ghg-emissions" className='px-2 text-decoration-none text-light'>NetZero tool </Link>|
                <Link to="#" className='px-2 text-decoration-none text-light'> News Room </Link>|
                <Link to="/terms-conditions" className='px-2 text-decoration-none text-light'> Terms & Conditions </Link>|
                <Link to="/privacy-policy" className='px-2 text-decoration-none text-light'> Privacy Policy </Link>|
                <Link to="/contact-us" className='px-2 text-decoration-none text-light'> Contact </Link>|
                <Link to="/faqs" className='px-2 text-decoration-none text-light'> FAQs </Link>
            </p>
            <div className='d-flex justify-content-center py-2 pb-4'>
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#ff0000", color: "#fff", borderRadius: "5px" }}><MdMail /></Box>
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#69727d", color: "#fff", borderRadius: "5px" }}><IoCallOutline /></Box>
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#000000", color: "#fff", borderRadius: "5px" }}><FaXTwitter /></Box>
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#0077b5", color: "#fff", borderRadius: "5px" }}><FaLinkedin /></Box>
            </div>
            <p> copyright  &copy; {year} Sirat2Sustainability Pvt Ltd. All Rights Reserved</p>
        </div>
    )
}

export default Footer
