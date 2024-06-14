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
        { label: 'Air Freight', value: 0.15 }
    ]

    const validationSchema = yup.object({
        type: yup.string().required("Type is required"),
    });


    // -----------   initialValues
    const initialValues = {
        type: type === "edit" ? selectedData?.type : "Air Freight",
        noOfKms: type === "edit" ? selectedData?.noOfKms : 0,
        weightInKgs: type === "edit" ? selectedData?.weightInKgs : 0,
        emission: type === "edit" ? selectedData?.emission : 0,
        ef: type === "edit" ? selectedData?.ef : 0.15,
        createdBy: userid,
    };

    const addData = async (values) => {
        setIsLoading(true);
        try {
            const data = {
                ...values,
                emission: (Number(values?.noOfKms) * Number(values?.weightInKgs) * Number(values?.ef)) || 0,
            };

            const result = await apipost('api/airFreight/add', data);
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
                emission: (Number(values?.noOfKms) * Number(values?.weightInKgs) * Number(values?.ef)) || 0,
            };

            const result = await apiput(`api/airFreight/${selectedData?._id}`, data);
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
            formik.setFieldValue('weightInKgs', 0);
            formik.setFieldValue('emission', 0);
            formik.setFieldValue('ef', 0.15);
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
                                        name="type"
                                        disabled={type === "edit"}
                                        fullWidth
                                        getOptionLabel={(item) => item?.label}
                                        value={typeList?.find((item) => item?.label === formik.values.type)}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("type", newValue ? newValue?.label : "");
                                            formik.setFieldValue("ef", newValue ? newValue?.value : "");
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
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Weight (Kgs)</FormLabel>
                                    <TextField
                                        id="weightInKgs"
                                        name="weightInKgs"
                                        label=""
                                        type="number"
                                        fullWidth
                                        size="small"
                                        value={formik.values.weightInKgs}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.weightInKgs &&
                                            Boolean(formik.errors.weightInKgs)
                                        }
                                        helperText={
                                            formik.touched.weightInKgs && formik.errors.weightInKgs
                                        }
                                    />
                                </Grid>

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