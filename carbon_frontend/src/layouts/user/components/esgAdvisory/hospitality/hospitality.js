import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import vanue1 from '../../../assets/images/vanue1.jpeg'
import vanue2 from '../../../assets/images/vanue2.jpeg'

const Hospitality = () => {
    return (
        <div className='main py-5 mt-3'>
            <div>
                <Typography variant='h6' className='text-center fs-1 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Hospitality Industry</Typography>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 my-4  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInLeft animate__slow'>

                    <Box className="ps-3">
                        <p className=' fs-5'>Attracting major companies to host their events/exhibitions in your hotel demonstrates the trust and commitment you have towards your clients.</p>
                        <p className=' fs-5'>Organizations are not only considering the aforementioned aspects but also seeking sustainable hotels.<strong> Is your esteemed hotel adopting sustainable measures to meet client demands?</strong> </p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className="ps-3">
                        <p className=' fs-5'>To achieve complete adherence to sustainable measures, you need a partner who can guide and support you in creating a net-zero framework. </p>
                        <p className=' fs-5'>We offer ESG advisory services, guiding you through a step-by-step process to identify, optimise and reduce the carbon emissions, showcasing your commitment towards sustainability. </p>
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className=" p-3 ">
                        <img src={vanue1} alt="img" width={"100%"} style={{ borderRadius: "15px" }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className="ps-3">
                        <Typography variant='h6' className='green fs-2 py-2 pt-4 fontFamily'>Venue/ Ballroom</Typography>
                        <p className=' fs-5'>Maintaining a constant temperature inside the venue represents one of your commitment for optimising the emissions. </p>
                        <p className=' fs-5'>We assist you in establishing a mechanism to manage these tasks and beyond seamlessly while adhering to your internal policies. We help to create a roadmap for reducing these emissions by adopting a net-zero framework.</p>
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className="ps-3">
                        <Typography variant='h6' className='green fs-2 py-2 pt-4 fontFamily'>Hotel rooms</Typography>
                        <p className=' fs-5'>Staying at your hotel brings joy to your customers and their families. However, there are instances when your valued customers may inadvertently consume excessive energy, such as keeping the room temperature to a minimum, or wastefully using water during showers.</p>
                        <p className=' fs-5'>Now is the opportune moment to gently <strong>convey a message to your valued customers about using hotel resources wisely,</strong> ensuring it doesn’t impact the environment or strain your relationships. We present options on how to address these concerns with care.

                        </p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className=" p-3 ">
                        <img src={vanue2} alt="img" width={"100%"} style={{ borderRadius: "15px" }} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Hospitality
