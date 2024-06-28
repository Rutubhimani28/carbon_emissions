import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Container, FormLabel, Grid, TextField, Typography, CircularProgress, Autocomplete, FormControl } from '@mui/material';
import logo from '../../layouts/user/assets/images/logo4.gif';
import { addToolData, clearToolFormData } from '../../redux/slice/toolSlice';
// import HotelData from '../accomodation/data.json';

const Home = () => {

    const [isLoading, setIsLoading] = useState(false);
    // const [countriesData, setCountriesData] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const toolData = useSelector(state => state.toolDetails?.data);

    const initialValues = {
        name: "",
        email: "",
        activityName: "",
        country: "",
        budget: "",
    };

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email('Invalid Email').required("Business Email is required"),
        activityName: yup.string().required("Activity Name is required"),
        country: yup.string().required("Country is required"),
        budget: yup.number().required("Budget is required"),
    });

    const AddData = (values) => {
        setIsLoading(true);
        dispatch(addToolData(values));
        setIsLoading(false);
    };

    const handleFormClear = () => {
        dispatch(clearToolFormData());
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmited(true);
            AddData({ type: "toolForm", ...values })
        },
    });

    useEffect(() => {
        if (toolData?.length > 0 && ![null, undefined, -1].includes(toolData?.findIndex((item) => item?.type === "toolForm"))) {
            const formPrevData = toolData.find((item) => item.type === "toolForm");
            formik.setFieldValue("name", formPrevData?.name);
            formik.setFieldValue("activityName", formPrevData?.activityName);
            formik.setFieldValue("country", formPrevData?.country);
            formik.setFieldValue("budget", formPrevData?.budget);
            formik.setFieldValue("email", formPrevData?.email);
        }
    }, [toolData]);

    // useEffect(() => {
    //     const allCountriesData = HotelData?.map(item => ({
    //         label: `${item?.country}`,
    //         value: `${item?.country}`
    //     }));
    //     setCountriesData(allCountriesData);
    // }, []);


    const { values, errors, touched, isValid, dirty } = formik;

    return (
        <Container maxWidth="lg" className='text-white'>
            <Box textAlign="center" mt={4}>
                {/* <img src={logo} alt="Sirat Logo" style={{ width: '200px', height: 'auto', display: 'block', margin: '0 auto' }} /> */}
                <Typography variant="h2" mt={2} className='text'>
                    Welcome to Sirāt's NetZero Platform Tool
                </Typography>
                <Typography mt={3} className='fs-5'>
                    To obtain a more accurate CO2 footprint generated from your activity, please input your data in as many fields as possible.
                </Typography>
                <Typography className='fs-5'>
                    You can save the data and come back later before submitting.
                </Typography>
            </Box>
            <Box className="mt-2">
                <Grid container spacing={2} p={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }} className='d-flex flex-column justify-content-center align-items-center'>
                    <Grid item xs={12} sm={6} border={2} borderColor={'#e2e2e2'} columnSpacing={{ xs: 1, sm: 2, md: 3 }} borderRadius={'10px'}>
                        <Grid container spacing={2} py={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ paddingRight: "24px" }}>
                            <Grid item xs={12} sm={6}>
                                <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                    Name <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <TextField
                                    name="name"
                                    type="text"
                                    size="small"
                                    fullWidth
                                    className='textborder'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                    Business Email <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <TextField
                                    name="email"
                                    type="email"
                                    size="small"
                                    className='textborder'
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                    Activity Name <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <TextField
                                    name="activityName"
                                    type="text"
                                    size="small"
                                    className='textborder'
                                    fullWidth
                                    value={formik.values.activityName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.activityName && Boolean(formik.errors.activityName)}
                                    helperText={formik.touched.activityName && formik.errors.activityName}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                    Country <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <TextField
                                    name="country"
                                    type="text"
                                    size="small"
                                    fullWidth
                                    className='textborder'

                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.country && Boolean(formik.errors.country)}
                                    helperText={formik.touched.country && formik.errors.country}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                                {/* <FormControl fullWidth>
                                    <Autocomplete
                                        options={countriesData}
                                        name="country"
                                        fullWidth
                                        getOptionLabel={(item) => item?.label}
                                        value={formik.values?.country || null}
                                        onChange={formik.handleChange}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                size="small"
                                                name="country"
                                                placeholder='Select Country'
                                                error={
                                                    formik.touched.country &&
                                                    Boolean(formik.errors.country)
                                                }
                                                helperText={
                                                    formik.touched.country && formik.errors.country
                                                }
                                            />}
                                    />
                                </FormControl> */}
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                    Allotted budget for the activity (in $) <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <TextField
                                    name="budget"
                                    type="number"
                                    size="small"
                                    className='textborder'
                                    fullWidth
                                    value={formik.values.budget}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.budget && Boolean(formik.errors.budget)}
                                    helperText={formik.touched.budget && formik.errors.budget}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={5} sm={3}>
                                <Button
                                    id="action"
                                    variant="contained"
                                    onClick={formik.handleSubmit}
                                    type="submit"
                                    style={{ backgroundColor: "#054723" }}
                                >
                                    {isLoading ? <CircularProgress size={27} /> : 'Save'}
                                </Button>
                            </Grid>

                            <Grid item xs={5} sm={3} className='ps-0'>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        handleFormClear();
                                        formik.resetForm();
                                    }}
                                    color="error"
                                >
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={0} textAlign="center">
                <Typography className="mb-2 fs-5">Choose your Marketing activity</Typography>
                <Button variant="contained" color="primary" className="fs-3" disabled={!isValid || !dirty || !isSubmited || Object.keys(errors).length > 0} style={{ marginRight: '10px', backgroundColor: "#054723" }} onClick={() => navigate('/dashboard/event')}>Event</Button>
                <Button variant="contained" className="fs-3" disabled={!isValid || !dirty || !isSubmited || Object.keys(errors).length > 0} style={{ backgroundColor: "#054723" }} onClick={() => navigate('/dashboard/campaign')}>Digital Campaign</Button>
            </Box>
            <Box my={3} className="text-center d-flex justify-content-center">
                <Box textAlign="left" maxWidth="1000px">
                    <Typography variant="body1" className="text-white mt-2">Note:</Typography>
                    <Typography variant="body1" className="text-white mt-2 ms-2">To obtain a more accurate Carbon footprint generated from your activity, please input the data in the allotted fields in the subsequent pages.</Typography>
                    <Typography variant="body1" className="text-white mt-2 ms-2">You can save the data and come back later before submitting.</Typography>
                    <Typography variant="body1" className="text-white mt-2 ms-2">The summary page will give you how much Carbon footprint you are generating per $ spent on your said activity.</Typography>
                    <Typography variant="body1" className="text-white ms-2">You can't change the values after submitting the form on the last page.</Typography>
                    <Typography variant="body1" className="text-white ms-2">All the emissions values are in kgCO<sub>2</sub>e.</Typography>
                </Box>
            </Box>
            <Typography className='fs-5 text-center my-4'>If you face any problems or have questions, please send your query to <Link to="mailto:info@sirat.earth" style={{ color: "#ffffd9", textDecoration: 'none' }}>Sirāt</Link></Typography>
        </Container>
    )
}

export default Home;