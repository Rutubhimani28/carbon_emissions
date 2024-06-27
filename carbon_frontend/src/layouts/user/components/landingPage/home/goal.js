import React from 'react'
import { Link } from 'react-router-dom'
import { PopupButton } from 'react-calendly'
import { Box, Card, CardContent, Grid, Typography, makeStyles } from '@mui/material'
import goal1 from '../../../assets/images/goal1.png'
import goal2 from '../../../assets/images/goal2.png'
import TrustOne from '../../../assets/images/Aster CMI Logo.png';
import TrustTwo from '../../../assets/images/GoFig.png';
import mission from '../../../assets/images/mission.png'
import vision from '../../../assets/images/visionary.png'
import collbrate from '../../../assets/images/Collaborat.jpeg'

const Goal = () => {

    return (
        <div>
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
            <div className='pb-5'>
                <Typography variant='h6' className='text-center fs-3 mb-4'>Trusted By</Typography>
                <div className='d-flex align-align-items-center flex-wrap justify-content-center'>
                    <Card className='mx-4 my-3'>
                        <CardContent className='justify-content-center'>
                            <img src={TrustOne} alt='img' width={200} />
                        </CardContent>
                    </Card>
                    <Card className='mx-4 my-3'>
                        <CardContent className='justify-content-center'>
                            <img src={TrustTwo} alt='img' width={200} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* collabrate */}
            <div className='collabrate '>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >

                    <Grid item xs={12} md={6} className='wow animate__animated animate__fadeInUp animate__slow'>
                        <Box className="">
                            <Typography variant='h6' className='text-light fs-1 pt-2 pb-4 fontFamily fw-bold' >Collaborating for Sustainable Development</Typography>
                            <p className='text-light fs-5'><strong>Sirāt</strong> invites a wide range of stakeholders to partner with us for sustainable development, including companies, advisors, partners, as well as external collaborations and alliances to meet the climate goals.</p>
                            <p className='text-light fs-5'>
                                <PopupButton
                                    url="https://calendly.com/mohammed-sirat"
                                    rootElement={document.getElementById("root")}
                                    text="Reach out to our CEO"
                                    styles={{ border: 'none', background: 'none', color: "#ffffd9", marginLeft: '-7px' }}
                                />
                                to join our collaborations or raise ideas on collaborative and constructive actions your organisation would like to participate in developing with us.</p>
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