import { useTheme } from '@emotion/react';
import { Box, Button, Card, Container, FormLabel, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import EnergyImg from '../../assets/Energy.png';
import { IconDiv } from '../../components/IconDiv';
import { addEnergyData, deleteEnergyData } from '../../redux/slice/totalEnergyUpdatedSlice';

const EnergyUpdated = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();

    const allData = useSelector((state) => state?.totalEnergyUpdatedDetails?.data[0]?.data)
    const totalEmission = useSelector((state) => state?.totalEnergyUpdatedDetails?.totalEmission)

    // -----------  validationSchema
    const validationSchema = yup.object({
        type: yup.string().required("Type is required"),
    });

    // -----------   initialValues
    const initialValues = {
        kwh: 0,
        emissionOne: 0,
        gallonsOne: 0,
        emissionTwo: 0,
        gallonsTwo: 0,
        emissionThree: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('emissionOne', Number((values?.kwh * 0.43).toFixed(2)));
            formik.setFieldValue('emissionTwo', Number((values?.gallonsOne * 8.78).toFixed(2)));
            formik.setFieldValue('emissionThree', Number((values?.gallonsTwo * 10.21).toFixed(2)));

            const data = [
                {
                    type: 'Electricity',
                    kwh: values?.kwh,
                    emission: Number((values?.kwh * 0.43).toFixed(2)) || 0
                },
                {
                    type: 'Petrol',
                    gallonsOne: values?.gallonsOne,
                    emission: Number((values?.gallonsOne * 8.78).toFixed(2)) || 0
                },
                {
                    type: 'Diesel',
                    gallonsTwo: values?.gallonsTwo,
                    emission: Number((values?.gallonsTwo * 10.21).toFixed(2)) || 0
                }
            ];
            dispatch(addEnergyData({ data }))
        },
    });

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("kwh", allData[0]?.kwh)
            formik.setFieldValue("emissionOne", allData[0]?.emission)
            formik.setFieldValue("gallonsOne", allData[1]?.gallonsOne)
            formik.setFieldValue("emissionTwo", allData[1]?.emission)
            formik.setFieldValue("gallonsTwo", allData[2]?.gallonsTwo)
            formik.setFieldValue("emissionThree", allData[2]?.emission)
        }
    }, [value])

    const handeleDelete = () => {
        dispatch(deleteEnergyData())
    }

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg'>
                    <Box className='table-custom-inpt-field' mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img src={EnergyImg} alt="Energy" width={100} />
                        </IconDiv>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >

                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4'>
                                    Electricity
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Kwh</FormLabel>
                                    <TextField
                                        id="kwh"
                                        name="kwh"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.kwh}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.kwh &&
                                            Boolean(formik.errors.kwh)
                                        }
                                        helperText={
                                            formik.touched.kwh && formik.errors.kwh
                                        }
                                        inputProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions (kgCO2e)</FormLabel>
                                    <TextField
                                        id="emissionOne"
                                        name="emissionOne"
                                        label=""
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={formik.values.emissionOne}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.emissionOne &&
                                            Boolean(formik.errors.emissionOne)
                                        }
                                        helperText={
                                            formik.touched.emissionOne && formik.errors.emissionOne
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4'>
                                    Petrol
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Gallons</FormLabel>
                                    <TextField
                                        id="gallonsOne"
                                        name="gallonsOne"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.gallonsOne}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.gallonsOne &&
                                            Boolean(formik.errors.gallonsOne)
                                        }
                                        helperText={
                                            formik.touched.gallonsOne && formik.errors.gallonsOne
                                        }
                                        inputProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions (kgCO2e)</FormLabel>
                                    <TextField
                                        id="emissionTwo"
                                        name="emissionTwo"
                                        label=""
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={formik.values.emissionTwo}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.emissionTwo &&
                                            Boolean(formik.errors.emissionTwo)
                                        }
                                        helperText={
                                            formik.touched.emissionTwo && formik.errors.emissionTwo
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4'>
                                    Diesel
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Gallons</FormLabel>
                                    <TextField
                                        id="gallonsTwo"
                                        name="gallonsTwo"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.gallonsTwo}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.gallonsTwo &&
                                            Boolean(formik.errors.gallonsTwo)
                                        }
                                        helperText={
                                            formik.touched.gallonsTwo && formik.errors.gallonsTwo
                                        }
                                        inputProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions (kgCO2e)</FormLabel>
                                    <TextField
                                        id="emissionThree"
                                        name="emissionThree"
                                        label=""
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={formik.values.emissionThree}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.emissionThree &&
                                            Boolean(formik.errors.emissionThree)
                                        }
                                        helperText={
                                            formik.touched.emissionThree && formik.errors.emissionThree
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant='contained' onClick={() => { formik.handleSubmit() }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                                </Stack>

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
                                <Typography>{`Total Energy Footprint = ${totalEmission} tons of kgCO2e`}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginLeft={3}>
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
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default EnergyUpdated;