import {
    Box,
    Button,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const EventExecutionAgency = () => {
    const navigate = useNavigate()
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        designation: '',
        organisationName: '',
        fixedDateFrom: '',
        fixedDateTo: '',
        alternateDatesFrom: '',
        alternateDatesTo: '',
        allocatedBudgetForYourActivity: "",
        agencyTypeNeeded: "",
        entertainment: "",
        teamBuilding: "",
        motivationalSpeaker: "",
        emcee: "",
        message: '',
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: yup.object({
            firstName: yup.string().required('First Name is required'),
            lastName: yup.string().required('Last Name is required'),
            email: yup.string().email().required('Email is required'),
            mobile: yup
                .string()
                .required()
                .matches(/^(0)?[0-9]{9,14}$/, 'Number is invalid'),
            designation: yup.string().required('Designation is required'),
            organisationName: yup.string().required('Organisation Name is required'),
            fixedDateFrom: yup.string().required('Fixed Date From is required'),
            fixedDateTo: yup.string().required('Fixed Date To is required'),
            alternateDatesFrom: yup.string().required('Alternate Dates From is required'),
            alternateDatesTo: yup.string().required('Alternate Dates To is required'),
            allocatedBudgetForYourActivity: yup.string().required('Allocated Budget For Your Activity is required'),
            agencyTypeNeeded: yup.string().required('Agency Type Needed is required'),
            entertainment: yup.string().required('Entertainment is required'),
            teamBuilding: yup.string().required('Team Building is required'),
            motivationalSpeaker: yup.string().required('Motivational Speaker is required'),
            emcee: yup.string().required('Emcee is required'),
            message: yup.string().required('Message is required'),
        }),
        onSubmit: (values) => {
            // handleSubmit(values)
        },
    });

    return (
        <Box sx={{ px: 6 }} className="main py-5" >

            <Box >
                <Typography variant='h5' className='text-center fs-1 green pt-4 fontFamily fw-bold' >Event Execution Agency</Typography>
                <p className='text-center pt-3 fontFamily main'>
                    Selecting the right event agency is a critical component in the flawless execution of your event. Through the application of your expectations, the chosen agency becomes instrumental in not only achieving your objectives but also delivering a seamless and impactful experience for your customers, aligned with your sustainability goals or write to us at <Link className=" text-decoration-none" style={{ color: "#4edceb" }}>askme@gosustainable.ai.</Link>
                </p>
                <p className='text-center pb-5 fontFamily '>
                    <b>Please Note:</b> We will provide you with minimum two and maximum three agencies based on your ask.
                </p>
            </Box>

            <Box m={4} className="container main">
                <Grid container spacing={2} p={2} py={2} border={2} borderColor={'#e2e2e2'} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">First Name <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="firstName"
                            type="text"
                            size="small"
                            fullWidth
                            value={formik.values.firstName}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Last Name <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="lastName"
                            type="text"
                            size="small"
                            fullWidth
                            value={formik.values.lastName}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Email <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="email"
                            type="email"
                            size="small"
                            fullWidth
                            value={formik.values.email}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Mobile <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="mobile"
                            type="text"
                            size="small"
                            fullWidth
                            value={formik.values.mobile}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Designation <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="designation"
                            type="text"
                            size="small"
                            fullWidth
                            value={formik.values.designation}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.designation && Boolean(formik.errors.designation)}
                            helperText={formik.touched.designation && formik.errors.designation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Organisation Name <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="organisationName"
                            type="text"
                            size="small"
                            fullWidth
                            value={formik.values.organisationName}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.organisationName && Boolean(formik.errors.organisationName)}
                            helperText={formik.touched.organisationName && formik.errors.organisationName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Fixed Date (From) <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="fixedDateFrom"
                            type="date"
                            size="small"
                            fullWidth
                            value={formik.values.fixedDateFrom}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.fixedDateFrom && Boolean(formik.errors.fixedDateFrom)}
                            helperText={formik.touched.fixedDateFrom && formik.errors.fixedDateFrom}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Fixed Date (To) <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="fixedDateTo"
                            type="date"
                            size="small"
                            fullWidth
                            value={formik.values.fixedDateTo}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.fixedDateTo && Boolean(formik.errors.fixedDateTo)}
                            helperText={formik.touched.fixedDateTo && formik.errors.fixedDateTo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Alternate Dates (From) <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="alternateDatesFrom"
                            type="date"
                            size="small"
                            fullWidth
                            value={formik.values.alternateDatesFrom}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.alternateDatesFrom && Boolean(formik.errors.alternateDatesFrom)}
                            helperText={formik.touched.alternateDatesFrom && formik.errors.alternateDatesFrom}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Alternate Dates (To) <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="alternateDatesTo"
                            type="date"
                            size="small"
                            fullWidth
                            value={formik.values.alternateDatesTo}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.alternateDatesTo && Boolean(formik.errors.alternateDatesTo)}
                            helperText={formik.touched.alternateDatesTo && formik.errors.alternateDatesTo}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label fw-bolder">Browse your venue </FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Allocated budget for your activity ($) <span style={{ color: "red" }}>*</span></FormLabel>
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            fullWidth
                            labelId="demo-simple-select-helper-label"
                            size="small"
                            name="allocatedBudgetForYourActivity"
                            id="demo-simple-select-helper"
                            value={formik.values.allocatedBudgetForYourActivity}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={'india'}>India</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Agency type needed <span style={{ color: "red" }}>*</span></FormLabel>
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            fullWidth
                            labelId="demo-simple-select-helper-label"
                            size="small"
                            name="agencyTypeNeeded"
                            id="demo-simple-select-helper"
                            value={formik.values.agencyTypeNeeded}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={'india'}>India</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Entertainment <span style={{ color: "red" }}>*</span></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="entertainment"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Team Building <span style={{ color: "red" }}>*</span></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="teamBuilding"
                            defaultValue="female"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Motivational Speaker <span style={{ color: "red" }}>*</span></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="motivationalSpeaker"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Emcee <span style={{ color: "red" }}>*</span></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="emcee"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Message <span style={{ color: "red" }}>*</span></FormLabel>
                        <TextField
                            name="message"
                            multiline
                            rows={3}
                            size="small"
                            fullWidth
                            value={formik.values.message}
                            // placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.message && Boolean(formik.errors.message)}
                            helperText={formik.touched.message && formik.errors.message}
                        />
                        <FormHelperText>0 of 200 max words.</FormHelperText>

                    </Grid>
                    <Grid item xs={12}>
                        <p className='pt-2'>By submitting the above info, you acknowledge that you have read our <Link style={{ color: "#4ABD43", textDecoration: "none" }} to='/privacy-policy'> Privacy Policy.</Link></p>
                    </Grid>
                    <Grid item xs={5} sm={8}>
                        <Button
                            id="action"
                            aria-haspopup="true"
                            variant="contained"
                            color="secondary"
                            disableElevation
                        // onClick={handleClickaction}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <div className='text-end pt-5'>
                <button style={{ border: "1px solid #4abd43", borderRadius: "30px", backgroundColor: "transparent", padding: "8px 20px" }} onClick={() => { navigate(-1); }}>Go Back </button>
            </div>
        </Box>
    );
};

export default EventExecutionAgency;
