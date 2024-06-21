import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import ex1 from '../../../assets/images/ex1.jpg'
import ex2 from '../../../assets/images/ex2.jpeg'
import ex3 from '../../../assets/images/ex3.jpg'

const Exhibitions = () => {
    return (
        <div className='main py-5 mt-3'>
            <div>
                <Typography variant='h6' className='text-center fs-1 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Exhibitions/ Congresses</Typography>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 my-4  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInLeft animate__slow'>

                    <Box className="ps-3">
                        <p className=' fs-5'>As an exhibition/ congress organiser, you play a pivotal role in bringing together diverse companies, segments, government bodies, and enabling them to showcase their innovations. Additionally, you facilitate the  discussions, roundtables on topics that contribute to the betterment of both people and the planet. </p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInRight animate__slow' >
                    <Box className="ps-3">
                        <p className=' fs-5'>Necessitating robust ESG models is key to showcase your commitment to meet the climate goals. It’s crucial to recognize that these events generate significant emissions.<strong>Have you considered implementing a strategy and an ESG model before you plan your event?</strong> </p>
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className=" p-3 ">
                        <img src={ex1} alt="img" width={"100%"} style={{ borderRadius: "15px" }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className="ps-3">
                        <Typography variant='h6' className='green fs-2 py-2 pt-4 fontFamily'>Environmental</Typography>
                        <p className=' fs-5'>The environmental impact of your exhibition/ congress extends to the construction of booths/demo showcases, materials used, logistics, food and beverages served, energy consumption, etc., all of which directly contribute to both direct and indirect greenhouse gas (GHG) emissions.</p>
                        <p className=' fs-5'>Identifying and optimizing these categories can significantly reduce the overall impact on the environment.</p>
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className="ps-3">
                        <Typography variant='h6' className='green fs-2 py-2 pt-4 fontFamily'>Social</Typography>
                        <p className=' fs-5'>Establishing a social message reflects how socially responsible you are.</p>
                        <p className=' fs-5'>Your exhibition/congress aims to convey a meaningful social message to your audience and to the local community. By taking a few simple steps, we can boost your brand identity and make a positive contribution to the community.</p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className=" p-3 ">
                        <img src={ex2} alt="img" width={"100%"} style={{ borderRadius: "15px" }} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className=" p-3 ">
                        <img src={ex3} alt="img" width={"100%"} style={{ borderRadius: "15px" }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className="ps-3">
                        <Typography variant='h6' className='green fs-2 py-2 pt-4 fontFamily'>Governance</Typography>
                        <p className=' fs-5'>
                            Governance
                            From the initiation of discussions with clients to the conclusion of your event, establishing a strong governance model plays a crucial role in ensuring the overall success of your event..</p>
                        <p className=' fs-5'>Incorporating sustainable measures into your governance model provides complete control over ensuring strict compliance from your clients, contributing to the betterment of our planet.</p>
                    </Box>
                </Grid>
            </Grid>
            <p className=' fs-5 wow animate__animated animate__fadeInUp animate__slow'>Partnering with us enables you to address the ESG models effectively.</p>
            <p className=' fs-5 wow animate__animated animate__fadeInUp animate__slow'>Are you seeking a partner to assist you in setting up a strong ESG model to identify, optimise and reduce your carbon emissions generated during your exhibition/ congress? Kindly visit our<span style={{ color: "#ffffd9" }}> Sustainable Events </span>page and fill the details or alternatively share your details below and submit your request, we will promptly reconnect with you to explore the collaboration opportunities.</p>
        </div>
    )
}

export default Exhibitions
