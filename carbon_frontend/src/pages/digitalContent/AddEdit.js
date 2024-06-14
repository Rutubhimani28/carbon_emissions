import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, DialogContentText, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
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
import 'react-quill/dist/quill.snow.css';
import { apipost, apiput } from "../../service/api";

const AddEdit = (props) => {
    const { open, handleClose, setUserAction, type, selectedData } = props;
    const [isLoading, setIsLoading] = useState(false);

    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");

    // -----------   initialValues
    const initialValues = {
        type: type === "edit" ? selectedData?.type : "Emails",
        count: type === "edit" ? selectedData?.count : "",
        mb: type === "edit" ? selectedData?.mb : "",
        noOfAttendees: type === "edit" ? selectedData?.noOfAttendees : "",
        noOfHours: type === "edit" ? selectedData?.noOfHours : "",
        serviceLifeOfLaptop: type === "edit" ? selectedData?.serviceLifeOfLaptop : "",
        emission: 0,
        createdBy: userid,
    };


    const addData = async (values) => {
        setIsLoading(true)
        try {
            const data = {
                type: values?.type,
                count: values?.count,
                mb: values?.mb,
                noOfAttendees: values?.noOfAttendees,
                noOfHours: values?.noOfHours,
                serviceLifeOfLaptop: values?.serviceLifeOfLaptop,
                emission: values?.emission
            };
            const result = await apipost('api/digitalContent/add', data)
            setUserAction(result)

            if (result && result.status === 200) {
                formik.resetForm();
                handleClose();
            }

        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)

    };
    const editData = async (values) => {
        setIsLoading(true)
        try {
            const data = {
                type: values?.type,
                count: values?.count,
                mb: values?.mb,
                noOfAttendees: values?.noOfAttendees,
                noOfHours: values?.noOfHours,
                serviceLifeOfLaptop: values?.serviceLifeOfLaptop,
                emission: values?.emission
            };
            const result = await apiput(`api/digitalContent/${selectedData?._id}`, data)
            setUserAction(result)

            if (result && result.status === 200) {
                formik.resetForm();
                handleClose();
            }

        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)

    };


    // formik
    const formik = useFormik({
        initialValues,
        // validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (type === "add") {
                addData(values);
            } else {
                editData(values)
            }
        }
    });

    useEffect(() => {
        if (type !== 'edit') {
            formik.setFieldValue('count', "")
            formik.setFieldValue('mb', "")
            formik.setFieldValue('noOfAttendees', "")
            formik.setFieldValue('noOfHours', "")
            formik.setFieldValue('serviceLifeOfLaptop', "")
            formik.setFieldValue('emission', 0)
        }
    }, [formik.values.type])

    useEffect(() => {
        if (formik.values.type === "Emails") {
            formik.setFieldValue('emission', (formik?.values?.count * 13 / 1000).toFixed(2) || 0)
        } else if (formik.values.type === "Attachment") {
            formik.setFieldValue('emission', (formik?.values?.mb * 50 / 1000).toFixed(2) || 0)
        } else if (formik.values.type === "Laptop") {
            formik.setFieldValue('emission', (formik?.values?.noOfAttendees * 340 * (formik?.values?.noOfHours / 5840)).toFixed(2) || 0)
        }
    }, [formik.values])

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
                    <Typography variant="h6">{type === "add" ? "Add" : "Edit"}</Typography>
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
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="type"
                                            value={formik.values.type || null}
                                            error={formik.touched.type && Boolean(formik.errors.type)}
                                            onChange={formik.handleChange}
                                        >
                                            <FormControlLabel value="Emails" control={<Radio disabled={type === "edit" ? selectedData?.type !== "Emails" : ''} />} label="Emails" />
                                            <FormControlLabel value="Attachment" control={<Radio disabled={type === "edit" ? selectedData?.type !== "Attachment" : ''} />} label="Attachment" />
                                            <FormControlLabel value="Laptop" control={<Radio disabled={type === "edit" ? selectedData?.type !== "Laptop" : ''} />} label="Laptop" />
                                        </RadioGroup>
                                        <FormHelperText
                                            error={
                                                formik.touched.type && Boolean(formik.errors.type)
                                            }
                                        >
                                            {formik.touched.type && formik.errors.type}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                {
                                    formik.values.type === "Emails" &&

                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Count</FormLabel>
                                        <TextField
                                            id="count"
                                            name="count"
                                            label=""
                                            type="number"
                                            fullWidth
                                            size="small"
                                            value={formik.values.count}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.count &&
                                                Boolean(formik.errors.count)
                                            }
                                            helperText={
                                                formik.touched.count && formik.errors.count
                                            }
                                        />
                                    </Grid>
                                }

                                {
                                    formik.values.type === "Attachment" &&
                                    <>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <FormLabel id="demo-row-radio-buttons-group-label">MB</FormLabel>
                                            <TextField
                                                id="mb"
                                                name="mb"
                                                label=""
                                                type="number"
                                                fullWidth
                                                size="small"
                                                value={formik.values.mb}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.mb &&
                                                    Boolean(formik.errors.mb)
                                                }
                                                helperText={
                                                    formik.touched.mb && formik.errors.mb
                                                }
                                            />
                                        </Grid>
                                    </>
                                }
                                {
                                    formik.values.type === "Laptop" &&
                                    <>

                                        <Grid item xs={12} sm={12} md={12}>
                                            <FormLabel id="demo-row-radio-buttons-group-label">No.of Attendees</FormLabel>
                                            <TextField
                                                id="noOfAttendees"
                                                name="noOfAttendees"
                                                label=""
                                                type="number"
                                                fullWidth
                                                size="small"
                                                value={formik.values.noOfAttendees}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.noOfAttendees &&
                                                    Boolean(formik.errors.noOfAttendees)
                                                }
                                                helperText={
                                                    formik.touched.noOfAttendees && formik.errors.noOfAttendees
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <FormLabel id="demo-row-radio-buttons-group-label">No. Of Hours</FormLabel>
                                            <TextField
                                                id="noOfHours"
                                                name="noOfHours"
                                                label=""
                                                type="number"
                                                fullWidth
                                                size="small"
                                                value={formik.values.noOfHours}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.noOfHours &&
                                                    Boolean(formik.errors.noOfHours)
                                                }
                                                helperText={
                                                    formik.touched.noOfHours && formik.errors.noOfHours
                                                }
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12} sm={12} md={12}>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Service life of Laptop</FormLabel>
                                            <TextField
                                                id="serviceLifeOfLaptop"
                                                name="serviceLifeOfLaptop"
                                                label=""
                                                type="number"
                                                fullWidth
                                                size="small"
                                                value={formik.values.serviceLifeOfLaptop}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.serviceLifeOfLaptop &&
                                                    Boolean(formik.errors.serviceLifeOfLaptop)
                                                }
                                                helperText={
                                                    formik.touched.serviceLifeOfLaptop && formik.errors.serviceLifeOfLaptop
                                                }
                                            />
                                        </Grid> */}
                                    </>
                                }

                            </Grid>
                        </DialogContentText>
                    </form>
                </DialogContent>

                <DialogActions>
                    <LoadingButton onClick={formik.handleSubmit} variant='contained' color='primary' disabled={!!isLoading} className="custom-btn">
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
        </div >
    );
}

export default AddEdit