import { Delete } from '@mui/icons-material';
import { Box, Button, Card, Container, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { addData, deleteData } from '../../redux/slice/totalDigitalContSlice';

const DigitalContent = () => {

    const [type, setType] = useState('')
    const dispatch = useDispatch();

    const allData = useSelector((state) => state?.totalDigitalContentDetails?.data[0]?.data)
    const totalEmission = useSelector((state) => state?.totalDigitalContentDetails?.totalEmission)


    // -----------  validationSchema
    const validationSchema = yup.object({
        type: yup.string().required("Type is required"),
    });

    // -----------   initialValues
    const initialValues = {
        count: '',
        MB: '',
        noOfAttendees: '',
        noOfHours: '',
        serviceLifeOfLaptop: '',
        emissionOne: 0,
        emissionTwo: 0,
        emissionThree: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('emissionOne', values?.count * 13 / 1000);
            formik.setFieldValue('emissionTwo', values?.MB * 50 / 1000);
            const emission = values?.noOfAttendees * 340 * (values?.noOfHours / values?.serviceLifeOfLaptop) || 0;
            formik.setFieldValue('emissionThree', emission || 0);

            const data = [
                {
                    type: 'Emails',
                    count: values?.count,
                    emission: values?.count * 13 / 1000
                },
                {
                    type: 'Attachment',
                    mb: values?.MB,
                    emission: values?.MB * 50 / 1000
                },
                {
                    type: 'Laptop',
                    noOfAttendees: values?.noOfAttendees,
                    noOfHours: values?.noOfHours,
                    serviceLifeOfLaptop: values?.serviceLifeOfLaptop,
                    emission: values?.noOfAttendees * 340 * (values?.noOfHours / values?.serviceLifeOfLaptop)
                },
            ]

            dispatch(addData({ data }))
        },
    });

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("count", allData[0]?.count)
            formik.setFieldValue("emissionOne", allData[0]?.emission)
            formik.setFieldValue("MB", allData[1]?.mb)
            formik.setFieldValue("emissionTwo", allData[1]?.emission)
            formik.setFieldValue("noOfAttendees", allData[2]?.noOfAttendees)
            formik.setFieldValue("noOfHours", allData[2]?.noOfHours)
            formik.setFieldValue("serviceLifeOfLaptop", allData[2]?.serviceLifeOfLaptop)
            formik.setFieldValue("emissionThree", allData[2]?.emission)
        }
    }, [allData])

    const handeleDelete = () => {
        dispatch(deleteData())
    }



    return (
        <div>
            <Container maxWidth>
                <Card style={{ padding: "20px" }}>
                    <Box >
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >

                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h6'>
                                    Emails
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Count <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="count"
                                        name="count"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.count}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.count &&
                                            Boolean(formik.errors.count)
                                        }
                                        helperText={
                                            formik.touched.count && formik.errors.count
                                        }
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Emissions (/gm CO2e) <span style={{ color: "red" }}>*</span></FormLabel>
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
                                    Attachment
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">MB <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="MB"
                                        name="MB"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.MB}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.MB &&
                                            Boolean(formik.errors.MB)
                                        }
                                        helperText={
                                            formik.touched.MB && formik.errors.MB
                                        }
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Emissions (/gm CO2e) <span style={{ color: "red" }}>*</span></FormLabel>
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
                                    Laptop
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">No.of Attendees <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="noOfAttendees"
                                        name="noOfAttendees"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.noOfAttendees}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.noOfAttendees &&
                                            Boolean(formik.errors.noOfAttendees)
                                        }
                                        helperText={
                                            formik.touched.noOfAttendees && formik.errors.noOfAttendees
                                        }
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">No. of hours<span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="noOfHours"
                                        name="noOfHours"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.noOfHours}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.noOfHours &&
                                            Boolean(formik.errors.noOfHours)
                                        }
                                        helperText={
                                            formik.touched.noOfHours && formik.errors.noOfHours
                                        }
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Service life of Laptop<span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="serviceLifeOfLaptop"
                                        name="serviceLifeOfLaptop"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.serviceLifeOfLaptop}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.serviceLifeOfLaptop &&
                                            Boolean(formik.errors.serviceLifeOfLaptop)
                                        }
                                        helperText={
                                            formik.touched.serviceLifeOfLaptop && formik.errors.serviceLifeOfLaptop
                                        }
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Emissions <span style={{ color: "red" }}>*</span></FormLabel>
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
                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); setType('add') }}>Calculate and Add To Footprint</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); setType(''); handeleDelete() }} color='error'>Clear</Button>
                                </Stack>

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <Typography>{`Total Digital Content Footprint = ${totalEmission} metric tons of CO2e`}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <ul>
                                    {
                                        allData?.length > 0 && allData?.map((item) => (

                                            <li>
                                                {`${item?.type} : ${item?.emission} metric tons of CO2e`}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div >
    )
}

export default DigitalContent