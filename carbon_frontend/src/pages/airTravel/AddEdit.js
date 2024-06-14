import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
import 'react-quill/dist/quill.snow.css';
import { apipost, apiput } from "../../service/api";

const AddEdit = (props) => {
    const { open, handleClose, setUserAction, type, selectedData } = props;
    const [isLoading, setIsLoading] = useState(false);

    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");

    const menuList = [
        { label: 'Short Haul Flight (<3hrs)', value: 200 },
        { label: 'Medium Haul Flight (3-6hrs)', value: 400 },
        { label: 'Long Haul Flight (>6hrs)', value: 1000 },
    ];

    const validationSchema = yup.object({
        type: yup.string().required("Type of Flight is required"),
    });

    // -----------   initialValues
    const initialValues = {
        type: type === "edit" ? selectedData?.type : "",
        noOfTrips: type === "edit" ? selectedData?.noOfTrips : 0,
        ef: type === "edit" ? selectedData?.ef : "",
        emission: type === "edit" ? selectedData?.emission : "",
        createdBy: userid,
    };

    const addData = async (values) => {
        setIsLoading(true)
        try {
            const data = {
                type: values?.type,
                noOfTrips: values?.noOfTrips,
                ef: values?.ef,
                emission: Number((Number(values?.ef) * Number(values?.noOfTrips)).toFixed(2))
            };

            const result = await apipost('api/airTravel/add', data)
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
                type: values?.type,
                noOfTrips: values?.noOfTrips,
                ef: values?.ef,
                emission: Number((Number(values?.ef) * Number(values?.noOfTrips)).toFixed(2))
            };

            const result = await apiput(`api/airTravel/${selectedData?._id}`, data);
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
                editData(values);
            }
        }
    });

    useEffect(() => {
        if (type !== 'edit') {
            formik.setFieldValue('noOfTrips', '');
            formik.setFieldValue('emission', '');
        }
    }, [formik.values.type]);

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
                                    <FormLabel id="demo-row-radio-buttons-group-label">Flight Journey Type</FormLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={menuList}
                                        name="type"
                                        fullWidth
                                        disabled={type === "edit"}
                                        getOptionLabel={(item) => item?.label}
                                        value={menuList?.find((item) => item?.label === formik.values.type) || null}
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
                                    <FormLabel id="demo-row-radio-buttons-group-label">No of Trips</FormLabel>
                                    <TextField
                                        id="noOfTrips"
                                        name="noOfTrips"
                                        label=""
                                        type="number"
                                        fullWidth
                                        size="small"
                                        value={formik.values.noOfTrips}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.noOfTrips &&
                                            Boolean(formik.errors.noOfTrips)
                                        }
                                        helperText={
                                            formik.touched.noOfTrips && formik.errors.noOfTrips
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

export default AddEdit