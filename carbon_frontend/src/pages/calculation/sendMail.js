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
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { apipost } from "../../service/api";

const SendMail = (props) => {
    const { open, close, setUserAction } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [emails, setEmails] = useState([])
    const [err, setErr] = useState('')
    const [messageType, setMessageType] = useState("template");
    const [emailInput, setEmailInput] = useState('')

    const userid = sessionStorage.getItem('user_id');


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
                close();
                setEmails([])
            }

        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    };

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addEmail(values);
        }
    });


    const handleInputChange = (e) => {
        setEmailInput(e.target.value)
    }

    const addTagsButton = (e) => {
        e.preventDefault();
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailInput !== '') {
            if (regex.test(emailInput)) {
                if (emails?.find(email => email === emailInput)) {
                    setErr("email is already exists");
                } else {
                    setEmails([...emails, emailInput]);
                    setEmailInput('');
                    setErr("");
                }
            } else {
                setErr("email not valid");
            }
        }
    };

    const removeTag = (index) => {
        const newTags = [...emails];
        newTags.splice(index, 1);
        setEmails(newTags);
    };
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
                                close()
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
                                <Grid item xs={12}>
                                    <ul id='tags' style={{ display: "flex", flexWrap: "wrap", width: "100%", border: emails?.length > 0 ? '1px solid #dce0e4' : '0', padding: emails?.length > 0 ? '5px' : '0' }}>
                                        {emails?.map((tag, index) => (
                                            <li key={index} style={{ display: "flex", listStyle: "none", margin: "0 5px 5px 5px", backgroundColor: "grey", padding: "2px 5px 2px 8px", borderRadius: "20px", color: "#fff", fontSize: "14px", alignItems: "center" }}>
                                                <span >{tag}</span>
                                                <CloseIcon style={{ fontSize: "14px", color: "#fff", marginLeft: "5px", cursor: "pointer" }} onClick={event => removeTag(index)} />
                                            </li>
                                        ))}
                                    </ul>
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField
                                        name='addEmail'
                                        type='text'
                                        size='small'
                                        fullWidth
                                        value={emailInput}
                                        placeholder='Add Email'
                                        onChange={(e) => { handleInputChange(e) }}
                                        error={
                                            formik.touched.addEmail &&
                                            Boolean(formik.errors.addEmail)
                                        }
                                        helperText={
                                            formik.touched.addEmail && formik.errors.addEmail
                                        }
                                    />
                                </Grid>
                                <Grid item xs={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>

                                    <AddCircleOutlineIcon onClick={event => addTagsButton(event)} style={{ fontSize: "30px", cursor: "pointer" }} />
                                </Grid>
                                <Grid item xs={12} style={{ color: "red", paddingTop: "4px", fontSize: "13px" }} >
                                    {err}
                                    {/* {formik.touched.number && (err || formik.errors.number)} */}
                                </Grid>
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
                            close()
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SendMail