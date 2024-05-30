import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWasteData, deleteWasteData } from '../../redux/slice/totalWasteSlice';

const LocalTranspotation = () => {
    const dispatch = useDispatch()
    const allData = useSelector((state) => state?.totalWasteDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalWasteDetails?.totalEmission);

    // -----------   initialValues
    const initialValues = {
        foodKg: 0,
        dieselCar: 0,
        suvDiesel: 0,
        foodEmission: 0,
        dieselCarEmission: 0,
        suvDieselEmission: 0,
        water: 0,
        waterEmission: 0,
        bottleOne: 0,
        bottleTwo: 0,
        bottleThree: 0,
        bottleOneEmission: 0,
        bottleTwoEmission: 0,
        bottleThreeEmission: 0,
        hdpeBanner: 0,
        pvcBanners: 0,
        badgeHolders: 0,
        hdpeBannerEmission: 0,
        pvcBannersEmission: 0,
        badgeHoldersEmission: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('foodEmission', (0.58 * values?.foodKg).toFixed(2));
            formik.setFieldValue('dieselCarEmission', (0.09 * values?.dieselCar).toFixed(2));
            formik.setFieldValue('suvDieselEmission', (0.52 * values?.suvDiesel).toFixed(2));
            formik.setFieldValue('waterEmission', (0.272 * values?.water).toFixed(2));
            formik.setFieldValue('bottleOneEmission', (values?.bottleOne * 6.42 * 0.00279).toFixed(2));
            formik.setFieldValue('bottleTwoEmission', (values?.bottleTwo * 13 * 0.00279).toFixed(2));
            formik.setFieldValue('bottleThreeEmission', (values?.bottleThree * 21.5 * 0.00279).toFixed(2));
            formik.setFieldValue('hdpeBannerEmission', (3.11 * values?.hdpeBanner).toFixed(2));
            formik.setFieldValue('pvcBannersEmission', (7.83 * values?.pvcBanners).toFixed(2));
            formik.setFieldValue('badgeHoldersEmission', (22.74 * values?.badgeHolders).toFixed(2));

            const data = [
                {
                    type: 'Food',
                    foodKg: values?.foodKg,
                    emission: parseFloat((0.58 * values?.foodKg).toFixed(2)) || 0
                },
                {
                    type: 'mixedRecyclables',
                    dieselCar: values?.dieselCar,
                    emission: parseFloat((0.09 * values?.dieselCar).toFixed(2)) || 0
                },
                {
                    type: 'municipalSolidWaste',
                    suvDiesel: values?.suvDiesel,
                    emission: parseFloat((0.52 * values?.suvDiesel).toFixed(2)) || 0
                },
                {
                    type: 'Water',
                    water: values?.water,
                    emission: parseFloat((0.272 * values?.water).toFixed(2)) || 0
                },
                {
                    type: '250ml',
                    bottleOne: values?.bottleOne,
                    emission: parseFloat((values?.bottleOne * 6.42 * 0.00279).toFixed(2)) || 0
                },
                {
                    type: '500ml',
                    bottleTwo: values?.bottleTwo,
                    emission: parseFloat((values?.bottleTwo * 13 * 0.00279).toFixed(2)) || 0
                },
                {
                    type: '1000ml',
                    bottleThree: values?.bottleThree,
                    emission: parseFloat((values?.bottleThree * 21.5 * 0.00279).toFixed(2)) || 0
                },
                {
                    type: 'PVCHDPEBanner',
                    hdpeBanner: values?.hdpeBanner,
                    emission: parseFloat((3.11 * values?.hdpeBanner).toFixed(2)) || 0
                },
                {
                    type: 'PVCBanners',
                    pvcBanners: values?.pvcBanners,
                    emission: parseFloat((7.83 * values?.pvcBanners).toFixed(2)) || 0
                },
                {
                    type: 'badgeholders',
                    badgeHolders: values?.badgeHolders,
                    emission: parseFloat((22.74 * values?.badgeHolders).toFixed(2)) || 0
                },

            ];
            dispatch(addWasteData({ data }))
        },
    });

    const handeleDelete = () => {
        dispatch(deleteWasteData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("foodKg", allData[0]?.foodKg)
            formik.setFieldValue("foodEmission", allData[0]?.emission)
            formik.setFieldValue("dieselCar", allData[1]?.dieselCar)
            formik.setFieldValue("dieselCarEmission", allData[1]?.emission)
            formik.setFieldValue("suvDiesel", allData[2]?.suvDiesel)
            formik.setFieldValue("suvDieselEmission", allData[2]?.emission)

            formik.setFieldValue("water", allData[3]?.water)
            formik.setFieldValue("waterEmission", allData[3]?.emission)

            formik.setFieldValue("bottleOne", allData[4]?.bottleOne)
            formik.setFieldValue("bottleOneEmission", allData[4]?.emission)
            formik.setFieldValue("bottleTwo", allData[5]?.bottleTwo)
            formik.setFieldValue("bottleTwoEmission", allData[5]?.emission)
            formik.setFieldValue("bottleThree", allData[6]?.bottleThree)
            formik.setFieldValue("bottleThreeEmission", allData[6]?.emission)

            formik.setFieldValue("hdpeBanner", allData[7]?.hdpeBanner)
            formik.setFieldValue("hdpeBannerEmission", allData[7]?.emission)
            formik.setFieldValue("pvcBanners", allData[8]?.pvcBanners)
            formik.setFieldValue("pvcBannersEmission", allData[8]?.emission)
            formik.setFieldValue("badgeHolders", allData[9]?.badgeHolders)
            formik.setFieldValue("badgeHoldersEmission", allData[9]?.emission)
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
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='petrolCarPassangers' value={formik?.values?.petrolCarPassangers} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='petrolCarEmission' value={formik?.values?.petrolCarEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Diesel Car</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='dieselCarkms' value={formik?.values?.dieselCarkms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='dieselCarPassanger' value={formik?.values?.dieselCarPassanger} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='dieselCarEmission' value={formik?.values?.dieselCarEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>SUV Diesel</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvDieselkms' value={formik?.values?.suvDieselkms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvDieselPassanger' value={formik?.values?.suvDieselPassanger} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvDieselEmission' value={formik?.values?.suvDieselEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>SUV Petrol</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvPetrolkmd' value={formik?.values?.suvPetrolkmd} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvPetrolPassanger' value={formik?.values?.suvPetrolPassanger} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='suvPetrolEmission' value={formik?.values?.suvPetrolEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Camper Petrol</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='camperPetrolkms' value={formik?.values?.camperPetrolkms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='camperPetrolPassanger' value={formik?.values?.camperPetrolPassanger} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='camperPetrolEmission' value={formik?.values?.camperPetrolEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Caper Diesel</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='caperDieselkms' value={formik?.values?.caperDieselkms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='caperDieselPassanger' value={formik?.values?.caperDieselPassanger} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='caperDieselEmission' value={formik?.values?.caperDieselEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                    </table>
                                </div>
                            </Box>
                        </Card>

                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Card className='p-4' style={{ padding: '20px', display: 'flex', justifyContent: 'center', height: '223px' }}>
                            <Box>
                                <div className='table-responsive'>
                                    <table className=''>
                                        <tr>
                                            <th />
                                            <th className='ps-2'>Model of Transport per vehicle</th>
                                            <th className='ps-2'>No of Kms</th>
                                            <th className='ps-2'>Emission (kg CO2e)</th>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Bus- Diesel</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='busDiesel' value={formik?.values?.busDiesel} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='busDieselkms' value={formik?.values?.busDieselkms} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='busDieselEmission' value={formik?.values?.busDieselEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                    </table>
                                </div>
                            </Box>
                        </Card>
                        <Card className='p-4' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                            <Box>
                                <div className='table-responsive'>
                                    <table className=''>
                                        <tr>
                                            <th className='ps-2'>Model of Transport per vehicle</th>
                                            <th className='ps-3'>No of Kms</th>
                                            <th className='ps-2'>Emission (kg CO2e)</th>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Electric Car </td>
                                            <td className='ps-3 py-1'><TextField size='small' type="number" name='electricCar ' value={formik?.values?.electricCar} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='electricCarEmission' value={formik?.values?.electricCarEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Metro (Electric)</td>
                                            <td className='ps-3 py-1'><TextField size='small' type="number" name='metro' value={formik?.values?.metro} onChange={formik.handleChange} /></td>
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
                        <Typography>{`Total Waste Footprint = ${totalEmission}  tons of kgCO2e`}</Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default LocalTranspotation
