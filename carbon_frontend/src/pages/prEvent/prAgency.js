import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addPrAgencyData, deletePrAgencyData } from '../../redux/slice/totalPrAgencySlice';
import { addResultTableData, deleteResTabPrAgencyData } from '../../redux/slice/resultTableDataSlice';
import LocalTransportImg from '../../assets/pr agency.png';
import { IconDiv } from '../../components/IconDiv';

const PrAgency = (props) => {

    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalPrAgencyDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalPrAgencyDetails?.totalEmission);

    const initialValues = {
        meetingRoomArea: '',
        meetingDuration: '',
        meetingRoomEmission: '',

        noOfHours: '',
        projectorEmission: '',

        hdpeBanner: '',
        hdpeBannerEmission: '',
        pvcBanners: '',
        pvcBannersEmission: '',
        cottonBanner: '',
        cottonBannerEmission: '',

        paperBagsA4Size: '',
        paperBagsA4SizeEmission: '',
        paperBagsA5Size: '',
        paperBagsA5SizeEmission: '',
        juteBagsA4Size: '',
        juteBagsA4SizeEmission: '',
        cottonBagsA4Size: '',
        cottonBagsA4SizeEmission: '',

        colouredBrochurePage: '',
        colouredBrochurePageEmission: '',
        a4Size75Gsm: '',
        a4Size75GsmEmission: '',

        petrolKms: '',
        petrolEmission: '',
        dieselKms: '',
        dieselEmission: '',
        hybridKms: '',
        hybridEmission: '',
        electricKms: '',
        electricEmission: '',

        electricityKwh: '',
        electricityEmission: '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {

            const meetingRoomEmission = (values?.meetingRoomArea === 0 || values?.meetingDuration === 0) ? 0 : Number((0.00104 * values?.meetingRoomArea * values?.meetingDuration).toFixed(2));
            const projectorEmission = values?.noOfHours === 0 ? 0 : Number(Number(values?.noOfHours) * Number(0.215)).toFixed(2);
            const hdpeBannerEmission = Number(3.11 * Number(values?.hdpeBanner)).toFixed(2);
            const pvcBannersEmission = Number(7.83 * Number(values?.pvcBanners)).toFixed(2);
            const cottonBannerEmission = Number(14.5 * Number(values?.cottonBanner)).toFixed(2);
            const paperBagsA4SizeEmission = Number(0.3125 * Number(values?.paperBagsA4Size)).toFixed(2);
            const paperBagsA5SizeEmission = Number(0.125 * Number(values?.paperBagsA5Size)).toFixed(2);
            const juteBagsA4SizeEmission = Number(0.73 * Number(values?.juteBagsA4Size)).toFixed(2);
            const cottonBagsA4SizeEmission = Number(17 * Number(values?.cottonBagsA4Size)).toFixed(2);
            const colouredBrochurePageEmission = Number(1.56 * Number(values?.colouredBrochurePage)).toFixed(2);
            const a4Size75GsmEmission = Number(0.0047 * Number(values?.a4Size75Gsm)).toFixed(2);
            const petrolEmission = values?.petrolKms === 0 ? 0 : Number((0.171 * values?.petrolKms)).toFixed(2);
            const dieselEmission = values?.dieselKms === 0 ? 0 : Number((0.172 * values?.dieselKms)).toFixed(2);
            const hybridEmission = values?.hybridKms === 0 ? 0 : Number((0.068 * values?.hybridKms)).toFixed(2);
            const electricEmission = values?.electricKms === 0 ? 0 : Number(0.047 * values?.electricKms).toFixed(2);
            const electricityEmission = values?.electricityKwh === 0 ? 0 : Number(0.43 * values?.electricityKwh).toFixed(2);

            if (meetingRoomEmission > 0) formik.setFieldValue('meetingRoomEmission', meetingRoomEmission);
            if (projectorEmission > 0) formik.setFieldValue('projectorEmission', projectorEmission);
            if (hdpeBannerEmission > 0) formik.setFieldValue('hdpeBannerEmission', hdpeBannerEmission);
            if (pvcBannersEmission > 0) formik.setFieldValue('pvcBannersEmission', pvcBannersEmission);
            if (cottonBannerEmission > 0) formik.setFieldValue('cottonBannerEmission', cottonBannerEmission);
            if (paperBagsA4SizeEmission > 0) formik.setFieldValue('paperBagsA4SizeEmission', paperBagsA4SizeEmission);
            if (paperBagsA5SizeEmission > 0) formik.setFieldValue('paperBagsA5SizeEmission', paperBagsA5SizeEmission);
            if (juteBagsA4SizeEmission > 0) formik.setFieldValue('juteBagsA4SizeEmission', juteBagsA4SizeEmission);
            if (cottonBagsA4SizeEmission > 0) formik.setFieldValue('cottonBagsA4SizeEmission', cottonBagsA4SizeEmission);
            if (colouredBrochurePageEmission > 0) formik.setFieldValue('colouredBrochurePageEmission', colouredBrochurePageEmission);
            if (a4Size75GsmEmission > 0) formik.setFieldValue('a4Size75GsmEmission', a4Size75GsmEmission);
            if (petrolEmission > 0) formik.setFieldValue('petrolEmission', petrolEmission);
            if (dieselEmission > 0) formik.setFieldValue('dieselEmission', dieselEmission);
            if (hybridEmission > 0) formik.setFieldValue('hybridEmission', hybridEmission);
            if (electricEmission > 0) formik.setFieldValue('electricEmission', electricEmission);
            if (electricityEmission > 0) formik.setFieldValue('electricityEmission', electricityEmission);

            const data = [
                {
                    type: 'Energy Consumption',
                    meetingRoomArea: values?.meetingRoomArea,
                    meetingDuration: values?.meetingDuration,
                    emission: meetingRoomEmission > 0 ? meetingRoomEmission : '',
                },
                {
                    type: 'Projector',
                    noOfHours: values?.noOfHours,
                    emission: projectorEmission > 0 ? projectorEmission : '',
                },
                {
                    type: 'PolethyleneHDPEBanner',
                    hdpeBanner: values?.hdpeBanner,
                    emission: hdpeBannerEmission > 0 ? hdpeBannerEmission : ''
                },
                {
                    type: 'PVCBanners',
                    pvcBanners: values?.pvcBanners,
                    emission: pvcBannersEmission > 0 ? pvcBannersEmission : ''
                },
                {
                    type: 'CottonBanner',
                    cottonBanner: values?.cottonBanner,
                    emission: cottonBannerEmission > 0 ? cottonBannerEmission : ''
                },
                {
                    type: 'PaperBagsA4Size',
                    paperBagsA4Size: values?.paperBagsA4Size,
                    emission: paperBagsA4SizeEmission > 0 ? paperBagsA4SizeEmission : ''
                },
                {
                    type: 'PaperBagsA5Size',
                    paperBagsA5Size: values?.paperBagsA5Size,
                    emission: paperBagsA5SizeEmission > 0 ? paperBagsA5SizeEmission : ''
                },
                {
                    type: 'JuteBagsA4Size',
                    juteBagsA4Size: values?.juteBagsA4Size,
                    emission: juteBagsA4SizeEmission > 0 ? juteBagsA4SizeEmission : ''
                },
                {
                    type: 'CottonBagsA4Size',
                    cottonBagsA4Size: values?.cottonBagsA4Size,
                    emission: cottonBagsA4SizeEmission > 0 ? cottonBagsA4SizeEmission : ''
                },
                {
                    type: 'ColouredBrochurePage',
                    colouredBrochurePage: values?.colouredBrochurePage,
                    emission: colouredBrochurePageEmission > 0 ? colouredBrochurePageEmission : ''
                },
                {
                    type: 'A4Size75Gsm',
                    a4Size75Gsm: values?.a4Size75Gsm,
                    emission: a4Size75GsmEmission > 0 ? a4Size75GsmEmission : ''
                },
                {
                    type: 'Petrol',
                    petrolKms: values?.petrolKms,
                    emission: petrolEmission > 0 ? petrolEmission : ''
                },
                {
                    type: 'Diesel',
                    dieselKms: values?.dieselKms,
                    emission: dieselEmission > 0 ? dieselEmission : ''
                },
                {
                    type: 'Hybrid',
                    hybridKms: values?.hybridKms,
                    emission: hybridEmission > 0 ? hybridEmission : ''
                },
                {
                    type: 'Electirc',
                    electricKms: values?.electricKms,
                    emission: electricEmission > 0 ? electricEmission : ''
                },
                {
                    type: 'Electircy',
                    electricityKwh: values?.electricityKwh,
                    emission: electricityEmission > 0 ? electricityEmission : ''
                }
            ];

            console.log("------ data ", data);

            const tableData = [
                {
                    subType: "Meeting / Ball Room",
                    subTypeData: {
                        th: ["", "Meeting Room Area (SqFt)", "Meeting Duration (No of Hrs)", "Emissions"],
                        td: [
                            {
                                prType: "Energy Consumption",
                                meetingRoomArea: values?.meetingRoomArea,
                                meetingDuration: values?.meetingDuration,
                                emissions: meetingRoomEmission > 0 ? meetingRoomEmission : '',
                            },
                        ]
                    },
                    scope: 3
                },
                {
                    subType: "Projector",
                    subTypeData: {
                        th: ["", "No. of Hours", "Emissions"],
                        td: [
                            {
                                prType: "Projector",
                                kgs: values?.noOfHours,
                                emissions: projectorEmission > 0 ? projectorEmission : '',
                            },
                        ]
                    },
                    scope: 3
                },
                {
                    subType: "Branding",
                    subTypeData: {
                        th: ["", "Weight (Kgs)", "Emissions"],
                        td: [
                            {
                                prType: "Polethylene HDPE Banner/ Standee*",
                                kgs: values?.hdpeBanner,
                                emissions: hdpeBannerEmission > 0 ? hdpeBannerEmission : ''
                            },
                            {
                                prType: "PVC Banners/ Standee",
                                kgs: values?.pvcBanners,
                                emissions: pvcBannersEmission > 0 ? pvcBannersEmission : ''
                            },
                            {
                                prType: "Cotton Banner/ Standee",
                                kgs: values?.cottonBanner,
                                emissions: cottonBannerEmission > 0 ? cottonBannerEmission : ''
                            },
                            {
                                prType: "Giveway Paper bags (200 GSM)- A4 Size",
                                kgs: values?.paperBagsA4Size,
                                emissions: paperBagsA4SizeEmission > 0 ? paperBagsA4SizeEmission : ''
                            },
                            {
                                prType: "Giveway Paper bags (200 GSM)- A5 Size",
                                kgs: values?.paperBagsA5Size,
                                emissions: paperBagsA5SizeEmission > 0 ? paperBagsA5SizeEmission : ''
                            },
                            {
                                prType: "Giveway Jute bags*- A4 Size",
                                kgs: values?.juteBagsA4Size,
                                emissions: juteBagsA4SizeEmission > 0 ? juteBagsA4SizeEmission : ''
                            },
                            {
                                prType: "Giveway Cotton bags- A4 Size",
                                kgs: values?.cottonBagsA4Size,
                                emissions: cottonBagsA4SizeEmission > 0 ? cottonBagsA4SizeEmission : ''
                            }
                        ]
                    },
                    scope: 3
                },
                {
                    subType: "PR Assets",
                    subTypeData: {
                        th: ["", "No. of Pages", "Emissions"],
                        td: [
                            {
                                prType: "Printing a Coloured Brochure/ Page (<130 GSM)",
                                noOfPages: values?.colouredBrochurePage,
                                emissions: colouredBrochurePageEmission > 0 ? colouredBrochurePageEmission : ''
                            },
                            {
                                prType: "A4 Size (75GSM)",
                                noOfPages: values?.a4Size75Gsm,
                                emissions: a4Size75GsmEmission > 0 ? a4Size75GsmEmission : ''
                            },
                        ]
                    },
                    scope: 3
                },
                {
                    subType: "Transportation",
                    subTypeData: {
                        th: ["Model of Transport", "No of Kms", "Emissions"],
                        td: [
                            {
                                prType: "Petrol",
                                noOfKms: values?.petrolKms,
                                emissions: petrolEmission > 0 ? petrolEmission : ''
                            },
                            {
                                prType: "Diesel",
                                noOfKms: values?.dieselKms,
                                emissions: dieselEmission > 0 ? dieselEmission : ''
                            },
                            {
                                prType: "Hybrid",
                                noOfKms: values?.hybridKms,
                                emissions: hybridEmission > 0 ? hybridEmission : ''
                            },
                            {
                                prType: "Electric",
                                noOfKms: values?.electricKms,
                                emissions: electricEmission > 0 ? electricEmission : ''
                            },
                        ]
                    },
                    scope: 3
                },
                {
                    subType: "Energy",
                    subTypeData: {
                        th: ["", "kwh", "Emissions"],
                        td: [
                            {
                                prType: "Electricity",
                                kwh: values?.electricityKwh,
                                emissions: electricityEmission > 0 ? electricityEmission : ''
                            },
                        ]
                    },
                    scope: 3
                },
            ];

            dispatch(addPrAgencyData({ data }));
            dispatch(addResultTableData({ data: tableData, tabTitle: "PR Agency" }));
        },
    });

    const handeleDelete = () => {
        dispatch(deletePrAgencyData());
        dispatch(deleteResTabPrAgencyData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("meetingRoomArea", allData[0]?.meetingRoomArea);
            formik.setFieldValue("meetingDuration", allData[0]?.meetingDuration);
            formik.setFieldValue("meetingRoomEmission", allData[0]?.emission);

            formik.setFieldValue("noOfHours", allData[1]?.noOfHours);
            formik.setFieldValue("projectorEmission", allData[1]?.emission);

            formik.setFieldValue("hdpeBanner", allData[2]?.hdpeBanner);
            formik.setFieldValue("hdpeBannerEmission", allData[2]?.emission);
            formik.setFieldValue("pvcBanners", allData[3]?.pvcBanners);
            formik.setFieldValue("pvcBannersEmission", allData[3]?.emission);
            formik.setFieldValue("cottonBanner", allData[4]?.cottonBanner);
            formik.setFieldValue("cottonBannerEmission", allData[4]?.emission);
            formik.setFieldValue("paperBagsA4Size", allData[5]?.paperBagsA4Size);
            formik.setFieldValue("paperBagsA4SizeEmission", allData[5]?.emission);
            formik.setFieldValue("paperBagsA5Size", allData[6]?.paperBagsA5Size);
            formik.setFieldValue("paperBagsA5SizeEmission", allData[6]?.emission);
            formik.setFieldValue("juteBagsA4Size", allData[7]?.juteBagsA4Size);
            formik.setFieldValue("juteBagsA4SizeEmission", allData[7]?.emission);
            formik.setFieldValue("cottonBagsA4Size", allData[8]?.cottonBagsA4Size);
            formik.setFieldValue("cottonBagsA4SizeEmission", allData[8]?.emission);
            formik.setFieldValue("colouredBrochurePage", allData[9]?.colouredBrochurePage);
            formik.setFieldValue("colouredBrochurePageEmission", allData[9]?.emission);
            formik.setFieldValue("a4Size75Gsm", allData[10]?.a4Size75Gsm);
            formik.setFieldValue("a4Size75GsmEmission", allData[10]?.emission);
            formik.setFieldValue("petrolKms", allData[11]?.petrolKms);
            formik.setFieldValue("petrolEmission", allData[11]?.emission);
            formik.setFieldValue("dieselKms", allData[12]?.dieselKms);
            formik.setFieldValue("dieselEmission", allData[12]?.emission);
            formik.setFieldValue("hybridKms", allData[13]?.hybridKms);
            formik.setFieldValue("hybridEmission", allData[13]?.emission);
            formik.setFieldValue("electricKms", allData[14]?.electricKms);
            formik.setFieldValue("electricEmission", allData[14]?.emission);
            formik.setFieldValue("electricityKwh", allData[15]?.electricityKwh);
            formik.setFieldValue("electricityEmission", allData[15]?.emission);
        }
    }, [value]);

    const { values } = formik;

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg textborder' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    {/* <Box mx={useMediaQuery(theme.breakpoints.up('lg')) } display={'flex'} alignItems={'center'} flexDirection={'column'}> */}
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg'))} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img src={LocalTransportImg} alt="Local Transportation" width={100} className='tabImgWhite' />
                        </IconDiv>
                        <Grid
                            // container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Meeting / Ball Room</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' />
                                                <th className='ps-2'>Meeting Room Area (Sqft)</th>
                                                <th className='ps-2'>Meeting Duration (No of Hrs)</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2'>Energy Consumption</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number"
                                                        name="meetingRoomArea"
                                                        fullWidth
                                                        value={formik.values.meetingRoomArea}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('meetingRoomArea', e.target.value);
                                                            formik.setFieldValue('meetingRoomEmission', (e.target.value === 0 || values?.meetingDuration === 0) ? 0 : Number((0.00104 * e.target.value * values?.meetingDuration).toFixed(2)));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name="meetingDuration"
                                                        label=""
                                                        fullWidth
                                                        value={formik.values.meetingDuration}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('meetingDuration', e.target.value);
                                                            formik.setFieldValue('meetingRoomEmission', (e.target.value === 0 || values?.meetingRoomArea === 0) ? 0 : Number((0.00104 * e.target.value * values?.meetingRoomArea).toFixed(2)));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name='meetingRoomEmission' value={values?.meetingRoomEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Projector</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' />
                                                <th className='ps-2'>No of Hours</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2'>Projector</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number"
                                                        name="noOfHours"
                                                        fullWidth
                                                        value={formik.values.noOfHours}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('noOfHours', e.target.value);
                                                            formik.setFieldValue('projectorEmission', (e.target.value === 0 || values?.noOfHours === 0) ? 0 : Number((0.215 * e.target.value).toFixed(2)));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name='projectorEmission' value={values?.projectorEmission} onChange={formik.handleChange} />
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Branding</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' />
                                                <th className='ps-3'>Weight (kgs)</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2'>Polethylene HDPE Banner/ Standee*</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="hdpeBanner"
                                                        value={formik?.values?.hdpeBanner}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('hdpeBanner', e.target.value);
                                                            formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(e.target.value)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size="small" type="number" disabled name="hdpeBannerEmission" value={formik?.values?.hdpeBannerEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>PVC Banners / Standee</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="pvcBanners"
                                                        value={formik?.values?.pvcBanners}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('pvcBanners', e.target.value);
                                                            formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(e.target.value)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='pvcBannersEmission' disabled value={values?.pvcBannersEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Cotton Banner/ Standee</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="cottonBanner"
                                                        value={formik?.values?.cottonBanner}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('cottonBanner', e.target.value);
                                                            formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(e.target.value)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='cottonBannerEmission' disabled value={values?.cottonBannerEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Giveway Paper bags (200 GSM)- A4 Size</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="paperBagsA4Size"
                                                        value={formik?.values?.paperBagsA4Size}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('paperBagsA4Size', e.target.value);
                                                            formik.setFieldValue('paperBagsA4SizeEmission', Number(0.3125 * Number(e.target.value)).toFixed(2));

                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='paperBagsA4SizeEmission' disabled value={values?.paperBagsA4SizeEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Giveway Paper bags (200 GSM)- A5 Size</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="paperBagsA5Size"
                                                        value={formik?.values?.paperBagsA5Size}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('paperBagsA5Size', e.target.value);
                                                            formik.setFieldValue('paperBagsA5SizeEmission', Number(0.125 * Number(e.target.value)).toFixed(2));

                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='paperBagsA5SizeEmission' disabled value={values?.paperBagsA5SizeEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Giveway Jute bags*- A4 Size</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="juteBagsA4Size"
                                                        value={formik?.values?.juteBagsA4Size}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('juteBagsA4Size', e.target.value);
                                                            formik.setFieldValue('juteBagsA4SizeEmission', Number(0.73 * Number(e.target.value)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='juteBagsA4SizeEmission' disabled value={values?.juteBagsA4SizeEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Giveway Cotton bags- A4 Size</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="cottonBagsA4Size"
                                                        value={formik?.values?.cottonBagsA4Size}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('cottonBagsA4Size', e.target.value);
                                                            formik.setFieldValue('cottonBagsA4SizeEmission', Number(17 * Number(e.target.value)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='cottonBagsA4SizeEmission' disabled value={values?.cottonBagsA4SizeEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>PR Assets</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' />
                                                <th className='ps-3'>No. of Pages</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Printing a Coloured Brochure/ Page (&lt;130 GSM)</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="colouredBrochurePage"
                                                        value={formik?.values?.colouredBrochurePage}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('colouredBrochurePage', e.target.value);
                                                            formik.setFieldValue('colouredBrochurePageEmission', Number(1.56 * Number(e.target.value)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='colouredBrochurePageEmission' disabled value={values?.colouredBrochurePageEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>A4 Size (75GSM)</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='a4Size75Gsm' value={values?.a4Size75Gsm}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("a4Size75Gsm", Number(e.target.value));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='a4Size75GsmEmission' disabled value={values?.a4Size75GsmEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Transportation</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Model of Transport</th>
                                                <th className='ps-3'>No of Kms</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Petrol</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='petrolKms' value={values?.petrolKms}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("petrolKms", e.target.value);
                                                            formik.setFieldValue("petrolEmission", Number(Number(e.target.value) * 0.171).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='petrolEmission' disabled value={values?.petrolEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Diesel</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='dieselKms' value={values?.dieselKms}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("dieselKms", e.target.value);
                                                            formik.setFieldValue("dieselEmission", Number(Number(e.target.value) * 0.172).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='dieselEmission' disabled value={values?.dieselEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Hybrid</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='hybridKms' value={values?.hybridKms}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("hybridKms", e.target.value);
                                                            formik.setFieldValue("hybridEmission", Number(Number(e.target.value) * 0.068).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='hybridEmission' disabled value={values?.hybridEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Electric</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='electricKms' value={values?.electricKms}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("electricKms", e.target.value);
                                                            formik.setFieldValue("electricEmission", Number(Number(e.target.value) * 0.047).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='electricEmission' disabled value={values?.electricEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive my-4'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center'>Energy</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' />
                                                <th className='ps-2'>kwh</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Electricity</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='electricityKwh' value={values?.electricityKwh}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("electricityKwh", e.target.value);
                                                            formik.setFieldValue("electricityEmission", Number(Number(e.target.value) * 0.43).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='electricityEmission' disabled value={values?.electricityEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack direction={"row"} spacing={2}>
                                    {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                                    <Button variant='contained' startIcon={<FaAngleDoubleLeft />} onClick={() => { formik.handleSubmit(); setValue(value - 1); }} className='custom-btn'>Save and Previous Page</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'> Save and Next Page</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginY={2}>
                                <Typography color='white'>{`Total PR Agency Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default PrAgency;
