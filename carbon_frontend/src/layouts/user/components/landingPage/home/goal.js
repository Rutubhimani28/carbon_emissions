import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import goal1 from '../../../assets/images/goal1.png'
import goal2 from '../../../assets/images/goal2.png'
import goal3 from '../../../assets/images/goal3.png'
import goal4 from '../../../assets/images/goal4.png'
import goal5 from '../../../assets/images/goal5.png'
import goal6 from '../../../assets/images/goal6.png'
import goal7 from '../../../assets/images/goal7.png'
import mission from '../../../assets/images/mission.png'
import vision from '../../../assets/images/visionary.png'

const Goal = () => {
    return (
        <div>
            <div>
                <Typography variant='h6' className='text-center fs-3 green pt-4 fontFamily fw-bold' >Targeted Sustainable Development Goals (SDGs)</Typography>
                <p className='text-center  py-3 pb-5 fontFamily '>As part of our framework, we are actively and directly contributing to the below 7 SDGs out of<span style={{ color: "#4edceb" }}> 17 UN SDGs.</span></p>
            </div>
            <div className='d-flex align-align-items-center flex-wrap justify-content-center'>

                <img src={goal1} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal2} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal3} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal4} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal5} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal6} alt='img' width={200} className='mx-2 my-2' />
                <img src={goal7} alt='img' width={200} className='mx-2 my-2' />
            </div>
            <div className='text-center py-5'>
                <p className='text-center fontFamily '>Want to enhance your thinking with real ideas, insights, and updates from us?</p>
                <button style={{ backgroundColor: "#4ABD43", color: "#fff", borderRadius: "30px", border: "0", padding: "12px 50px" }}>Sign up!</button>
            </div>
            <div>
                <Typography variant='h6' className='text-center fs-3 green pt-5 pb-3 fontFamily fw-bold' >Our Mission & Vision</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} md={1} style={{ opacity: "0" }}>
                        fd
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box className="d-flex justify-content-center flex-column align-items-center">
                            <img src={mission} alt="img" width={50} />
                            <Typography variant='h6' className='text-center fs-5 pt-2 pb-4 fontFamily fw-bold' >Mission</Typography>
                            <p>To promote awareness within industries regarding the crucial significance of steering their marketing operations with sustainable practices and to motivate them to actively reduce their carbon footprint.</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box className="d-flex justify-content-center flex-column align-items-center">
                            <img src={vision} alt="img" width={50} />
                            <Typography variant='h6' className='text-center fs-5  pt-2 pb-4 fontFamily fw-bold' >Vision</Typography>
                            <p>Charting a pioneering vision, we aspire to empower the Chief Marketing Officer vertical and its stakeholders, guiding them towards accomplishing a 50% reduction in both direct and indirect greenhouse gas emissions by 2030.</p>
                        </Box>
                    </Grid>
                    <Grid item xs={0} md={1} style={{ opacity: "0" }}>
                        df
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Goal
