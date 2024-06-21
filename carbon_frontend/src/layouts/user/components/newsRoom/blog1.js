import { Typography } from '@mui/material';
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import blog1 from '../../assets/images/room1.jpeg';
import blog2 from '../../assets/images/room2.jpeg';


const Blog1 = () => {
    return (
        <div className='main my-5 pb-5 position-relative'>
            <div className='container'>

                <div className='container pt-5 d-flex justify-content-center'>
                    <img src={blog1} alt="blog2" width={'85%'} className='blogImageRadius' />
                </div>
                <Typography variant='h6' className='text-center fs-2 pt-4 fontFamily fw-bold px-3 wow animate__animated animate__fadeInUp animate__slow' >Going Eco-Friendly with Go Sustainable: Aster CMI Hospital, Bangalore, hosts 2nd IAP-PEM Conference to make a green footprint</Typography>
                <ul className='p-5 wow animate__animated animate__fadeInUp animate__slow'>
                    <li className='fs-5 '>Go Sustainable provided ESG Advisory services to identify, optimize and report the Carbon emissions generated from the event.</li>
                    <li className='fs-5 pt-1'>We reported 2.35 tCO2e is reduced from this activity by adopting sustainable measures.</li>
                </ul>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' ><strong>Pune, India, 18 Mar 2024: </strong>Go Sustainable, an early-stage start-up, has partnered with the organizing committee of the 2nd IAP-PEM Conference, a two-day conference hosted by Aster CMI Hospital, Bangalore, to support them in identifying, optimizing, and reporting the carbon emissions generated during the event.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >Go Sustainable believes it’s time that organizations’ Chief Marketing Officer (CMO) verticals to start looking onto the carbon footprint generated during their marketing and communication activities and adopt sustainable measures to reduce the greenhouse gas (GHG) emissions, reporting them as part of their company-wide sustainability reports.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >India holds the third position globally in terms of total GHG emissions produced, and collective efforts are needed to find ways to mitigate the carbon footprint generated from various activities.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' ><strong>Dr. Chetan Ginigeri, Organising Chairperson – 2nd IAP-PEM Conference, Program Director – Paediatrics, Aster Hospitals, Bangalore & Lead Consultant – Paediatrics & Paediatric Intensive Care, Aster CMI Hospital, Bangalore said: </strong>“Our goal was to champion sustainability in healthcare and inspire everyone by hosting an eco-friendly event. We’re glad to have partnered with Go Sustainable, whose expertise proved invaluable. They not only provided actionable advice to minimize our environmental impact but also measured and delivered a comprehensive report on the event’s sustainability efforts.”</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' ><strong>Mr. Mohammed Shafeeq, Founder and CEO, Go Sustainable, said: </strong>“We are delighted to collaborate with Aster CMI Hospital in their initiative to reduce the carbon footprint generated from their conference. This marks a crucial step in raising awareness on adopting sustainable measures in the marketing operations. We look forward to strengthening our partnership with Aster CMI Hospital.”</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' ><strong>About Go Sustainable </strong></p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >At Go Sustainable, we enable the path to net-zero.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >We offer ESG advisory services to Chief Marketing Officers (CMOs) and their partners, promoting and encouraging the adoption of sustainable practices in their marketing and corporate affairs activities. Additionally, we assist CMOs in identifying, optimizing, and reporting emissions produced from their operations, thereby creating a pathway to net-zero.</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' ><strong>For media inquiries contact: </strong></p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >Mohammed Shafeeq</p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' >Email: <Link className='text-decoration-none' style={{ color: "#ffffd9" }} to='mailto:mohammed.shafeeq@gosustainable.ai'>mohammed.shafeeq@gosustainable.ai</Link></p>
                <p style={{ fontSize: "20px" }} className='wow animate__animated animate__fadeInUp animate__slow' ><strong>Follow us on social media </strong></p>
                <p ><Link className='text-decoration-none wow animate__animated animate__fadeInUp animate__slow' style={{ color: "#ffffd9" }} to='https://www.linkedin.com/company/gosustainable-cmo/'>LinkedIn </Link> <Link className='text-decoration-none' style={{ color: "#ffffd9" }} to='https://twitter.com/shafeeqm'>Twitter</Link></p>
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
                <Link to='/blogs/blog2' className='d-flex nextBlog'>
                    <div style={{ backgroundColor: "#ffffd9", color: "#fff", padding: "25px 10px" }}>
                        <FaChevronLeft />
                    </div>
                    <img src={blog2} alt="blog2" height={"80px"} width={"100px"} />
                    <div className='nextBlogContent'>
                        <Typography variant='h6' className='fontFamily fs-6 fw-bold p-2 px-3' style={{ color: "#ffffd9" }}>Empowering organizations: Meeting net-zero through the reduction of single-use plastics</Typography>

                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Blog1
