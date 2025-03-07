import { Link } from 'react-router-dom';
import { PopupButton } from 'react-calendly';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Card, Grid, Typography, useMediaQuery } from '@mui/material';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTheme } from '@mui/material/styles';
import banner from '../../assets/images/AboutBg.jpeg';
import ceo from '../../assets/images/CEO.png';
import what from '../../assets/images/What.png';
import net from '../../assets/images/net.png';
import goal1 from '../../assets/images/goal1.png';
import goal2 from '../../assets/images/goal2.png';
import goal3 from '../../assets/images/goal3.png';
import goal4 from '../../assets/images/goal4.png';
import goal5 from '../../assets/images/goal5.png';
import goal6 from '../../assets/images/goal6.png';
import goal7 from '../../assets/images/goal7.png';

const About = () => {
  const theme = useTheme();
  return (
    <div>
      {/* banner */}
      <div>
        <img src={banner} alt="img" width={'100%'} className="h-xl-75 h-sm-100" />
      </div>
      <div className="py-4">
        <p
          className="pt-4 fontFamily setHome_padding wow animate__animated animate__fadeInUp animate__slow"
          style={{ fontSize: '18px' }}
        >
          Sirat is dedicated to transforming marketing into a force for environmental good. We partner with businesses
          to integrate sustainable practices into their strategies, reducing carbon footprints and creating meaningful
          environmental impact.
        </p>
        <p
          className="py-1 pt-4 fontFamily setHome_padding wow animate__animated animate__fadeInUp animate__slow"
          style={{ fontSize: '18px' }}
        >
          Our solutions are tailored to meet the unique needs of organizations, exhibitions, hospitality and agencies,
          ensuring measurable results. With Sirat, you can align profitability with responsibility, making a lasting
          difference for your business and the planet.
        </p>
      </div>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="mt-3">
        <Grid item xs={0} md={2.1} />
        <Grid item sm={12} md={3.9} className="wow animate__animated animate__fadeInLeft animate__slow mb-5">
          <Box
            className="d-flex justify-content-center flex-column align-items-start p-4 rounded-3 bg-white mx-3 template-inner-theme"
            sx={{
              height: { xs: '200px', sm: '260px', md: '220px' },
              boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            }}
          >
            {/* <img src={mission} alt="img" width={50} className='tabImgWhite' /> */}
            <Typography variant="h6" className="text-start fs-5 pb-4 fontFamily fw-bold">
              Mission
            </Typography>
            <p className="text-start fs-6 ">
              To promote sustainable marketing and generate awareness to look beyond supply chain emissions and
              emphasize the importance of adopting sustainable practices in marketing.
            </p>
          </Box>
        </Grid>
        <Grid item sm={12} md={3.9} className="wow animate__animated animate__fadeInRight animate__slow mb-5">
          <Box
            className="d-flex justify-content-center flex-column align-items-start p-4 rounded-3 bg-white mx-3 template-inner-theme"
            sx={{
              height: { xs: '200px', sm: '260px', md: '220px' },
              boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            }}
          >
            {/* <img src={vision} alt="img" width={50} className='tabImgWhite' /> */}
            <Typography variant="h6" className="text-start fs-5 pb-4 fontFamily fw-bold">
              Vision
            </Typography>
            <p className="text-start fs-6 ">
              We aspire to remove 100 Megaton of carbon equivalent (100 MtCO<sub>2</sub>e) by 2030, driving meaningful
              environmental impact through sustainable marketing practices by collaboration.{' '}
            </p>
          </Box>
        </Grid>
        <Grid item xs={0} md={2.1} />
      </Grid>

      <div>
        <Typography
          variant="h6"
          className="text-center fs-3 fontFamily fw-bold justify-content-center wow animate__animated animate__fadeInUp animate__slow"
        >
          Targeted Sustainable Development Goals (SDGs)
        </Typography>
        <p
          className="text-center fontFamily justify-content-center wow animate__animated animate__fadeInUp animate__slow"
          style={{ padding: useMediaQuery(theme.breakpoints.up('sm')) ? '14px 10px' : '14px 10px' }}
        >
          As part of our framework, we are actively and directly contributing to the following 7 SDGs out of
          <a href="https://sdgs.un.org/goals" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            {' '}
            17 UN SDGs
          </a>
          .
        </p>
      </div>
      <div className="d-flex align-align-items-center flex-wrap justify-content-center">
        <img
          src={goal1}
          alt="img"
          width={130}
          className="mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow"
        />
        <img
          src={goal2}
          alt="img"
          width={130}
          className="mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow"
        />
        <img
          src={goal3}
          alt="img"
          width={130}
          className="mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow"
        />
        <img
          src={goal4}
          alt="img"
          width={130}
          className="mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow"
        />
        <img
          src={goal5}
          alt="img"
          width={130}
          className="mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow"
        />
        <img
          src={goal6}
          alt="img"
          width={130}
          className="mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow"
        />
        <img
          src={goal7}
          alt="img"
          width={130}
          className="mx-2 my-2 justify-content-center wow animate__animated animate__fadeInUp animate__slow "
        />
      </div>
      {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className="text-center">
                        <Typography variant='h6' className=' fs-1 pt-2 pb-4 fontFamily fw-bold green' >What we do</Typography>
                        <p className=' fs-5'>We offer <span style={{ color: "#ffffd9" }}> ESG Advisory Services</span>, bringing together the CMO vertical and their stakeholders on our integrated platform. Our aim is to foster collaboration and devise innovative methodologies for measuring both direct and indirect greenhouse gas (GHG) emissions.</p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box >
                        <img src={what} alt="img" width={"90%"} style={{ borderRadius: "10px" }} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box >
                        <img src={net} alt="img" width={"90%"} style={{ borderRadius: "10px" }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className="text-center">
                        <Typography variant='h6' className=' fs-1 pt-2 pb-4 fontFamily fw-bold green' >Net-Zero Framework</Typography>
                        <p className=' fs-5'>We encourage organizations to <span style={{ color: "#ffffd9" }}> assess the emissions </span> resulting from their various marketing activities and collaborate with us <strong> to minimize their carbon footprint by leveraging our net-zero framework.</strong></p>
                    </Box>
                </Grid>
            </Grid> */}
      <div>
        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >
                    <Grid item xs={12} md={9} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                        <Box className="text-center main">
                            <div className='d-flex flex-column justify-content-between align-items-center'>
                                <Typography variant='h6' className=' fs-1 fontFamily fw-bold green' style={{ color: '#054723' }}>    Founder</Typography>
                                <Typography className=' fs-1 pb-4 fontFamily fw-bold green ' style={{ marginTop: "-25px", display: { md: 'none' }, color: '#054723' }} ><RemoveIcon style={{ fontSize: "50px" }} /><FiberManualRecordIcon style={{ fontSize: "20px" }} /><RemoveIcon style={{ fontSize: "50px" }} /></Typography>
                            </div>
                            <p className='fs-5'>A seasoned Marketing and Communications leader with over 30 years of experience, this INSEAD graduate boasts a rich global marketing background. His career has taken him across various markets, including India, APAC, China, the Middle East & Africa, and Eastern Europe, enhancing his cultural adaptability and understanding.</p>
                        </Box>
                        <Box className="text-center main">
                            <PopupButton
                                url="https://calendly.com/mohammed-sirat"
                                rootElement={document.getElementById("root")}
                                text="Book a slot with our CEO"
                                styles={{ border: 'none', background: 'none', color: "#ffffd9" }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} className='d-flex justify-content-center align-items-center flex-column wow animate__animated animate__fadeInRight animate__slow' sx={{ order: { md: '1' } }}>
                        <Box >
                            <img src={ceo} alt="img" width={"100%"} style={{ borderRadius: "10px" }} />
                        </Box>
                        <div className='text-center pt-2' >
                            <p className=' fs-5 mb-0'>Mohammed Shafeeq</p>
                            <p className=' fs-6 mb-0'>CEO & Founder</p>
                            <div className='d-flex justify-content-center py-2 pb-4'>
                                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#000000", color: "#fff", borderRadius: "5px" }}><FaXTwitter /></Box>
                                <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#0077b5", color: "#fff", borderRadius: "5px" }}><FaLinkedin /></Box>
                            </div>
                        </div>
                    </Grid>
                </Grid> */}

        {/* <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="py-5 main"
          sx={{ padding: useMediaQuery(theme.breakpoints.down('md')) && '0px 10px 0px 20px !important' }}
        //   style={{ width: useMediaQuery (theme.breakpoints.up('sm')) ? "1550px" : '388px' }}
        //   style={{marginLeft : useMediaQuery(theme.breakpoints.up('sm')) ? "0" : '-3px'}}
        >
          <Grid
            item
            xs={12}
            md={9}
            sx={{ order: { xs: '2', md: '1' }, borderRadius: { xs: '0px 0px 10px 10px', md: '10px 0px 0px 10px' } }}
            className="wow animate__animated animate__fadeInLeft animate__slow template-inner-theme d-flex flex-column justify-content-center"
            style={{ textAlign: 'center' }}
          >
            <Box className="text-center" style={{ marginBottom: '20px' }}>
              <div className="d-flex flex-column justify-content-between align-items-center">
                <Typography variant="h6" className=" fs-1 fontFamily fw-bold" style={{ color: '#efefef' }}>
                  Meet the CEO- Mohammed Shafeeq
                </Typography>
                <Typography
                  className="fs-1 pb-4 fontFamily fw-bold"
                  style={{ display: { md: 'none' }, color: '#efefef' }}
                >
                  <RemoveIcon style={{ fontSize: '50px' }} />
                  <FiberManualRecordIcon style={{ fontSize: '20px' }} />
                  <RemoveIcon style={{ fontSize: '50px' }} />{' '}
                </Typography>
              </div>
              <p className="fs-5 setMeetFounderText text-start">
                A seasoned Marketing and Communications leader with over 30 years of experience, this INSEAD graduate
                boasts a rich global marketing background. His career has taken him across various markets, including
                India, APAC, China, the Middle East & Africa, and Eastern Europe, enhancing his cultural adaptability
                and understanding.
              </p>
            </Box>
            <div className="d-flex justify-content-center py-2 pb-4">
              <Box
                style={{
                  padding: '2px 10px 4px 10px',
                  fontSize: '20px',
                  marginRight: '10px',
                  backgroundColor: '#0077b5',
                  color: '#fff',
                  borderRadius: '5px',
                }}
              >
                <Link target="_blank" to="https://www.linkedin.com/in/shafeeqm/">
                  <FaLinkedin style={{ color: 'white' }} />
                </Link>
              </Box>
              <Box
                style={{
                  padding: '2px 10px 4px 10px',
                  fontSize: '20px',
                  marginRight: '10px',
                  backgroundColor: '#000000',
                  color: '#fff',
                  borderRadius: '5px',
                }}
              >
                <Link target="_blank" to="https://x.com/shafeeqm">
                  <FaXTwitter style={{ color: 'white' }} />{' '}
                </Link>
              </Box>
            </div>
            <Box className="text-center pt-3" style={{ marginBottom: '20px' }}>
              <PopupButton
                                url="https://calendly.com/mohammed-sirat"
                                rootElement={document.getElementById("root")}
                                text="Book a Meeting with our CEO"
                                styles={{ border: 'none', background: 'none', color: "#ffffd9" }}
                            />
              <Link to="/team" className='fs-5' style={{ textDecoration: 'none', color: "#ffffd9" }}>Meet the Team</Link>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            className="d-flex justify-content-center align-items-center flex-column wow animate__animated template-inner-theme pe-4 pt-4 animate__fadeInRight animate__slow"
            sx={{ order: { md: '1' }, borderRadius: { xs: '10px 10px 0px 0px', md: '0px 10px 10px 0px' } }}
          >
            <Box>
              <img
                src={ceo}
                alt="img"
                className="img-fuild"
                width={'100%'}
                style={{
                  borderRadius: '10px',
                  marginLeft: useMediaQuery(theme.breakpoints.up('md')) ? '2px' : '8px',
                }}
              />
            </Box>
            <div className="text-center pt-2">
              <p className=" fs-5 mb-0">Mohammed Shafeeq</p>
              <p className=" fs-6 mb-0">CEO & Founder</p>
            </div>
          </Grid>
        </Grid> */}

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="py-5 main"
          sx={{ padding: useMediaQuery(theme.breakpoints.down('md')) && '0px 10px 0px 20px !important' }}
        >
          <Grid
            item
            xs={12}
            md={9}
            sx={{ order: { xs: '2', md: '1' }, borderRadius: { xs: '0px 0px 10px 10px', md: '10px 0px 0px 10px' } }}
            className="wow animate__animated animate__fadeInLeft animate__slow d-flex flex-column justify-content-center"
            style={{
              textAlign: 'center',
              borderTop: useMediaQuery(theme.breakpoints.up('md')) ? '2px solid #054723' : 'none',
              borderBottom: '2px solid #054723',
              borderLeft: '2px solid #054723',
              borderRight: useMediaQuery(theme.breakpoints.up('md')) ? 'none' : '2px solid #054723',
            }}
          >
            <Box className="text-center">
              <div className="d-flex justify-content-between align-items-center">
                <p
                  className="mt-4 fs-3 mb-4 fontFamily fw-bold"
                  style={{ paddingLeft: useMediaQuery(theme.breakpoints.up('md')) ? '20px' : '0px' }}
                >
                  Meet the CEO- Mohammed Shafeeq
                </p>
              </div>
              <p className="fs-5 setMeetFounderText text-start">
                A seasoned Marketing and Communications leader with over 30 years of experience, this INSEAD graduate boasts a rich global marketing background. His career has taken him across various markets, including India, APAC, China, the Middle East & Africa, and Eastern Europe, enhancing his cultural adaptability and understanding.
              </p>
              <p className="fs-5 setMeetFounderText text-start">
              {/* One of the Finalist for INSEAD Business Sustainability Award 2025. */}
              Proud Finalist for the INSEAD Business Sustainability Award 2025
              </p>
            </Box>
            <div
              className="d-flex justify-content-center pt-4"
              style={{ paddingBottom: useMediaQuery(theme.breakpoints.up('md')) ? '30px' : '15px' }}
            >
              <Box
                style={{
                  padding: '2px 10px 4px 10px',
                  fontSize: '20px',
                  marginRight: '10px',
                  backgroundColor: '#0077b5',
                  color: '#fff',
                  borderRadius: '5px',
                }}
              >
                <Link target="_blank" to="https://www.linkedin.com/in/shafeeqm/">
                  <FaLinkedin style={{ color: 'white' }} />
                </Link>
              </Box>
              <Box
                style={{
                  padding: '2px 10px 4px 10px',
                  fontSize: '20px',
                  marginRight: '10px',
                  backgroundColor: '#000000',
                  color: '#fff',
                  borderRadius: '5px',
                }}
              >
                <Link target="_blank" to="https://x.com/shafeeqm">
                  <FaXTwitter style={{ color: 'white' }} />{' '}
                </Link>
              </Box>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            className="d-flex justify-content-center align-items-center flex-column wow animate__animated animate__fadeInRight animate__slow"
            sx={{ order: { md: '1' }, borderRadius: { xs: '10px 10px 0px 0px', md: '0px 10px 10px 0px' } }}
            style={{
              paddingRight: useMediaQuery(theme.breakpoints.up('md')) ? '0px' : '23px',
              paddingBottom: '10px',
              borderTop: '2px solid #054723 ',
              borderBottom: useMediaQuery(theme.breakpoints.up('md')) ? '2px solid #054723' : 'none',
              borderLeft: useMediaQuery(theme.breakpoints.up('md')) ? 'none' : '2px solid #054723',
              borderRight: '2px solid #054723',
            }}
          >
            <Box style={{
              maxWidth:useMediaQuery(theme.breakpoints.up('md')) ? '220px': "100%"
            }}>
              <img
                src={ceo}
                alt="img"
                className="img-fuild"
                width={'100%'}
                style={{
                  borderRadius: '10px',
                  marginLeft: useMediaQuery(theme.breakpoints.up('md')) ? '2px' : '8px',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default About;
