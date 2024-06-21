import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useTheme } from '@emotion/react';
import { Box, Button, Card, Container, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, Autocomplete } from '@mui/material';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addHotelData, deleteHotelData } from '../../redux/slice/totalHotelSlice';
import Accomodation from '../../assets/Accommodation.png';
import { IconDiv } from '../../components/IconDiv';
import HotelData from '../accomodation/data.json';

const Hotel = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalHotelDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalHotelDetails?.totalEmission);

    const hotelType = [
        { label: '4 Stars', value: 4 },
        { label: '4.5 Stars', value: 4.5 },
        { label: '5 Stars', value: 5 }
    ];

    // -----------   initialValues
    const initialValues = {
        // Hotel
        geography: '',
        country: '',
        hotelType: '',
        roomsOccupied: 0,
        efOne: null,
        emissionsOne: 0,
        filteredCountries: [],
        totalMeetingRoomArea: 0,
        // Meeting Room1
        meetingDuration: 0,
        efTwo: 0.00104,
        emissionsTwo: 0,
        // Meeting Room2  
        energyUtilisedKwh: 0,
        efThree: 0.43,
        emissionsThree: 0,
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values) => {

            formik.setFieldValue('emissionsOne', (values?.roomsOccupied === 0 || values?.efOne === 0 || !values?.efOne === null || !values?.efOne) ? 0 : Number((values?.efOne * values?.roomsOccupied).toFixed(2)));
            formik.setFieldValue('emissionsTwo', (values?.totalMeetingRoomArea === 0 || values?.meetingDuration === 0) ? 0 : Number((values?.efTwo * values?.totalMeetingRoomArea * values?.meetingDuration).toFixed(2)));
            formik.setFieldValue('emissionsThree', (values?.energyUtilisedKwh === 0) ? 0 : Number((values?.efThree * values?.energyUtilisedKwh).toFixed(2)));

            const data = [
                {
                    type: 'Hotel',
                    geography: values?.geography,
                    hotelType: values?.hotelType,
                    roomsOccupied: values?.roomsOccupied,
                    filteredCountries: values?.filteredCountries,
                    efOne: values?.efOne,
                    emission: (values?.roomsOccupied === 0 || values?.efOne === 0 || !values?.efOne) ? 0 : Number((values?.efOne * values?.roomsOccupied).toFixed(2))
                },
                {
                    type: 'Meeting Room One',
                    totalMeetingRoomArea: values?.totalMeetingRoomArea,
                    meetingDuration: values?.meetingDuration,
                    emission: (values?.totalMeetingRoomArea === 0 || values?.meetingDuration === 0) ? 0 : Number((values?.efTwo * values?.totalMeetingRoomArea * values?.meetingDuration).toFixed(2))
                    // ef: values?.efTwo,
                },
                {
                    type: 'Meeting Room Two',
                    energyUtilisedKwh: values?.energyUtilisedKwh,
                    emission: (values?.energyUtilisedKwh === 0) ? 0 : Number((values?.efThree * values?.energyUtilisedKwh).toFixed(2))
                    // ef: values?.efThree,
                },
            ];
            dispatch(addHotelData({ data }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteHotelData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("geography", allData[0]?.geography)
            formik.setFieldValue("country", allData[0]?.country)
            formik.setFieldValue("hotelType", allData[0]?.hotelType)
            formik.setFieldValue("roomsOccupied", allData[0]?.roomsOccupied)
            formik.setFieldValue("efOne", allData[0]?.efOne)
            formik.setFieldValue("emissionsOne", allData[0]?.emission)
            formik.setFieldValue("filteredCountries", allData[0]?.filteredCountries)

            formik.setFieldValue("meetingDuration", allData[1]?.meetingDuration)
            formik.setFieldValue("totalMeetingRoomArea", allData[1]?.totalMeetingRoomArea)
            formik.setFieldValue("emissionsTwo", allData[1]?.emission)

            formik.setFieldValue("meetingDuration", allData[2]?.meetingDuration)
            formik.setFieldValue("totalMeetingRoomArea", allData[2]?.totalMeetingRoomArea)
            formik.setFieldValue("emissionsThree", allData[2]?.emission)
        }
    }, [value]);

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box className='table-custom-inpt-field' mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img src={Accomodation} alt="Hotel" width={100} />
                        </IconDiv>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 5 }}
                            style={{ justifyContent: 'center' }}
                        >
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4'>
                                    Hotel
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Geography</FormLabel>
                                    <FormControl fullWidth>
                                        <Autocomplete
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
                                                />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Country</FormLabel>
                                    <FormControl fullWidth>
                                        <Autocomplete
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
                                                />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Hotel Type</FormLabel>
                                    <FormControl fullWidth>
                                        <Autocomplete
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
                                                />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Rooms Occupied</FormLabel>
                                    <FormControl fullWidth>
                                        <TextField
                                            size="small"
                                            name="roomsOccupied"
                                            fullWidth
                                            disabled={!formik.values.hotelType}
                                            type="number"
                                            value={formik.values.roomsOccupied || 0}
                                            onChange={formik.handleChange}
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
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions (kgCO2e)</FormLabel>
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
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4'>
                                    Meeting Room Energy Consumption
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Total Meeting Room Area (Sqft)</FormLabel>
                                    <TextField
                                        id="totalMeetingRoomArea"
                                        name="totalMeetingRoomArea"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.totalMeetingRoomArea}
                                        onChange={formik.handleChange}
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
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Meeting Duration(No of Hrs)</FormLabel>
                                    <TextField
                                        id="meetingDuration"
                                        name="meetingDuration"
                                        label=""
                                        fullWidth
                                        size="small"
                                        type='number'
                                        value={formik.values.meetingDuration}
                                        onChange={formik.handleChange}
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
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions (kgCO2e)</FormLabel>
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
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4'>
                                    Meeting Room Energy Consumption
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Energy Utilised (kwh)</FormLabel>
                                    <TextField
                                        id="energyUtilisedKwh"
                                        name="energyUtilisedKwh"
                                        fullWidth
                                        size="small"
                                        value={formik.values.energyUtilisedKwh}
                                        onChange={formik.handleChange}
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
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions (kgCO2e)</FormLabel>
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
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginY={2}>
                                <Typography color='white'>{`Total Hotel Footprint = ${totalEmission}  tons of kgCO2e`}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default Hotel;
