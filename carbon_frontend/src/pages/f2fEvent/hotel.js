import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTheme } from '@emotion/react';
import Select from 'react-select';
// import { Box, Button, Card, Container, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, Autocomplete } from '@mui/material';
import { Box, Button, Card, Container, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Stack, TextField, Typography, useMediaQuery, Autocomplete } from '@mui/material';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addHotelData, deleteHotelData } from '../../redux/slice/totalHotelSlice';
import Accomodation from '../../assets/Accommodation.png';
import { IconDiv } from '../../components/IconDiv';
import HotelData from '../accomodation/data.json';
import { addResultTableData, deleteResTabHotelData, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
import useEventData from '../../hooks/useEventData';

const Hotel = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalHotelDetails?.data?.[0]?.data);
    const totalEmission = useSelector((state) => state?.totalHotelDetails?.totalEmission);
    const geographyOptions = HotelData?.map((item) => ({ value: item?.geography, label: item?.geography }))
    const resultTableData = useSelector(state => state?.resultTableDataDetails);
    const eventsData = useEventData();

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'transparent', // Sets the background color of the control to transparent
            border: '2px solid #ced4da', // border style
            borderRadius: '6px', // border radius
            padding: '1px',
            '&:hover': {
                border: '2px solid #6c757d', // border style on hover
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'white', // bg color of the dropdown menu
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
    };

    const hotelType = [
        { label: '4 Stars', value: 4 },
        { label: '4.5 Stars', value: 4.5 },
        { label: '5 Stars', value: 5 }
    ];

    // -----------   initialValues
    const initialValues = {
        // // Hotel
        // geography: '',
        // country: '',
        // hotelType: '',
        // roomsOccupied: 0,
        // efOne: null,
        // emissionsOne: 0,
        // filteredCountries: [],
        // totalMeetingRoomArea: 0,
        // // Meeting Room1
        // meetingDuration: 0,
        // efTwo: 0.00104,
        // emissionsTwo: 0,
        // // Meeting Room2  
        // energyUtilisedKwh: 0,
        // efThree: 0.716,
        // emissionsThree: 0,

        // Hotel
        geography: '',
        country: '',
        hotelType: '',
        roomsOccupied: '',
        efOne: null,
        emissionsOne: '',
        filteredCountries: [],
        // Meeting Room1
        totalMeetingRoomArea: '',
        meetingDuration: '',
        efTwo: 0.00104,
        emissionsTwo: '',
        // Meeting Room2  
        energyUtilisedKwh: '',
        efThree: 0.716,
        emissionsThree: '',
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values) => {

            const emissionsOne = (values?.roomsOccupied === 0 || values?.efOne === 0 || !values?.efOne === null || !values?.efOne) ? 0 : Number((values?.efOne * values?.roomsOccupied).toFixed(2))
            const emissionsTwo = (values?.totalMeetingRoomArea === 0 || values?.meetingDuration === 0) ? 0 : Number((values?.efTwo * values?.totalMeetingRoomArea * values?.meetingDuration).toFixed(2))
            const emissionsThree = (values?.energyUtilisedKwh === 0) ? 0 : Number((Number(values?.efThree) * Number(values?.energyUtilisedKwh)).toFixed(2))

            if (emissionsOne > 0) formik.setFieldValue('emissionsOne', emissionsOne);
            if (emissionsTwo > 0) formik.setFieldValue('emissionsTwo', emissionsTwo);
            if (emissionsThree > 0) formik.setFieldValue('emissionsThree', emissionsThree);

            const data = [
                {
                    type: 'Hotel',
                    geography: values?.geography,
                    country: values?.country,
                    hotelType: values?.hotelType,
                    roomsOccupied: values?.roomsOccupied,
                    filteredCountries: values?.filteredCountries,
                    efOne: values?.efOne,
                    emission: emissionsOne > 0 ? emissionsOne : '',
                },
                {
                    type: 'Meeting Room One',
                    totalMeetingRoomArea: values?.totalMeetingRoomArea,
                    meetingDuration: values?.meetingDuration,
                    emission: emissionsTwo > 0 ? emissionsTwo : '',
                    efTwo: values?.efTwo,
                },
                {
                    type: 'Meeting Room Two',
                    energyUtilisedKwh: values?.energyUtilisedKwh,
                    emission: emissionsThree > 0 ? emissionsThree : '',
                    efThree: values?.efThree,
                },
            ];

            const tableData = [
                {
                    subType: "",
                    subTypeData: {
                        th: ["", "Geography", "Country", "Hotel Type", "No. of Nights", "Emissions"],
                        td: [
                            // {
                            //     hType: "Hotel Stay",
                            //     geography: values?.geography,
                            //     country: values?.country,
                            //     hotelType: values?.hotelType,
                            //     roomsOccupied: values?.roomsOccupied,
                            //     emissions: emissionsOne > 0 ? emissionsOne : ''
                            // },
                            {
                                hType: "Hotel Stay",
                                geography: values.geography?.label,
                                country: values.country?.country,
                                hotelType: values.hotelType?.label,
                                roomsOccupied: values?.roomsOccupied,
                                emissions: emissionsOne > 0 ? emissionsOne : ''
                            },
                        ]
                    },
                    // scope: 3
                },
                {
                    subType: "",
                    subTypeData: {
                        th: ["", "Total Meeting Room Area (Sqft)", "Meeting Duration (No of Hrs)", "Emissions"],
                        td: [
                            {
                                hType: "Meeting Room Energy Consumption",
                                totalMeetingRoomArea: values?.totalMeetingRoomArea,
                                meetingDuration: values?.meetingDuration,
                                emissions: emissionsTwo > 0 ? emissionsTwo : '',
                            },
                        ]
                    },
                    // scope: 3
                },
                {
                    subType: "",
                    subTypeData: {
                        th: ["", "Energy Utilised (kwh)", "Emissions"],
                        td: [
                            {
                                hType: "Meeting Room Energy Consumption",
                                energyUtilisedKwh: values?.energyUtilisedKwh,
                                emissions: emissionsThree > 0 ? emissionsThree : '',
                            },
                        ]
                    },
                    // scope: 3
                },
            ];

            dispatch(addHotelData({ data }));
            dispatch(addResultTableData({ from: "f2fEvent", data: tableData, tabTitle: "Hotel" }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteHotelData());
        dispatch(deleteResTabHotelData());
    };

    const handleSaveToDb = async () => {
        const eventData = {
            ...eventsData,
        };

        if (resultTableData.eventDataId) {
            eventData.eventDataId = resultTableData?.eventDataId;
            const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
            if (updateResultTableDatasToDb?.rejected?.match(resultAction)) {
                console.error('Failed to update data:', resultAction?.payload);
            }
        } else {
            const resultAction = await dispatch(addResultTableDatasToDb(eventData));
            if (addResultTableDatasToDb?.rejected?.match(resultAction)) {
                console.error('Failed to save data:', resultAction?.payload);
            }
        }
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("geography", allData?.[0]?.geography)
            formik.setFieldValue("country", allData?.[0]?.country)
            formik.setFieldValue("hotelType", allData?.[0]?.hotelType)
            formik.setFieldValue("roomsOccupied", allData?.[0]?.roomsOccupied)
            formik.setFieldValue("efOne", allData?.[0]?.efOne)
            formik.setFieldValue("emissionsOne", allData?.[0]?.emission)
            formik.setFieldValue("filteredCountries", allData?.[0]?.filteredCountries)

            formik.setFieldValue("meetingDuration", allData?.[1]?.meetingDuration)
            formik.setFieldValue("totalMeetingRoomArea", allData?.[1]?.totalMeetingRoomArea)
            formik.setFieldValue("emissionsTwo", allData?.[1]?.emission)

            formik.setFieldValue("energyUtilisedKwh", allData?.[2]?.energyUtilisedKwh)
            formik.setFieldValue("efThree", allData?.[2]?.efThree)
            formik.setFieldValue("emissionsThree", allData?.[2]?.emission)
        }
    }, [value]);

    const { values } = formik;

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg ' style={{ padding: '20px' }}>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <Box className='table-custom-inpt-field' mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                            <IconDiv>
                                <img src={Accomodation} alt="Hotel" width={100} className='tabImgWhite' />
                            </IconDiv>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 0, sm: 4, md: 4 }}
                                style={{ justifyContent: 'center' }}
                            >
                                <Grid item xs={12} sm={4} md={5} >
                                    <Typography variant='h4' display={"flex"} justifyContent={"center"} >
                                        Hotel Stay
                                    </Typography>
                                    <Grid mt={2} display={"flex"} justifyContent={"flex-end"} flexDirection={"column"}>
                                        <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Geography</FormLabel>
                                        <FormControl fullWidth>
                                            {/* <Autocomplete
                                                options={HotelData}
                                                name="geography"
                                                fullWidth
                                                getOptionLabel={(item) => item?.geography}
                                                value={formik.values?.filteredCountries?.find((item) => item?.geography === formik.values?.geography) || null}
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue("geography", newValue ? newValue?.geography : "");
                                                    formik.setFieldValue("filteredCountries", HotelData?.filter((item) => item?.geography === newValue?.geography) || []);

                                                    // reset fields
                                                    formik.setFieldValue("country", '');
                                                    formik.setFieldValue("hotelType", '');
                                                    formik.setFieldValue("efOne", null);
                                                    formik.setFieldValue("emissionsOne", 0);
                                                    formik.handleSubmit();
                                                }}
                                                renderInput={(params) =>
                                                    <TextField {...params}
                                                        size="small"
                                                        name="geography"
                                                        placeholder='Select'
                                                        error={
                                                            formik.touched.geography &&
                                                            Boolean(formik.errors.geography)
                                                        }
                                                        helperText={
                                                            formik.touched.geography && formik.errors.geography
                                                        }
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            style: { color: 'white' }, // This sets the text color to white
                                                        }}
                                                    />}
                                            /> */}
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select###"
                                                isDisabled={false}
                                                isClearable={Boolean(true)}
                                                isRtl={false}
                                                isSearchable
                                                name="geography"
                                                options={geographyOptions}
                                                styles={customStyles}
                                                value={formik?.values?.geography || null}
                                                onChange={(event) => {
                                                    formik.setFieldValue("geography", event || {});
                                                    if (event === null) {
                                                        formik.setFieldValue("filteredCountries", []);
                                                    } else {
                                                        formik.setFieldValue("filteredCountries", HotelData?.filter((item) => item?.geography === event.value)?.map((item) => ({ ...item, value: item?.country, label: item?.country })) || []);
                                                    }
                                                    // reset fields
                                                    formik.setFieldValue("country", '');
                                                    formik.setFieldValue("hotelType", '');
                                                    formik.setFieldValue("efOne", null);
                                                    formik.setFieldValue("emissionsOne", 0);
                                                    formik.handleSubmit();
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid mt={2}>
                                        <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Country</FormLabel>
                                        <FormControl fullWidth>
                                            {/* <Autocomplete
                                                options={formik.values?.filteredCountries}
                                                name="country"
                                                fullWidth
                                                disabled={!formik.values.geography}
                                                getOptionLabel={(item) => item?.country}
                                                value={formik.values?.filteredCountries?.find((item) => item?.country === formik.values?.country) || null}
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue("country", newValue ? newValue?.country : "");
                                                    // reset fields
                                                    formik.setFieldValue("hotelType", '');
                                                    formik.setFieldValue("emissionsOne", 0);
                                                    formik.setFieldValue("efOne", null);
                                                    formik.handleSubmit();
                                                }}
                                                renderInput={(params) =>
                                                    <TextField {...params}
                                                        size="small"
                                                        name="country"
                                                        placeholder='Select'
                                                        error={
                                                            formik.touched.country &&
                                                            Boolean(formik.errors.country)
                                                        }
                                                        helperText={
                                                            formik.touched.country && formik.errors.country
                                                        }
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            style: { color: 'white' }, // This sets the text color to white
                                                        }}
                                                    />}
                                            /> */}
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                isDisabled={!formik.values.geography}
                                                isClearable={Boolean(true)}
                                                isRtl={false}
                                                isSearchable
                                                name="country"
                                                options={formik.values?.filteredCountries}
                                                styles={customStyles}
                                                value={formik.values?.country || null}
                                                onChange={(event) => {
                                                    formik.setFieldValue("country", event);
                                                    // reset fields
                                                    formik.setFieldValue("hotelType", '');
                                                    formik.setFieldValue("emissionsOne", 0);
                                                    formik.setFieldValue("efOne", null);
                                                    formik.handleSubmit();
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid mt={2}>
                                        <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Hotel Type</FormLabel>
                                        <FormControl fullWidth>
                                            {/* <Autocomplete
                                                options={hotelType}
                                                name="hotelType"
                                                fullWidth
                                                disabled={!formik.values.country}
                                                getOptionLabel={(item) => item?.label}
                                                value={hotelType?.find((item) => item?.value === formik.values?.hotelType) || null}
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue("hotelType", newValue ? newValue?.value : "");

                                                    const selectedHotelTypeData = formik.values?.filteredCountries?.find((item) => item.country === formik.values?.country);
                                                    const hotellTypeEf = newValue?.value === 4 || newValue?.value === 4.5 ? selectedHotelTypeData?.stars_four_fourPointHalf : selectedHotelTypeData?.stars_five;
                                                    formik.setFieldValue("efOne", hotellTypeEf);
                                                    formik.handleSubmit();
                                                }}
                                                renderInput={(params) =>
                                                    <TextField {...params}
                                                        size="small"
                                                        name="hotelType"
                                                        placeholder='Select'
                                                        error={
                                                            formik.touched.hotelType &&
                                                            Boolean(formik.errors.hotelType)
                                                        }
                                                        helperText={
                                                            formik.touched.hotelType && formik.errors.hotelType
                                                        }
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            style: { color: 'white' }, // This sets the text color to white
                                                        }}
                                                    />}
                                            /> */}
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                isDisabled={!formik.values.country}
                                                isClearable={Boolean(true)}
                                                isRtl={false}
                                                isSearchable
                                                name="hotelType"
                                                options={hotelType}
                                                styles={customStyles}
                                                value={formik.values?.hotelType || null}
                                                onChange={(event) => {
                                                    formik.setFieldValue("hotelType", event);
                                                    // reset fields
                                                    const selectedHotelTypeData = formik.values?.filteredCountries?.find((item) => item?.country === formik.values?.country.country);
                                                    const hotellTypeEf = event?.value === 4 || event?.value === 4.5 ? selectedHotelTypeData?.stars_four_fourPointHalf : selectedHotelTypeData?.stars_five;
                                                    formik.setFieldValue("efOne", hotellTypeEf);
                                                    formik.handleSubmit();
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid mt={2} className='textborder'>
                                        <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>No. of Nights</FormLabel>
                                        <FormControl fullWidth>
                                            <TextField
                                                size="small"
                                                name="roomsOccupied"
                                                fullWidth
                                                disabled={!formik.values.hotelType}
                                                type="number"
                                                value={formik.values.roomsOccupied || ""}
                                                onChange={(e) => {
                                                    formik.setFieldValue("roomsOccupied", e.target.value);
                                                    formik.setFieldValue("emissionsOne", (e.target.value === 0 || values?.efOne === 0 || !values?.efOne) ? 0 : Number((values?.efOne * e.target.value).toFixed(2)));
                                                    formik.handleSubmit();
                                                }}
                                                error={
                                                    formik.touched.roomsOccupied &&
                                                    Boolean(formik.errors.roomsOccupied)
                                                }
                                                helperText={
                                                    formik.touched.roomsOccupied && formik.errors.roomsOccupied
                                                }
                                                inputProps={{ style: { color: 'white' } }}
                                            />
                                            <FormHelperText error={
                                                formik.touched.roomsOccupied &&
                                                Boolean(formik.errors.roomsOccupied)
                                            }>{formik.touched.roomsOccupied && formik.errors.roomsOccupied}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid mt={2} className='textborder'>
                                        <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
                                        <TextField
                                            id="emissionsOne"
                                            name="emissionsOne"
                                            label=""
                                            fullWidth
                                            size="small"
                                            disabled
                                            value={formik.values.emissionsOne}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.emissionsOne &&
                                                Boolean(formik.errors.emissionsOne)
                                            }
                                            helperText={
                                                formik.touched.emissionsOne && formik.errors.emissionsOne
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                {/* <Grid item xs={0} sm={2} /> */}
                                <Grid item xs={12} sm={7} >
                                    <Grid
                                        container
                                        // rowSpacing={1}
                                        textAlign={"left"}
                                        columnSpacing={{ xs: 0, sm: 3, md: 3 }}
                                        // style={{ justifyContent: 'center' }}
                                        className='textborder'
                                    >
                                        <Grid item xs={12}>
                                            <Typography variant='h4' display={"flex"} justifyContent={"center"}>
                                                Meeting Room Energy Consumption
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3} />
                                        <Grid item xs={12} sm={6} md={8} display={"flex"} justifyContent={"center"} flexDirection={"column"}>

                                            <Grid mt={2}>
                                                <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Total Meeting Room Area (Sqft)</FormLabel>
                                                <TextField
                                                    id="totalMeetingRoomArea"
                                                    name="totalMeetingRoomArea"
                                                    label=""
                                                    fullWidth
                                                    size="small"
                                                    type="number"
                                                    value={formik.values.totalMeetingRoomArea}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('totalMeetingRoomArea', e.target.value);
                                                        formik.setFieldValue('emissionsTwo', (e.target.value === 0 || values?.meetingDuration === 0) ? 0 : Number((values?.efTwo * e.target.value * values?.meetingDuration).toFixed(2)));
                                                        formik.handleSubmit();
                                                    }}
                                                    error={
                                                        formik.touched.totalMeetingRoomArea &&
                                                        Boolean(formik.errors.totalMeetingRoomArea)
                                                    }
                                                    helperText={
                                                        formik.touched.totalMeetingRoomArea && formik.errors.totalMeetingRoomArea
                                                    }
                                                    inputProps={{ style: { color: 'white' } }}
                                                />
                                            </Grid>
                                            <Grid mt={2}>
                                                <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Meeting Duration (No of Hrs)</FormLabel>
                                                <TextField
                                                    id="meetingDuration"
                                                    name="meetingDuration"
                                                    label=""
                                                    fullWidth
                                                    size="small"
                                                    type='number'
                                                    value={formik.values.meetingDuration}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('meetingDuration', e.target.value);
                                                        formik.setFieldValue('emissionsTwo', (e.target.value === 0 || values?.totalMeetingRoomArea === 0) ? 0 : Number((values?.efTwo * e.target.value * values?.totalMeetingRoomArea).toFixed(2)));
                                                        formik.handleSubmit();
                                                    }}
                                                    error={
                                                        formik.touched.meetingDuration &&
                                                        Boolean(formik.errors.meetingDuration)
                                                    }
                                                    helperText={
                                                        formik.touched.meetingDuration && formik.errors.meetingDuration
                                                    }
                                                    inputProps={{ style: { color: 'white' } }}
                                                />
                                            </Grid>
                                            <Grid mt={2}>
                                                <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
                                                <TextField
                                                    id="emissionsTwo"
                                                    name="emissionsTwo"
                                                    fullWidth
                                                    type='number'
                                                    size="small"
                                                    disabled
                                                    value={formik.values.emissionsTwo}
                                                    onChange={formik.handleChange}
                                                    error={
                                                        formik.touched.emissionsTwo &&
                                                        Boolean(formik.errors.emissionsTwo)
                                                    }
                                                    helperText={
                                                        formik.touched.emissionsTwo && formik.errors.emissionsTwo
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={1} />

                                        {/* <Grid item xs={12} sm={6} md={6}>
                                            <Grid mt={2}>
                                                <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Energy Utilised (kwh) *</FormLabel>
                                                <TextField
                                                    id="energyUtilisedKwh"
                                                    name="energyUtilisedKwh"
                                                    fullWidth
                                                    size="small"
                                                    type="number"
                                                    value={formik.values.energyUtilisedKwh}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('energyUtilisedKwh', e.target.value);
                                                        formik.setFieldValue('emissionsThree', (e.target.value === 0) ? 0 : Number((values?.efThree * e.target.value).toFixed(2)));
                                                        formik.handleSubmit();
                                                    }}
                                                    error={
                                                        formik.touched.energyUtilisedKwh &&
                                                        Boolean(formik.errors.energyUtilisedKwh)
                                                    }
                                                    helperText={
                                                        formik.touched.energyUtilisedKwh && formik.errors.energyUtilisedKwh
                                                    }
                                                    inputProps={{ style: { color: 'white' } }}
                                                />
                                            </Grid>

                                            <Grid mt={2}>
                                                <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
                                                <TextField
                                                    id="emissionsThree"
                                                    name="emissionsThree"
                                                    fullWidth
                                                    type='number'
                                                    size="small"
                                                    disabled
                                                    value={formik.values.emissionsThree}
                                                    onChange={formik.handleChange}
                                                    error={
                                                        formik.touched.emissionsThree &&
                                                        Boolean(formik.errors.emissionsThree)
                                                    }
                                                    helperText={
                                                        formik.touched.emissionsThree && formik.errors.emissionsThree
                                                    }
                                                />
                                            </Grid>
                                            <Grid mt={2}>
                                                <Typography> * If you have the exact energy consumption from hotel</Typography>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>

                                </Grid>

                                <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                    <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
                                        {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                                        <Button variant='contained' startIcon={<FaAngleDoubleLeft />} onClick={() => { handleSaveToDb(); setValue(value - 1); }} className='custom-btn'>Save and Previous Page</Button>
                                        <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(value + 1); }} className='custom-btn'> Save and Next Page</Button>
                                        <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(9) }} className='custom-btn'>Go To Result</Button>
                                        {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
                                        <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} marginY={2}>
                                    <Typography color='white'>{`Total Hotel Carbon Footprint  = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default Hotel;
