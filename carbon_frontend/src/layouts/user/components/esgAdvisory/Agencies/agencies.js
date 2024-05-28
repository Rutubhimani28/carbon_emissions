import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import agency1 from '../../../assets/images/Org.png'
import agency2 from '../../../assets/images/Un.png'

const Agencies = () => {
    return (
        <div className='main py-5'>
            <div>
                <Typography variant='h6' className='text-center fs-2 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Agencies/ Service Providers</Typography>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className=" p-3 ">
                        <img src={agency1} alt="img" width={"100%"} style={{ borderRadius: "15px" }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className="ps-3">
                        <Typography variant='h6' className='green fs-2 py-2 pt-4 fontFamily'>ESG consulting</Typography>
                        <p className=' fs-5'>Agencies/ service providers supporting organizations (clients), brings a distinctive value proposition, to execute their activities throughout the calendar year. <strong>Embracing sustainable practices</strong> not only distinguishes you from the competition, it attracts more clients, and expand your business opportunities. </p>
                        <p className=' fs-5'>We have introduced a  <strong> standardized net-zero framework </strong> that aids you and your clients in executing various marketing-, communication-, PR-activities and beyond while concurrently supporting efforts to reduce the carbon emissions which you generate while executing those activities. </p>
                        <p className=' fs-5'>Through our ESG consulting services, you can play a pivotal role in  <strong>generating short-, mid- and long-term value </strong> for you and your clients. </p>
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className="ps-3">
                        <Typography variant='h6' className='green fs-2 py-2 pt-4 fontFamily'>Unlock Business Opportunities</Typography>
                        <p className=' fs-5'>Beyond establishing connections, our focus is to<strong>  unlock business opportunities for service providers and marketing agencies.</strong> We guide partners in identifying market trends, understanding client needs, and positioning themselves for lucrative opportunities. <strong> Our net-zero framework acts as a guide, </strong>ensuring that our partners align with their sustainability goals.</p>
                        <p className=' fs-5'>We emphasize <strong> strategic collaboration, </strong>fostering an environment where the service providers not only connect with potential clients but also share insights and resources. Through this approach, we create a dynamic ecosystem that not only unlocks immediate business prospects but also<strong> cultivates long-term relationships based on innovation and shared values.</strong></p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className=" p-3 ">
                        <img src={agency2} alt="img" width={"100%"} style={{ borderRadius: "15px" }} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Agencies
