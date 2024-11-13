import { Typography } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import blog4 from '../../assets/images/room4.png';
import blog3 from '../../assets/images/room3.jpg';
import Room5 from '../../assets/images/room5.jpg';

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
            <div style={{ position: "fixed", bottom: "70px", left: "0", }} >
                <Link to='/news-room/blog3' className='d-flex nextBlog'>
                    <div style={{ backgroundColor: "#ffffd9", padding: "25px 10px" }}>
                        <FaChevronLeft />
                    </div>
                    <img src={blog3} alt="blog3" height={"80px"} width={"100px"} />
                    <div className='nextBlogContent'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "blue" }}>
                            Go Sustainable Unveils Net-Zero Framework To Reduce Carbon Footprint In Marketing Operations- Zee News
                        </Typography>
                    </div>
                </Link>
            </div>
            <div style={{ position: "fixed", bottom: "70px", right: "0" }}>
                <Link to='/news-room/blog5' className='d-flex nextBlogRight'>
                    <div style={{ backgroundColor: "#ffffd9", padding: "25px 10px" }}>
                        <FaChevronRight />
                    </div>
                    <img src={Room5} alt="blog5" height={"80px"} width={"100px"} />
                    <div className='nextBlogContentRight'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "blue" }}>Leading the NetZero charge: How sustainable marketing can transform the future of business</Typography>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Blog4;
