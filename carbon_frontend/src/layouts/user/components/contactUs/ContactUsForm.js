import { Box, Button, CircularProgress, FormHelperText, FormLabel, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { InlineWidget, PopupWidget, PopupModal, useCalendlyEventListener } from 'react-calendly';
import { Link } from 'react-router-dom';
import { apipost } from '../../../../service/api';

const ContactUsForm = () => {
  const initialValues = {
    firstName: '',
    organisation: '',
    workEmail: '',
    lastName: '',
    designation: '',
    mobile: '',
    message: '',
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      firstName: yup.string().required('Message is required'),
      mobile: yup
        .string()
        .required()
        .matches(/^[0-9]{10}$/, 'Number is invalid'),
      organisation: yup.string().required('Organisation is required'),
      workEmail: yup.string().required('Work Email is required'),
      lastName: yup.string().required('Last Name is required'),
      designation: yup.string().required('Designation is required'),
      message: yup.string().required('Message is required'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  console.log(formik.errors)
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const result = await apipost('api/contactUs/add', values);

      if (result && result.status === 200) {
        formik.resetForm();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  /* For future use */
  // useCalendlyEventListener({
  //   onProfilePageViewed: (e) => console.log('onProfilePageViewed----::', e),
  //   onDateAndTimeSelected: (e) => console.log('onDateAndTimeSelected----::', e),
  //   onEventTypeViewed: (e) => console.log('onEventTypeViewed----::', e),
  //   onEventScheduled: (e) => console.log('payload----::', e.data.payload, e),
  // });

  const pageSettings = {
    backgroundColor: '#ffffff',
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: '#00a2ff',
    textColor: '#4d5055',
  };
  const utm = {
    utmCampaign: 'Spring Sale 2019',
    utmContent: 'Shoe and Shirts',
    utmMedium: 'Ad',
    utmSource: 'Facebook',
    utmTerm: 'Spring',
  };

  const prefill = {
    email: 'test@test.com',
    firstName: 'Jon',
    lastName: 'Snow',
    name: 'Jon Snow',
    smsReminderNumber: '+1234567890',
    guests: ['janedoe@example.com', 'johndoe@example.com'],
    customAnswers: {
      a1: 'a1',
      a2: 'a2',
      a3: 'a3',
      a4: 'a4',
      a5: 'a5',
      a6: 'a6',
      a7: 'a7',
      a8: 'a8',
      a9: 'a9',
      a10: 'a10',
    },
    date: new Date(Date.now() + 86400000),
    city: 'Winterfell',
    secondTelephone: '+1987654321',
  };

  return (
    <div>
      <Box>
        <Grid container spacing={2} p={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} border={2} borderColor={'#e2e2e2'} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid container spacing={2} p={1} py={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                  Organisation <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="organisation"
                  type="text"
                  size="small"
                  fullWidth
                  value={formik.values.organisation}
                  // placeholder="Enter Hear"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.organisation && Boolean(formik.errors.organisation)}
                  helperText={formik.touched.organisation && formik.errors.organisation}
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
                  Work Email <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="workEmail"
                  type="email"
                  size="small"
                  fullWidth
                  value={formik.values.workEmail}
                  // placeholder="Enter Hear"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.workEmail && Boolean(formik.errors.workEmail)}
                  helperText={formik.touched.workEmail && formik.errors.workEmail}
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
                    {' '}
                    Privacy Policy.
                  </Link>
                </p>
              </Grid>
              <Grid item xs={5} sm={8}>
                <Button
                  id="action"
                  // aria-haspopup="true"
                  variant="contained"
                  // color="secondary"
                  // disableElevation
                  onClick={formik.handleSubmit}
                  type="submit"
                  className='custom-btn'
                >
                  {isLoading ? <CircularProgress size={27} /> : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InlineWidget url="https://calendly.com/fayiba2108/meet" />

            {/* <button style={{ display: 'block', margin: '0 auto' }} onClick={() => setIsOpen(true)}>
              Custom Button
            </button> */}
            <PopupModal
              url="https://calendly.com/fayiba2108/meet"
              pageSettings={pageSettings}
              utm={utm}
              prefill={prefill}
              onModalClose={() => setIsOpen(false)}
              open={isOpen}
              rootElement={document.getElementById('root')}
            />
            {/* <PopupWidget
              url="https://calendly.com/fayiba2108/meet"
              rootElement={document.getElementById("root")}
              text="schedule metting"
              textColor="#ffffff"
              color="#00a2ff"
            /> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ContactUsForm;
