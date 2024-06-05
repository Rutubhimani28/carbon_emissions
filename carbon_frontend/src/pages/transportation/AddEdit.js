import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, CircularProgress, DialogContentText, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import * as yup from "yup";
import { apipost, apiput } from "../../service/api";

const AddEdit = (props) => {
    const { open, handleClose, setUserAction, type, selectedData } = props;
    const [isLoading, setIsLoading] = useState(false);

    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");

    const typeList = [
        { label: 'Petrol Car', value: 167, formula: 'f1' },
        { label: 'Diesel Car', value: 137, formula: 'f1' },
        { label: 'SUV Diesel', value: 220, formula: 'f1' },
        { label: 'SUV Petrol', value: 181, formula: 'f1' },
        { label: 'Camper Petrol', value: 327, formula: 'f1' },
        { label: 'Caper Diesel', value: 267, formula: 'f1' },
        { label: 'Bus- Diesel', value: 15.1, formula: 'f2' },
        { label: 'Electric Car', value: 45, formula: 'f2' },
        { label: 'Metro (Electric)', value: 29.29, formula: 'f2' },
    ]

    const validationSchema = yup.object({
        type: yup.string().required("Type is required"),
    });


    // -----------   initialValues
    const initialValues = {
        type: type === "edit" ? selectedData?.type : "",
        noOfKms: type === "edit" ? selectedData?.noOfKms : 0,
        noOfPassengers: type === "edit" ? selectedData?.noOfPassengers : 0,
        emission: type === "edit" ? selectedData?.emission : 0,
        pkm: type === "edit" ? selectedData?.pkm : 0,
        formula: type === "edit" ? selectedData?.formula : "",
        createdBy: userid,
    };

    const addData = async (values) => {
        setIsLoading(true);
        try {
            const data = {
                ...values,
                emission: values?.formula === "f1" ? (Number(values?.pkm) * Number(values?.noOfKms)) / Number(values?.noOfPassengers) || 0 : Number(values?.pkm) * Number(values?.noOfKms) || 0,
            };
            const result = await apipost('api/transportation/add', data);
            setUserAction(result);

            if (result && result.status === 200) {
                formik.resetForm();
                handleClose();
            }

        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const editData = async (values) => {
        setIsLoading(true);
        try {
            const data = {
                ...values,
                emission: values?.formula === "f1" ? (Number(values?.pkm) * Number(values?.noOfKms)) / Number(values?.noOfPassengers) || 0 : Number(values?.pkm) * Number(values?.noOfKms) || 0,
            };

            const result = await apiput(`api/transportation/${selectedData?._id}`, data);
            setUserAction(result);

            if (result && result.status === 200) {
                formik.resetForm();
                handleClose();
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
            formik.setFieldValue('noOfKms', 0);
            // formik.setFieldValue('weightInKgs', 0);
            formik.setFieldValue('emission', 0);
            // formik.setFieldValue('ef', 0);
        }
    }, [formik.values.type])

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
                                    <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={typeList}
                                        name="material"
                                        fullWidth
                                        disabled={type === "edit"}
                                        getOptionLabel={(item) => item?.label}
                                        value={typeList?.find((item) => item?.label === formik.values.type)}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("type", newValue ? newValue?.label : "");
                                            formik.setFieldValue("pkm", newValue ? newValue?.value : "");
                                            formik.setFieldValue("formula", newValue ? newValue?.formula : "");
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                size="small"
                                                name="type"
                                                placeholder='Select'
                                                error={
                                                    formik.touched.type &&
                                                    Boolean(formik.errors.type)
                                                }
                                                helperText={
                                                    formik.touched.type && formik.errors.type
                                                }
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">No Of Kms</FormLabel>
                                    <TextField
                                        id="noOfKms"
                                        name="noOfKms"
                                        label=""
                                        type="number"
                                        fullWidth
                                        size="small"
                                        value={formik.values.noOfKms}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.noOfKms &&
                                            Boolean(formik.errors.noOfKms)
                                        }
                                        helperText={
                                            formik.touched.noOfKms && formik.errors.noOfKms
                                        }
                                    />
                                </Grid>
                                {
                                    formik.values?.formula === "f1" &&
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">No of Passengers</FormLabel>
                                        <TextField
                                            id="noOfPassengers"
                                            name="noOfPassengers"
                                            label=""
                                            type="number"
                                            fullWidth
                                            size="small"
                                            value={formik.values.noOfPassengers}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.noOfPassengers &&
                                                Boolean(formik.errors.noOfPassengers)
                                            }
                                            helperText={
                                                formik.touched.noOfPassengers && formik.errors.noOfPassengers
                                            }
                                        />
                                    </Grid>
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
        </div>
    );
}

export default AddEdit;