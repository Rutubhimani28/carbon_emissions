import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { Formik, useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addWasteData, deleteWasteData } from '../../redux/slice/totalWasteSlice';
import {
  addResultTableData,
  deleteResTabWasteData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';
import { IconDiv } from '../../components/IconDiv';
import WasteImg from '../../assets/Waste.png';
import useEventData from '../../hooks/useEventData';

const Waste = (props) => {
  const { setValue, value } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const allData = useSelector((state) => state?.totalWasteDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalWasteDetails?.totalEmission);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  const eventsData = useEventData();

  // -----------   initialValues
  const initialValues = {
    BeefHerd: '',
    dairyHerd: '',
    // municipalSolidWasteKg: '',
    lambMutton: '',
    poultryMeat: '',
    BeefHerdEmission: '',
    dairyHerdEmission: '',
    // municipalSolidWasteEmission: '',
    lambMuttonEmission: '',
    poultryMeatEmission: '',


    LandfilledFood: '',
    LandfilledFoodEmission: '',
    CombustedFood: '',
    CombustedFoodEmission: '',
    CompostedFood: '',
    CompostedFoodEmission: '',
    // bottleOne: '',
    // bottleTwo: '',
    // bottleThree: '',
    // bottleOneEmission: '',
    // bottleTwoEmission: '',
    // bottleThreeEmission: '',
    // plasticWrapping: '',
    // plasticWrappingEmission: '',

    // woodKg: '',
    // carpetKg: '',
    // pvcKg: '',
    // woodEmission: '',
    // carpetEmission: '',
    // pvcEmission: '',

    fishFrame: '',
    fishFrameEmission: '',
    PrawnsFrame: '',
    PrawnsFrameEmission: '',
    Eggs: '',
    EggsEmission: '',
    Cheese: '',
    CheeseEmission: '',
    Rice: '',
    RiceEmission: '',
    OtherPulses: '',
    OtherPulsesEmission: '',
    wheatRye: '',
    wheatRyeEmission: '',
    otherFruits: '',
    otherFruitsEmission: '',
    otherVegetables: '',
    otherVegetablesEmission: '',
    rootVegetables: '',
    rootVegetablesEmission: '',

    Recycled: '',
    RecycledEmission: '',
    Landfilled: '',
    LandfilledEmission: '',
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

      const LandfilledFoodEmission = Number(0.69 * Number(values?.LandfilledFood)).toFixed(5);
      const CombustedFoodEmission = Number(0.05 * Number(values?.CombustedFood)).toFixed(5);
      const CompostedFoodEmission = Number(0.11 * Number(values?.CompostedFood)).toFixed(5);

      const BeefHerdEmission = Number(99.48 * Number(values?.BeefHerd)).toFixed(5);
      const dairyHerdEmission = Number(33.3 * Number(values?.dairyHerd)).toFixed(5);
      // const municipalSolidWasteEmission = Number(0.902 * Number(values?.municipalSolidWasteKg)).toFixed(5);
      const lambMuttonEmission = Number(39.72 * Number(values?.lambMutton)).toFixed(5);
      const poultryMeatEmission = Number(9.87 * Number(values?.poultryMeat)).toFixed(5);
      const fishFrameEmission = Number(13.63 * Number(values?.fishFrame)).toFixed(5);
      const PrawnsFrameEmission = Number(26.87 * Number(values?.PrawnsFrame)).toFixed(5);
      const EggsEmission = Number(4.67 * Number(values?.Eggs)).toFixed(5);
      const CheeseEmission = Number(23.88 * Number(values?.Cheese)).toFixed(5);
      const RiceEmission = Number(4.45 * Number(values?.Rice)).toFixed(5);
      const OtherPulsesEmission = Number(1.79 * Number(values?.OtherPulses)).toFixed(5);
      const wheatRyeEmission = Number(1.57 * Number(values?.wheatRye)).toFixed(5);
      const otherFruitsEmission = Number(1.05 * Number(values?.otherFruits)).toFixed(5);
      const otherVegetablesEmission = Number(0.53 * Number(values?.otherVegetables)).toFixed(5);
      const rootVegetablesEmission = Number(0.43 * Number(values?.rootVegetables)).toFixed(5);
      const RecycledEmission = Number(0.1097 * Number(values?.Recycled)).toFixed(5);
      const LandfilledEmission = Number(0.122 * Number(values?.Landfilled)).toFixed(5);
      // const bottleOneEmission = Number(Number(values?.bottleOne) * 6.42 * 0.022).toFixed(5);
      // const bottleTwoEmission = Number(Number(values?.bottleTwo) * 13 * 0.022).toFixed(5);
      // const bottleThreeEmission = Number(Number(values?.bottleThree) * 21.5 * 0.022).toFixed(5);
      // const plasticWrappingEmission = Number(Number(values?.plasticWrapping) * 1 * 7.83).toFixed(5);

      // const woodEmission = Number(Number(values?.woodKg) * 1.33).toFixed(5);
      // const carpetEmission = Number(Number(values?.carpetKg) * 0.2).toFixed(5);
      // const pvcEmission = Number(Number(values?.pvcKg) * 1 * 0.02).toFixed(5);

      if (LandfilledFoodEmission > 0) formik.setFieldValue('LandfilledFoodEmission', LandfilledFoodEmission);
      if (CombustedFoodEmission > 0) formik.setFieldValue('CombustedFoodEmission', CombustedFoodEmission);
      if (CompostedFoodEmission > 0) formik.setFieldValue('CompostedFoodEmission', CompostedFoodEmission);

      if (BeefHerdEmission > 0) formik.setFieldValue('BeefHerdEmission', BeefHerdEmission);
      if (dairyHerdEmission > 0) formik.setFieldValue('dairyHerdEmission', dairyHerdEmission);
      // if (municipalSolidWasteEmission > 0) formik.setFieldValue('municipalSolidWasteEmission', municipalSolidWasteEmission);
      if (lambMuttonEmission > 0) formik.setFieldValue('lambMuttonEmission', lambMuttonEmission);
      if (poultryMeatEmission > 0) formik.setFieldValue('poultryMeatEmission', poultryMeatEmission);
      if (fishFrameEmission > 0) formik.setFieldValue('fishFrameEmission', fishFrameEmission);
      if (PrawnsFrameEmission > 0) formik.setFieldValue('PrawnsFrameEmission', PrawnsFrameEmission);
      if (EggsEmission > 0) formik.setFieldValue('EggsEmission', EggsEmission);
      if (CheeseEmission > 0) formik.setFieldValue('CheeseEmission', CheeseEmission);
      if (RiceEmission > 0) formik.setFieldValue('RiceEmission', RiceEmission);
      if (OtherPulsesEmission > 0) formik.setFieldValue('OtherPulsesEmission', OtherPulsesEmission);
      if (wheatRyeEmission > 0) formik.setFieldValue('wheatRyeEmission', wheatRyeEmission);

      if (otherFruitsEmission > 0) formik.setFieldValue('otherFruitsEmission', otherFruitsEmission);
      if (otherVegetablesEmission > 0) formik.setFieldValue('otherVegetablesEmission', otherVegetablesEmission);
      if (rootVegetablesEmission > 0) formik.setFieldValue('rootVegetablesEmission', rootVegetablesEmission);
      if (RecycledEmission > 0) formik.setFieldValue('RecycledEmission', RecycledEmission);
      if (LandfilledEmission > 0) formik.setFieldValue('LandfilledEmission', LandfilledEmission);

      // if (bottleOneEmission > 0) formik.setFieldValue('bottleOneEmission', bottleOneEmission);
      // if (bottleTwoEmission > 0) formik.setFieldValue('bottleTwoEmission', bottleTwoEmission);
      // if (bottleThreeEmission > 0) formik.setFieldValue('bottleThreeEmission', bottleThreeEmission);

      // if (woodEmission > 0) formik.setFieldValue('woodEmission', woodEmission);
      // if (carpetEmission > 0) formik.setFieldValue('carpetEmission', carpetEmission);
      // if (pvcEmission > 0) formik.setFieldValue('pvcEmission', pvcEmission);

      // if (plasticWrappingEmission > 0) formik.setFieldValue('plasticWrappingEmission', plasticWrappingEmission);
      // formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(values?.hdpeBanner)).toFixed(5));
      // formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(values?.pvcBanners)).toFixed(5));
      // formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(values?.cottonBanner)).toFixed(5));
      // formik.setFieldValue('colouredBrochurePageEmission', Number(1.56 * Number(values?.colouredBrochurePage)).toFixed(5));
      // formik.setFieldValue('paperBagsA4SizeEmission', Number(0.3125 * Number(values?.paperBagsA4Size)).toFixed(5));
      // formik.setFieldValue('paperBagsA5SizeEmission', Number(0.125 * Number(values?.paperBagsA5Size)).toFixed(5));
      // formik.setFieldValue('juteBagsA4SizeEmission', Number(0.73 * Number(values?.juteBagsA4Size)).toFixed(5));
      // formik.setFieldValue('cottonBagsA4SizeEmission', Number(17 * Number(values?.cottonBagsA4Size)).toFixed(5));

      const data = [
        {
          type: 'LandfilledFood',
          LandfilledFood: values?.LandfilledFood,
          emission: LandfilledFoodEmission > 0 ? LandfilledFoodEmission : '',
        },
        {
          type: 'CombustedFood',
          CombustedFood: values?.CombustedFood,
          emission: CombustedFoodEmission > 0 ? CombustedFoodEmission : '',
        },
        {
          type: 'CompostedFood',
          CompostedFood: values?.CompostedFood,
          emission: CompostedFoodEmission > 0 ? CompostedFoodEmission : '',
        },
        // {
        //   type: 'BeefHerd',
        //   BeefHerd: values?.BeefHerd,
        //   emission: BeefHerdEmission > 0 ? BeefHerdEmission : '',
        // },
        // {
        //   type: 'DairyHerd',
        //   dairyHerd: values?.dairyHerd,
        //   emission: dairyHerdEmission > 0 ? dairyHerdEmission : '',
        // },
        // {
        //   type: 'LambMutton',
        //   lambMutton: values?.lambMutton,
        //   emission: lambMuttonEmission > 0 ? lambMuttonEmission : '',
        // },
        {
          type: 'PoultryMeat',
          poultryMeat: values?.poultryMeat,
          emission: poultryMeatEmission > 0 ? poultryMeatEmission : '',
        },
        {
          type: 'Fish (farmed)',
          fishFrame: values?.fishFrame,
          emission: fishFrameEmission > 0 ? fishFrameEmission : '',
        },
        {
          type: 'Prawns (farmed)',
          PrawnsFrame: values?.PrawnsFrame,
          emission: PrawnsFrameEmission > 0 ? PrawnsFrameEmission : '',
        },
        {
          type: 'Eggs',
          Eggs: values?.Eggs,
          emission: EggsEmission > 0 ? EggsEmission : '',
        },
        {
          type: 'Cheese',
          Cheese: values?.Cheese,
          emission: CheeseEmission > 0 ? CheeseEmission : '',
        },
        {
          type: 'Rice',
          Rice: values?.Rice,
          emission: RiceEmission > 0 ? RiceEmission : '',
        },
        {
          type: 'Other Pulses',
          OtherPulses: values?.OtherPulses,
          emission: OtherPulsesEmission > 0 ? OtherPulsesEmission : '',
        },
        {
          type: 'Wheat & Rye',
          wheatRye: values?.wheatRye,
          emission: wheatRyeEmission > 0 ? wheatRyeEmission : '',
        },
        {
          type: 'Other Fruit',
          otherFruits: values?.otherFruits,
          emission: otherFruitsEmission > 0 ? otherFruitsEmission : '',
        },
        {
          type: 'Other Vegetables',
          otherVegetables: values?.otherVegetables,
          emission: otherVegetablesEmission > 0 ? otherVegetablesEmission : '',
        },
        {
          type: 'Root Vegetables',
          rootVegetables: values?.rootVegetables,
          emission: rootVegetablesEmission > 0 ? rootVegetablesEmission : '',
        },
        {
          type: '500ml (If Recycled)',
          Recycled: values?.Recycled,
          emission: RecycledEmission > 0 ? RecycledEmission : '',
        },
        {
          type: '500ml (If Landfilled)',
          Landfilled: values?.Landfilled,
          emission: LandfilledEmission > 0 ? LandfilledEmission : '',
        },
      ];
      dispatch(addWasteData({ data }));

      const tableData = [
        {
          subType: 'Food Waste',
          subTypeData: {
            th: ['Food Type', 'No of Kgs ', 'Emissions'],
            td: [
              {
                wsType: 'Landfilled Food',
                kgs: values?.LandfilledFood,
                emissions: LandfilledFoodEmission > 0 ? LandfilledFoodEmission : '',
              },
              {
                wsType: 'Combusted Food',
                kgs: values?.CombustedFood,
                emissions: CombustedFoodEmission > 0 ? CombustedFoodEmission : '',
              },
              {
                wsType: 'Composted Food',
                kgs: values?.CompostedFood,
                emissions: CompostedFoodEmission > 0 ? CompostedFoodEmission : '',
              },
              // {
              //   wsType: 'Beef (beef herd)',
              //   kgs: values?.BeefHerd,
              //   emissions: BeefHerdEmission > 0 ? BeefHerdEmission : '',
              // },
              // {
              //   wsType: 'Beef (dairy herd)',
              //   kgs: values?.dairyHerd,
              //   emissions: dairyHerdEmission > 0 ? dairyHerdEmission : '',
              // },
              // {
              //     wsType: "Municipal Solid Waste",
              //     kgs: values?.municipalSolidWasteKg,
              //     emissions: municipalSolidWasteEmission > 0 ? municipalSolidWasteEmission : ''
              // },
              // {
              //   wsType: 'Lamb & Mutton',
              //   kgs: values?.lambMutton,
              //   emissions: lambMuttonEmission > 0 ? lambMuttonEmission : '',
              // },
              {
                wsType: 'Poultry Meat',
                kgs: values?.poultryMeat,
                emissions: poultryMeatEmission > 0 ? poultryMeatEmission : '',
              },
              {
                wsType: 'Fish (farmed)',
                kgs: values?.fishFrame,
                emissions: fishFrameEmission > 0 ? fishFrameEmission : '',
              },
              {
                wsType: 'Prawns (farmed)',
                kgs: values?.PrawnsFrame,
                emissions: PrawnsFrameEmission > 0 ? PrawnsFrameEmission : '',
              },
              {
                wsType: 'Eggs',
                kgs: values?.Eggs,
                emissions: EggsEmission > 0 ? EggsEmission : '',
              },
              {
                wsType: 'Cheese',
                kgs: values?.Cheese,
                emissions: CheeseEmission > 0 ? CheeseEmission : '',
              },
              {
                wsType: 'Rice',
                kgs: values?.Rice,
                emissions: RiceEmission > 0 ? RiceEmission : '',
              },
              {
                wsType: 'Other Pulses',
                kgs: values?.OtherPulses,
                emissions: OtherPulsesEmission > 0 ? OtherPulsesEmission : '',
              },
              {
                wsType: 'Wheat & Rye',
                kgs: values?.wheatRye,
                emissions: wheatRyeEmission > 0 ? wheatRyeEmission : '',
              },
              {
                wsType: 'Other Fruit',
                kgs: values?.otherFruits,
                emissions: otherFruitsEmission > 0 ? otherFruitsEmission : '',
              },
              {
                wsType: 'Other Vegetables',
                kgs: values?.otherVegetables,
                emissions: otherVegetablesEmission > 0 ? otherVegetablesEmission : '',
              },
              {
                wsType: 'Root Vegetables',
                kgs: values?.rootVegetables,
                emissions: rootVegetablesEmission > 0 ? rootVegetablesEmission : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: 'PET Water Bottle',
          subTypeData: {
            th: ['', 'No. of Bottlessasssss', 'Emissions'],
            td: [
              {
                wsType: '500ml (If Recycled)',
                kgs: values?.Recycled,
                emissions: RecycledEmission > 0 ? RecycledEmission : '',
              },
              {
                wsType: '500ml (If Landfilled)',
                kgs: values?.Landfilled,
                emissions: LandfilledEmission > 0 ? LandfilledEmission : '',
              },
            ],
          },
          // scope: 3
        },
      ];
      dispatch(addResultTableData({ from: 'f2fEvent', data: tableData, tabTitle: 'Waste' }));
    },
  });

  const handeleDelete = () => {
    dispatch(deleteWasteData());
    dispatch(deleteResTabWasteData());
  };

  const handleSaveToDb = async () => {
    const eventData = {
      ...eventsData,
    };

    if (resultTableData.eventDataId) {
      eventData.eventDataId = resultTableData?.eventDataId;
      const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
      if (updateResultTableDatasToDb?.rejected?.match(resultAction)) {
        console.error('Failed to update data:', resultAction?.payload);
      }
    } else {
      const resultAction = await dispatch(addResultTableDatasToDb(eventData));
      if (addResultTableDatasToDb?.rejected?.match(resultAction)) {
        console.error('Failed to save data:', resultAction?.payload);
      }
    }
  };
  useEffect(() => {
    if (allData?.length > 0) {
      // formik.setFieldValue('BeefHerd', allData?.[0]?.BeefHerd);
      // formik.setFieldValue('BeefHerdEmission', allData?.[0]?.emission);

      formik.setFieldValue('LandfilledFood', allData?.[0]?.LandfilledFood);
      formik.setFieldValue('LandfilledFoodEmission', allData?.[0]?.emission);

      formik.setFieldValue('CombustedFood', allData?.[1]?.CombustedFood);
      formik.setFieldValue('CombustedFoodEmission', allData?.[1]?.emission);

      formik.setFieldValue('CompostedFood', allData?.[2]?.CompostedFood);
      formik.setFieldValue('CompostedFoodEmission', allData?.[2]?.emission);

      // formik.setFieldValue('dairyHerd', allData?.[1]?.dairyHerd);
      // formik.setFieldValue('dairyHerdEmission', allData?.[1]?.emission);
      // formik.setFieldValue('lambMutton', allData?.[2]?.lambMutton);
      // formik.setFieldValue('lambMuttonEmission', allData?.[2]?.emission);
      // formik.setFieldValue('poultryMeat', allData?.[3]?.poultryMeat);
      // formik.setFieldValue('poultryMeatEmission', allData?.[3]?.emission);
      formik.setFieldValue('fishFrame', allData?.[4]?.fishFrame);

      formik.setFieldValue('fishFrameEmission', allData?.[4]?.emission);
      formik.setFieldValue('PrawnsFrame', allData?.[5]?.PrawnsFrame);
      formik.setFieldValue('PrawnsFrameEmission', allData?.[5]?.emission);
      formik.setFieldValue('Eggs', allData?.[6]?.Eggs);
      formik.setFieldValue('EggsEmission', allData?.[6]?.emission);
      formik.setFieldValue('Cheese', allData?.[7]?.Cheese);
      formik.setFieldValue('CheeseEmission', allData?.[7]?.emission);
      formik.setFieldValue('Rice', allData?.[8]?.Rice);
      formik.setFieldValue('RiceEmission', allData?.[8]?.emission);
      formik.setFieldValue('OtherPulses', allData?.[9]?.OtherPulses);
      formik.setFieldValue('OtherPulsesEmission', allData?.[9]?.emission);
      formik.setFieldValue('wheatRye', allData?.[10]?.wheatRye);
      formik.setFieldValue('wheatRyeEmission', allData?.[10]?.emission);
      formik.setFieldValue('otherFruits', allData?.[11]?.otherFruits);
      formik.setFieldValue('otherFruitsEmission', allData?.[11]?.emission);
      formik.setFieldValue('otherVegetables', allData?.[12]?.otherVegetables);
      formik.setFieldValue('otherVegetablesEmission', allData?.[12]?.emission);
      formik.setFieldValue('rootVegetables', allData?.[13]?.rootVegetables);
      formik.setFieldValue('rootVegetablesEmission', allData?.[13]?.emission);
      formik.setFieldValue('Recycled', allData?.[14]?.Recycled);
      formik.setFieldValue('RecycledEmission', allData?.[14]?.emission);
      formik.setFieldValue('Landfilled', allData?.[15]?.Landfilled);
      formik.setFieldValue('LandfilledEmission', allData?.[15]?.emission);

      // formik.setFieldValue('bottleOne', allData?.[4]?.bottleOne);
      // formik.setFieldValue('bottleOneEmission', allData?.[4]?.emission);
      // formik.setFieldValue('bottleTwo', allData?.[5]?.bottleTwo);
      // formik.setFieldValue('bottleTwoEmission', allData?.[5]?.emission);
      // formik.setFieldValue('bottleThree', allData?.[6]?.bottleThree);
      // formik.setFieldValue('bottleThreeEmission', allData?.[6]?.emission);
      // formik.setFieldValue('plasticWrapping', allData?.[6]?.plasticWrapping);
      // formik.setFieldValue('plasticWrappingEmission', allData?.[6]?.emission);

      // formik.setFieldValue('woodKg', allData?.[7]?.woodKg);
      // formik.setFieldValue('woodEmission', allData?.[7]?.emission);
      // formik.setFieldValue('carpetKg', allData?.[8]?.carpetKg);
      // formik.setFieldValue('carpetEmission', allData?.[8]?.emission);
      // formik.setFieldValue('pvcKg', allData?.[9]?.pvcKg);
      // formik.setFieldValue('pvcEmission', allData?.[9]?.emission);

      // formik.setFieldValue('hdpeBanner', allData?.[7]?.hdpeBanner);
      // formik.setFieldValue('hdpeBannerEmission', allData?.[7]?.emission);
      // formik.setFieldValue('pvcBanners', allData?.[8]?.pvcBanners);
      // formik.setFieldValue('pvcBannersEmission', allData?.[8]?.emission);
      // formik.setFieldValue('cottonBanner', allData?.[9]?.cottonBanner);
      // formik.setFieldValue('cottonBannerEmission', allData?.[9]?.emission);
      // formik.setFieldValue('plasticBadgeHolders', allData?.[10]?.plasticBadgeHolders);
      // formik.setFieldValue('plasticBadgeHoldersEmission', allData?.[10]?.emission);

      // formik.setFieldValue('colouredBrochurePage', allData?.[11]?.colouredBrochurePage);
      // formik.setFieldValue('colouredBrochurePageEmission', allData?.[11]?.emission);
      // formik.setFieldValue('paperBagsA4Size', allData?.[12]?.paperBagsA4Size);
      // formik.setFieldValue('paperBagsA4SizeEmission', allData?.[12]?.emission);
      // formik.setFieldValue('paperBagsA5Size', allData?.[13]?.paperBagsA5Size);
      // formik.setFieldValue('paperBagsA5SizeEmission', allData?.[13]?.emission);
      // formik.setFieldValue('juteBagsA4Size', allData?.[14]?.juteBagsA4Size);
      // formik.setFieldValue('juteBagsA4SizeEmission', allData?.[14]?.emission);
      // formik.setFieldValue('cottonBagsA4Size', allData?.[15]?.cottonBagsA4Size);
      // formik.setFieldValue('cottonBagsA4SizeEmission', allData?.[15]?.emission);
    }
  }, [value]);

  return (
    <div>
      <Container maxWidth>
        <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              mx={useMediaQuery(theme.breakpoints.up('lg')) && 15}
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <IconDiv>
                <img src={WasteImg} alt="Waste" width={100} className="tabImgWhite" />
              </IconDiv>
              <Typography variant="h4" className="text-center text-white mb-4">
                Food Waste
              </Typography>
              <Box>

                <div className="table-responsive">
                  <table className="table-custom-inpt-field">
                    <tr>
                      <th className="ps-2">Food Type </th>
                      <th className="ps-2" style={{ textAlign: 'center' }}>No of Kgs</th>
                      <th className="ps-2" style={{ textAlign: 'center' }}>Emissions</th>
                    </tr>
                    <tr>
                      <td className="ps-2 py-1">Landfilled</td>
                      <td className="ps-2 py-1">
                        <TextField
                          size="small"
                          type="number"
                          name="LandfilledFood"
                          value={formik?.values?.LandfilledFood}
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldValue(
                              'LandfilledFoodEmission',
                              // Number(99.48 * Number(e?.target?.value)).toFixed(5)
                              Number(0.69 * Number(e?.target?.values)).toFixed(5)
                            );
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
                          name="LandfilledFoodEmission"
                          value={formik?.values?.LandfilledFoodEmission}
                          onChange={formik.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-2 py-1">Combusted</td>
                      <td className="ps-2 py-1">
                        <TextField
                          size="small"
                          type="number"
                          name="CombustedFood"
                          value={formik?.values?.CombustedFood}
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldValue(
                              'CombustedFoodEmission',
                              Number(0.05 * Number(e.target.value)).toFixed(5)
                            );
                            formik.handleSubmit();
                          }}
                          inputProps={{ style: { color: 'white' } }}
                        />
                      </td>
                      <td className="ps-2 py-1">
                        <TextField
                          size="small"
                          type="number"
                          name="CombustedFoodEmission"
                          value={formik?.values?.CombustedFoodEmission}
                          onChange={formik.handleChange}
                          disabled
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="ps-2 py-1">Composted</td>
                      <td className="ps-2 py-1">
                        <TextField
                          size="small"
                          type="number"
                          name="CompostedFood"
                          value={formik?.values?.CompostedFood}
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldValue(
                              'CompostedFoodEmission',
                              Number(0.11 * Number(e.target.value)).toFixed(5)
                            );
                            formik.handleSubmit();
                          }}
                          inputProps={{ style: { color: 'white' } }}
                        />
                      </td>
                      <td className="ps-2 py-1">
                        <TextField
                          size="small"
                          type="number"
                          name="CompostedFoodEmission"
                          value={formik?.values?.CompostedFoodEmission}
                          onChange={formik.handleChange}
                          disabled
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </Box>
              {/* <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 5 }}> */}
              {/* <Grid item xs={12} sm={12} md={6}>

                  <Box>

                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th className="ps-2">Food Type </th>
                          <th className="ps-2">Waste Weight (Kgs)</th>
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Beef (beef herd)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="BeefHerd"
                              value={formik?.values?.BeefHerd}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'BeefHerdEmission',
                                  Number(99.48 * Number(e?.target?.value)).toFixed(5)
                                );
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
                              name="BeefHerdEmission"
                              value={formik?.values?.BeefHerdEmission}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Beef (dairy herd)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="dairyHerd"
                              value={formik?.values?.dairyHerd}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'dairyHerdEmission',
                                  Number(33.3 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="dairyHerdEmission"
                              value={formik?.values?.dairyHerdEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>

                        <tr>
                          <td className="ps-2 py-1">Lamb & Mutton</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="lambMutton"
                              value={formik?.values?.lambMutton}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'lambMuttonEmission',
                                  Number(39.72 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="lambMuttonEmission"
                              value={formik?.values?.lambMuttonEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Poultry Meat</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="poultryMeat"
                              value={formik?.values?.poultryMeat}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'poultryMeatEmission',
                                  Number(9.87 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="poultryMeatEmission"
                              value={formik?.values?.poultryMeatEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Fish (farmed)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="fishFrame"
                              value={formik?.values?.fishFrame}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'fishFrameEmission',
                                  Number(13.63 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="fishFrameEmission"
                              value={formik?.values?.fishFrameEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Prawns (farmed)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="PrawnsFrame"
                              value={formik?.values?.PrawnsFrame}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'PrawnsFrameEmission',
                                  Number(26.87 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="PrawnsFrameEmission"
                              value={formik?.values?.PrawnsFrameEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Eggs</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="Eggs"
                              value={formik?.values?.Eggs}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue('EggsEmission', Number(4.67 * Number(e.target.value)).toFixed(5));
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="EggsEmission"
                              value={formik?.values?.EggsEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box mt={1}>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th className="ps-2">Food Type </th>
                          <th className="ps-2">Waste Weight (Kgs)</th>
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Cheese</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="Cheese"
                              value={formik?.values?.Cheese}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'CheeseEmission',
                                  Number(23.88 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="CheeseEmission"
                              value={formik?.values?.CheeseEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Rice</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="Rice"
                              value={formik?.values?.Rice}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue('RiceEmission', Number(4.45 * Number(e.target.value)).toFixed(5));
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="RiceEmission"
                              value={formik?.values?.RiceEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Other Pulses</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="OtherPulses"
                              value={formik?.values?.OtherPulses}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'OtherPulsesEmission',
                                  Number(1.79 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="OtherPulsesEmission"
                              value={formik?.values?.OtherPulsesEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Wheat & Rye</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="wheatRye"
                              value={formik?.values?.wheatRye}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'wheatRyeEmission',
                                  Number(1.57 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="wheatRyeEmission"
                              value={formik?.values?.wheatRyeEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Other Fruit</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="otherFruits"
                              value={formik?.values?.otherFruits}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'otherFruitsEmission',
                                  Number(1.05 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="otherFruitsEmission"
                              value={formik?.values?.otherFruitsEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Other Vegetables</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="otherVegetables"
                              value={formik?.values?.otherVegetables}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'otherVegetablesEmission',
                                  Number(0.53 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="otherVegetablesEmission"
                              value={formik?.values?.otherVegetablesEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Root Vegetables</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="rootVegetables"
                              value={formik?.values?.rootVegetables}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  'rootVegetablesEmission',
                                  Number(0.43 * Number(e.target.value)).toFixed(5)
                                );
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="rootVegetablesEmission"
                              value={formik?.values?.rootVegetablesEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Box>
                </Grid> */}
              <Grid item xs={12} sm={12} md={12}>
                <Box>
                  <Typography variant="h4" className="text-center text-white mb-4 mt-4">
                    PET Water Bottle
                  </Typography>
                  <div className="table-responsive">
                    <table className="table-custom-inpt-field">
                      <tr>
                        <th width="110px" />
                        <th className="ps-3">No. of Bottles</th>
                        <th className="ps-2">Emissions</th>
                      </tr>
                      <tr>
                        <td className="ps-2 py-1">500ml (If Recycled)</td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="Recycled"
                            value={formik?.values?.Recycled}
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setFieldValue(
                                'RecycledEmission',
                                Number(Number(e.target.value) * 0.1097).toFixed(5)
                              );
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
                            name="RecycledEmission"
                            value={formik?.values?.RecycledEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-2 py-1">500ml (If Landfilled)</td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="Landfilled"
                            value={formik?.values?.Landfilled}
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setFieldValue(
                                'LandfilledEmission',
                                Number(Number(e.target.value) * 0.122).toFixed(5)
                              );
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="LandfilledEmission"
                            value={formik?.values?.LandfilledEmission}
                            onChange={formik.handleChange}
                            disabled
                          />
                        </td>
                      </tr>
                      {/* <tr>
                          <td className="ps-2 py-1">PVC</td>
                          <td className="ps-3 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="pvcKg"
                              value={formik?.values?.pvcKg}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue('pvcEmission', Number(Number(e.target.value) * 0.02).toFixed(5));
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="pvcEmission"
                              value={formik?.values?.pvcEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr> */}
                    </table>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                <Stack columnGap={2} rowGap={2} className="flex-xl-row flex-md-row flex-sm-column">
                  <Button
                    variant="contained"
                    onClick={() => {
                      // formik.handleSubmit();
                      handleSaveToDb();
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
                      // formik.handleSubmit();
                      handleSaveToDb();
                      setValue(value + 1);
                    }}
                    className="custom-btn"
                    endIcon={<FaAngleDoubleRight />}
                  >
                    Save and Next Page
                  </Button>
                  {/* <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button> */}
                  {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
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
                <Typography color="white">
                  {`Total Waste Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e
                </Typography>
              </Grid>
              {/* </Grid> */}
            </Box>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default Waste;

// import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
// import { useFormik } from 'formik';
// import { useEffect } from 'react';
// import { useTheme } from '@emotion/react';
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { addWasteData, deleteWasteData } from '../../redux/slice/totalWasteSlice';
// import { addResultTableData, deleteResTabWasteData, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
// import { IconDiv } from '../../components/IconDiv';
// import WasteImg from '../../assets/Waste.png';
// import useEventData from '../../hooks/useEventData';

// const Waste = (props) => {
//     const { setValue, value } = props;
//     const theme = useTheme();
//     const dispatch = useDispatch();
//     const allData = useSelector((state) => state?.totalWasteDetails?.data?.[0]?.data);
//     const totalEmission = useSelector((state) => state?.totalWasteDetails?.totalEmission);
//     const resultTableData = useSelector(state => state?.resultTableDataDetails);
//     const eventsData = useEventData();

//     // -----------   initialValues
//     const initialValues = {
//         foodWasteNonMeatKg: '',
//         foodWasteMeatKg: '',
//         // municipalSolidWasteKg: '',
//         foodWasteMixKg: '',
//         fruitVegetablesKg: '',
//         foodWasteNonMeatEmission: '',
//         foodWasteMeatEmission: '',
//         // municipalSolidWasteEmission: '',
//         foodWasteMixEmission: '',
//         fruitVegetablesEmission: '',

//         bottleOne: '',
//         bottleTwo: '',
//         bottleThree: '',
//         bottleOneEmission: '',
//         bottleTwoEmission: '',
//         bottleThreeEmission: '',
//         // plasticWrapping: '',
//         // plasticWrappingEmission: '',

//         woodKg: '',
//         carpetKg: '',
//         pvcKg: '',
//         woodEmission: '',
//         carpetEmission: '',
//         pvcEmission: '',

//         // hdpeBanner: 0,
//         // pvcBanners: 0,
//         // cottonBanner: 0,
//         // plasticBadgeHolders: 0,
//         // hdpeBannerEmission: 0,
//         // pvcBannersEmission: 0,
//         // cottonBannerEmission: 0,
//         // plasticBadgeHoldersEmission: 0,

//         // colouredBrochurePage: 0,
//         // paperBagsA4Size: 0,
//         // paperBagsA5Size: 0,
//         // juteBagsA4Size: 0,
//         // cottonBagsA4Size: 0,
//         // colouredBrochurePageEmission: 0,
//         // paperBagsA4SizeEmission: 0,
//         // paperBagsA5SizeEmission: 0,
//         // juteBagsA4SizeEmission: 0,
//         // cottonBagsA4SizeEmission: 0,
//     };

//     const formik = useFormik({
//         initialValues,
//         onSubmit: async (values) => {
//             const foodWasteNonMeatEmission = Number(0.74 * Number(values?.foodWasteNonMeatKg)).toFixed(5);
//             const foodWasteMeatEmission = Number(0.76 * Number(values?.foodWasteMeatKg)).toFixed(5);
//             // const municipalSolidWasteEmission = Number(0.902 * Number(values?.municipalSolidWasteKg)).toFixed(5);
//             const foodWasteMixEmission = Number(0.75 * Number(values?.foodWasteMixKg)).toFixed(5);
//             const fruitVegetablesEmission = Number(0.31 * Number(values?.fruitVegetablesKg)).toFixed(5);
//             const bottleOneEmission = Number(Number(values?.bottleOne) * 6.42 * 0.022).toFixed(5);
//             const bottleTwoEmission = Number(Number(values?.bottleTwo) * 13 * 0.022).toFixed(5);
//             const bottleThreeEmission = Number(Number(values?.bottleThree) * 21.5 * 0.022).toFixed(5);
//             // const plasticWrappingEmission = Number(Number(values?.plasticWrapping) * 1 * 7.83).toFixed(5);

//             const woodEmission = Number(Number(values?.woodKg) * 1.33).toFixed(5);
//             const carpetEmission = Number(Number(values?.carpetKg) * 0.2).toFixed(5);
//             const pvcEmission = Number(Number(values?.pvcKg) * 1 * 0.02).toFixed(5);

//             if (foodWasteNonMeatEmission > 0) formik.setFieldValue('foodWasteNonMeatEmission', foodWasteNonMeatEmission);
//             if (foodWasteMeatEmission > 0) formik.setFieldValue('foodWasteMeatEmission', foodWasteMeatEmission);
//             // if (municipalSolidWasteEmission > 0) formik.setFieldValue('municipalSolidWasteEmission', municipalSolidWasteEmission);
//             if (foodWasteMixEmission > 0) formik.setFieldValue('foodWasteMixEmission', foodWasteMixEmission);
//             if (fruitVegetablesEmission > 0) formik.setFieldValue('fruitVegetablesEmission', fruitVegetablesEmission);

//             if (bottleOneEmission > 0) formik.setFieldValue('bottleOneEmission', bottleOneEmission);
//             if (bottleTwoEmission > 0) formik.setFieldValue('bottleTwoEmission', bottleTwoEmission);
//             if (bottleThreeEmission > 0) formik.setFieldValue('bottleThreeEmission', bottleThreeEmission);

//             if (woodEmission > 0) formik.setFieldValue('woodEmission', woodEmission);
//             if (carpetEmission > 0) formik.setFieldValue('carpetEmission', carpetEmission);
//             if (pvcEmission > 0) formik.setFieldValue('pvcEmission', pvcEmission);

//             // if (plasticWrappingEmission > 0) formik.setFieldValue('plasticWrappingEmission', plasticWrappingEmission);
//             // formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(values?.hdpeBanner)).toFixed(5));
//             // formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(values?.pvcBanners)).toFixed(5));
//             // formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(values?.cottonBanner)).toFixed(5));
//             // formik.setFieldValue('colouredBrochurePageEmission', Number(1.56 * Number(values?.colouredBrochurePage)).toFixed(5));
//             // formik.setFieldValue('paperBagsA4SizeEmission', Number(0.3125 * Number(values?.paperBagsA4Size)).toFixed(5));
//             // formik.setFieldValue('paperBagsA5SizeEmission', Number(0.125 * Number(values?.paperBagsA5Size)).toFixed(5));
//             // formik.setFieldValue('juteBagsA4SizeEmission', Number(0.73 * Number(values?.juteBagsA4Size)).toFixed(5));
//             // formik.setFieldValue('cottonBagsA4SizeEmission', Number(17 * Number(values?.cottonBagsA4Size)).toFixed(5));

//             const data = [
//                 {
//                     type: 'FoodWasteNonMeat',
//                     foodWasteNonMeatKg: values?.foodWasteNonMeatKg,
//                     emission: foodWasteNonMeatEmission > 0 ? foodWasteNonMeatEmission : '',
//                 },
//                 {
//                     type: 'FoodWasteMeat',
//                     foodWasteMeatKg: values?.foodWasteMeatKg,
//                     emission: foodWasteMeatEmission > 0 ? foodWasteMeatEmission : '',
//                 },
//                 // {
//                 //     type: 'MunicipalSolidWaste',
//                 //     municipalSolidWasteKg: values?.municipalSolidWasteKg,
//                 //     emission: municipalSolidWasteEmission > 0 ? municipalSolidWasteEmission : '',
//                 // },
//                 {
//                     type: 'FoodWasteMixWaste',
//                     foodWasteMixKg: values?.foodWasteMixKg,
//                     emission: foodWasteMixEmission > 0 ? foodWasteMixEmission : '',
//                 },
//                 {
//                     type: 'FruitWaste',
//                     fruitVegetablesKg: values?.fruitVegetablesKg,
//                     emission: fruitVegetablesEmission > 0 ? fruitVegetablesEmission : '',
//                 },
//                 {
//                     type: '250ml',
//                     bottleOne: values?.bottleOne,
//                     emission: bottleOneEmission > 0 ? bottleOneEmission : '',
//                 },
//                 {
//                     type: '500ml',
//                     bottleTwo: values?.bottleTwo,
//                     emission: bottleTwoEmission > 0 ? bottleTwoEmission : '',
//                 },
//                 {
//                     type: '1000ml',
//                     bottleThree: values?.bottleThree,
//                     emission: bottleThreeEmission > 0 ? bottleThreeEmission : '',
//                 },
//                 // {
//                 //     type: 'PlasticWrapping',
//                 //     plasticWrapping: values?.plasticWrapping,
//                 //     emission: plasticWrappingEmission > 0 ? plasticWrappingEmission : '',
//                 // },
//                 // {
//                 //     type: 'PolyethyleneHDPEBanner',
//                 //     hdpeBanner: values?.hdpeBanner,
//                 //     emission: Number((3.11 * values?.hdpeBanner).toFixed(5)) || 0,
//                 // },
//                 // {
//                 //     type: 'PVCBanners',
//                 //     pvcBanners: values?.pvcBanners,
//                 //     emission: Number((7.83 * values?.pvcBanners).toFixed(5)) || 0,
//                 // },
//                 // {
//                 //     type: 'CottonBanner',
//                 //     cottonBanner: values?.cottonBanner,
//                 //     emission: Number((14.5 * values?.cottonBanner).toFixed(5)) || 0,
//                 // },
//                 // {
//                 //     type: 'PlasticBadgeHolders',
//                 //     plasticBadgeHolders: values?.plasticBadgeHolders,
//                 //     emission: Number((4.2 * values?.plasticBadgeHolders).toFixed(5)) || 0,
//                 // },
//                 // {
//                 //     type: 'ColouredBrochurePage',
//                 //     colouredBrochurePage: values?.colouredBrochurePage,
//                 //     emission: Number((1.56 * values?.colouredBrochurePage).toFixed(5)) || 0,
//                 // },
//                 // {
//                 //     type: 'PaperBagsA4Size',
//                 //     paperBagsA4Size: values?.paperBagsA4Size,
//                 //     emission: Number((0.3125 * values?.paperBagsA4Size).toFixed(5)) || 0,
//                 // },
//                 // {
//                 //     type: 'PaperBagsA5Size',
//                 //     paperBagsA5Size: values?.paperBagsA5Size,
//                 //     emission: Number((0.125 * values?.paperBagsA5Size).toFixed(5)) || 0,
//                 // },
//                 // {
//                 //     type: 'JuteBagsA4Size',
//                 //     juteBagsA4Size: values?.juteBagsA4Size,
//                 //     emission: Number((0.73 * values?.juteBagsA4Size).toFixed(5)) || 0,
//                 // },
//                 // {
//                 //     type: 'CottonBagsA4Size',
//                 //     cottonBagsA4Size: values?.cottonBagsA4Size,
//                 //     emission: Number((17 * values?.cottonBagsA4Size).toFixed(5)) || 0,
//                 // },
//                 {
//                     type: 'Wood',
//                     woodKg: values?.woodKg,
//                     emission: woodEmission > 0 ? woodEmission : '',
//                 },
//                 {
//                     type: 'Carpet',
//                     carpetKg: values?.carpetKg,
//                     emission: carpetEmission > 0 ? carpetEmission : '',
//                 },
//                 {
//                     type: 'PVC',
//                     pvcKg: values?.pvcKg,
//                     emission: pvcEmission > 0 ? pvcEmission : '',
//                 },
//             ];
//             dispatch(addWasteData({ data }));

//             const tableData = [
//                 {
//                     subType: "Food Waste",
//                     subTypeData: {
//                         th: ["", "Kgs", "Emissions"],
//                         td: [
//                             {
//                                 wsType: "Food Waste (non-meat)",
//                                 kgs: values?.foodWasteNonMeatKg,
//                                 emissions: foodWasteNonMeatEmission > 0 ? foodWasteNonMeatEmission : ''
//                             },
//                             {
//                                 wsType: "Food Waste (meat)",
//                                 kgs: values?.foodWasteMeatKg,
//                                 emissions: foodWasteMeatEmission > 0 ? foodWasteMeatEmission : ''
//                             },
//                             // {
//                             //     wsType: "Municipal Solid Waste",
//                             //     kgs: values?.municipalSolidWasteKg,
//                             //     emissions: municipalSolidWasteEmission > 0 ? municipalSolidWasteEmission : ''
//                             // },
//                             {
//                                 wsType: "Food Waste (All mix)",
//                                 kgs: values?.foodWasteMixKg,
//                                 emissions: foodWasteMixEmission > 0 ? foodWasteMixEmission : ''
//                             },
//                             {
//                                 wsType: "Fruits & Vegetables",
//                                 kgs: values?.fruitVegetablesKg,
//                                 emissions: fruitVegetablesEmission > 0 ? fruitVegetablesEmission : ''
//                             },
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Plastic Waste",
//                     subTypeData: {
//                         th: ["", "No. of PET bottles", "Emissions"],
//                         td: [
//                             {
//                                 wsType: "250ml",
//                                 bottle: values?.bottleOne,
//                                 emissions: bottleOneEmission > 0 ? bottleOneEmission : ''
//                             },
//                             {
//                                 wsType: "500ml",
//                                 bottle: values?.bottleTwo,
//                                 emissions: bottleTwoEmission > 0 ? bottleTwoEmission : ''
//                             },
//                             {
//                                 wsType: "1000ml",
//                                 bottle: values?.bottleThree,
//                                 emissions: bottleThreeEmission > 0 ? bottleThreeEmission : ''
//                             },
//                             // {
//                             //     wsType: "Plastic Wrapping",
//                             //     bottle: values?.plasticWrapping,
//                             //     emissions: plasticWrappingEmission > 0 ? plasticWrappingEmission : ''
//                             // },
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Event Waste",
//                     subTypeData: {
//                         th: ["", "Kgs", "Emissions"],
//                         td: [
//                             {
//                                 wsType: "Wood",
//                                 kgs: values?.woodKg,
//                                 emissions: woodEmission > 0 ? woodEmission : ''
//                             },
//                             {
//                                 wsType: "Carpet",
//                                 kgs: values?.carpetKg,
//                                 emissions: carpetEmission > 0 ? carpetEmission : ''
//                             },
//                             {
//                                 wsType: "PVC",
//                                 kgs: values?.pvcKg,
//                                 emissions: pvcEmission > 0 ? pvcEmission : ''
//                             },
//                             // {
//                             //     wsType: "Plastic Wrapping",
//                             //     bottle: values?.plasticWrapping,
//                             //     emissions: plasticWrappingEmission > 0 ? plasticWrappingEmission : ''
//                             // },
//                         ]
//                     },
//                     // scope: 3
//                 },
//             ];

//             dispatch(addResultTableData({ from: "f2fEvent", data: tableData, tabTitle: "Waste" }));
//         },
//     });

//     const handeleDelete = () => {
//         dispatch(deleteWasteData());
//         dispatch(deleteResTabWasteData());
//     };

//     const handleSaveToDb = async () => {
//         const eventData = {
//             ...eventsData,
//         };

//         if (resultTableData.eventDataId) {
//             eventData.eventDataId = resultTableData?.eventDataId;
//             const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
//             if (updateResultTableDatasToDb?.rejected?.match(resultAction)) {
//                 console.error('Failed to update data:', resultAction?.payload);
//             }
//         } else {
//             const resultAction = await dispatch(addResultTableDatasToDb(eventData));
//             if (addResultTableDatasToDb?.rejected?.match(resultAction)) {
//                 console.error('Failed to save data:', resultAction?.payload);
//             }
//         }
//     };

//     useEffect(() => {
//         if (allData?.length > 0) {
//             formik.setFieldValue('foodWasteNonMeatKg', allData?.[0]?.foodWasteNonMeatKg);
//             formik.setFieldValue('foodWasteNonMeatEmission', allData?.[0]?.emission);
//             formik.setFieldValue('foodWasteMeatKg', allData?.[1]?.foodWasteMeatKg);
//             formik.setFieldValue('foodWasteMeatEmission', allData?.[1]?.emission);
//             // formik.setFieldValue('municipalSolidWasteKg', allData?.[2]?.municipalSolidWasteKg);
//             // formik.setFieldValue('municipalSolidWasteEmission', allData?.[2]?.emission);
//             formik.setFieldValue('foodWasteMixKg', allData?.[2]?.foodWasteMixKg);
//             formik.setFieldValue('foodWasteMixEmission', allData?.[2]?.emission);
//             formik.setFieldValue('fruitVegetablesKg', allData?.[3]?.fruitVegetablesKg);
//             formik.setFieldValue('fruitVegetablesEmission', allData?.[3]?.emission);

//             formik.setFieldValue('bottleOne', allData?.[4]?.bottleOne);
//             formik.setFieldValue('bottleOneEmission', allData?.[4]?.emission);
//             formik.setFieldValue('bottleTwo', allData?.[5]?.bottleTwo);
//             formik.setFieldValue('bottleTwoEmission', allData?.[5]?.emission);
//             formik.setFieldValue('bottleThree', allData?.[6]?.bottleThree);
//             formik.setFieldValue('bottleThreeEmission', allData?.[6]?.emission);
//             // formik.setFieldValue('plasticWrapping', allData?.[6]?.plasticWrapping);
//             // formik.setFieldValue('plasticWrappingEmission', allData?.[6]?.emission);

//             formik.setFieldValue('woodKg', allData?.[7]?.woodKg);
//             formik.setFieldValue('woodEmission', allData?.[7]?.emission);
//             formik.setFieldValue('carpetKg', allData?.[8]?.carpetKg);
//             formik.setFieldValue('carpetEmission', allData?.[8]?.emission);
//             formik.setFieldValue('pvcKg', allData?.[9]?.pvcKg);
//             formik.setFieldValue('pvcEmission', allData?.[9]?.emission);

//             // formik.setFieldValue('hdpeBanner', allData?.[7]?.hdpeBanner);
//             // formik.setFieldValue('hdpeBannerEmission', allData?.[7]?.emission);
//             // formik.setFieldValue('pvcBanners', allData?.[8]?.pvcBanners);
//             // formik.setFieldValue('pvcBannersEmission', allData?.[8]?.emission);
//             // formik.setFieldValue('cottonBanner', allData?.[9]?.cottonBanner);
//             // formik.setFieldValue('cottonBannerEmission', allData?.[9]?.emission);
//             // formik.setFieldValue('plasticBadgeHolders', allData?.[10]?.plasticBadgeHolders);
//             // formik.setFieldValue('plasticBadgeHoldersEmission', allData?.[10]?.emission);

//             // formik.setFieldValue('colouredBrochurePage', allData?.[11]?.colouredBrochurePage);
//             // formik.setFieldValue('colouredBrochurePageEmission', allData?.[11]?.emission);
//             // formik.setFieldValue('paperBagsA4Size', allData?.[12]?.paperBagsA4Size);
//             // formik.setFieldValue('paperBagsA4SizeEmission', allData?.[12]?.emission);
//             // formik.setFieldValue('paperBagsA5Size', allData?.[13]?.paperBagsA5Size);
//             // formik.setFieldValue('paperBagsA5SizeEmission', allData?.[13]?.emission);
//             // formik.setFieldValue('juteBagsA4Size', allData?.[14]?.juteBagsA4Size);
//             // formik.setFieldValue('juteBagsA4SizeEmission', allData?.[14]?.emission);
//             // formik.setFieldValue('cottonBagsA4Size', allData?.[15]?.cottonBagsA4Size);
//             // formik.setFieldValue('cottonBagsA4SizeEmission', allData?.[15]?.emission);
//         }
//     }, [value]);

//     return (
//         <div>
//             <Container maxWidth>
//                 <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
//                     <Box style={{ display: 'flex', justifyContent: 'center' }}>

//                         <Box
//                             mx={useMediaQuery(theme.breakpoints.up('lg')) && 15}
//                             display={'flex'}
//                             alignItems={'center'}
//                             flexDirection={'column'}
//                         >
//                             <IconDiv>
//                                 <img src={WasteImg} alt="Waste" width={100} className='tabImgWhite' />
//                             </IconDiv>
//                             <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 5 }}>
//                                 <Grid item xs={12} sm={6} md={6}>
//                                     <Box>
//                                         <Typography variant="h4" className="text-center text-white mb-4">
//                                             Food Waste
//                                         </Typography>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th className="ps-2" />
//                                                     <th className="ps-2">Kgs</th>
//                                                     <th className="ps-2">Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Food Waste (non-meat)</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="foodWasteNonMeatKg"
//                                                             value={formik?.values?.foodWasteNonMeatKg}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('foodWasteNonMeatEmission', Number(0.74 * Number(e?.target?.value)).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             disabled
//                                                             name="foodWasteNonMeatEmission"
//                                                             value={formik?.values?.foodWasteNonMeatEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Food Waste (meat)</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="foodWasteMeatKg"
//                                                             value={formik?.values?.foodWasteMeatKg}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('foodWasteMeatEmission', Number(0.76 * Number(e.target.value)).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }} inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="foodWasteMeatEmission"
//                                                             value={formik?.values?.foodWasteMeatEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 {/* <tr>
//                                                     <td className="ps-2 py-1">Municipal Solid Waste</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="municipalSolidWasteKg"
//                                                             value={formik?.values?.municipalSolidWasteKg}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 // formik.setFieldValue('municipalSolidWasteEmission', Number(0.902 * Number(values?.municipalSolidWasteKg)).toFixed(5));
//                                                                 formik.setFieldValue('municipalSolidWasteEmission', Number(0.902 * Number(e.target.value)).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }} inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="municipalSolidWasteEmission"
//                                                             value={formik?.values?.municipalSolidWasteEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr> */}
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Food Waste (All mix)</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="foodWasteMixKg"
//                                                             value={formik?.values?.foodWasteMixKg}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('foodWasteMixEmission', Number(0.75 * Number(e.target.value)).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }} inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="foodWasteMixEmission"
//                                                             value={formik?.values?.foodWasteMixEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Fruits & Vegetables</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="fruitVegetablesKg"
//                                                             value={formik?.values?.fruitVegetablesKg}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('fruitVegetablesEmission', Number(0.31 * Number(e.target.value)).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }} inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="fruitVegetablesEmission"
//                                                             value={formik?.values?.fruitVegetablesEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} md={6}>
//                                     <Box>
//                                         <Typography variant="h4" className="text-center text-white mb-4">
//                                             Plastic Waste
//                                         </Typography>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th />
//                                                     <th className="ps-3">No. of PET bottles</th>
//                                                     <th className="ps-2">Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">250ml</td>
//                                                     <td className="ps-3 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="bottleOne"
//                                                             value={formik?.values?.bottleOne}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('bottleOneEmission', Number(Number(e.target.value) * 6.42 * 0.022).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }} inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             disabled
//                                                             name="bottleOneEmission"
//                                                             value={formik?.values?.bottleOneEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">500ml</td>
//                                                     <td className="ps-3 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="bottleTwo"
//                                                             value={formik?.values?.bottleTwo}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('bottleTwoEmission', Number(Number(e.target.value) * 13 * 0.022).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="bottleTwoEmission"
//                                                             value={formik?.values?.bottleTwoEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">1000ml</td>
//                                                     <td className="ps-3 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="bottleThree"
//                                                             value={formik?.values?.bottleThree}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('bottleThreeEmission', Number(Number(e.target.value) * 21.5 * 0.022).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }} inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="bottleThreeEmission"
//                                                             value={formik?.values?.bottleThreeEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 {/* <tr>
//                                                     <td className="ps-2 py-1">Plastic Wrapping</td>
//                                                     <td className="ps-3 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="plasticWrapping"
//                                                             value={formik?.values?.plasticWrapping}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 // formik.setFieldValue('plasticWrappingEmission', Number(Number(values?.plasticWrapping) * 1 * 7.83).toFixed(5));
//                                                                 formik.setFieldValue('plasticWrappingEmission', Number(Number(e.target.value) * 1 * 7.83).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="plasticWrappingEmission"
//                                                             value={formik?.values?.plasticWrappingEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr> */}

//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} md={6}>
//                                     <Box>
//                                         <Typography variant="h4" className="text-center text-white mb-4">
//                                             Event Waste
//                                         </Typography>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th width="110px" />
//                                                     <th className="ps-3">Kgs</th>
//                                                     <th className="ps-2">Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Wood</td>
//                                                     <td className="ps-3 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="woodKg"
//                                                             value={formik?.values?.woodKg}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('woodEmission', Number(Number(e.target.value) * 1.33).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }} inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             disabled
//                                                             name="woodEmission"
//                                                             value={formik?.values?.woodEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Carpet</td>
//                                                     <td className="ps-3 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="carpetKg"
//                                                             value={formik?.values?.carpetKg}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('carpetEmission', Number(Number(e.target.value) * 13 * 0.2).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="carpetEmission"
//                                                             value={formik?.values?.carpetEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">PVC</td>
//                                                     <td className="ps-3 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="pvcKg"
//                                                             value={formik?.values?.pvcKg}
//                                                             onChange={(e) => {
//                                                                 formik.handleChange(e);
//                                                                 formik.setFieldValue('pvcEmission', Number(Number(e.target.value) * 0.02).toFixed(5));
//                                                                 formik.handleSubmit();
//                                                             }} inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="pvcEmission"
//                                                             value={formik?.values?.pvcEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>
//                                 {/* <Grid item xs={12} sm={6} md={6}>
//                                     <Box>
//                                         <Typography variant="h4" className="text-center text-white mb-4">
//                                             Marketing
//                                         </Typography>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th className="ps-2">Branding</th>
//                                                     <th className="ps-2">In Kgs</th>
//                                                     <th className="ps-2">Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Polyethylene HDPE Banner</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="hdpeBanner"
//                                                             value={formik?.values?.hdpeBanner}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('hdpeBanner', e.target.value);
//                                                                 // formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(values?.hdpeBanner)).toFixed(5));
//                                                                 formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(e.target.value)).toFixed(5));
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             disabled
//                                                             name="hdpeBannerEmission"
//                                                             value={formik?.values?.hdpeBannerEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">PVC Banners</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="pvcBanners"
//                                                             value={formik?.values?.pvcBanners}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('pvcBanners', e.target.value);
//                                                                 // formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(values?.pvcBanners)).toFixed(5));
//                                                                 formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(e.target.value)).toFixed(5));
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="pvcBannersEmission"
//                                                             value={formik?.values?.pvcBannersEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Cotton Banner</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="cottonBanner"
//                                                             value={formik?.values?.cottonBanner}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('cottonBanner', e.target.value);
//                                                                 // formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(values?.cottonBanner)).toFixed(5));
//                                                                 formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(e.target.value)).toFixed(5));
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="cottonBannerEmission"
//                                                             value={formik?.values?.cottonBannerEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Plastic Badge Holders (Polycorbonate)</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="plasticBadgeHolders"
//                                                             value={formik?.values?.plasticBadgeHolders}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('plasticBadgeHolders', e.target.value);
//                                                                 formik.setFieldValue('plasticBadgeHoldersEmission', Number(4.2 * Number(e.target.value)).toFixed(5));
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="plasticBadgeHoldersEmission"
//                                                             value={formik?.values?.plasticBadgeHoldersEmission}
//                                                             onChange={formik.handleChange}
//                                                             disabled
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} md={6}>
//                                     <Box>
//                                         <Typography variant="h4" className="text-center text-white mb-4">
//                                             Branding
//                                         </Typography>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th>Brand Promotional</th>
//                                                     <th className="ps-2">No. of Units</th>
//                                                     <th className="ps-2">Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Printing a Coloured Brochure/ Page (&gt;130 GSM)</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="colouredBrochurePage"
//                                                             value={formik?.values?.colouredBrochurePage}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('colouredBrochurePage', e.target.value);
//                                                                 formik.setFieldValue('colouredBrochurePageEmission', Number(1.56 * Number(e.target.value)).toFixed(5));
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             disabled
//                                                             name="colouredBrochurePageEmission"
//                                                             value={formik?.values?.colouredBrochurePageEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Giveaway Paper bags (200 GSM)- A4 Size</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="paperBagsA4Size"
//                                                             value={formik?.values?.paperBagsA4Size}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('paperBagsA4Size', e.target.value);
//                                                                 formik.setFieldValue('paperBagsA4SizeEmission', Number(0.3125 * Number(e.target.value)).toFixed(5));
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             disabled
//                                                             name="paperBagsA4SizeEmission"
//                                                             value={formik?.values?.paperBagsA4SizeEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Giveaway Paper bags (200 GSM)- A5 Size</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="paperBagsA5Size"
//                                                             value={formik?.values?.paperBagsA5Size}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('paperBagsA5Size', e.target.value);
//                                                                 formik.setFieldValue('paperBagsA5SizeEmission', Number(0.125 * Number(e.target.value)).toFixed(5));
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             disabled
//                                                             name="paperBagsA5SizeEmission"
//                                                             value={formik?.values?.paperBagsA5SizeEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Giveaway Jute bags*- A4 Size</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="juteBagsA4Size"
//                                                             value={formik?.values?.juteBagsA4Size}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('juteBagsA4Size', e.target.value);
//                                                                 formik.setFieldValue('juteBagsA4SizeEmission', Number(0.73 * Number(e.target.value)).toFixed(5));
//                                                             }}
//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             disabled
//                                                             name="juteBagsA4SizeEmission"
//                                                             value={formik?.values?.juteBagsA4SizeEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Giveaway Cotton bags- A4 Size</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="cottonBagsA4Size"
//                                                             value={formik?.values?.cottonBagsA4Size}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('cottonBagsA4Size', e.target.value);
//                                                                 formik.setFieldValue('cottonBagsA4SizeEmission', Number(17 * Number(e.target.value)).toFixed(5));
//                                                             }}

//                                                             inputProps={{ style: { color: 'white' } }}
//                                                         />
//                                                     </td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             disabled
//                                                             name="cottonBagsA4SizeEmission"
//                                                             value={formik?.values?.cottonBagsA4SizeEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid> */}
//                                 <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
//                                     <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
//                                         <Button
//                                             variant="contained"
//                                             onClick={() => {
//                                                 // formik.handleSubmit();
//                                                 handleSaveToDb();
//                                                 setValue(value - 1);
//                                             }}
//                                             startIcon={<FaAngleDoubleLeft />}
//                                             className="custom-btn"
//                                         >
//                                             Save and Previous Page
//                                         </Button>
//                                         <Button
//                                             variant="contained"
//                                             onClick={() => {
//                                                 // formik.handleSubmit();
//                                                 handleSaveToDb();
//                                                 setValue(value + 1);
//                                             }}
//                                             className="custom-btn"
//                                             endIcon={<FaAngleDoubleRight />}
//                                         >

//                                             Save and Next Page
//                                         </Button>
//                                         {/* <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button> */}
//                                         {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
//                                         <Button
//                                             variant="outlined"
//                                             onClick={() => {
//                                                 formik.resetForm();
//                                                 handeleDelete();
//                                             }}
//                                             color="error"

//                                         >
//                                             Clear
//                                         </Button>
//                                     </Stack>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={12} marginTop={3}>
//                                     <Typography color="white">{`Total Waste Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Box>
//                 </Card>
//             </Container>
//         </div>
//     );
// };

// export default Waste;
