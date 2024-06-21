import { Typography } from '@mui/material';
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import blog3 from '../../assets/images/room3.jpg';


const Blog3 = () => {
    return (
        <div className='main mt-5 pb-5 position-relative'>
            <div className='container'>

                <div className='container pt-5 d-flex justify-content-center'>
                    <img src={blog3} alt="blog2" width={'65%'} className='blogImageRadius' />
                </div>
                <Typography variant='h6' className='text-center fs-2 pt-4 fontFamily fw-bold px-3 wow animate__animated animate__fadeInUp animate__slow' >Go Sustainable Unveils Net-Zero Framework To Reduce Carbon Footprint In Marketing Operations- Zee News</Typography>


            </div>

        </div>
    )
}

export default Blog3
