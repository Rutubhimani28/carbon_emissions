import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Room1 from '../../assets/images/room1.jpeg';
import Room2 from '../../assets/images/room2.jpeg';
import Room3 from '../../assets/images/room3.jpg';
import Room4 from '../../assets/images/room4.png';
import Room5 from '../../assets/images/room5.jpg';
import Room6 from '../../assets/images/room6.jpg';

const Index = () => {
  const theme = useTheme();
  return (
    <div>
      <div className="setNewsRoomPadding pt-5 pb-3 d-flex flex-column align-items-center">
        {/* <Typography variant='h6' className='text-center fs-1 pt-4 fontFamily fw-bold pb-5 wow animate__animated animate__fadeInUp animate__slow' >News Room & Blogs</Typography> */}

        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={6}>
                        <Link className='text-decoration-none' to='/news-room/blog1'>
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
                                <Link className='text-decoration-none' to="/news-room/blog2">
                                    <div className='roombg2'>
                                        <div className='text-white d-flex justify-content-end flex-column p-3 fontFamily' style={{ height: "250px" }}>
                                            <div className='fs-3 fw-bold lh-lg'>Empowering organizations: Meeting net-zero through the reduction of single-use plastics</div>
                                            <div className='fs-5'>February 19, 2024</div>
                                        </div>
                                    </div>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link className='text-decoration-none' to="/news-room/blog3">
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
                </Grid> */}
        <Card
          sx={{
            display: 'flex',
            marginBottom: 4,
            flexWrap: 'wrap',
            fontSize: useMediaQuery(theme.breakpoints.up('md')) ? '20px' : '10px',
            width: useMediaQuery(theme.breakpoints.up('sm')) ? '80%' : '340px',
            border: 'solid 1px #1F9E6D',
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} md={8} className={'order-2'}>
              <Box
                sx={{
                  display: useMediaQuery(theme.breakpoints.up('md')) ? 'block' : 'flex',
                  flexDirection: useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column',
                  height: '100%',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                  <Link className="text-decoration-none" to="/news-room/blog6">
                    <Typography component="div" variant="h5">
                      Sirāt Files Patent for Innovative NetZero Platform
                      </Typography>
                  </Link>
                  <Typography variant="subtitle1" color="text.secondary" component="div" className="mt-1">
                    January  03, 2025
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <CardMedia
                component="img"
                image={Room6}
                className="img-thumbnail"
                alt="Blog6"
                sx={{ height: '100%', objectFit: 'contain' }}
              />
            </Grid>
          </Grid>
        </Card>

        <Card
          sx={{
            display: 'flex',
            marginBottom: 4,
            flexWrap: 'wrap',
            width: useMediaQuery(theme.breakpoints.up('sm')) ? '80%' : '340px',
            border: 'solid 1px #1F9E6D',
          }}
        >
          <Grid container spacing={0}>
            <Grid item md={4} xs={12} className={useMediaQuery(theme.breakpoints.up('md')) ? 'order-1' : ''}>
              <CardMedia
                component="img"
                image={Room5}
                className="img-thumbnail"
                alt="Blog5"
                sx={{ height: '100%', objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs={12} md={8} className={useMediaQuery(theme.breakpoints.up('md')) ? '' : 'order-1'}>
              <Box
                sx={{
                  display: useMediaQuery(theme.breakpoints.up('md')) ? 'block' : 'flex',
                  flexDirection: useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column',
                  height: '100%',
                  flexWrap: 'wrap',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', wordBreak: 'break-word' }}>
                  <Link className="text-decoration-none" to="/news-room/blog5">
                    <Typography component="div" variant="h5">
                      Leading the NetZero charge: How sustainable marketing can transform the future of business
                    </Typography>
                  </Link>
                  <Typography variant="subtitle1" color="text.secondary" component="div" className="mt-1">
                    November 8, 2024
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Card
          sx={{
            display: 'flex',
            marginBottom: 4,
            flexWrap: 'wrap',
            fontSize: useMediaQuery(theme.breakpoints.up('md')) ? '20px' : '10px',
            width: useMediaQuery(theme.breakpoints.up('sm')) ? '80%' : '340px',
            border: 'solid 1px #1F9E6D',
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} md={8} className={'order-2'}>
              <Box
                sx={{
                  display: useMediaQuery(theme.breakpoints.up('md')) ? 'block' : 'flex',
                  flexDirection: useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column',
                  height: '100%',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                  <Link className="text-decoration-none" to="/news-room/blog4">
                    <Typography component="div" variant="h5">
                      Mohammed Shafeeq ILPSE C10, Pioneering Sustainable Entrepreneurship in Marketing
                    </Typography>
                  </Link>
                  <Typography variant="subtitle1" color="text.secondary" component="div" className="mt-1">
                    July 02, 2024
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <CardMedia
                component="img"
                image={Room4}
                className="img-thumbnail"
                alt="Blog2"
                sx={{ height: '100%', objectFit: 'contain' }}
              />
            </Grid>
          </Grid>
        </Card>
        <Card
          sx={{
            display: 'flex',
            marginBottom: 4,
            flexWrap: 'wrap',
            width: useMediaQuery(theme.breakpoints.up('sm')) ? '80%' : '340px',
            border: 'solid 1px #1F9E6D',
          }}
        >
          <Grid container spacing={0}>
            <Grid item md={4} xs={12} className={useMediaQuery(theme.breakpoints.up('md')) ? 'order-1' : ''}>
              <CardMedia
                component="img"
                image={Room1}
                className="img-thumbnail"
                alt="Blog1"
                sx={{ height: '100%', objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs={12} md={8} className={useMediaQuery(theme.breakpoints.up('md')) ? '' : 'order-1'}>
              <Box
                sx={{
                  display: useMediaQuery(theme.breakpoints.up('md')) ? 'block' : 'flex',
                  flexDirection: useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column',
                  height: '100%',
                  flexWrap: 'wrap',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', wordBreak: 'break-word' }}>
                  <Link className="text-decoration-none" to="/news-room/blog1">
                    <Typography component="div" variant="h5">
                      Going Eco-Friendly with Go Sustainable: Aster CMI Hospital, Bangalore, hosts 2nd IAP-PEM
                      Conference to make a green footprint
                    </Typography>
                  </Link>
                  <Typography variant="subtitle1" color="text.secondary" component="div" className="mt-1">
                    March 18, 2024
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Card
          sx={{
            display: 'flex',
            marginBottom: 4,
            flexWrap: 'wrap',
            width: useMediaQuery(theme.breakpoints.up('sm')) ? '80%' : '340px',
            border: 'solid 1px #1F9E6D',
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} md={8} className={'order-2'}>
              <Box
                sx={{
                  display: useMediaQuery(theme.breakpoints.up('md')) ? 'block' : 'flex',
                  flexDirection: useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column',
                  height: '100%',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                  <Link className="text-decoration-none" to="/news-room/blog2">
                    <Typography component="div" variant="h5">
                      Empowering organizations: Meeting net-zero through the reduction of single-use plastics
                    </Typography>
                  </Link>
                  <Typography variant="subtitle1" color="text.secondary" component="div" className="mt-1">
                    February 19, 2024
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <CardMedia
                component="img"
                image={Room2}
                className="img-thumbnail"
                alt="Blog2"
                sx={{ height: '100%', objectFit: 'cover' }}
              />
            </Grid>
          </Grid>
        </Card>
        <Card
          sx={{
            display: 'flex',
            marginBottom: 4,
            flexWrap: 'wrap',
            width: useMediaQuery(theme.breakpoints.up('sm')) ? '80%' : '340px',
            border: 'solid 1px #1F9E6D',
          }}
        >
          <Grid container spacing={0}>
            <Grid item md={4} xs={12} className={useMediaQuery(theme.breakpoints.up('md')) ? 'order-1' : ''}>
              <CardMedia
                component="img"
                image={Room3}
                className="img-thumbnail"
                alt="Blog3"
                sx={{ height: '100%', objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs={12} md={8} className={useMediaQuery(theme.breakpoints.up('md')) ? '' : 'order-1'}>
              <Box
                sx={{
                  display: useMediaQuery(theme.breakpoints.up('md')) ? 'block' : 'flex',
                  flexDirection: useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column',
                  height: '100%',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                  <Link className="text-decoration-none" to="/news-room/blog3">
                    <Typography component="div" variant="h5">
                      Go Sustainable Unveils Net-Zero Framework To Reduce Carbon Footprint In Marketing Operations- Zee
                      News
                    </Typography>
                  </Link>
                  <Typography variant="subtitle1" color="text.secondary" component="div" className="mt-1">
                    February 5, 2024
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
};

export default Index;
