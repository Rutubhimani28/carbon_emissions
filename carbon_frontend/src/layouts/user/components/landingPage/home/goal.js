import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'
import goal1 from '../../../assets/images/goal1.png'
import goal2 from '../../../assets/images/goal2.png'
import goal3 from '../../../assets/images/goal3.png'
import goal4 from '../../../assets/images/goal4.png'
import goal5 from '../../../assets/images/goal5.png'
import goal6 from '../../../assets/images/goal6.png'
import goal7 from '../../../assets/images/goal7.png'
import mission from '../../../assets/images/mission.png'
import vision from '../../../assets/images/visionary.png'
import collbrate from '../../../assets/images/Collaborat.jpeg'

const Goal = () => {
    return (
        <div>
            {/* <div>
                <Typography variant='h6' className='text-center fs-3 green pt-4 fontFamily fw-bold justify-content-center wow animate__animated animate__fadeInUp animate__slow' >Targeted Sustainable Development Goals (SDGs)</Typography>
                <p className='text-center  py-3 pb-5 fontFamily justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-2s'>As part of our framework, we are actively and directly contributing to the below 7 SDGs out of<a href="https://sdgs.un.org/goals" style={{ textDecoration: "none", color: "#ffffd9" }}> 17 UN SDGs.</a></p>
            </div>
            <div className='d-flex align-align-items-center flex-wrap justify-content-center'>

                <img src={goal1} alt='img' width={200} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow' />
                <img src={goal2} alt='img' width={200} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-1s' />
                <img src={goal3} alt='img' width={200} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-2s' />
                <img src={goal4} alt='img' width={200} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-3s' />
                <img src={goal5} alt='img' width={200} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-4s' />
                <img src={goal6} alt='img' width={200} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp  animate__delay-5s' />
                <img src={goal7} alt='img' width={200} className='mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow  animate__delay-5s' />
            </div> 
            <div className='text-center py-5'>
                <p className='text-center fontFamily justify-content-center wow animate__animated animate__fadeInUp animate__slow '>Want to enhance your thinking with real ideas, insights, and updates from us?</p>
                <button style={{ backgroundColor: "#4ABD43", color: "#fff", borderRadius: "30px", border: "0", padding: "12px 50px" }} className='justify-content-center wow animate__animated animate__fadeInUp animate__slow animate__delay-2s'>Sign up!</button>
            </div>
            */}
            <div className='pb-5'>
                <Typography variant='h6' className='text-center fs-3 green pt-5 pb-3 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow text-white' >Our Mission & Vision</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='my-4'>
                    <Grid item xs={0} md={2.1} />
                    <Grid item sm={12} md={3.9} className='wow animate__animated animate__fadeInLeft animate__slow'>
                        <Box className="d-flex justify-content-center flex-column align-items-center p-4 rounded-3 bg-white mx-3 template-inner-theme" style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                            <img src={mission} alt="img" width={50} className='tabImgWhite' />
                            <Typography variant='h6' className='text-center fs-5 pt-2 pb-4 fontFamily fw-bold' >Mission</Typography>
                            <p className='text-center fs-6'>To promote awareness within industries regarding the crucial significance of steering their marketing operations with sustainable practices and to motivate them to actively reduce their carbon footprint.</p>
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={3.9} className='wow animate__animated animate__fadeInRight animate__slow'>
                        <Box className="d-flex justify-content-center flex-column align-items-center p-4 rounded-3 bg-white mx-3 template-inner-theme" style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                            <img src={vision} alt="img" width={50} className='tabImgWhite' />
                            <Typography variant='h6' className='text-center fs-5  pt-2 pb-4 fontFamily fw-bold' >Vision</Typography>
                            <p className='text-center fs-6'>We aspire to empower the organisation’s CMO vertical and its stakeholders, guiding them towards achieving a 50% reduction in their carbon footprint generated from their activities by 2030.</p>
                        </Box>
                    </Grid>
                    <Grid item xs={0} md={2.1} />
                </Grid>
            </div>
            {/* collabrate */}
            <div className='collabrate '>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >

                    <Grid item xs={12} md={6} className='wow animate__animated animate__fadeInUp animate__slow'>
                        <Box className="">
                            <Typography variant='h6' className='text-light fs-1 pt-2 pb-4 fontFamily fw-bold' >Collaborating for Sustainable Development</Typography>
                            <p className='text-light fs-5'><strong>Sirāt</strong> invites a wide range of stakeholders to partner with us for sustainable development, including companies, advisors, partners, as well as external collaborations and alliances to meet the climate goals.</p>
                            <p className='text-light fs-5'><Link className="text-decoration-none" style={{ color: '#ffffd9' }} to="mailto:mohammed.shafeeq@sirat.earth">Reach out to our CEO</Link> to join our collaborations or raise ideas on collaborative and constructive actions your organisation would like to participate in developing with us.</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box >
                            <img src={collbrate} alt="img" width={"90%"} style={{ borderRadius: "10px" }} />
                        </Box>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}

export default Goal