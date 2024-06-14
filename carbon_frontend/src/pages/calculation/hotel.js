import { Box, Button, Card, Container, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addHotelData, deleteHotelData } from '../../redux/slice/totalHotelSlice';
import Accomodation from '../../assets/Accommodation.png';
import { IconDiv } from '../../components/IconDiv';

const Hotel = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalHotelDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalHotelDetails?.totalEmission);


    // Energy Utilisation
    // totalMeetingRoomArea(Sgft)
    // meetingDuration(No of Hrs)
    // EF
    // Emissions  =  Ef * totalMeetingRoomArea * meetingDuration


    // -----------   initialValues
    const initialValues = {
        totalMeetingRoomArea: 0,
        meetingDuration: 0,
        ef: 0.00104,                        // Energy Utilisation
        energyUtilisationEmission: 0,
        pickaLocation: '',
        hotelType: '',
        roomsOccupied: 0,
        hotelEmission: 0
        // petrolCarKms: 0,
        // petrolCarNoPasse: 0,
        // energyUtilisationEmission: 0,
        // dieselCarKms: 0,
        // dieselCarNoPasse: 0,
        // dieselCarEmission: 0,
        // suvDieselKms: 0,
        // suvDieselNoPasse: 0,
        // suvDieselEmission: 0,
        // suvPetrolKms: 0,
        // suvPetrolNoPasse: 0,
        // suvPetrolEmission: 0,
        // camperPetrolKms: 0,
        // camperPetrolNoPasse: 0,
        // camperPetrolEmission: 0,
        // caperDieselKms: 0,
        // caperDieselNoPasse: 0,
        // caperDieselEmission: 0,
        // busDieselKms: 0,
        // busDieselEmission: 0,
        // electricCarKms: 0,
        // electricCarEmission: 0,
        // metroKms: 0,
        // metroEmission: 0,
    };



    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {

            formik.setFieldValue('energyUtilisationEmission', (values?.totalMeetingRoomArea === 0 || values?.meetingDuration === 0) ? 0 : Number(((values?.ef * values?.totalMeetingRoomArea * values?.meetingDuration)).toFixed(2)));

            const data = [
                {
                    type: 'Energy Utilisation',
                    totalMeetingRoomArea: values?.totalMeetingRoomArea,
                    meetingDuration: values?.meetingDuration,
                    ef: values?.ef,
                    emission: (values?.totalMeetingRoomArea === 0 || values?.meetingDuration === 0) ? 0 : Number(((values?.ef * values?.totalMeetingRoomArea * values?.meetingDuration)).toFixed(2)) || 0
                },
                {
                    type: 'Hotel',
                    pickaLocation: values?.pickaLocation,
                    hotelType: values?.hotelType,
                    roomsOccupied: values?.roomsOccupied,
                    hotelEmission: 10000
                },
                // {
                //     type: 'Diesel Car',
                //     dieselCarKms: values?.dieselCarKms,
                //     dieselCarNoPasse: values?.dieselCarNoPasse,
                //     emission: (values?.dieselCarNoPasse === 0 || values?.dieselCarKms === 0) ? 0 : Number(((137 * values?.dieselCarKms) / values?.dieselCarNoPasse).toFixed(2)) || 0
                // },
                // {
                //     type: 'SUV Diesel',
                //     suvDieselKms: values?.suvDieselKms,
                //     suvDieselNoPasse: values?.suvDieselNoPasse,
                //     emission: (values?.suvDieselKms === 0 || values?.suvDieselNoPasse === 0) ? 0 : Number(((220 * values?.suvDieselKms) / values?.suvDieselNoPasse).toFixed(2)) || 0
                // },
                // {
                //     type: 'SUV Petrol',
                //     suvPetrolKms: values?.suvPetrolKms,
                //     suvPetrolNoPasse: values?.suvPetrolNoPasse,
                //     emission: (values?.suvPetrolKms === 0 || values?.suvPetrolNoPasse === 0) ? 0 : Number(((181 * values?.suvPetrolKms) / values?.suvPetrolNoPasse).toFixed(2)) || 0
                // },
                // {
                //     type: 'Camper Petrol',
                //     camperPetrolKms: values?.camperPetrolKms,
                //     camperPetrolNoPasse: values?.camperPetrolNoPasse,
                //     emission: (values?.camperPetrolKms === 0 || values?.camperPetrolNoPasse === 0) ? 0 : Number(((327 * values?.camperPetrolKms) / values?.camperPetrolNoPasse).toFixed(2)) || 0
                // },
                // {
                //     type: 'Caper Diesel',
                //     caperDieselKms: values?.caperDieselKms,
                //     caperDieselNoPasse: values?.caperDieselNoPasse,
                //     emission: (values?.caperDieselKms === 0 || values?.caperDieselNoPasse === 0) ? 0 : Number(((267 * values?.caperDieselKms) / values?.caperDieselNoPasse).toFixed(2)) || 0
                // },
                // {
                //     type: 'Bus-Diesel',
                //     busDieselKms: values?.busDieselKms,
                //     emission: (values?.busDieselKms === 0) ? 0 : Number((15.1 * values?.busDieselKms).toFixed(2)) || 0
                // },
                // {
                //     type: 'Electric Car',
                //     electricCarKms: values?.electricCarKms,
                //     emission: (values?.electricCarKms === 0) ? 0 : Number((45 * values?.electricCarKms).toFixed(2)) || 0
                // },
                // {
                //     type: 'Metro',
                //     metroKms: values?.metroKms,
                //     emission: (values?.metroKms === 0) ? 0 : Number((29.29 * values?.metroKms).toFixed(2)) || 0
                // },
            ];
            dispatch(addHotelData({ data }))
        },
    });

    const handeleDelete = () => {
        dispatch(deleteHotelData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("meetingDuration", allData[0]?.meetingDuration)
            formik.setFieldValue("totalMeetingRoomArea", allData[0]?.totalMeetingRoomArea)
            formik.setFieldValue("energyUtilisationEmission", allData[0]?.emission)

            // formik.setFieldValue("dieselCarKms", allData[1]?.dieselCarKms)
            // formik.setFieldValue("dieselCarNoPasse", allData[1]?.dieselCarNoPasse)
            // formik.setFieldValue("dieselCarEmission", allData[1]?.emission)

            // formik.setFieldValue("suvDieselKms", allData[2]?.suvDieselKms)
            // formik.setFieldValue("suvDieselNoPasse", allData[2]?.suvDieselNoPasse)
            // formik.setFieldValue("suvDieselEmission", allData[2]?.emission)

            // formik.setFieldValue("suvPetrolKms", allData[3]?.suvPetrolKms)
            // formik.setFieldValue("suvPetrolNoPasse", allData[3]?.suvPetrolNoPasse)
            // formik.setFieldValue("suvPetrolEmission", allData[3]?.emission)

            // formik.setFieldValue("camperPetrolKms", allData[4]?.camperPetrolKms)
            // formik.setFieldValue("camperPetrolNoPasse", allData[4]?.camperPetrolNoPasse)
            // formik.setFieldValue("camperPetrolEmission", allData[4]?.emission)

            // formik.setFieldValue("caperDieselKms", allData[5]?.caperDieselKms)
            // formik.setFieldValue("caperDieselNoPasse", allData[5]?.caperDieselNoPasse)
            // formik.setFieldValue("caperDieselEmission", allData[5]?.emission)

            // formik.setFieldValue("busDieselKms", allData[6]?.busDieselKms)
            // formik.setFieldValue("busDieselEmission", allData[6]?.emission)

            // formik.setFieldValue("electricCarKms", allData[7]?.electricCarKms)
            // formik.setFieldValue("electricCarEmission", allData[7]?.emission)

            // formik.setFieldValue("metroKms", allData[8]?.metroKms)
            // formik.setFieldValue("metroEmission", allData[8]?.emission)
        }
    }, [value])

    console.log("---  formik.values ", formik.values)

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
                                <Typography variant='h6'>
                                    Hotel
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Pick a location</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            size="small"
                                            name="pickaLocation"
                                            fullWidth
                                            value={formik.values.pickaLocation || null}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.pickaLocation &&
                                                Boolean(formik.errors.pickaLocation)
                                            }
                                            helperText={
                                                formik.touched.pickaLocation && formik.errors.pickaLocation
                                            }
                                        >
                                            <MenuItem value='Waste'>Waste</MenuItem>
                                            <MenuItem value="Water">Water</MenuItem>
                                            <MenuItem value="Plastic Water bottle">Plastic Water bottle</MenuItem>
                                            <MenuItem value="Branding">Branding</MenuItem>
                                        </Select>
                                        <FormHelperText error={
                                            formik.touched.pickaLocation &&
                                            Boolean(formik.errors.pickaLocation)
                                        }>{formik.touched.pickaLocation && formik.errors.pickaLocation}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Hotel Type</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            size="small"
                                            name="hotelType"
                                            fullWidth
                                            value={formik.values.hotelType || null}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.hotelType &&
                                                Boolean(formik.errors.hotelType)
                                            }
                                            helperText={
                                                formik.touched.hotelType && formik.errors.hotelType
                                            }
                                        >
                                            <MenuItem value='Waste'>Waste</MenuItem>
                                            <MenuItem value="Water">Water</MenuItem>
                                            <MenuItem value="Plastic Water bottle">Plastic Water bottle</MenuItem>
                                            <MenuItem value="Branding">Branding</MenuItem>
                                        </Select>
                                        <FormHelperText error={
                                            formik.touched.hotelType &&
                                            Boolean(formik.errors.hotelType)
                                        }>{formik.touched.hotelType && formik.errors.hotelType}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Rooms Occupied</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            size="small"
                                            name="roomsOccupied"
                                            fullWidth
                                            value={formik.values.roomsOccupied || null}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.roomsOccupied &&
                                                Boolean(formik.errors.roomsOccupied)
                                            }
                                            helperText={
                                                formik.touched.roomsOccupied && formik.errors.roomsOccupied
                                            }
                                        >
                                            <MenuItem value='Waste'>Waste</MenuItem>
                                            <MenuItem value="Water">Water</MenuItem>
                                            <MenuItem value="Plastic Water bottle">Plastic Water bottle</MenuItem>
                                            <MenuItem value="Branding">Branding</MenuItem>
                                        </Select>
                                        <FormHelperText error={
                                            formik.touched.roomsOccupied &&
                                            Boolean(formik.errors.roomsOccupied)
                                        }>{formik.touched.roomsOccupied && formik.errors.roomsOccupied}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions (kgCO2e)</FormLabel>
                                    <TextField
                                        id="hotelEmission"
                                        name="hotelEmission"
                                        label=""
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={formik.values.hotelEmission}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.hotelEmission &&
                                            Boolean(formik.errors.hotelEmission)
                                        }
                                        helperText={
                                            formik.touched.hotelEmission && formik.errors.hotelEmission
                                        }
                                    />
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Meeting Room</th>
                                                <th className='ps-2'>Total Meeting Room Area (Sqft)</th>
                                                <th className='ps-2'>Meeting Duration (No of Hrs)</th>
                                                <th className='ps-2'>Emission (kg CO2e)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Energy Utilisation</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='totalMeetingRoomArea' value={formik?.values?.totalMeetingRoomArea} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='meetingDuration' value={formik?.values?.meetingDuration} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='energyUtilisationEmission' value={formik?.values?.energyUtilisationEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid> */}
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h6'>
                                    Meeting Room
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
                                        disabled
                                        value={formik.values.meetingDuration}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.meetingDuration &&
                                            Boolean(formik.errors.meetingDuration)
                                        }
                                        helperText={
                                            formik.touched.meetingDuration && formik.errors.meetingDuration
                                        }
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions (kgCO2e)</FormLabel>
                                    <TextField
                                        id="energyUtilisationEmission"
                                        name="energyUtilisationEmission"
                                        label=""
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={formik.values.energyUtilisationEmission}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.energyUtilisationEmission &&
                                            Boolean(formik.errors.energyUtilisationEmission)
                                        }
                                        helperText={
                                            formik.touched.energyUtilisationEmission && formik.errors.energyUtilisationEmission
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

export default Hotel
