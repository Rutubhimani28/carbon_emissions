import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Checkbox, CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { ClearIcon } from '@mui/x-date-pickers';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { fetchSmsTemplateData } from '../redux/slice/smsTemplateSlice';

export default function CustomizedDialogs(props) {
  const { open, onClose, sendSMS, ids, isLoading } = props;

  const [err, setErr] = useState('')
  const [messageType, setMessageType] = useState("own");
  const [numbers, setNumbers] = useState([])
  const [numbersInput, setNumbersInput] = useState('')
  const [check, setCheck] = useState(false)
  const dispatch = useDispatch()

  const smsTempList = useSelector((state) => state?.smsTempDetails?.data)

  const initialValues = {
    ids: [...ids],
    message: "",
    addNumber: "",
  }

  const validationSchema = yup.object({
    message: yup.string().required("Message is required"),
    addNumber: yup.string().notRequired().matches(/^[0-9]{10}$/, 'Number is invalid'),

  });

  // formik
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        ids: values?.ids,
        otherNumbers: numbers,
        message: values?.message
      }
      handleSubmit(payload)
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
        setNumbers([...numbers, numbersInput]);
        setNumbersInput('');
        setErr("");
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

  const handleSubmit = (payload) => {
    sendSMS(payload)
    formik.resetForm()
  }

  const handleClose = () => {
    formik.resetForm();
    onClose();
    setNumbers([]);
    setNumbersInput('');
    setErr("");
  };

  const handleMessageTypeChange = (e) => {
    setMessageType(e.target.value);
    formik.setFieldValue('message', '');
    formik.setFieldValue('html', '');
  };


  useEffect(() => {
    if (smsTempList?.length === 0) {
      dispatch(fetchSmsTemplateData())
    }
  }, [open])


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
          <Typography variant="h6">Send SMS</Typography>
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
                rowSpacing={2}
              // columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              >
                <Grid item xs={10}>
                  <ul id='tags' style={{ display: "flex", flexWrap: "wrap", width: "300px" }}>
                    {numbers.map((tag, index) => (
                      <li key={index} style={{ display: "flex", listStyle: "none", margin: "0 5px 5px 5px", backgroundColor: "grey", padding: "2px 5px 2px 8px", borderRadius: "20px", color: "#fff", fontSize: "14px", alignItems: "center" }}>
                        <span >{tag}</span>
                        <CloseIcon style={{ fontSize: "14px", color: "#fff", marginLeft: "5px", cursor: "pointer" }} onClick={event => removeTag(index)} />
                      </li>
                    ))}
                  </ul>
                </Grid>
                {
                  check && (
                    <>
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
                        {err}
                      </Grid>
                    </>
                  )
                }

                {/* <Grid item xs={11}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={(e) => setCheck(e.target.checked)} />} label="Send SMS to Other Person" />
                  </FormGroup>
                </Grid> */}
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
                        id="combo-box-demo"
                        fullWidth
                        options={smsTempList}
                        getOptionLabel={(item) => item?.name}
                        value={smsTempList?.find((item) => item?.message === formik.values.message)}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("message", newValue ? newValue?.message : "");
                        }}
                        renderInput={(params) =>
                          <TextField {...params}
                            size="small"
                            name='message'
                            error={formik.touched.message && Boolean(formik.errors.message)}
                            helperText={formik.touched.message && formik.errors.message}
                            placeholder='Select'
                          />}
                      />
                    </FormControl>

                  </Grid>
                )}
                {messageType === 'own' && (
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Message</FormLabel>
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
          <Stack direction="row" spacing={2}>
            <LoadingButton onClick={formik.handleSubmit} variant='contained' color='secondary' disabled={!!isLoading}>
              {isLoading ? <CircularProgress size={27} /> : 'Send'}
            </LoadingButton>
            <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
