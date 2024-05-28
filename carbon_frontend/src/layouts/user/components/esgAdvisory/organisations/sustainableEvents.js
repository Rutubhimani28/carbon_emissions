import { Box, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import banner from '../../../assets/images/s2.png';


const SustainableEvents = () => {
    const navigate = useNavigate();

    return (
        <div>
            <img src={banner} alt="banner" />
            <div className='main'>
                <Typography variant='h6' className='text-center fs-2 green pt-5 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Sustainable Events</Typography>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5 d-flex justify-content-center align-items-center ' >
                    <Grid item xs={12} md={6} className='wow animate__animated animate__fadeInLeft animate__slow'>
                        <Box className="ps-3">
                            <p>From expansive trade shows and vibrant festivals to intimate business conferences, these events play a pivotal role in our society, fostering social, economic, and technological benefits. However, the grandeur often comes with a carbon footprint. Our approach goes beyond identifying suitable event venues; we negotiate with hotels and connect with qualified service providers and agencies. Throughout the event lifecycle, we steadfastly adhere to the net-zero framework, intricately weaving sustainability practices into every phase. </p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} className='wow animate__animated animate__fadeInRight animate__slow' >
                        <Box className="ps-3">
                            <p >Collaborate with us to pinpoint the right partners and conduct a comprehensive analysis of greenhouse gas (GHG) emissions and waste associated with your upcoming event. Through this collaborative effort, we’ll unveil innovative and sustainable solutions, optimizing and significantly reducing environmental impacts at every stage—from pre-event planning to execution and post-event assessments. Let’s make your event not only memorable but also a beacon of environmental responsibility.</p>
                        </Box>
                    </Grid>
                </Grid>
                <p className='text-center wow animate__animated animate__fadeInUp animate__slow'>Kindly note that the information on the below two tabs is relevant to individuals in the Chief Marketing Officer (CMO) or Sustainability verticals or the vertical/ individuals who are looking to conduct an event</p>
                <div className='d-flex justify-content-around py-5 mt-4 wow animate__animated animate__fadeInUp animate__slow'>

                    <Box onClick={() => navigate("/event-venue")}>
                        <p
                            className='text-center text-white pt-3 fontFamily fw-bold pb-2 rounded-3'
                            style={{ cursor: "pointer", backgroundColor: "#4ABD43", width: "500px" }}
                        >
                            Event Venue
                            <FaLocationDot />
                        </p>
                    </Box>

                    <Box onClick={() => navigate('/event-execution-agency')}>
                        <p
                            className="text-center  text-white pt-3 fontFamily fw-bold pb-2 rounded-3"
                            style={{ cursor: "pointer", backgroundColor: '#4ABD43', width: '500px' }}
                        >
                            Event Execution Agency <TbWorld />
                        </p>
                    </Box>
                </div>

            </div>
            <div className='text-end main py-4'>
                <button style={{ border: "1px solid #4abd43", borderRadius: "30px", backgroundColor: "transparent", padding: "8px 20px" }} onClick={() => { navigate(-1); }}>Go Back </button>
            </div>
        </div>
    )
}

export default SustainableEvents
