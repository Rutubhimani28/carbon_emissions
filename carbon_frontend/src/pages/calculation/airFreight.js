import { Box, Button, Card, Container, FormLabel, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IconDiv } from '../../components/IconDiv';
import { addLogisticsData, deleteLogisticsData } from '../../redux/slice/totalAirFreightSlice';
import LogisticsImg from '../../assets/Logistics.png'

const AirFreight = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();

    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalAirFreightDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalAirFreightDetails?.totalEmission);

    // -----------   initialValues
    const initialValues = {
        noOfKmsOne: 0,
        noOfKmsTwo: 0,
        kgsOne: 0,
        kgsTwo: 0,
        efOne: 0.005,
        efTwo: 0.18,
        emissionOne: 0,
        emissionTwo: 0
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {

            const emissionOne = values?.noOfKmsOne === 0 || values?.kgsOne === 0 ? 0 : Number((values?.noOfKmsOne * values?.kgsOne * values?.efOne).toFixed(2));
            const emissionTwo = values?.noOfKmsTwo === 0 || values?.kgsTwo === 0 ? 0 : Number((values?.noOfKmsTwo * values?.kgsTwo * values?.efTwo).toFixed(2));

            formik.setFieldValue('emissionOne', emissionOne);
            formik.setFieldValue('emissionTwo', emissionTwo);

            const data = [
                {
                    type: 'Air',
                    noOfKmsOne: values?.noOfKmsOne,
                    kgsOne: values?.kgsOne,
                    efOne: values?.efOne,
                    emission: emissionOne
                },
                {
                    type: 'Road',
                    noOfKmsOne: values?.road,
                    kgsTwo: values?.kgsTwo,
                    efOne: values?.efTwo,
                    emission: emissionTwo,
                }
            ];

            dispatch(addLogisticsData({ data }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteLogisticsData());
    }

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("emissionOne", allData[0]?.emissionOne);
            formik.setFieldValue("emissionTwo", allData[0]?.emissionTwo);
            formik.setFieldValue("noOfKmsOne", allData[0]?.noOfKmsOne);
            formik.setFieldValue("noOfKmsTwo", allData[0]?.noOfKmsTwo);
            formik.setFieldValue("kgsOne", allData[0]?.kgsOne);
            formik.setFieldValue("kgsTwo", allData[0]?.kgsTwo);
            formik.setFieldValue("efOne", allData[0]?.efOne);
            formik.setFieldValue("efTwo", allData[0]?.efTwo);
        }
    }, [value])

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg' style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: useMediaQuery(theme.breakpoints.up('lg')) ? 'row' : 'column' }}>
                    <IconDiv>
                        <img width={100} src={LogisticsImg} alt="Food" />
                    </IconDiv>
                    <Box>
                        <div className='table-responsive'>
                            <table className='table-custom-inpt-field'>
                                <tr>
                                    <th className='pe-2'>Mode of Transport</th>
                                    <th className='ps-2'>No of Kms</th>
                                    <th className='ps-2'>Weight in Kgs</th>
                                    <th className='ps-2'>Emission (kgCO2e)</th>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>Air</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfKmsOne' value={formik?.values?.noOfKmsOne} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='kgsOne' value={formik?.values?.kgsOne} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionOne' value={formik?.values?.emissionOne} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>Road</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfKmsTwo' value={formik?.values?.noOfKmsTwo} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='kgsTwo' value={formik?.values?.kgsTwo} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwo' value={formik?.values?.emissionTwo} onChange={formik.handleChange} disabled /></td>
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
                            <Typography className='mt-3 text-white'>Total Logistics Footprint = {totalEmission}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} marginLeft={3} mt={3}>
                            <ul>
                                {
                                    allData?.length > 0 && allData?.map((item) => (

                                        <li style={{ color: 'white' }}>
                                            {`${item?.type} : ${item?.emission} tons of kgCO2e`}
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

export default AirFreight;
