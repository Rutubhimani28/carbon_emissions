import { useEffect, useRef } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import bannerVideo2 from '../../assets/images/NetZero Platform- Updated Video.mp4';
import bannerVideo1 from '../../assets/images/NetZero Platform 3.mp4';
import bannerVideo2 from '../../assets/images/NetZero Platform 3.mov';

const Banner = () => {
    const theme = useTheme();

    const videoRef = useRef();

    useEffect(() => {
        videoRef.current.playbackRate = 0.5;
    }, []);

    return (
        <div>
            <div style={{ maxWidth: "100%", maxHeight: "750px", overflow: "hidden" }}>
                <video
                    width={"100%"}
                    autoPlay
                    muted
                    preload
                    ref={videoRef}
                    loop
                    playsInline
                    style={{ objectFit: 'fill', height: useMediaQuery(theme.breakpoints.down('md')) ? "auto" : '75vh' }}
                // style={{ height: '75vh' }}
                >
                    {/* <source src={"https://sirat.earth/static/media/NetZero Platform 3.be3922de36ac58785f94.mp4"} type={"video/mp4"} width={"100%"} />
                    <source src={"https://sirat.earth/static/media/NetZero Platform 3.6d1780745e82c9e0401c.mov"} type={"video/mov"} width={"100%"} /> */}
                    {/* <source src={"https://carbon-emissions-sigma.vercel.app/static/media/NetZero Platform 3.be3922de36ac58785f94.mp4"} type={"video/mp4"} width={"100%"} />
                    <source src={"https://carbon-emissions-sigma.vercel.app/static/media/NetZero Platform 3.6d1780745e82c9e0401c.mov"} type={"video/mov"} width={"100%"} /> */}
                    <source src={"https://sirat.earth:8000/videos/Netzero Platform 3 encoded.mp4"} type={"video/mp4"} />
                    <source src={"https://sirat.earth:8000/videos/NetZero Platform 3.mp4"} type={"video/mp4"} />
                    <source src={"https://sirat.earth:8000/videos/NetZero Platform 3.mov"} type={"video/mov"} />
                    <track kind="captions" src="captions.vtt" label="English" />
                    Sorry, your browser doesn't support embedded videos, but don't worry, you can
                    <a href="https://sirat.earth:8000/videos/Netzero Platform 3 encoded.mp4">download it</a>
                    and watch it with your favorite video player!
                </video>
            </div>
            <Box className='setHome_padding pt-5'>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid className='wow animate__animated animate__fadeInLeft animate__slow' item sm={12} md={12} style={{ textAlign: 'left', fontSize: "18px", }}>Assessment of your carbon footprint is a key measure in gaining insight and identifying the key sources of these emissions, and devising an action plan. Participating in 'Climate Neutral Now' empowers you to determine the scopes to include in your carbon footprint, as outlined in NetZero framework.</Grid>

                    <Grid className='py-4 wow animate__animated animate__fadeInRight animate__slow' item sm={12} md={12} style={{ textAlign: 'left', fontSize: "18px", }}>An AI enabled carbon accounting platform to collect data and assess the complete life cycle of all your marketing and communication activities' carbon footprint. Our platform covers not only digital campaigns and digital marketing but also events, including face-to-face events, virtual events, and public relations events. It encompasses all phases—pre-event, event, and post-event—and marks a significant milestone based on our NetZero framework.</Grid>

                    <Grid className='py-4 wow animate__animated animate__fadeInUp animate__slow' item sm={12} style={{ textAlign: 'left', fontSize: "18px", }}>We earnestly delve into the meticulous examination of the twelve diverse categories as outlined below:</Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Banner
