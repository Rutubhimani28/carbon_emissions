import { Box, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import banner from '../../../assets/images/s1.jpeg'
import Footer from '../../footer/footer'
import Header from '../../header/header'


const Counsulting = () => {
    return (
        <div>
            <img src={banner} alt="banner" />
            <div className='main'>
                <Typography variant='h6' className='text-center fs-2 green pt-5 fontFamily fw-bold' >ESG Consulting</Typography>
                <p className='py-3 pb-3 fontFamily '>Within the Chief Marketing Officer (CMO) vertical’s domain, the endeavour to unravel the intricacies of decarbonization poses a pressing challenge. The true urgency comes to light as organizations confront the imminent 2030 targets, a trajectory that many currently veer off-course from achieving. The central question persists:<strong> How can these organizations, whether working independently or collaboratively, achieve net-zero ambitions while preserving b oth viability and profitability?</strong></p>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                    <Grid item xs={12} md={5}>
                        <Box className="ps-3">

                            <Box>
                                <p className='text-center  text-white pt-3 fontFamily fw-bold pb-2' style={{ backgroundColor: "#4ABD43" }}>“CMO Vertical Poses Formidable Challenge as Major Contributor to Greenhouse Gas Emissions”</p>
                            </Box>
                            <p className=' fs-5'>Compounding this challenge is the considerable contribution of the CMO vertical to carbon emissions through its diverse internal and external engagement activities. It becomes imperative for the CMO vertical to clearly delineate boundaries for Scopes 1, 2, and 3—an essential step towards effectively reducing their carbon footprint . </p>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Box className="ps-3">
                            v
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}  >
                        <Box className="ps-3">
                            <Box>
                                <p className='text-center  text-white pt-3 fontFamily fw-bold pb-2' style={{ backgroundColor: "#4ABD43" }}>“Empowering the CMO Vertical: Go Sustainable’s specialized Consulting for ESG Excellence”</p>
                            </Box>
                            <p className=' fs-5'>We specialize in guiding organizations toward achieving their ESG goals and fostering short, mid, and long-term business values within the dynamic landscape of the CMO vertical. Whether you are starting from scratch or taking over a partially developed program, our primary objective is to support you in meeting your sustainability goals.</p>
                        </Box>
                    </Grid>
                </Grid>


                <p className='py-3 pb-3 fontFamily '>By identifying actionable areas, our<strong> step-by-step </strong>approach enables you to address key issues that demand immediate attention, fostering a targeted strategy to contribute effectively to the decarbonization of emissions within the CMO vertical.</p>
                <p className='py-3 pb-3 fontFamily '>Please schedule a<Link style={{ color: "#4edceb", textDecoration: "none" }}> meeting with our CEO </Link>to explore potential collaboration and advisory roles in building a better world for our future generations.</p>
            </div>
        </div>
    )
}

export default Counsulting
