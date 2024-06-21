import {
  Box,
  Button,
  CircularProgress,
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
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { apipost } from '../../../../../service/api';

const EventVenue = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
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
      email: yup.string().email('Email is invalid').required('Email is required'),
      mobile: yup
        .string()
        .required('Mobile is require')
        .matches(/^[0-9]{10}$/, 'Number is invalid'),
      designation: yup.string().required('Designation is required'),
      organisationName: yup.string().required('Organisation Name is required'),
      fixedDateFrom: yup.string().required('Fixed Date From is required'),
      fixedDateTo: yup.string().required('Fixed Date To is required'),
      alternateDatesFrom: yup.string().required('Alternate Dates From is required'),
      alternateDatesTo: yup.string().required('Alternate Dates To is required'),
      city: yup.string().required('City is required'),
      preferredHotels: yup.string().required('Preferred Hotels is required'),
      eventType: yup.string().required('Event Type is required'),
      eventSizeNoOfPax: yup.number().typeError("Event Size (No. Of Pax) must be number").required('Event Size No Of Pax is required'),
      foodBeverages: yup.string().required('Food Beverages is required'),
      roomsNeeded: yup.string().required('Rooms Needed is required'),
      airportTransferNeeded: yup.string().required('Airport Transfer Needed is required'),
      message: yup.string().required('Message is required').max(200, 'Message must be at most 200 characters long'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const result = await apipost('api/events/event-venue', values);

      if (result && result.status === 200) {
        formik.resetForm();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="main py-5">
      <Box>
        <Typography
          variant="h5"
          className="text-center fs-1 green pt-4 fontFamily fw-bold wow animate__animated animate__fadeInUp animate__slow"
        >
          Event Venue
        </Typography>
        <p className="text-center pt-3 fontFamily wow animate__animated animate__fadeInUp animate__slow">
          Choosing the right event (hotel) venue is crucial for an organization or exhibitor when planning an event or
          exhibition. It not only plays a major role in showcasing their financial strength but also demonstrates a firm
          commitment to their partners, customers, and the audience.
        </p>
        <p className="text-center pb-5 fontFamily wow animate__animated animate__fadeInUp animate__slow">
          Please provide the necessary details and submit your request, and we will get back to you within 24-48 hours
          or alternatively write to us at
          <Link className=" text-decoration-none" style={{ color: '#ffffd9' }}>
            {' '}
            askme@gosustainable.ai
          </Link>
        </p>
      </Box>
      <Box m={4} className="container main">
        <Grid
          container
          spacing={2}
          p={2}
          py={2}
          border={2}
          borderColor={'#e2e2e2'}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              First Name <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="firstName"
              type="text"
              size="small"
              fullWidth
              value={formik.values.firstName}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Last Name <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="lastName"
              type="text"
              size="small"
              fullWidth
              value={formik.values.lastName}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Email <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="email"
              type="email"
              size="small"
              fullWidth
              value={formik.values.email}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Mobile <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="mobile"
              type="text"
              size="small"
              fullWidth
              value={formik.values.mobile}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Designation <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="designation"
              type="text"
              size="small"
              fullWidth
              value={formik.values.designation}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.designation && Boolean(formik.errors.designation)}
              helperText={formik.touched.designation && formik.errors.designation}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Organisation Name <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="organisationName"
              type="text"
              size="small"
              fullWidth
              value={formik.values.organisationName}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.organisationName && Boolean(formik.errors.organisationName)}
              helperText={formik.touched.organisationName && formik.errors.organisationName}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Fixed Date (From) <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="fixedDateFrom"
              type="date"
              size="small"
              fullWidth
              value={formik.values.fixedDateFrom}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fixedDateFrom && Boolean(formik.errors.fixedDateFrom)}
              helperText={formik.touched.fixedDateFrom && formik.errors.fixedDateFrom}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Fixed Date (To) <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="fixedDateTo"
              type="date"
              size="small"
              fullWidth
              value={formik.values.fixedDateTo}
              inputProps={{
                min: formik.values.fixedDateFrom
              }}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fixedDateTo && Boolean(formik.errors.fixedDateTo)}
              helperText={formik.touched.fixedDateTo && formik.errors.fixedDateTo}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Alternate Dates (From) <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="alternateDatesFrom"
              type="date"
              size="small"
              fullWidth
              value={formik.values.alternateDatesFrom}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.alternateDatesFrom && Boolean(formik.errors.alternateDatesFrom)}
              helperText={formik.touched.alternateDatesFrom && formik.errors.alternateDatesFrom}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Alternate Dates (To) <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="alternateDatesTo"
              type="date"
              size="small"
              fullWidth
              inputProps={{
                min: formik.values.alternateDatesFrom
              }}
              value={formik.values.alternateDatesTo}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.alternateDatesTo && Boolean(formik.errors.alternateDatesTo)}
              helperText={formik.touched.alternateDatesTo && formik.errors.alternateDatesTo}
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label fw-bolder">
              Browse your venue{' '}
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              city <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              labelId="demo-simple-select-helper-label"
              size="small"
              name="city"
              id="demo-simple-select-helper"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value={'india'}>India</MenuItem>
            </Select>
            <FormHelperText error={formik.touched.city && Boolean(formik.errors.city)}>
              {formik.touched.city && formik.errors.city}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Preferred Hotels <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              labelId="demo-simple-select-helper-label"
              size="small"
              name="preferredHotels"
              id="demo-simple-select-helper"
              value={formik.values.preferredHotels}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value={'india'}>India</MenuItem>
            </Select>
            <FormHelperText error={formik.touched.preferredHotels && Boolean(formik.errors.preferredHotels)}>
              {formik.touched.preferredHotels && formik.errors.preferredHotels}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Event Type <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              labelId="demo-simple-select-helper-label"
              size="small"
              name="eventType"
              id="demo-simple-select-helper"
              value={formik.values.eventType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value={'india'}>India</MenuItem>
            </Select>
            <FormHelperText error={formik.touched.eventType && Boolean(formik.errors.eventType)}>
              {formik.touched.eventType && formik.errors.eventType}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Event Size (No. Of Pax) <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="eventSizeNoOfPax"
              type="textarea"
              size="small"
              fullWidth
              value={formik.values.eventSizeNoOfPax}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.eventSizeNoOfPax && Boolean(formik.errors.eventSizeNoOfPax)}
              helperText={formik.touched.eventSizeNoOfPax && formik.errors.eventSizeNoOfPax}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Food & Beverages <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <RadioGroup
              value={formik?.values?.foodBeverages}
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={formik.handleChange}
              name="foodBeverages"
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            <FormHelperText error={formik.touched.foodBeverages && Boolean(formik.errors.foodBeverages)}>
              {formik.touched.foodBeverages && formik.errors.foodBeverages}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Rooms Needed <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <RadioGroup
              value={formik?.values?.roomsNeeded}
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={formik.handleChange}
              name="roomsNeeded"
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            <FormHelperText error={formik.touched.roomsNeeded && Boolean(formik.errors.roomsNeeded)}>
              {formik.touched.roomsNeeded && formik.errors.roomsNeeded}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Airport Transfer Needed <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <RadioGroup
              value={formik?.values?.airportTransferNeeded}
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={formik.handleChange}
              name="airportTransferNeeded"
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            <FormHelperText error={formik.touched.airportTransferNeeded && Boolean(formik.errors.airportTransferNeeded)}>
              {formik.touched.airportTransferNeeded && formik.errors.airportTransferNeeded}
            </FormHelperText>
          </Grid>

          <Grid item xs={12}>
            <FormLabel className="fw-bold text-dark mt-1" id="demo-row-radio-buttons-group-label">
              Message <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              name="message"
              multiline
              rows={3}
              size="small"
              fullWidth
              value={formik.values.message}
              // placeholder="Enter Hear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
            <FormHelperText>0 of 200 max words.</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <p className="pt-2">
              By submitting the above info, you acknowledge that you have read our{' '}
              <Link style={{ color: '#4ABD43', textDecoration: 'none' }} to="/privacy-policy">
                Privacy Policy.
              </Link>
            </p>
          </Grid>
          <Grid item xs={5} sm={8}>
            <Button
              id="action"
              aria-haspopup="true"
              variant="contained"
              color="secondary"
              disableElevation
              onClick={formik.handleSubmit}
              className='custom-btn'
            >
              {isLoading ? <CircularProgress size={27} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div className="text-end main py-4">
        <button
          style={{
            border: '1px solid #4abd43',
            borderRadius: '30px',
            backgroundColor: 'transparent',
            padding: '8px 20px',
          }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back{' '}
        </button>
      </div>
    </div>
  );
};

export default EventVenue;
