import { Box, Button, FormHelperText, FormLabel, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { InlineWidget } from "react-calendly";
import { Link } from 'react-router-dom';
import * as yup from "yup";

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

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      firstName: yup.string().required('Message is required'),
      mobile: yup
        .string()
        .required()
        .matches(/^(0)?[0-9]{9,14}$/, 'Number is invalid'),
      organisation: yup.string().required('Organisation is required'),
      workEmail: yup.string().required('Work Email is required'),
      lastName: yup.string().required('Last Name is required'),
      designation: yup.string().required('Designation is required'),
      message: yup.string().required('Message is required'),
    }),
    onSubmit: (values) => {
      // handleSubmit(values)
    },
  });

  return (
    <div className="main py-5">
      <p className="text-center pt-3 fontFamily main fw-bold fs-5">
        For enquiries, please share your details, and we’ll respond within 24-48 hours. Alternatively, you can email us
        at
        <Link className=" text-decoration-none" style={{ color: '#4edceb' }}>
          askme@gosustainable.ai.
        </Link>
      </p>
      <Box>
        <Grid container spacing={2} p={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} border={2} borderColor={'#e2e2e2'} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            <Grid container spacing={2} p={1} py={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={6}>
                <FormLabel className='fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">First Name <span style={{ color: "red" }}>*</span></FormLabel>
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
                <FormLabel className='fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Last Name <span style={{ color: "red" }}>*</span></FormLabel>
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
                <FormLabel className='fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Organisation <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  name="organisation"
                  type="text"
                  size="small"
                  fullWidth
                  value={formik.values.organisation}
                  // placeholder="Enter Hear"
                  onChange={formik.handleChange}
                  error={formik.touched.organisation && Boolean(formik.errors.organisation)}
                  helperText={formik.touched.organisation && formik.errors.organisation}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel className='fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Designation <span style={{ color: "red" }}>*</span></FormLabel>
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
                <FormLabel className='fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Work Email <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  name="workEmail"
                  type="email"
                  size="small"
                  fullWidth
                  value={formik.values.workEmail}
                  // placeholder="Enter Hear"
                  onChange={formik.handleChange}
                  error={formik.touched.workEmail && Boolean(formik.errors.workEmail)}
                  helperText={formik.touched.workEmail && formik.errors.workEmail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel className='fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Mobile <span style={{ color: "red" }}>*</span></FormLabel>
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
              <Grid item xs={12}>
                <FormLabel className='fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Message <span style={{ color: "red" }}>*</span></FormLabel>
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
          </Grid>
          <Grid item xs={12} sm={6} border={2} borderColor={'#e2e2e2'}>
            <InlineWidget url="https://calendly.com/fayiba2108/meet" />

            {/* <PopupWidget
              url="https://calendly.com/your_scheduling_page"
              rootElement={document.getElementById("root")}
              text="Click here to schedule!"
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
