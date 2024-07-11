import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addWasteData, deleteWasteData } from '../../redux/slice/totalWasteSlice';
import { addResultTableData, deleteResTabWasteData } from '../../redux/slice/resultTableDataSlice';
import { IconDiv } from '../../components/IconDiv';
import WasteImg from '../../assets/Waste.png';

const Waste = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalWasteDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalWasteDetails?.totalEmission);
    const scope = useSelector((state) => state?.totalWasteDetails?.scope);

    // -----------   initialValues
    const initialValues = {
        foodWasteNonMeatKg: '',
        foodWasteMeatKg: '',
        municipalSolidWasteKg: '',
        foodWasteNonMeatEmission: '',
        foodWasteMeatEmission: '',
        municipalSolidWasteEmission: '',

        bottleOne: '',
        bottleTwo: '',
        bottleThree: '',
        bottleOneEmission: '',
        bottleTwoEmission: '',
        bottleThreeEmission: '',
        plasticWrapping: '',
        plasticWrappingEmission: '',

        // hdpeBanner: 0,
        // pvcBanners: 0,
        // cottonBanner: 0,
        // plasticBadgeHolders: 0,
        // hdpeBannerEmission: 0,
        // pvcBannersEmission: 0,
        // cottonBannerEmission: 0,
        // plasticBadgeHoldersEmission: 0,

        // colouredBrochurePage: 0,
        // paperBagsA4Size: 0,
        // paperBagsA5Size: 0,
        // juteBagsA4Size: 0,
        // cottonBagsA4Size: 0,
        // colouredBrochurePageEmission: 0,
        // paperBagsA4SizeEmission: 0,
        // paperBagsA5SizeEmission: 0,
        // juteBagsA4SizeEmission: 0,
        // cottonBagsA4SizeEmission: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const foodWasteNonMeatEmission = Number(0.67 * Number(values?.foodWasteNonMeatKg)).toFixed(2)
            const foodWasteMeatEmission = Number(0.69 * Number(values?.foodWasteMeatKg)).toFixed(2)
            const municipalSolidWasteEmission = Number(0.902 * Number(values?.municipalSolidWasteKg)).toFixed(2)
            const bottleOneEmission = Number(Number(values?.bottleOne) * 6.42 * 0.004032).toFixed(2)
            const bottleTwoEmission = Number(Number(values?.bottleTwo) * 13 * 0.004032).toFixed(2)
            const bottleThreeEmission = Number(Number(values?.bottleThree) * 21.5 * 0.004032).toFixed(2)
            const plasticWrappingEmission = Number(Number(values?.plasticWrapping) * 1 * 7.83).toFixed(2)

            if (foodWasteNonMeatEmission > 0) formik.setFieldValue('foodWasteNonMeatEmission', foodWasteNonMeatEmission);
            if (foodWasteMeatEmission > 0) formik.setFieldValue('foodWasteMeatEmission', foodWasteMeatEmission);
            if (municipalSolidWasteEmission > 0) formik.setFieldValue('municipalSolidWasteEmission', municipalSolidWasteEmission);
            if (bottleOneEmission > 0) formik.setFieldValue('bottleOneEmission', bottleOneEmission);
            if (bottleTwoEmission > 0) formik.setFieldValue('bottleTwoEmission', bottleTwoEmission);
            if (bottleThreeEmission > 0) formik.setFieldValue('bottleThreeEmission', bottleThreeEmission);
            if (plasticWrappingEmission > 0) formik.setFieldValue('plasticWrappingEmission', plasticWrappingEmission);
            // formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(values?.hdpeBanner)).toFixed(2));
            // formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(values?.pvcBanners)).toFixed(2));
            // formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(values?.cottonBanner)).toFixed(2));
            // formik.setFieldValue('colouredBrochurePageEmission', Number(1.56 * Number(values?.colouredBrochurePage)).toFixed(2));
            // formik.setFieldValue('paperBagsA4SizeEmission', Number(0.3125 * Number(values?.paperBagsA4Size)).toFixed(2));
            // formik.setFieldValue('paperBagsA5SizeEmission', Number(0.125 * Number(values?.paperBagsA5Size)).toFixed(2));
            // formik.setFieldValue('juteBagsA4SizeEmission', Number(0.73 * Number(values?.juteBagsA4Size)).toFixed(2));
            // formik.setFieldValue('cottonBagsA4SizeEmission', Number(17 * Number(values?.cottonBagsA4Size)).toFixed(2));

            const data = [
                {
                    type: 'FoodWasteNonMeat',
                    foodWasteNonMeatKg: values?.foodWasteNonMeatKg,
                    emission: foodWasteNonMeatEmission > 0 ? foodWasteNonMeatEmission : '',
                },
                {
                    type: 'FoodWasteMeat',
                    foodWasteMeatKg: values?.foodWasteMeatKg,
                    emission: foodWasteMeatEmission > 0 ? foodWasteMeatEmission : '',
                },
                {
                    type: 'MunicipalSolidWaste',
                    municipalSolidWasteKg: values?.municipalSolidWasteKg,
                    emission: municipalSolidWasteEmission > 0 ? municipalSolidWasteEmission : '',
                },
                {
                    type: '250ml',
                    bottleOne: values?.bottleOne,
                    emission: bottleOneEmission > 0 ? bottleOneEmission : '',
                },
                {
                    type: '500ml',
                    bottleTwo: values?.bottleTwo,
                    emission: bottleTwoEmission > 0 ? bottleTwoEmission : '',
                },
                {
                    type: '1000ml',
                    bottleThree: values?.bottleThree,
                    emission: bottleThreeEmission > 0 ? bottleThreeEmission : '',
                },
                {
                    type: 'PlasticWrapping',
                    plasticWrapping: values?.plasticWrapping,
                    emission: plasticWrappingEmission > 0 ? plasticWrappingEmission : '',
                },
                // {
                //     type: 'PolethyleneHDPEBanner',
                //     hdpeBanner: values?.hdpeBanner,
                //     emission: Number((3.11 * values?.hdpeBanner).toFixed(2)) || 0,
                // },
                // {
                //     type: 'PVCBanners',
                //     pvcBanners: values?.pvcBanners,
                //     emission: Number((7.83 * values?.pvcBanners).toFixed(2)) || 0,
                // },
                // {
                //     type: 'CottonBanner',
                //     cottonBanner: values?.cottonBanner,
                //     emission: Number((14.5 * values?.cottonBanner).toFixed(2)) || 0,
                // },
                // {
                //     type: 'PlasticBadgeHolders',
                //     plasticBadgeHolders: values?.plasticBadgeHolders,
                //     emission: Number((4.2 * values?.plasticBadgeHolders).toFixed(2)) || 0,
                // },
                // {
                //     type: 'ColouredBrochurePage',
                //     colouredBrochurePage: values?.colouredBrochurePage,
                //     emission: Number((1.56 * values?.colouredBrochurePage).toFixed(2)) || 0,
                // },
                // {
                //     type: 'PaperBagsA4Size',
                //     paperBagsA4Size: values?.paperBagsA4Size,
                //     emission: Number((0.3125 * values?.paperBagsA4Size).toFixed(2)) || 0,
                // },
                // {
                //     type: 'PaperBagsA5Size',
                //     paperBagsA5Size: values?.paperBagsA5Size,
                //     emission: Number((0.125 * values?.paperBagsA5Size).toFixed(2)) || 0,
                // },
                // {
                //     type: 'JuteBagsA4Size',
                //     juteBagsA4Size: values?.juteBagsA4Size,
                //     emission: Number((0.73 * values?.juteBagsA4Size).toFixed(2)) || 0,
                // },
                // {
                //     type: 'CottonBagsA4Size',
                //     cottonBagsA4Size: values?.cottonBagsA4Size,
                //     emission: Number((17 * values?.cottonBagsA4Size).toFixed(2)) || 0,
                // },
            ];
            dispatch(addWasteData({ data }));


            const tableData = [
                {
                    subType: "Food Waste",
                    subTypeData: {
                        th: ["", "Weight (Kgs)", "Emissions"],
                        td: [
                            {
                                wsType: "Food Waste (non-meat)",
                                kgs: values?.foodWasteNonMeatKg,
                                emissions: foodWasteNonMeatEmission > 0 ? foodWasteNonMeatEmission : ''
                            },
                            {
                                wsType: "Food Waste (meat)",
                                kgs: values?.foodWasteMeatKg,
                                emissions: foodWasteMeatEmission > 0 ? foodWasteMeatEmission : ''
                            },
                            {
                                wsType: "Municipal Solid Waste",
                                kgs: values?.municipalSolidWasteKg,
                                emissions: municipalSolidWasteEmission > 0 ? municipalSolidWasteEmission : ''
                            },
                        ]
                    },
                    scope: 3
                },
                {
                    subType: "Plastic Waste",
                    subTypeData: {
                        th: ["", "Total Area (m2)", "Emissions"],
                        td: [
                            {
                                wsType: "250ml",
                                bottle: values?.bottleOne,
                                emissions: bottleOneEmission > 0 ? bottleOneEmission : ''
                            },
                            {
                                wsType: "500ml",
                                bottle: values?.bottleTwo,
                                emissions: bottleTwoEmission > 0 ? bottleTwoEmission : ''
                            },
                            {
                                wsType: "1000ml",
                                bottle: values?.bottleThreeEmission,
                                emissions: bottleThreeEmission > 0 ? bottleThreeEmission : ''
                            },
                            {
                                wsType: "Plastic Wrapping",
                                bottle: values?.plasticWrapping,
                                emissions: plasticWrappingEmission > 0 ? plasticWrappingEmission : ''
                            },
                        ]
                    },
                    scope: 3
                },
            ];

            dispatch(addResultTableData({ data: tableData, tabTitle: "Waste" }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteWasteData());
        dispatch(deleteResTabWasteData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue('foodWasteNonMeatKg', allData[0]?.foodWasteNonMeatKg);
            formik.setFieldValue('foodWasteNonMeatEmission', allData[0]?.emission);
            formik.setFieldValue('foodWasteMeatKg', allData[1]?.foodWasteMeatKg);
            formik.setFieldValue('foodWasteMeatEmission', allData[1]?.emission);
            formik.setFieldValue('municipalSolidWasteKg', allData[2]?.municipalSolidWasteKg);
            formik.setFieldValue('municipalSolidWasteEmission', allData[2]?.emission);

            formik.setFieldValue('bottleOne', allData[3]?.bottleOne);
            formik.setFieldValue('bottleOneEmission', allData[3]?.emission);
            formik.setFieldValue('bottleTwo', allData[4]?.bottleTwo);
            formik.setFieldValue('bottleTwoEmission', allData[4]?.emission);
            formik.setFieldValue('bottleThree', allData[5]?.bottleThree);
            formik.setFieldValue('bottleThreeEmission', allData[5]?.emission);
            formik.setFieldValue('plasticWrapping', allData[6]?.plasticWrapping);
            formik.setFieldValue('plasticWrappingEmission', allData[6]?.emission);

            formik.setFieldValue('hdpeBanner', allData[7]?.hdpeBanner);
            formik.setFieldValue('hdpeBannerEmission', allData[7]?.emission);
            formik.setFieldValue('pvcBanners', allData[8]?.pvcBanners);
            formik.setFieldValue('pvcBannersEmission', allData[8]?.emission);
            formik.setFieldValue('cottonBanner', allData[9]?.cottonBanner);
            formik.setFieldValue('cottonBannerEmission', allData[9]?.emission);
            formik.setFieldValue('plasticBadgeHolders', allData[10]?.plasticBadgeHolders);
            formik.setFieldValue('plasticBadgeHoldersEmission', allData[10]?.emission);

            formik.setFieldValue('colouredBrochurePage', allData[11]?.colouredBrochurePage);
            formik.setFieldValue('colouredBrochurePageEmission', allData[11]?.emission);
            formik.setFieldValue('paperBagsA4Size', allData[12]?.paperBagsA4Size);
            formik.setFieldValue('paperBagsA4SizeEmission', allData[12]?.emission);
            formik.setFieldValue('paperBagsA5Size', allData[13]?.paperBagsA5Size);
            formik.setFieldValue('paperBagsA5SizeEmission', allData[13]?.emission);
            formik.setFieldValue('juteBagsA4Size', allData[14]?.juteBagsA4Size);
            formik.setFieldValue('juteBagsA4SizeEmission', allData[14]?.emission);
            formik.setFieldValue('cottonBagsA4Size', allData[15]?.cottonBagsA4Size);
            formik.setFieldValue('cottonBagsA4SizeEmission', allData[15]?.emission);
        }
    }, [value]);

    return (
        <div>
            <Container maxWidth>
                <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
                    {/* <Typography variant='h4' className='text-center text-white mb-4'>{`Scope.${scope} Emissions`}</Typography> */}
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>

                        <Box
                            mx={useMediaQuery(theme.breakpoints.up('lg')) && 15}
                            display={'flex'}
                            alignItems={'center'}
                            flexDirection={'column'}
                        >
                            <IconDiv>
                                <img src={WasteImg} alt="Waste" width={100} className='tabImgWhite' />
                            </IconDiv>
                            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 5 }}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box>
                                        <Typography variant="h4" className="text-center text-white mb-4">
                                            Food Waste
                                        </Typography>
                                        <div className="table-responsive">
                                            <table className="table-custom-inpt-field">
                                                <tr>
                                                    <th className="ps-2" />
                                                    <th className="ps-2">In Kgs</th>
                                                    <th className="ps-2">Emissions</th>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Food Waste (non-meat)</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="foodWasteNonMeatKg"
                                                            value={formik?.values?.foodWasteNonMeatKg}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                formik.setFieldValue('foodWasteNonMeatEmission', Number(0.67 * Number(e?.target?.value)).toFixed(2));
                                                                formik.handleSubmit();
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            disabled
                                                            name="foodWasteNonMeatEmission"
                                                            value={formik?.values?.foodWasteNonMeatEmission}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Food Waste (meat)</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="foodWasteMeatKg"
                                                            value={formik?.values?.foodWasteMeatKg}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                // formik.setFieldValue('foodWasteMeatEmission', Number(0.69 * Number(values?.foodWasteMeatKg)).toFixed(2));
                                                                formik.setFieldValue('foodWasteMeatEmission', Number(0.69 * Number(e.target.value)).toFixed(2));
                                                                formik.handleSubmit();
                                                            }} inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="foodWasteMeatEmission"
                                                            value={formik?.values?.foodWasteMeatEmission}
                                                            onChange={formik.handleChange}
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Municipal Solid Waste</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="municipalSolidWasteKg"
                                                            value={formik?.values?.municipalSolidWasteKg}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                // formik.setFieldValue('municipalSolidWasteEmission', Number(0.902 * Number(values?.municipalSolidWasteKg)).toFixed(2));
                                                                formik.setFieldValue('municipalSolidWasteEmission', Number(0.902 * Number(e.target.value)).toFixed(2));
                                                                formik.handleSubmit();
                                                            }} inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="municipalSolidWasteEmission"
                                                            value={formik?.values?.municipalSolidWasteEmission}
                                                            onChange={formik.handleChange}
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box>
                                        <Typography variant="h4" className="text-center text-white mb-4">
                                            Plastic Waste
                                        </Typography>
                                        <div className="table-responsive">
                                            <table className="table-custom-inpt-field">
                                                <tr>
                                                    <th />
                                                    <th className="ps-3">No. of PET bottles</th>
                                                    <th className="ps-2">Emissions</th>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">250ml</td>
                                                    <td className="ps-3 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="bottleOne"
                                                            value={formik?.values?.bottleOne}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                // formik.setFieldValue('bottleOneEmission', Number(Number(values?.bottleOne) * 6.42 * 0.004032).toFixed(2));
                                                                formik.setFieldValue('bottleOneEmission', Number(Number(e.target.value) * 6.42 * 0.004032).toFixed(2));
                                                                formik.handleSubmit();
                                                            }} inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            disabled
                                                            name="bottleOneEmission"
                                                            value={formik?.values?.bottleOneEmission}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">500ml</td>
                                                    <td className="ps-3 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="bottleTwo"
                                                            value={formik?.values?.bottleTwo}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                // formik.setFieldValue('bottleTwoEmission', Number(Number(values?.bottleTwo) * 13 * 0.004032).toFixed(2));
                                                                formik.setFieldValue('bottleTwoEmission', Number(Number(e.target.value) * 13 * 0.004032).toFixed(2));
                                                                formik.handleSubmit();
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="bottleTwoEmission"
                                                            value={formik?.values?.bottleTwoEmission}
                                                            onChange={formik.handleChange}
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">1000ml</td>
                                                    <td className="ps-3 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="bottleThree"
                                                            value={formik?.values?.bottleThree}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                // formik.setFieldValue('bottleThreeEmission', Number(Number(values?.bottleThree) * 21.5 * 0.004032).toFixed(2));
                                                                formik.setFieldValue('bottleThreeEmission', Number(Number(e.target.value) * 21.5 * 0.004032).toFixed(2));
                                                                formik.handleSubmit();
                                                            }} inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="bottleThreeEmission"
                                                            value={formik?.values?.bottleThreeEmission}
                                                            onChange={formik.handleChange}
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Plastic Wrapping</td>
                                                    <td className="ps-3 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="plasticWrapping"
                                                            value={formik?.values?.plasticWrapping}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                // formik.setFieldValue('plasticWrappingEmission', Number(Number(values?.plasticWrapping) * 1 * 7.83).toFixed(2));
                                                                formik.setFieldValue('plasticWrappingEmission', Number(Number(e.target.value) * 1 * 7.83).toFixed(2));
                                                                formik.handleSubmit();
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="plasticWrappingEmission"
                                                            value={formik?.values?.plasticWrappingEmission}
                                                            onChange={formik.handleChange}
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Box>
                                </Grid>
                                {/* <Grid item xs={12} sm={6} md={6}>
                                    <Box>
                                        <Typography variant="h4" className="text-center text-white mb-4">
                                            Marketing
                                        </Typography>
                                        <div className="table-responsive">
                                            <table className="table-custom-inpt-field">
                                                <tr>
                                                    <th className="ps-2">Branding</th>
                                                    <th className="ps-2">In Kgs</th>
                                                    <th className="ps-2">Emissions</th>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Polethylene HDPE Banner</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="hdpeBanner"
                                                            value={formik?.values?.hdpeBanner}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('hdpeBanner', e.target.value);
                                                                // formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(values?.hdpeBanner)).toFixed(2));
                                                                formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(e.target.value)).toFixed(2));
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            disabled
                                                            name="hdpeBannerEmission"
                                                            value={formik?.values?.hdpeBannerEmission}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">PVC Banners</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="pvcBanners"
                                                            value={formik?.values?.pvcBanners}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('pvcBanners', e.target.value);
                                                                // formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(values?.pvcBanners)).toFixed(2));
                                                                formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(e.target.value)).toFixed(2));
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="pvcBannersEmission"
                                                            value={formik?.values?.pvcBannersEmission}
                                                            onChange={formik.handleChange}
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Cotton Banner</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="cottonBanner"
                                                            value={formik?.values?.cottonBanner}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('cottonBanner', e.target.value);
                                                                // formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(values?.cottonBanner)).toFixed(2));
                                                                formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(e.target.value)).toFixed(2));
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="cottonBannerEmission"
                                                            value={formik?.values?.cottonBannerEmission}
                                                            onChange={formik.handleChange}
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Plastic Badge Holders (Polycorbonate)</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="plasticBadgeHolders"
                                                            value={formik?.values?.plasticBadgeHolders}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('plasticBadgeHolders', e.target.value);
                                                                formik.setFieldValue('plasticBadgeHoldersEmission', Number(4.2 * Number(e.target.value)).toFixed(2));
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="plasticBadgeHoldersEmission"
                                                            value={formik?.values?.plasticBadgeHoldersEmission}
                                                            onChange={formik.handleChange}
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box>
                                        <Typography variant="h4" className="text-center text-white mb-4">
                                            Branding
                                        </Typography>
                                        <div className="table-responsive">
                                            <table className="table-custom-inpt-field">
                                                <tr>
                                                    <th>Brand Promotional</th>
                                                    <th className="ps-2">No. of Units</th>
                                                    <th className="ps-2">Emissions</th>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Printing a Coloured Brochure/ Page (&gt;130 GSM)</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="colouredBrochurePage"
                                                            value={formik?.values?.colouredBrochurePage}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('colouredBrochurePage', e.target.value);
                                                                formik.setFieldValue('colouredBrochurePageEmission', Number(1.56 * Number(e.target.value)).toFixed(2));
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            disabled
                                                            name="colouredBrochurePageEmission"
                                                            value={formik?.values?.colouredBrochurePageEmission}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Giveway Paper bags (200 GSM)- A4 Size</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="paperBagsA4Size"
                                                            value={formik?.values?.paperBagsA4Size}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('paperBagsA4Size', e.target.value);
                                                                formik.setFieldValue('paperBagsA4SizeEmission', Number(0.3125 * Number(e.target.value)).toFixed(2));
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            disabled
                                                            name="paperBagsA4SizeEmission"
                                                            value={formik?.values?.paperBagsA4SizeEmission}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Giveway Paper bags (200 GSM)- A5 Size</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="paperBagsA5Size"
                                                            value={formik?.values?.paperBagsA5Size}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('paperBagsA5Size', e.target.value);
                                                                formik.setFieldValue('paperBagsA5SizeEmission', Number(0.125 * Number(e.target.value)).toFixed(2));
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            disabled
                                                            name="paperBagsA5SizeEmission"
                                                            value={formik?.values?.paperBagsA5SizeEmission}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Giveway Jute bags*- A4 Size</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="juteBagsA4Size"
                                                            value={formik?.values?.juteBagsA4Size}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('juteBagsA4Size', e.target.value);
                                                                formik.setFieldValue('juteBagsA4SizeEmission', Number(0.73 * Number(e.target.value)).toFixed(2));
                                                            }}
                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            disabled
                                                            name="juteBagsA4SizeEmission"
                                                            value={formik?.values?.juteBagsA4SizeEmission}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-2 py-1">Giveway Cotton bags- A4 Size</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="cottonBagsA4Size"
                                                            value={formik?.values?.cottonBagsA4Size}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('cottonBagsA4Size', e.target.value);
                                                                formik.setFieldValue('cottonBagsA4SizeEmission', Number(17 * Number(e.target.value)).toFixed(2));
                                                            }}

                                                            inputProps={{ style: { color: 'white' } }}
                                                        />
                                                    </td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            disabled
                                                            name="cottonBagsA4SizeEmission"
                                                            value={formik?.values?.cottonBagsA4SizeEmission}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Box>
                                </Grid> */}
                                <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                    <Stack direction={'row'} spacing={2}>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                formik.handleSubmit();
                                                setValue(value - 1);
                                            }}
                                            startIcon={<FaAngleDoubleLeft />}
                                            className="custom-btn"
                                        >
                                            Save and Previous Page
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                formik.handleSubmit();
                                                setValue(value + 1);
                                            }}
                                            className="custom-btn"
                                            endIcon={<FaAngleDoubleRight />}
                                        >

                                            Save and Next Page
                                        </Button>
                                        {/* <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button> */}
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                formik.resetForm();
                                                handeleDelete();
                                            }}
                                            color="error"

                                        >
                                            Clear
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                    <Typography color="white">{`Total Waste Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card>
            </Container>
        </div>
    );
};

export default Waste;
