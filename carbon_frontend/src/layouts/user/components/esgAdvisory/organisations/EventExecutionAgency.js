import {
    Box,
    Button,
    FormControlLabel,
    FormLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

const EventExecutionAgency = () => {
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
        city: '',
        preferredHotels: '',
        eventType: '',
        eventSizeNoOfPax: '',
        foodBeverages: '',
        roomsNeeded: '',
        airportTransferNeeded: '',
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
            city: yup.string().required('City is required'),
            preferredHotels: yup.string().required('Preferred Hotels is required'),
            eventType: yup.string().required('Event Type is required'),
            eventSizeNoOfPax: yup.string().required('Event Size No Of Pax is required'),
            foodBeverages: yup.string().required('Food Beverages is required'),
            roomsNeeded: yup.string().required('Rooms Needed is required'),
            airportTransferNeeded: yup.string().required('Airport Transfer Needed is required'),
            message: yup.string().required('Message is required'),
        }),
        onSubmit: (values) => {
            // handleSubmit(values)
        },
    });

    return (
        <div>
            <br />
            <br />
            Event Execution Agency
            <Box m={4}>
                <Grid container spacing={2} p={2} py={2} border={2} borderColor={'#e2e2e2'}>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">First Name</FormLabel>
                        <TextField
                            name="firstName"
                            type="text"
                            size="small"
                            fullWidth
                            value={formik.values.firstName}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Last Name</FormLabel>
                        <TextField
                            name="lastName"
                            type="text"
                            size="small"
                            fullWidth
                            value={formik.values.lastName}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Email</FormLabel>
                        <TextField
                            name="email"
                            type="email"
                            size="small"
                            fullWidth
                            value={formik.values.email}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Mobile</FormLabel>
                        <TextField
                            name="mobile"
                            type="text"
                            size="small"
                            fullWidth
                            value={formik.values.mobile}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Designation</FormLabel>
                        <TextField
                            name="designation"
                            type="email"
                            size="small"
                            fullWidth
                            value={formik.values.designation}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.designation && Boolean(formik.errors.designation)}
                            helperText={formik.touched.designation && formik.errors.designation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Organisation Name</FormLabel>
                        <TextField
                            name="organisationName"
                            type="text"
                            size="small"
                            fullWidth
                            value={formik.values.organisationName}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.organisationName && Boolean(formik.errors.organisationName)}
                            helperText={formik.touched.organisationName && formik.errors.organisationName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Fixed Date (From)</FormLabel>
                        <TextField
                            name="fixedDateFrom"
                            type="date"
                            size="small"
                            fullWidth
                            value={formik.values.fixedDateFrom}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.fixedDateFrom && Boolean(formik.errors.fixedDateFrom)}
                            helperText={formik.touched.fixedDateFrom && formik.errors.fixedDateFrom}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Fixed Date (To)</FormLabel>
                        <TextField
                            name="fixedDateTo"
                            type="date"
                            size="small"
                            fullWidth
                            value={formik.values.fixedDateTo}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.fixedDateTo && Boolean(formik.errors.fixedDateTo)}
                            helperText={formik.touched.fixedDateTo && formik.errors.fixedDateTo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Alternate Dates (From)</FormLabel>
                        <TextField
                            name="alternateDatesFrom"
                            type="date"
                            size="small"
                            fullWidth
                            value={formik.values.alternateDatesFrom}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.alternateDatesFrom && Boolean(formik.errors.alternateDatesFrom)}
                            helperText={formik.touched.alternateDatesFrom && formik.errors.alternateDatesFrom}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Alternate Dates (To)</FormLabel>
                        <TextField
                            name="alternateDatesTo"
                            type="date"
                            size="small"
                            fullWidth
                            value={formik.values.alternateDatesTo}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.alternateDatesTo && Boolean(formik.errors.alternateDatesTo)}
                            helperText={formik.touched.alternateDatesTo && formik.errors.alternateDatesTo}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormLabel id="demo-row-radio-buttons-group-label fw-bolder">Browse your venue</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">city</FormLabel>
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            fullWidth
                            labelId="demo-simple-select-helper-label"
                            size="small"
                            name="city"
                            id="demo-simple-select-helper"
                            value={formik.values.city}
                            label="city"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={'india'}>India</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Preferred Hotels</FormLabel>
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            fullWidth
                            labelId="demo-simple-select-helper-label"
                            size="small"
                            name="preferredHotels"
                            id="demo-simple-select-helper"
                            value={formik.values.city}
                            label="city"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={'india'}>India</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Event Type</FormLabel>
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            fullWidth
                            labelId="demo-simple-select-helper-label"
                            size="small"
                            name="eventType"
                            id="demo-simple-select-helper"
                            value={formik.values.eventType}
                            label="eventType"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={'india'}>India</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Event Size (No. Of Pax)</FormLabel>
                        <TextField
                            name="eventSizeNoOfPax"
                            type="textarea"
                            size="small"
                            fullWidth
                            value={formik.values.eventSizeNoOfPax}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.eventSizeNoOfPax && Boolean(formik.errors.eventSizeNoOfPax)}
                            helperText={formik.touched.eventSizeNoOfPax && formik.errors.eventSizeNoOfPax}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Food & Beverages</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Rooms Needed</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Airport Transfer Needed</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>

                    {/*  */}
                    <Grid item xs={12}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Message</FormLabel>
                        <TextField
                            name="message"
                            type="textarea"
                            rows={3}
                            size="small"
                            fullWidth
                            value={formik.values.message}
                            placeholder="Enter Hear"
                            onChange={formik.handleChange}
                            error={formik.touched.message && Boolean(formik.errors.message)}
                            helperText={formik.touched.message && formik.errors.message}
                        />
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
        </div>
    );
};

export default EventExecutionAgency;
