import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import blog5 from '../../assets/images/room5.jpg';
import blog6 from '../../assets/images/room6.jpg';
import blog7 from '../../assets/images/room7.jpg';

const Blog6 = () => {
    const theme = useTheme();
  return (
    <div className="main mt-5 pb-5 position-relative">
      <div className="container">
        <div className="container pt-5 d-flex justify-content-center">
          <img src={blog6} alt="blog2" width={'65%'} className="blogImageRadius" />
        </div>
        <Typography
          variant="h6"
          className="text-center fs-2 pt-4 my-4 fontFamily fw-bold px-3 wow animate__animated animate__fadeInUp animate__slow"
        >
          <Link
            to="https://etedge-insights.com/sdgs-and-esg/sustainability/leading-the-netzero-charge-how-sustainable-marketing-can-transform-the-future-of-business/"
            target="_blank"
            style={{ textDecoration: 'none', color: '#1f9e6d' }}
          >
            Sirāt Files Patent for Innovative NetZero Platform
          </Link>
        </Typography>
        <p className="fs-5 setMeetFounderText text-start">
          We are thrilled to announce that Sirāt has officially filed a patent for our groundbreaking NetZero Platform.
          This milestone underscores our commitment to innovation and sustainability, ensuring that our technology
          remains protected while driving the global transition toward a carbon-neutral future.
        </p>
        <p className="fs-5 setMeetFounderText text-start">
          The NetZero Platform empowers businesses to identify, measure, manage, and reduce the carbon footprint of
          their marketing operations, offering cutting-edge tools to achieve sustainability goals effectively. By filing
          for Intellectual Property Rights (IPR), we not only safeguard our proprietary technology but also establish a
          foundation for delivering long-term value to our clients and stakeholders.
        </p>
        <p
          style={{
            fontWeight: '700',
          }}
          className="fs-5 setMeetFounderText text-start"
        >
          Why IPR Matters
        </p>
        <p className="fs-5 setMeetFounderText text-start">
          Filing for IPR is a critical step for any technology-driven company. It protects unique innovations from being
          copied or misused, ensuring the integrity of our solutions. For Sirāt, this means:
        </p>
        <div
          style={{
            padding:useMediaQuery(theme.breakpoints.up('md')) ?  '30px 0px 30px 43px':"30px 0px 30px 20px",
          }}
        >
          <p className="fs-5 setMeetFounderText text-start">
            1. <b>Securing Competitive Advantage: </b>
            The patent strengthens our position in the sustainability industry by protecting the unique features of the
            NetZero Platform.
          </p>
          <p className="fs-5 setMeetFounderText text-start">
            2. <b>Encouraging Innovation: </b>
            With legal protection in place, we are empowered to continue innovating, knowing our efforts are
            safeguarded.
          </p>
          <p className="fs-5 setMeetFounderText text-start">
            3. <b>Building Trust: </b>
            Our clients can rely on the authenticity and originality of the solutions we provide, backed by legally
            protected technology.
          </p>
        </div>
        <p className="fs-5 setMeetFounderText text-start">
          As we look ahead, this patent filing marks a significant step in our journey to lead in sustainable technology
          solutions. We remain dedicated to advancing our platform and helping businesses worldwide achieve their
          NetZero goals with confidence.
        </p>
        <p className="fs-5 setMeetFounderText text-start">
          And we continue to innovate and transform the way organizations approach sustainability.
        </p>
        <p className="fs-5 pt-5 setMeetFounderText text-start">
            Blog by: <br/>
            Mohammed Shafeeq  <br/>
            Founder & CEO, Sirāt
        </p>
      </div>
      <div style={{ position: 'fixed', bottom: '70px', left: '0' }}>
        <Link to="/news-room/blog1" className="d-flex nextBlog">
          <div style={{ backgroundColor: '#ffffd9', padding: '25px 10px' }}>
            <FaChevronLeft />
          </div>
          <img src={blog7} alt="blog7" height={'80px'} width={'100px'} />
          <div className="nextBlogContent">
            <Typography variant="h6" className="fontFamily fs-6 fw-bold p-2 px-3" style={{ color: 'blue' }}>
            HUTCH Deepens Commitment to Sustainability with Adoption of Sirāt NetZero Platform
            </Typography>
          </div>
        </Link>
      </div>
      <div style={{ position: 'fixed', bottom: '70px', right: '0px' }}>
        <Link to="/news-room/blog5" className="d-flex nextBlogRight">
          <div style={{ backgroundColor: '#ffffd9', padding: '25px 10px' }}>
            <FaChevronRight />
          </div>
          <img src={blog5} alt="blog5" height={'80px'} width={'100px'} />
          <div className="nextBlogContentRight">
            <Typography variant="h6" className="fontFamily fs-6 fw-bold p-2 px-3" style={{ color: 'blue' }}>
            Leading the NetZero charge: How sustainable marketing can transform the future of business
            </Typography>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Blog6;
