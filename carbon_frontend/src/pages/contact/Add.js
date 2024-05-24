/* eslint-disable react/prop-types */
import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import moment from "moment";
import * as React from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { apipost } from "../../service/api";
import Palette from "../../theme/palette";

const Add = (props) => {
  const { open, handleClose, setUserAction } = props
  const userid = sessionStorage.getItem('user_id');
  const userdata = JSON.parse(sessionStorage.getItem('user'));
  const userDetails = useSelector((state) => state?.userDetails?.data)
  const [isLoading, setIsLoading] = React.useState(false);
  const today = new Date().toISOString().split('.')[0];

  // -----------  validationSchema
  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    gender: yup.string().required("Gender is required"),
    phoneNumber: yup.string().matches(/^(0)?[0-9]{9,14}$/, 'Phone Number is invalid').required('Phone Number is required'),
    emailAddress: yup.string().email('Invalid email').required("Email is required"),
    address: yup.string().required("Address is required"),
    alternatePhoneNumber: yup.string().matches(/^(0)?[0-9]{9,14}$/, 'Phone Number is invalid'),
    additionalEmailAddress: yup.string().email('Invalid email'),

  });

  // -----------   initialValues
  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    alternatePhoneNumber: "",
    additionalEmailAddress: "",
    instagramProfile: "",
    twitterProfile: "",
    preferredContactMethod: "",
    referralSource: "",
    referralContactName: "",
    relationshipToReferrer: "",
    assigned_agent: "",
    preferencesForMarketingCommunications: "",
    preferredLanguage: "",
    createdBy: userid
  };

  // add contact api
  const addContact = async (values) => {
    setIsLoading(true)

    try {
      const data = values;
      const result = await apipost('contact/add', data)
      setUserAction(result)

      if (result && result.status === 201) {
        formik.resetForm();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addContact(values)
    },
  });


  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Add New </Typography>
          <Typography>
            <ClearIcon
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Typography style={{ marginBottom: "15px" }} variant="h6">
              Basic Information
            </Typography>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>First Name <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName &&
                    Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Last Name <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="lastName"
                  name="lastName"
                  size="small"
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={
                    formik.touched.lastName && formik.errors.lastName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Date Of Birth <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  name='dateOfBirth'
                  type='date'
                  size='small'
                  fullWidth
                  inputProps={{
                    max: moment(today).format('YYYY-MM-DD')
                  }}
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                  helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Phone Number <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  size="small"
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Email <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="emailAddress"
                  name="emailAddress"
                  size="small"
                  fullWidth
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.emailAddress &&
                    Boolean(formik.errors.emailAddress)
                  }
                  helperText={
                    formik.touched.emailAddress && formik.errors.emailAddress
                  }
                />
              </Grid>
              <Grid item xs={12} >
                <FormControl fullWidth>
                  <FormLabel>Gender <span style={{ color: "red" }}>*</span></FormLabel>
                  <RadioGroup row name="gender" onChange={formik.handleChange} value={formik.values.gender}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                  <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Address <span style={{ color: "red" }}>*</span></FormLabel>
                <TextField
                  id="address"
                  name="address"
                  size="small"
                  multiline
                  fullWidth
                  rows={4}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
            </Grid>
            <Typography style={{ marginBottom: "15px" }} variant="h6" mt={2}>
              Additional Contact Details
            </Typography>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Alternate phone number</FormLabel>
                <TextField
                  id="alternatePhoneNumber"
                  name="alternatePhoneNumber"
                  size="small"
                  fullWidth
                  value={formik.values.alternatePhoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.alternatePhoneNumber && Boolean(formik.errors.alternatePhoneNumber)}
                  helperText={formik.touched.alternatePhoneNumber && formik.errors.alternatePhoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Additional email address</FormLabel>
                <TextField
                  id="additionalEmailAddress"
                  name="additionalEmailAddress"
                  type="email"
                  size="small"
                  fullWidth
                  value={formik.values.additionalEmailAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.additionalEmailAddress && Boolean(formik.errors.additionalEmailAddress)}
                  helperText={formik.touched.additionalEmailAddress && formik.errors.additionalEmailAddress}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Instagram profile</FormLabel>
                <TextField
                  id="instagramProfile"
                  name="instagramProfile"
                  type=""
                  size="small"
                  fullWidth
                  onChange={(e) => formik.setFieldValue('instagramProfile', `${e.target.value}`)}
                />
                {formik.values.instagramProfile && <a href={`https://www.instagram.com/${formik.values.instagramProfile}`} target="_blank" rel="noreferrer">Link</a>}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Twitter profile</FormLabel>
                <TextField
                  id="twitterProfile"
                  name="twitterProfile"
                  type=""
                  size="small"
                  fullWidth
                  onChange={(e) => formik.setFieldValue('twitterProfile', `${e.target.value}`)}
                />
                {formik.values.twitterProfile && <a href={`https://twitter.com/${formik.values.twitterProfile}`} target="_blank" rel="noreferrer">Link</a>}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Preferred Contact Method</FormLabel>
                <TextField
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  type=""
                  size="small"
                  fullWidth
                  value={formik.values.preferredContactMethod}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Assigned Agent</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="assigned_agent"
                    name="assigned_agent"
                    label=""
                    size='small'
                    fullWidth
                    value={formik.values.assigned_agent}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.assigned_agent &&
                      Boolean(formik.errors.assigned_agent)
                    }
                    helperText={
                      formik.touched.assigned_agent && formik.errors.assigned_agent
                    }
                  >
                    {userdata?.role === 'admin' ?
                      userDetails?.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item._id}>
                            {`${item.firstName} ${item.lastName}`}
                          </MenuItem>
                        );
                      })
                      :
                      <MenuItem key={userdata._id} value={userdata._id}>
                        {`${userdata.firstName} ${userdata.lastName}`}
                      </MenuItem>
                    }
                  </Select>
                  <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.assigned_agent && formik.errors.assigned_agent}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Typography style={{ marginBottom: "15px" }} variant="h6" mt={2}>
              Referral Information
            </Typography>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Referral source</FormLabel>
                  <Select
                    id="referralSource"
                    name="referralSource"
                    size="small"
                    value={formik.values.referralSource}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.referralSource && Boolean(formik.errors.referralSource)
                    }
                  >
                    <MenuItem value="Existing Customers">Existing Customers</MenuItem>
                    <MenuItem value="Professional Networks">Professional Networks</MenuItem>
                    <MenuItem value="Business Partnerships">Business Partnerships</MenuItem>
                    <MenuItem value="Employee Referrals">Employee Referrals</MenuItem>
                    <MenuItem value="Online Reviews and Social Media">Online Reviews and Social Media</MenuItem>
                  </Select>
                  <FormHelperText
                    error={
                      formik.touched.referralSource && Boolean(formik.errors.referralSource)
                    }
                  >
                    {formik.touched.referralSource && formik.errors.referralSource}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Referral Contact Name</FormLabel>
                <TextField
                  id="referralContactName"
                  name="referralContactName"
                  size="small"
                  fullWidth
                  value={formik.values.referralContactName}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Relationship To Referrer</FormLabel>
                <TextField
                  id="relationshipToReferrer"
                  name="relationshipToReferrer"
                  size="small"
                  fullWidth
                  value={formik.values.relationshipToReferrer}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Typography style={{ marginBottom: "15px" }} variant="h6" mt={2}>
              Communication Preferences
            </Typography>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Marketing Communications</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="preferencesForMarketingCommunications"
                    name="preferencesForMarketingCommunications"
                    size="small"
                    value={formik.values.preferencesForMarketingCommunications}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.preferencesForMarketingCommunications && Boolean(formik.errors.preferencesForMarketingCommunications)
                    }
                  >
                    <MenuItem value="Opt-in">Opt-in</MenuItem>
                    <MenuItem value="Opt-out">Opt-out</MenuItem>
                  </Select>
                  <FormHelperText
                    error={
                      formik.touched.preferencesForMarketingCommunications && Boolean(formik.errors.preferencesForMarketingCommunications)
                    }
                  >
                    {formik.touched.preferencesForMarketingCommunications && formik.errors.preferencesForMarketingCommunications}
                  </FormHelperText>
                </FormControl>

              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Preferred language</FormLabel>
                <TextField
                  id="preferredLanguage"
                  name="preferredLanguage"
                  type=""
                  size="small"
                  fullWidth
                  value={formik.values.preferredLanguage}
                  onChange={formik.handleChange}
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
            style={{ textTransform: "capitalize" }}
            color="error"
            onClick={() => {
              formik.resetForm()
              handleClose()
            }}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Add