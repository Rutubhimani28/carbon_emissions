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

    const materialList = [
        { label: 'Open Panel Timber Frame', value: 0.345 },
        { label: 'MDF', value: 0.856 },
        { label: 'Sawn Timber', value: 0.263 },
        { label: 'Carpet', value: 6.7 },
        { label: 'Adhesive Vinyl', value: 3.1 },
        { label: 'Wood', value: 6.4 },
        { label: 'Steel', value: 1.83 },
        { label: 'Aluminium', value: 0.42 },
        { label: 'Iron', value: 0.64 },
        { label: 'Wooden Floor', value: 0 },
        { label: 'Paint', value: 0 },
        { label: 'Cotton Banner', value: 8.3 },
        { label: 'Cardboard', value: 0.94 },
        { label: 'paper', value: 1.2 },
        { label: 'Polyester', value: 12.7 },
        { label: 'Cotton canvas', value: 14.5 },
        { label: 'Lanyards', value: 22.74 },
        { label: 'Poly Ethelene', value: 2.792 },
        { label: 'Nylon', value: 12.7 },
    ]

    const validationSchema = yup.object({
        material: yup.string().required("Material is required"),
    });


    // -----------   initialValues
    const initialValues = {
        material: type === "edit" ? selectedData?.material : "",
        totalArea: type === "edit" ? selectedData?.totalArea : "",
        ef: type === "edit" ? selectedData?.ef : "",
        emission: type === "edit" ? selectedData?.emission : "",
        createdBy: userid,
    };

    const addData = async (values) => {
        setIsLoading(true)
        try {
            const data = {
                material: values?.material,
                totalArea: values?.totalArea,
                ef: values?.ef,
                emission: Number((values?.ef * values?.totalArea).toFixed(2))
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
                ef: values?.ef,
                emission: Number((values?.ef * values?.totalArea).toFixed(2))
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
            formik.setFieldValue('material', "")
            formik.setFieldValue('totalArea', "")
            formik.setFieldValue('emission', 0)
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
                                    <FormLabel id="demo-row-radio-buttons-group-label">Material</FormLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={materialList}
                                        name="material"
                                        fullWidth
                                        disabled={type === "edit"}
                                        getOptionLabel={(item) => item?.label}
                                        value={materialList?.find((item) => item?.label === formik.values.material) || null}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("material", newValue ? newValue?.label : "");
                                            formik.setFieldValue("ef", newValue ? newValue?.value : "");
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                size="small"
                                                name="material"
                                                placeholder='Select'
                                                error={
                                                    formik.touched.material &&
                                                    Boolean(formik.errors.material)
                                                }
                                                helperText={
                                                    formik.touched.material && formik.errors.material
                                                }
                                            />}
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