import { Box, Button, Card, Container, FormLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { addAirFreightData, deleteAirFreightData } from '../../redux/slice/totalAirFreightSlice';

const AirFreight = (props) => {
    const { setValue, value } = props;

    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalAirFreightDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalAirFreightDetails?.totalEmission);

    // -----------  validationSchema
    const validationSchema = yup.object({
        noOfKms: yup.number().required("No of Kms is required"),
        weightInKgs: yup.number().required("Weight is required"),
    });

    // -----------   initialValues
    const initialValues = {
        noOfKms: 0,
        weightInKgs: 0,
        ef: 0,
        emission: 0
    };

    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: async (values) => {

            const ef = 0.15;
            formik.setFieldValue('ef', ef || 0);

            const emission = Number(values?.noOfKms) * Number(values?.weightInKgs) * Number(ef);
            formik.setFieldValue('emission', emission || 0);

            const data = [
                {
                    type: 'Air Freight',
                    noOfKms: values?.noOfKms,
                    weightInKgs: values?.weightInKgs,
                    ef,
                    emission,
                }
            ];

            dispatch(addAirFreightData({ data }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteAirFreightData());
    }

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("emission", allData[0]?.emission);
            formik.setFieldValue("noOfKms", allData[0]?.noOfKms);
            formik.setFieldValue("weightInKgs", allData[0]?.weightInKgs);
            formik.setFieldValue("ef", allData[0]?.ef);
        }
    }, [value])

    return (
        <div>
            <Container maxWidth>
                {/* <Card style={{ padding: "20px" }}> */}
                <Card style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
                    <Box width={"50%"}>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >

                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant='h6'>
                                    Air Freight
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">No of Kms</FormLabel>
                                    <TextField
                                        id="noOfKms"
                                        name="noOfKms"
                                        label=""
                                        type='number'
                                        fullWidth
                                        size="small"
                                        value={formik.values.noOfKms}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.noOfKms &&
                                            Boolean(formik.errors.noOfKms)
                                        }
                                        helperText={
                                            formik.touched.noOfKms && formik.errors.noOfKms
                                        }
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Weight (Kgs)</FormLabel>
                                    <TextField
                                        id="weightInKgs"
                                        name="weightInKgs"
                                        label=""
                                        type='number'
                                        fullWidth
                                        size="small"
                                        value={formik.values.weightInKgs}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.weightInKgs &&
                                            Boolean(formik.errors.weightInKgs)
                                        }
                                        helperText={
                                            formik.touched.weightInKgs && formik.errors.weightInKgs
                                        }
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Emissions (kgCO2e)</FormLabel>
                                    <TextField
                                        id="emission"
                                        name="emission"
                                        label=""
                                        type='number'
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={formik.values.emission}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.emission &&
                                            Boolean(formik.errors.emission)
                                        }
                                        helperText={
                                            formik.touched.emission && formik.errors.emission
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"end"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate And Add To Footprint</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                                </Stack>

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <Typography>{`Total Air Freight Footprint = ${totalEmission} tons of kgCO2e`}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <ul>
                                    {
                                        allData?.length > 0 && allData?.map((item, index) => (
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
}

export default AirFreight
