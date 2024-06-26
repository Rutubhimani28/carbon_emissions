import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addProductionData, deleteProductionData } from '../../redux/slice/totalProductionSlice';
import ProductionImg from '../../assets/production.png';
import { IconDiv } from '../../components/IconDiv';

const Production = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalProductionDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalProductionDetails?.totalEmission);

    const fieldDataOne = [
        { name: 'Sawn Timber', ef: 0.263, fieldName: 'sawnTimber' },
        { name: 'MDF', ef: 0.856, fieldName: 'mdf' },
        { name: 'Open Panel Timber Frame', ef: 0.345, fieldName: 'openPanelTimberFrame' },
        { name: 'Carpet ', ef: 6.7, fieldName: 'carpet' },
        { name: 'Adhesive Vinyl', ef: 3.1, fieldName: 'adhesiveVinyl' },
        { name: 'Cardboard', ef: 0.94, fieldName: 'cardboard' },
        { name: 'Nylon', ef: 12.7, fieldName: 'nylon' },
    ];
    const fieldDataTwo = [
        { name: 'Wood', ef: 1.8, fieldName: 'wood' },
        { name: 'Steel ', ef: 1.36, fieldName: 'steel' },
        { name: 'Aluminium', ef: 2.663, fieldName: 'aluminium' },
        { name: 'Iron', ef: 0.64, fieldName: 'iron' },
        { name: 'Paper', ef: 0.0005, fieldName: 'paper' },
        { name: 'Recycled Paper', ef: 0.02, fieldName: 'recycledPaper' },
        { name: 'Paint ', ef: 1.15, fieldName: 'paint' },
    ];
    const fieldDataThree = [
        { name: 'Projector', ef: 0.215, fieldName: 'projector' },
        { name: 'LED Screen Panel (500mmx500mm)', ef: 0.043, fieldName: 'ledScreenPanel' },
    ];
    const fieldDataFour = [
        { name: 'Electricity', ef: 0.43, fieldName: 'electricity' },
    ];

    // const initialValues = {
    //     ...fieldDataOne?.reduce((fieldOne, item) => {
    //         fieldOne[`${item?.fieldName}Area`] = 0;
    //         fieldOne[`${item?.fieldName}Emission`] = 0;
    //         return fieldOne;
    //     }, {}),
    //     ...fieldDataTwo?.reduce((fieldTwo, item) => {
    //         fieldTwo[`${item?.fieldName}Kgs`] = 0;
    //         fieldTwo[`${item?.fieldName}Emission`] = 0;
    //         return fieldTwo;
    //     }, {}),
    //     ...fieldDataThree?.reduce((fieldThr, item) => {
    //         fieldThr[`${item?.fieldName}NoOfHour`] = 0;
    //         fieldThr[`${item?.fieldName}NoOfDevice`] = 0;
    //         fieldThr[`${item?.fieldName}Emission`] = 0;
    //         return fieldThr;
    //     }, {}),
    //     ...fieldDataFour?.reduce((fieldFr, item) => {
    //         fieldFr[`${item?.fieldName}NoOfHour`] = 0;
    //         fieldFr[`${item?.fieldName}NoOfLight`] = 0;
    //         fieldFr[`${item?.fieldName}Emission`] = 0;
    //         return fieldFr;
    //     }, {}),
    // };

    const initialValues = {
        sawnTimberArea: 0,
        sawnTimberEmission: 0,
        mdfArea: 0,
        mdfEmission: 0,
        openPanelTimberFrameArea: 0,
        openPanelTimberFrameEmission: 0,
        carpetArea: 0,
        carpetEmission: 0,
        adhesiveVinylArea: 0,
        adhesiveVinylEmission: 0,
        cardboardArea: 0,
        cardboardEmission: 0,
        nylonArea: 0,
        nylonEmission: 0,
        woodKgs: 0,
        woodEmission: 0,
        steelKgs: 0,
        steelEmission: 0,
        aluminiumKgs: 0,
        aluminiumEmission: 0,
        ironKgs: 0,
        ironEmission: 0,
        paperKgs: 0,
        paperEmission: 0,
        recycledPaperKgs: 0,
        recycledPaperEmission: 0,
        paintKgs: 0,
        paintEmission: 0,
        projectorNoOfHour: 0,
        projectorNoOfDevice: 0,
        projectorEmission: 0,
        ledScreenPanelNoOfHour: 0,
        ledScreenPanelNoOfDevice: 0,
        ledScreenPanelEmission: 0,
        kwh: 0,
        kwhEmission: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue(
                'sawnTimberEmission',
                values?.sawnTimberArea === 0 ? 0 : Number((values?.sawnTimberArea * 0.263).toFixed(2))
            );
            formik.setFieldValue('mdfEmission', values?.mdfArea === 0 ? 0 : Number((values?.mdfArea * 0.856).toFixed(2)));
            formik.setFieldValue(
                'openPanelTimberFrameEmission',
                values?.openPanelTimberFrameArea === 0 ? 0 : Number((values?.openPanelTimberFrameArea * 0.345).toFixed(2))
            );
            formik.setFieldValue(
                'carpetEmission',
                values?.carpetArea === 0 ? 0 : Number((values?.carpetArea * 6.7).toFixed(2))
            );
            formik.setFieldValue(
                'adhesiveVinylEmission',
                values?.adhesiveVinylArea === 0 ? 0 : Number((values?.adhesiveVinylArea * 3.1).toFixed(2))
            );
            formik.setFieldValue(
                'cardboardEmission',
                values?.cardboardArea === 0 ? 0 : Number((values?.cardboardArea * 0.94).toFixed(2))
            );
            formik.setFieldValue(
                'nylonEmission',
                values?.nylonArea === 0 ? 0 : Number((values?.nylonArea * 12.7).toFixed(2))
            );

            formik.setFieldValue('woodEmission', values?.woodKgs === 0 ? 0 : Number((values?.woodKgs * 1.8).toFixed(2)));
            formik.setFieldValue('steelEmission', values?.steelKgs === 0 ? 0 : Number((values?.steelKgs * 1.36).toFixed(2)));
            formik.setFieldValue(
                'aluminiumEmission',
                values?.aluminiumKgs === 0 ? 0 : Number((values?.aluminiumKgs * 2.663).toFixed(2))
            );
            formik.setFieldValue('ironEmission', values?.ironKgs === 0 ? 0 : Number((values?.ironKgs * 0.64).toFixed(2)));
            formik.setFieldValue(
                'paperEmission',
                values?.paperKgs === 0 ? 0 : Number((values?.paperKgs * 0.0005).toFixed(2))
            );
            formik.setFieldValue(
                'recycledPaperEmission',
                values?.recycledPaperKgs === 0 ? 0 : Number((values?.recycledPaperKgs * 0.02).toFixed(2))
            );
            formik.setFieldValue('paintEmission', values?.paintKgs === 0 ? 0 : Number((values?.paintKgs * 1.15).toFixed(2)));

            formik.setFieldValue(
                'projectorEmission',
                values?.projectorNoOfHour === 0 || values?.projectorNoOfDevice === 0
                    ? 0
                    : Number((values?.projectorNoOfHour * values?.projectorNoOfDevice * 0.215).toFixed(2))
            );
            formik.setFieldValue(
                'ledScreenPanelEmission',
                values?.ledScreenPanelNoOfHour === 0 || values?.ledScreenPanelNoOfDevice === 0
                    ? 0
                    : Number((values?.ledScreenPanelNoOfHour * values?.ledScreenPanelNoOfDevice * 0.043).toFixed(2))
            );

            formik.setFieldValue(
                'kwhEmission',
                Number((values?.kwh * 0.43).toFixed(2))
            );

            // const dataFieldOne = fieldDataOne?.map((item) => {
            //     const emission = values?.[`${item?.fieldName}Area`] === 0 ? 0 : Number((values?.[`${item?.fieldName}Area`] * item?.ef).toFixed(2)) || 0;
            //     return {
            //         type: item?.name,
            //         area: values?.[`${item?.fieldName}Area`],
            //         emission,
            //     };
            // });

            // const dataFieldTwo = fieldDataTwo?.map((item) => {
            //     const emission = values?.[`${item?.fieldName}Kgs`] === 0 ? 0 : Number((values?.[`${item?.fieldName}Kgs`] * item?.ef).toFixed(2)) || 0;
            //     return {
            //         type: item?.name,
            //         kgs: values?.[`${item?.fieldName}Kgs`],
            //         emission,
            //     };
            // });

            // const dataFieldThree = fieldDataThree?.map((item) => {
            //     const emission = values?.[`${item?.fieldName}NoOfHour`] === 0 || values?.[`${item?.fieldName}NoOfDevice`] === 0 ? 0 : Number((values?.[`${item?.fieldName}NoOfHour`] * values?.[`${item?.fieldName}NoOfDevice`] * item?.ef).toFixed(2)) || 0;
            //     return {
            //         type: item?.name,
            //         noOfHour: values?.[`${item?.fieldName}NoOfHour`],
            //         noOfDevice: values?.[`${item?.fieldName}NoOfDevice`],
            //         emission,
            //     };
            // });

            // const dataFieldFour = fieldDataFour?.map((item) => {
            //     const emission = values?.[`${item?.fieldName}NoOfHour`] === 0 || values?.[`${item?.fieldName}NoOfLight`] === 0 ? 0 : Number((values?.[`${item?.fieldName}NoOfHour`] * values?.[`${item?.fieldName}NoOfLight`] * item?.ef).toFixed(2)) || 0;
            //     return {
            //         type: item?.name,
            //         noOfHour: values?.[`${item?.fieldName}NoOfHour`],
            //         noOfLight: values?.[`${item?.fieldName}NoOfLight`],
            //         emission,
            //     };
            // });

            // const data = [...dataFieldOne, ...dataFieldTwo, ...dataFieldThree, ...dataFieldFour];

            const data = [
                {
                    type: 'Sawn Timber',
                    area: values?.sawnTimberArea,
                    emission: values?.sawnTimberArea === 0 ? 0 : Number((values?.sawnTimberArea * 0.263).toFixed(2)),
                },
                {
                    type: 'MDF',
                    area: values?.mdfArea,
                    emission: values?.mdfArea === 0 ? 0 : Number((values?.mdfArea * 0.312).toFixed(2)),
                },
                {
                    name: 'Open Panel Timber Frame',
                    area: values?.openPanelTimberFrameArea,
                    emission:
                        values?.openPanelTimberFrameArea === 0 ? 0 : Number((values?.openPanelTimberFrameArea * 0.345).toFixed(2)),
                },
                {
                    name: 'Carpet',
                    area: values?.carpetArea,
                    emission: values?.carpetArea === 0 ? 0 : Number((values?.carpetArea * 6.7).toFixed(2)),
                },
                {
                    name: 'Adhesive Vinyl',
                    area: values?.adhesiveVinylArea,
                    emission: values?.adhesiveVinylArea === 0 ? 0 : Number((values?.adhesiveVinylArea * 3.1).toFixed(2)),
                },
                {
                    name: 'Cardboard',
                    area: values?.cardboardArea,
                    emission: values?.cardboardArea === 0 ? 0 : Number((values?.cardboardArea * 0.94).toFixed(2)),
                },
                {
                    name: 'Nylon',
                    area: values?.nylonArea,
                    emission: values?.nylonArea === 0 ? 0 : Number((values?.nylonArea * 12.7).toFixed(2)),
                },
                {
                    type: 'Wood',
                    kgs: values?.woodKgs,
                    emission: values?.woodKgs === 0 ? 0 : Number((values?.woodKgs * 1.8).toFixed(2)),
                },
                {
                    type: 'Steel ',
                    kgs: values?.steelKgs,
                    emission: values?.steelKgs === 0 ? 0 : Number((values?.steelKgs * 1.36).toFixed(2)),
                },
                {
                    type: 'Aluminium',
                    kgs: values?.aluminiumKgs,
                    emission: values?.aluminiumKgs === 0 ? 0 : Number((values?.aluminiumKgs * 2.663).toFixed(2)),
                },
                {
                    type: 'Iron',
                    kgs: values?.ironKgs,
                    emission: values?.ironKgs === 0 ? 0 : Number((values?.ironKgs * 0.64).toFixed(2)),
                },
                {
                    type: 'Paper',
                    kgs: values?.paperKgs,
                    emission: values?.paperKgs === 0 ? 0 : Number((values?.paperKgs * 0.0005).toFixed(2)),
                },
                {
                    type: 'Recycled Paper',
                    kgs: values?.recycledPaperKgs,
                    emission: values?.recycledPaperKgs === 0 ? 0 : Number((values?.recycledPaperKgs * 0.02).toFixed(2)),
                },
                {
                    type: 'Paint',
                    kgs: values?.paintKgs,
                    emission: values?.paintKgs === 0 ? 0 : Number((values?.paintKgs * 1.15).toFixed(2)),
                },
                //
                {
                    type: 'Projector',
                    noOfHour: values?.projectorNoOfHour,
                    noOfDevice: values?.projectorNoOfDevice,
                    emission:
                        values?.projectorNoOfHour === 0 || values?.projectorNoOfDevice === 0
                            ? 0
                            : Number((values?.projectorNoOfHour * values?.projectorNoOfDevice * 0.215).toFixed(2)),
                },
                {
                    type: 'LED Screen Panel (500mmx500mm)',
                    noOfHour: values?.ledScreenPanelNoOfHour,
                    noOfDevice: values?.ledScreenPanelNoOfDevice,
                    emission:
                        values?.ledScreenPanelNoOfHour === 0 || values?.ledScreenPanelNoOfDevice === 0
                            ? 0
                            : Number((values?.ledScreenPanelNoOfHour * values?.ledScreenPanelNoOfDevice * 0.043).toFixed(2)),
                },
                {
                    type: 'Electricity',
                    kwh: values?.kwh,
                    emission:
                        Number((values?.kwh * 0.43).toFixed(2)),
                },
            ];

            dispatch(addProductionData({ data }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteProductionData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            // fieldDataOne?.forEach((item, i) => {
            //     formik.setFieldValue(`${item?.fieldName}Area`, allData[i]?.area);
            //     formik.setFieldValue(`${item?.fieldName}Emission`, allData[i]?.emission);
            // });

            // fieldDataTwo?.forEach((item, i) => {
            //     formik.setFieldValue(`${item?.fieldName}Kgs`, allData[i]?.kgs);
            //     formik.setFieldValue(`${item?.fieldName}Emission`, allData[i]?.emission);
            // });

            // fieldDataThree?.forEach((item, i) => {
            //     formik.setFieldValue(`${item?.fieldName}NoOfHour`, allData[i]?.noOfHour);
            //     formik.setFieldValue(`${item?.fieldName}NoOfDevice`, allData[i]?.noOfDevice);
            //     formik.setFieldValue(`${item?.fieldName}Emission`, allData[i]?.emission);
            // });

            // fieldDataFour?.forEach((item, i) => {
            //     formik.setFieldValue(`${item?.fieldName}NoOfHour`, allData[i]?.noOfHour);
            //     formik.setFieldValue(`${item?.fieldName}NoOfLight`, allData[i]?.noOfLight);
            //     formik.setFieldValue(`${item?.fieldName}Emission`, allData[i]?.emission);
            // });

            formik.setFieldValue('sawnTimberArea', allData[0]?.area);
            formik.setFieldValue('sawnTimberEmission', allData[0]?.emission);
            formik.setFieldValue('mdfArea', allData[1]?.area);
            formik.setFieldValue('mdfEmission', allData[1]?.emission);
            formik.setFieldValue('openPanelTimberFrameArea', allData[2]?.area);
            formik.setFieldValue('openPanelTimberFrameEmission', allData[2]?.emission);
            formik.setFieldValue('carpetArea', allData[3]?.area);
            formik.setFieldValue('carpetEmission', allData[3]?.emission);
            formik.setFieldValue('adhesiveVinylArea', allData[4]?.area);
            formik.setFieldValue('adhesiveVinylEmission', allData[4]?.emission);
            formik.setFieldValue('cardboardArea', allData[5]?.area);
            formik.setFieldValue('cardboardEmission', allData[5]?.emission);
            formik.setFieldValue('nylonArea', allData[6]?.area);
            formik.setFieldValue('nylonEmission', allData[6]?.emission);

            formik.setFieldValue('woodKgs', allData[7]?.kgs);
            formik.setFieldValue('woodEmission', allData[7]?.emission);
            formik.setFieldValue('steelKgs', allData[8]?.kgs);
            formik.setFieldValue('steelEmission', allData[8]?.emission);
            formik.setFieldValue('aluminiumKgs', allData[9]?.kgs);
            formik.setFieldValue('aluminiumEmission', allData[9]?.emission);
            formik.setFieldValue('ironKgs', allData[10]?.kgs);
            formik.setFieldValue('ironEmission', allData[10]?.emission);
            formik.setFieldValue('paperKgs', allData[11]?.kgs);
            formik.setFieldValue('paperEmission', allData[11]?.emission);
            formik.setFieldValue('recycledPaperKgs', allData[12]?.kgs);
            formik.setFieldValue('recycledPaperEmission', allData[12]?.emission);
            formik.setFieldValue('paintKgs', allData[13]?.kgs);
            formik.setFieldValue('paintEmission', allData[13]?.emission);

            formik.setFieldValue('projectorNoOfHour', allData[14]?.noOfHour);
            formik.setFieldValue('projectorNoOfDevice', allData[14]?.noOfDevice);
            formik.setFieldValue('projectorEmission', allData[14]?.emission);
            formik.setFieldValue('ledScreenPanelNoOfHour', allData[15]?.noOfHour);
            formik.setFieldValue('ledScreenPanelNoOfDevice', allData[15]?.noOfDevice);
            formik.setFieldValue('ledScreenPanelEmission', allData[15]?.emission);

            formik.setFieldValue('kwh', allData[16]?.kwh);
            formik.setFieldValue('kwhEmission', allData[16]?.emission);
        }
    }, [value]);

    return (
        <div>
            <Container maxWidth>
                <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
                    <Typography variant="h4" className="text-center text-white mb-4">
                        Production Material
                    </Typography>                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            mx={useMediaQuery(theme.breakpoints.up('lg')) && 15}
                            display={'flex'}
                            alignItems={'center'}
                            flexDirection={'column'}
                        >
                            <IconDiv>
                                <img width={100} src={ProductionImg} alt="Food" className='tabImgWhite' />
                            </IconDiv>

                            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box>

                                        <div className="table-responsive">
                                            <table className="table-custom-inpt-field">
                                                <tr>
                                                    <th />
                                                    <th className="ps-2">Total Area (m<sup>2</sup>)</th>
                                                    <th className="ps-2">Emissions</th>
                                                </tr>
                                                {fieldDataOne &&
                                                    fieldDataOne?.map((item) => (
                                                        <>
                                                            <tr key={`one${item}`}>
                                                                <td className="ps-2 py-1">{item.name}</td>
                                                                <td className="ps-2 py-1">
                                                                    <TextField
                                                                        size="small"
                                                                        type="number"
                                                                        name={`${item?.fieldName}Area`}
                                                                        value={formik.values[`${item?.fieldName}Area`]}
                                                                        onChange={(e) => {
                                                                            formik.handleChange(e);
                                                                            formik.setFieldValue(
                                                                                `${item?.fieldName}Emission`,
                                                                                Number((e.target.value * item?.ef).toFixed(2))
                                                                            );
                                                                        }}
                                                                        inputProps={{ style: { color: 'white' } }}
                                                                    />
                                                                </td>
                                                                <td className="ps-2 py-1">
                                                                    <TextField
                                                                        size="small"
                                                                        type="number"
                                                                        disabled
                                                                        name={`${item?.fieldName}Emission`}
                                                                        value={formik.values[`${item?.fieldName}Emission`]}
                                                                        onChange={formik.handleChange}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}
                                            </table>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box>
                                        <div className="table-responsive">
                                            <table className="table-custom-inpt-field">
                                                <tr>
                                                    <th />
                                                    <th className="ps-2">Weight (Kgs)</th>
                                                    <th className="ps-2">Emissions</th>
                                                </tr>
                                                {fieldDataTwo &&
                                                    fieldDataTwo?.map((ite) => (
                                                        <>
                                                            <tr key={`two${ite}`}>
                                                                <td className="ps-2 py-1">{ite.name}</td>
                                                                <td className="ps-2 py-1">
                                                                    <TextField
                                                                        size="small"
                                                                        type="number"
                                                                        name={`${ite?.fieldName}Kgs`}
                                                                        value={formik.values[`${ite?.fieldName}Kgs`]}
                                                                        onChange={(e) => {
                                                                            formik.handleChange(e);
                                                                            formik.setFieldValue(
                                                                                `${ite?.fieldName}Emission`,
                                                                                Number((e.target.value * ite?.ef).toFixed(2))
                                                                            );
                                                                        }}
                                                                        inputProps={{ style: { color: 'white' } }}
                                                                    />
                                                                </td>
                                                                <td className="ps-2 py-1">
                                                                    <TextField
                                                                        size="small"
                                                                        type="number"
                                                                        disabled
                                                                        name={`${ite?.fieldName}Emission`}
                                                                        value={formik.values[`${ite?.fieldName}Emission`]}
                                                                        onChange={formik.handleChange}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}
                                            </table>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box>
                                        <Typography variant="h4" className="text-center text-white mb-4">
                                            Stage Screen
                                        </Typography>
                                        <div className="table-responsive">
                                            <table className="table-custom-inpt-field">
                                                <tr>
                                                    <th />
                                                    <th className="ps-2">No of Hours</th>
                                                    <th className="ps-2">No of Devices/ Panels</th>
                                                    <th className="ps-2">Emissions</th>
                                                </tr>
                                                {fieldDataThree &&
                                                    fieldDataThree?.map((it) => (
                                                        <>
                                                            <tr key={`three${it}`}>
                                                                <td className="ps-2 py-1">{it.name}</td>
                                                                <td className="ps-2 py-1">
                                                                    <TextField
                                                                        size="small"
                                                                        type="number"
                                                                        name={`${it?.fieldName}NoOfHour`}
                                                                        value={formik.values[`${it?.fieldName}NoOfHour`]}
                                                                        onChange={(e) => {
                                                                            formik.handleChange(e);
                                                                            formik.setFieldValue(
                                                                                `${it?.fieldName}Emission`,
                                                                                Number((e.target.value * formik.values[`${it?.fieldName}NoOfDevice`] * it?.ef).toFixed(2))
                                                                            );
                                                                        }}
                                                                        inputProps={{ style: { color: 'white' } }}
                                                                    />
                                                                </td>
                                                                <td className="ps-2 py-1">
                                                                    <TextField
                                                                        size="small"
                                                                        type="number"
                                                                        name={`${it?.fieldName}NoOfDevice`}
                                                                        value={formik.values[`${it?.fieldName}NoOfDevice`]}
                                                                        onChange={(e) => {
                                                                            formik.handleChange(e);
                                                                            formik.setFieldValue(
                                                                                `${it?.fieldName}Emission`,
                                                                                Number((formik.values[`${it?.fieldName}NoOfHour`] * e.target.value * it?.ef).toFixed(2))
                                                                            );
                                                                        }}
                                                                        inputProps={{ style: { color: 'white' } }}
                                                                    />
                                                                </td>
                                                                <td className="ps-2 py-1">
                                                                    <TextField
                                                                        size="small"
                                                                        type="number"
                                                                        disabled
                                                                        name={`${it?.fieldName}Emission`}
                                                                        value={formik.values[`${it?.fieldName}Emission`]}
                                                                        onChange={formik.handleChange}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}
                                            </table>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box>
                                        <Typography variant="h4" className="text-center text-white mb-4">
                                            Stage Lighting & AV
                                        </Typography>
                                        <div className="table-responsive">
                                            <table className="table-custom-inpt-field">
                                                <tr>
                                                    <th />
                                                    <th className="ps-2">kwh</th>
                                                    <th className="ps-2">Emissions</th>
                                                </tr>
                                                {/* {fieldDataFour && */}
                                                {/* fieldDataFour?.map((i) => ( */}
                                                <>
                                                    <tr >
                                                        <td className="ps-2 py-1">Electricity</td>
                                                        <td className="ps-2 py-1">
                                                            <TextField
                                                                size="small"
                                                                type="number"
                                                                name={'kwh'}
                                                                value={formik.values.kwh}
                                                                onChange={(e) => {
                                                                    formik.handleChange(e);
                                                                    formik.setFieldValue(
                                                                        `kwhEmission`,
                                                                        Number((e.target.value * 0.43).toFixed(2))
                                                                    );
                                                                }}
                                                                inputProps={{ style: { color: 'white' } }}
                                                            />
                                                        </td>
                                                        <td className="ps-2 py-1">
                                                            <TextField
                                                                size="small"
                                                                type="number"
                                                                disabled
                                                                name={`kwhEmission`}
                                                                value={formik.values.kwhEmission}
                                                                onChange={formik.handleChange}
                                                            />
                                                        </td>
                                                    </tr>
                                                </>
                                                {/* ))}/ */}
                                            </table>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                    <Stack direction={'row'} spacing={2}>
                                        {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                formik.handleSubmit();
                                                setValue(value - 1);
                                            }}
                                            className="custom-btn"
                                            startIcon={<FaAngleDoubleLeft />}
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
                                            {' '}
                                            Save and Next Page
                                        </Button>
                                        <Button
                                            variant="contained"
                                            endIcon={<FaAngleDoubleRight />}
                                            onClick={() => setValue(9)}
                                            className="custom-btn"
                                        >
                                            Go To Result
                                        </Button>
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
                                    <Typography color="white">{`Total Event Production Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card>
            </Container>
        </div>
    );
};

export default Production;
