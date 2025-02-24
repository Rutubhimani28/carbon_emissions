import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useTheme } from '@emotion/react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { PopupButton } from 'react-calendly';
import '../../../assets/css/style.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import commited from '../../../assets/images/CommitedLogo.png';
// import Pledge from '../../../assets/images/PledgeTonetZERO.png'
import Pledge from '../../../assets/images/PledgeTonetZERO2.jpg';
import greenview from '../../../assets/images/GreenView.png';
import Room1 from '../../../assets/images/room1.jpeg';
import Room2 from '../../../assets/images/room2.jpeg';
import Room3 from '../../../assets/images/room3.jpg';
import Room4 from '../../../assets/images/room4.png';
import Room5 from '../../../assets/images/room5.jpg';
import Room6 from '../../../assets/images/room6.jpg';
import Room7 from '../../../assets/images/room7.jpg';
import AreYouReadyImg from '../../../assets/images/Are-you-ready-img.png';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Goal = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleReadArtical = (link) => {
    navigate(link);
  };
  const [accounts, setAccounts] = useState([]);
  const [instgramData, setInstagramData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          'https://graph.facebook.com/v18.0/me/accounts?access_token=EACGHvj52RzwBO5dbZAP5eH0LWYvANFoM71plxszc8a0QhQZAUwf9CiWVyc9q4tN2XYgdRsvQwkQxYpLfOL88PLMnG9thEO9nFaIRHvNJySeFyfxEi4ACCWhRHaUZBaA9sMSZAkMCcLzeU2RgISqZCsaCFEreJvu3ZASuAZCUjrKhM2bnwkEXq4F0j1C'
        );
        setAccounts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const { data: [{ id, access_token: accessToken } = {}] = [] } = accounts || {};
  console.log(id, accessToken, 'accounts id and access token');
  console.log(id, 'accounts id');

  const handleInstagram = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://graph.facebook.com/${id}/insights?access_token=${accessToken}&metric=page_impressions&since=2025-02-17&until=2025-02-20`
      );
      setInstagramData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(instgramData, 'instagram');
  let chartData = null;
  if (instgramData && instgramData.length > 0) {
    const dailyData = instgramData.find((item) => item.period === 'day') || instgramData[0];
    const labels = dailyData.values.map((val) => new Date(val.end_time).toLocaleDateString());
    const impressions = dailyData.values.map((val) => val.value);

    chartData = {
      labels,
      datasets: [
        {
          label: dailyData.title,
          data: impressions,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
    };
  }

  // Helper function to get the item for a given period ("day", "week", "days_28")
  const getPeriodData = (period) => {
    if (!instgramData) return null;
    return instgramData.find((item) => item.period === period);
  };

  // Extract the three known items (Daily, Weekly, 28 Days)
  const dailyItem = getPeriodData('day');
  const weeklyItem = getPeriodData('week');
  const monthlyItem = getPeriodData('days_28');
  // Data array for images and descriptions
  const carouselData = [
    {
      id: 7,
      image: Room7,
      description: 'HUTCH Deepens Commitment to Sustainability with Adoption of Sirāt NetZero Platform',
      link: '/news-room/blog7',
    },
    {
      id: 6,
      image: Room6,
      description: 'Sirāt Files Patent for Innovative NetZero Platform',
      link: '/news-room/blog6',
    },
    {
      id: 1,
      image: Room5,
      description: 'Leading the NetZero charge: How sustainable marketing can transform the future of business',
      link: '/news-room/blog5',
    },
    {
      id: 2,
      image: Room4,
      description: 'Mohammed Shafeeq ILPSE C10, Pioneering Sustainable Entrepreneurship in Marketing',
      link: '/news-room/blog4',
    },
    {
      id: 3,
      image: Room1,
      description: 'Going Eco-Friendly with Go Sustainable: Aster CMI Hospital, Bangalore…',
      link: '/news-room/blog1',
    },
    {
      id: 4,
      image: Room2,
      description: 'Empowering organizations: Meeting net-zero through the reduction of single-use plastics',
      link: '/news-room/blog2',
    },
    {
      id: 5,
      image: Room3,
      description: 'Go Sustainable Unveils Net-Zero Framework To Reduce Carbon Footprint In Marketing...',
      link: '/news-room/blog3',
    },
  ];
  const settings = {
    dots: false, // Show dots below the slider
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed in ms
    slidesToShow: 3, // Number of slides (images) to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: false, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay interval (in ms)
    responsive: [
      {
        breakpoint: 1024, // For screens < 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // For screens < 768px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div>
      {/* <div className='pb-5'>
                <Typography variant='h6' className='text-center fs-3 green pt-5 pb-3 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow text-white' >Our Mission & Vision</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} md={2.1} />
                    <Grid item sm={12} md={3.9} className='wow animate__animated animate__fadeInLeft animate__slow'>
                        <Box className="d-flex justify-content-center flex-column align-items-center p-4 rounded-3 bg-white mx-3 template-inner-theme" style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                            <img src={mission} alt="img" width={50} className='tabImgWhite' />
                            <Typography variant='h6' className='text-center fs-5 pt-2 pb-4 fontFamily fw-bold' >Mission</Typography>
                            <p className='text-center fs-6'>To promote awareness and empower organizations' CMO verticals, stakeholders, and exhibition organizers to adopt sustainable marketing practices that contribute to meaningful environmental impact.</p>
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={3.9} className='wow animate__animated animate__fadeInRight animate__slow'>
                        <Box className="d-flex justify-content-center flex-column align-items-center p-4 rounded-3 bg-white mx-3 template-inner-theme" style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                            <img src={vision} alt="img" width={50} className='tabImgWhite' />
                            <Typography variant='h6' className='text-center fs-5  pt-2 pb-4 fontFamily fw-bold' >Vision</Typography>
                            <p className='text-center fs-6'>We aspire to remove 1 Gigaton of carbon equivalent (1 GtCO<sub>2</sub>e) by 2030, driving meaningful environmental impact through sustainable marketing practices by collaborating with our clients.</p>
                        </Box>
                    </Grid>
                    <Grid item xs={0} md={2.1} />
                </Grid>
            </div> */}
      {/* <Grid container justifyContent="center" className='wow animate__animated animate__fadeInRight animate__slow pb-3 bg-light mx-auto' color="#054723" style={{ marginBottom: '50px' }}>
                <Grid item sm={12} md={12} className="d-flex justify-content-center pt-3">
                    <Typography className='fontFamily fs-3 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow' item sm={12} md={12}>Trusted By</Typography>
                </Grid>
                <Grid item sm={12} md={8} className="d-flex justify-content-center">
                    <Box className="box-with-border d-flex justify-content-center flex-column align-items-center p-4 rounded-3 mx-0">
                        <img src={TrustOne} alt='img' width={100} />
                    </Box>
                    <Box className="d-flex justify-content-center flex-column align-items-center p-4 rounded-3 mx-0">
                        <img src={TrustTwo} alt='img' width={100} />
                    </Box>
                </Grid>
            </Grid> */}

      {/* LTAEST NEWS */}
      <Box sx={{ p: 2 }}>
        {/* Button to fetch data */}
        <Button variant="contained" onClick={handleInstagram}>
          Fetch Data
        </Button>

        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}

        {/* Once data is fetched, display chart + cards */}
        {instgramData && instgramData.length > 0 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Chart on the left (4 columns on md and up, 12 columns on xs/sm) */}
            {chartData && (
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    Facebook Impressions (Day)
                  </Typography>
                  {/* Make the chart a bit narrower */}
                  <Box sx={{ mx: 'auto', width: '100%', maxWidth: 400 }}>
                    <Line data={chartData} />
                  </Box>
                </Box>
              </Grid>
            )}

            {/* Cards on the right (8 columns on md and up, 12 columns on xs/sm) */}
            <Grid item xs={12} md={chartData ? 8 : 12}>
              <Grid container spacing={2}>
                {/* If you have exactly 3 items, display them side by side */}
                {[dailyItem, weeklyItem, monthlyItem].map(
                  (item, index) =>
                    item && (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {item.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                              {item.description}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              <strong>Name:</strong> {item.name}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Period:</strong> {item.period}
                            </Typography>
                            {item.values &&
                              item.values.map((val, idx) => (
                                <Box key={idx} sx={{ ml: 2, mt: 1 }}>
                                  <Typography variant="body2">
                                    <strong>Value:</strong> {val.value}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>End Time:</strong> {new Date(val.end_time).toLocaleString()}
                                  </Typography>
                                </Box>
                              ))}
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
      <Typography
        sx={{
          fontSize: 'clamp(20px, 3vw, 1.75rem)', // Adjust font size further
          marginTop: { xs: '-50px', sm: '5px' }, // Smaller margin for extra-small screens
          marginBottom: { xs: '-15px', sm: '5px' }, // Smaller margin for extra-small screens
          lineHeight: '1.2',
        }}
        // className="fontFamily fs-3 mt-1 mb-4 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow text-white"
        className="fontFamily fs-3 mb-4 mt-5 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow"
        style={{ margin: useMediaQuery(theme.breakpoints.up('md')) ? '0px' : '26px' }}
      >
        Latest News
      </Typography>

      <Grid
        container
        justifyContent="center"
        className="wow animate__animated animate__fadeInRight animate__slow pb-3 mx-auto"
        sx={{ color: '#054723' }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '90%',
            margin: '0 auto',
            padding: { xs: '0 5px', sm: '0 10px', md: '0 20px' },
          }}
        >
          <Slider
            {...settings}
            style={{
              margin: '5px',
              position: 'relative',
            }}
          >
            {carouselData?.map((item) => (
              <div
                style={{
                  border: '1px solid black',
                  borderRadius: '48px',
                  display: 'flex',
                  alignContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  margin: '0 20px',
                }}
              >
                <div
                  key={item.id}
                  style={{
                    height: '300px',
                    maxWidth: '280px',
                    border: '1px solid black',
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    margin: '0 auto',
                  }}
                >
                  <img
                    src={item.image}
                    className="img-fluid"
                    alt={`Slide ${item.id}`}
                    style={{
                      width: '100%',
                      maxWidth: item.id === 4 ? '350px' : '400px',
                      height: item.id === 4 ? '175px' : '175px',
                      maxHeight: '145px',
                      borderRadius: '8px',
                      objectFit: 'contain',
                      margin: '0 auto',
                      padding: '6px',
                    }}
                  />
                  <p
                    style={{
                      textAlign: 'start',
                      // color: 'white',
                      width: '100%',
                      maxWidth: '400px',
                      height: '85px',
                      fontSize: 'clamp(16px, 1vw, 20px)',
                      marginTop: '5px',
                      padding: '0px 10px 13px 10px',
                      paddingLeft: { sm: '10px', md: '20px' },
                    }}
                  >
                    {item.description}
                  </p>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                      paddingLeft: '10px',
                    }}
                  >
                    <Button
                      // className="fs-5 text-white mb-2"
                      className="fs-5 template-outer-theme"
                      onClick={() => handleReadArtical(item.link)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginTop: '0px',
                        fontSize: { xs: '10px', sm: '12px', md: '14px' },
                        padding: { xs: '4px 0px', sm: '5px 1px' },
                      }}
                    >
                      Read Article
                      <ArrowRightAltIcon style={{ color: '#003d99', fontSize: '50px' }} />
                    </Button>
                  </Box>
                  {/* <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                      paddingLeft: { xs: '10px', sm: '40px', md: '10px', xl: '195px' },
                    }}
                  >
                    <Button
                      className="template-inner-theme text-white mb-2"
                      onClick={() => handleReadArtical(item.link)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginTop: '5px',
                        fontSize: { xs: '10px', sm: '12px', md: '14px' },
                        padding: { xs: '4px 8px', sm: '5px 10px' },
                      }}
                    >
                      Read Article <ArrowForwardIcon />
                    </Button>
                  </Box> */}
                </div>
              </div>
            ))}
          </Slider>
        </Box>
      </Grid>

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxHeight: '500px',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <img
          src={AreYouReadyImg}
          alt="ESG Advisory Services"
          style={{
            width: '100%',
            height: useMediaQuery(theme.breakpoints.up('sm')) ? '300px' : '250px',
            objectFit: 'cover',
            display: 'block',
            aspectRatio: '40/15',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#035b03c7',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            fontSize: 'clamp(10px, 4vw, 45px)',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            zIndex: 2,
            padding: '0 0px',
          }}
        >
          <Grid container justifyContent="center" className="pb-3 mt-3 mx-auto">
            <Box>
              <Typography className="fontFamily fs-3 mb-3 fw-bold text-center">Are you ready?</Typography>
              <Typography className="fontFamily mb-3 fs-5 text-center px-2">
                Explore Sirāt's NetZero Platform today.
              </Typography>
              <Typography className="fontFamily fs-5 mt-4 text-center text-white">
                <Link className="btn-contact" to={'/contact'} style={{ color: 'white' }}>
                  Contact Us
                </Link>
              </Typography>
            </Box>
          </Grid>
        </div>
      </div>

      {/* collabrate */}
      {/* <div className="container-fuild collabrate d-flex justify-content-center main " style={{ overflowX: 'hidden' }}>
        <div className="row d-flex justify-content-center mb-xl-3">
          <div className="col-xl-5 col-md-12 ps-xl-2 mt-2">
            <h1 className="fontFamily text-light fw-bold mt-3">Collaborating for Sustainable Development</h1>
            <p className="text-light fs-5 mt-1">
              Through our cross-sector partnerships and collaborative efforts, we demonstrate our commitment to ensuring
              your organization is never alone in addressing systemic sustainability challenges, enabling a positive
              climate impact.
            </p>
            <p className="text-light fs-5 mt-2">
              Sirāt invites a wide range of stakeholders to partner with us for sustainable development, including
              companies, advisors, partners, as well as external collaborations and alliances to meet the climate goals.
            </p>
          </div>
          <div className="col-xl-7 col-md-12 mt-xl-2">
            <div className="row d-flex justify-content-center mt-2">
              <div className="col-md-4">
                <img
                  src={commited}
                  alt="img"
                  className="img-fuild pt-xl-2 pt-sm-5"
                  width={useMediaQuery(theme.breakpoints.up('sm')) ? '150px' : '200px'}
                  style={{
                    height: '100px',
                    margin: useMediaQuery(theme.breakpoints.up('md')) ? '0 auto' : '20px auto',
                    marginBottom: '10px',
                  }}
                />
                <p
                  style={{
                    marginBottom: '15px',
                    paddingBottom: useMediaQuery(theme.breakpoints.up('md')) ? '' : '15px',
                    borderBottom: useMediaQuery(theme.breakpoints.up('sm')) ? '' : '2px solid white',
                  }}
                >
                  We are a proud member of the SME Climate Hub, a global initiative that empowers small to medium sized
                  companies to take climate action and build more resilient businesses. In making the commitment, we
                  have joined the United Nations <strong>Race to Zero</strong> campaign.
                </p>
              </div>
              <div
                className="col-md-4"
                style={{
                  borderLeft: useMediaQuery(theme.breakpoints.up('md')) ? '2px solid white' : 0,
                  borderRight: useMediaQuery(theme.breakpoints.up('md')) ? '2px solid white' : 0,
                }}
              >
                <img
                  src={Pledge}
                  alt="img"
                  width={100}
                  style={{
                    height: '100px',
                    margin: useMediaQuery(theme.breakpoints.up('md')) ? '0 auto' : '20px auto',
                    marginBottom: '10px',
                  }}
                  className="img-fuild pt-xl-2 pt-sm-5"
                />
                <p
                  className="p-xl-2"
                  style={{
                    marginBottom: '15px',
                    paddingBottom: useMediaQuery(theme.breakpoints.up('md')) ? '' : '15px',
                    borderBottom: useMediaQuery(theme.breakpoints.up('sm')) ? '' : '2px solid white',
                  }}
                >
                  We have made a 'Pledge to Net Zero' and are committed to reducing our GHG emissions. Pledge to Net
                  Zero' is the environmental industry’s global commitment, requiring science-based targets from its
                  signatories to tackle greenhouse gas emissions within their organisations.
                </p>
              </div>
              <div className="col-md-4 mb-sm-3">
                <img
                  src={greenview}
                  className="tabImgWhite img-fuild pt-xl-2 pt-sm-5"
                  alt="img"
                  width={200}
                  style={{
                    height: '100px',
                    margin: useMediaQuery(theme.breakpoints.up('md')) ? '0 auto' : '20px auto',
                    marginBottom: '10px',
                  }}
                />
                <p
                  className="ps-xl-2 "
                  style={{
                    marginBottom: '15px',
                    paddingBottom: useMediaQuery(theme.breakpoints.up('sm')) ? '0' : '28px',
                  }}
                >
                  We partnered with Greenview and using their dataset to measure the Hotel carbon Footprint generated
                  from staying in Hotels across the world. Their global benchmarking index includes over 27,000 hotels
                  worldwide - the Cornell Hotel Sustainability Benchmarking (CHSB) index 2024.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className='collabrate d-flex  justify-content-center'>
                <div style={{ display: 'flex', maxWidth: "50%", wordBreak: 'break-word' }}  >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >

                        <Grid item xs={12} md={12} className='wow animate__animated animate__fadeInUp animate__slow'>
                            <Box style={{ color: 'white' }} >
                                <Typography variant='h6' className='text-light fs-1 pt-2 pb-4 fontFamily fw-bold'>Collaborating for Sustainable Development</Typography>
                                <p className='text-light fs-5 mb-4'>Through our cross-sector partnerships and collaborative efforts, we demonstrate our commitment to ensuring your organization is never alone in addressing systemic sustainability challenges, enabling a positive climate impact.
                                </p>
                                <p className='text-light fs-5'>
                                    Sirāt invites a wide range of stakeholders to partner with us for sustainable development, including companies, advisors, partners, as well as external collaborations and alliances to meet the climate goals.
                                </p>
                                <p className='text-light fs-5'>
                                <PopupButton
                                    url="https://calendly.com/mohammed-sirat"
                                    rootElement={document.getElementById("root")}
                                    text="Reach out to our CEO"
                                    styles={{ border: 'none', background: 'none', color: "#ffffd9", marginLeft: '-7px' }}
                                />
                                to join our collaborations or raise ideas on collaborative and constructive actions your organisation would like to participate in developing with us.</p>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <div style={{ display: 'flex', maxWidth: "50%", backgroundColor: 'transperent', padding: "20px", wordBreak: 'break-word' }} className='settimewidth'>
                    <Grid className='ps-3' item xs={4} md={4} style={{ maxWidth: "33.33%" }} >
                        <img src={commited} alt="img" width={150} style={{ height: "100px", margin: "0 auto", marginBottom: "10px" }} className='img-fuild' />
                        <p>
                            We are a proud member of the SME Climate Hub, a global initiative that empowers small to medium sized companies to take climate action and build more resilient businesses. Through the SME Climate Hub, we commit to lowering our impact on the environment through authentic action, halving our emissions by 2030. In making the commitment, we have joined the United Nations Race to Zero campaign.
                        </p>
                    </Grid>

                    <Grid className='ps-3' item xs={4} md={4} style={{ maxWidth: "33.33%", borderLeft: '2px solid white', borderRight: '2px solid white' }}>
                        <img src={Pledge} alt="img" width={100} style={{ height: "100px", margin: "0 auto", marginBottom: "10px" }} className='img-fuild' />
                        <p>
                            We have made a ‘Pledge to Net Zero’ and are committed to reducing our GHG emissions. Pledge to Net Zero’ is the environmental industry’s global commitment, requiring science-based targets from its signatories to tackle greenhouse gas emissions within their organisations.
                        </p>
                    </Grid>

                    <Grid className='ps-3' item xs={4} md={4} style={{ maxWidth: "33.33%" }} >
                        <img src={greenview} className='tabImgWhite img-fuild' alt="img" width={200} style={{ height: "100px", margin: "0 auto", marginBottom: "10px" }} />
                        <p>
                            We partnered with Greenview and using their dataset to measure the Hotel carbon Footprint generated from staying in Hotels across the world. Their global benchmarking index includes over 27,000 hotels worldwide – the Cornell Hotel Sustainability Benchmarking (CHSB) index 2024.
                        </p>
                    </Grid>

                </div>

            </div> */}
    </div>
  );
};

export default Goal;
