import { Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
// import { useEffect } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductionData, deleteProductionData } from '../../redux/slice/totalProductionSlice';

const Production = () => {
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.productionDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.productionDetails?.totalEmission);

    const fileldData = [
        { name: 'MDF', ef: 0.345, fieldName: 'mdf' },
        { name: 'Open Panel Timber Frame ', ef: 0.856, fieldName: 'openPanelTimberFrame' },
        { name: 'Carpet ', ef: 0.263, fieldName: 'carpet' },
        { name: 'Sawn Timber', ef: 6.7, fieldName: 'sawnTimber' },
        { name: 'Wood', ef: 3.1, fieldName: 'wood' },
        { name: 'Adhesive Vinyl', ef: 6.4, fieldName: 'adhesiveVinyl' },
        { name: 'Aluminium', ef: 1.83, fieldName: 'aluminium' },
        { name: 'Steel ', ef: 0.42, fieldName: 'steel' },
        { name: 'Carpet ', ef: 0.64, fieldName: 'carpet' },
        { name: 'Iron', ef: 0, fieldName: 'iron' },
        { name: 'Paint ', ef: 0, fieldName: 'paint' },
        { name: 'Wooden Floor', ef: 0, fieldName: 'woodenFloor' },
        { name: 'Cardboard', ef: 8.3, fieldName: 'cardboard' },
        { name: 'Cotton Banner', ef: 0.94, fieldName: 'cottonBanner' },
        { name: 'Polyester', ef: 1.2, fieldName: 'polyester' },
        { name: 'paper', ef: 12.7, fieldName: 'paper' },
        { name: 'Lanyards', ef: 14.5, fieldName: 'lanyards' },
        { name: 'Cotton canvas ', ef: 22.74, fieldName: 'cottonCanvas' },
        { name: 'Nylon', ef: 2.792, fieldName: 'nylon' },
        { name: 'Poly Ethelene', ef: 12.7, fieldName: 'polyEthelene' },
    ];

    const initialValues = fileldData.reduce((field, item, i) => {

        field[item.fieldName] = 0;
        field[`${item.fieldName}_area`] = 0;
        return field
    }, {});

    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: async (values) => {
            console.log(values, "values")

            const data = fileldData?.map((item) => {
                const emission = ((values?.[`${item?.fieldName}_area`] * item.ef) || 0)
                formik.setFieldValue(item?.fieldName, emission.toFixed(2))
                return ({
                    type: item?.name,
                    totalArea: values?.[`${item?.fieldName}_area`],
                    emission
                })
            })

            dispatch(addProductionData({ data }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteProductionData());
    };


    useEffect(() => {
        if (allData?.length > 0) {
            // allData.map((v) => {
            fileldData?.forEach((item, i) => {

                // const emission = ((formik.values?.[`${item?.fieldName}_area`] * item.ef) || 0)
                // formik.setFieldValue(item?.fieldName, emission.toFixed(2))
                // type: item?.name,
                // totalArea: formik.values?.[`${item?.fieldName}_area`],
                // emission,
                formik.setFieldValue(item?.fieldName, allData[i]?.emission)
                formik.setFieldValue([`${item?.fieldName}_area`], allData[i]?.totalArea)

            })
            // })
        }
    }, [allData]);

    return (
        <div>
            <Container maxWidth>
                <Card style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box width={'70%'}>

                        <table className=''>
                            <tr>

                                <th className='ps-4'>Material</th>
                                <th className='ps-4'>Total Area (m2)/ Amount</th>
                                <th className='ps-4'>Total Emissions (kgCO2e)</th>
                            </tr>
                            {fileldData && fileldData?.map((item, i) => (
                                <>

                                    <tr>
                                        <th className='ps-4 py-1'> {item?.name}</th>
                                        <td className='ps-4 py-1'> <TextField
                                            id={`${item?.fieldName}_area`}
                                            name={`${item?.fieldName}_area`}
                                            label=""
                                            type='number'
                                            fullWidth
                                            size="small"
                                            value={formik.values?.[`${item?.fieldName}_area`]}
                                            onChange={formik.handleChange}
                                            error={formik.touched?.[`${item?.fieldName}_area`] && Boolean(formik.errors?.[`${item?.fieldName}_area`])}
                                            helperText={formik.touched?.[`${item?.fieldName}_area`] && formik.errors?.[`${item?.fieldName}_area`]}
                                        /></td>
                                        <td className='ps-4 py-1'> <TextField
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
                                        /></td>
                                    </tr>
                                </>
                            ))}
                        </table>
                        <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"end"} pt={2}>
                            <Stack direction={"row"} spacing={2}>
                                <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                            </Stack>

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} marginTop={3}>
                            <Typography>{`Total Production Footprint = ${parseFloat(totalEmission)} tons of kgCO2e`}</Typography>
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={12} marginTop={3}>
                            <ul>
                                {
                                    allData?.length > 0 && allData?.map((item, index) => (
                                        <li>
                                            {`${item?.type} : ${item?.emission} tons of CO2e`}
                                        </li>

                                    ))
                                }
                            </ul>
                        </Grid> */}
                    </Box>
                </Card>
            </Container>
        </div>
    );
};

export default Production;
