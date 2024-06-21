import { Typography } from '@mui/material';
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import blog2 from '../../assets/images/room2.jpeg';
import blog1 from '../../assets/images/room1.jpeg';
import blog3 from '../../assets/images/room3.jpg';


const Blog2 = () => {
    return (
        <div className='main mt-5 pb-5 position-relative'>
            <div className='container'>

                <div className='container pt-5 d-flex justify-content-center'>
                    <img src={blog2} alt="blog2" width={'85%'} className='blogImageRadius' />
                </div>
                <Typography variant='h6' className='text-center fs-2 pt-4 fontFamily fw-bold px-3 wow animate__animated animate__fadeInUp animate__slow' >Empowering organizations: Meeting net-zero through the reduction of single-use plastics</Typography>

                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >From expansive trade shows and vibrant festivals to intimate business conferences, corporate events play an important role in our society, fostering social, economic, and technological benefits. The hospitality industry is at the forefront of attracting companies to host their events on their premises.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow mb-0'><strong>Do you know </strong></p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >The hospitality industry, among others,<span style={{ color: "#ffffd9" }}> significantly contributes to plastic pollution </span>through the widespread single use of plastic. Worldwide, hotels generate 289,700 tonnes of waste annually.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow mb-0'><strong>Driving these events </strong></p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >The Chief Marketing Officer (CMO) vertical drives these events, playing a critical role in identifying and executing them for their companies. As a responsible leader, have you considered the impact of single-use plastic, such as plastic water bottles, PVC branding, merchandise, and stationery, during your events?</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >It is important to identify the areas which produces the carbon emissions and take actions to optimise and measure.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow mb-0'><strong>Take action</strong></p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >Now is the time for the CMO vertical and the hospitality industry to come together and take necessary climate actions to eliminate the single use of plastic in their events.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow mb-3'>We all need to be responsible and work not only to achieve net-zero by avoiding the use of plastics but also to look into other areas that generate a carbon footprint through your events.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >At Go Sustainable, we will work with you to identify nine diverse categories outlined on our website, aiming to construct a thoughtful framework and cultivate an action plan dedicated to reducing carbon emissions.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >Not only do we assist you in connecting with the right vendors who can supply recyclable flex for your branding, stationery, and merchandise etc., all of which have a low carbon footprint and beyond and making your event a<span style={{ color: "#ffffd9" }}> sustainable one.</span></p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow mb-4'>Please send an email to us with your inquiries at <Link className='text-decoration-none' style={{ color: "#ffffd9" }} to='mailto:info@sirat.earth'>Sirāt</Link>.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow mb-0'>Blog by:</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow mb-0'><strong>Mohammed Shafeeq</strong></p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow mb-0'>Founder CEO, Go Sustainable</p>
            </div>
            <div className='border-bottom mt-5' />
            <div className='d-flex align-items-center mt-3 wow animate__animated animate__fadeInUp animate__slow'>
                <span>Share</span>
                <span className='mx-2 fs-5' ><Link style={{ color: "#1e149d" }} to='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgosustainable.ai%2F2024%2F03%2F18%2Fgoing-eco-friendly-with-go-sustainable-aster-cmi-hospital-bangalore%2F'><FaFacebookF /></Link></span>
                <span className='mx-2 fs-5' ><Link style={{ color: "#1e149d" }} to='https://twitter.com/intent/tweet?text=Going+Eco-Friendly+with+Go+Sustainable%3A+Aster+CMI+Hospital%2C+Bangalore%2C+hosts+2nd+IAP-PEM+Conference+to+make+a+green+footprint+%26%238211%3B+Go+Sustainable.+https%3A%2F%2Fgosustainable.ai%2F2024%2F03%2F18%2Fgoing-eco-friendly-with-go-sustainable-aster-cmi-hospital-bangalore%2F'><FaXTwitter /></Link></span>
                <span className='mx-2 fs-5' ><Link style={{ color: "#1e149d" }} to='https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fgosustainable.ai%2F2024%2F03%2F18%2Fgoing-eco-friendly-with-go-sustainable-aster-cmi-hospital-bangalore%2F'><FaLinkedinIn /></Link></span>
                <span className='mx-2 fs-5' ><Link style={{ color: "#1e149d" }} to='https://pinterest.com/pin/find/?url=https%3A%2F%2Fgosustainable.ai%2F2024%2F03%2F18%2Fgoing-eco-friendly-with-go-sustainable-aster-cmi-hospital-bangalore%2F'><FaPinterestP /></Link></span>
            </div>
            <div style={{ position: "fixed", bottom: "70px", left: "0", }} >
                <Link to='/blogs/blog3' className='d-flex nextBlog'>
                    <div style={{ backgroundColor: "#ffffd9", color: "#fff", padding: "25px 10px" }}>
                        <FaChevronLeft />
                    </div>
                    <img src={blog3} alt="blog2" height={"80px"} width={"100px"} />
                    <div className='nextBlogContent'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "#ffffd9" }}>Go Sustainable Unveils Net-Zero Framework To Reduce Carbon Footprint In Marketing Operations- Zee News</Typography>
                    </div>
                </Link>
            </div>
            <div style={{ position: "fixed", bottom: "70px", right: "0", }}>
                <Link to='/blogs/blog1' className='d-flex nextBlogRight'>
                    <div style={{ backgroundColor: "#ffffd9", color: "#fff", padding: "25px 10px" }}>
                        <FaChevronRight />
                    </div>
                    <img src={blog1} alt="blog2" height={"80px"} width={"100px"} />
                    <div className='nextBlogContentRight'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "#ffffd9" }}>Going Eco-Friendly with Go Sustainable: Aster CMI Hospital, Bangalore, hosts 2nd IAP-PEM Conference to make a green footprint</Typography>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Blog2
