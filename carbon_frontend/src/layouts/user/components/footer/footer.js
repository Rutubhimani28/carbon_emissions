import React from 'react'
import { MdMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { Box } from '@mui/material';
import { Padding } from '@mui/icons-material';


const Footer = () => {
    const date = new Date();
    const year = date.getFullYear()
    return (
        <div className='text-light text-center py-4' style={{ backgroundColor: "#4ABD43" }} >
            <p>
                <a href="#" className='px-2 text-decoration-none text-light'>Home </a> |
                <a href="#" className='px-2 text-decoration-none text-light'> About Us </a>|
                <a href="#" className='px-2 text-decoration-none text-light'> ESG Advisory Services </a>|
                <a href="#" className='px-2 text-decoration-none text-light'>Measure Carbon Emissions </a>|
                <a href="#" className='px-2 text-decoration-none text-light'> News Room </a>|
                <a href="#" className='px-2 text-decoration-none text-light'> Terms & Conditions </a>|
                <a href="#" className='px-2 text-decoration-none text-light'> Privacy Policy </a>|
                <a href="#" className='px-2 text-decoration-none text-light'> Contact </a>|
                <a href="#" className='px-2 text-decoration-none text-light'> FAQs </a>
            </p>
            <div className='d-flex justify-content-center py-2 pb-4'>
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#ff0000", color: "#fff", borderRadius: "5px" }}><MdMail /></Box>
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#69727d", color: "#fff", borderRadius: "5px" }}><IoCallOutline /></Box>
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#000000", color: "#fff", borderRadius: "5px" }}><FaXTwitter /></Box>
                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#0077b5", color: "#fff", borderRadius: "5px" }}><FaLinkedin /></Box>
            </div>
            <p> copyright  &copy; {year} Go Sustainable. All Rights Reserved</p>
        </div>
    )
}

export default Footer
