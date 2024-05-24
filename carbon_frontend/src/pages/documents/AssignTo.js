import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from "@mui/lab";
import { Checkbox, CircularProgress, FormControl, FormHelperText, FormLabel, ListItemText, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slice/userSlice";
import { apiget, apiput } from "../../service/api";

const AssignTo = (props) => {
    const { open, handleClose, documentId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const userid = sessionStorage.getItem('user_id');
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state?.userDetails?.data)

    // -----------   initialValues
    const initialValues = {
        assignTo: [],
        createdBy: userid
    };

    const assignDocumentsToUsers = async (values) => {
        setIsLoading(true)
        const data = {
            assignTo: values?.assignTo,
            documentId
        };
        try {
            const result = await apiput('document/assign', data);

            if (result && result.status === 200) {
                formik.resetForm();
                handleClose();
            }
        } catch (error) {
            console.error("Error assigning document:", error);
        }
        setIsLoading(false)
    }


    // formik
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values) => {
            assignDocumentsToUsers(values)
        },
    });

    const fetchDocumentdata = async () => {
        const result = await apiget(`document/?_id=${documentId}`);
        if (result && result.status === 200) {
            formik.setFieldValue("assignTo", result?.data?.result[0]?.assignTo);
        }
    }

    useEffect(() => {
        if (documentId) {
            fetchDocumentdata();
        }
    }, [open, documentId]);

    useEffect(() => {
        if (userDetails?.length === 0) {
            dispatch(fetchUserData())
        }
    }, [open]);

    return (
        <div>
            <Dialog
                fullWidth
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
                    <Typography variant="h6">Assign To User </Typography>
                    <Typography>
                        <ClearIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                handleClose();
                                formik.resetForm();
                            }}
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
                                <FormControl fullWidth>
                                    <FormLabel>Assign To</FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="assignTo"
                                        name="assignTo"
                                        size="small"
                                        multiple
                                        value={formik.values.assignTo}
                                        onChange={formik.handleChange}
                                        error={formik.touched.assignTo && Boolean(formik.errors.assignTo)}
                                        renderValue={(selected) => (
                                            <div>
                                                {
                                                    selected.map((value) => {
                                                        const userData = userDetails.find((user) => user._id === value)
                                                        return (
                                                            <div key={value}>
                                                                {`${userData?.firstName} ${userData?.lastName}`}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )}
                                    >
                                        {
                                            userDetails?.map((user) => (
                                                <MenuItem value={user?._id}>
                                                    <Checkbox checked={formik.values.assignTo.indexOf(user?._id) > -1} />
                                                    <ListItemText primary={`${user?.firstName} ${user?.lastName}`} />
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText
                                        error={
                                            formik.touched.assignTo && Boolean(formik.errors.assignTo)
                                        }
                                    >
                                        {formik.touched.assignTo && formik.errors.assignTo}
                                    </FormHelperText>
                                </FormControl>
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

export default AssignTo;