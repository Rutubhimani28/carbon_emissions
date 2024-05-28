import * as React from "react";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, FormLabel } from "@mui/material";

const ImportModel = (props) => {
    const { open, handleClose, moduleName, filePath, fileName, routeName, fieldsInCrm, api, back } = props
    const navigate = useNavigate();

    const validationSchema = yup.object({
        file: yup.string().required("File is required"),
    });

    const initialValues = {
        file: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: async (values) => {
            if (values?.file) {
                handleClose();
                navigate(`/dashboard/${routeName}/import`, { state: { fileData: values.file, moduleName, fieldsInCrm, api, back } });
            }
            formik.resetForm();
        },
    });
    const handleTempleteDownload = () => {
        const anchor = document.createElement("a");
        anchor.href = filePath;
        anchor.download = fileName;
        anchor.click();
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => { handleClose(); formik.resetForm(); }}
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
                    <Typography variant="h6">Import {moduleName}</Typography>
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
                                <FormLabel>Upload File</FormLabel>
                                <TextField
                                    id="file"
                                    name="file"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    type="file"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        accept: ".xlsx,.csv"
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
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions style={{ justifyContent: "space-between" }}>
                    <Button
                        variant="contained"
                        style={{ textTransform: "capitalize" }}
                        onClick={handleTempleteDownload}
                    >
                        Download Templete
                    </Button>
                    <Box>

                        <Button
                            type="submit"
                            variant="contained"
                            onClick={formik.handleSubmit}
                            style={{ textTransform: "capitalize", marginRight: "5px" }}
                        >
                            Save
                        </Button>
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
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ImportModel