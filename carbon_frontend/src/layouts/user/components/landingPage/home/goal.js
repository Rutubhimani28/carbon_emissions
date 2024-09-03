import { useTheme } from '@emotion/react'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import "../../../assets/css/style.css"
import TrustOne from '../../../assets/images/Aster CMI Logo.png'
import commited from '../../../assets/images/CommitedLogo.png'
import TrustTwo from '../../../assets/images/GoFig.png'
import greenview from '../../../assets/images/GreenView.png'
import mission from '../../../assets/images/mission.png'
import Pledge from '../../../assets/images/PledgeTonetZERO.png'
import vision from '../../../assets/images/visionary.png'

const Goal = () => {
    const theme = useTheme();

    return (
        <div>
            <div className='pb-5'>
                <Typography variant='h6' className='text-center fs-3 green pt-5 pb-3 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow text-white' >Our Mission & Vision</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='my-4'>
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
            </div>
            <Grid container justifyContent="center" className='wow animate__animated animate__fadeInRight animate__slow pb-3 bg-light mx-auto' color="#054723" style={{ marginBottom: '50px' }}>
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
            </Grid>

            {/* collabrate */}
            <div className="container-fuild collabrate d-flex justify-content-center main" style={{overflowX:"hidden"}}>
                <div className="row d-flex justify-content-center mb-2">
                    <div className="col-xl-5 col-md-12 ps-xl-2 mt-3">
                        <h1 className='fontFamily text-light fw-bold mt-5'>Collaborating for Sustainable Development</h1>
                        <p className='text-light fs-5 mt-4'>Through our cross-sector partnerships and collaborative efforts, we demonstrate our commitment to ensuring your organization is never alone in addressing systemic sustainability challenges, enabling a positive climate impact.
                        </p>
                        <p className='text-light fs-5 mt-4'>
                            Sirāt invites a wide range of stakeholders to partner with us for sustainable development, including companies, advisors, partners, as well as external collaborations and alliances to meet the climate goals.
                        </p>
                    </div>
                    <div className="col-xl-7 col-md-12">
                        <div className='row d-flex justify-content-center mt-2'>
                            <div className='col-md-4'>
                                <img src={commited} alt="img" width={150} style={{ height: "100px", margin:useMediaQuery(theme.breakpoints.up("md")) ?  "0 auto" : "20px auto", marginBottom: "10px" }} className='img-fuild pt-xl-2 pt-sm-5' />
                                <p style={{marginBottom:'15px'}}>
                                    We are a proud member of the SME Climate Hub, a global initiative that empowers small to medium sized companies to take climate action and build more resilient businesses. Through the SME Climate Hub, we commit to lowering our impact on the environment through authentic action, halving our emissions by 2030. In making the commitment, we have joined the United Nations Race to Zero campaign.
                                </p>
                            </div>
                            <div className='col-md-4' style={{ borderLeft: useMediaQuery(theme.breakpoints.up('md')) ? "2px solid white" : 0, borderRight: useMediaQuery(theme.breakpoints.up('md')) ? "2px solid white" : 0 }} >
                                <img src={Pledge} alt="img" width={100} style={{ height: "100px", margin:useMediaQuery(theme.breakpoints.up("md")) ?  "0 auto" : "20px auto", marginBottom: "10px" }} className='img-fuild pt-xl-2 pt-sm-5' />
                                <p className='p-xl-2'style={{marginBottom:'15px'}}>
                                    We have made a ‘Pledge to Net Zero’ and are committed to reducing our GHG emissions. Pledge to Net Zero’ is the environmental industry’s global commitment, requiring science-based targets from its signatories to tackle greenhouse gas emissions within their organisations.
                                </p>
                            </div>
                            <div className='col-md-4'>
                                <img src={greenview} className='tabImgWhite img-fuild pt-xl-2 pt-sm-5' alt="img" width={200} style={{ height: "100px", margin: useMediaQuery(theme.breakpoints.up("md")) ?  "0 auto" : "20px auto", marginBottom: "10px" }} />
                                <p className='ps-xl-2'style={{marginBottom:'15px'}}>
                                    We partnered with Greenview and using their dataset to measure the Hotel carbon Footprint generated from staying in Hotels across the world. Their global benchmarking index includes over 27,000 hotels worldwide – the Cornell Hotel Sustainability Benchmarking (CHSB) index 2024.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
    )
}

export default Goal