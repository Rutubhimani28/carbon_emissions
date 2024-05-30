import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalTranspotationData, deleteLocalTranspotationData } from '../../redux/slice/totalLocalTranspotationSlice';

const LocalTranspotation = () => {
    const dispatch = useDispatch()
    const allData = useSelector((state) => state?.totalLocalTranspotationDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalLocalTranspotationDetails?.totalEmission);

    // -----------   initialValues
    const initialValues = {
        petrolCarKms: 0,
        petrolCarNoPasse: 0,
        petrolCarEmission: 0,
        dieselCarKms: 0,
        dieselCarNoPasse: 0,
        dieselCarEmission: 0,
        suvDieselKms: 0,
        suvDieselNoPasse: 0,
        suvDieselEmission: 0,
        suvPetrolKms: 0,
        suvPetrolNoPasse: 0,
        suvPetrolEmission: 0,
        camperPetrolKms: 0,
        camperPetrolNoPasse: 0,
        camperPetrolEmission: 0,
        caperDieselKms: 0,
        caperDieselNoPasse: 0,
        caperDieselEmission: 0,
        busDieselKms: 0,
        busDieselEmission: 0,
        electricCarKms: 0,
        electricCarEmission: 0,
        metroKms: 0,
        metroEmission: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('petrolCarEmission', ((167 * values?.petrolCarKms) / values?.petrolCarNoPasse).toFixed(2));
            formik.setFieldValue('dieselCarEmission', ((137 * values?.dieselCarKms) / values?.dieselCarNoPasse).toFixed(2));
            formik.setFieldValue('suvDieselEmission', ((220 * values?.suvDieselKms) / values?.suvDieselNoPasse).toFixed(2));
            formik.setFieldValue('suvPetrolEmission', ((181 * values?.suvPetrolKms) / values?.suvPetrolNoPasse).toFixed(2));
            formik.setFieldValue('camperPetrolEmission', ((327 * values?.camperPetrolKms) / values?.camperPetrolNoPasse).toFixed(2));
            formik.setFieldValue('caperDieselEmission', ((267 * values?.caperDieselKms) / values?.caperDieselNoPasse).toFixed(2));
            formik.setFieldValue('busDieselEmission', (15.1 * values?.busDieselKms).toFixed(2));
            formik.setFieldValue('electricCarEmission', (45 * values?.electricCarKms).toFixed(2));
            formik.setFieldValue('metroEmission', (29.29 * values?.metroKms).toFixed(2));

            const data = [
                {
                    type: 'Petrol Car',
                    petrolCarKms: values?.petrolCarKms,
                    petrolCarNoPasse: values?.petrolCarNoPasse,
                    emission: parseFloat(((167 * values?.petrolCarKms) / values?.petrolCarNoPasse).toFixed(2)) || 0
                },
                {
                    type: 'Diesel Car',
                    dieselCarKms: values?.dieselCarKms,
                    dieselCarNoPasse: values?.dieselCarNoPasse,
                    emission: parseFloat(((137 * values?.dieselCarKms) / values?.dieselCarNoPasse).toFixed(2)) || 0
                },
                {
                    type: 'SUV Diesel',
                    suvDieselKms: values?.suvDieselKms,
                    suvDieselNoPasse: values?.suvDieselNoPasse,
                    emission: parseFloat(((220 * values?.suvDieselKms) / values?.suvDieselNoPasse).toFixed(2)) || 0
                },
                {
                    type: 'SUV Petrol',
                    suvPetrolKms: values?.suvPetrolKms,
                    suvPetrolNoPasse: values?.suvPetrolNoPasse,
                    emission: parseFloat(((181 * values?.suvPetrolKms) / values?.suvPetrolNoPasse).toFixed(2)) || 0
                },
                {
                    type: 'Camper Petrol',
                    camperPetrolKms: values?.camperPetrolKms,
                    camperPetrolNoPasse: values?.camperPetrolNoPasse,
                    emission: parseFloat(((327 * values?.camperPetrolKms) / values?.camperPetrolNoPasse).toFixed(2)) || 0
                },
                {
                    type: 'Caper Diesel',
                    caperDieselKms: values?.caperDieselKms,
                    caperDieselNoPasse: values?.caperDieselNoPasse,
                    emission: parseFloat(((267 * values?.caperDieselKms) / values?.caperDieselNoPasse).toFixed(2)) || 0
                },
                {
                    type: 'Bus-Diesel',
                    busDieselKms: values?.busDieselKms,
                    emission: parseFloat((15.1 * values?.busDieselKms).toFixed(2)) || 0
                },
                {
                    type: 'Electric Car',
                    electricCarKms: values?.electricCarKms,
                    emission: parseFloat((45 * values?.electricCarKms).toFixed(2)) || 0
                },
                {
                    type: 'Metro',
                    metroKms: values?.metroKms,
                    emission: parseFloat((29.29 * values?.metroKms).toFixed(2)) || 0
                },
            ];
            console.log(data, "data")
            dispatch(addLocalTranspotationData({ data }))
        },
    });

    const handeleDelete = () => {
        dispatch(deleteLocalTranspotationData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("petrolCarKms", allData[0]?.petrolCarKms)
            formik.setFieldValue("petrolCarNoPasse", allData[0]?.petrolCarNoPasse)
            formik.setFieldValue("petrolCarEmission", allData[0]?.emission)

            formik.setFieldValue("dieselCarKms", allData[1]?.dieselCarKms)
            formik.setFieldValue("dieselCarNoPasse", allData[1]?.dieselCarNoPasse)
            formik.setFieldValue("dieselCarEmission", allData[1]?.emission)

            formik.setFieldValue("suvDieselKms", allData[2]?.suvDieselKms)
            formik.setFieldValue("suvDieselNoPasse", allData[2]?.suvDieselNoPasse)
            formik.setFieldValue("suvDieselEmission", allData[2]?.emission)

            formik.setFieldValue("suvPetrolKms", allData[3]?.suvPetrolKms)
            formik.setFieldValue("suvPetrolNoPasse", allData[3]?.suvPetrolNoPasse)
            formik.setFieldValue("suvPetrolEmission", allData[3]?.emission)

            formik.setFieldValue("camperPetrolKms", allData[4]?.camperPetrolKms)
            formik.setFieldValue("camperPetrolNoPasse", allData[4]?.camperPetrolNoPasse)
            formik.setFieldValue("camperPetrolEmission", allData[4]?.emission)

            formik.setFieldValue("caperDieselKms", allData[5]?.caperDieselKms)
            formik.setFieldValue("caperDieselNoPasse", allData[5]?.caperDieselNoPasse)
            formik.setFieldValue("caperDieselEmission", allData[5]?.emission)

            formik.setFieldValue("busDieselKms", allData[6]?.busDieselKms)
            formik.setFieldValue("busDieselEmission", allData[6]?.emission)

            formik.setFieldValue("electricCarKms", allData[7]?.electricCarKms)
            formik.setFieldValue("electricCarEmission", allData[7]?.emission)

            formik.setFieldValue("metroKms", allData[8]?.metroKms)
            formik.setFieldValue("metroEmission", allData[8]?.emission)
        }
    }, [allData])

    return (
        <div>
            <Container maxWidth>
                <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                >
                    <Grid item xs={12} sm={6} md={6}>
                        <Card className='p-4' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                            <Box>
                                <div className='table-responsive'>
                                    <table className=''>
                                        <tr>
                                            <th className='ps-2'>Model of Transport per vehicle</th>
                                            <th className='ps-2'>No of Kms</th>
                                            <th className='ps-2'>No of Passengers</th>
                                            <th className='ps-2'>Emission (kg CO2e)</th>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Petrol Car</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='petrolCarKms' value={formik?.values?.petrolCarKms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='petrolCarNoPasse' value={formik?.values?.petrolCarNoPasse} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='petrolCarEmission' value={formik?.values?.petrolCarEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Diesel Car</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='dieselCarKms' value={formik?.values?.dieselCarKms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='dieselCarNoPasse' value={formik?.values?.dieselCarNoPasse} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='dieselCarEmission' value={formik?.values?.dieselCarEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>SUV Diesel</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvDieselKms' value={formik?.values?.suvDieselKms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvDieselNoPasse' value={formik?.values?.suvDieselNoPasse} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvDieselEmission' value={formik?.values?.suvDieselEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>SUV Petrol</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvPetrolKms' value={formik?.values?.suvPetrolKms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvPetrolNoPasse' value={formik?.values?.suvPetrolNoPasse} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvPetrolEmission' value={formik?.values?.suvPetrolEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Camper Petrol</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='camperPetrolKms' value={formik?.values?.camperPetrolKms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='camperPetrolNoPasse' value={formik?.values?.camperPetrolNoPasse} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='camperPetrolEmission' value={formik?.values?.camperPetrolEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Caper Diesel</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='caperDieselKms' value={formik?.values?.caperDieselKms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='caperDieselNoPasse' value={formik?.values?.caperDieselNoPasse} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='caperDieselEmission' value={formik?.values?.caperDieselEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                    </table>
                                </div>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Card className='p-4' style={{ padding: '20px', display: 'flex', justifyContent: 'center', height: "100%" }}>
                            <Box>
                                <div className='table-responsive'>
                                    <table className=''>
                                        <tr>
                                            <th className='ps-2'>Model of Transport per vehicle</th>
                                            <th className='ps-3'>No of Kms</th>
                                            <th className='ps-2'>Emission (kg CO2e)</th>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Bus- Diesel</td>
                                            <td className='ps-3 py-1'><TextField size='small' type="number" name='busDieselKms' value={formik?.values?.busDieselKms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='busDieselEmission' disabled value={formik?.values?.busDieselEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Electric Car </td>
                                            <td className='ps-3 py-1'><TextField size='small' type="number" name='electricCarKms' value={formik?.values?.electricCarKms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='electricCarEmission' value={formik?.values?.electricCarEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Metro (Electric)</td>
                                            <td className='ps-3 py-1'><TextField size='small' type="number" name='metroKms' value={formik?.values?.metroKms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='metroEmission' value={formik?.values?.metroEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>

                                    </table>
                                </div>

                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"end"}>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                            <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} marginTop={3}>
                        <Typography>{`Total Local Transportation Footprint = ${totalEmission}  tons of kgCO2e`}</Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default LocalTranspotation
