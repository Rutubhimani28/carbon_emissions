import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

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
                <a href="#" className='px-2 text-decoration-none text-light'> FAQs </a></p>
            <p> copyright  &copy; {year} Go Sustainable. All Rights Reserved</p>
        </div>
    )
}

export default Footer
