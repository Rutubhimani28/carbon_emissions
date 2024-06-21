import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addAirTravelData, deleteAirTravelData } from '../../redux/slice/totalAirTravelSlice';
import { IconDiv } from '../../components/IconDiv';
import AirTravelImg from '../../assets/Travel.png';

const AirTravel = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch()
    const allData = useSelector((state) => state?.totalAirTravelDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalAirTravelDetails?.totalEmission);

    // -----------   initialValues
    const initialValues = {
        // Economy Class
        noOfTripsOne: 0,   // Short Haul      
        noOfTripsTwo: 0,   // Medium haul
        noOfTripsThree: 0, // Long haul
        emissionOne: 0,    // Short Haul  200
        emissionTwo: 0,    // Medium haul 375
        emissionThree: 0,  // Long haul   960
        // Business Class
        noOfTripsFour: 0,
        noOfTripsFive: 0,
        noOfTripsSix: 0,
        emissionFour: 0,  // 400
        emissionFive: 0,  // 750
        emissionSix: 0,   // 1920
        // First Class
        noOfTripsSeven: 0,
        noOfTripsEight: 0,
        noOfTripsNine: 0,
        emissionSeven: 0,   // 600 
        emissionEight: 0,   // 1125
        emissionNine: 0,    // 2880
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('emissionOne', values?.noOfTripsOne === 0 ? 0 : (200 * values?.noOfTripsOne).toFixed(2));
            formik.setFieldValue('emissionTwo', values?.noOfTripsTwo === 0 ? 0 : (375 * values?.noOfTripsTwo).toFixed(2));
            formik.setFieldValue('emissionThree', values?.noOfTripsThree === 0 ? 0 : (960 * values?.noOfTripsThree).toFixed(2));
            formik.setFieldValue('emissionFour', values?.noOfTripsFour === 0 ? 0 : (400 * values?.noOfTripsFour).toFixed(2));
            formik.setFieldValue('emissionFive', values?.noOfTripsFive === 0 ? 0 : (750 * values?.noOfTripsFive).toFixed(2));
            formik.setFieldValue('emissionSix', values?.noOfTripsSix === 0 ? 0 : (1920 * values?.noOfTripsSix).toFixed(2));
            formik.setFieldValue('emissionSeven', values?.noOfTripsSeven === 0 ? 0 : (600 * values?.noOfTripsSeven).toFixed(2));
            formik.setFieldValue('emissionEight', values?.noOfTripsEight === 0 ? 0 : (1125 * values?.noOfTripsEight).toFixed(2));
            formik.setFieldValue('emissionNine', values?.noOfTripsNine === 0 ? 0 : (2880 * values?.noOfTripsNine).toFixed(2));

            const data = [
                {
                    type: 'Economy Class',
                    noOfTripsOne: values?.noOfTripsOne,
                    noOfTripsTwo: values?.noOfTripsTwo,
                    noOfTripsThree: values?.noOfTripsThree,
                    emissionOne: values?.noOfTripsOne === 0 ? 0 : Number((200 * values?.noOfTripsOne).toFixed(2)) || 0,
                    emissionTwo: values?.noOfTripsTwo === 0 ? 0 : Number((375 * values?.noOfTripsTwo).toFixed(2)) || 0,
                    emissionThree: values?.noOfTripsThree === 0 ? 0 : Number((960 * values?.noOfTripsThree).toFixed(2)) || 0,
                },
                {
                    type: 'Business Class',
                    noOfTripsFour: 0,
                    noOfTripsFive: 0,
                    noOfTripsSix: 0,
                    emissionFour: values?.noOfTripsFour === 0 ? 0 : Number((400 * values?.noOfTripsFour).toFixed(2)) || 0,
                    emissionFive: values?.noOfTripsFive === 0 ? 0 : Number((750 * values?.noOfTripsFive).toFixed(2)) || 0,
                    emissionSix: values?.noOfTripsSix === 0 ? 0 : Number((1920 * values?.noOfTripsSix).toFixed(2)) || 0,
                },
                {
                    type: 'First Class',
                    noOfTripsSeven: 0,
                    noOfTripsEight: 0,
                    noOfTripsNine: 0,
                    emissionSeven: values?.noOfTripsSeven === 0 ? 0 : Number((600 * values?.noOfTripsSeven).toFixed(2)) || 0,
                    emissionEight: values?.noOfTripsEight === 0 ? 0 : Number((1125 * values?.noOfTripsEight).toFixed(2)) || 0,
                    emissionNine: values?.noOfTripsNine === 0 ? 0 : Number((2880 * values?.noOfTripsNine).toFixed(2)) || 0,
                }
            ];
            dispatch(addAirTravelData({ data }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteAirTravelData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("noOfTripsOne", allData[0]?.noOfTripsOne);
            formik.setFieldValue("noOfTripsTwo", allData[0]?.noOfTripsTwo);
            formik.setFieldValue("noOfTripsThree", allData[0]?.noOfTripsThree);
            formik.setFieldValue("emissionOne", allData[0]?.emissionOne);
            formik.setFieldValue("emissionTwo", allData[0]?.emissionTwo);
            formik.setFieldValue("emissionThree", allData[0]?.emissionThree);

            formik.setFieldValue("noOfTripsFour", allData[1]?.noOfTripsFour);
            formik.setFieldValue("noOfTripsFive", allData[1]?.noOfTripsFive);
            formik.setFieldValue("noOfTripsSix", allData[1]?.noOfTripsSix);
            formik.setFieldValue("emissionFour", allData[1]?.emissionFour);
            formik.setFieldValue("emissionFive", allData[1]?.emissionFive);
            formik.setFieldValue("emissionSix", allData[1]?.emissionSix);

            formik.setFieldValue("noOfTripsSeven", allData[2]?.noOfTripsSeven);
            formik.setFieldValue("noOfTripsEight", allData[2]?.noOfTripsEight);
            formik.setFieldValue("noOfTripsNine", allData[2]?.noOfTripsNine);
            formik.setFieldValue("emissionSeven", allData[2]?.emissionSeven);
            formik.setFieldValue("emissionEight", allData[2]?.emissioEight);
            formik.setFieldValue("emissionNine", allData[2]?.emissionNine);
        }
    }, [value]);

    return (
        <div>
            <Container maxWidth>
                <Card className='p-3 custom-inner-bg' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img src={AirTravelImg} alt="Waste" width={100} />
                        </IconDiv>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography variant='h4' className='text-center text-white mb-4'>Economy Class</Typography>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Journey Type</th>
                                                <th className='ps-2'>No of trips</th>
                                                <th className='ps-2'>Emissions (Kg CO2e/ km)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Short Haul Flight (&lt;3hrs)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsOne' value={formik?.values?.noOfTripsOne} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionOne' value={formik?.values?.emissionOne} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Medium Haul Flight (3-6hrs)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsTwo' value={formik?.values?.noOfTripsTwo} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwo' value={formik?.values?.emissionTwo} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Long Haul Flight (&gt;6hrs)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsThree' value={formik?.values?.noOfTripsThree} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionThree' value={formik?.values?.emissionThree} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography variant='h4' className='text-center text-white mb-4'>Business Class</Typography>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Journey Type</th>
                                                <th className='ps-2'>No of trips</th>
                                                <th className='ps-2'>Emissions (Kg CO2e/ km)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Short Haul Flight (&lt;3hrs)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsFour' value={formik?.values?.noOfTripsFour} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionFour' value={formik?.values?.emissionFour} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Medium Haul Flight (3-6hrs)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsFive' value={formik?.values?.noOfTripsFive} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFive' value={formik?.values?.emissionFive} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Long Haul Flight (&gt;6hrs)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsSix' value={formik?.values?.noOfTripsSix} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionSix' value={formik?.values?.emissionSix} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography variant='h4' className="text-center text-white mb-4">First Class</Typography>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Journey Type</th>
                                                <th className='ps-2'>No of trips</th>
                                                <th className='ps-2'>Emissions (Kg CO2e/ km)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Short Haul Flight (&lt;3hrs)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsSeven' value={formik?.values?.noOfTripsSeven} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionSeven' value={formik?.values?.emissionSeven} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Medium Haul Flight (3-6hrs)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsEight' value={formik?.values?.noOfTripsEight} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionEight' value={formik?.values?.emissionEight} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Long Haul Flight (&gt;6hrs)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsNine' value={formik?.values?.noOfTripsNine} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionNine' value={formik?.values?.emissionNine} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                        </table>
                                    </div>

                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={2}>
                                <Typography color='white'>{`Total Air Travel Footprint = ${totalEmission}  tons of kgCO2e`}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={1}>
                                <Typography color='white'>Note: For more accurate calculations, please visit ICAO webiste.</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
};

export default AirTravel;