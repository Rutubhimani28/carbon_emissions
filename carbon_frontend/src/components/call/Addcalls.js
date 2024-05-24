/* eslint-disable react/prop-types */
import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import moment from "moment";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { fetchContactData } from "../../redux/slice/contactSlice";
import { fetchLeadData } from "../../redux/slice/leadSlice";
import { apipost } from "../../service/api";

const Addcalls = (props) => {
    const { open, handleClose, _id, setUserAction, type } = props
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch()

    const leadData = useSelector((state) => state?.leadDetails?.data)
    const contactData = useSelector((state) => state?.contactDetails?.data)

    const userRole = sessionStorage.getItem("userRole");
    const userid = sessionStorage.getItem('user_id')
    const today = new Date().toISOString().split('.')[0];

    // -----------  validationSchema
    const validationSchema = yup.object({
        subject: yup.string().required("Subject is required"),
        status: yup.string().required("Status is required"),
        startDateTime: yup.string().required("Start Date & Time is required"),
        duration: yup.string().required("Duration is required"),
        relatedTo: yup.string().required("Related To is required"),
        note: yup.string().required("Note is required"),

    });

    // -----------   initialValues
    const initialValues = {
        subject: "",
        status: "",
        startDateTime: "",
        duration: "",
        relatedTo: "Lead",
        note: "",
        createdBy: userid,
        lead_id: _id,
        contact_id: _id,
    };

    // add call api
    const addCall = async (values) => {
        setIsLoading(true)
        try {
            const data = values;
            const result = await apipost('call/add', data)
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
        validate: (values) => {
            const errors = {}
            if (values.relatedTo === "Lead" && ["", null, undefined].includes(values.lead_id)) {
                errors.lead_id = "Related To Lead is required";
            }
            if (values.relatedTo === "Contact" && ["", null, undefined].includes(values.contact_id)) {
                errors.contact_id = "Related To Contact is required";
            }

            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            addCall(values)
            resetForm();
        },
    });

    useEffect(() => {
        if (leadData?.length === 0) {
            dispatch(fetchLeadData())
        }
        if (contactData?.length === 0) {
            dispatch(fetchContactData())
        }
    }, [open])

    useEffect(() => {
        if (type) {
            formik.setFieldValue("relatedTo", type === "lead" ? "Lead" : "Contact")
        }
    }, [type, open])

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
                    <Typography variant="h6">Create Call </Typography>
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
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormControl>
                                        <FormLabel>Related To <span style={{ color: "red" }}>*</span></FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="relatedTo"
                                            value={formik.values.relatedTo || "Lead"}
                                            error={formik.touched.relatedTo && Boolean(formik.errors.relatedTo)}
                                            onChange={formik.handleChange}
                                        >
                                            <FormControlLabel value="Lead" control={<Radio disabled={type === "contact"} />} label="Lead" />
                                            <FormControlLabel value="Contact" control={<Radio disabled={type === "lead"} />} label="Contact" />
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
                                    <Grid item xs={12} sm={12}>
                                        <FormLabel>Related To Lead <span style={{ color: "red" }}>*</span></FormLabel>
                                        <Autocomplete
                                            id="lead-autocomplete"
                                            options={leadData}
                                            getOptionLabel={(lead) => `${lead.firstName} ${lead.lastName}`}
                                            value={leadData?.find(lead => lead._id === formik.values.lead_id) || null}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("lead_id", newValue ? newValue._id : "");
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
                                    </Grid>
                                }
                                {
                                    formik.values.relatedTo === "Contact" &&
                                    <Grid item xs={12} sm={12}>
                                        <FormLabel>Related To Contact <span style={{ color: "red" }}>*</span></FormLabel>
                                        <Autocomplete
                                            id="contact-autocomplete"
                                            options={contactData}
                                            getOptionLabel={(contact) => `${contact.firstName} ${contact.lastName}`}
                                            value={contactData.find(contact => contact._id === formik.values.contact_id) || null}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("contact_id", newValue ? newValue._id : "");
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
                                    </Grid>
                                }
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Subject <span style={{ color: "red" }}>*</span></FormLabel>
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
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Status <span style={{ color: "red" }}>*</span></FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="status"
                                            name="status"
                                            size="small"
                                            value={formik.values.status}
                                            onChange={formik.handleChange}
                                            error={formik.touched.status && Boolean(formik.errors.status)}
                                        >
                                            <MenuItem value="Planned">Planned</MenuItem>
                                            <MenuItem value="Held">Held</MenuItem>
                                            <MenuItem value="Not Held">Not Held</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.status && Boolean(formik.errors.status)
                                            }
                                        >
                                            {formik.touched.status && formik.errors.status}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Start Date & Time <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="startDateTime"
                                        name="startDateTime"
                                        size="small"
                                        type="datetime-local"
                                        fullWidth
                                        inputProps={{
                                            min: moment(today).format('YYYY-MM-DD HH:mm')
                                        }}
                                        value={formik.values.startDateTime}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.startDateTime &&
                                            Boolean(formik.errors.startDateTime)
                                        }
                                        helperText={
                                            formik.touched.startDateTime && formik.errors.startDateTime
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Duration <span style={{ color: "red" }}>*</span></FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="duration"
                                            name="duration"
                                            size="small"
                                            value={formik.values.duration}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                                        >
                                            <MenuItem value="15 minutes">15 minutes</MenuItem>
                                            <MenuItem value="30 minutes">30 minutes</MenuItem>
                                            <MenuItem value="45 minutes">45 minutes</MenuItem>
                                            <MenuItem value="1 hour">1 hour</MenuItem>
                                            <MenuItem value="1.5 hours">1.5 hours</MenuItem>
                                            <MenuItem value="2 hours">2 hours</MenuItem>
                                            <MenuItem value="3 hours">3 hours</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.duration && Boolean(formik.errors.duration)
                                            }
                                        >
                                            {formik.touched.duration && formik.errors.duration}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Note <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="note"
                                        name="note"
                                        size="small"
                                        fullWidth
                                        rows={4}
                                        multiline
                                        value={formik.values.note}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.note &&
                                            Boolean(formik.errors.note)
                                        }
                                        helperText={
                                            formik.touched.note && formik.errors.note
                                        }
                                    />
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

export default Addcalls