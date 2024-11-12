import { Typography } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import blog5 from '../../assets/images/room5.jpg';
import blog1 from '../../assets/images/room1.jpeg';
import blog4 from '../../assets/images/room4.png';

const Blog5 = () => {
    return (
        <div className="main mt-5 pb-5 position-relative">
            <div className="container">
                <div className="container pt-5 d-flex justify-content-center">
                    <img src={blog5} alt="blog2" width={'65%'} className="blogImageRadius" />
                </div>
                <Typography variant='h6' className='text-center fs-2 pt-4 my-4 fontFamily fw-bold px-3 wow animate__animated animate__fadeInUp animate__slow' >
                    <Link to="https://etedge-insights.com/sdgs-and-esg/sustainability/leading-the-netzero-charge-how-sustainable-marketing-can-transform-the-future-of-business/" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Leading the NetZero charge: How sustainable marketing can transform the future of business</Link>
                </Typography>
            </div>
            <div style={{ position: "fixed", bottom: "70px", left: "0", }} >
                <Link to='/news-room/blog4' className='d-flex nextBlog'>
                    <div style={{ backgroundColor: "#ffffd9", padding: "25px 10px" }}>
                        <FaChevronLeft />
                    </div>
                    <img src={blog4} alt="blog4" height={"80px"} width={"100px"} />
                    <div className='nextBlogContent'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "blue" }}>
                            Mohammed Shafeeq ILPSE C10, Pioneering Sustainable Entrepreneurship in Marketing
                        </Typography>
                    </div>
                </Link>
            </div>
            <div style={{ position: "fixed", bottom: "70px", right: "0px" }}>
                <Link to='/news-room/blog1' className='d-flex nextBlogRight'>
                    <div style={{ backgroundColor: "#ffffd9", padding: "25px 10px" }}>
                        <FaChevronRight />
                    </div>
                    <img src={blog1} alt="blog1" height={"80px"} width={"100px"} />
                    <div className='nextBlogContentRight'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "blue" }}>Going Eco-Friendly with Go Sustainable: Aster CMI Hospital, Bangalore, hosts 2nd IAP-PEM Conference to make a green footprint</Typography>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Blog5;
