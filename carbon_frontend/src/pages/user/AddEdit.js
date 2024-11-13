import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from 'dayjs';
import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress, Dialog, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { apipost, apiput } from "../../service/api";

const Add = (props) => {

  const { handleClose, open, setUserAction, selectedUser, handleUserClear } = props;
  const [isLoading, setIsLoading] = useState();
  const [logoPreview, setLogoPreview] = useState(null);
  const [initialValues, setInitialValues] = useState({
    loginId: "",
    password: "",
    companyName: "",
    companyWebsite: "",
    regOffAddrs: "",
    regOffCountry: "",
    regOffPhoneNo: "",
    cnctPerson: "",
    cnctPersonBusEmail: "",
    cnctPersonMob: "",
    altCnctPerson: "",
    altCnctPersonBusEmail: "",
    altCnctPersonMob: "",
    escCnctPerson: "",
    escCnctPersonBusEmail: "",
    escCnctPersonMob: "",
    subscriptionType: "",
    subscriptionStart: "",
    subscriptionEnd: "",
    paymentReceivedDate: "",
    paymentRemainderDate: "",
    logo: null
  });

  const FILE_SIZE = 1048576; // 1 MB in bytes

  // -----------  validationSchema
  const validationSchema = yup.object({
    loginId: yup.string().required('Login ID is required'),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    companyName: yup.string().required('Company Name is required'),
    companyWebsite: yup.string().required('Company Website is required'),
    regOffAddrs: yup.string().required('Registered Office Address is required'),
    regOffCountry: yup.string().required('Registered Office Country is required'),
    regOffPhoneNo: yup.string().required('Registered Office Phone Number is required'),
    cnctPerson: yup.string().required('Contact Person is required'),
    cnctPersonBusEmail: yup.string().email('Invalid email').required('Contact Person Business Email is required'),
    cnctPersonMob: yup.string().required('Contact Person Mobile Number is required'),
    altCnctPerson: yup.string().required('Alternate Contact Person is required'),
    altCnctPersonBusEmail: yup.string().email('Invalid email').required('Alternate Contact Person Business Email is required'),
    altCnctPersonMob: yup.string().required('Alternate Contact Person Mobile Number is required'),
    escCnctPerson: yup.string().required('Escalation Contact Person is required'),
    escCnctPersonBusEmail: yup.string().email('Invalid email').required('Escalation Contact Person Business Email is required'),
    escCnctPersonMob: yup.string().required('Escalation Contact Person Mobile Number is required'),
    subscriptionType: yup.string().required('Subscription Type is required'),
    subscriptionStart: yup.date().required('Subscription Start Date is required'),
    subscriptionEnd: yup.date().required('Subscription End Date is required'),
    paymentReceivedDate: yup.date().required('Payment Received Date is required'),
    paymentRemainderDate: yup.date().required('Payment Remainder Date is required'),
    logo: yup.mixed()
      .required('Company Logo is required')
      .test('fileSize', 'File size too large, max size is 1 MB', (value) => {
        // Check file size only if value is a file object (File/Blob)
        if (value instanceof File) {
          return value.size <= FILE_SIZE;
        }
        return true; // Allow Cloudinary URL without size check
      })
      .test('fileType', 'Only PNG, JPG, or GIF files are allowed', (value) => {
        // Check file type only if value is a file object (File/Blob)
        if (value instanceof File) {
          const supportedFormats = ['image/png', 'image/jpeg', 'image/gif'];
          return supportedFormats.includes(value.type);
        }
        return true; // Allow Cloudinary URL without type check
      }),
  });

  // add/edit user api
  const addEditUser = async (values) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append each field from values to formData
      Object.keys(values).forEach(key => {
        if (values[key] instanceof FileList) {
          formData.append(key, values[key][0]);
        } else {
          formData.append(key, values[key]);
        }
      });

      let result;
      if (selectedUser && Object.keys(selectedUser)?.length > 0) {
        // Editing existing user
        const response = await apiput(`api/user/edit/${selectedUser._id}`, formData);
        result = response.data;
      } else {
        // Adding new user
        const response = await apipost('api/auth/register', formData);
        result = response.data;
      }

      setUserAction(result);

      if (result && (result.status === 201 || result.status === 20000)) {
        setInitialValues({
          loginId: "",
          password: "",
          companyName: "",
          companyWebsite: "",
          regOffAddrs: "",
          regOffCountry: "",
          regOffPhoneNo: "",
          cnctPerson: "",
          cnctPersonBusEmail: "",
          cnctPersonMob: "",
          altCnctPerson: "",
          altCnctPersonBusEmail: "",
          altCnctPersonMob: "",
          escCnctPerson: "",
          escCnctPersonBusEmail: "",
          escCnctPersonMob: "",
          subscriptionType: "",
          subscriptionStart: "",
          subscriptionEnd: "",
          paymentReceivedDate: "",
          paymentRemainderDate: "",
          logo: null
        });
        setLogoPreview(null);
        handleClose(); // Close the dialog after successful operation
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    handleClose();
    setLogoPreview(null);
    handleUserClear();
    // formik.resetForm();  // not clearing
    setInitialValues({
      loginId: "",
      password: "",
      companyName: "",
      companyWebsite: "",
      regOffAddrs: "",
      regOffCountry: "",
      regOffPhoneNo: "",
      cnctPerson: "",
      cnctPersonBusEmail: "",
      cnctPersonMob: "",
      altCnctPerson: "",
      altCnctPersonBusEmail: "",
      altCnctPersonMob: "",
      escCnctPerson: "",
      escCnctPersonBusEmail: "",
      escCnctPersonMob: "",
      subscriptionType: "",
      subscriptionStart: "",
      subscriptionEnd: "",
      paymentReceivedDate: "",
      paymentRemainderDate: "",
      logo: null
    });
  };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("logo", file);

    // Display preview of the selected logo
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  const handleChangeFile = () => {
    // formik.setFieldValue('logo', null);
    // setLogoPreview(null);

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', 'logo');
    input.setAttribute('id', 'logo');
    input.setAttribute('accept', ".jpg, .jpeg, .png, .gif");
    input.onchange = handleFileChange;
    input.click();
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      addEditUser(values)
    },
  });

  useEffect(() => {
    if (selectedUser) {
      setInitialValues(prevData => ({
        ...prevData,
        loginId: selectedUser.loginId || '',
        password: selectedUser.password || '',
        companyName: selectedUser.companyName || '',
        companyWebsite: selectedUser.companyWebsite || '',
        regOffAddrs: selectedUser.regOffAddrs || '',
        regOffCountry: selectedUser.regOffCountry || '',
        regOffPhoneNo: selectedUser.regOffPhoneNo || '',
        cnctPerson: selectedUser.cnctPerson || '',
        cnctPersonBusEmail: selectedUser.cnctPersonBusEmail || '',
        cnctPersonMob: selectedUser.cnctPersonMob || '',
        altCnctPerson: selectedUser.altCnctPerson || '',
        altCnctPersonBusEmail: selectedUser.altCnctPersonBusEmail || '',
        altCnctPersonMob: selectedUser.altCnctPersonMob || '',
        escCnctPerson: selectedUser.escCnctPerson || '',
        escCnctPersonBusEmail: selectedUser.escCnctPersonBusEmail || '',
        escCnctPersonMob: selectedUser.escCnctPersonMob || '',
        subscriptionType: selectedUser.subscriptionType || '',
        subscriptionStart: selectedUser.subscriptionStart ? dayjs(selectedUser.subscriptionStart).format('YYYY-MM-DD') : '',
        subscriptionEnd: selectedUser.subscriptionEnd ? dayjs(selectedUser.subscriptionEnd).format('YYYY-MM-DD') : '',
        paymentReceivedDate: selectedUser.paymentReceivedDate ? dayjs(selectedUser.paymentReceivedDate).format('YYYY-MM-DD') : '',
        paymentRemainderDate: selectedUser.paymentRemainderDate ? dayjs(selectedUser.paymentRemainderDate).format('YYYY-MM-DD') : '',
        logo: selectedUser.logo || null,
      }));
      setLogoPreview(selectedUser.logo || null);
    }
  }, [selectedUser]);

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{selectedUser && Object.keys(selectedUser)?.length > 0 ? 'Edit' : 'Add'} User</Typography>
          <Typography>
            <ClearIcon
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Company Name <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="companyName"
                  name="companyName"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.companyName && Boolean(formik.errors.companyName)
                  }
                  helperText={
                    formik.touched.companyName && formik.errors.companyName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Company Website <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="companyWebsite"
                  name="companyWebsite"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.companyWebsite}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.companyWebsite && Boolean(formik.errors.companyWebsite)
                  }
                  helperText={
                    formik.touched.companyWebsite && formik.errors.companyWebsite
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Company Logo <span style={{ color: "red" }}>*</span></FormLabel>
                {!logoPreview && (
                  <>
                    {/* <TextField
                    id="logo"
                    name="logo"
                    type="file"
                    fullWidth
                    inputProps={{
                      multiple: false,
                      accept: ".jpg, .jpeg, .png, .gif"
                    }}
                    onChange={handleFileChange}
                    error={formik.touched.logo && Boolean(formik.errors.logo)}
                    helperText={formik.touched.logo && formik.errors.logo}
                  /> */}
                    <TextField
                      id="logo"
                      name="logo"
                      type="file"
                      fullWidth
                      inputProps={{
                        multiple: false,
                        accept: ".jpg, .jpeg, .png, .gif"
                      }}
                      onChange={handleFileChange}
                      error={formik.touched.logo && Boolean(formik.errors.logo)}
                      helperText={formik.touched.logo && formik.errors.logo}
                    />
                  </>
                )}
                {logoPreview && (
                  <>
                    <Button style={{ marginLeft: '10px', cursor: 'pointer', color: '#007bff' }} onClick={handleChangeFile}>Change</Button>
                    <div style={{ marginTop: '10px' }}>
                      {/* <FormLabel>Preview: </FormLabel> */}
                      <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '100%', marginTop: '5px', height: '150px' }} />
                    </div>
                  </>
                )}
                {
                  formik.touched.logo && Boolean(formik.errors.logo) && <span style={{ color: "red", fontSize: "0.75rem" }}>{formik.errors.logo}</span>
                }
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Registered Office Address <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="regOffAddrs"
                  name="regOffAddrs"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.regOffAddrs}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.regOffAddrs && Boolean(formik.errors.regOffAddrs)
                  }
                  helperText={
                    formik.touched.regOffAddrs && formik.errors.regOffAddrs
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Registered Country <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="regOffCountry"
                  name="regOffCountry"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.regOffCountry}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.regOffCountry && Boolean(formik.errors.regOffCountry)
                  }
                  helperText={
                    formik.touched.regOffCountry && formik.errors.regOffCountry
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Registered Office Phone No <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="regOffPhoneNo"
                  name="regOffPhoneNo"
                  label=""
                  size="small"
                  maxRows={10}
                  type="number"
                  value={formik.values.regOffPhoneNo}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.regOffPhoneNo && Boolean(formik.errors.regOffPhoneNo)
                  }
                  helperText={
                    formik.touched.regOffPhoneNo && formik.errors.regOffPhoneNo
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Contact Person <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="cnctPerson"
                  name="cnctPerson"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.cnctPerson}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.cnctPerson && Boolean(formik.errors.cnctPerson)
                  }
                  helperText={
                    formik.touched.cnctPerson && formik.errors.cnctPerson
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Contact Business Email <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="cnctPersonBusEmail"
                  name="cnctPersonBusEmail"
                  label=""
                  size="small"
                  maxRows={10}
                  type="email"
                  value={formik.values.cnctPersonBusEmail}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.cnctPersonBusEmail && Boolean(formik.errors.cnctPersonBusEmail)
                  }
                  helperText={
                    formik.touched.cnctPersonBusEmail && formik.errors.cnctPersonBusEmail
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Contact Mobile No <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="cnctPersonMob"
                  name="cnctPersonMob"
                  label=""
                  size="small"
                  maxRows={10}
                  type="number"
                  value={formik.values.cnctPersonMob}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.cnctPersonMob && Boolean(formik.errors.cnctPersonMob)
                  }
                  helperText={
                    formik.touched.cnctPersonMob && formik.errors.cnctPersonMob
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Alternate Person <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="altCnctPerson"
                  name="altCnctPerson"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.altCnctPerson}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.altCnctPerson && Boolean(formik.errors.altCnctPerson)
                  }
                  helperText={
                    formik.touched.altCnctPerson && formik.errors.altCnctPerson
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Alternate Business Email <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="altCnctPersonBusEmail"
                  name="altCnctPersonBusEmail"
                  label=""
                  size="small"
                  maxRows={10}
                  type="email"
                  value={formik.values.altCnctPersonBusEmail}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.altCnctPersonBusEmail && Boolean(formik.errors.altCnctPersonBusEmail)
                  }
                  helperText={
                    formik.touched.altCnctPersonBusEmail && formik.errors.altCnctPersonBusEmail
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Alternate Mobile No <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="altCnctPersonMob"
                  name="altCnctPersonMob"
                  label=""
                  size="small"
                  maxRows={10}
                  type="number"
                  value={formik.values.altCnctPersonMob}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.altCnctPersonMob && Boolean(formik.errors.altCnctPersonMob)
                  }
                  helperText={
                    formik.touched.altCnctPersonMob && formik.errors.altCnctPersonMob
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Escalation Person <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="escCnctPerson"
                  name="escCnctPerson"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.escCnctPerson}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.escCnctPerson && Boolean(formik.errors.escCnctPerson)
                  }
                  helperText={
                    formik.touched.escCnctPerson && formik.errors.escCnctPerson
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Escalation Business Email <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="escCnctPersonBusEmail"
                  name="escCnctPersonBusEmail"
                  label=""
                  size="small"
                  maxRows={10}
                  type="email"
                  value={formik.values.escCnctPersonBusEmail}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.escCnctPersonBusEmail && Boolean(formik.errors.escCnctPersonBusEmail)
                  }
                  helperText={
                    formik.touched.escCnctPersonBusEmail && formik.errors.escCnctPersonBusEmail
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Escalation Mobile No <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="escCnctPersonMob"
                  name="escCnctPersonMob"
                  label=""
                  size="small"
                  maxRows={10}
                  type="number"
                  value={formik.values.escCnctPersonMob}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.escCnctPersonMob && Boolean(formik.errors.escCnctPersonMob)
                  }
                  helperText={
                    formik.touched.escCnctPersonMob && formik.errors.escCnctPersonMob
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <FormLabel>Login Id <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="loginId"
                  name="loginId"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.loginId}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.loginId && Boolean(formik.errors.loginId)
                  }
                  helperText={
                    formik.touched.loginId && formik.errors.loginId
                  }
                />
              </Grid>
              {!selectedUser &&
                (
                  <Grid item xs={12} sm={12} md={6}>
                    <FormLabel>Password <span style={{ color: "red" }}>*</span></FormLabel>
                    <TextField
                      id="password"
                      name="password"
                      label=""
                      size="small"
                      type=""
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      fullWidth
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Grid>
                )
              }
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Subscription Type <span style={{ color: 'red' }}>*</span></FormLabel>
                <FormControl fullWidth error={formik.touched.subscriptionType && Boolean(formik.errors.subscriptionType)}>
                  <Select
                    labelId="subscriptionType-label"
                    id="subscriptionType"
                    name="subscriptionType"
                    value={formik.values.subscriptionType}
                    onChange={formik.handleChange}
                    fullWidth
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                  {formik.touched.subscriptionType && formik.errors.subscriptionType && (
                    <FormHelperText>{formik.errors.subscriptionType}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Subscription Start <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="subscriptionStart"
                  name="subscriptionStart"
                  label=""
                  size="small"
                  maxRows={10}
                  type="date"
                  value={formik.values.subscriptionStart}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.subscriptionStart && Boolean(formik.errors.subscriptionStart)
                  }
                  helperText={
                    formik.touched.subscriptionStart && formik.errors.subscriptionStart
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Subscription End <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="subscriptionEnd"
                  name="subscriptionEnd"
                  label=""
                  size="small"
                  maxRows={10}
                  type="date"
                  value={formik.values.subscriptionEnd}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.subscriptionEnd && Boolean(formik.errors.subscriptionEnd)
                  }
                  helperText={
                    formik.touched.subscriptionEnd && formik.errors.subscriptionEnd
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Payment Received Date <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="paymentReceivedDate"
                  name="paymentReceivedDate"
                  label=""
                  size="small"
                  maxRows={10}
                  type="date"
                  value={formik.values.paymentReceivedDate}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.subscriptionStart && Boolean(formik.errors.paymentReceivedDate)
                  }
                  helperText={
                    formik.touched.paymentReceivedDate && formik.errors.paymentReceivedDate
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormLabel>Payment Remainder <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="paymentRemainderDate"
                  name="paymentRemainderDate"
                  label=""
                  size="small"
                  maxRows={10}
                  type="date"
                  value={formik.values.paymentRemainderDate}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.paymentRemainderDate && Boolean(formik.errors.paymentRemainderDate)
                  }
                  helperText={
                    formik.touched.paymentRemainderDate && formik.errors.paymentRemainderDate
                  }
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={formik.handleSubmit} variant='contained' color='primary' disabled={!!isLoading}>
            {isLoading ? <CircularProgress size={27} /> : 'Save'}
          </LoadingButton>
          <Button
            type="reset"
            variant="outlined"
            color="error"
            style={{ textTransform: "capitalize" }}
            onClick={handleReset}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Add