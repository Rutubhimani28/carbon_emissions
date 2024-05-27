import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Grid, Typography } from '@mui/material'
import { FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import banner from '../../assets/images/AboutBg.jpeg'
import ceo from '../../assets/images/CEO.png'
import what from '../../assets/images/What.png'
import net from '../../assets/images/net.png'

const About = () => {
    return (
        <div>
            {/* banner */}
            <div>
                <img src={banner} alt="img" width={"100%"} />
            </div>
            <div className='text-center main py-4'>
                <p className='pt-2 pb-4 fontFamily mx-4' style={{ fontSize: "18px" }} >In today’s world, industries are not just seeking solutions; they are searching for sustainable partners who share their values. We believe in driving innovation for a greater purpose. Our journey began with a commitment to<strong> introduce sustainable practices </strong> within the Chief Marketing Officer (CMO) vertical and their stakeholders, aiming to create a positive impact.</p>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} >
                    <Box className="text-center">
                        <Typography variant='h6' className=' fs-1 pt-2 pb-4 fontFamily fw-bold green' >What we do</Typography>
                        <p className=' fs-5'>We offer <span style={{ color: "#4edceb" }}> ESG Advisory Services</span>, bringing together the CMO vertical and their stakeholders on our integrated platform. Our aim is to foster collaboration and devise innovative methodologies for measuring both direct and indirect greenhouse gas (GHG) emissions.</p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }}>
                    <Box >
                        <img src={what} alt="img" width={"90%"} style={{ borderRadius: "10px" }} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6}>
                    <Box >
                        <img src={net} alt="img" width={"90%"} style={{ borderRadius: "10px" }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box className="text-center">
                        <Typography variant='h6' className=' fs-1 pt-2 pb-4 fontFamily fw-bold green' >Net-Zero Framework</Typography>
                        <p className=' fs-5'>We encourage organizations to <span style={{ color: "#4edceb" }}> assess the emissions </span> resulting from their various marketing activities and collaborate with us <strong> to minimize their carbon footprint by leveraging our net-zero framework.</strong></p>
                    </Box>
                </Grid>
            </Grid>
            <div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 main d-flex justify-content-center align-items-center ' >
                    <Grid item xs={12} md={9} sx={{ order: { xs: "2", md: "1" } }}>
                        <Box className="text-center main">
                            <div className='d-flex flex-column justify-content-between align-items-center'>
                                <Typography variant='h6' className=' fs-1 fontFamily fw-bold green' >Meet the Founder</Typography>
                                <Typography className=' fs-1 pb-4 fontFamily fw-bold green ' style={{ marginTop: "-25px", display: { md: 'none' } }} ><RemoveIcon style={{ fontSize: "50px" }} /><FiberManualRecordIcon style={{ fontSize: "20px" }} /><RemoveIcon style={{ fontSize: "50px" }} /></Typography>

                            </div>
                            <p className=' fs-5'>A seasoned Marketing and Communications leader with over 30 years of experience, this INSEAD graduate boasts a rich global marketing background. His career has taken him across various markets, including India, APAC, China, the Middle East & Africa, and Eastern Europe, enhancing his cultural adaptability and understanding.</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} className='d-flex justify-content-center align-items-center flex-column' sx={{ order: { md: '1' } }}>
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
                </Grid>
            </div>
        </div>
    )
}

export default About
