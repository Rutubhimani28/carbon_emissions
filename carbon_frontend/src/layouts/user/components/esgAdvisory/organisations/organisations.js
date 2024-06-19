import { Box, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import service1 from '../../../assets/images/s1.jpeg'
import service2 from '../../../assets/images/s2.png'

const Organisations = () => {
    return (
        <div className='py-5 main'>
            <div>
                <Typography variant='h6' className='text-center fs-2 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow' >Organizations</Typography>
                <p className='  py-3 pb-3 fontFamily wow animate__animated animate__fadeInUp animate__slow'>In an era where corporate responsibility is increasingly crucial, organizations must align their strategies with sustainable principles to create a lasting impact. Implementing a structured ESG (Environmental, Social, and Governance) framework is key to setting your organisation apart from the competition, resonating with conscientious consumers and businesses prioritizing the triple bottom line: <strong>people, planet,</strong> and <strong>profit.</strong></p>
                <p className='  py-3 pb-3 fontFamily wow animate__animated animate__fadeInUp animate__slow'>Embracing sustainability enhances your brand reputation and ensures a positive legacy of responsible practices for a greener world.</p>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className="organise p-3 " style={{ borderRadius: "20px" }}>
                        <Link to="/netZero-consulting/organisations/esg-consulting/">
                            <img src={service1} alt="img" width={"100%"} />
                        </Link>
                        <Typography variant='h6' className='text-center py-2 pt-4 fontFamily'>ESG consulting</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { xs: "2", md: "1" } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className="ps-3">
                        <p className=' fs-5'>Through our ESG consulting, the Chief Marketing Officer (CMO) vertical transcends routine aspects of ESG measures. Instead of merely drumbeating, you can play a pivotal role in proactively implementing sustainable practices across every facet of your activities. </p>
                    </Box>
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='py-5  d-flex justify-content-center align-items-center ' >
                <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }} className='wow animate__animated animate__fadeInLeft animate__slow'>
                    <Box className="ps-3">
                        <p className=' fs-5'>Sustainable events are crucial in today’s conscientious landscape, addressing environmental concerns, enhancing organizational reputations, and fostering community engagement. These events align with growing societal values, attracting environmentally-conscious attendees and stakeholders while adhering to minimizing the carbon footprint.</p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ order: { md: '1' } }} className='wow animate__animated animate__fadeInRight animate__slow'>
                    <Box className="organise p-3 " style={{ borderRadius: "20px" }}>
                        <Link to='/netZero-consulting/organisations/sustainable-events/'>
                            <img src={service2} alt="img" width={"100%"} />
                        </Link>
                        <Typography variant='h6' className='text-center py-2 pt-4 fontFamily'>ESG consulting</Typography>
                    </Box>
                </Grid>
            </Grid>
            <p className='wow animate__animated animate__fadeInUp animate__slow'>By adhering to the principles of a net-zero framework, organizations’ CMO verticals can chart a pathway towards a remarkable 50% reduction in their both direct and indirect greenhouse gas (GHG) emissions by the end of 2030. </p>
        </div>
    )
}

export default Organisations
