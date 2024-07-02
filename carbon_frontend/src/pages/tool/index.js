import { Box, Button, CircularProgress, Container, FormLabel, Grid, Modal, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { addToolData, clearToolFormData } from '../../redux/slice/toolSlice';
// import HotelData from '../accomodation/data.json';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 20,
    p: 4,
};
const Home = () => {

    const [isLoading, setIsLoading] = useState(false);
    // const [countriesData, setCountriesData] = useState([]);
    const [openInfo, setOpenInfo] = React.useState(false);
    const [isSubmited, setIsSubmited] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const toolData = useSelector(state => state.toolDetails?.data);

    const handleOpenInfo = () => setOpenInfo(true);
    const handleInfoClose = () => setOpenInfo(false);
    const initialValues = {
        name: "",
        email: "",
        activityName: "",
        country: "",
        budget: "",
        date: "",
    };

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email('Invalid Email').required("Business Email is required"),
        activityName: yup.string().required("Activity Name is required"),
        country: yup.string().required("Country is required"),
        budget: yup.number().required("Budget is required"),
        date: yup.string().required("Date is required"),
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
            formik.setFieldValue("date", formPrevData?.date);
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
                    Welcome to Sirāt's NetZero Platform <InfoIcon className='fs-3' onClick={() => handleOpenInfo()} style={{ cursor: 'pointer' }} />
                </Typography>
                {/* <Typography mt={3} className='fs-5'>
                    To obtain a more accurate CO2 footprint generated from your activity, please input your data in as many fields as possible.
                </Typography>
                <Typography className='fs-5'>
                    You can save the data and come back later before submitting.
                </Typography> */}
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
                            <Grid item xs={12} sm={6}>
                                <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                    Date <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <TextField
                                    name="date"
                                    type="date"
                                    size="small"
                                    className='textborder'
                                    fullWidth
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.date && Boolean(formik.errors.date)}
                                    helperText={formik.touched.date && formik.errors.date}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                    Allotted Budget (in$) <span style={{ color: 'red' }}>*</span>
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

                            {/* <Grid item xs={5} sm={3} className='ps-0'>
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
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={0} textAlign="center">
                <Typography className="mb-2 fs-5">Choose your Marketing activity</Typography>
                <Button variant="contained" color="primary" className="fs-3" disabled={!isValid || !dirty || !isSubmited || Object.keys(errors).length > 0} style={{ marginRight: '10px', backgroundColor: "#054723" }} onClick={() => navigate('/dashboard/event')}>Event</Button>
                <Button variant="contained" className="fs-3" disabled={!isValid || !dirty || !isSubmited || Object.keys(errors).length > 0} style={{ backgroundColor: "#054723" }} onClick={() => navigate('/dashboard/campaign')}>Digital Campaign</Button>
            </Box>

            <Modal
                open={openInfo}
                onClose={handleInfoClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h4 style={{ fontStyle: "italic", textDecoration: "underline" }}>Note</h4>
                        <CloseIcon onClick={handleInfoClose} style={{ cursor: "pointer" }} />
                    </div>
                    <ul>
                        <li>To obtain an accurate Carbon footprint generated from your activity,
                            please input the data in the allotted fields</li>
                        <li>You can save the data and come back later before submitting and you can’t
                            change the values after submitting.</li>
                        <li>The summary page will give you how much Carbon footprint you generated per $ spent on your above activity.</li>
                        <li>If you face any problems or have questions, please send your query to Sirāt</li>
                    </ul>
                </Box>
            </Modal>
        </Container>
    )
}

export default Home;