import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div>
            <div className='main py-5'>
                <Typography variant='h6' className='text-center fs-1 green pt-4 fontFamily fw-bold pb-5 wow animate__animated animate__fadeInUp animate__slow' >News Room & Blogs</Typography>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={6}>
                        <Link className='text-decoration-none' to='/blogs/blog1'>
                            <div className='roombg1'>
                                <div className='text-white d-flex justify-content-end flex-column p-3 fontFamily' style={{ height: "500px" }}>
                                    <div className='fs-3 fw-bold'>Going Eco-Friendly with Go Sustainable: Aster CMI Hospital, Bangalore, hosts 2nd IAP-PEM Conference to make a green footprint</div>
                                    <div className='fs-5'>March 18, 2024</div>
                                </div>
                            </div>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={12}>
                                <Link className='text-decoration-none' to="/blogs/blog2">
                                    <div className='roombg2'>
                                        <div className='text-white d-flex justify-content-end flex-column p-3 fontFamily' style={{ height: "250px" }}>
                                            <div className='fs-3 fw-bold lh-lg'>Empowering organizations: Meeting net-zero through the reduction of single-use plastics</div>
                                            <div className='fs-5'>February 19, 2024</div>
                                        </div>
                                    </div>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link className='text-decoration-none' to="/blogs/blog3">
                                    <div className='roombg3'>
                                        <div className='text-white d-flex justify-content-end flex-column p-3 fontFamily' style={{ height: "250px" }}>
                                            <div className='fs-3 fw-bold lh-lg'>Go Sustainable Unveils Net-Zero Framework To Reduce Carbon Footprint In Marketing Operations- Zee News</div>
                                            <div className='fs-5'>February 5, 2024</div>
                                        </div>
                                    </div>
                                </Link>
                            </Grid>


                        </Grid>
                    </Grid>

                </Grid >

            </div >
        </div >
    )
}

export default Index
