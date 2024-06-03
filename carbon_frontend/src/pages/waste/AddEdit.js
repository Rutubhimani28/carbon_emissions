import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, CircularProgress, DialogContentText, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
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

    // -----------   initialValues
    const initialValues = {
        type: type === "edit" ? selectedData?.type : "",
        subType: type === "edit" ? selectedData?.subType : "",
        kg: type === "edit" ? selectedData?.kg : "",
        litres: type === "edit" ? selectedData?.litres : "",
        ef: type === "edit" ? selectedData?.ef : "",
        oneBottle: type === "edit" ? selectedData?.oneBottle : "",
        polyethelene: type === "edit" ? selectedData?.polyethelene : "",
        noOfPet: type === "edit" ? selectedData?.noOfPet : "",
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

    const filterSubType = (type) => {
        const filterData = subTypeList?.filter((item) => item?.type === type)
        setSubType(filterData)
    }

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
                                    <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            size="small"
                                            onChange={(e) => {
                                                setSubType(subTypeList?.filter((item) => item.type === e.target.value))
                                                formik.handleChange(e)
                                            }}
                                        >
                                            <MenuItem value='Waste'>Waste</MenuItem>
                                            <MenuItem value="Water">Water</MenuItem>
                                            <MenuItem value="Plastic Water bottle">Plastic Water bottle</MenuItem>
                                            <MenuItem value="Branding">Branding</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Sub Type</FormLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={subType}
                                        name="material"
                                        fullWidth
                                        disabled={type === "edit"}
                                        getOptionLabel={(item) => item?.label}
                                        // value={subType?.find((item) => item?.label === formik.values.material) || null}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("material", newValue ? newValue?.label : "");
                                            formik.setFieldValue("ef", newValue ? newValue?.value : "");
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                size="small"
                                                name="material"
                                                placeholder='Select'
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