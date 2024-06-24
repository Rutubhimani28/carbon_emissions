import { useEffect, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import bannerImg from '../../assets/images/measure_ghg_emissions.jpg';
import bannerImg2 from '../../assets/images/net.png';
// import BannerVid from '../../assets/images/NetZero Consulting.mp4';
import BannerVid2 from '../../assets/images/NetZero Platform- Updated Video.mp4';

const Banner = () => {

    const videoRef = useRef();

    useEffect(() => {
        videoRef.current.playbackRate = 0.5;
    }, []);

    return (
        <div>
            {/* <img src={bannerImg} alt='img' height={"100%"} width={"100%"} /> */}
            {/* <div>
                <img src={bannerImg2} alt='Netzero' width={"100%"} style={{ objectFit: 'cover', maxHeight: "650px" }} />
            </div> */}
            <div style={{maxWidth: "100%", maxHeight: "750px", overflow: "hidden" }}>
                <video
                    src={BannerVid2}
                    width={"100%"}
                    autoPlay
                    muted
                    preload
                    ref={videoRef}
                    loop
                    style={{ objectFit: 'fill', height: '75vh' }}
                >
                    <track kind="captions" src="captions.vtt" label="English" />
                    Sorry, your browser doesn't support embedded videos, but don't worry, you can
                    <a href="https://gosustainable.ai/wp-content/uploads/2024/01/Sustainable-Events-Video.mp4">download it</a>
                    and watch it with your favorite video player!
                </video>
            </div>
            <Box className='main pt-5'>
                {/* <Typography variant='h6' className='text-center fs-1 green py-3 pb-5 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Measure Carbon Emissions</Typography> */}
                {/* <Typography variant='h6' className='text-center fs-1 green py-3 pb-5 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow text-white' >NetZero tool</Typography> */}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* <Grid className='fs-5 wow animate__animated animate__fadeInLeft animate__slow' item sm={12} md={6}>For industries, <strong>assessment of your carbon footprint</strong> is a key measure in gaining insight into your emissions, and identifying the key sources of these emissions, and devising an action plan. Participating in <strong>‘Climate Neutral Now’</strong> empowers you to determine the scopes to include in your carbon footprint, as outlined in our framework.</Grid> */}
                    {/* <Grid className='fs-5 wow animate__animated animate__fadeInLeft animate__slow' item sm={12} md={6}><strong>Assessment of your carbon footprint</strong> is a key measure in gaining insight and identifying the key sources of these emissions, and devising an action plan. Participating in <strong>‘Climate Neutral Now’</strong> empowers you to determine the scopes to include in your carbon footprint, as outlined in our framework.</Grid> */}
                    <Grid className='fs-5 wow animate__animated animate__fadeInLeft animate__slow' item sm={12} md={12} style={{ textAlign: 'justify' }}>Assessment of your carbon footprint is a key measure in gaining insight and identifying the key sources of these emissions, and devising an action plan. Participating in 'Climate Neutral Now' empowers you to determine the scopes to include in your carbon footprint, as outlined in NetZero framework.</Grid>

                    {/* <Grid className='fs-5 wow animate__animated animate__fadeInRight animate__slow' item sm={12} md={6}>Globally, we are introducing a <strong>standard methodology to collect carbon footprint data and assess the complete life cycle</strong> of all your marketing & communication activities not limited to campaigns and digital marketing but also covering events & exhibitions, during the pre-, during-, and post- phases, and beyond marking a significant milestone. </Grid> */}
                    {/* <Grid className='fs-5 wow animate__animated animate__fadeInRight animate__slow' item sm={12} md={6}>We have introduced a <strong>standard methodology to collect the carbon footprint data and assess the complete life cycle</strong> of all your marketing & communication activities. It will not be limited to campaigns and digital marketing but also covering events (f2f, online, hybrid), during the pre-, during-, and post-event phases, and marking a significant milestone based on our net-zero framework.</Grid> */}
                    <Grid className='fs-5 py-4 wow animate__animated animate__fadeInRight animate__slow' item sm={12} md={12} style={{ textAlign: 'justify' }}>We have introduced a standard methodology to collect the carbon footprint data and assess the complete life cycle of all your marketing & communication activities. It will not be limited to digital campaigns and digital marketing but also covering events (f2f, online, hybrid), during the pre-, during-, and post-event phases, and marking a significant milestone based on our NetZero framework.</Grid>

                    {/* <Grid className='fs-5 py-4 wow animate__animated animate__fadeInUp animate__slow' item sm={12} >We aim to achieve impact in three stages. The first stage involves <strong>identifying</strong> areas that generate Scope 1, 2, and 3 emissions. The second stage focuses on <strong>optimizing</strong>  how we can reduce these emissions through collaborative efforts. The third stage entails <strong>reporting </strong> on the actual amount of emissions we produced.</Grid> */}

                    {/* <Grid className='fs-5 wow animate__animated animate__fadeInUp animate__slow' item sm={12} >We earnestly delve into the meticulous examination of the <strong>nine diverse categories</strong>   outlined below, aiming to construct a thoughtful framework and cultivate an action plan dedicated to reducing carbon emissions.</Grid> */}
                    {/* <Grid className='fs-5 py-4 wow animate__animated animate__fadeInUp animate__slow' item sm={12} >We earnestly delve into the meticulous examination of the <strong>nine diverse categories</strong> outlined below,</Grid> */}
                    <Grid className='fs-5 py-4 wow animate__animated animate__fadeInUp animate__slow' item sm={12} style={{ textAlign: 'justify' }}>We earnestly delve into the meticulous examination of the nine diverse categories outlined below:</Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Banner
