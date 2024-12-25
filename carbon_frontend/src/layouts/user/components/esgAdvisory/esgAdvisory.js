import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PopupButton } from 'react-calendly';
import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Services from '../../assets/images/Services2.jpg';
import Agencies from '../../assets/images/Agencies2.jpeg';
import Organisations from '../../assets/images/Organisations2.jpg';
import Hospitality from '../../assets/images/Hospitality.jpeg';
import Exhibitions from '../../assets/images/Exhibition2.jpeg';
import ESGAdvisoryServices from '../../assets/images/ESG Advisory Services.jpeg';
import bannerVideo1 from '../../assets/images/NetZero Consulting.mp4';
import bannerVideo2 from '../../assets/images/NetZero Consulting.mov';
import EnterpriseSolution from '../../assets/images/Enterprise_Solutions.png';
import EnterpriseSolution2 from '../../assets/images/Enterprise_Solutions_2.jpg';

const EsgAdvisory = () => {
  const theme = useTheme();
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
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxHeight: '750px',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <img
          src={EnterpriseSolution2}
          alt="ESG Advisory Services"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            aspectRatio: '40/15',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            fontSize: 'clamp(10px, 4vw, 45px)',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            zIndex: 2,
            padding: '0 20px',
          }}
        >
          Sustainability-as-a-Service <br /> (SaaS) for Marketing
        </div>
      </div>

      <div style={{ paddingTop: '30px', paddingBottom: '16px' }}>
        <Typography className="fontFamily pb-2 fs-3 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow template-outer-theme-2">
          Committed to Sustainability
        </Typography>
        <p
          className="pb-4  mt-2 setHome_padding fontFamily wow animate__animated animate__fadeInUp animate__slow"
          style={{ textAlign: 'left', fontSize: '18px' }}
        >
          {' '}
          Our enterprise marketing practices focus on creating value that benefits both people and the planet. By
          aligning with environmental and social responsibility, we build trust, foster loyalty, and drive lasting
          growth.
        </p>
        <Typography className="fontFamily fs-3 p-2 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow template-outer-theme-2 mb-3">
          Identify . Measure . Reduce . Manage
        </Typography>
      </div>

      <div style={{ overflow: 'hidden' }}>
        {/* <div style={{ overflow: 'hidden', padding: '0 10%' , height:"100vh" , width:"100%"}}> */}
        <video
          width={'100%'}
          autoPlay
          muted
          preload
          ref={videoRef}
          loop
          playsInline
          // style={{ objectFit: 'fill', height: '66vh' }}
          style={{
            objectFit: 'contain',
            margin: '0 auto',
            display: 'block',
            // height: useMediaQuery(theme.breakpoints.down('md')) ? 'auto' : 'vh',
          }}
        >
          {/* <source src={"https://sirat.earth/static/media/NetZero Consulting.76cf997a4ada4ef7a99c.mp4"} type={"video/mp4"} width={"100%"} />
                    <source src={"https://sirat.earth/static/media/NetZero Consulting.55c11663218fe2bac3f1.mov"} type={"video/mov"} width={"100%"} /> */}
          {/* <source src={"https://carbon-emissions-sigma.vercel.app/static/media/NetZero Consulting.76cf997a4ada4ef7a99c.mp4"} type={"video/mp4"} width={"100%"} />
                    <source src={"https://carbon-emissions-sigma.vercel.app/static/media/NetZero Consulting.55c11663218fe2bac3f1.mov"} type={"video/mov"} width={"100%"} /> */}
          <source src={'https://sirat.earth:8000/videos/Netzero Platform 3 encoded.mp4'} type={'video/mp4'} />
          <source src={'https://sirat.earth:8000/videos/NetZero Platform 3.mp4'} type={'video/mp4'} />
          <source src={'https://sirat.earth:8000/videos/NetZero Platform 3.mov'} type={'video/mov'} />
          <track kind="captions" src="captions.vtt" label="English" />
          Sorry, your browser doesn't support embedded videos, but don't worry, you can
          <a href="https://sirat.earth:8000/videos/NetZero Consulting.mp4">download it</a>
          and watch it with your favorite video player!
        </video>
      </div>

      <Typography
        style={{ textAlign: 'left', fontSize: '18px' }}
        className="setHome_padding mt-5 fontFamily wow animate__animated animate__fadeInLeft animate__slow template-outer-theme"
      >
        The Sirāt's AI enabled NetZero platform empowers you to identify, measure and reduce the marketing carbon
        footprint. And manage your diverse marketing activities by keeping sustainability at the center stage and look
        beyond the carbon footprint generated from supply chain and improve your overall company's performance to meet
        NetZero goals.
      </Typography>
      <Typography
        style={{ textAlign: 'left', fontSize: '18px' }}
        className="setHome_padding fontFamily mt-3 wow animate__animated animate__fadeInLeft animate__slow"
      >
        Transform your marketing impact by embedding sustainability into every step. Sirāt's AI-powered NetZero platform
        empowers you to identify, measure, reduce, and manage your carbon footprint with precision.
      </Typography>
      <div className="container">
        <div className="d-block mx-auto">
          {/* <Typography variant='h6' className='fs-1 pt-2 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow text-center' >Industries</Typography> */}
          <Grid
            container
            spacing={2}
            style={{ paddingLeft: '20px', paddingRight: '6px' }}
            className="my-4 d-flex justify-content-xl-between justify-content-sm-center wow animate__animated animate__fadeInUp animate__slow"
          >
            <Grid
              item
              xs={12}
              md={5.5}
              lg={2.8}
              className="shadow text-start py-2 m-2 template-inner-theme"
              style={{ borderRadius: '5px', paddingLeft: '-30px', boxShadow: '0 0rem 1rem rgb(0 0 0 / 41%)' }}
            >
              <Typography variant="h6" className="fs-4 fontFamily fw-bold box-title-padding pt-2">
                <a href="#identify" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Identify
                </a>
              </Typography>
              <p style={{ paddingRight: '3px' }} className="fontFamily fs-6 text-start pb-2">
                Pinpoint the origins of your carbon footprint across various marketing activities. Sirāt's NetZero
                Platform creates awareness by highlighting the emission hotspots tailored to your activity types.
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              md={5.5}
              lg={2.8}
              className="shadow text-start py-2 m-2 template-inner-theme"
              style={{ borderRadius: '5px', boxShadow: '0 0rem 1rem rgb(0 0 0 / 41%)' }}
            >
              <Typography variant="h6" className=" fs-4 fontFamily fw-bold box-title-padding pt-2">
                <a href="#measure" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Measure
                </a>
              </Typography>
              <p style={{ paddingRight: '3px' }} className="fontFamily fs-6 pb-2">
                Quantify the carbon footprint of your diverse marketing activities with ease. Sirāt's NetZero Platform
                provides accurate, real-time data to help you understand the environmental impact of your operations.
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              md={5.5}
              lg={2.8}
              className="shadow text-start py-2 m-2 template-inner-theme"
              style={{ borderRadius: '5px', boxShadow: '0 0rem 1rem rgb(0 0 0 / 41%)' }}
            >
              <Typography variant="h6" className=" fs-4 fontFamily fw-bold box-title-padding pt-2">
                {' '}
                <a href="#reduce" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Reduce
                </a>
              </Typography>
              <p style={{ paddingRight: '3px' }} className="fontFamily fs-6 pb-2">
                Leverage AI-driven recommendations to minimize your carbon footprint. Sirāt's NetZero Platform delivers
                precise strategies to optimize emissions under each category, fostering sustainable marketing practices.
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              md={5.5}
              lg={2.8}
              className="shadow text-start py-2 m-2 template-inner-theme"
              style={{ borderRadius: '5px', boxShadow: '0 0rem 1rem rgb(0 0 0 / 41%)' }}
            >
              <Typography variant="h6" className=" fs-4 fontFamily fw-bold box-title-padding pt-2">
                <a href="#manage" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Manage
                </a>
              </Typography>
              <p style={{ paddingRight: '3px' }} className="fontFamily fs-6 pb-2">
                Streamline your sustainability efforts with comprehensive analytical reports. Sirāt's NetZero Platform
                enables you to compare emissions over time and manage progress towards your NetZero goals seamlessly.
              </p>
            </Grid>
          </Grid>
        </div>
      </div>
      <Grid
        container
        spacing={2}
        style={{
          padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0px 50px' : '0px 13px 0px 31px ',
        }}
        className="my-4 d-flex justify-content-xl-between justify-content-sm-center"
      >
        <Grid item sm={12} md={12} className="d-flex justify-content-center">
          <Typography
            className="fontFamily fs-4 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow pb-4"
            item
            sm={12}
            md={12}
          >
            Explore how our NetZero Platform drives innovation in sustainable marketing and carbon accounting
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={5.5}
          lg={2.8}
          className="text-start py-2 template-inner-theme-2 pb-4"
          style={{ paddingLeft: useMediaQuery(theme.breakpoints.up('sm')) ? '10px' : '0px' }}
        >
          <Box>
            <img
              src={Organisations}
              alt="img"
              width={'100%'}
              style={{ paddingLeft: '0px', height: '165px', objectFit: 'cover', borderRadius: '6px' }}
            />
          </Box>
          <p
            style={{
              textAlign: 'left',
              fontSize: '19px',
              color: '#1f9e6d',
              fontWeight: 'bold',
              padding: useMediaQuery(theme.breakpoints.up('sm')) ? '10px 2px 4px 4px' : '10px 0px 4px 0px',
            }}
          >
            {' '}
            Organizations
          </p>
          <p
            style={{
              textAlign: 'left',
              color: '#1f9e6d',
              padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0px 0px 0px 4px' : '0px 0px 12px 0px',
              // marginTop: useMediaQuery(theme.breakpoints.up('md')) ? '0' : '0px',
            }}
          >
            Optimize your carbon footprint with solutions tailored to your diverse marketing activities.
          </p>
        </Grid>

        <Grid
          item
          xs={12}
          md={5.5}
          lg={2.8}
          className="text-start py-2 template-inner-theme-2"
          style={{ paddingLeft: '0px' }}
        >
          <Box>
            <img
              src={Agencies}
              alt="img"
              width={'100%'}
              style={{ height: '165px', objectFit: 'cover', borderRadius: '6px' }}
            />
          </Box>
          <p
            style={{
              textAlign: 'left',
              fontSize: '19px',
              color: '#1f9e6d',
              fontWeight: 'bold',
              padding: useMediaQuery(theme.breakpoints.up('sm')) ? '10px 2px 4px 4px' : '10px 0px 4px 0px',
            }}
          >
            {' '}
            Agencies
          </p>
          <p
            style={{
              textAlign: 'left',
              color: '#1f9e6d',
              padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0px 0px 0px 4px' : '0px 0px 12px 0px',
              // marginTop: useMediaQuery(theme.breakpoints.up('md')) ? '0' : '0px',
            }}
          >
            Go beyond execution by offering sustainable practices to your clients and attracting more business.
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          md={5.5}
          lg={2.8}
          className="text-start py-2 template-inner-theme-2"
          style={{ paddingLeft: '0px' }}
        >
          <Box>
            <img
              src={Hospitality}
              alt="img"
              width={'100%'}
              style={{ paddingLeft: '0px', height: '165px', objectFit: 'cover', borderRadius: '6px' }}
            />
          </Box>
          <p
            style={{
              textAlign: 'left',
              fontSize: '19px',
              color: '#1f9e6d',
              fontWeight: 'bold',
              padding: useMediaQuery(theme.breakpoints.up('sm')) ? '10px 2px 4px 4px' : '10px 0px 4px 0px',
            }}
          >
            {' '}
            Hospitality
          </p>
          <p
            style={{
              textAlign: 'left',
              color: '#1f9e6d',
              padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0px 0px 0px 4px' : '0px 0px 12px 0px',
              // marginTop: useMediaQuery(theme.breakpoints.up('md')) ? '0' : '0px',
            }}
          >
            Host events that matter by attracting companies seeking sustainable venues.
          </p>
        </Grid>

        <Grid
          item
          xs={12}
          md={5.5}
          lg={2.8}
          className="text-start py-2 template-inner-theme-2"
          style={{ paddingLeft: '0px' }}
        >
          <Box>
            <img
              src={Exhibitions}
              alt="img"
              width={'100%'}
              style={{ paddingLeft: '0px', height: '165px', objectFit: 'cover', borderRadius: '6px' }}
            />
          </Box>
          <p
            style={{
              textAlign: 'left',
              fontSize: '19px',
              color: '#1f9e6d',
              fontWeight: 'bold',
              padding: useMediaQuery(theme.breakpoints.up('sm')) ? '10px 2px 4px 4px' : '10px 0px 4px 0px',
            }}
          >
            {' '}
            Exhibitions
          </p>
          <p
            style={{
              textAlign: 'left',
              color: '#1f9e6d',
              padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0px 0px 0px 4px' : '0px 0px 12px 0px',
              // marginTop: useMediaQuery(theme.breakpoints.up('md')) ? '0' : '0px',
            }}
          >
            Tailored solutions to make your exhibitions greener and attract more exhibitors and attendees.
          </p>
        </Grid>
      </Grid>
      {/* <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          id="organisation"
          style={{
            marginTop: '20px',
            border: 'solid 1px #1F9E6D',
            boxShadow: ' 0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
            borderRadius: '21px',
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{ order: { md: '1' } }}
            style={{ padding: '5px' }}
            className="wow animate__animated animate__fadeInLeft animate__slow"
          >
            <Box className="organise-2 p-3" style={{ borderRadius: '20px' }}>
              <img src={Organisations} alt="img" width={'100%'} />
              <Typography variant="h6" className="text-center pt-3 fontFamily">
                Organisations
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ order: { xs: '2', md: '1' } }}
            className="wow animate__animated animate__fadeInRight animate__slow ps-3 d-flex flex-column  justify-content-center align-items-start"
            style={{ margin: useMediaQuery(theme.breakpoints.up('sm')) ? '0 0' : '0 -6px' }}
          >
            <p
              style={{
                textAlign: 'left',
                fontSize: '30px',
                color: '#1f9e6d',
                fontWeight: 'bold',
                padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0px 0px 24px 40px' : '0px 0px 20px 0px',
              }}
            >
              {' '}
              Organizations
            </p>
            <p
              style={{
                textAlign: 'left',
                fontSize: '18px',
                color: '#1f9e6d',
                padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0 40px' : '0px 0px 12px 0px',
                // marginTop: useMediaQuery(theme.breakpoints.up('md')) ? '0' : '0px',
              }}
            >
              Optimize your carbon footprint with solutions tailored to your diverse marketing activities.
            </p>
          </Grid>
        </Grid> */}
      {/* <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          id="agencies"
          style={{
            marginTop: '20px',
            border: 'solid 1px #1F9E6D',
            boxShadow: ' 0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
            borderRadius: '21px',
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{ order: { md: '2' } }}
            className="wow animate__animated animate__fadeInRight animate__slow"
            style={{ padding: '5px' }}
          >
            <Box className="organise-2 p-3" style={{ borderRadius: '20px' }}>
              <img src={Agencies} alt="img" width={'100%'} />
              <Typography variant="h6" className="text-center pt-3 fontFamily">
                Agencies
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ order: { xs: '2', md: '1' } }}
            className="wow animate__animated animate__fadeInLeft animate__slow  ps-3 d-flex flex-column  justify-content-center align-items-start"
            style={{ color: '#1f9e6d', margin: useMediaQuery(theme.breakpoints.up('sm')) ? '0 0' : '12px -6px' }}
          >
            <p
              style={{
                textAlign: 'left',
                fontSize: '30px',
                fontWeight: 'bold',
                color: '1f9e6d',
                padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0px 0px 24px 40px' : '0px 0px 20px 0px',
                // padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0 40px' : '0 0px',
              }}
            >
              Agencies
            </p>
            <p
              style={{
                textAlign: 'left',
                fontSize: '18px',
                color: '#1f9e6d',
                padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0 40px' : '0px 0px 0px 0px',
                // marginTop: useMediaQuery(theme.breakpoints.up('md')) ? '0' : '15px',
              }}
            >
              Go beyond execution by offering sustainable practices to your clients and attracting more business.
            </p>
          </Grid>
        </Grid> */}
      {/* <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          id="Hospitality"
          style={{
            marginTop: '20px',
            border: 'solid 1px #1F9E6D',
            boxShadow: ' 0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
            borderRadius: '21px',
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{ order: { md: '1' } }}
            style={{ padding: '5px' }}
            className="wow animate__animated animate__fadeInLeft animate__slow"
          >
            <Box className="organise-2 p-3" style={{ borderRadius: '20px' }}>
              <img src={Hospitality} alt="img" width={'100%'} />
              <Typography variant="h6" className="text-center pt-3 fontFamily">
                Hospitality
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ order: { xs: '2', md: '1' } }}
            className="wow animate__animated animate__fadeInRight animate__slow ps-3 d-flex flex-column  justify-content-center align-items-start"
            style={{ margin: useMediaQuery(theme.breakpoints.up('sm')) ? '0 0' : '0 -6px' }}
          >
            <p
              style={{
                textAlign: 'left',
                fontSize: '30px',
                color: '#1f9e6d',
                fontWeight: 'bold',
                padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0px 0px 24px 40px' : '0px 0px 20px 0px',
              }}
            >
              {' '}
              Hospitality
            </p>
            <p
              style={{
                textAlign: 'left',
                fontSize: '18px',
                color: '#1f9e6d',
                padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0 40px' : '0px 0px 12px 0px',
                // marginTop: useMediaQuery(theme.breakpoints.up('md')) ? '0' : '0px',
              }}
            >
              Host events that matter by attracting companies seeking sustainable venues.
            </p>
          </Grid>
        </Grid> */}
      {/* <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          id="organisation"
          style={{
            border: 'solid 1px #1F9E6D',
            marginTop: '20px',
            marginBottom: '20px',
            boxShadow: ' 0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
            borderRadius: '21px',
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{ order: { md: '2' } }}
            style={{ padding: '5px' }}
            className="wow animate__animated animate__fadeInLeft animate__slow"
          >
            <Box className="organise-2 p-3" style={{ borderRadius: '20px' }}>
              <img src={Exhibitions} alt="img" width={'100%'} className="img-fuild" />
              <Typography variant="h6" className="text-center pt-3 fontFamily">
                Exhibitions
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ order: { xs: '2', md: '1' } }}
            className="wow animate__animated animate__fadeInRight animate__slow  ps-3 d-flex flex-column  justify-content-center align-items-start"
            style={{ color: '#1f9e6d', margin: useMediaQuery(theme.breakpoints.up('sm')) ? '0 0' : '0 -6px' }}
          >
            <p
              style={{
                textAlign: 'left',
                fontSize: '30px',
                fontWeight: 'bold',
                padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0px 0px 24px 40px' : '0px 0px 20px 0px',
                // padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0 40px' : '0 0px',
              }}
            >
              Exhibitions
            </p>
            <p
              style={{
                textAlign: 'left',
                fontSize: '18px',
                color: '#1f9e6d',
                padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0 40px' : '0px 0px 12px 0px',
                // marginTop: useMediaQuery(theme.breakpoints.up('md')) ? '0' : '15px',
              }}
            >
              Tailored solutions to make your exhibitions greener and attract more exhibitors and attendees.
            </p>
          </Grid>
        </Grid> */}

      {/* <div>
          <img
            src={Services}
            alt="services"
            style={{ marginTop: useMediaQuery(theme.breakpoints.up('md')) ? '40px' : '15px' }}
            className="pb-5 wow animate__animated animate__fadeInUp animate__slow"
          />
        </div> */}
      {/* <p style={{ fontSize: '18px', padding: useMediaQuery(theme.breakpoints.up('sm')) ? '0 40px' : '10px 0px' }}>
          We would like to partner with you to reduce your carbon footprint, fostering long-term business value creation
          with a deep understanding of your needs.
        </p>
        <p
          className="fontFamily wow animate__animated animate__fadeInUp animate__slow pb-5 mt-2"
          style={{ textAlign: 'center' }}
        >
          <PopupButton
            url="https://calendly.com/mohammed-sirat"
            rootElement={document.getElementById('root')}
            text="Book a meeting"
            styles={{ border: 'none', background: 'none', color: '#ffffd9', margin: '0', padding: '0' }}
            className="fs-5"
          />
          <span className="fs-5"> with us to know more.</span>
        </p> */}
    </div>
  );
};

export default EsgAdvisory;
