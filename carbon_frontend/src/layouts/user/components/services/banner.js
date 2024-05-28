import { Box, Grid, Typography } from '@mui/material';
import bannerImg from '../../assets/images/measure_ghg_emissions.jpg';


const banner = () => {
    return (
        <div>
            <img src={bannerImg} alt='img' height={"100%"} width={"100%"} />
            <Box className='main pt-5'>
                <Typography variant='h6' className='text-center fs-1 green py-3 pb-5 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Measure Carbon Emissions</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid className='fs-5 wow animate__animated animate__fadeInLeft animate__slow' item sm={12} md={6}>For industries, <strong>assessment of your carbon footprint</strong> is a key measure in gaining insight into your emissions, and identifying the key sources of these emissions, and devising an action plan. Participating in <strong>‘Climate Neutral Now’</strong> empowers you to determine the scopes to include in your carbon footprint, as outlined in our framework.</Grid>

                    <Grid className='fs-5 wow animate__animated animate__fadeInRight animate__slow' item sm={12} md={6}>Globally, we are introducing a <strong>standard methodology to collect carbon footprint data and assess the complete life cycle</strong> of all your marketing & communication activities not limited to campaigns and digital marketing but also covering events & exhibitions, during the pre-, during-, and post- phases, and beyond marking a significant milestone. </Grid>

                    <Grid className='fs-5 py-4 wow animate__animated animate__fadeInUp animate__slow' item sm={12} >We aim to achieve impact in three stages. The first stage involves <strong>identifying</strong> areas that generate Scope 1, 2, and 3 emissions. The second stage focuses on <strong>optimizing</strong>  how we can reduce these emissions through collaborative efforts. The third stage entails <strong>reporting </strong> on the actual amount of emissions we produced.</Grid>

                    <Grid className='fs-5 wow animate__animated animate__fadeInUp animate__slow' item sm={12} >We earnestly delve into the meticulous examination of the <strong>nine diverse categories</strong>   outlined below, aiming to construct a thoughtful framework and cultivate an action plan dedicated to reducing carbon emissions.</Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default banner
