import { Box, Button, Card, Container, FormLabel, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { addData, deleteData } from '../../redux/slice/totalDigitalContSlice';
import DigitalImg from '../../assets/Digital.png';
import { IconDiv } from '../../components/IconDiv';

const DigitalContent = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();

    const allData = useSelector((state) => state?.totalDigitalContentDetails?.data[0]?.data)
    const totalEmission = useSelector((state) => state?.totalDigitalContentDetails?.totalEmission)

    // -----------  validationSchema
    const validationSchema = yup.object({
        type: yup.string().required("Type is required"),
    });

    // -----------   initialValues
    const initialValues = {
        count: 0,
        MB: 0,
        noOfAttendees: 0,
        noOfHours: 0,
        serviceLifeOfLaptop: 0,
        emissionOne: 0,
        emissionTwo: 0,
        emissionThree: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('emissionOne', values?.count * 4 / 1000);
            formik.setFieldValue('emissionTwo', values?.MB * 50 / 1000);
            const emission = Number((values?.noOfAttendees * 340 * (values?.noOfHours / 5840)).toFixed(2)) || 0;
            formik.setFieldValue('emissionThree', emission || 0);

            const data = [
                {
                    type: 'Emails',
                    count: values?.count,
                    emission: Number((values?.count * 4 / 1000).toFixed(2))
                },
                {
                    type: 'Attachment',
                    mb: values?.MB,
                    emission: Number((values?.MB * 50 / 1000).toFixed(2))
                },
                {
                    type: 'Laptop',
                    noOfAttendees: values?.noOfAttendees,
                    noOfHours: values?.noOfHours,
                    serviceLifeOfLaptop: values?.serviceLifeOfLaptop,
                    emission: Number((values?.noOfAttendees * 340 * (values?.noOfHours / 5840)).toFixed(2)) || 0
                }
            ];

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
    }, [value])

    const handeleDelete = () => {
        dispatch(deleteData())
    };

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg'>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img src={DigitalImg} alt="Digital" width={100} />
                        </IconDiv>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            className='table-custom-inpt-field'
                        >

                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4' color='white'>
                                    Emails
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Count</FormLabel>
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
                                <Typography variant='h4' color='white'>
                                    Attachment
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>MB</FormLabel>
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
                                <Typography variant='h4' color='white'>
                                    Laptop
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>No.of Attendees</FormLabel>
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
                                        inputProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>No. of hour</FormLabel>
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
                                <Typography color='white'>{`Total Digital Content Footprint = ${totalEmission} tons of kgCO2e`}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginLeft={3}>
                                <ul>
                                    {
                                        allData?.length > 0 && allData?.map((item) => (

                                            <li>
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
};

export default DigitalContent;