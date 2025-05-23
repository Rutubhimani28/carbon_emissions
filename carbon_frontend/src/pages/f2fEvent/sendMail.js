import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  CircularProgress,
  DialogContentText,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { apipost } from '../../service/api';

const SendMail = (props) => {
  const { open, close, setUserAction, datas, setOpen, chatSuggestion } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [messageType, setMessageType] = useState('template');
  const [emailInput, setEmailInput] = useState('');

  const userid = sessionStorage.getItem('user_id');
  const userEmail = JSON.parse(sessionStorage.getItem('user'));

  const toolData = useSelector((state) => state.toolDetails?.data);
  const toolFormData = toolData.find((item) => item?.type === 'toolForm');
  const resultTableData = useSelector((state) => state.resultTableDataDetails);

  // -----------  validationSchema
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    addEmail: yup.string().email('Email not valid'),
  });

  // -----------   initialValues
  const initialValues = {
    subject: toolFormData?.activityName,
    // receiver: userEmail,
    receiver: toolFormData?.email,
    sender: userid,
    // emails: [],
    emails: [`${toolFormData?.email}`],
    addEmail: '',
    isAttachment: true, // attach filled fields value as pdf attachment
  };

  const handleCancel = () => {
    formik.resetForm();
    // formik.setFieldValue('emails', []);
    formik.setFieldValue('emails', formik.values?.[0]);
    setEmailInput('');
    formik.setFieldError('addEmail', '');
    close();
  };

  // add email api
  const addEmail = async (values) => {
    setIsLoading(true);

    try {
      const data = {
        subject: `Total Carbon Footprint generated from your ${values?.subject} activity`,
        receiver: values?.emails,
        data: datas,
        sender: values?.sender,
        // templateName: "event_grand_total_result_Template",
        emailBodyTemplateName: 'f2f_event_grand_total_result_Template',
        attachmentTemplateName: 'f2f_event_filled_fields_Template',
        attachmentPdfName: `F2F Event- ${values?.subject}`,
        activityName: toolFormData?.activityName,
        name: toolFormData?.name,
        totalTonCo2: (datas?.grandTotal / 1000).toFixed(2) || 0,
        eveydolarCo2: (datas?.grandTotal / toolFormData?.budget).toFixed(2) || 0,
        resultTableData: resultTableData?.data?.find((item) => item.from === 'f2fEvent'),
        chatSuggestion,
      };

      const result = await apipost('api/email/add', data);
      setUserAction(result);

      if (result && result.status === 201) {
        formik.resetForm();
        close();
        setOpen(false);
        // setEmails([])
        formik.setFieldValue('emails', []);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    validate: (values) => {
      const errors = {};
      if (!Object.prototype.hasOwnProperty.call(formik.errors, 'addEmail') && values.emails.length < 1) {
        errors.addEmail = 'Add at least one email';
      }

      if (values.addEmail && values.emails.includes(values.addEmail)) {
        errors.addEmail = 'Email already exists';
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (!formik.isValid) {
        return;
      }
      addEmail(values);
    },
  });

  const handleInputChange = (e) => {
    setEmailInput(e.target.value);
    formik.setFieldValue('addEmail', e.target.value);
  };

  const addTagsButton = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailInput !== '') {
      if (regex.test(emailInput)) {
        // Check if email already exists in the list
        if (formik.values?.emails?.find((email) => email === emailInput)) {
          formik.setFieldError('addEmail', 'Email already exists');
          formik.setFieldTouched('addEmail', true);
        } else {
          // Add email to the list
          formik.setFieldValue('emails', [...formik.values?.emails, emailInput]);
          setEmailInput('');
          formik.setFieldValue('addEmail', '');
          formik.setFieldError('addEmail', '');
          formik.setFieldTouched('addEmail', true);
        }
      }
    }
  };

  const removeTag = (index) => {
    // const newTags = [...emails];
    const newTags = [...formik.values?.emails];
    newTags.splice(index, 1);
    // setEmails(newTags);
    formik.setFieldValue('emails', newTags);
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        {/* <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h6">Add New </Typography>
                    <Typography>
                        <ClearIcon
                            onClick={() => {
                                formik.resetForm()
                                close()
                            }}
                            style={{ cursor: "pointer" }}
                        />
                    </Typography>
                </DialogTitle> */}

        {/* <DialogContent dividers> */}
        <DialogContent>
          <Typography>
            <ClearIcon
              onClick={() => {
                formik.resetForm();
                close();
              }}
              style={{ cursor: 'pointer', float: 'right' }}
            />
          </Typography>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12} className="pt-0">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Subject <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <TextField
                    id="subject"
                    name="subject"
                    label=""
                    fullWidth
                    size="small"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    disabled
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Email <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="emails"
                                        name="emails"
                                        label=""
                                        fullWidth
                                        size="small"
                                        disabled
                                        // value={formik.values.emails[0]}
                                        value={formik.values.emails[0]}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.emails &&
                                            Boolean(formik.errors.emails)
                                        }
                                        helperText={
                                            formik.touched.emails && formik.errors.emails
                                        }
                                    />
                                </Grid> */}
                <Grid item xs={12}>
                  <ul
                    id="tags"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      width: '100%',
                      border: formik.values.emails?.length > 0 ? '1px solid #dce0e4' : '0',
                      padding: formik.values.emails?.length > 0 ? '5px' : '0',
                    }}
                  >
                    {formik.values.emails?.map((tag, index) => (
                      <li
                        key={index}
                        style={{
                          display: 'flex',
                          listStyle: 'none',
                          margin: '0 5px 5px 5px',
                          backgroundColor: 'grey',
                          padding: '2px 5px 2px 8px',
                          borderRadius: '20px',
                          color: '#fff',
                          fontSize: '14px',
                          alignItems: 'center',
                        }}
                      >
                        <span>{tag}</span>
                        {index === 0 ? (
                          ''
                        ) : (
                          <CloseIcon
                            style={{ fontSize: '14px', color: '#fff', marginLeft: '5px', cursor: 'pointer' }}
                            onClick={(event) => removeTag(index)}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    name="addEmail"
                    type="text"
                    size="small"
                    fullWidth
                    value={emailInput}
                    placeholder="Add Email"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    error={formik.touched.addEmail && Boolean(formik.errors.addEmail)}
                    helperText={formik.touched.addEmail && formik.errors.addEmail}
                  />
                </Grid>
                <Grid item xs={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <AddCircleOutlineIcon
                    onClick={(event) => addTagsButton(event)}
                    style={{ fontSize: '30px', cursor: 'pointer' }}
                  />
                </Grid>
                <Grid item xs={12} style={{ color: 'red', paddingTop: '4px', fontSize: '13px' }}>
                  {/* err */}
                  {/* {formik.touched.number && (err || formik.errors.number)} */}
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>

        <DialogActions>
          <LoadingButton
            onClick={formik.handleSubmit}
            variant="contained"
            color="primary"
            disabled={!!isLoading}
            className="custom-btn me-2"
          >
            {isLoading ? <CircularProgress size={27} /> : 'Send'}
          </LoadingButton>
          {/* <Button
                        type="reset"
                        variant="outlined"
                        style={{ textTransform: "capitalize" }}
                        color="error"
                        onClick={() => {
                            handleCancel()
                        }}
                    >
                        Cancle
                    </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SendMail;
