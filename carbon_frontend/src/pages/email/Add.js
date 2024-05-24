import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, CircularProgress, DialogContentText, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { fetchContactData } from "../../redux/slice/contactSlice";
import { fetchTemplateData } from "../../redux/slice/emailTemplateSlice";
import { fetchLeadData } from "../../redux/slice/leadSlice";
import { apipost } from "../../service/api";

const Add = (props) => {
    const { open, handleClose, setUserAction } = props;
    const [isLoading, setIsLoading] = useState(false);

    const [messageType, setMessageType] = useState("template");
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    const dispatch = useDispatch();
    const leadData = useSelector((state) => state?.leadDetails?.data)
    const contactData = useSelector((state) => state?.contactDetails?.data)
    const emailTemplateData = useSelector((state) => state?.tempDetails?.data)

    // -----------  validationSchema
    const validationSchema = yup.object({
        relatedTo: yup.string().required("Related To is required"),
        subject: yup.string().required("Subject is required"),
        receiver: yup.string().required("Receiver is required"),
    });

    // -----------   initialValues
    const initialValues = {
        relatedTo: "Lead",
        subject: "",
        message: "",
        receiver: "",
        sender: userid,
        lead_id: "",
        contact_id: "",
        html: "",
        createdBy: userid,
    };

    // add email api
    const addEmail = async (values) => {
        setIsLoading(true)

        try {
            const data = values;
            const result = await apipost('email/add', data)
            setUserAction(result)

            if (result && result.status === 201) {
                formik.resetForm();
                handleClose();
            }

        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)

    };

    const handleMessageTypeChange = (e) => {
        setMessageType(e.target.value);
        formik.setFieldValue('message', '');
        formik.setFieldValue('html', '');
    };

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        validate: (values) => {
            const errors = {};
            if (messageType === 'own' && !values.message) {
                errors.message = 'Message is required';
            } else if (messageType === 'template' && !values.html) {
                errors.html = 'Template is required';
            }

            if (values.relatedTo === "Lead" && ["", null, undefined].includes(values.lead_id)) {
                errors.lead_id = "Receiver (Lead) is required";
            } else if (values.relatedTo === "Contact" && ["", null, undefined].includes(values.contact_id)) {
                errors.contact_id = "Receiver (Contact) is required";
            }
            return errors;
        },
        onSubmit: async (values) => {
            addEmail(values);
        }
    });

    useEffect(() => {
        formik.setFieldValue("lead_id", "");
        formik.setFieldValue("contact_id", "");
        formik.setFieldValue("receiver", "");
    }, [formik.values.relatedTo]);


    useEffect(() => {
        if (leadData?.length === 0) {
            dispatch(fetchLeadData())
        }
        if (contactData?.length === 0) {
            dispatch(fetchContactData())
        }
        if (emailTemplateData?.length === 0) {
            dispatch(fetchTemplateData())
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
                    <Typography variant="h6">Add New </Typography>
                    <Typography>
                        <ClearIcon
                            onClick={() => {
                                formik.resetForm()
                                handleClose()
                            }}
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
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormControl>
                                        <FormLabel>Related To <span style={{ color: "red" }}>*</span></FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="relatedTo"
                                            value={formik.values.relatedTo}
                                            error={formik.touched.relatedTo && Boolean(formik.errors.relatedTo)}
                                            onChange={formik.handleChange}
                                        >
                                            <FormControlLabel value="Lead" control={<Radio />} label="Lead" />
                                            <FormControlLabel value="Contact" control={<Radio />} label="Contact" />
                                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                        <FormHelperText
                                            error={
                                                formik.touched.relatedTo && Boolean(formik.errors.relatedTo)
                                            }
                                        >
                                            {formik.touched.relatedTo && formik.errors.relatedTo}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                {
                                    formik.values.relatedTo === "Lead" &&
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Receiver (Lead) <span style={{ color: "red" }}>*</span></FormLabel>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                id="lead-autocomplete"
                                                options={leadData}
                                                getOptionLabel={(lead) => `${lead.firstName} ${lead.lastName}`}
                                                value={leadData.find(lead => lead._id === formik.values.lead_id) || null}
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue("lead_id", newValue ? newValue?._id : "");
                                                    formik.setFieldValue("receiver", newValue ? newValue?.emailAddress : "");
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        size="small"
                                                        error={formik.touched.lead_id && Boolean(formik.errors.lead_id)}
                                                        helperText={formik.touched.lead_id && formik.errors.lead_id}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                }
                                {
                                    formik.values.relatedTo === "Contact" &&
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Receiver (Contact) <span style={{ color: "red" }}>*</span></FormLabel>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                id="contact-autocomplete"
                                                options={contactData}
                                                getOptionLabel={(contact) => `${contact.firstName} ${contact.lastName}`}
                                                value={contactData.find(contact => contact._id === formik.values.contact_id) || null}
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue("contact_id", newValue ? newValue?._id : "");
                                                    formik.setFieldValue("receiver", newValue ? newValue?.emailAddress : "");
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        size="small"
                                                        error={formik.touched.contact_id && Boolean(formik.errors.contact_id)}
                                                        helperText={formik.touched.contact_id && formik.errors.contact_id}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                }
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Subject <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="subject"
                                        name="subject"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.subject}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.subject &&
                                            Boolean(formik.errors.subject)
                                        }
                                        helperText={
                                            formik.touched.subject && formik.errors.subject
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Receiver <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        name='receiver'
                                        size='small'
                                        fullWidth
                                        disabled={formik.values.relatedTo !== "Other"}
                                        value={formik.values.receiver}
                                        onChange={formik.handleChange}
                                        error={formik.touched.receiver && Boolean(formik.errors.receiver)}
                                        helperText={formik.touched.receiver && formik.errors.receiver}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Message <span style={{ color: "red" }}>*</span></FormLabel>
                                    <RadioGroup
                                        row
                                        name="messageType"
                                        value={messageType}
                                        onChange={handleMessageTypeChange}
                                    >
                                        <FormControlLabel value="template" control={<Radio />} label="Template" />
                                        <FormControlLabel value="own" control={<Radio />} label="Own" />
                                    </RadioGroup>
                                </Grid>
                                {messageType === 'template' && (
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                id="lead-autocomplete"
                                                options={emailTemplateData}
                                                getOptionLabel={(template) => template?.name}
                                                value={emailTemplateData.find(template => template?.html === formik.values.html) || null}
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue("html", newValue ? newValue?.html : "");
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        size="small"
                                                        name="html"
                                                        error={formik.touched.html && Boolean(formik.errors.html)}
                                                        helperText={formik.touched.html && formik.errors.html}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                )}
                                {messageType === 'own' && (
                                    <Grid item xs={12} sm={12} md={12}>
                                        {/* <FormLabel>Message</FormLabel> */}
                                        <ReactQuill
                                            name="message"
                                            value={formik.values.message}
                                            onChange={(value) => formik.setFieldValue('message', value)}
                                            disabled={messageType === 'template'}
                                        />
                                        <FormHelperText error={formik.touched.message && Boolean(formik.errors.message)}>
                                            {formik.touched.message && formik.errors.message}
                                        </FormHelperText>
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