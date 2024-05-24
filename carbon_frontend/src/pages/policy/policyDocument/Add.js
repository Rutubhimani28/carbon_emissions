/* eslint-disable react/prop-types */
import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { apipost } from "../../../service/api";

const Add = (props) => {
    const { open, handleClose, setUserAction, _id } = props
    const userid = sessionStorage.getItem('user_id')
    const [isLoading, setIsLoading] = React.useState(false);

    // -----------  validationSchema
    const validationSchema = yup.object({
        file: yup.string().required("File is required"),
        fileName: yup.string().required("File Name is required"),
    });

    // -----------   initialValues
    const initialValues = {
        file: "",
        fileName: "",
        policy_id: _id,
        createdBy: userid
    };

    // add contact api
    const fileUpload = async (values) => {
        setIsLoading(true)

        try {
            const data = new FormData()
            data.append("name", values.file.name)
            data.append("file", values.file)
            data.append("fileName", values.fileName)
            data.append("policy_id", values.policy_id)
            data.append("createdBy", values.createdBy)

            const result = await apipost('policydocument/upload', data)
            setUserAction(result)



        } catch (error) {
            console.log(error);
        }
        formik.resetForm();
        handleClose();
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            fileUpload(values)
        },
    });

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
                        // backgroundColor: "#2b4054",
                        // color: "white",
                    }}
                >
                    <Typography variant="h6">Add New </Typography>
                    <Typography>
                        <ClearIcon
                            onClick={handleClose}
                            style={{ cursor: "pointer" }}
                        />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form encType="multipart/form-data">
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Upload File<span style={{ color: "red" }}>*</span></FormLabel>
                                <TextField
                                    id="file"
                                    name="file"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    type="file"
                                    multiple
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => {
                                        formik.setFieldValue("file", event.currentTarget.files[0]);
                                    }}
                                    error={
                                        formik.touched.file &&
                                        Boolean(formik.errors.file)
                                    }
                                    helperText={
                                        formik.touched.file && formik.errors.file
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>FileName<span style={{ color: "red" }}>*</span></FormLabel>
                                <TextField
                                    id="fileName"
                                    name="fileName"
                                    size="small"
                                    fullWidth
                                    value={formik.values.fileName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.fileName && Boolean(formik.errors.fileName)
                                    }
                                    helperText={formik.touched.fileName && formik.errors.fileName}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>

                    <LoadingButton onClick={formik.handleSubmit} variant='contained' color='secondary' disabled={!!isLoading}>
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

export default Add