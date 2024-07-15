import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import banner from '../../../assets/images/home_banner.jpg';
import posterImg from '../../../assets/images/Still Image for CEO Video.png';
import bannerVideo from '../../../assets/images/Home2.mp4'
import ceoVideo from '../../../assets/images/CEO Video-Updates.mp4';
import tailored1 from '../../../assets/images/tailored1.png';
import tailored2 from '../../../assets/images/tailored2.png';
import tailored3 from '../../../assets/images/tailored3.png';
import Logo from '../../../assets/images/logo5.gif';
import { apipost } from '../../../../../service/api';

const Index = () => {

    const [openCredit, setOpenCredit] = useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const videoRef = useRef();

    const initialValues = {
        cName: "",
        name: "",
        email: "",
        message: "",
        mobile: ""
    };

    const validationSchema = yup.object({
        cName: yup.string().required("Company Name is required"),
        name: yup.string().required("Name is required"),
        email: yup.string().email("Email is invalid").required("Email is required"),
        mobile: yup.number().required("Mobile Number is required"),
        message: yup.string().required("Message is required"),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const payload = {
                name: values.name,
                email: values.email,
                mobile: values.mobile,
                companyName: values.cName,
                message: `Company Name: ${values.cName} \n Contact Name: ${values.name} \n Contact EmailId: ${values.email} \n Contact Number: ${values.mobile} \n\n${values.message}`
            };

            try {
                const result = await apipost('api/buyCredits/add', payload);

                if (result && (result.status === 200 || result.status === 201)) {
                    formik.resetForm();
                    handleClose();
                }
            } catch (error) {
                console.log("Error sending Buy Credits mail:", error);
            }
            setLoading(false);
        },
    });

    const { values, resetForm, errors, handleChange, handleSubmit } = formik;

    const handleClose = () => {
        setOpenCredit(false);
    };

    useEffect(() => {
        videoRef.current.playbackRate = 0.5;
    }, [])

    return (
        <div>
            {/* <img src={banner} alt='img' width={"100%"} />  */}

            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='main py-5 my-2 '>
                <Grid className='fs-5' item sm={12} md={1} style={{ opacity: "0" }}>hb</Grid>
                <Grid className='fs-5 d-flex justify-content-center wow animate__animated animate__fadeInUp animate__slow' item sm={10} md={10}>
                    <video
                        width="100%"
                        height=""
                        autoPlay
                        loop
                        controls
                        preload
                        ref={videoRef}
                    >
                        <source src={bannerVideo} width={"100%"} autoPlay />
                        <track kind="captions" src="captions.vtt" label="English" />
                        Sorry, your browser doesn't support embedded videos, but don't worry, you can
                        <a href="https://gosustainable.ai/wp-content/uploads/2024/01/Sustainable-Events-Video.mp4">download it</a>
                        and watch it with your favorite video player!
                    </video>
                </Grid>

                <Grid className='fs-5' item sm={12} md={1} style={{ opacity: "0" }}>njk</Grid>

                <Grid className='fs-5 wow animate__animated animate__fadeInLeft animate__slow ' item sm={12} md={6} style={{ textAlign: 'justify' }}>At <strong>Sirat</strong>, we understand the needs and aspirations of organizations' Chief Marketing Officer (CMO) vertical. We recognize the necessity of aligning your activities with a net-zero framework and creating an action plan to achieve your short-, medium-, and long-term goals to reduce the carbon footprint generated from your marketing operations.</Grid>

                <Grid className='fs-5 wow animate__animated animate__fadeInRight animate__slow ' item sm={12} md={6}>We aim to seamlessly integrate Environmental, Social and Governance (ESG) considerations into your organization's CMO strategies by deeply understanding your needs. Our <Link to="/netzero-consulting" style={{ color: "#ffffd9", textDecoration: 'none' }}>ESG advisory services</Link> and user-friendly <Link to="/netzero-platform" style={{ color: "#ffffd9", textDecoration: 'none' }}> NetZero tool</Link> are designed to measure the carbon footprint generated by your marketing operations, activity by activity.</Grid>
            </Grid> */}

            <div style={{ maxHeight: "700px", overflow: 'hidden', position: "relative" }}>
                <video
                    width="100%"
                    height="100%"
                    autoPlay
                    loop
                    preload
                    ref={videoRef}
                    muted
                // controls
                >
                    <source src={bannerVideo} width={"100%"} autoPlay />
                    <track kind="captions" src="captions.vtt" label="English" />
                    Sorry, your browser doesn't support embedded videos, but don't worry, you can
                    <a href="https://gosustainable.ai/wp-content/uploads/2024/01/Sustainable-Events-Video.mp4">download it</a>
                    and watch it with your favorite video player!
                </video>
                <div style={{ position: 'absolute', right: '40px', bottom: '25px', color: "white", fontSize: '30px', fontWeight: '800' }}>
                    <span>Enabling the <u>path</u> to NetZero</span>
                </div>
            </div>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='main py-5 my-2'>
                <Grid className='fs-5 wow animate__animated animate__fadeInLeft animate__slow ' item sm={12} md={6} style={{ textAlign: 'justify' }}>At <strong>Sirāt</strong>, we understand the needs and aspirations of organizations' Chief Marketing Officer (CMO) vertical. We recognize the necessity of aligning your activities with a NetZero framework. We create an action plan to achieve your short-, medium-, and long-term goals to meet your climate goals and enable the <u>path</u> to NetZero.</Grid>

                <Grid className='fs-5 wow animate__animated animate__fadeInRight animate__slow ' item sm={12} md={6} style={{ textAlign: 'justify' }}>We aim to seamlessly integrate Environmental, Social and Governance (ESG) considerations into your organization's CMO strategies by deeply understanding your needs. Our <Link to="/netzero-consulting" style={{ color: "#ffffd9", textDecoration: 'none' }}>NetZero Consulting</Link> and user-friendly <Link to="/netzero-platform" style={{ color: "#ffffd9", textDecoration: 'none' }}> NetZero Platform</Link> are designed to measure the CO<sub>2</sub> footprint generated from your marketing operations.</Grid>
                <Grid className='fs-5' item sm={12} md={2} style={{ opacity: "0" }}>hb</Grid>
                {/* <img src={banner} alt='img' width={"100%"} />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='main py-5 my-2 '>
                <Grid className='fs-5 wow animate__animated animate__fadeInLeft animate__slow ' item sm={12} md={6}>At <strong>Go Sustainable</strong>, we understand the needs and aspirations of organizations’ Chief Marketing Officer (CMO) vertical and its stakeholders. And we recognize the necessity of aligning your activities with a net-zero framework and creating an action plan, to achieve your short-, mid-, and long-term goals to reduce the greenhouse gas (GHG) emissions.</Grid>
                <Grid className='fs-5 wow animate__animated animate__fadeInRight animate__slow ' item sm={12} md={6}>We strive to seamlessly integrate Environmental, Social, and Governance (ESG) considerations into your organization’s strategy through our advisory services. By aligning ESG principles with business objectives, we will support to enhance your brand credibility and contribute to long-term value creation, reinforcing your organization’s position as a socially responsible leader.</Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='main py-5 my-2'>
                <Grid className='fs-5' item xs={12} sm={2} md={2} /> */}
                <Grid className='fs-5 d-flex justify-content-center wow animate__animated animate__fadeInLeft animate__slow' item sm={8} md={8}>
                    <div className='video-responsive' style={{ position: 'relative', paddingTop: "42px" }}>
                        <video
                            controls
                            // src="https://gosustainable.ai/wp-content/uploads/2024/01/Shafeeq-Video.mp4"
                            src={ceoVideo}
                            poster={posterImg}
                            width="100%"
                            height="100%"
                            loop
                        >
                            <track kind="captions" src="captions.vtt" label="English" />
                            Sorry, your browser doesn't support embedded videos, but don't worry, you can
                            <a href="https://gosustainable.ai/wp-content/uploads/2024/01/Shafeeq-Video.mp4">download it</a>
                            and watch it with your favorite video player!
                        </video>
                    </div>
                </Grid>
                <Grid className='fs-5' item xs={12} sm={2} md={2} />
            </Grid>

            <Grid container justifyContent="center" className='wow animate__animated animate__fadeInRight animate__slow pb-3 bg-light mx-auto template-inner-theme rounded-3' style={{ maxWidth: '59%', marginBottom: '50px' }}>
                <Grid item sm={12} md={12} className="d-flex justify-content-center">
                    <Typography className='fontFamily fs-3 fw-bold text-center wow animate__animated animate__fadeInLeft animate__slow pt-5' item sm={12} md={12}>Tailored Solutions</Typography>
                </Grid>
                <Grid item sm={12} md={12} className="d-flex justify-content-between">
                    <Box className="d-flex justify-content-left flex-column align-items-left p-4 rounded-3 mx-0">
                        <img src={tailored1} alt="img" width={80} className='tabImgWhite' />
                        <Typography variant='h6' className='fs-5 pt-3 pb-4 fontFamily fw-bold'>Corporate Events</Typography>
                        <Typography className='fs-6' align="left">Position sustainability at the core of your event with tailored solutions for global reach, media coverage, and social media engagement</Typography>
                    </Box>
                    <Box className="d-flex justify-content-left flex-column align-items-left p-4 rounded-3 mx-0">
                        <img src={tailored2} alt="img" width={80} className='tabImgWhite' />
                        <Typography variant='h6' className='fs-5 pt-3 pb-4 fontFamily fw-bold'>Large Exhibitions</Typography>
                        <Typography className='fs-6' align="left">Develop a robust governance model and align exhibitors with a common environmental goal to deliver a positive social impact</Typography>
                    </Box>
                    <Box className="d-flex justify-content-left flex-column align-items-left p-4 rounded-3 mx-0">
                        <img src={tailored3} alt="img" width={80} className='tabImgWhite' />
                        <Typography variant='h6' className='fs-5 pt-3 pb-4 fontFamily fw-bold'>Digital Campaigns</Typography>
                        <Typography className='fs-6' align="left">Create eco-friendly digital campaigns, reduce your digital marketing carbon footprint by optimising your content and promote sustainability</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Box className="credit d-flex justify-content-center">
                <Grid container spacing={3}>
                    <Grid item xs={6} md={6} className='wow animate__animated animate__fadeInUp animate__slow my-auto'>
                        <Typography variant='h6' className='text-light fs-1 pt-2 pb-4 fontFamily fw-bold' style={{ paddingLeft: '100px' }}>Offset Your Carbon Footprint</Typography>
                        <Typography className='text-light fs-5' style={{ paddingLeft: '100px' }}>Compensate for emissions by funding projects that reduce or remove an equivalent amount of CO<sub>2</sub> from the atmosphere, helping to mitigate climate change and promote sustainable development.</Typography>
                        <Button style={{ marginLeft: '100px' }} className="custom-btn my-4" onClick={() => { setOpenCredit(true) }}>Buy Credits</Button>
                    </Grid>
                    <Grid item xs={12} md={6} />
                </Grid>
            </Box>

            {/* Buy Credits */}
            <Dialog
                open={openCredit}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: () => {
                        handleSubmit();
                        handleClose();
                    },
                }}
            >
                <DialogContent>
                    <DialogContentText>
                        <div className="d-flex justify-content-center">
                            <img src={Logo} width={'140vh'} alt="logo" style={{ marginBottom: "10px" }} />
                        </div>
                        <span className="d-block mb-1" style={{ fontWeight: 750, fontSize: '12px' }}>Do you want to buy credits?</span>
                        <span className="d-block mb-3" style={{ fontWeight: 750, fontSize: '12px' }}>Fill out the form below. We'll reply within 24-48 hrs.</span>
                    </DialogContentText>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                autoFocus
                                label="Company Name"
                                variant="outlined"
                                fullWidth
                                name="cName"
                                value={values.cName}
                                onChange={handleChange}
                                error={formik.touched.cName && Boolean(formik.errors.cName)}
                                helperText={formik.touched.cName && formik.errors.cName}
                                inputProps={{ style: { fontSize: '12px' } }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                autoFocus
                                label="Name"
                                variant="outlined"
                                fullWidth
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                inputProps={{ style: { fontSize: '12px' } }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                inputProps={{ style: { fontSize: '12px' } }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Mobile Number"
                                variant="outlined"
                                fullWidth
                                name="mobile"
                                type="number"
                                value={values.mobile}
                                onChange={handleChange}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                                inputProps={{ style: { fontSize: '12px' } }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={2}
                                fullWidth
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                                error={formik.touched.message && Boolean(formik.errors.message)}
                                helperText={formik.touched.message && formik.errors.message}
                                inputProps={{ style: { fontSize: '12px' } }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <LoadingButton type="submit" onClick={handleSubmit} variant='contained' disabled={!!isLoading} size="small" style={{ background: 'rgb(5, 71, 35)' }}>
                        {isLoading ? <CircularProgress size={27} /> : 'Submit'}
                    </LoadingButton>
                    <Button variant="contained" onClick={() => { resetForm(); handleClose(); }} size="small">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Index