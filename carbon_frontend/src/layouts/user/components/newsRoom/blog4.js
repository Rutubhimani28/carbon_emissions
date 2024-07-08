import { Typography } from '@mui/material';
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import blog4 from '../../assets/images/room4.png';
import Room1 from '../../assets/images/room1.jpeg';

const Blog4 = () => {
    return (
        <div className="main mt-5 pb-5 position-relative">
            <div className="container">
                <div className="container pt-5 d-flex justify-content-center">
                    <img src={blog4} alt="blog2" width={'65%'} className="blogImageRadius" />
                </div>
                <Typography variant='h6' className='text-center fs-2 pt-4 my-4 fontFamily fw-bold px-3 wow animate__animated animate__fadeInUp animate__slow' >
                    <Link to="https://forceforgood.insead.edu/article/mohammed-shafeeq-ilpse-c10-pioneering-sustainable-entrepreneurship-marketing" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Mohammed Shafeeq ILPSE C10, Pioneering Sustainable Entrepreneurship in Marketing</Link>
                </Typography>
            </div>
            <div style={{ position: "fixed", bottom: "70px", right: "0", }}>
                <Link to='/news-room/blog1' className='d-flex nextBlogRight'>
                    <div style={{ backgroundColor: "#ffffd9", color: "#fff", padding: "25px 10px" }}>
                        <FaChevronRight />
                    </div>
                    <img src={Room1} alt="blog2" height={"80px"} width={"100px"} />
                    <div className='nextBlogContentRight'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "#ffffd9" }}>Going Eco-Friendly with Go Sustainable: Aster CMI Hospital, Bangalore, hosts 2nd IAP-PEM Conference to make a green footprint</Typography>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Blog4;
