import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PopupButton } from 'react-calendly'
import { Grid, Typography, Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Services from '../../assets/images/Services2.jpg'
import Agencies from '../../assets/images/Agencies2.jpeg'
import Organisations from '../../assets/images/Organisations2.jpg'
import Hospitality from '../../assets/images/Hospitality.jpeg'
import Exhibitions from '../../assets/images/Exhibition2.jpeg'
import ESGAdvisoryServices from '../../assets/images/ESG Advisory Services.jpeg';
import bannerVideo1 from '../../assets/images/NetZero Consulting.mp4';
import bannerVideo2 from '../../assets/images/NetZero Consulting.mov';

const EsgAdvisory = () => {
    const theme = useTheme()
    const videoRef = useRef();

    useEffect(() => {
        videoRef.current.playbackRate = 0.5;
    }, []);

    return (
        // <div>
        //     <video
        //         src="https://gosustainable.ai/wp-content/uploads/2024/01/Sustainable-Events-Video.mp4" width={"100%"} autoPlay muted>
        //         <track kind="captions" src="captions.vtt" label="English" />
        //         Sorry, your browser doesn't support embedded videos, but don't worry, you can
        //         <a href="https://gosustainable.ai/wp-content/uploads/2024/01/Sustainable-Events-Video.mp4">download it</a>
        //         and watch it with your favorite video player!
        //     </video>
        //     <div className='container'>
        //         <div>
        //             <Typography variant='h6' className='text-center fs-3 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >ESG Advisory Services</Typography>
        //             <p className='py-3 pb-3 fontFamily wow animate__animated animate__fadeInUp animate__slow'>We provide Environmental, Social, and Governance (ESG) advisory services to develop sustainable business strategies for industries. Our objective is to foster collaboration and support within these industries to collectively meet climate goals.</p>
        //             <p className='py-3 pb-3 fontFamily wow animate__animated animate__fadeInUp animate__slow'>Our <span style={{ color: "#ffffd9" }}>emission tool</span> supports data-driven decisions, enhances brand reputation, and aligns with your ESG objectives, reflecting our shared commitment to sustainability and compassion for future generations.</p>
        //         </div>
        //         <div>
        //             <Typography variant='h6' className=' fs-4 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Industries</Typography>
        //             <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='my-4 d-flex ms-1 justify-content-between wow animate__animated animate__fadeInUp animate__slow'>
        //                 <Grid item xs={12} md={2.8} className='shadow text-center py-2 my-2 ' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
        //                     <Typography variant='h6' className=' fs-4 green  fontFamily fw-bold pb-2 pt-2' >Organisations</Typography>
        //                     <p className='fontFamily fs-6'>CMO Vertical</p>
        //                 </Grid>
        //                 <Grid item xs={12} md={2.8} className='shadow text-center py-2 my-2 ' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
        //                     <Typography variant='h6' className=' fs-4 green  fontFamily fw-bold pb-2 pt-2' >Agencies</Typography>
        //                     <p className='fontFamily fs-6'>Supporting organisations</p>
        //                 </Grid>
        //                 <Grid item xs={12} md={2.8} className='shadow text-center py-2 my-2 ' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
        //                     <Typography variant='h6' className=' fs-4 green  fontFamily fw-bold pb-2 pt-2' >Hospitality</Typography>
        //                     <p className='fontFamily fs-6'>Hospitality industry</p>
        //                 </Grid>
        //                 <Grid item xs={12} md={2.8} className='shadow text-center py-2 my-2 ' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
        //                     <Typography variant='h6' className=' fs-4 green  fontFamily fw-bold pb-2 pt-2' >Exhibitions</Typography>
        //                     <p className='fontFamily fs-6'>Gathering exhibitors</p>
        //                 </Grid>

        //             </Grid>
        //         </div>
        //         <div>
        //             <Typography variant='h6' className=' fs-3 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Services</Typography>
        //             <p className='  py-3 pb-3 fontFamily wow animate__animated animate__fadeInUp animate__slow'>Our ESG advisory services assist industries in reducing their carbon footprint, creating a long-term business value.</p>
        //             <img src={services} alt="services" className='mb-5 pb-5 wow animate__animated animate__fadeInUp animate__slow' />
        //         </div>
        //     </div>
        // </div>

        <div>
            {/* <div>
                <img src={ESGAdvisoryServices} alt="ESG Advisory Services" width="100%" style={{ objectFit: "cover", maxHeight: "650px" }} />
            </div> */}

            <div style={{ maxWidth: "100%", maxHeight: "750px", overflow: 'hidden' }}>
                <video
                    width={"100%"}
                    autoPlay
                    muted
                    preload
                    ref={videoRef}
                    loop
                    playsInline
                    // style={{ objectFit: 'fill', height: '66vh' }}
                    style={{ objectFit: 'fill', height: useMediaQuery(theme.breakpoints.down('md')) ? "auto" : '66vh' }}
                >
                    {/* <source src={"https://sirat.earth/static/media/NetZero Consulting.76cf997a4ada4ef7a99c.mp4"} type={"video/mp4"} width={"100%"} />
                    <source src={"https://sirat.earth/static/media/NetZero Consulting.55c11663218fe2bac3f1.mov"} type={"video/mov"} width={"100%"} /> */}
                    {/* <source src={"https://carbon-emissions-sigma.vercel.app/static/media/NetZero Consulting.76cf997a4ada4ef7a99c.mp4"} type={"video/mp4"} width={"100%"} />
                    <source src={"https://carbon-emissions-sigma.vercel.app/static/media/NetZero Consulting.55c11663218fe2bac3f1.mov"} type={"video/mov"} width={"100%"} /> */}
                    <source src={"https://sirat.earth:8000/videos/NetZero Consulting.mp4"} type={"video/mp4"} />
                    <source src={"https://sirat.earth:8000/videos/NetZero Consulting.mov"} type={"video/mov"} />
                    <track kind="captions" src="captions.vtt" label="English" />
                    Sorry, your browser doesn't support embedded videos, but don't worry, you can
                    <a href="https://sirat.earth:8000/videos/NetZero Consulting.mp4">download it</a>
                    and watch it with your favorite video player!
                </video>
            </div>

            <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <p className='pb-4 setHome_padding fontFamily wow animate__animated animate__fadeInUp animate__slow' style={{ textAlign: 'left', fontSize: "18px" }}> We provide NetZero Consulting to develop sustainable business strategies for industries. Our objective is to foster collaboration and support within these industries to collectively meet climate goals. By adopting sustainable measures, industries can reduce their operational costs while creating added value and acting responsibly. With NetZero Consulting you can improve efficiency, control costs, and achieve your sustainability goals. </p>
            </div>

            <div className='container'>
                <div>
                    <img src={Services} alt="services" className='pb-5 wow animate__animated animate__fadeInUp animate__slow' />
                </div>


                <div className='d-block mx-auto'>
                    <Typography variant='h6' className='fs-1 pt-2 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow text-center' >Industries</Typography>
                    <Grid container spacing={2} style={{ marginLeft: "-8px" }} className='  my-4 d-flex  justify-content-xl-between justify-content-sm-center   wow animate__animated animate__fadeInUp animate__slow'>
                        <Grid item xs={12} md={5.5} lg={2.8} className='shadow text-center  py-2 m-2 template-inner-theme' style={{ paddingLeft: '-30px', borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
                            <Typography variant='h6' className='fs-4 fontFamily fw-bold pb-2 pt-2' ><a href="#organisations" style={{ textDecoration: 'none', color: 'inherit' }}>Organisations</a></Typography>
                            <p className='fontFamily fs-6'>CMO Vertical</p>
                        </Grid>
                        <Grid item xs={12} md={5.5} lg={2.8} className='shadow text-center py-2 m-2 template-inner-theme' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
                            <Typography variant='h6' className=' fs-4 fontFamily fw-bold pb-2 pt-2' ><a href="#agencies" style={{ textDecoration: 'none', color: 'inherit' }}>Agencies</a></Typography>
                            <p className='fontFamily fs-6'>Supporting organisations</p>
                        </Grid>
                        <Grid item xs={12} md={5.5} lg={2.8} className='shadow text-center py-2 m-2 template-inner-theme' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
                            <Typography variant='h6' className=' fs-4 fontFamily fw-bold pb-2 pt-2'> <a href="#hospitality" style={{ textDecoration: 'none', color: 'inherit' }}>Hospitality</a></Typography>
                            <p className='fontFamily fs-6'>Hospitality industry</p>
                        </Grid>
                        <Grid item xs={12} md={5.5} lg={2.8} className='shadow text-center py-2 m-2 template-inner-theme' style={{ borderRadius: "20px", boxShadow: "0 0rem 1rem rgb(0 0 0 / 41%)" }}>
                            <Typography variant='h6' className=' fs-4 fontFamily fw-bold pb-2 pt-2' ><a href="#exhibitions" style={{ textDecoration: 'none', color: 'inherit' }}>Exhibitions</a></Typography>
                            <p className='fontFamily fs-6'>Gathering exhibitors</p>
                        </Grid>
                    </Grid>
                </div>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='py-3' id="organisation">
                    <Grid item xs={12} md={4} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                        <Box className="organise p-3" style={{ borderRadius: "20px" }}>
                            <img src={Organisations} alt="img" width={"100%"} />
                            <Typography variant='h6' className='text-center py-2 pt-4 fontFamily' color="#054723">Organisations</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInRight animate__slow d-flex flex-column justify-content-evenly ps-3' style={{ margin: useMediaQuery(theme.breakpoints.up('sm')) ? "0 0" : "0 -6px" }}>
                        <p
                            style={{ textAlign: 'left', fontSize: "18px", padding: useMediaQuery(theme.breakpoints.up('sm')) ? "0 40px" : "0 0px" }}> Our NetZero Consulting for the Chief Marketing Officer (CMO) vertical transcends routine ESG measures. Understanding the challenges you face, we believe in empowering you to take proactive steps towards sustainability across all your activities.</p>
                        <p style={{ textAlign: 'left', fontSize: "18px", padding: useMediaQuery(theme.breakpoints.up('sm')) ? "0 40px" : "0 0px", marginTop: useMediaQuery(theme.breakpoints.up('md')) ? "0" : "15px" }} >Our <Link to="/netzero-platform" style={{ color: "#ffffd9", textAlign: 'justify', textDecoration: 'none' }}>NetZero Platform</Link>, tailored specifically for the marketing vertical, diligently measures the carbon footprint generated from each activity, aiding in your journey towards sustainability goals and enhancing corporate responsibility. It offers precise data on the carbon footprint from marketing activities, enabling targeted reduction strategies.</p>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-3' id="agencies">
                    <Grid item xs={12} md={4} sx={{ order: { md: '2' } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                        <Box className="organise p-3" style={{ borderRadius: "20px" }}>
                            <img src={Agencies} alt="img" width={"100%"} />
                            <Typography variant='h6' className='text-center py-2 pt-4 fontFamily' color="#054723">Agencies</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInLeft animate__slow d-flex flex-column justify-content-evenly ps-3' style={{ margin: useMediaQuery(theme.breakpoints.up('sm')) ? "0 0" : "0 -6px" }}>
                        <p style={{ textAlign: 'left', fontSize: "18px", padding: useMediaQuery(theme.breakpoints.up('sm')) ? "0 40px" : "0 0px" }} > Agencies supporting organizations (clients) offer a distinctive value proposition by executing sustainable activities throughout the year. Embracing NetZero practices not only sets you apart from the competition but also demonstrates your understanding to environmental concerns, attracting more clients and expanding your business opportunities.</p>
                        <p style={{ textAlign: 'left', fontSize: "18px", padding: useMediaQuery(theme.breakpoints.up('sm')) ? "0 40px" : "0 0px", marginTop: useMediaQuery(theme.breakpoints.up('md')) ? "0" : "15px" }} > Our <Link to="/netzero-platform" style={{ color: "#ffffd9", textAlign: 'justify', textDecoration: 'none' }}>NetZero Platform</Link> assists in measuring the carbon footprint of the activities you support, positioning you as a sustainable event organizer. It provides accurate data on environmental impact, enhancing your brand reputation and aligning with your companies, and countries climate actions.</p>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-3' id="hospitality">
                    <Grid item xs={12} md={4} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                        <Box className="organise p-3" style={{ borderRadius: "20px" }}>
                            <img src={Hospitality} alt="img" width={"100%"} />
                            <Typography variant='h6' className='text-center py-2 pt-4 fontFamily' color="#054723">Hospitality</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInRight animate__slow d-flex flex-column justify-content-evenly ps-3' style={{ margin: useMediaQuery(theme.breakpoints.up('sm')) ? "0 0" : "0 -6px" }}>
                        <p style={{ textAlign: 'left', fontSize: "18px", padding: useMediaQuery(theme.breakpoints.up('sm')) ? "0 40px" : "0 0px" }}>Attracting major companies to host events and exhibitions in your hotel demonstrates your commitment to clients and sustainability. We understand that many organizations seek sustainable hotels, and we're here to help you meet those expectations through our NetZero Consulting.</p>
                        <p style={{ textAlign: 'left', fontSize: "18px", padding: useMediaQuery(theme.breakpoints.up('sm')) ? "0 40px" : "0 0px", marginTop: useMediaQuery(theme.breakpoints.up('md')) ? "0" : "15px" }}>To fully adhere to sustainable measures, you need a NetZero framework and a <Link to="/netzero-platform" style={{ color: "#ffffd9", textAlign: 'justify', textDecoration: 'none' }}>NetZero Platform</Link> that meticulously tracks the emissions generated during clients' events on your premises. Our NetZero Platform aids in managing your carbon footprint, attracting climate-conscious clients, and aligning with your overall ESG objectives.</p>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-3' id="exhibitions">
                    <Grid item xs={12} md={4} sx={{ order: { md: '2' } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                        <Box className="organise p-3" style={{ borderRadius: "20px" }}>
                            <img src={Exhibitions} alt="img" width={"100%"} className='img-fuild' />
                            <Typography variant='h6' className='text-center py-2 pt-4 fontFamily' color="#054723">Exhibitions</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInLeft animate__slow d-flex flex-column justify-content-evenly ps-3' style={{ margin: useMediaQuery(theme.breakpoints.up('sm')) ? "0 0" : "0 -6px" }}>
                        <p style={{ textAlign: 'left', fontSize: "18px", padding: useMediaQuery(theme.breakpoints.up('sm')) ? "0 40px" : "0 0px" }} >As an exhibition or congress organizer, you play a pivotal role in bringing together diverse companies, segments, and government bodies, enabling them to showcase their innovations. To fully embrace sustainable practices, we understand your willingness to support climate initiatives.</p>
                        <p style={{ textAlign: 'left', fontSize: "18px", padding: useMediaQuery(theme.breakpoints.up('sm')) ? "0 40px" : "0 0px", marginTop: useMediaQuery(theme.breakpoints.up('md')) ? "0" : "15px" }} > A robust governance model, coupled with our NetZero Consulting and a <Link to="/netzero-platform" style={{ color: "#ffffd9", textAlign: 'justify', textDecoration: 'none' }} > NetZero Platform</Link>, enhances your reputation, attracting eco-conscious exhibitors and attendees. Together, we align with your overall ESG objectives, fostering accountability and environmental stewardship.</p>
                    </Grid>
                </Grid>
                <p style={{ fontSize: "18px", padding: useMediaQuery(theme.breakpoints.up('sm')) ? "0 40px" : "10px 0px" }} >We would like to partner with you to reduce your carbon footprint, fostering long-term business value creation with a deep understanding of your needs.</p>
                <p className='fontFamily wow animate__animated animate__fadeInUp animate__slow pb-5 mt-2' style={{ textAlign: 'center' }}>
                    <PopupButton
                        url="https://calendly.com/mohammed-sirat"
                        rootElement={document.getElementById("root")}
                        text="Book a meeting"
                        styles={{ border: 'none', background: 'none', color: "#ffffd9", margin: '0', padding: '0' }}
                        className='fs-5'
                    />
                    <span className='fs-5'> with us to know more.</span>
                </p>
            </div>
        </div>
    )
}

export default EsgAdvisory