import { Delete } from '@mui/icons-material';
import { Box, Button, Card, Container, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { addEnergyData, deleteEnergyData } from '../../redux/slice/totalEnergyUpdatedSlice';

const EnergyUpdated = () => {

    const dispatch = useDispatch();

    const allData = useSelector((state) => state?.totalEnergyUpdatedDetails?.data[0]?.data)
    const totalEmission = useSelector((state) => state?.totalEnergyUpdatedDetails?.totalEmission)

    // -----------  validationSchema
    const validationSchema = yup.object({
        type: yup.string().required("Type is required"),
    });

    // -----------   initialValues
    const initialValues = {
        kwh: '',
        emissionOne: 0,
        gallonsOne: '',
        emissionTwo: 0,
        gallonsTwo: '',
        emissionThree: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('emissionOne', values?.kwh * 0.43);
            formik.setFieldValue('emissionTwo', values?.gallonsOne * 0.0089);
            formik.setFieldValue('emissionThree', values?.gallonsTwo * 10.18);

            const data = [
                {
                    type: 'Electricity',
                    kwh: values?.kwh,
                    emission: parseFloat((values?.kwh * 0.43).toFixed(2)) || 0
                },
                {
                    type: 'Petrol',
                    gallonsOne: values?.gallonsOne,
                    emission: parseFloat((values?.gallonsOne * 0.0089).toFixed(2)) || 0
                },
                {
                    type: 'Diesel',
                    gallonsTwo: values?.gallonsTwo,
                    emission: parseFloat((values?.gallonsTwo * 10.18).toFixed(2)) || 0
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
    }, [allData])

    const handeleDelete = () => {
        dispatch(deleteEnergyData())
    }


    return (
        <div>
            <Container maxWidth>
                <Card className='p-4'>
                    <Box >
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >

                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h6'>
                                    Electricity
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Kwh</FormLabel>
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
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Emissions (kgCO2e)</FormLabel>
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
                                <Typography variant='h6'>
                                    Petrol
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Gallons</FormLabel>
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
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Emissions (kgCO2e)</FormLabel>
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
                                <Typography variant='h6'>
                                    Diesel
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Gallons</FormLabel>
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
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Emissions (kgCO2e)</FormLabel>
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

                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"flex-end"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant='contained' onClick={() => { formik.handleSubmit() }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                </Stack>

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
                                <Typography>{`Total Energy Updated Footprint = ${totalEmission} metric tons of kgCO2e`}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginLeft={3}>
                                <ul>
                                    {
                                        allData?.length > 0 && allData?.map((item) => (

                                            <li>
                                                {`${item?.type} : ${item?.emission} metric tons of kgCO2e`}
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

export default EnergyUpdated