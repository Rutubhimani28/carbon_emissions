import { Typography } from '@mui/material';
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import blog3 from '../../assets/images/room3.jpg';


const Blog3 = () => {
    return (
        <div className='main mt-5 pb-5 position-relative template-outer-theme'>
            <div className='container'>
                <div className='container pt-5 d-flex justify-content-center'>
                    <img src={blog3} alt="blog2" width={'65%'} className='blogImageRadius' />
                </div>
                <Typography variant='h6' className='text-center fs-2 pt-4 fontFamily fw-bold px-3 wow animate__animated animate__fadeInUp animate__slow' >
                    <Link to="https://zeenews-india-com.cdn.ampproject.org/c/s/zeenews.india.com/companies/go-sustainable-unveils-a-net-zero-framework-to-reduce-carbon-footprint-in-marketing-operations-2715454.html/amp" target="_blank"  style={{ textDecoration: 'none', color: '#1f9e6d' }}>Go Sustainable Unveils Net-Zero Framework To Reduce Carbon Footprint In Marketing Operations- Zee News</Link>
                </Typography>
            </div>
        </div>
    )
}

export default Blog3;
