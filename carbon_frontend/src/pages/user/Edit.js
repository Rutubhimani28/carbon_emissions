import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { apiput } from "../../service/api";

const Edit = (props) => {

    const { handleClose, open, userDetails, fetchUser, emailEdit } = props
    const [isLoading, setIsLoading] = useState(false);

    // -----------  validationSchema
    const validationSchema = yup.object({
        firstName: yup.string().required("Frist Name is required"),
        lastName: yup.string().required("Last Name is required"),
        emailAddress: yup.string().email('Invalid email').required("Email is required"),

    });

    // -----------   initialValues
    const initialValues = {
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        emailAddress: userDetails?.emailAddress,
        modifiedOn: ""
    };

    // edit api
    const EditUser = async (values) => {
        setIsLoading(true)

        try {
            const result = await apiput(`user/edit/${userDetails?._id}`, values)
            if (result && result.status === 200) {
                handleClose();
                fetchUser();
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const userData = {
                firstName: values.firstName,
                lastName: values.lastName,
                emailAddress: values.emailAddress,
                modifiedOn: new Date()
            }
            EditUser(userData)
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
                    }}
                >
                    <Typography variant="h6">Edit </Typography>
                    <Typography>
                        <ClearIcon
                            onClick={handleClose}
                            style={{ cursor: "pointer" }}
                        />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>First Name <span style={{ color: "red" }}>*</span></FormLabel>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.firstName &&
                                        Boolean(formik.errors.firstName)
                                    }
                                    helperText={
                                        formik.touched.firstName && formik.errors.firstName
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Last Name <span style={{ color: "red" }}>*</span></FormLabel>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    size="small"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.lastName && Boolean(formik.errors.lastName)
                                    }
                                    helperText={
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Email <span style={{ color: "red" }}>*</span></FormLabel>
                                <TextField
                                    id="emailAddress"
                                    name="emailAddress"
                                    size="small"
                                    disabled={emailEdit}
                                    value={formik.values.emailAddress}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.emailAddress &&
                                        Boolean(formik.errors.emailAddress)
                                    }
                                    helperText={
                                        formik.touched.emailAddress && formik.errors.emailAddress
                                    }
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <LoadingButton onClick={formik.handleSubmit} variant='contained' color='primary' disabled={!!isLoading}>
                        {isLoading ? <CircularProgress size={27} /> : 'Save'}
                    </LoadingButton>
                    <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        style={{ textTransform: "capitalize" }}
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

export default Edit