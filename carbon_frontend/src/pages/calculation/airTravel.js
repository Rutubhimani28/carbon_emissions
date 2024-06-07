import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { addAirTravelData, deleteAirTravelData } from '../../redux/slice/totalAirTravelSlice';
import AirTravelImg from '../../assets/Travel.png'

const IconDiv = styled(Box)(({ theme }) => ({
    position: "relative",
    top: 10,
    left: 15,
    [theme.breakpoints.up('lg')]: {
        position: "absolute",
    },
}));

const AirTravel = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch()
    const allData = useSelector((state) => state?.totalAirTravelDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalAirTravelDetails?.totalEmission);

    // -----------   initialValues
    const initialValues = {
        noOfTripsOne: 0,
        noOfTripsTwo: 0,
        noOfTripsThree: 0,
        emissionOne: 0,
        emissionTwo: 0,
        emissionThree: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('emissionOne', (200 * values?.noOfTripsOne));      // Short Haul Flight
            formik.setFieldValue('emissionTwo', (400 * values?.noOfTripsTwo));      // Medium Haul Flight
            formik.setFieldValue('emissionThree', (1000 * values?.noOfTripsThree)); // Long Haul Flight

            const data = [
                {
                    type: 'Short Haul Flight',
                    noOfTrips: values?.noOfTripsOne,
                    emission: Number((200 * values?.noOfTripsOne).toFixed(2)) || 0
                },
                {
                    type: 'Medium Haul Flight',
                    noOfTrips: values?.noOfTripsTwo,
                    emission: Number((400 * values?.noOfTripsTwo).toFixed(2)) || 0
                },
                {
                    type: 'Long Haul Flight',
                    noOfTrips: values?.noOfTripsThree,
                    emission: Number((1000 * values?.noOfTripsThree).toFixed(2)) || 0
                },
            ];
            dispatch(addAirTravelData({ data }))
        },
    });

    const handeleDelete = () => {
        dispatch(deleteAirTravelData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("noOfTripsOne", allData[0]?.noOfTrips)
            formik.setFieldValue("emissionOne", allData[0]?.emission)
            formik.setFieldValue("noOfTripsTwo", allData[1]?.noOfTrips)
            formik.setFieldValue("emissionTwo", allData[1]?.emission)
            formik.setFieldValue("noOfTripsThree", allData[2]?.noOfTrips)
            formik.setFieldValue("emissionThree", allData[2]?.emission)
        }
    }, [value]);

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg' style={{ position: "relative", padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: useMediaQuery(theme.breakpoints.up('lg')) ? 'row' : 'column' }}>
                    <IconDiv>
                        <img width={100} src={AirTravelImg} alt="AirTravel" />
                    </IconDiv>
                    <Box>
                        <div className='table-responsive'>
                            <table className='table-custom-inpt-field'>
                                <tr>
                                    <th />
                                    <th className='ps-2'>No of Trips</th>
                                    <th className='ps-2'>Emission (KgCO2e / Km)</th>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>Short Haul Flight (&lt;3hrs)</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsOne' inputProps={{ style: { color: 'white' } }} value={formik?.values?.noOfTripsOne} onChange={formik.handleChange} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionOne' value={formik?.values?.emissionOne} onChange={formik.handleChange} disabled /></td>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>Medium Haul Flight (3-6hrs)</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsTwo' inputProps={{ style: { color: 'white' } }} value={formik?.values?.noOfTripsTwo} onChange={formik.handleChange} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwo' value={formik?.values?.emissionTwo} onChange={formik.handleChange} disabled /></td>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>Long Haul Flight (&gt;6hrs)</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfTripsThree' inputProps={{ style: { color: 'white' } }} value={formik?.values?.noOfTripsThree} onChange={formik.handleChange} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionThree' value={formik?.values?.emissionThree} onChange={formik.handleChange} disabled /></td>
                                </tr>
                            </table>
                        </div>
                        <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"} mt={3}>
                            <Stack direction={"row"} spacing={2}>
                                <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
                            <Typography className='mt-3' style={{ color: 'white', fontSize: '14px' }}>Note: When you calculate the climate impact of the entire flight and roung up to even hundreds, the emissions per passenger are given above.</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
                            <Typography variant='h6' className='mt-3' color='white'>Total Air Travel FootPrint = {totalEmission} tons of KgCo2e / Km</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} marginLeft={3} mt={3}>
                            <ul style={{ color: 'white' }}>
                                {
                                    allData?.length > 0 && allData?.map((item) => (

                                        <li>
                                            {`${item?.type} : ${item?.emission} tons of KgCO2e / Km`}
                                        </li>
                                    ))
                                }
                            </ul>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
};

export default AirTravel;