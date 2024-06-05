import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, CircularProgress, DialogContentText, FormHelperText, FormLabel, MenuItem, Select } from "@mui/material";
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
import * as yup from "yup";
import { apipost, apiput } from "../../service/api";

const AddEdit = (props) => {
    const { open, handleClose, setUserAction, type, selectedData } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [subType, setSubType] = useState([])
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");

    const subTypeList = [
        { label: 'Food', ef: 0.58, type: "Waste", formula: 'f1' },
        { label: 'Mixed Recyclables', ef: 0.09, type: "Waste", formula: 'f1' },
        { label: 'Municipal Solid Waste', ef: 0.52, type: "Waste", formula: 'f1' },
        { label: 'Water', ef: 0.272, type: "Water", formula: 'f2' },
        { label: '250ml', oneBottle: 6.42, polyethelen: 0.00279, type: "Plastic Water bottle", formula: 'f3' },
        { label: '500ml', oneBottle: 13, polyethelen: 0.00279, type: "Plastic Water bottle", formula: 'f3' },
        { label: '1000ml', oneBottle: 21.5, polyethelen: 0.00279, type: "Plastic Water bottle", formula: 'f3' },
        { label: 'PVC HDPE Banner', ef: 3.11, type: "Branding", formula: 'f4' },
        { label: 'PVC Banners', ef: 7.83, type: "Branding", formula: 'f4' },
        { label: 'badge holders', ef: 22.74, type: "Branding", formula: 'f4' },
    ]
    // -----------  validationSchema
    const validationSchema = yup.object({
        type: yup.string().required("Type is required"),
        subType: yup.string().required("Sub Type is required"),
    });

    // -----------   initialValues
    const initialValues = {
        type: type === "edit" ? selectedData?.type : "Waste",
        subType: type === "edit" ? selectedData?.subType : "",
        kg: type === "edit" ? selectedData?.kg : "",
        litres: type === "edit" ? selectedData?.litres : "",
        ef: type === "edit" ? selectedData?.ef : "",
        oneBottle: type === "edit" ? selectedData?.oneBottle : "",
        polyethelene: type === "edit" ? selectedData?.polyethelene : "",
        noOfPETBottles: type === "edit" ? selectedData?.noOfPETBottles : "",
        formula: type === "edit" ? selectedData?.formula : "",
        emission: type === "edit" ? selectedData?.emission : "",
        createdBy: userid,
    };

    const handleCalculation = (values, formula) => {
        switch (formula) {
            case 'f1':
                return Number((values?.kg * values?.ef).toFixed(2));
            case 'f2':
                return Number((values?.litres * values?.ef).toFixed(2));
            case 'f3':
                return Number((values?.noOfPETBottles * values?.oneBottle * values?.polyethelene).toFixed(2));
            case 'f4':
                return Number((values?.kg * values?.ef).toFixed(2));
            default:
                return 0;
        }
    }

    const addData = async (values) => {
        setIsLoading(true)
        try {
            const data = {
                type: values?.type,
                subType: values?.subType,
                kg: values?.kg,
                litres: values?.litres,
                ef: values?.ef,
                oneBottle: values?.oneBottle,
                polyethelene: values?.polyethelene,
                noOfPETBottles: values?.noOfPETBottles,
                formula: values?.formula,
                emission: handleCalculation(values, values?.formula)
            };
            const result = await apipost('api/waste/add', data)
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
                subType: values?.subType,
                kg: values?.kg,
                litres: values?.litres,
                ef: values?.ef,
                oneBottle: values?.oneBottle,
                polyethelene: values?.polyethelene,
                noOfPETBottles: values?.noOfPETBottles,
                formula: values?.formula,
                emission: handleCalculation(values, values?.formula)
            };
            const result = await apiput(`api/waste/${selectedData?._id}`, data)
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

    const filterSubType = (type) => {
        const filterData = subTypeList?.filter((item) => item?.type === type)
        setSubType(filterData)
    }

    useEffect(() => {
        if (type !== 'edit') {
            formik.setFieldValue('subType', "")
            formik.setFieldValue('kg', "")
            formik.setFieldValue('litres', "")
            formik.setFieldValue('ef', "")
            formik.setFieldValue('oneBottle', "")
            formik.setFieldValue('polyethelene', "")
            formik.setFieldValue('noOfPETBottles', "")
            formik.setFieldValue('formula', "")
            formik.setFieldValue('emission', 0)
        }
    }, [formik.values.type])

    useEffect(() => {
        if (type !== 'edit') {
            if (formik.values.type === "Waste") {
                const filterData = subTypeList?.filter((item) => item?.type === 'Waste')
                setSubType(filterData)
            }
        }
    }, [formik.values.type])

    useEffect(() => {
        if (type === 'edit') {
            const filterData = subTypeList?.filter((item) => item?.type === selectedData?.type)
            setSubType(filterData)
        }
    }, [selectedData])

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
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            size="small"
                                            name="type"
                                            fullWidth
                                            value={formik.values.type || null}
                                            disabled={type === "edit"}
                                            onChange={(e) => { filterSubType(e.target.value); formik.handleChange(e) }}
                                            error={
                                                formik.touched.type &&
                                                Boolean(formik.errors.type)
                                            }
                                            helperText={
                                                formik.touched.type && formik.errors.type
                                            }
                                        >
                                            <MenuItem value='Waste'>Waste</MenuItem>
                                            <MenuItem value="Water">Water</MenuItem>
                                            <MenuItem value="Plastic Water bottle">Plastic Water bottle</MenuItem>
                                            <MenuItem value="Branding">Branding</MenuItem>
                                        </Select>
                                        <FormHelperText error={
                                            formik.touched.type &&
                                            Boolean(formik.errors.type)
                                        }>{formik.touched.type && formik.errors.type}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Sub Type</FormLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={subType}
                                        name="subType"
                                        fullWidth
                                        disabled={type === "edit"}
                                        getOptionLabel={(item) => item?.label}
                                        value={subType?.find((item) => item?.label === formik.values.subType) || null}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("subType", newValue ? newValue?.label : "");
                                            formik.setFieldValue("ef", newValue ? newValue?.ef : "");
                                            formik.setFieldValue("oneBottle", newValue ? newValue?.oneBottle : "");
                                            formik.setFieldValue("polyethelen", newValue ? newValue?.polyethelen : "");
                                            formik.setFieldValue("formula", newValue ? newValue?.formula : "");
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                size="small"
                                                name="subType"
                                                placeholder='Select'
                                                error={
                                                    formik.touched.subType &&
                                                    Boolean(formik.errors.subType)
                                                }
                                                helperText={
                                                    formik.touched.subType && formik.errors.subType
                                                }
                                            />}
                                    />
                                </Grid>
                                {
                                    formik.values.type === "Waste" &&
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Kgs</FormLabel>
                                        <TextField
                                            id="kg"
                                            name="kg"
                                            label=""
                                            type="number"
                                            fullWidth
                                            size="small"
                                            value={formik.values.kg}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.kg &&
                                                Boolean(formik.errors.kg)
                                            }
                                            helperText={
                                                formik.touched.kg && formik.errors.kg
                                            }
                                        />
                                    </Grid>
                                }
                                {
                                    formik.values.type === "Water" &&
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Litres/ area m3*</FormLabel>
                                        <TextField
                                            id="litres"
                                            name="litres"
                                            label=""
                                            type="number"
                                            fullWidth
                                            size="small"
                                            value={formik.values.litres}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.litres &&
                                                Boolean(formik.errors.litres)
                                            }
                                            helperText={
                                                formik.touched.litres && formik.errors.litres
                                            }
                                        />
                                    </Grid>
                                }
                                {
                                    formik.values.type === "Plastic Water bottle" &&
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">No. of PET bottles</FormLabel>
                                        <TextField
                                            id="noOfPETBottles"
                                            name="noOfPETBottles"
                                            label=""
                                            type="number"
                                            fullWidth
                                            size="small"
                                            value={formik.values.noOfPETBottles}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.noOfPETBottles &&
                                                Boolean(formik.errors.noOfPETBottles)
                                            }
                                            helperText={
                                                formik.touched.noOfPETBottles && formik.errors.noOfPETBottles
                                            }
                                        />
                                    </Grid>
                                }
                                {
                                    formik.values.type === "Branding" &&
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Kg</FormLabel>
                                        <TextField
                                            id="kg"
                                            name="kg"
                                            label=""
                                            type="number"
                                            fullWidth
                                            size="small"
                                            value={formik.values.kg}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.kg &&
                                                Boolean(formik.errors.kg)
                                            }
                                            helperText={
                                                formik.touched.kg && formik.errors.kg
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

export default AddEdit