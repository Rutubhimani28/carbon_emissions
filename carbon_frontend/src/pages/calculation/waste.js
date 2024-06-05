import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addWasteData, deleteWasteData } from '../../redux/slice/totalWasteSlice';

const Waste = (props) => {
    const { setValue, value } = props;
    const dispatch = useDispatch()
    const allData = useSelector((state) => state?.totalWasteDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalWasteDetails?.totalEmission);

    // -----------   initialValues
    const initialValues = {
        foodKg: 0,
        mixedRecyclablesKg: 0,
        municipalSolidWasteKg: 0,
        foodEmission: 0,
        mixedRecyclablesEmission: 0,
        municipalSolidWasteEmission: 0,
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
            formik.setFieldValue('mixedRecyclablesEmission', (0.09 * values?.mixedRecyclablesKg).toFixed(2));
            formik.setFieldValue('municipalSolidWasteEmission', (0.52 * values?.municipalSolidWasteKg).toFixed(2));
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
                    mixedRecyclablesKg: values?.mixedRecyclablesKg,
                    emission: parseFloat((0.09 * values?.mixedRecyclablesKg).toFixed(2)) || 0
                },
                {
                    type: 'municipalSolidWaste',
                    municipalSolidWasteKg: values?.municipalSolidWasteKg,
                    emission: parseFloat((0.52 * values?.municipalSolidWasteKg).toFixed(2)) || 0
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
            formik.setFieldValue("mixedRecyclablesKg", allData[1]?.mixedRecyclablesKg)
            formik.setFieldValue("mixedRecyclablesEmission", allData[1]?.emission)
            formik.setFieldValue("municipalSolidWasteKg", allData[2]?.municipalSolidWasteKg)
            formik.setFieldValue("municipalSolidWasteEmission", allData[2]?.emission)

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
    }, [value])

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
                                <Typography variant='h6' className='text-center'>Food Waste</Typography>
                                <div className='table-responsive'>
                                    <table className=''>
                                        <tr>
                                            <th className='ps-2'>Waste</th>
                                            <th className='ps-2'>Kgs</th>
                                            <th className='ps-2'>Emission (kg CO2e)</th>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Food</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='foodKg' value={formik?.values?.foodKg} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='foodEmission' value={formik?.values?.foodEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Mixed Recyclables</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='mixedRecyclablesKg' value={formik?.values?.mixedRecyclablesKg} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='mixedRecyclablesEmission' value={formik?.values?.mixedRecyclablesEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Municipal Solid Waste</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='municipalSolidWasteKg' value={formik?.values?.municipalSolidWasteKg} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='municipalSolidWasteEmission' value={formik?.values?.municipalSolidWasteEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                    </table>
                                </div>
                            </Box>
                        </Card>

                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Card className='p-4' style={{ padding: '20px', display: 'flex', justifyContent: 'center', height: '223px' }}>
                            <Box>
                                <Typography variant='h6' className='text-center'>Water Waste</Typography>
                                <div className='table-responsive'>
                                    <table className=''>
                                        <tr>
                                            <th />
                                            <th className='ps-2'>Litres/ area m3*</th>
                                            <th className='ps-2'>Emission (kg CO2e)</th>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>Water</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='water' value={formik?.values?.water} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='waterEmission' value={formik?.values?.waterEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                    </table>
                                </div>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Card className='p-4' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                            <Box>
                                <Typography variant='h6' className="text-center">Plastic Waste</Typography>
                                <div className='table-responsive'>
                                    <table className=''>
                                        <tr>
                                            <th className='ps-2'>Plastic Water bottle</th>
                                            <th className='ps-3'>No. of PET bottles</th>
                                            <th className='ps-2'>Emission (kg CO2e)</th>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>250ml PET bottle</td>
                                            <td className='ps-3 py-1'><TextField size='small' type="number" name='bottleOne' value={formik?.values?.bottleOne} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='bottleOneEmission' value={formik?.values?.bottleOneEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>500ml PET bottle</td>
                                            <td className='ps-3 py-1'><TextField size='small' type="number" name='bottleTwo' value={formik?.values?.bottleTwo} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='bottleTwoEmission' value={formik?.values?.bottleTwoEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>1000ml PET bottle</td>
                                            <td className='ps-3 py-1'><TextField size='small' type="number" name='bottleThree' value={formik?.values?.bottleThree} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='bottleThreeEmission' value={formik?.values?.bottleThreeEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                    </table>
                                </div>

                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Card className='p-4' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                            <Box>
                                <Typography variant='h6' className='text-center'>Branding Waste</Typography>
                                <div className='table-responsive'>
                                    <table className=''>
                                        <tr>
                                            <th className='ps-2'>Branding</th>
                                            <th className='ps-2'>Kg</th>
                                            <th className='ps-2'>Emission (kg CO2e)</th>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>PVC HDPE Banner</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='hdpeBanner' value={formik?.values?.hdpeBanner} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='hdpeBannerEmission' value={formik?.values?.hdpeBannerEmission} onChange={formik.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>PVC Banners</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='pvcBanners' value={formik?.values?.pvcBanners} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='pvcBannersEmission' value={formik?.values?.pvcBannersEmission} onChange={formik.handleChange} disabled /></td>
                                        </tr>
                                        <tr>
                                            <td className='ps-2 py-1'>badge holders</td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='badgeHolders' value={formik?.values?.badgeHolders} onChange={formik.handleChange} /></td>
                                            <td className='ps-2 py-1'><TextField size='small' type="number" name='badgeHoldersEmission' value={formik?.values?.badgeHoldersEmission} onChange={formik.handleChange} disabled /></td>
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
                            <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
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

export default Waste
