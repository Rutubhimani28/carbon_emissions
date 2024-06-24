import { Link } from "react-router-dom";
import { PopupButton } from "react-calendly";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Card, Grid, Typography } from '@mui/material'
import { FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import banner from '../../assets/images/AboutBg.jpeg'
import ceo from '../../assets/images/CEO.png'
import what from '../../assets/images/What.png'
import net from '../../assets/images/net.png'
import goal1 from '../../assets/images/goal1.png'
import goal2 from '../../assets/images/goal2.png'
import goal3 from '../../assets/images/goal3.png'
import goal4 from '../../assets/images/goal4.png'
import goal5 from '../../assets/images/goal5.png'
import goal6 from '../../assets/images/goal6.png'
import goal7 from '../../assets/images/goal7.png'

const About = () => {
    return (
        <div>
            {/* banner */}
            <div>
                <img src={banner} alt="img" width={"100%"} height='600px' />
            </div>
            <div className='text-center main py-4'>
                <p className='py-4 fontFamily mx-4 wow animate__animated animate__fadeInUp animate__slow' style={{ fontSize: "18px" }} >In today's world, industries are not just seeking solutions; they are searching for sustainable partners who share their values. We believe in driving innovation for a greater purpose. Our journey began with a commitment to introduce NetZero Consulting within the Chief Marketing Officer (CMO) vertical and their stakeholders, aiming to create a positive impact. We further provide a user-friendly NetZero Platform to help to identify, optimise (through our NetZero Consulting) and measure the emissions generated from marketing operations.</p>
            </div>
            <div>
                <Typography variant='h6' className='text-center fs-3 pt-4 fontFamily fw-bold justify-content-center wow animate__animated animate__fadeInUp animate__slow'>Targeted Sustainable Development Goals (SDGs)</Typography>
                <p className='text-center  py-3 pb-5 fontFamily justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-2s'>As part of our framework, we are actively and directly contributing to the following 7 SDGs out of<a href="https://sdgs.un.org/goals" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#ffffd9" }}> 17 UN SDGs</a>.</p>
            </div>
            <div className='d-flex align-align-items-center flex-wrap justify-content-center'>
                <img src={goal1} alt='img' width={170} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow' />
                <img src={goal2} alt='img' width={170} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-1s' />
                <img src={goal3} alt='img' width={170} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-2s' />
                <img src={goal4} alt='img' width={170} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-3s' />
                <img src={goal5} alt='img' width={170} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-4s' />
                <img src={goal6} alt='img' width={170} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp  animate__delay-5s' />
                <img src={goal7} alt='img' width={170} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow  animate__delay-5s' />
            </div>
            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className="text-center">
                        <Typography variant='h6' className=' fs-1 pt-2 pb-4 fontFamily fw-bold green' >What we do</Typography>
                        <p className=' fs-5'>We offer <span style={{ color: "#ffffd9" }}> ESG Advisory Services</span>, bringing together the CMO vertical and their stakeholders on our integrated platform. Our aim is to foster collaboration and devise innovative methodologies for measuring both direct and indirect greenhouse gas (GHG) emissions.</p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box >
                        <img src={what} alt="img" width={"90%"} style={{ borderRadius: "10px" }} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box >
                        <img src={net} alt="img" width={"90%"} style={{ borderRadius: "10px" }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className="text-center">
                        <Typography variant='h6' className=' fs-1 pt-2 pb-4 fontFamily fw-bold green' >Net-Zero Framework</Typography>
                        <p className=' fs-5'>We encourage organizations to <span style={{ color: "#ffffd9" }}> assess the emissions </span> resulting from their various marketing activities and collaborate with us <strong> to minimize their carbon footprint by leveraging our net-zero framework.</strong></p>
                    </Box>
                </Grid>
            </Grid> */}
            <div>
                {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >
                    <Grid item xs={12} md={9} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                        <Box className="text-center main">
                            <div className='d-flex flex-column justify-content-between align-items-center'>
                                <Typography variant='h6' className=' fs-1 fontFamily fw-bold green' style={{ color: '#054723' }}>Meet the Founder</Typography>
                                <Typography className=' fs-1 pb-4 fontFamily fw-bold green ' style={{ marginTop: "-25px", display: { md: 'none' }, color: '#054723' }} ><RemoveIcon style={{ fontSize: "50px" }} /><FiberManualRecordIcon style={{ fontSize: "20px" }} /><RemoveIcon style={{ fontSize: "50px" }} /></Typography>
                            </div>
                            <p className='fs-5'>A seasoned Marketing and Communications leader with over 30 years of experience, this INSEAD graduate boasts a rich global marketing background. His career has taken him across various markets, including India, APAC, China, the Middle East & Africa, and Eastern Europe, enhancing his cultural adaptability and understanding.</p>
                        </Box>
                        <Box className="text-center main">
                            <PopupButton
                                url="https://calendly.com/mohammed-sirat"
                                rootElement={document.getElementById("root")}
                                text="Book a slot with our CEO"
                                styles={{ border: 'none', background: 'none', color: "#ffffd9" }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} className='d-flex justify-content-center align-items-center flex-column wow animate__animated animate__fadeInRight animate__slow' sx={{ order: { md: '1' } }}>
                        <Box >
                            <img src={ceo} alt="img" width={"100%"} style={{ borderRadius: "10px" }} />
                        </Box>
                        <div className='text-center pt-2' >
                            <p className=' fs-5 mb-0'>Mohammed Shafeeq</p>
                            <p className=' fs-6 mb-0'>CEO & Founder</p>
                            <div className='d-flex justify-content-center py-2 pb-4'>
                                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#000000", color: "#fff", borderRadius: "5px" }}><FaXTwitter /></Box>
                                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#0077b5", color: "#fff", borderRadius: "5px" }}><FaLinkedin /></Box>
                            </div>
                        </div>
                    </Grid>
                </Grid> */}

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main' >
                    <Grid item xs={12} md={9} sx={{ order: { xs: "2", md: "1" }, borderRadius: { xs: "0px 0px 10px 10px", md: "10px 0px 0px 10px" } }} className='wow animate__animated animate__fadeInLeft animate__slow template-inner-theme d-flex flex-column justify-content-center' style={{ textAlign: 'center' }}>

                        <Box className="text-center main" style={{ marginBottom: '20px' }}>
                            <div className='d-flex flex-column justify-content-between align-items-center'>
                                <Typography variant='h6' className=' fs-1 fontFamily fw-bold ' style={{ color: '#efefef' }}>Meet the Founder</Typography>
                                <Typography className=' fs-1 pb-4 fontFamily fw-bold' style={{ marginTop: "-25px", display: { md: 'none' }, color: '#efefef' }} ><RemoveIcon style={{ fontSize: "50px" }} /><FiberManualRecordIcon style={{ fontSize: "20px" }} /><RemoveIcon style={{ fontSize: "50px" }} /></Typography>
                            </div>
                            <p className='fs-5'>A seasoned Marketing and Communications leader with over 30 years of experience, this INSEAD graduate boasts a rich global marketing background. His career has taken him across various markets, including India, APAC, China, the Middle East & Africa, and Eastern Europe, enhancing his cultural adaptability and understanding.</p>
                        </Box>
                        <Box className="text-center main pt-3" style={{ marginBottom: '20px' }}>
                            <PopupButton
                                url="https://calendly.com/mohammed-sirat"
                                rootElement={document.getElementById("root")}
                                text="Book a Meeting with our CEO"
                                styles={{ border: 'none', background: 'none', color: "#ffffd9" }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} className='d-flex justify-content-center align-items-center flex-column wow animate__animated template-inner-theme pe-4 pt-4 animate__fadeInRight animate__slow' sx={{ order: { md: '1' }, borderRadius: { xs: "10px 10px 0px 0px", md: "0px 10px 10px 0px" } }}>
                        <Box >
                            <img src={ceo} alt="img" width={"100%"} style={{ borderRadius: "10px" }} />
                        </Box>
                        <div className='text-center pt-2' >
                            <p className=' fs-5 mb-0'>Mohammed Shafeeq</p>
                            <p className=' fs-6 mb-0'>CEO & Founder</p>
                            <div className='d-flex justify-content-center py-2 pb-4'>
                                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#000000", color: "#fff", borderRadius: "5px" }}><Link to="https://x.com/shafeeqm"><FaXTwitter style={{ color: 'white' }} /></Link></Box>
                                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#0077b5", color: "#fff", borderRadius: "5px" }}><Link to="https://www.linkedin.com/in/shafeeqm/"><FaLinkedin style={{ color: 'white' }} /></Link></Box>
                            </div>
                        </div>
                    </Grid>
                </Grid>

            </div>
        </div>
    )
}

export default About