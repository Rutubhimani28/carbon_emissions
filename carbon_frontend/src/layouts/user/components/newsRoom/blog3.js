import { Typography } from '@mui/material';
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import blog2 from '../../assets/images/room2.jpeg';
import blog3 from '../../assets/images/room3.jpg';
import blog4 from '../../assets/images/room4.png';


const Blog3 = () => {
    return (
        <div className='main mt-5 pb-5 position-relative template-outer-theme'>
            <div className='container'>
                <div className='container pt-5 d-flex justify-content-center'>
                    <img src={blog3} alt="blog3" width={'65%'} className='blogImageRadius' />
                </div>
                <Typography variant='h6' className='text-center fs-2 pt-4 fontFamily fw-bold px-3 wow animate__animated animate__fadeInUp animate__slow' >
                    <Link to="https://zeenews-india-com.cdn.ampproject.org/c/s/zeenews.india.com/companies/go-sustainable-unveils-a-net-zero-framework-to-reduce-carbon-footprint-in-marketing-operations-2715454.html/amp" target="_blank"  style={{ textDecoration: 'none', color: '#1f9e6d' }}>Go Sustainable Unveils Net-Zero Framework To Reduce Carbon Footprint In Marketing Operations- Zee News</Link>
                </Typography>
            </div>

            <div style={{ position: 'fixed', bottom: '70px', left: '0' }}>
        <Link to="/news-room/blog2" className="d-flex nextBlog">
          <div style={{ backgroundColor: '#ffffd9', padding: '25px 10px' }}>
            <FaChevronLeft />
          </div>
          <img src={blog2} alt="blog2" height={'80px'} width={'100px'} />
          <div className="nextBlogContent">
            <Typography variant="h6" className="fontFamily fs-6 fw-bold p-2 px-3" style={{ color: 'blue' }}>
            Empowering organizations: Meeting net-zero through the reduction of single-use plastics
            </Typography>
          </div>
        </Link>
      </div>
      <div style={{ position: 'fixed', bottom: '70px', right: '0px' }}>
        <Link to="/news-room/blog4" className="d-flex nextBlogRight">
          <div style={{ backgroundColor: '#ffffd9', padding: '25px 10px' }}>
            <FaChevronRight />
          </div>
          <img src={blog4} alt="blog4" height={'80px'} width={'100px'} />
          <div className="nextBlogContentRight">
            <Typography variant="h6" className="fontFamily fs-6 fw-bold p-2 px-3" style={{ color: 'blue' }}>
            Mohammed Shafeeq ILPSE C10, Pioneering Sustainable Entrepreneurship in Marketing
            </Typography>
          </div>
        </Link>
      </div>

        </div>
    )
}

export default Blog3;
