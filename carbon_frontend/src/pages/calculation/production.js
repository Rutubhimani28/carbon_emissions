import { Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
// import { addProductionData, deleteProductionData } from '../../redux/slice/productionSlice';

const Production = () => {
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.productionDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.productionDetails?.totalEmission);

    // -----------  validationSchema
    const validationSchema = yup.object({
        noOfKms: yup.number().required('No of Kms is required'),
        weightInKgs: yup.number().required('Weight is required'),
    });

    // -----------   initialValues
    const initialValues = {

    };

    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: async (values) => {
            console.log(values, "values")
            // const ef = Number(values?.weightInKgs) / Number(values?.noOfKms);
            // formik.setFieldValue('ef', ef || 0);

            // const emission = Number(values?.noOfKms) * Number(values?.weightInKgs) * Number(ef);
            // formik.setFieldValue('emission', emission || 0);

            // const data = [
            //     {
            //         type: 'Air',
            //         noOfKms: values?.noOfKms,
            //         weightInKgs: values?.weightInKgs,
            //         ef,
            //         emission,
            //     },
            // ];

            // dispatch(addProductionData({ data }));
        },
    });

    const handeleDelete = () => {
        // dispatch(deleteProductionData());
    };

    const fileldData = [
        { name: 'MDF', fieldName: 'mdf' },
        { name: 'Open Panel Timber Frame ', fieldName: 'openPanelTimberFrame' },
        { name: 'Carpet ', fieldName: 'carpet' },
        { name: 'Sawn Timber', fieldName: 'sawnTimber' },
        { name: 'Wood', fieldName: 'wood' },
        { name: 'Adhesive Vinyl', fieldName: 'adhesiveVinyl' },
        { name: 'Aluminium', fieldName: 'aluminium' },
        { name: 'Steel ', fieldName: 'steel' },
        { name: 'Carpet ', fieldName: 'carpet' },
        { name: 'Iron', fieldName: 'iron' },
        { name: 'Paint ', fieldName: 'paint' },
        { name: 'Wooden Floor', fieldName: 'woodenFloor' },
        { name: 'Cardboard', fieldName: 'cardboard' },
        { name: 'Cotton Banner', fieldName: 'cottonBanner' },
        { name: 'Polyester', fieldName: 'polyester' },
        { name: 'paper', fieldName: 'paper' },
        { name: 'Lanyards', fieldName: 'lanyards' },
        { name: 'Cotton canvas ', fieldName: 'cottonCanvas' },
        { name: 'Nylon', fieldName: 'nylon' },
        { name: 'Poly Ethelene', fieldName: 'polyEthelene' },
    ];

    // useEffect(() => {
    //     if (allData?.length > 0) {
    //         formik.setFieldValue('emission', allData[0]?.emission);
    //         formik.setFieldValue('noOfKms', allData[0]?.noOfKms);
    //         formik.setFieldValue('weightInKgs', allData[0]?.weightInKgs);
    //         formik.setFieldValue('ef', allData[0]?.ef);
    //     }
    // }, [allData]);

    return (
        <div>
            <Container maxWidth>
                {/* <Card style={{ padding: "20px" }}> */}
                <Card style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box width={'70%'}>
                        {/* <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >

                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant='h6'>
                                    Air
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
                                    <FormLabel id="demo-row-radio-buttons-group-label">Emissions</FormLabel>
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
                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                                </Stack>

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <Typography>{`Total Air Freight Footprint = ${totalEmission} metric tons of CO2e`}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <ul>
                                    {
                                        allData?.length > 0 && allData?.map((item, index) => (
                                            <li>
                                                {`${item?.type} : ${item?.emission} metric tons of CO2e`}
                                            </li>

                                        ))
                                    }
                                </ul>
                            </Grid>
                        </Grid> */}
                        <Grid container py={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12} sm={12} md={4} >
                                <Typography variant="h6">Material  </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="h6">Total Area (m2)/ Amount used </Typography>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="h6">Total Emissions (kgCO2e) </Typography>

                            </Grid>
                        </Grid>
                        {fileldData && fileldData?.map((item, i) => (
                            <Grid container py={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={12} sm={12} md={4}>
                                    {item?.name}
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} py={1}>
                                    <TextField
                                        id={`${item?.fieldName}_area`}
                                        name={`${item?.fieldName}_area`}
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values?.[`${item?.fieldName}_area`]}
                                        onChange={formik.handleChange}
                                        error={formik.touched?.[`${item?.fieldName}_area`] && Boolean(formik.errors?.[`${item?.fieldName}_area`])}
                                        helperText={formik.touched?.[`${item?.fieldName}_area`] && formik.errors?.[`${item?.fieldName}_area`]}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} py={1}>
                                    <TextField
                                        id={item?.fieldName}
                                        name={item?.fieldName}
                                        label=""
                                        fullWidth
                                        disabled
                                        size="small"
                                        value={formik.values?.[item?.fieldName]}
                                        onChange={formik.handleChange}
                                        error={formik.touched?.[item?.fieldName] && Boolean(formik.errors?.[item?.fieldName])}
                                        helperText={formik.touched?.[item?.fieldName] && formik.errors?.[item?.fieldName]}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"end"}>
                            <Stack direction={"row"} spacing={2}>
                                <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                            </Stack>

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} marginTop={3}>
                            <Typography>{`Total Production Footprint = ${totalEmission} metric tons of CO2e`}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} marginTop={3}>
                            <ul>
                                {
                                    allData?.length > 0 && allData?.map((item, index) => (
                                        <li>
                                            {`${item?.type} : ${item?.emission} metric tons of CO2e`}
                                        </li>

                                    ))
                                }
                            </ul>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    );
};

export default Production;
