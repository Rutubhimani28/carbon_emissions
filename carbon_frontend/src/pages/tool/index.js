import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, FormLabel, Grid, Modal, TextField, Typography, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import { TiInfoLarge } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import * as yup from 'yup';
import { addToolData, clearToolFormData } from '../../redux/slice/toolSlice';
import { fetchResultTableDatasFromDb, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
import f2FEvent from "../../layouts/user/assets/images/F2F Event.jpg";
import virtualEvent from "../../layouts/user/assets/images/Virtual Event.jpg";
import outbound from "../../layouts/user/assets/images/outbound.JPEG";
import prEvent from "../../layouts/user/assets/images/PR Event.jpg";
import digitalCampaign from "../../layouts/user/assets/images/Digital Campaign.jpg";
import useSetEventData from '../../hooks/useSetEventData';
import useEventData from '../../hooks/useEventData';
import useGenerateSendFilledFieldsData from '../../hooks/useGenerateSendFilledFieldsData';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 20,
    p: 4,
};

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'transparent', // Sets the background color of the control to transparent
        border: '2px solid #ced4da', // border style
        borderRadius: '6px', // border radius
        padding: '1px',
        '&:hover': {
            border: '1px solid black', // border style on hover
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'white', // bg colo    r of the dropdown menu
        color: 'black',
    }),
    option: (provided, state) => ({
        ...provided,
        color: 'black', // Text color of options in the dropdown menu
        '&:hover': {
            backgroundColor: '#6c757d', // bg color on hover
            color: 'white', // text color on hover
        },
    }),
    input: (provided) => ({
        ...provided,
        color: 'white', // Sets the text color while searching
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white', // Text color of the selected value
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'white', // Placeholder color
    }),
};

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    // const [countriesData, setCountriesData] = useState([]);
    const [openInfo, setOpenInfo] = React.useState(false);
    const [isSubmited, setIsSubmited] = useState(false);
    // const [actionChoiceState, setActionChoiceState] = React.useState('add');
    const [isDisabledField, setIsDisabledField] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toolData = useSelector((state) => state.toolDetails?.data);

    const userSessionData = sessionStorage.getItem('user');
    const userData = JSON.parse(userSessionData);

    const resultTableData = useSelector(state => state.resultTableDataDetails);

    const eventsData = useEventData();
    const { setParticularEventFetchedData, handleDeleteAllData } = useSetEventData();
    const { addEmail, addEmailForGraph, ...dataFromUseGenerateSendFilledFieldsData } = useGenerateSendFilledFieldsData();

    const previousEvent = resultTableData?.userAllEventsData?.map((item) => ({ value: item._id, label: `${item?.activityName} - ${item?.dateTime}` }));
    // const previousEvent = resultTableData?.userAllEventsData?.map((item) => ({ value: item._id, label: `${item?.activityName} - ${dayjs(item?.dateTime).format('MM/DD/YYYY hh:mm')}` }));

    const handleOpenInfo = () => setOpenInfo(true);
    const handleInfoClose = () => setOpenInfo(false);

    const initialValues = {
        name: userData?.cnctPerson,
        email: userData?.loginId,
        // email: userData?.altCnctPersonBusEmail,
        activityName: '',
        country: '',
        budget: '',
        // dateTime: '',
        dateTime: null,
        isValidData: false,
        isDirtyData: false,
        actionChoice: 'add',
        previousEvent: null,
        isDisabledRetrieveButtons: true
    };

    const validationSchema = yup.object({
        // name: yup.string().required('Name is required'),
        // email: yup.string().email('Invalid Email').required('Business Email is required'),
        activityName: yup.string().required('Activity Name is required'),
        country: yup.string().required('Country is required'),
        budget: yup.number().required('Budget is required'),
        dateTime: yup.string().required('Date is required'),
    });

    const AddData = (values) => {
        setIsLoading(true);
        dispatch(addToolData(values));
        setIsLoading(false);
    };

    const handleFormClear = () => {
        dispatch(clearToolFormData());
    };

    const handleActionChoiceChange = (e) => {
        formik.setFieldValue("actionChoice", e.target.value);
        formik.setFieldValue("activityName", "");
        formik.setFieldValue("country", "");
        formik.setFieldValue("budget", "");
        formik.setFieldValue("dateTime", null);
        setIsDisabledField(e.target.value === "retrieve");
        // setActionChoiceState(e.target.value);

        if (e.target.value === 'retrieve') {
            formik.setFieldValue("previousEvent", null);

        }

        if (e.target.value === 'add') {
            formik.setFieldValue("isDisabledRetrieveButtons", true);
            handleDeleteAllData();   // clear all slice
            // formik.resetForm();
        }
    };

    const handlePreviousEventSelect = (e) => {


        formik.setFieldValue("previousEvent", e || null);
        formik.setFieldValue("isDisabledRetrieveButtons", true);

        if (e && e.value) {
            fetchUsesAllEventsData(e.value);
            formik.setFieldValue("isDisabledRetrieveButtons", false);
        } else {
            handleDeleteAllData();   // clear all slice
            // formik.resetForm();
        }
    };

    const fetchUsesAllEventsData = async (id) => {
        const resultAction = await dispatch(fetchResultTableDatasFromDb(id));
        if (fetchResultTableDatasFromDb.rejected.match(resultAction)) {
            console.error("--- Error fetching user all events data");
            return;
        }
        if (id) {
            setParticularEventFetchedData(...resultAction.payload?.data ? resultAction.payload?.data : {});
            setIsSubmited(true);
        }
    };

    const handleRetrieveCalculations = async () => {
        const resultAction = await dispatch(fetchResultTableDatasFromDb());
        if (fetchResultTableDatasFromDb.rejected.match(resultAction)) {
            console.error("--- Error fetching retrieve event calculations data");
            return;
        }
        await addEmail(); // send event filled fields data as pdf
    };

    const handleRetrieveGraph = async () => {
        const resultAction = await dispatch(fetchResultTableDatasFromDb());
        if (fetchResultTableDatasFromDb.rejected.match(resultAction)) {
            console.error("--- Error fetching retrieve event data for graph");
            return;
        }
        await addEmailForGraph(resultTableData?.eventDataId); // send current events data as graph
    };

    // const handleSaveToDb = async () => {
    //     // Trigger form validation
    //     await formik.validateForm();

    //     // Check if form is valid (no errors)
    //     if (!formik.isValid) {
    //         console.log("Form contains errors, submission halted.");
    //         return;
    //     }

    //     formik.handleSubmit();

    //     const eventData = {
    //         ...eventsData,
    //     };

    //     if (!resultTableData?.eventDataId) {
    //         const resultAction = await dispatch(addResultTableDatasToDb(eventData));
    //         if (addResultTableDatasToDb.rejected.match(resultAction)) {
    //             console.error('Failed to save data:', resultAction.payload);
    //         }
    //     }
    // };
    const handleSaveToDb = async () => {
        formik.handleSubmit();

        const eventData = {
            // ...eventsData,

            activityName: formik.values?.activityName || '',
            budget: formik.values?.budget || '',
            country: formik.values?.country || '',
            dateTime: formik.values?.dateTime || '',

            f2fEventData: [],
            virtualEventData: [],
            prEventData: [],
            digitalCampaignData: [],

            airTravelAllData: { data: [], totalEmission: 0 },
            localTranspotationAllData: { data: [], totalEmission: 0 },
            hotelAllData: { data: [], totalEmission: 0 },
            foodAllData: { data: [], totalEmission: 0 },
            airFreightAllData: { data: [], totalEmission: 0 },
            productionAllData: { data: [], totalEmission: 0 },
            energyUpdatedAllData: { data: [], totalEmission: 0 },
            digitalContentAllData: { data: [], totalEmission: 0 },
            wasteAllData: { data: [], totalEmission: 0 },
        };

        // if (resultTableData.eventDataId) {
        //     eventData.eventDataId = resultTableData?.eventDataId;
        //     console.log("=== called for update", eventData);
        //     const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
        //     if (updateResultTableDatasToDb.rejected.match(resultAction)) {
        //         console.error('Failed to update data:', resultAction.payload);
        //     }
        // } else {
        //     console.log("=== called for save");

        //     const resultAction = await dispatch(addResultTableDatasToDb(eventData));
        //     if (addResultTableDatasToDb.rejected.match(resultAction)) {
        //         console.error('Failed to save data:', resultAction.payload);
        //     }
        // }

        await formik.validateForm();

        if (!resultTableData.eventDataId && formik.isValid) {
            const resultAction = await dispatch(addResultTableDatasToDb(eventData));
            if (addResultTableDatasToDb.rejected.match(resultAction)) {
                console.error('Failed to save data:', resultAction.payload);
            }
        }
    };

    // const handleSaveToDb = async () => {
    //     formik.handleSubmit();

    //     const eventData = {
    //         ...eventsData,
    //     };

    //     // if (resultTableData.eventDataId) {
    //     //     eventData.eventDataId = resultTableData?.eventDataId;
    //     //     console.log("=== called for update", eventData);
    //     //     const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
    //     //     if (updateResultTableDatasToDb.rejected.match(resultAction)) {
    //     //         console.error('Failed to update data:', resultAction.payload);
    //     //     }
    //     // } else {
    //     //     console.log("=== called for save");

    //     //     const resultAction = await dispatch(addResultTableDatasToDb(eventData));
    //     //     if (addResultTableDatasToDb.rejected.match(resultAction)) {
    //     //         console.error('Failed to save data:', resultAction.payload);
    //     //     }
    //     // }

    //     if (!resultTableData.eventDataId) {
    //         const resultAction = await dispatch(addResultTableDatasToDb(eventData));
    //         if (addResultTableDatasToDb.rejected.match(resultAction)) {
    //             console.error('Failed to save data:', resultAction.payload);
    //         }
    //     }
    // };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmited(true);
            formik.setFieldValue('isDirtyData', formik?.dirty);
            formik.setFieldValue('isValidData', formik?.isValid);
            AddData({ type: 'toolForm', ...values, isDirtyData: formik?.dirty, isValidData: formik?.isValid, isSubmited: true });
        },
    });

    useEffect(() => {
        if (
            toolData?.length > 0 &&
            ![null, undefined, -1].includes(toolData?.findIndex((item) => item?.type === 'toolForm'))
        ) {

            const formPrevData = toolData.find((item) => item.type === 'toolForm');
            formik.setFieldValue('name', formPrevData?.name);
            formik.setFieldValue('activityName', formPrevData?.activityName);
            formik.setFieldValue('country', formPrevData?.country);
            formik.setFieldValue('budget', formPrevData?.budget);
            // formik.setFieldValue('dateTime', formPrevData?.dateTime);
            formik.setFieldValue('dateTime', formPrevData?.dateTime);
            // formik.setFieldValue('dateTime', dayjs(formPrevData?.dateTime).format('MM/DD/YYYY hh:mm'));
            formik.setFieldValue('email', formPrevData?.email);
            // formik.setFieldValue('isDirtyData', formPrevData?.isDirtyData);
            formik.setFieldValue('actionChoice', formPrevData?.actionChoice);
            formik.setFieldValue('previousEvent', formPrevData?.previousEvent);
            formik.setFieldValue('isDisabledRetrieveButtons', formPrevData?.isDisabledRetrieveButtons);
            setIsSubmited(formPrevData.isSubmited);
            // setActionChoiceState(formPrevData?.actionChoice);
            setIsDisabledField(formPrevData?.actionChoice === "retrieve");
        }
        else {
            formik.setFieldValue('name', '');
            formik.setFieldValue('activityName', '');
            formik.setFieldValue('country', '');
            formik.setFieldValue('budget', '');
            formik.setFieldValue('dateTime', '');
            formik.setFieldValue('email', '');
            formik.setFieldValue('previousEvent', null);
            formik.setFieldValue('isDirtyData', false);
            formik.setFieldValue('isValidData', false);
            formik.setFieldValue('isDisabledRetrieveButtons', true);
        }
    }, [toolData]);

    useEffect(() => {
        const handleError = async () => {
            const msg = await formik.validateForm();
            if (Object.keys(msg)?.length > 0) {
                setIsSubmited(false);
            } else {
                // setIsSubmited(true);
            }
        }
        handleError();

    }, [formik.values]);

    useEffect(() => {
        fetchUsesAllEventsData();
    }, [dispatch, formik.values.actionChoice]);

    return (
        <>
            <Container maxWidth="lg" className="text-white">
                <TiInfoLarge className="fs-3 bg-white text-dark rounded-circle mx-3 p-1" onClick={() => handleOpenInfo()} style={{ cursor: 'pointer', position: 'absolute', right: '4px' }} />
                <Box textAlign="center" mt={4}>
                    {/* <img src={logo} alt="Sirat Logo" style={{ width: '200px', height: 'auto', display: 'block', margin: '0 auto' }} /> */}
                    <Typography variant='h2' mt={2} className="text fs-1">
                        {/* Welcome to Sirāt's NetZero Platform */}
                        {`Welcome ${userData?.cnctPerson} to Sirāt's NetZero Platform `}
                    </Typography>
                    {/* <Typography mt={3} className='fs-5'>
                    To obtain a more accurate CO2 footprint generated from your activity, please input your data in as many fields as possible.
                </Typography>
                <Typography className='fs-5'>
                    You can save the data and come back later before submitting.
                </Typography> */}
                </Box>
                <Box className="mt-2">
                    <Grid
                        container
                        spacing={2}
                        p={4}
                        columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                        className="d-flex flex-column justify-content-center align-items-center"
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            border={2}
                            borderColor={'#e2e2e2'}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            borderRadius={'10px'}
                        >
                            <Grid container spacing={2} py={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ paddingRight: '24px' }}>
                                {/* <Grid item xs={12} sm={6}>
                                <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                    Name <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <TextField
                                    name="name"
                                    type="text"
                                    size="small"
                                    fullWidth
                                    className="textborder"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                    Business Email <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <TextField
                                    name="email"
                                    type="email"
                                    size="small"
                                    className="textborder"
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    inputProps={{ style: { color: 'white' } }}
                                />
                            </Grid> */}
                                <Grid item xs={12} sm={12}>
                                    {/* <FormLabel className="fw-bold text-white mt-1">
                                        What would you like to do?
                                    </FormLabel> */}
                                    <RadioGroup

                                        name="actionChoice"
                                        value={formik.values?.actionChoice}
                                        onChange={handleActionChoiceChange}
                                    >
                                        <FormControlLabel
                                            value="add"
                                            control={<Radio />}
                                            label="New Activity"
                                        />
                                        <FormControlLabel
                                            value="retrieve"
                                            control={<Radio />}
                                            label="Retrive Previous Activity"
                                        />
                                    </RadioGroup>
                                </Grid>
                                {formik.values?.actionChoice === "retrieve" &&
                                    <Grid item xs={12} sm={16} md={12}>
                                        <Grid mt={2}>
                                            <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Retrive your Activity</FormLabel>
                                            <FormControl fullWidth>
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    isDisabled={false}
                                                    isClearable={Boolean(true)}
                                                    isRtl={false}
                                                    isSearchable
                                                    name="previousEvent"
                                                    placeholder="Retrive your Activity"
                                                    options={previousEvent}
                                                    styles={customStyles}
                                                    value={formik?.values?.previousEvent || null}
                                                    onChange={handlePreviousEventSelect}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                }
                                {/* <Grid item xs={12} sm={6} className='table-custom-inpt-field'> */}
                                <Grid item xs={12} sm={6}>
                                    <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                        Activity Name <span style={{ color: 'red' }}>*</span>
                                    </FormLabel>
                                    <TextField
                                        name="activityName"
                                        type="text"
                                        size="small"
                                        className="textborder custom-inpt-field-color"
                                        fullWidth
                                        disabled={isDisabledField}
                                        value={formik.values.activityName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.activityName && Boolean(formik.errors.activityName)}
                                        helperText={formik.touched.activityName && formik.errors.activityName}
                                        inputProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={6} className='table-custom-inpt-field'> */}
                                <Grid item xs={12} sm={6}>
                                    <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                        Country <span style={{ color: 'red' }}>*</span>
                                    </FormLabel>
                                    <TextField
                                        name="country"
                                        type="text"
                                        size="small"
                                        fullWidth
                                        className="textborder custom-inpt-field-color"
                                        disabled={isDisabledField}
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.country && Boolean(formik.errors.country)}
                                        helperText={formik.touched.country && formik.errors.country}
                                        inputProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                    <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                        Date <span style={{ color: 'red' }}>*</span>
                                    </FormLabel>
                                    <TextField
                                        name="dateTime"
                                        type="date"
                                        size="small"
                                        className="textborder"
                                        fullWidth
                                        disabled={isDisabledField}
                                        value={formik.values.dateTime}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
                                        helperText={formik.touched.dateTime && formik.errors.dateTime}
                                        inputProps={{ style: { color: 'white' } }}
                                    />
                                </Grid> */}
                                {/* <Grid item xs={12} sm={12} className='table-custom-inpt-field'> */}
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormLabel className="fw-bold text-white mt-1">
                                                Date and Time <span style={{ color: 'red' }}>*</span>
                                            </FormLabel>
                                            <DateTimePicker
                                                renderInput={(props) => (
                                                    <TextField
                                                        {...props}
                                                        size="small"
                                                        fullWidth
                                                        disabled={isDisabledField}
                                                        error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
                                                        // helperText={formik.touched.dateTime && formik.errors.dateTime}
                                                        inputProps={{ style: { color: 'white' } }}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: 'white', // Border color
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'white', // Border color on hover
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: 'white', // Border color when focused
                                                                },
                                                            },
                                                            '& .MuiInputBase-input': {
                                                                color: 'white !important', // Input text color
                                                            },
                                                            '& .MuiInputBase-input::placeholder': {
                                                                color: 'white !important', // Placeholder color
                                                            },
                                                        }}
                                                        ampm={false}
                                                    />
                                                )}
                                                disabled={isDisabledField}
                                                value={formik.values.dateTime ? dayjs(formik.values.dateTime) : null}
                                                // onChange={(newValue) => {
                                                //     // Store date as UTC
                                                //     // formik.setFieldValue("dateTime", newValue ? newValue.toISOString() : null);
                                                //     formik.setFieldValue("dateTime", newValue);
                                                //     formik.setFieldTouched("dateTime", true); // Mark as touched here
                                                // }}
                                                onChange={(newValue) => {
                                                    formik.setFieldValue('dateTime', newValue ? dayjs(newValue).format('YYYY-MM-DD HH:mm') : null);
                                                    formik.setFieldTouched('dateTime', true);
                                                }}

                                                onOpen={() => {
                                                    console.log("--- onOpen called ");
                                                    formik.setFieldTouched("dateTime", true); // Set touched on open
                                                }}
                                                onError={(error) => {
                                                    if (error) {
                                                        formik.setFieldTouched("dateTime", true);
                                                        formik.setFieldError("dateTime", "Date is required");
                                                    }
                                                }}
                                                defaultValue={null}
                                                className='custom-dateTimePicker-field'
                                                format="YYYY-MM-DD HH:mm"
                                                ampm={false}

                                            />
                                            {formik.touched.dateTime && formik.errors.dateTime && (
                                                <FormLabel className="mt-1" style={{ fontSize: '0.75rem', color: '#FF4842' }}>
                                                    {formik.errors.dateTime}
                                                </FormLabel>
                                            )}
                                        </div>
                                    </LocalizationProvider>
                                </Grid>
                                {/* <Grid item xs={12} sm={6} className='table-custom-inpt-field'> */}
                                <Grid item xs={12} sm={6}>
                                    <FormLabel className="fw-bold text-white mt-1" id="demo-row-radio-buttons-group-label">
                                        Allotted Budget (in$) <span style={{ color: 'red' }}>*</span>
                                    </FormLabel>
                                    <TextField
                                        name="budget"
                                        type="number"
                                        size="small"
                                        className="textborder custom-inpt-field-color"
                                        fullWidth
                                        disabled={isDisabledField}
                                        value={formik.values.budget}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.budget && Boolean(formik.errors.budget)}
                                        helperText={formik.touched.budget && formik.errors.budget}
                                        inputProps={{ style: { color: 'white' } }}
                                        InputProps={{
                                            style: { color: isDisabledField ? 'white' : 'white' },
                                            disabled: isDisabledField
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <p className="pt-2">
                                        <span style={{ color: "white", fontSize: "14px" }}>By clicking on Save you agree to Sirāt’s {' '}</span>
                                        <Link style={{ color: '#ffffd9', textDecoration: 'none', fontSize: "14px" }} to="/dashboard/terms-conditions">
                                            {' '}
                                            Terms & Conditions.
                                        </Link>
                                    </p>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Button
                                        id="action"
                                        variant="contained"
                                        // onClick={formik.handleSubmit}
                                        onClick={() => handleSaveToDb()}
                                        type="submit"
                                        style={{ backgroundColor: '#054723', width: "50px", marginRight: "10px" }}
                                    >
                                        {isLoading ? <CircularProgress size={27} /> : 'Save'}
                                    </Button>
                                    <Button
                                        id="action"
                                        variant="contained"
                                        onClick={() => handleRetrieveCalculations()}
                                        style={{ backgroundColor: '#054723', marginRight: "10px" }}
                                        disabled={formik.values?.isDisabledRetrieveButtons}
                                    >
                                        {/* {dataFromUseGenerateSendFilledFieldsData?.isFieldsLoading ? <CircularProgress size={27} /> : 'Retrieve Data'} */}
                                        Retrieve Data
                                    </Button>
                                    {/* <Button
                                        id="action"
                                        variant="contained"
                                        onClick={() => handleRetrieveGraph()}
                                        style={{ backgroundColor: '#054723', marginRight: "10px" }}
                                        disabled={formik.values?.isDisabledRetrieveButtons}
                                    >
                                        {dataFromUseGenerateSendFilledFieldsData?.isGraphLoading ? <CircularProgress size={27} /> : 'Retrieve Graph'}
                                    </Button> */}
                                </Grid>

                                {
                                    (dataFromUseGenerateSendFilledFieldsData?.isGraphLoading || dataFromUseGenerateSendFilledFieldsData?.isFieldsLoading) && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                // bgcolor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
                                                backdropFilter: 'blur(1px)', // Blur effect
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 10, // Ensure it’s above other content
                                            }}
                                        >
                                            <CircularProgress />
                                        </Box>
                                    )
                                }

                                <Grid item xs={5} sm={3} className="ps-0">
                                    {/* <Button
                                    variant="outlined"
                                    onClick={() => {
                                        handleFormClear();
                                        formik.resetForm();
                                    }}
                                    color="error"
                                >
                                    Clear
                                </Button> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Grid xs={3} md={6} spacing={2}>

                    <Typography className="mb-2 fs-5 text-center">Choose your Marketing activity</Typography>
                    <Grid xl={3} md={6} sm={12}>
                        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
                            <Box onClick={() => isSubmited && navigate('/dashboard/f2f-event')} className="organise m-2 p-2 h-25" style={{ borderRadius: "20px", cursor: "pointer" }}>
                                <img src={f2FEvent} alt="F2F Event" width={"100%"} style={{ borderRadius: "10px", aspectRatio: '135 / 76' }} height={"120px"} />
                                <Typography variant='h6' className='text-center pt-1 fontFamily' color="#054723">F2F Event</Typography>
                            </Box>

                            <Box onClick={() => isSubmited && navigate('/dashboard/virtual-event')} className="organise m-2 p-2 h-25" style={{ borderRadius: "20px", cursor: "pointer" }}>
                                <img src={outbound} alt="Outdoor Marketing" width={"100%"} style={{ borderRadius: "10px", aspectRatio: '135 / 76' }} height={"120px"} />
                                <Typography variant='h6' className='text-center pt-1 fontFamily' color="#054723">Outdoor Marketing</Typography>
                            </Box>

                            <Box onClick={() => isSubmited && navigate('/dashboard/pr-event')} className="organise m-2 p-2 h-25" style={{ borderRadius: "20px", cursor: "pointer" }}>
                                <img src={prEvent} alt="PR Event" width={"100%"} style={{ borderRadius: "10px", aspectRatio: '135 / 76' }} height={"120px"} />
                                <Typography variant='h6' className='text-center pt-1 fontFamily' color="#054723">PR Event</Typography>
                            </Box>

                            <Box onClick={() => isSubmited && navigate('/dashboard/campaign')} className="organise m-2 p-2 h-25" style={{ borderRadius: "20px", cursor: "pointer" }}>
                                <img src={digitalCampaign} alt="Digital Campaign" width={"100%"} style={{ borderRadius: "10px", aspectRatio: '135 / 76' }} height={"120px"} />
                                <Typography variant='h6' className='text-center pt-1 fontFamily' color="#054723">Digital Campaign</Typography>
                            </Box>
                        </Box>
                    </Grid>


                    {/* <Button
                    variant="contained"
                    color="primary"
                    className="fs-3"
                    // disabled={!isValid || !dirty || !isSubmited || Object.keys(errors).length > 0}
                    // disabled={!isValid || !dirty}
                    // disabled={isSubmited ? !isSubmited : (!isValid || !dirty)}
                    disabled={!isSubmited}
                    style={{ marginRight: '10px', backgroundColor: '#054723' }}
                    onClick={() => navigate('/dashboard/f2f-event')}
                >
                    F2F Event
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="fs-3"
                    // disabled={!isValid || !dirty || !isSubmited || Object.keys(errors).length > 0}
                    // disabled={!isValid || !dirty}
                    // disabled={isSubmited ? !isSubmited : (!isValid || !dirty)}
                    disabled={!isSubmited}
                    style={{ marginRight: '10px', backgroundColor: '#054723' }}
                    onClick={() => navigate('/dashboard/virtual-event')}
                >
                    Virtual Event
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="fs-3"
                    // disabled={!isValid || !dirty || !isSubmited || Object.keys(errors).length > 0}
                    // disabled={!isValid || !dirty}
                    // disabled={isSubmited ? !isSubmited : (!isValid || !dirty)}
                    disabled={!isSubmited}
                    style={{ marginRight: '10px', backgroundColor: '#054723' }}
                    onClick={() => navigate('/dashboard/pr-event')}
                >
                    PR Event
                </Button>
                <Button
                    variant="contained"
                    className="fs-3"
                    // disabled={!isValid || !dirty || !isSubmited || Object.keys(errors).length > 0}
                    // disabled={!isValid || !dirty}
                    // disabled={isSubmited ? !isSubmited : (!isValid || !dirty)}
                    disabled={!isSubmited}
                    style={{ backgroundColor: '#054723' }}
                    onClick={() => navigate('/dashboard/campaign')}
                >
                    Digital Campaign
                </Button> */}

                </Grid>


                <Typography className="fs-5 text-center my-4">
                    If you face any problems or have questions, please send your query to{' '}
                    <Link to="mailto:info@sirat.earth" style={{ color: '#ffffd9', textDecoration: 'none' }}>
                        Sirāt
                    </Link>
                </Typography>
                <Modal
                    open={openInfo}
                    onClose={handleInfoClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ fontStyle: 'italic', textDecoration: 'underline', marginLeft: '-18px' }}>Note</h4>
                            <CloseIcon onClick={handleInfoClose} style={{ cursor: 'pointer' }} />
                        </div>
                        <ul>
                            <li>
                                To obtain an accurate Carbon footprint generated from your activity, please input the data in the allotted
                                fields
                            </li>
                            <li>
                                You can save the data and come back later before submitting and you can’t change the values after
                                submitting.
                            </li>
                            <li>
                                The summary page will give you how much Carbon footprint you generated per $ spent on your above activity.
                            </li>
                            {/* <li>All the emissions values are in kgCO2e.</li>
                        <li>If you face any problems or have questions, please send your query to Sirāt</li> */}
                        </ul>
                    </Box>
                </Modal>
            </Container >
        </>
    );
};

export default Home;