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
        material: type === "edit" ? selectedData?.material : "",
        totalArea: type === "edit" ? selectedData?.totalArea : "",
        emission: type === "edit" ? selectedData?.emission : "",
        createdBy: userid,
    };


    const addData = async (values) => {
        setIsLoading(true)
        try {
            const data = {
                material: values?.material,
                totalArea: values?.totalArea,
                emission: values?.emission
            };
            const result = await apipost('api/production/add', data)
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
                material: values?.material,
                totalArea: values?.totalArea,
                emission: values?.emission
            };
            const result = await apiput(`api/production/${selectedData?._id}`, data)
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
            formik.setFieldValue('material', "")
            formik.setFieldValue('totalArea', "")
            formik.setFieldValue('emission', 0)
        }
    }, [formik.values.type])

    // useEffect(() => {
    //     if (formik.values.type === "Emails") {
    //         formik.setFieldValue('emission', (formik?.values?.count * 13 / 1000).toFixed(2) || 0)
    //     } else if (formik.values.type === "Attachment") {
    //         formik.setFieldValue('emission', (formik?.values?.mb * 50 / 1000).toFixed(2) || 0)
    //     } else if (formik.values.type === "Laptop") {
    //         formik.setFieldValue('emission', (formik?.values?.noOfAttendees * 340 * (formik?.values?.noOfHours / formik?.values?.serviceLifeOfLaptop)).toFixed(2) || 0)
    //     }
    // }, [formik.values])

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
                                    <FormLabel id="demo-row-radio-buttons-group-label">Material</FormLabel>
                                    <TextField
                                        id="material"
                                        name="material"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.material}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.material &&
                                            Boolean(formik.errors.material)
                                        }
                                        helperText={
                                            formik.touched.material && formik.errors.material
                                        }
                                    />
                                </Grid>


                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Total Area (m2)/ Amount</FormLabel>
                                    <TextField
                                        id="totalArea"
                                        name="totalArea"
                                        label=""
                                        type="number"
                                        fullWidth
                                        size="small"
                                        value={formik.values.totalArea}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.totalArea &&
                                            Boolean(formik.errors.totalArea)
                                        }
                                        helperText={
                                            formik.touched.totalArea && formik.errors.totalArea
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