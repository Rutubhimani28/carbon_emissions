/* eslint-disable react/prop-types */
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import * as yup from "yup";
// eslint-disable-next-line import/no-unresolved
import { LoadingButton } from "@mui/lab";
import { Autocomplete, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { apipost } from "../../service/api";
import { fetchTemplateData } from "../../redux/slice/emailTemplateSlice";

const Addemail = (props) => {
    const { open, handleClose, _id, setUserAction, receiver, module } = props
    const dispatch = useDispatch()
    const [messageType, setMessageType] = useState("template");
    const [isLoading, setIsLoading] = useState(false);

    const emailTemplateData = useSelector((state) => state?.tempDetails?.data)

    const user = JSON.parse(sessionStorage.getItem('user'))

    // -----------  validationSchema
    const validationSchema = yup.object({
        subject: yup.string().required("Subject is required"),
        receiver: yup.string().email().required("Receiver is required"),
    });

    // -----------   initialValues
    const initialValues = {
        sender: user?._id,
        subject: "",
        receiver: receiver?.emailAddress,
        message: "",
        lead_id: module === "Lead" ? _id : "",
        contact_id: module === "Contact" ? _id : "",
        createdBy: user?._id,
        html: "",
    };

    // add email api
    const addEmail = async (values) => {
        setIsLoading(true)

        try {
            const data = values;
            const result = await apipost('email/add', data)
            setUserAction(result)
        } catch (error) {
            console.log(error);
        }
        handleClose();
        formik.resetForm();
        setIsLoading(false)
    }
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
            return errors;
        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            addEmail(values);
            resetForm();
        },
    });

    const handleMessageTypeChange = (e) => {
        setMessageType(e.target.value);
        formik.setFieldValue('message', '');
        formik.setFieldValue('html', '');
    };

    useEffect(() => {
        if (emailTemplateData.length === 0) {
            dispatch(fetchTemplateData())
        }
    }, [open]);
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
                    <Typography variant="h6">Email </Typography>
                    <Typography>
                        <ClearIcon
                            onClick={() => {
                                formik.resetForm();
                                handleClose();
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
                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Receiver</FormLabel>
                                    <TextField
                                        id="receiver"
                                        name="receiver"
                                        size="small"
                                        fullWidth
                                        disabled
                                        value={formik.values.receiver}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.receiver &&
                                            Boolean(formik.errors.receiver)
                                        }
                                        helperText={
                                            formik.touched.receiver && formik.errors.receiver
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Subject</FormLabel>
                                    <TextField
                                        id="subject"
                                        name="subject"
                                        size="small"
                                        fullWidth
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
                                    <FormLabel>Message</FormLabel>
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
                    <LoadingButton onClick={formik.handleSubmit} variant='contained' color='secondary' disabled={!!isLoading}>
                        {isLoading ? <CircularProgress size={27} /> : 'Save'}
                    </LoadingButton>
                    <Button
                        type="reset"
                        variant="outlined"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                            formik.resetForm()
                            handleClose()
                        }}
                        color="error"
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Addemail