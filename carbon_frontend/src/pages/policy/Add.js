import ClearIcon from "@mui/icons-material/Clear";
import { LoadingButton } from '@mui/lab';
import { Autocomplete, CircularProgress, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import moment from "moment";
import { useState } from "react";
import * as yup from "yup";
import { policyTypeList } from '../../_mock/data';
import { apipost } from '../../service/api';
import Palette from '../../theme/palette';

const Add = (props) => {
    const { open, handleClose, setUserAction, _id } = props

    const userid = sessionStorage.getItem('user_id')
    const userRole = sessionStorage.getItem("userRole")
    const today = new Date().toISOString().split('.')[0];

    const [isLoading, setIsLoading] = useState(false);

    // -----------  validationSchema
    const validationSchema = yup.object({
        policyType: yup.string().required("Policy Type is required"),
        policyStartDate: yup.date().required("Policy Start Date is required"),
        policyEndDate: yup.date().required("Policy End Date is required"),
        policyStatus: yup.string().required("Policy Status is required"),
        coverageAmounts: yup.number().required("Coverage Amounts is required"),
        deductibles: yup.number().required("Deductions is required"),
        limits: yup.number().required("Limits is required"),
        insuredPersonName: yup.string().required("Person Name is required"),
        insuredPersonDateOfBirth: yup.date().required("Date of Birth is required"),
        relationshipToTheInsured: yup.string().required("Relationship To The Insured is required"),
        phoneNumber: yup.string().matches(/^(0)?[0-9]{9,14}$/, 'Phone Number is invalid').required('Phone Number is required'),
        emailAddress: yup.string().email('Invalid email').required("Email is required"),
        additionalPhoneNumber: yup.string().matches(/^(0)?[0-9]{9,14}$/, 'Phone Number is invalid'),
        additionalEmailAddress: yup.string().email('Invalid email'),
        underwriterPhone: yup.string().matches(/^(0)?[0-9]{9,14}$/, 'Phone Number is invalid'),
        underwriterEmail: yup.string().email('Invalid email')
    });

    // -----------   initialValues
    const initialValues = {
        policyType: "",
        policyStartDate: "",
        policyEndDate: "",
        policyStatus: "",
        coverageAmounts: "",
        deductibles: "",
        limits: "",
        insuredPersonName: "",
        insuredPersonDateOfBirth: "",
        phoneNumber: "",
        emailAddress: "",
        instagramProfile: "",
        twitterProfile: "",
        relationshipToTheInsured: "",
        additionalInsuredPersonName: "",
        additionalInsuredDateOfBirth: "",
        additionalRelationshipToTheInsured: "",
        additionalPhoneNumber: "",
        additionalEmailAddress: "",
        additionalInstagramProfile: "",
        additionalTwitterProfile: "",
        premiumAmount: "",
        FrequencyOfPremiumPayments: "",
        underwriterName: "",
        underwriterPhone: "",
        underwriterEmail: "",
        underwriterDecisions: "",
        createdBy: userid,
        contact_id: _id,
        assigned_agent: userid
    };

    // add policy api
    const addPolicy = async (values) => {
        const data = values
        const result = await apipost('policy/add', data)

        setUserAction(result)

        if (result && result.status === 201) {
            formik.resetForm();
            handleClose();
        }
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addPolicy(values)
        },
    });

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
                    <Typography variant="h6">Add New </Typography>
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
                            <Typography style={{ marginBottom: "15px" }} variant="h6">
                                Policy Details
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Policy Type <span style={{ color: "red" }}>*</span></FormLabel>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            options={policyTypeList}
                                            getOptionLabel={(item) => item?.lable}
                                            value={policyTypeList?.find((item) => item?.value === formik.values.policyType)}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("policyType", newValue ? newValue?.value : "");
                                            }}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    size="small"
                                                    error={formik.touched.policyType && Boolean(formik.errors.policyType)}
                                                    helperText={formik.touched.policyType && formik.errors.policyType}
                                                    placeholder='Select'
                                                />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Policy Start Date <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        name='policyStartDate'
                                        type='date'
                                        size='small'
                                        inputProps={{
                                            min: moment(today).format('YYYY-MM-DD')
                                        }}
                                        fullWidth
                                        value={formik.values.policyStartDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyStartDate && Boolean(formik.errors.policyStartDate)}
                                        helperText={formik.touched.policyStartDate && formik.errors.policyStartDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Policy End Date <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        name='policyEndDate'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        inputProps={{
                                            min: formik.values.policyStartDate
                                        }}
                                        value={formik.values.policyEndDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyEndDate && Boolean(formik.errors.policyEndDate)}
                                        helperText={formik.touched.policyEndDate && formik.errors.policyEndDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Policy Status <span style={{ color: "red" }}>*</span></FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="policyStatus"
                                            name="policyStatus"
                                            size='small'
                                            fullWidth
                                            value={formik.values.policyStatus}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.policyStatus &&
                                                Boolean(formik.errors.policyStatus)
                                            }
                                            helperText={
                                                formik.touched.policyStatus && formik.errors.policyStatus
                                            }
                                        >
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="InActive">InActive </MenuItem>
                                            <MenuItem value="Canceled">Canceled </MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.policyStatus && formik.errors.policyStatus}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Policy Coverage Details
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Coverage Amounts <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="coverageAmounts"
                                        name="coverageAmounts"
                                        size='small'
                                        type='number'
                                        fullWidth
                                        value={formik.values.coverageAmounts}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.coverageAmounts &&
                                            Boolean(formik.errors.coverageAmounts)
                                        }
                                        helperText={
                                            formik.touched.coverageAmounts && formik.errors.coverageAmounts
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Deductibles <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="deductibles"
                                        name="deductibles"
                                        size='small'
                                        type='number'
                                        fullWidth
                                        value={formik.values.deductibles}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.deductibles &&
                                            Boolean(formik.errors.deductibles)
                                        }
                                        helperText={
                                            formik.touched.deductibles && formik.errors.deductibles
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Limits <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="limits"
                                        name="limits"
                                        size='small'
                                        type='number'
                                        fullWidth
                                        value={formik.values.limits}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.limits &&
                                            Boolean(formik.errors.limits)
                                        }
                                        helperText={
                                            formik.touched.limits && formik.errors.limits
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Insured Details
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Person Name <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        name='insuredPersonName'
                                        size='small'
                                        fullWidth
                                        value={formik.values.insuredPersonName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.insuredPersonName && Boolean(formik.errors.insuredPersonName)}
                                        helperText={formik.touched.insuredPersonName && formik.errors.insuredPersonName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Date Of Birth <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        name='insuredPersonDateOfBirth'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        inputProps={{
                                            max: moment(today).format('YYYY-MM-DD')
                                        }}
                                        value={formik.values.insuredPersonDateOfBirth}
                                        onChange={formik.handleChange}
                                        error={formik.touched.insuredPersonDateOfBirth && Boolean(formik.errors.insuredPersonDateOfBirth)}
                                        helperText={formik.touched.insuredPersonDateOfBirth && formik.errors.insuredPersonDateOfBirth}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Relationship to the insured <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="relationshipToTheInsured"
                                        name="relationshipToTheInsured"
                                        size='small'
                                        fullWidth
                                        value={formik.values.relationshipToTheInsured}
                                        onChange={formik.handleChange}
                                        error={formik.touched.relationshipToTheInsured && Boolean(formik.errors.relationshipToTheInsured)}
                                        helperText={formik.touched.relationshipToTheInsured && formik.errors.relationshipToTheInsured}
                                    />
                                </Grid>

                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Insured person's contact information
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Phone Number <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id=""
                                        name="phoneNumber"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Email <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="email"
                                        size='small'
                                        fullWidth
                                        value={formik.values.emailAddress}
                                        onChange={formik.handleChange}
                                        error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                                        helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Instagram Profile</FormLabel>
                                    <TextField
                                        id="instagramProfile"
                                        name="instagramProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        onChange={(e) => formik.setFieldValue('instagramProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.instagramProfile && <a href={`https://www.instagram.com/${formik.values.instagramProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Twitter profile</FormLabel>
                                    <TextField
                                        id="twitterProfile"
                                        name="twitterProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        onChange={(e) => formik.setFieldValue('twitterProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.twitterProfile && <a href={`https://twitter.com/${formik.values.twitterProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Additional Insured
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Person Name</FormLabel>
                                    <TextField
                                        id="additionalInsuredPersonName"
                                        name="additionalInsuredPersonName"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalInsuredPersonName}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Date Of Birth</FormLabel>
                                    <TextField
                                        name='additionalInsuredDateOfBirth'
                                        type='date'
                                        size='small'
                                        inputProps={{
                                            max: moment(today).format('YYYY-MM-DD')
                                        }}
                                        fullWidth
                                        value={formik.values.additionalInsuredDateOfBirth}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionalInsuredDateOfBirth && Boolean(formik.errors.additionalInsuredDateOfBirth)}
                                        helperText={formik.touched.additionalInsuredDateOfBirth && formik.errors.additionalInsuredDateOfBirth}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Relationship to the insured</FormLabel>
                                    <TextField
                                        id="additionalRelationshipToTheInsured"
                                        name="additionalRelationshipToTheInsured"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalRelationshipToTheInsured}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Additional insured person's contact information
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <TextField
                                        id="additionalPhoneNumber"
                                        name="additionalPhoneNumber"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalPhoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionalPhoneNumber && Boolean(formik.errors.additionalPhoneNumber)}
                                        helperText={formik.touched.additionalPhoneNumber && formik.errors.additionalPhoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Email</FormLabel>
                                    <TextField
                                        id="additionalEmailAddress"
                                        name="additionalEmailAddress"
                                        type="email"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalEmailAddress}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionalEmailAddress && Boolean(formik.errors.additionalEmailAddress)}
                                        helperText={formik.touched.additionalEmailAddress && formik.errors.additionalEmailAddress}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Instagram profile</FormLabel>
                                    <TextField
                                        id="additionalInstagramProfile"
                                        name="additionalInstagramProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        onChange={(e) => formik.setFieldValue('additionalInstagramProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.additionalInstagramProfile && <a href={`https://www.instagram.com/${formik.values.additionalInstagramProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Twitter profile</FormLabel>
                                    <TextField
                                        id="additionalTwitterProfile"
                                        name="additionalTwitterProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        onChange={(e) => formik.setFieldValue('additionalTwitterProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.additionalTwitterProfile && <a href={`https://twitter.com/${formik.values.additionalTwitterProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Policy Premiums and Payments
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Premium Amount</FormLabel>
                                    <TextField
                                        id="premiumAmount"
                                        name="premiumAmount"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.premiumAmount}
                                        onChange={formik.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Premium Payments</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="FrequencyOfPremiumPayments"
                                            name="FrequencyOfPremiumPayments"
                                            label=""
                                            size='small'
                                            value={formik.values.FrequencyOfPremiumPayments}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Monthly">Monthly</MenuItem>
                                            <MenuItem value="Annually">Annually </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Underwriting Information
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Name</FormLabel>
                                    <TextField
                                        id=""
                                        name="underwriterName"
                                        type=""
                                        fullWidth
                                        size='small'
                                        value={formik.values.underwriterName}
                                        onChange={formik.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <TextField
                                        id=""
                                        name="underwriterPhone"
                                        type="number"
                                        fullWidth
                                        size='small'
                                        value={formik.values.underwriterPhone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.underwriterPhone && Boolean(formik.errors.underwriterPhone)}
                                        helperText={formik.touched.underwriterPhone && formik.errors.underwriterPhone}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Email</FormLabel>
                                    <TextField
                                        id=""
                                        name="underwriterEmail"
                                        type=""
                                        fullWidth
                                        size='small'
                                        value={formik.values.underwriterEmail}
                                        onChange={formik.handleChange}
                                        error={formik.touched.underwriterEmail && Boolean(formik.errors.underwriterEmail)}
                                        helperText={formik.touched.underwriterEmail && formik.errors.underwriterEmail}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Underwriter Remarks</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="underwriterDecisions"
                                            name="underwriterDecisions"
                                            label=""
                                            size='small'
                                            value={formik.values.underwriterDecisions}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Policyholder has a clean driving record">Policyholder has a clean driving record</MenuItem>
                                            <MenuItem value="Policyholder's property located in a low-risk area">Policyholder's property located in a low-risk area </MenuItem>
                                            <MenuItem value="Underwriter consulted with the claims department to assess potential risks.">Underwriter consulted with the claims department to assess potential risks. </MenuItem>
                                        </Select>
                                    </FormControl>
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

export default Add