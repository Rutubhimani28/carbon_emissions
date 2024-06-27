import { useEffect, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
// import BannerVid2 from '../../assets/images/NetZero Platform- Updated Video.mp4';
import BannerVid2 from '../../assets/images/NetZero Platform 3.mp4';

const Banner = () => {

    const videoRef = useRef();

    useEffect(() => {
        videoRef.current.playbackRate = 0.5;
    }, []);

    return (
        <div>
            <div style={{ maxWidth: "100%", maxHeight: "750px", overflow: "hidden" }}>
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
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid className='fs-5 wow animate__animated animate__fadeInLeft animate__slow' item sm={12} md={12} style={{ textAlign: 'justify' }}>Assessment of your carbon footprint is a key measure in gaining insight and identifying the key sources of these emissions, and devising an action plan. Participating in 'Climate Neutral Now' empowers you to determine the scopes to include in your carbon footprint, as outlined in NetZero framework.</Grid>

                    <Grid className='fs-5 py-4 wow animate__animated animate__fadeInRight animate__slow' item sm={12} md={12} style={{ textAlign: 'justify' }}>We have introduced a standard methodology to collect the carbon footprint data and assess the complete life cycle of all your marketing & communication activities. It will not be limited to digital campaigns and digital marketing but also covering events (f2f, online, hybrid), during the pre-, and post-event phases, and marking a significant milestone based on our NetZero framework.</Grid>

                   <Grid className='fs-5 py-4 wow animate__animated animate__fadeInUp animate__slow' item sm={12} style={{ textAlign: 'justify' }}>We earnestly delve into the meticulous examination of the nine diverse categories as outlined below:</Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Banner
