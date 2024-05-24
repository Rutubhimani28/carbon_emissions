import ClearIcon from "@mui/icons-material/Clear";
import { CircularProgress, FormLabel, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useState } from 'react';
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { LoadingButton } from '@mui/lab';
import { apiput } from "../../service/api";

const Edit = (props) => {

    const { open, handleClose, setUserAction, tempData } = props

    const [smsTemplateData, setSmsTemplateData] = useState({});
    const [user, setUser] = useState([])
    const userdata = JSON.parse(localStorage.getItem('user'));
    const [isLoading, setIsLoading] = useState(false)

    // -----------  validationSchema
    const validationSchema = yup.object({
        name: yup.string().required("Template Name is required"),
        message: yup.string().required("Message is required"),
    });

    // -----------   initialValues
    const initialValues = {
        name: tempData?.name,
        message: tempData?.message,
    };

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            EditSmsTemplate(values);
        },
    });


    const EditSmsTemplate = async (values) => {
        setIsLoading(true)
        try {
            const data = {
                name: values?.name,
                message: values?.message,
                modifiedOn: new Date()

            };
            const result = await apiput(`smstemplate/edit/${tempData?._id}`, data);

            if (result && result.status === 200) {
                handleClose();
                setUserAction(result);
            }
        } catch (error) {
            console.error("Error editing SMS template:", error);
        }
        setIsLoading(false)
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
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
                    <Typography variant="h6">SMS</Typography>
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
                                <Grid item xs={12}>
                                    <FormLabel>Template Name</FormLabel>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label=""
                                        size='small'
                                        fullWidth
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormLabel>Message</FormLabel>
                                    <TextField
                                        id="message"
                                        name="message"
                                        multiline
                                        size='small'
                                        rows={10}
                                        fullWidth
                                        value={formik.values.message}
                                        onChange={formik.handleChange}
                                        error={formik.touched.message && Boolean(formik.errors.message)}
                                        helperText={formik.touched.message && formik.errors.message}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <LoadingButton onClick={formik.handleSubmit} variant='contained' color='primary' disabled={!!isLoading}>
                        {isLoading ? <CircularProgress size={27} /> : 'Save'}
                    </LoadingButton>
                    <Button onClick={() => {
                        formik.resetForm()
                        handleClose()
                    }} variant='outlined' color='error'>Cancle</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Edit