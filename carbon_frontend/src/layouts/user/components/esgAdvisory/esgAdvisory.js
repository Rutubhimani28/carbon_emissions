import { Grid, Typography } from '@mui/material'
import React from 'react'
import services from '../../assets/images/Services.jpg'

const esgAdvisory = () => {
    return (
        <div>
            <video
                src="https://gosustainable.ai/wp-content/uploads/2024/01/Sustainable-Events-Video.mp4" width={"100%"} autoPlay muted>
                <track kind="captions" src="captions.vtt" label="English" />
                Sorry, your browser doesn't support embedded videos, but don't worry, you can
                <a href="https://gosustainable.ai/wp-content/uploads/2024/01/Sustainable-Events-Video.mp4">download it</a>
                and watch it with your favorite video player!
            </video>
            <div className='container'>
                <div>
                    <Typography variant='h6' className='text-center fs-3 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >ESG Advisory Services</Typography>
                    <p className='  py-3 pb-3 fontFamily wow animate__animated animate__fadeInUp animate__slow'>We provide Environmental, Social, and Governance (ESG) advisory services to develop sustainable business strategies for the industries. Our objective is to foster collaboration and support within these industries to collectively meet the climate goals</p>
                </div>
                <div>
                    <Typography variant='h6' className=' fs-4 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Industries</Typography>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='my-4 d-flex ms-1 justify-content-between wow animate__animated animate__fadeInUp animate__slow'>
                        <Grid item xs={12} md={2.8} className='shadow text-center py-2 my-2 ' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
                            <Typography variant='h6' className=' fs-4 green  fontFamily fw-bold pb-2 pt-2' >Organisations</Typography>
                            <p className='fontFamily fs-6'>CMO Vertical</p>
                        </Grid>
                        <Grid item xs={12} md={2.8} className='shadow text-center py-2 my-2 ' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
                            <Typography variant='h6' className=' fs-4 green  fontFamily fw-bold pb-2 pt-2' >Agencies</Typography>
                            <p className='fontFamily fs-6'>Supporting organisations</p>
                        </Grid>
                        <Grid item xs={12} md={2.8} className='shadow text-center py-2 my-2 ' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
                            <Typography variant='h6' className=' fs-4 green  fontFamily fw-bold pb-2 pt-2' >Hospitality</Typography>
                            <p className='fontFamily fs-6'>Hospitality industry</p>
                        </Grid>
                        <Grid item xs={12} md={2.8} className='shadow text-center py-2 my-2 ' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
                            <Typography variant='h6' className=' fs-4 green  fontFamily fw-bold pb-2 pt-2' >Exhibitions</Typography>
                            <p className='fontFamily fs-6'>Gathering exhibitors</p>
                        </Grid>

                    </Grid>
                </div>
                <div>
                    <Typography variant='h6' className=' fs-3 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Services</Typography>
                    <p className='  py-3 pb-3 fontFamily wow animate__animated animate__fadeInUp animate__slow'>Our ESG advisory services assist industries in reducing their carbon footprint, creating a long-term business value.</p>
                    <img src={services} alt="services" className='mb-5 pb-5 wow animate__animated animate__fadeInUp animate__slow' />
                </div>
            </div>
        </div>
    )
}

export default esgAdvisory
