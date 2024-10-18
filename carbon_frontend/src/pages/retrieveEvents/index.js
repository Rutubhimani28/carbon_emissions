import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { Box, Button, Typography, CircularProgress, Grid, Container, Stack, IconButton, Menu, MenuItem, Card, TextField } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { CiExport } from "react-icons/ci";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TableStyle from '../../components/TableStyle';
import { apiget, apipost, apidelete } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import { fetchEventsEmissionsData } from '../../redux/slice/eventsEmissionsDataSlice';



// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// const previousEvents = [
//     { value: 'event1', label: 'Event 1 - Description goes here' },
//     { value: 'event2', label: 'Event 2 - Description goes here' },
//     { value: 'event3', label: 'Event 3 - Description goes here' },
//     { value: 'event4', label: 'Event 4 - Description goes here' },
// ];

const MyEventSelector = () => {
    const columns = [
        {
            "field": "activityName",
            "headerName": "Activity Name",
            "width": 175
        },
        {
            "field": "f2fEventTotalEmission",
            "headerName": "F2F Event Emission",
            "width": 175
        },
        {
            "field": "virtualEventTotalEmission",
            "headerName": "Virtual Event Emission",
            "width": 175
        },
        {
            "field": "prEventTotalEmission",
            "headerName": "PR Event Emission",
            "width": 175
        },
        {
            "field": "digitalCampaignTotalEmission",
            "headerName": "Digital Campaign Emission",
            "width": 175
        },
        {
            field: "dateTime",
            headerName: "Date/Time",
            width: 175,
            valueFormatter: (params) => {
                return dayjs(params.value).format('MM/DD/YYYY hh:mm A');
            },
        },
        {
            "field": "budget",
            "headerName": "Budget ($)",
        },
        {
            "field": "createdBy",
            "headerName": "Created By",
            "width": 175
        }
    ];

    const csvColumns = [
        { Header: "Activity Name", accessor: 'activityName' },
        { Header: "F2F Event Emission", accessor: 'f2fEventTotalEmission' },
        { Header: "Virtual Event Emission", accessor: 'virtualEventTotalEmission' },
        { Header: "PR Event Emission", accessor: 'prEventTotalEmission' },
        { Header: "Digital Campaign Emission", accessor: 'digitalCampaignTotalEmission' },
        { Header: "Date/Time", accessor: 'dateTime' },
        { Header: "Budget ($)", accessor: 'budget' },
        { Header: "Created By", accessor: 'createdBy' },
    ];

    const userid = sessionStorage.getItem('user_id');
    const userSessionData = sessionStorage.getItem('user');
    const userData = JSON.parse(userSessionData);
    const resultTableData = useSelector(state => state.resultTableDataDetails);
    const previousEvents = resultTableData?.userAllEventsData?.map((item) => ({ value: item._id, label: `${item?.activityName} - ${dayjs(item?.dateTime).format('MM/DD/YYYY hh:mm A')}` }));

    const [isGraphLoading, setIsGraphLoading] = useState(false);
    const [isFieldsLoading, setIsFieldsLoading] = useState(false);

    const [userAction, setUserAction] = useState(null)
    const [selectedRowIds, setSelectedRowIds] = useState([]);

    const [emailInput, setEmailInput] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data, isLoading } = useSelector((state) => state?.eventsEmissionsDetails);

    const formatOptionLabel = ({ label }) => (
        <Typography noWrap title={label}>
            {label}
        </Typography>
    );

    const validationSchema = yup.object({
        addEmail: yup.string().email('Email not valid')
    });

    const formik = useFormik({
        initialValues: {
            selectedEvents: [],
            emails: [`${userData?.loginId}`],
            addEmail: ''
        },
        validationSchema,
        validate: values => {
            const errors = {};
            if (values.selectedEvents.length < 2) {
                errors.selectedEvents = 'You must select at least 2 events';
            }
            if (values.selectedEvents.length > 2) {
                errors.selectedEvents = 'You can select a maximum of 2 events';
            }
            return errors;
        },
        onSubmit: values => {
            // console.log('Selected events:', values.selectedEvents);
        },
    });

    const addEmail = async (eventsData) => {
        setIsFieldsLoading(true);
        try {
            await apipost('api/email/add-email-for-two-events', { eventsData });
        } catch (error) {
            console.error("--- addEmail error ", error);
        }
        setIsFieldsLoading(false);
    };

    // send graphs data to genearet pdf and send to mail
    const addEmailForGraphs = async (payload) => {
        try {
            await apipost('api/email/addGraph', payload);
        } catch (error) {
            console.error("--- addEmail error ", error);
        }
    };

    const handleRetrieveCalculations = async () => {
        setIsFieldsLoading(true);
        const returnArr = [];

        const selectedValues = formik.values.selectedEvents.map(event => event.value);
        
        const apiPath = `api/eventData?_id[]=${selectedValues.join('&_id[]=')}`;
        const response = await apiget(apiPath);
        const responseData = response.data.data;

        const virtualEventsDataCreate = (data) => {
            const dataTwo = [];

            data.forEach((item) => {
                const emissionsData = item?.vitrualEventAllData?.data?.[0]?.data;

                if (emissionsData && emissionsData.length > 0) {
                    const obj = {
                        totalTvAd: Number(emissionsData.find(i => i?.name === "TV Ad")?.emission) || 0,
                        totalNewspaper: Number(emissionsData.find(i => i?.name === "Newspaper- Full page Ad")?.emission) || 0,
                        totalMagazine: Number(emissionsData.find(i => i?.name === "Magazine")?.emission) || 0,
                        totalPodcast: Number(emissionsData.find(i => i?.name === "Podcast")?.emission) || 0,
                        totalPolyethylene: Number(emissionsData.find(i => i?.name === "Polyethylene HDPE Banner")?.emission) || 0,
                        totalPVC: Number(emissionsData.find(i => i?.name === "PVC Banners")?.emission) || 0,
                        grandTotal: Number(item?.vitrualEventAllData?.totalEmission).toFixed(2) || 0
                    };
                    dataTwo.push(obj);
                } else {
                    const obj = {
                        totalTvAd: 0,
                        totalNewspaper: 0,
                        totalMagazine: 0,
                        totalPodcast: 0,
                        totalPolyethylene: 0,
                        totalPVC: 0,
                        grandTotal: 0
                    };
                    dataTwo.push(obj);
                }
            });

            return dataTwo;
        };

        const dataOne = responseData?.map((item) => {
            return {
                totalAirTravel: Number(item?.airTravelAllData?.totalEmission).toFixed(2),
                totalLocalTransportation: Number(item?.localTranspotationAllData?.totalEmission).toFixed(2),
                totalHotel: Number(item?.hotelAllData?.totalEmission).toFixed(2),
                totalFood: Number(item?.foodAllData?.totalEmission).toFixed(2),
                totalAirFreight: Number(item?.airFreightAllData?.totalEmission).toFixed(2),
                totalProduction: Number(item?.productionAllData?.totalEmission).toFixed(2),
                totalEnergyUpdated: Number(item?.energyAllData?.totalEmission).toFixed(2),
                totalDigitalContent: Number(item?.digitalCommsAllData?.totalEmission).toFixed(2),
                totalWaste: Number(item?.wasteAllData?.totalEmission).toFixed(2),
                grandTotal: (
                    (Number(item?.airTravelAllData?.totalEmission || 0) +
                        Number(item?.localTransportationAllData?.totalEmission || 0) +
                        Number(item?.hotelAllData?.totalEmission || 0) +
                        Number(item?.foodAllData?.totalEmission || 0) +
                        Number(item?.airFreightAllData?.totalEmission || 0) +
                        Number(item?.productionAllData?.totalEmission || 0) +
                        Number(item?.energyAllData?.totalEmission || 0) +
                        Number(item?.digitalCommsAllData?.totalEmission || 0) +
                        Number(item?.wasteAllData?.totalEmission || 0))
                ).toFixed(2),
            };
        });

        const dataTwo = virtualEventsDataCreate(responseData);

        const dataThree = responseData?.map((item) => {
            return {
                totalComms: Number(item?.commsAllData?.totalEmission).toFixed(2),
                totalPrAgency: Number(item?.prAgencyAllData?.totalEmission).toFixed(2),
                totalHospitality: Number(item?.hospitalityAllData?.totalEmission).toFixed(2),
                grandTotal: (
                    (Number(item?.commsAllData?.totalEmission || 0) +
                        Number(item?.prAgencyAllData?.totalEmission || 0) +
                        Number(item?.hospitalityAllData?.totalEmission || 0))
                ).toFixed(2),
            }
        });

        const dataFour = responseData?.map((item) => {
            return {
                totalDigitalCampaign: Number(item?.digitalCampaignAllData?.totalEmission).toFixed(2),
                grandTotal: Number(item?.digitalCampaignAllData?.totalEmission).toFixed(2),
            }
        });

        // f2f-event
        dataOne.forEach((item, ind) => {
            if (Number(item?.grandTotal) > 0) {
                const obj = {
                    dataOne: dataOne[ind],
                    attachmentTemplateNameOne: "f2f_event_filled_fields_Template",
                    totalTonCo2One: (Number(item?.grandTotal) / 1000).toFixed(2) || 0,
                    eveydolarCo2One: (Number(item?.grandTotal) / Number(responseData[ind]?.budget)).toFixed(2) || 0,
                    resultTableDataOne: {
                        from: "f2fEvent",
                        allDataOfTab: responseData[ind]?.f2fEventData || []
                    },
                    attachmentPdfNameOne: `F2F Event- ${responseData[ind]?.activityName}`,
                    activityName: responseData[ind]?.activityName || '',
                    budget: responseData[ind]?.budget || '',
                    country: responseData[ind]?.country || '',
                    dateTime: responseData[ind]?.dateTime || '',
                    isAttachment: true,
                    subject: `${responseData[ind]?.activityName} activity all events emissions data`,
                    // receiver: [userData?.loginId],
                    receiver: formik.values?.emails,
                    sender: userid,
                    name: userData?.cnctPerson,
                };

                returnArr[ind] = { ...returnArr[ind], ...obj };
            }
        });

        // virtual-event
        dataTwo.forEach((item, ind) => {
            if (Number(item?.grandTotal) > 0) {
                const obj = {
                    dataTwo: dataTwo[ind],
                    attachmentTemplateNameTwo: "virtual_event_filled_fields_Template",
                    totalTonCo2Two: (Number(item?.grandTotal) / 1000).toFixed(2) || 0,
                    eveydolarCo2Two: (Number(item?.grandTotal) / Number(responseData[ind]?.budget)).toFixed(2) || 0,
                    resultTableDataTwo: {
                        from: "virtualEvent",
                        allDataOfTab: responseData[ind]?.prEventData || []
                    },
                    attachmentPdfNameTwo: `Virtual Event- ${responseData[ind]?.activityName}`,
                    activityName: responseData[ind]?.activityName || '',
                    budget: responseData[ind]?.budget || '',
                    country: responseData[ind]?.country || '',
                    dateTime: responseData[ind]?.dateTime || '',
                    isAttachment: true,
                    subject: `${responseData[ind]?.activityName} activity all events emissions data`,
                    // receiver: [userData?.loginId],
                    receiver: formik.values?.emails,
                    sender: userid,
                    name: userData?.cnctPerson,
                };

                returnArr[ind] = { ...returnArr[ind], ...obj };
            }
        });

        // pr-event
        dataThree.forEach((item, ind) => {
            if (Number(item?.grandTotal) > 0) {
                const obj = {
                    dataThree: dataThree[ind],
                    attachmentTemplateNameThree: "pr_event_filled_fields_Template",
                    totalTonCo2Three: (Number(item?.grandTotal) / 1000).toFixed(2) || 0,
                    eveydolarCo2Three: (Number(item?.grandTotal) / Number(responseData[ind]?.budget)).toFixed(2) || 0,
                    resultTableDataThree: {
                        from: "prEvent",
                        allDataOfTab: responseData[ind]?.prEventData || []
                    },
                    attachmentPdfNameThree: `PR Event- ${responseData[ind]?.activityName}`,
                    activityName: responseData[ind]?.activityName || '',
                    budget: responseData[ind]?.budget || '',
                    country: responseData[ind]?.country || '',
                    dateTime: responseData[ind]?.dateTime || '',
                    isAttachment: true,
                    subject: `${responseData[ind]?.activityName} activity all events emissions data`,
                    // receiver: [userData?.loginId],
                    receiver: formik.values?.emails,
                    sender: userid,
                    name: userData?.cnctPerson,
                };

                returnArr[ind] = { ...returnArr[ind], ...obj };
            }
        });

        // digital-campaign
        dataFour.forEach((item, ind) => {
            if (Number(item?.grandTotal) > 0) {
                const obj = {
                    dataFour: dataFour[ind],
                    attachmentTemplateNameFour: "digital_campaign_filled_fields_Template",
                    totalTonCo2Four: (Number(item?.grandTotal) / 1000).toFixed(2) || 0,
                    eveydolarCo2Four: (Number(item?.grandTotal) / Number(responseData[ind]?.budget)).toFixed(2) || 0,
                    resultTableDataFour: {
                        from: "digitalCampaign",
                        allDataOfTab: responseData[ind]?.digitalCampaignData || []
                    },
                    attachmentPdfNameFour: `Digital Campaign- ${responseData[ind]?.activityName}`,
                    activityName: responseData[ind]?.activityName || '',
                    budget: responseData[ind]?.budget || '',
                    country: responseData[ind]?.country || '',
                    dateTime: responseData[ind]?.dateTime || '',
                    isAttachment: true,
                    subject: `${responseData[ind]?.activityName} activity all events emissions data`,
                    // receiver: [userData?.loginId],
                    receiver: formik.values?.emails,
                    sender: userid,
                    name: userData?.cnctPerson,
                };

                returnArr[ind] = { ...returnArr[ind], ...obj };
            }
        });

        await addEmail(returnArr); // send all selected two events filled fields data as pdf
        setIsFieldsLoading(false);
    };

    const handleRetrieveGraphs = async () => {
        setIsGraphLoading(true);
        const returnArr = [];
        const selectedValues = formik.values.selectedEvents.map(event => event.value);

        const apiPath = `api/eventData?_id[]=${selectedValues.join('&_id[]=')}`;
        const response = await apiget(apiPath);
        const responseData = response.data.data;

        // count total emission by event wise
        const allEventsEmissions = [];

        responseData.forEach((event) => {
            // f2f-event
            const airTravelEmission = event?.airTravelAllData?.totalEmission;
            const localTranspotationEmission = event?.localTranspotationAllData?.totalEmission;
            const hotelEmission = event?.hotelAllData?.totalEmission;
            const foodEmission = event?.foodAllData?.totalEmission;
            const airFreightEmission = event?.airFreightAllData?.totalEmission;
            const productionEmission = event?.productionAllData?.totalEmission;
            const energyEmission = event?.energyAllData?.totalEmission;
            const digitalContentEmission = event?.digitalCommsAllData?.totalEmission;
            const wasteEmission = event?.wasteAllData?.totalEmission;

            // virtual-event
            const outboundMarketingEmission = event?.vitrualEventAllData?.totalEmission;

            // pr-event
            const commsEmission = event?.commsAllData?.totalEmission;
            const prAgencyEmission = event?.prAgencyAllData?.totalEmission;
            const hospitalityEmission = event?.hospitalityAllData?.totalEmission;

            // digital-campaign
            const digitalCampaignEmission = event?.digitalCampaignAllData?.totalEmission;

            const f2fEventTotalEmission = Number(Number(airTravelEmission || 0) + Number(localTranspotationEmission || 0) + Number(hotelEmission || 0) + Number(foodEmission || 0) + Number(airFreightEmission || 0) + Number(productionEmission || 0) + Number(energyEmission || 0) + Number(digitalContentEmission || 0) + Number(wasteEmission || 0)).toFixed(2);
            const virtualEventTotalEmission = Number(outboundMarketingEmission || 0).toFixed(2);
            const prEventTotalEmission = Number(Number(commsEmission || 0) + Number(prAgencyEmission || 0) + Number(hospitalityEmission || 0)).toFixed(2);
            const digitalCampaignTotalEmission = Number(digitalCampaignEmission || 0).toFixed(2);

            allEventsEmissions.push(
                {
                    f2fEventTotalEmission,
                    virtualEventTotalEmission,
                    prEventTotalEmission,
                    digitalCampaignTotalEmission,
                    activity: `${event?.activityName} - ${dayjs(event?.dateTime).format('MM/DD/YYYY hh:mm A')}`,
                    eventId: event?._id,
                }
            );
        });

        const payload = {
            allEventsEmissions,
            // receiver: [userData?.loginId],
            receiver: formik.values?.emails,
            subject: `${responseData[0]?.activityName} vs ${responseData[1]?.activityName} - graph chart`,
            attachmentTemplateName: 'bar_chart',
            attachmentPdfName: `${responseData[0]?.activityName} vs ${responseData[1]?.activityName} - graph chart`
        };

        await addEmailForGraphs(payload);
        setIsGraphLoading(false);
    };

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

    const downloadCsvOrExcel = async (extension, selectedIds) => {
        if (selectedIds && selectedIds?.length > 0) {
            const selectedRecordsWithSpecificFileds = data?.filter((rec) => selectedIds.includes(rec._id))?.map((rec) => {
                const selectedFieldsData = {};
                csvColumns?.forEach((item) => {
                    selectedFieldsData[item.accessor] = rec[item.accessor];
                });
                return selectedFieldsData;
            });
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "All Users Events", extension, setSelectedRowIds });
        } else {
            const AllRecordsWithSpecificFileds = data?.map((rec) => {
                const selectedFieldsData = {};
                csvColumns?.forEach((item) => {
                    selectedFieldsData[item?.accessor] = rec[item?.accessor];
                });
                return selectedFieldsData;
            });
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "All Users EVents", extension, setSelectedRowIds });
        }

    };

    const handleExportData = (extension) => {
        if (selectedRowIds && selectedRowIds?.length > 0) {
            downloadCsvOrExcel(extension, selectedRowIds)
        } else {
            downloadCsvOrExcel(extension);
        }
    };

    const removeTag = (index) => {
        // const newTags = [...emails];
        const newTags = [...formik.values?.emails];
        newTags.splice(index, 1);
        // setEmails(newTags);
        formik.setFieldValue('emails', newTags);
    };

    const handleInputChange = (e) => {
        setEmailInput(e.target.value)
        formik.setFieldValue('addEmail', e.target.value);
        formik.setFieldTouched('addEmail', true);
    };

    const addTagsButton = (e) => {
        e.preventDefault();
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailInput !== '') {
            if (regex.test(emailInput)) {
                // if (emails?.find(email => email === emailInput)) {
                if (formik.values?.emails?.find(email => email === emailInput)) {
                    formik.setFieldError("addEmail", "Email is already exists");
                } else {
                    // setEmails([...emails, emailInput]);
                    formik.setFieldValue('emails', [...formik.values?.emails, emailInput]);
                    setEmailInput('');
                }
            } else {
                formik.setFieldError("addEmail", "Email not valid");
            }
        }
    };

    useEffect(() => {
        dispatch(fetchEventsEmissionsData());
    }, [])
    // }, [userAction])

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #ccc',
                    borderRadius: '8px',
                    padding: '20px',
                    width: '600px',
                    boxShadow: 3,
                    margin: 'auto',
                    marginTop: '40px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
                    <Typography variant="h6" className='text-white' gutterBottom>
                        Select Previous Events
                    </Typography>
                    <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                </Box>
                <Select
                    isMulti
                    name="selectedEvents"
                    placeholder="Select any two events..."
                    options={previousEvents}
                    formatOptionLabel={formatOptionLabel}
                    onChange={selectedOptions => {
                        formik.setFieldValue('selectedEvents', selectedOptions);
                    }}
                    value={formik.values.selectedEvents}
                    styles={{
                        control: (base) => ({
                            ...base,
                            width: '100%',
                            minWidth: '550px',
                            borderColor: formik.errors.selectedEvents ? 'red' : 'white',
                            '&:hover': {
                                borderColor: formik.errors.selectedEvents ? 'red' : 'white',
                            },
                            backgroundColor: 'transparent',
                        }),
                        menu: (base) => ({
                            ...base,
                            zIndex: 9999,
                            maxWidth: '600px',
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: 'white', // Set placeholder color to white
                        }),
                    }}
                />
                {formik.errors.selectedEvents && (
                    <Typography
                        color="error"
                        variant="caption"
                        sx={{ marginTop: '4px', fontSize: '1rem', justifyContent: 'flex-start', width: '100%' }} // Increase font size here
                    >
                        {formik.errors.selectedEvents}
                    </Typography>
                )}
                <Box
                    sx={{
                        width: '100%',
                        border: formik.values.emails?.length > 0 ? '1px solid #dce0e4' : '0',
                        borderRadius: '4px',
                        padding: formik.values.emails?.length > 0 ? '5px' : '0',
                        marginTop: '20px',
                    }}
                >
                    <ul
                        id='tags'
                        style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            width: "100%",
                            overflowX: 'auto',
                            padding: '0', 
                            margin: '0', 
                        }}
                    >
                        {formik.values.emails?.map((tag, index) => (
                            <li
                                key={index}
                                style={{
                                    display: "flex",
                                    listStyle: "none",
                                    margin: "0 5px 5px 0",
                                    backgroundColor: "grey",
                                    padding: "2px 5px 2px 8px",
                                    borderRadius: "20px",
                                    color: "#fff",
                                    fontSize: "14px",
                                    alignItems: "center",
                                }}
                            >
                                <span>{tag}</span>
                                {index === 0 ? '' : (
                                    <CloseIcon
                                        style={{
                                            fontSize: "14px",
                                            color: "#fff",
                                            marginLeft: "5px",
                                            cursor: "pointer",
                                        }}
                                        onClick={event => removeTag(index)}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    style={{ marginTop: '20px', width: '100%' }} // Full width for the container
                >
                    <TextField
                        name='addEmail'
                        type='text'
                        size='small'
                        fullWidth
                        value={emailInput}
                        placeholder='Add receiver email'
                        onChange={(e) => handleInputChange(e)}
                        // error={
                        //     formik.touched.addEmail &&
                        //     Boolean(formik.errors.addEmail)
                        // }
                        // helperText={
                        //     formik.touched.addEmail && formik.errors.addEmail
                        // }
                        style={{
                            flex: 1,
                            border: formik.touched.addEmail && formik.errors.addEmail ? '1px solid red' : '1px solid white',
                            borderRadius: '6px',
                        }}
                        inputProps={{ 
                            className: 'custom-placeholder',
                            style: { color: 'white', background: 'trasnparent' },
                        }}
                        InputProps={{
                            style: { backgroundColor: 'transparent' }, // Ensure background is transparent
                        }}
                    />
                    <Box>
                        <AddCircleOutlineIcon
                            onClick={event => addTagsButton(event)}
                            style={{ fontSize: "30px", cursor: "pointer", marginLeft: '10px', color: 'white' }}
                        />
                    </Box>
                </Box>
                {formik.errors.addEmail && (
                    <Typography
                        color="error"
                        variant="caption"
                        sx={{ marginTop: '4px', fontSize: '1rem', justifyContent: 'flex-start', width: '100%' }} 
                    >
                        {formik.errors.addEmail}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', gap: 2, marginTop: '16px', marginLeft: '5px', justifyContent: 'flex-start' }}>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#054723' }}
                        onClick={handleRetrieveCalculations}
                        disabled={formik.values.selectedEvents.length !== 2} // Enabled only if exactly 2 events are selected
                    >
                        {isFieldsLoading ? <CircularProgress size={27} /> : 'Retrieve Calculations'}
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#054723' }}
                        onClick={handleRetrieveGraphs}
                        disabled={formik.values.selectedEvents.length !== 2} // Enabled only if exactly 2 events are selected
                    >
                        {isGraphLoading ? <CircularProgress size={27} /> : 'Retrieve Graphs'}
                    </Button>
                </Box>
            </Box>


            {(userData?.role === 'admin') &&
                <Container maxWidth style={{ marginTop: "36px" }}>
                    <Card style={{ height: "auto", padding: '10px' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variant="h4">
                                All Users Events
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>

                                <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportData('xlsx') }} >
                                    {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}
                                </Button>
                            </Stack>
                        </Stack>
                        <TableStyle>
                            {/* <Box width="100%" style={{ minHeight: '670px', overflowY: 'auto', padding: '10px' }} > */}
                            <Box width="100%" style={{ height: '680px', overflowY: 'auto', padding: '10px' }} >
                                {isLoading ? (
                                    <Card style={{ display: 'flex', justifyContent: 'center', height: "680px" }}>
                                        <span className="loader" />
                                    </Card>
                                ) : (
                                    <DataGrid
                                        rows={data || []}
                                        columns={columns}
                                        checkboxSelection
                                        disableSelectionOnClick
                                        onRowSelectionModelChange={handleSelectionChange}
                                        rowSelectionModel={selectedRowIds}
                                        components={{
                                            Toolbar: () => (
                                                <Box padding="10px 0">
                                                    <GridToolbarColumnsButton />
                                                    <GridToolbarFilterButton />
                                                    <GridToolbarDensitySelector
                                                        slotProps={{ tooltip: { title: 'Change density' } }}
                                                    />
                                                </Box>
                                            ),
                                            NoRowsOverlay: () => (
                                                <Typography
                                                    className='fs-5'
                                                    style={{
                                                        textAlign: "center",
                                                        padding: "20px",
                                                        marginTop: "50px", // Add margin to separate from pagination
                                                    }}
                                                >
                                                    No Records
                                                </Typography>
                                            ),
                                        }}
                                        getRowId={(row) => row._id}
                                        pageSize={5}
                                        pagination
                                        pageSizeOptions={[5, 10, 25, 50, 100]}
                                        initialState={{
                                            ...data?.initialState,
                                            pagination: { paginationModel: { pageSize: 10 } },
                                        }}
                                    // rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                    />
                                )}
                            </Box>
                        </TableStyle>
                    </Card>
                </Container>
            }
        </>
    );
};

export default MyEventSelector;