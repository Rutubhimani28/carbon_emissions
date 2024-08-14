// // src/pages/Team.js
// import React from 'react';
// import { Container, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

// const teamMembers = [
//     {
//         name: 'John Doe',
//         title: 'CEO',
//         description: 'John leads the team with over 20 years of experience in the tech industry.',
//         image: 'https://via.placeholder.com/150',
//     },
//     {
//         name: 'Jane Smith',
//         title: 'CTO',
//         description: 'Jane is the tech wizard who oversees all technical aspects of the company.',
//         image: 'https://via.placeholder.com/150',
//     },
//     {
//         name: 'Alice Johnson',
//         title: 'Lead Developer',
//         description: 'Alice is a skilled developer with a passion for creating innovative solutions.',
//         image: 'https://via.placeholder.com/150',
//     },
//     {
//         name: 'Bob Brown',
//         title: 'Product Manager',
//         description: 'Bob ensures our products meet customer needs and exceed expectations.',
//         image: 'https://via.placeholder.com/150',
//     },
// ];

// const Team = () => {
//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Typography variant="h4" align="center" gutterBottom>
//                 Meet Our Team
//             </Typography>
//             <Grid container spacing={4}>
//                 {teamMembers.map((member, index) => (
//                     <Grid item key={index} xs={12} sm={6} md={3}>
//                         <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                             <CardMedia
//                                 component="img"
//                                 sx={{
//                                     height: 150,
//                                     padding: '10px',       // Space around the image
//                                     backgroundColor: '#f0f0f0', // Background color to mimic a frame
//                                     borderRadius: '8px',   // Rounded corners for the frame
//                                     border: '1px solid #ddd', // Border to enhance the frame effect
//                                 }}
//                                 image={member.image}
//                                 alt={`${member.name}'s photo`}
//                             />
//                             <CardContent sx={{ flexGrow: 1 }}>
//                                 <Typography variant="h6" gutterBottom>
//                                     {member.name}
//                                 </Typography>
//                                 <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//                                     {member.title}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {member.description}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };

// export default Team;


import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const TeamPage = () => {
    const teamMembers = [
        {
            name: 'John Doe',
            img: 'https://via.placeholder.com/300x300',
            description: 'Chief Executive Officer (CEO) with a passion for innovation and leadership.',
            linkedin: 'https://www.linkedin.com/in/johndoe',
            twitter: 'https://twitter.com/johndoe',
        },
        {
            name: 'Jane Smith',
            img: 'https://via.placeholder.com/300x300',
            description: 'Chief Marketing Officer (CMO) with expertise in brand strategy',
            linkedin: 'https://www.linkedin.com/in/janesmith',
            twitter: 'https://twitter.com/janesmith',
        },
    ];

    return (
        <Container sx={{ padding: '50px 0' }}>
            <Typography variant='h6' className="fs-1 text-center text-dark fontFamily m=0">Meet Our Team</Typography>
            <Grid container spacing={4} justifyContent="center" className='my-2'>
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card
                            sx={{
                                maxWidth: 345,
                                borderRadius: '10px',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{ height: 300 }}
                                image={member.img}
                                title={member.name}
                            />
                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    backgroundColor: '#fff',
                                    padding: '15px',
                                }}
                            >
                                <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} gutterBottom>
                                    {member.name}
                                </Typography>
                                <Typography sx={{ fontSize: '1rem', color: '#777', marginTop: '10px', marginBottom: '10px', minHeight: "50px" }}>
                                    {member.description}
                                </Typography>
                                {/* <div className='my-1'>
                                    <IconButton
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            borderRadius: '5px',
                                            // '&:hover': {
                                            //     backgroundColor: 'black',
                                            //     opacity: 0.8,
                                            // },
                                            marginRight: '10px',
                                            fontSize: "20px",
                                            padding: "2px 10px 4px"
                                        }}
                                    >
                                        <Link to={member.twitter}><FaXTwitter style={{ color: 'white' }} /></Link>
                                    </IconButton>
                                    <IconButton
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            backgroundColor: '#0077b5',
                                            color: 'white',
                                            borderRadius: '5px',
                                            // '&:hover': {
                                            //     color: '#0077b5',
                                            // },
                                            fontSize: "20px",
                                            padding: "2px 10px 4px"
                                        }}
                                    >
                                        <Link to={member.linkedin}><FaLinkedin style={{ color: 'white' }} /></Link>
                                    </IconButton>
                                </div> */}
                                <div className='d-flex justify-content-center py-2 pb-4'>
                                    <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#000000", color: "#fff", borderRadius: "5px" }}><Link to="https://x.com/shafeeqm"><FaXTwitter style={{ color: 'white' }} /></Link></Box>
                                    <Box style={{ padding: "2px 10px 4px 10px", fontSize: "20px", marginRight: "10px", backgroundColor: "#0077b5", color: "#fff", borderRadius: "5px" }}><Link to="https://www.linkedin.com/in/shafeeqm/"><FaLinkedin style={{ color: 'white' }} /></Link></Box>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TeamPage;
