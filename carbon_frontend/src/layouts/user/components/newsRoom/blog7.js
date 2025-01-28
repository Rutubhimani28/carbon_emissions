import { Typography } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import blog7 from '../../assets/images/room7.jpg';
import blog1 from '../../assets/images/room1.jpeg';
import blog6 from '../../assets/images/room6.jpg';

const Blog7 = () => {
    return (
        <div className="main mt-5 pb-5 position-relative">
            <div className="container">
                <div className="container pt-5 d-flex justify-content-center">
                    <img src={blog7} alt="blog1" width={'65%'} className="blogImageRadius" />
                </div>
                <Typography variant='h6' className='text-center fs-2 pt-1 my-4 fontFamily fw-bold px-3 wow animate__animated animate__fadeInUp animate__slow' >
                    <Link to="https://hutch.lk/hutch-deepens-commitment-to-sustainability-with-adoption-of-sirat-netzero-platform/" target="_blank" style={{ textDecoration: 'none', color: '#1f9e6d' }}>HUTCH Deepens Commitment to Sustainability with Adoption of Sirāt NetZero Platform</Link>
                </Typography>
            </div>
            <div style={{ position: "fixed", bottom: "70px", left: "0", }} >
                <Link to='/news-room/blog1' className='d-flex nextBlog'>
                    <div style={{ backgroundColor: "#ffffd9", padding: "25px 10px" }}>
                        <FaChevronLeft />
                    </div>
                    <img src={blog1} alt="blog1" height={"80px"} width={"100px"} />
                    <div className='nextBlogContent'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "blue" }}>
                        Go Sustainable Unveils Net-Zero Framework To Reduce Carbon Footprint In Marketing Operations- Zee News
                        </Typography>
                    </div>
                </Link>
            </div>
            <div style={{ position: "fixed", bottom: "70px", right: "0px" }}>
                <Link to='/news-room/blog6' className='d-flex nextBlogRight'>
                    <div style={{ backgroundColor: "#ffffd9", padding: "25px 10px" }}>
                        <FaChevronRight />
                    </div>
                    <img src={blog6} alt="blog6" height={"80px"} width={"100px"} />
                    <div className='nextBlogContentRight'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "blue" }}>Sirāt Files Patent for Innovative NetZero Platform</Typography>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Blog7;
