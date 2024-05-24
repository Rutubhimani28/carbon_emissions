import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { fetchContactData } from '../../redux/slice/contactSlice';
import { fetchLeadData } from '../../redux/slice/leadSlice';
import { fetchSmsTemplateData } from '../../redux/slice/smsTemplateSlice';
import { apipost } from '../../service/api';
import Palette from '../../theme/palette';


const Add = (props) => {
  const dispatch = useDispatch();

  const { open, handleClose, _id, setUserAction } = props
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [numbers, setNumbers] = useState([])
  const [err, setErr] = useState('')
  const [messageType, setMessageType] = useState("own");

  const [numbersInput, setNumbersInput] = useState('')
  const userid = sessionStorage.getItem('user_id');
  const userdata = JSON.parse(sessionStorage.getItem('user'));
  const userDetails = useSelector((state) => state?.userDetails?.data)
  const LeadData = useSelector((state) => state?.leadDetails.data)
  const contactsData = useSelector((state) => state?.contactDetails.data)
  const smsTempleteData = useSelector((state) => state?.smsTempDetails?.data)

  // -----------   initialValues
  const initialValues = {
    ids: [],
    reletedTo: 'Lead',
    leadsData: [],
    contactsData: [],
    templeteMessage: '',
    number: '',
    message: '',
    messageType: 'template',
    createdBy: userid,
  };

  // add Lead api
  const addsMS = async (values) => {
    setIsLoading(true);
    try {
      const data = values;
      const lead = data.leadsData.map(item => item._id)
      const contact = data.contactsData.map(item => item._id)

      const payload = {
        ids: values.reletedTo === "Lead" ? lead : values.reletedTo === "Contact" ? contact : "",
        message: values.message,
        relatedTo: values.reletedTo,
        otherNumbers: numbers
      }
      const result = await apipost('sms/add', payload);
      setUserAction(result);


    } catch (error) {
      console.error('Error adding lead:', error);
    }
    formik.resetForm();
    setNumbers([])
    handleClose();
    setIsLoading(false);
  }
  // formik
  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors = {}
      if (values.reletedTo === "Lead" && (values.leadsData === '' || values.leadsData.length === 0)) {
        errors.leadsData = "Lead is required";

      }
      if (values.reletedTo === "Contact" && (values.contactsData === "" || values.contactsData.length === 0)) {
        errors.contactsData = "Contact is required";
      }
      if (messageType === 'template' && !values.message) {
        errors.message = 'Template is required';
      }

      if (messageType === 'own' && !values.message) {
        errors.message = 'Message is required';
      }
      if (values.reletedTo === 'Other' && numbers?.length === 0) {
        errors.number = "Number is required"
        setErr("Number is required")
      }

      return errors;
    },
    onSubmit: async (values) => {
      addsMS(values)

    },
  });
  const handleInputChange = (e) => {
    setNumbersInput(e.target.value)
  }

  const addTagsButton = (e) => {
    e.preventDefault();
    const regex = /^(0)?[0-9]{9,14}$/;

    if (numbersInput !== '') {
      if (regex.test(numbersInput)) {
        if (numbers?.find(phone => phone === numbersInput)) {
          setErr("Number is already exists");
        } else {
          setNumbers([...numbers, numbersInput]);
          setNumbersInput('');
          setErr("");
        }
      } else {
        setErr("Number not valid");
      }
    }
  };

  const removeTag = (index) => {
    const newTags = [...numbers];
    newTags.splice(index, 1);
    setNumbers(newTags);
  };
  const handleMessageTypeChange = (e) => {
    setMessageType(e.target.value);
    formik.setFieldValue('message', '');
  };

  useEffect(() => {
    if (LeadData?.length === 0) {
      dispatch(fetchLeadData())
    }
    if (contactsData?.length === 0) {
      dispatch(fetchContactData());
    }
    if (smsTempleteData?.length === 0) {
      dispatch(fetchSmsTemplateData())
    }
  }, [open])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Typography variant="h6">Add New</Typography>
          <Typography>
            <ClearIcon
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={12} >
                  <FormControl fullWidth>
                    <FormLabel>Releted To <span style={{ color: "red" }}>*</span></FormLabel>
                    <RadioGroup row name="reletedTo" onChange={formik.handleChange} value={formik.values.reletedTo} defaultValue={"Lead"}>
                      <FormControlLabel value="Lead" control={<Radio />} label="Lead" />
                      <FormControlLabel value="Contact" control={<Radio />} label="Contact" />
                      <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.reletedTo && formik.errors.reletedTo}</FormHelperText>
                  </FormControl>
                </Grid>
                {formik.values.reletedTo === 'Lead' &&
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Lead <span style={{ color: "red" }}>*</span></FormLabel>
                    <Autocomplete
                      multiple
                      limitTags={2}
                      size="small"
                      name="leadsData"
                      id="multiple-limit-tags"
                      options={LeadData}
                      getOptionLabel={(option) => `${option.title} ${option.firstName} ${option.lastName}`}
                      onChange={(e, value) => formik.setFieldValue("leadsData", value || "")}
                      renderInput={(params) => (
                        <TextField {...params}
                          name='leadsData'
                          error={
                            formik.touched.leadsData &&
                            Boolean(formik.errors.leadsData)
                          }
                          helperText={
                            formik.touched.leadsData && formik.errors.leadsData
                          }

                        />
                      )}
                    />
                  </Grid>}
                {formik.values.reletedTo === 'Contact' &&
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Contact <span style={{ color: "red" }}>*</span></FormLabel>
                    <Autocomplete
                      multiple
                      limitTags={2}
                      size="small"
                      name="contactsData"
                      id="multiple-limit-tags"
                      options={contactsData}
                      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                      onChange={(e, value) => formik.setFieldValue("contactsData", value || "")}
                      renderInput={(params) => (
                        <TextField {...params}
                          name='contactsData'
                          error={
                            formik.touched.contactsData &&
                            Boolean(formik.errors.contactsData)
                          }
                          helperText={
                            formik.touched.contactsData && formik.errors.contactsData
                          }

                        />
                      )}
                    />
                  </Grid>}
                {formik.values.reletedTo === 'Other' &&
                  <>

                    <Grid item xs={12}>
                      <ul id='tags' style={{ display: "flex", flexWrap: "wrap", width: "100%", border: numbers.length > 0 ? '1px solid #dce0e4' : '0', padding: numbers.length > 0 ? '5px' : '0' }}>
                        {numbers.map((tag, index) => (
                          <li key={index} style={{ display: "flex", listStyle: "none", margin: "0 5px 5px 5px", backgroundColor: "grey", padding: "2px 5px 2px 8px", borderRadius: "20px", color: "#fff", fontSize: "14px", alignItems: "center" }}>
                            <span >{tag}</span>
                            <CloseIcon style={{ fontSize: "14px", color: "#fff", marginLeft: "5px", cursor: "pointer" }} onClick={event => removeTag(index)} />
                          </li>
                        ))}
                      </ul>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        name='addNumber'
                        type='text'
                        size='small'
                        fullWidth
                        value={numbersInput}
                        placeholder='Add Number'
                        onChange={(e) => { handleInputChange(e) }}
                        error={
                          formik.touched.addNumber &&
                          Boolean(formik.errors.addNumber)
                        }
                        helperText={
                          formik.touched.addNumber && formik.errors.addNumber
                        }
                      />
                    </Grid>

                    <Grid item xs={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>

                      <AddCircleOutlineIcon onClick={event => addTagsButton(event)} style={{ fontSize: "30px", cursor: "pointer" }} />
                    </Grid>
                    <Grid item xs={12} style={{ color: "red", paddingTop: "4px", fontSize: "13px" }} >
                      {/* {err} */}
                      {formik.touched.number && (err || formik.errors.number)}
                    </Grid>
                  </>}
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Message <span style={{ color: "red" }}>*</span></FormLabel>
                  <RadioGroup
                    row
                    name="messageType"
                    value={messageType}
                    onChange={handleMessageTypeChange}
                  >
                    <FormControlLabel value="own" control={<Radio />} label="Own" />
                    <FormControlLabel value="template" control={<Radio />} label="Template" />
                  </RadioGroup>
                </Grid>
                {messageType === 'template' && (
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl fullWidth>
                      <Autocomplete
                        size="small"
                        name="message"
                        onChange={(e, value) => formik.setFieldValue("message", value ? value?.message : "")}
                        onBlur={formik.handleBlur}
                        id="multiple-limit-tags"
                        options={smsTempleteData}
                        value={smsTempleteData?.find((smsTemp) => smsTemp?.message === formik.values.message)}
                        getOptionLabel={(option) => option?.name}
                        renderInput={(params) => (
                          <TextField {...params}
                            error={
                              Boolean(formik.touched.message) &&
                              formik.errors.message
                            }
                            helperText={
                              formik.touched.message && formik.errors.message
                            }

                          />
                        )}
                      />

                    </FormControl>
                  </Grid>
                )}
                {messageType === 'own' && (
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      id="message"
                      name="message"
                      label=""
                      size='small'
                      multiline
                      rows={5}
                      fullWidth
                      onBlur={formik.handleBlur}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.message &&
                        Boolean(formik.errors.message)
                      }
                      helperText={
                        formik.touched.message && formik.errors.message
                      }
                    />
                  </Grid>
                )}
              </Grid>

            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={formik.handleSubmit} variant='contained' color='primary' disabled={!!isLoading}>
            {isLoading ? <CircularProgress size={27} /> : 'Save'}
          </LoadingButton>
          <Button onClick={() => {
            formik.resetForm()
            handleClose()
          }} variant='outlined' color='error'>Cancle</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Add