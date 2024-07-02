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
                    Mohammed Shafeeq ILPSE C10, Pioneering Sustainable Entrepreneurship in Marketing
                </Typography>
                <p
                    style={{ fontSize: "20px" }}
                    className='wow animate__animated animate__fadeInUp animate__slow mb-4'
                >
                    Prior to joining INSEAD, Mohammed Shafeeq, ILPSE C10, had a career that took him through diverse cultures and industries. From the Middle East & Africa to Asia, and even amidst the turmoil of the Crimea crisis in Russia, Mohammed accumulated invaluable insights and experiences. However, upon his return to India in 2015, he found himself at a crossroads, grappling with a period of professional stagnation that prompted deep introspection.
                </p>
                <p
                    style={{ fontSize: "20px" }}
                    className='wow animate__animated animate__fadeInUp animate__slow mb-4'
                >
                    His tenure at Nokia, a prominent European telecommunications company, afforded Mohammed a firsthand understanding of the significance of diversity and the intricate cultural dynamics within European corporate settings. These experiences were instrumental in his decision to pursue further education at INSEAD. Despite prestigious alternatives like Harvard and Columbia, Mohammed chose INSEAD to better align his experiences with the European business landscape.
                </p>
                <p
                    style={{ fontSize: "20px" }}
                    className='wow animate__animated animate__fadeInUp animate__slow mb-4'
                >
                    This educational journey marked a significant turning point for Mohammed, propelling him from a corporate professional to a visionary entrepreneur. His focus shifted towards sustainable marketing solutions, emphasising the profound impact of education and self-discovery on his career trajectory.
                </p>
                <p
                    style={{ fontSize: "20px" }}
                    className='wow animate__animated animate__fadeInUp animate__slow fw-bolder mb-4'
                >
                    INSEAD shattered my mental barriers, fostering a mindset of boundless possibility. Here, I've learned to lead not just with authority, but with empathy and understanding. It's not just about becoming a better leader; it's about evolving into a better human being.
                </p>
                <p
                    style={{ fontSize: "20px" }}
                    className='wow animate__animated animate__fadeInUp animate__slow mb-4'
                >
                    INSEAD provided Mohammed with the opportunity to challenge established norms and embrace new perspectives, particularly in entrepreneurship, under the guidance of programme directors V. “Paddy” Padmanabhan, Professor of Marketing, and Balagopal Vissa, Professor of Entrepreneurship and Family.
                </p>
                <p
                    style={{ fontSize: "20px" }}
                    className='wow animate__animated animate__fadeInUp animate__slow mb-4'
                >
                    Amidst this dynamic learning environment, Mohammed’s passion for sustainability in marketing flourished. Identifying a gap in sustainable marketing initiatives through discussions with industry peers, Mohammed founded Sirat.earth. This venture aims not only to raise awareness and reduce the environmental impact of marketing activities but also to align these strategies with net-zero goals. By optimising key emission categories in marketing and integrating ESG principles, Mohammed enhances brand credibility and positions his clients as sustainability leaders.
                </p>
                <p
                    style={{ fontSize: "20px" }}
                    className='wow animate__animated animate__fadeInUp animate__slow mb-4'
                >
                    Looking forward, Mohammed remains steadfast in his commitment to driving positive change. He advises aspiring entrepreneurs to leverage their strengths and passions while prioritising sustainability. Mohammed emphasises the importance of networking and community engagement, drawing on his connections within the INSEAD alumni network for support and insights.
                </p>
                <p
                    style={{ fontSize: "20px" }}
                    className='wow animate__animated animate__fadeInUp animate__slow mb-4'
                >
                    Mohammed Shafeeq’s journey epitomises INSEAD's ethos of responsible leadership. Through Sirat.earth, he embodies the school's dedication to sustainability, innovation, and global impact, inspiring others to integrate sustainability into their entrepreneurial endeavours.
                </p>
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
