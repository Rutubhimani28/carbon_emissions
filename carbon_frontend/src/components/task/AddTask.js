import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import moment from "moment";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { fetchContactData } from "../../redux/slice/contactSlice";
import { fetchLeadData } from "../../redux/slice/leadSlice";
import { fetchUserData } from "../../redux/slice/userSlice";
import { apipost } from "../../service/api";


const AddEvent = ({ open, handleClose, setUserAction, _id, type }) => {

    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch()
    const userid = sessionStorage.getItem('user_id')
    const userRole = sessionStorage.getItem("userRole");
    const userdata = JSON.parse(sessionStorage.getItem('user'));
    const userDetails = useSelector((state) => state?.userDetails?.data)
    const leadData = useSelector((state) => state?.leadDetails?.data)
    const contactData = useSelector((state) => state?.contactDetails?.data)
    const today = new Date().toISOString().split('.')[0];

    const validationSchema = yup.object({
        subject: yup.string().required("Subject is required"),
        status: yup.string().required("Status is required"),
        startDate: yup.string().required("Start Date is required"),
        endDate: yup.string().required("End Date is required"),
        priority: yup.string().required("Priority is required"),
        note: yup.string().required("Note is required"),
    });

    const initialValues = {
        subject: "",
        status: "",
        startDate: "",
        endDate: "",
        relatedTo: type === "lead" ? "Lead" : type === "contact" ? "Contact" : "",
        assignTo: null,
        backgroundColor: "",
        textColor: "",
        priority: "",
        note: "",
        lead_id: _id,
        contact_id: _id,
        createdBy: userid

    }
    const addTask = async (values) => {
        setIsLoading(true)
        try {
            const data = values
            const result = await apipost('task/add', data)
            setUserAction(result)
            if (result && result.status === 201) {
                handleClose()
                formik.resetForm();
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
        enableReinitialize: true,
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
        onSubmit: async (values) => {
            addTask(values)
        },
    });

    useEffect(() => {
        if (leadData?.length === 0) {
            dispatch(fetchLeadData())
        }
        if (contactData?.length === 0) {
            dispatch(fetchContactData())
        }
        if (userDetails?.length === 0) {
            dispatch(fetchUserData())
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
                    <Typography variant="h6">Create Task </Typography>
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
                                            value={formik.values.relatedTo || "None"}
                                            error={formik.touched.relatedTo && Boolean(formik.errors.relatedTo)}
                                            onChange={formik.handleChange}
                                        >
                                            <FormControlLabel value="None" control={<Radio disabled={type === "contact" || type === "lead"} />} label="None" />
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
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Related To Lead <span style={{ color: "red" }}>*</span></FormLabel>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                id="lead-autocomplete"
                                                options={leadData}
                                                getOptionLabel={(lead) => `${lead.firstName} ${lead.lastName}`}
                                                value={leadData.find(lead => lead._id === formik.values.lead_id) || null}
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue("lead_id", newValue ? newValue._id : "");
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        size="small"
                                                        name="lead_id"
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
                                        <FormLabel id="demo-row-radio-buttons-group-label">Related To Contact <span style={{ color: "red" }}>*</span></FormLabel>
                                        <FormControl fullWidth>
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
                                                        name="contact_id"
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

                                <Grid item xs={12} sm={4}>
                                    <FormLabel>Status <span style={{ color: "red" }}>*</span></FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="status"
                                            label=""
                                            size="small"
                                            value={formik.values.status || null}
                                            onChange={formik.handleChange}
                                            error={formik.touched.status && Boolean(formik.errors.status)}
                                        >
                                            <MenuItem value="Note Started">Note Started</MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Completed">Completed</MenuItem>
                                            <MenuItem value="Pending Input">Pending Input</MenuItem>
                                            <MenuItem value="Deferred">Deferred</MenuItem>
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
                                <Grid item xs={12} sm={4}>
                                    <FormLabel>Priority <span style={{ color: "red" }}>*</span></FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="priority"
                                            label=""
                                            size="small"
                                            value={formik.values.priority || null}
                                            onChange={formik.handleChange}
                                            error={formik.touched.priority && Boolean(formik.errors.priority)}
                                        >
                                            <MenuItem value="High">High</MenuItem>
                                            <MenuItem value="Medium">Medium</MenuItem>
                                            <MenuItem value="Low">Low</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.priority && Boolean(formik.errors.priority)
                                            }
                                        >
                                            {formik.touched.priority && formik.errors.priority}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Assign To </FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="assignTo"
                                            label=""
                                            size="small"
                                            value={formik.values.assignTo}
                                            onChange={formik.handleChange}
                                            error={formik.touched.assignTo && Boolean(formik.errors.assignTo)}
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
                                        <FormHelperText
                                            error={
                                                formik.touched.assignTo && Boolean(formik.errors.assignTo)
                                            }
                                        >
                                            {formik.touched.assignTo && formik.errors.assignTo}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Start Date <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        name='startDate'
                                        type={'datetime-local'}
                                        size='small'
                                        fullWidth
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                        inputProps={{
                                            min: moment(today).format('YYYY-MM-DD HH:mm')
                                        }}
                                        error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                        helperText={formik.touched.startDate && formik.errors.startDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>End Date <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        name='endDate'
                                        type={'datetime-local'}
                                        size='small'
                                        fullWidth
                                        inputProps={{
                                            min: moment(formik.values.startDate).format('YYYY-MM-DD HH:mm')
                                        }}
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                        helperText={formik.touched.endDate && formik.errors.endDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Note <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="Note"
                                        name="note"
                                        label=""
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

export default AddEvent
