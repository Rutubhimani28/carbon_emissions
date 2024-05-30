import { Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
// import { useEffect } from 'react';
import { useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addProductionData, deleteProductionData } from '../../redux/slice/totalProductionSlice';

const Production = (props) => {
    const { setValue } = props;
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalProductionDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalProductionDetails?.totalEmission);

    const fileldData = [
        { name: 'Open Panel Timber Frame ', ef: 0.345, fieldName: 'openPanelTimberFrame' },
        { name: 'MDF', ef: 0.856, fieldName: 'mdf' },
        { name: 'Sawn Timber', ef: 0.263, fieldName: 'sawnTimber' },
        { name: 'Carpet ', ef: 6.7, fieldName: 'carpet' },
        { name: 'Adhesive Vinyl', ef: 3.1, fieldName: 'adhesiveVinyl' },
        { name: 'Wood', ef: 6.4, fieldName: 'wood' },
        { name: 'Steel ', ef: 1.83, fieldName: 'steel' },
        { name: 'Aluminium', ef: 0.42, fieldName: 'aluminium' },
        { name: 'Iron', ef: 0.64, fieldName: 'iron' },
        { name: 'Wooden Floor', ef: 0, fieldName: 'woodenFloor' },
        { name: 'Paint ', ef: 0, fieldName: 'paint' },
        { name: 'Cotton Banner', ef: 8.3, fieldName: 'cottonBanner' },
        { name: 'Cardboard', ef: 0.94, fieldName: 'cardboard' },
        { name: 'paper', ef: 1.2, fieldName: 'paper' },
        { name: 'Polyester', ef: 12.7, fieldName: 'polyester' },
        { name: 'Cotton canvas ', ef: 14.5, fieldName: 'cottonCanvas' },
        { name: 'Lanyards', ef: 22.74, fieldName: 'lanyards' },
        { name: 'Poly Ethelene', ef: 2.792, fieldName: 'polyEthelene' },
        { name: 'Nylon', ef: 12.7, fieldName: 'nylon' },
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
                                        <td className='ps-4 py-1'> {item?.name}</td>
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
                                <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} marginTop={3}>
                            <Typography>{`Total Production Footprint = ${totalEmission} tons of kgCO2e`}</Typography>
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
