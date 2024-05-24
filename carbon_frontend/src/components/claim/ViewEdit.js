import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, FormControl, FormHelperText, FormLabel, Select } from "@mui/material";
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
import { useEffect, useState } from "react";
import * as yup from "yup";
import { policyTypeList } from "../../_mock/data";
import { apidelete, apiget, apiput } from "../../service/api";

const ViewClaim = (props) => {
    const { open, handleClose, id, setUserAction } = props


    const [claimDate, setClaimData] = useState({})

    // -----------  validationSchema
    const validationSchema = yup.object({
        policyNumber: yup.string().required("Policy Number is required"),
        claimType: yup.string().required("Claim Type is required"),
        claimAmount: yup.string().required("Claim Amount is required"),
        claimDate: yup.string().required("Claim Date is required"),
        claimStatus: yup.string().required("Claim Status is required"),
        claimNotes: yup.string().required("Claim Notes is required"),

    });

    // -----------   initialValues
    const initialValues = {
        policyNumber: claimDate?.policyNumber,
        claimType: claimDate?.claimType,
        claimAmount: claimDate?.claimAmount,
        claimDate: claimDate?.claimDate,
        claimStatus: claimDate?.claimStatus,
        claimNotes: claimDate?.claimNotes,

    };

    // edit api
    const EditClaim = async (values) => {
        const data = values;
        const result = await apiput(`claim/edit/${id}`, data)
        setUserAction(result)
        if (result && result.status === 200) {
            handleClose();
        }
    }

    // delete api
    const deletedata = async () => {
        const result = await apidelete(`claim/delete/${id}`)
        setUserAction(result)
        handleClose();
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            const claimData = {
                policyNumber: values.policyNumber,
                claimType: values.claimType,
                claimAmount: values.claimAmount,
                claimDate: values.claimDate,
                claimStatus: values.claimStatus,
                claimNotes: values.claimNotes,
            }
            EditClaim(claimData)
            resetForm();
        },
    });

    // fetch api
    const fetchdata = async () => {
        if (id) {
            const result = await apiget(`claim/view/${id}`)
            if (result && result.status === 200) {
                setClaimData(result?.data)
            }
        }
    }


    useEffect(() => {
        fetchdata();
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
                    <Typography variant="h6">View and Update Claim </Typography>
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
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Policy Number</FormLabel>
                                    <TextField
                                        id="policyNumber"
                                        name="policyNumber"
                                        size="small"
                                        fullWidth
                                        value={formik.values.policyNumber}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.policyNumber &&
                                            Boolean(formik.errors.policyNumber)
                                        }
                                        helperText={
                                            formik.touched.policyNumber && formik.errors.policyNumber
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Claim Type</FormLabel>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            options={policyTypeList}
                                            getOptionLabel={(item) => item?.lable}
                                            value={policyTypeList?.find((item) => item?.value === formik.values.claimType)}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("claimType", newValue ? newValue?.value : "");
                                            }}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    size="small"
                                                    error={formik.touched.claimType && Boolean(formik.errors.claimType)}
                                                    helperText={formik.touched.claimType && formik.errors.claimType}
                                                    placeholder='Select'
                                                />}
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Claim Date</FormLabel>
                                    <TextField
                                        id="claimDate"
                                        name="claimDate"
                                        size="small"
                                        type="date"
                                        fullWidth
                                        value={formik.values.claimDate}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.claimDate &&
                                            Boolean(formik.errors.claimDate)
                                        }
                                        helperText={
                                            formik.touched.claimDate && formik.errors.claimDate
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Claim Amount</FormLabel>
                                    <TextField
                                        id="claimAmount"
                                        name="claimAmount"
                                        size="small"
                                        fullWidth
                                        value={formik.values.claimAmount}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.claimAmount &&
                                            Boolean(formik.errors.claimAmount)
                                        }
                                        helperText={
                                            formik.touched.claimAmount && formik.errors.claimAmount
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                        <FormLabel>Claim Status</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="claimStatus"
                                            name="claimStatus"
                                            size="small"
                                            value={formik.values.claimStatus || null}
                                            onChange={formik.handleChange}
                                            error={formik.touched.claimStatus && Boolean(formik.errors.claimStatus)}
                                        >
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="Under Investigation">Under Investigation</MenuItem>
                                            <MenuItem value="Approved">Approved</MenuItem>
                                            <MenuItem value="Denied">Denied</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.claimStatus && Boolean(formik.errors.claimStatus)
                                            }
                                        >
                                            {formik.touched.claimStatus && formik.errors.claimStatus}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Claim Notes</FormLabel>
                                    <TextField
                                        id="claimNotes"
                                        name="claimNotes"
                                        size="small"
                                        fullWidth
                                        rows={4}
                                        multiline
                                        value={formik.values.claimNotes}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.claimNotes &&
                                            Boolean(formik.errors.claimNotes)
                                        }
                                        helperText={
                                            formik.touched.claimNotes && formik.errors.claimNotes
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={formik.handleSubmit}
                        style={{ textTransform: "capitalize" }}
                        color="secondary"
                    >
                        Save
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={deletedata}
                        style={{ textTransform: "capitalize" }}
                        color="error"
                    >
                        Delete
                    </Button>
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

export default ViewClaim