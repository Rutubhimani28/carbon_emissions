import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Typography, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, CircularProgress, Grid, Stack, makeStyles } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { apipost } from "../../../../service/api";
import Logo from '../../assets/images/logo4.gif';

export default function Bot(props) {
    const { openBot, handleCloseBot } = props;
    const [isLoading, setLoading] = React.useState(false);
    const initialValues = {
        name: "",
        email: "",
        message: "",
    };

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Email is invalid").required("Email is required"),
        message: yup.string().required("Message is required"),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const payload = {
                name: values.name,
                email: values.email,
                message: `Contact Name: ${values.name} \n Contact EmailId: ${values.email} \n\n ${values.message}`
            };

            try {
                const result = await apipost('api/bot/add', payload);

                if (result && (result.status === 200 || result.status === 201)) {
                    formik.resetForm();
                    handleCloseBot();
                }
            } catch (error) {
                console.log("Error sending bot mail:", error);
            }
            setLoading(false);
        },
    });

    const { values, resetForm, errors, handleChange, handleSubmit } = formik;

    const handleClose = () => {
        handleCloseBot();
    };

    return (
        <div >
            <Dialog
                className="bot"
                open={openBot}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: () => {
                        handleSubmit();
                        handleClose();
                    },
                }}
            >
                <DialogContent>
                    <DialogContentText>
                        <div className="d-flex justify-content-center">
                            <img src={Logo} width={'140vh'} alt="logo" style={{ marginBottom: "10px" }} />
                        </div>
                        <span className="d-block mb-1" style={{ fontWeight: 750, fontSize: '12px' }}>Do you have a feedback or questions?</span>
                        <span className="d-block mb-3" style={{ fontWeight: 750, fontSize: '12px' }}>Fill out the form below. We'll reply within 24-48 hrs.</span>
                    </DialogContentText>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                autoFocus
                                label="Name"
                                variant="outlined"
                                fullWidth
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                inputProps={{ style: { fontSize: '12px' } }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                inputProps={{ style: { fontSize: '12px' } }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={2}
                                fullWidth
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                                error={formik.touched.message && Boolean(formik.errors.message)}
                                helperText={formik.touched.message && formik.errors.message}
                                inputProps={{ style: { fontSize: '12px' } }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <LoadingButton type="submit" onClick={handleSubmit} variant='contained' color="error" disabled={!!isLoading} size="small">
                        {isLoading ? <CircularProgress size={27} /> : 'Submit'}
                    </LoadingButton>
                    <Button variant="contained" onClick={() => { resetForm(); handleCloseBot(); }} size="small">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}