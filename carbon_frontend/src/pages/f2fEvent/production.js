import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addProductionData, deleteProductionData } from '../../redux/slice/totalProductionSlice';
import {
  addResultTableData,
  deleteResTabProductionData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';
import ProductionImg from '../../assets/production.png';
import { IconDiv } from '../../components/IconDiv';
import useEventData from '../../hooks/useEventData';

const Production = (props) => {
  const { setValue, value } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const allData = useSelector((state) => state?.totalProductionDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalProductionDetails?.totalEmission);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  const eventsData = useEventData();

  const fieldDataOne = [
    { name: 'Ply Wood', ef: 862.9, fieldName: 'sawnTimber' },
    { name: 'MDF', ef: 1292.82, fieldName: 'mdf' },
    // { name: 'Open Panel Timber Frame', ef: 0.345, fieldName: 'openPanelTimberFrame' },
    // { name: 'Carpet ', ef: 6.7, fieldName: 'carpet' },
    // { name: 'Adhesive Vinyl', ef: 3.1, fieldName: 'adhesiveVinyl' },
    // { name: 'Cardboard', ef: 0.94, fieldName: 'cardboard' },
    // { name: 'Nylon', ef: 12.7, fieldName: 'nylon' },
  ];
  const fieldDataTwo = [
    // { name: 'Wood', ef: 1.8, fieldName: 'wood' },
    { name: 'Aluminium', ef: 20.88, fieldName: 'aluminium' },
    { name: 'Steel ', ef: 2.55, fieldName: 'steel' },
    // { name: 'Iron', ef: 0.64, fieldName: 'iron' },
    // { name: 'Paper', ef: 0.0005, fieldName: 'paper' },
    // { name: 'Recycled Paper', ef: 0.02, fieldName: 'recycledPaper' },
    // { name: 'Paint ', ef: 1.15, fieldName: 'paint' },
  ];
  const fieldDataThree = [
    { name: 'Projector', ef: 0.215, fieldName: 'projector' },
    { name: 'LED Screen Panel (500mmx500mm)', ef: 0.043, fieldName: 'ledScreenPanel' },
  ];
  const fieldDataFour = [{ name: 'Electricity', ef: 0.716, fieldName: 'electricity' }];

  const fieldDataFive = [
    // { name: 'Polyethylene HDPE Banner', ef: 3.11, fieldName: 'hdpeBanner' },
    { name: 'Polyethylene Banner', ef: 3.11, fieldName: 'hdpeBanner' },
    { name: 'PVC Banners', ef: 7.83, fieldName: 'pvcBanners' },
    { name: 'Cotton Banner', ef: 14.5, fieldName: 'cottonBanner' },
    { name: 'Plastic Badge Holders (Polycorbonate)', ef: 4.2, fieldName: 'plasticBadgeHolders' },
  ];

  const fieldDataSix = [
    { name: 'Printing a Coloured Brochure/ Page (<130 GSM)', ef: 1.56, fieldName: 'juteCarpet' },
    { name: 'Giveaway Paper bags (200 GSM)- A4 Size', ef: 0.3125, fieldName: 'wooden' },
    { name: 'Giveaway Paper bags (200 GSM)- A5 Size', ef: 0.125, fieldName: 'pvcFlooring' },
    { name: 'Giveaway Jute bags*- A4 Size', ef: 0.73, fieldName: 'juteBagsA4Size' },
    { name: 'Giveaway Cotton bags- A4 Size', ef: 17, fieldName: 'cottonBagsA4Size' },
  ];

  const initialValues = {
    sawnTimberArea: '',
    sawnTimberEmission: '',
    mdfArea: '',
    mdfEmission: '',
    openPanelTimberFrameArea: '',
    openPanelTimberFrameEmission: '',
    carpetArea: '',
    carpetEmission: '',
    adhesiveVinylArea: '',
    adhesiveVinylEmission: '',
    cardboardArea: '',
    cardboardEmission: '',
    nylonArea: '',
    nylonEmission: '',
    woodKgs: '',
    woodEmission: '',
    steelKgs: '',
    steelEmission: '',
    aluminiumKgs: '',
    aluminiumEmission: '',
    ironKgs: '',
    ironEmission: '',
    paperKgs: '',
    paperEmission: '',
    recycledPaperKgs: '',
    recycledPaperEmission: '',
    paintKgs: '',
    paintEmission: '',
    projectorNoOfHour: '',
    projectorNoOfDevice: '',
    projectorEmission: '',
    ledScreenPanelNoOfHour: '',
    ledScreenPanelNoOfDevice: '',
    ledScreenPanelEmission: '',
    kwh: '',
    kwhEmission: '',

    hdpeBanner: '',
    pvcBanners: '',
    cottonBanner: '',
    plasticBadgeHolders: '',
    hdpeBannerEmission: '',
    pvcBannersEmission: '',
    cottonBannerEmission: '',
    plasticBadgeHoldersEmission: '',

    juteCarpet: '',
    wooden: '',
    pvcFlooring: '',
    juteBagsA4Size: '',
    cottonBagsA4Size: '',
    juteCarpetEmissions: '',
    WoddenEmissions: '',
    pvcFlooringEmission: '',
    juteBagsA4SizeEmission: '',
    cottonBagsA4SizeEmission: '',

    // my add
    cottenBages: '',
    cottenBagesEmission: '',
    Jutebags: '',
    JutebagsEmission: '',
    Paperbags: '',
    PaperbagsEmission: '',
    Recycledpaperbags: '',
    RecycledpaperbagsEmission: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const sawnTimberEmission = values?.sawnTimberArea === 0 ? 0 : Number((values?.sawnTimberArea * 862.9).toFixed(5));
      const mdfEmission = values?.mdfArea === 0 ? 0 : Number((values?.mdfArea * 1292.82).toFixed(5));
      const openPanelTimberFrameEmission =
        values?.openPanelTimberFrameArea === 0 ? 0 : Number((values?.openPanelTimberFrameArea * 0.345).toFixed(5));
      const carpetEmission = values?.carpetArea === 0 ? 0 : Number((values?.carpetArea * 6.7).toFixed(5));
      const adhesiveVinylEmission =
        values?.adhesiveVinylArea === 0 ? 0 : Number((values?.adhesiveVinylArea * 3.1).toFixed(5));
      const cardboardEmission = values?.cardboardArea === 0 ? 0 : Number((values?.cardboardArea * 0.94).toFixed(5));
      const nylonEmission = values?.nylonArea === 0 ? 0 : Number((values?.nylonArea * 12.7).toFixed(5));
      const woodEmission = values?.woodKgs === 0 ? 0 : Number((values?.woodKgs * 1.8).toFixed(5));
      const steelEmission = values?.steelKgs === 0 ? 0 : Number((values?.steelKgs * 2.55).toFixed(5));
      const aluminiumEmission = values?.aluminiumKgs === 0 ? 0 : Number((values?.aluminiumKgs * 20.88).toFixed(5));
      const cottenBagesEmission = values?.cottenBages === 0 ? 0 : Number((values?.cottenBages * 0.09).toFixed(5));
      const JutebagsEmission = values?.Jutebags === 0 ? 0 : Number((values?.Jutebags * 0.03962).toFixed(5));
      const PaperbagsEmission = values?.Paperbags === 0 ? 0 : Number((values?.Paperbags * 0.28).toFixed(5));
      const RecycledpaperbagsEmission =
        values?.Recycledpaperbags === 0 ? 0 : Number((values?.Recycledpaperbags * 0.17665).toFixed(5));
      const ironEmission = values?.ironKgs === 0 ? 0 : Number((values?.ironKgs * 0.64).toFixed(5));
      const paperEmission = values?.paperKgs === 0 ? 0 : Number((values?.paperKgs * 0.0005).toFixed(5));
      const recycledPaperEmission =
        values?.recycledPaperKgs === 0 ? 0 : Number((values?.recycledPaperKgs * 0.02).toFixed(5));
      const paintEmission = values?.paintKgs === 0 ? 0 : Number((values?.paintKgs * 1.15).toFixed(5));
      const projectorEmission =
        values?.projectorNoOfHour === 0 || values?.projectorNoOfDevice === 0
          ? 0
          : Number((values?.projectorNoOfHour * values?.projectorNoOfDevice * 0.215).toFixed(5));
      const ledScreenPanelEmission =
        values?.ledScreenPanelNoOfHour === 0 || values?.ledScreenPanelNoOfDevice === 0
          ? 0
          : Number((values?.ledScreenPanelNoOfHour * values?.ledScreenPanelNoOfDevice * 0.043).toFixed(5));
      const kwhEmission = Number((values?.kwh * 0.716).toFixed(5));
      // const plasticWrappingEmission = Number(Number(values?.plasticWrapping) * 1 * 7.83).toFixed(5)
      const hdpeBannerEmission = Number(2.21 * Number(values?.hdpeBanner)).toFixed(5);
      const pvcBannersEmission = Number(2.15 * Number(values?.pvcBanners)).toFixed(5);
      const cottonBannerEmission = Number(14.5 * Number(values?.cottonBanner)).toFixed(5);
      const plasticBadgeHoldersEmission = Number(1.84 * Number(values?.plasticBadgeHolders)).toFixed(5);
      const juteCarpetEmissions = Number(7.5561 * Number(values?.juteCarpet)).toFixed(5);
      const WoddenEmissions = Number(14.6 * Number(values?.wooden)).toFixed(5);
      const pvcFlooringEmission = Number(5.8786 * Number(values?.pvcFlooring)).toFixed(5);
      const juteBagsA4SizeEmission = Number(0.73 * Number(values?.juteBagsA4Size)).toFixed(5);
      const cottonBagsA4SizeEmission = Number(17 * Number(values?.cottonBagsA4Size)).toFixed(5);

      if (sawnTimberEmission > 0) formik.setFieldValue('sawnTimberEmission', sawnTimberEmission);
      if (mdfEmission > 0) formik.setFieldValue('mdfEmission', mdfEmission);
      if (openPanelTimberFrameEmission > 0)
        formik.setFieldValue('openPanelTimberFrameEmission', openPanelTimberFrameEmission);
      if (carpetEmission > 0) formik.setFieldValue('carpetEmission', carpetEmission);
      if (adhesiveVinylEmission > 0) formik.setFieldValue('adhesiveVinylEmission', adhesiveVinylEmission);
      if (cardboardEmission > 0) formik.setFieldValue('cardboardEmission', cardboardEmission);
      if (nylonEmission > 0) formik.setFieldValue('nylonEmission', nylonEmission);
      if (JutebagsEmission > 0) formik.setFieldValue('JutebagsEmission', JutebagsEmission);
      if (cottenBagesEmission > 0) formik.setFieldValue('cottenBagesEmission', cottenBagesEmission);
      if (PaperbagsEmission > 0) formik.setFieldValue('PaperbagsEmission', PaperbagsEmission);
      if (RecycledpaperbagsEmission > 0) formik.setFieldValue('RecycledpaperbagsEmission', RecycledpaperbagsEmission);
      if (woodEmission > 0) formik.setFieldValue('woodEmission', woodEmission);
      if (steelEmission > 0) formik.setFieldValue('steelEmission', steelEmission);
      if (aluminiumEmission > 0) formik.setFieldValue('aluminiumEmission', aluminiumEmission);
      if (ironEmission > 0) formik.setFieldValue('ironEmission', ironEmission);
      if (paperEmission > 0) formik.setFieldValue('paperEmission', paperEmission);
      if (recycledPaperEmission > 0) formik.setFieldValue('recycledPaperEmission', recycledPaperEmission);
      if (paintEmission > 0) formik.setFieldValue('paintEmission', paintEmission);

      if (projectorEmission > 0) formik.setFieldValue('projectorEmission', projectorEmission);
      if (ledScreenPanelEmission > 0) formik.setFieldValue('ledScreenPanelEmission', ledScreenPanelEmission);

      if (kwhEmission > 0) formik.setFieldValue('kwhEmission', kwhEmission);

      // if (plasticWrappingEmission > 0) formik.setFieldValue('plasticWrappingEmission', plasticWrappingEmission);
      if (hdpeBannerEmission > 0) formik.setFieldValue('hdpeBannerEmission', hdpeBannerEmission);
      if (pvcBannersEmission > 0) formik.setFieldValue('pvcBannersEmission', pvcBannersEmission);
      if (cottonBannerEmission > 0) formik.setFieldValue('cottonBannerEmission', cottonBannerEmission);
      if (plasticBadgeHoldersEmission > 0)
        formik.setFieldValue('plasticBadgeHoldersEmission', plasticBadgeHoldersEmission);

      if (juteCarpetEmissions > 0) formik.setFieldValue('juteCarpetEmissions', juteCarpetEmissions);
      if (WoddenEmissions > 0) formik.setFieldValue('WoddenEmissions', WoddenEmissions);
      if (pvcFlooringEmission > 0) formik.setFieldValue('pvcFlooringEmission', pvcFlooringEmission);
      if (juteBagsA4SizeEmission > 0) formik.setFieldValue('juteBagsA4SizeEmission', juteBagsA4SizeEmission);
      if (cottonBagsA4SizeEmission > 0) formik.setFieldValue('cottonBagsA4SizeEmission', cottonBagsA4SizeEmission);

      // const dataFieldOne = fieldDataOne?.map((item) => {
      //     const emission = values?.[`${item?.fieldName}Area`] === 0 ? 0 : Number((values?.[`${item?.fieldName}Area`] * item?.ef).toFixed(5)) || 0;
      //     return {
      //         type: item?.name,
      //         area: values?.[`${item?.fieldName}Area`],
      //         emission,
      //     };
      // });

      // const dataFieldTwo = fieldDataTwo?.map((item) => {
      //     const emission = values?.[`${item?.fieldName}Kgs`] === 0 ? 0 : Number((values?.[`${item?.fieldName}Kgs`] * item?.ef).toFixed(5)) || 0;
      //     return {
      //         type: item?.name,
      //         kgs: values?.[`${item?.fieldName}Kgs`],
      //         emission,
      //     };
      // });

      // const dataFieldThree = fieldDataThree?.map((item) => {
      //     const emission = values?.[`${item?.fieldName}NoOfHour`] === 0 || values?.[`${item?.fieldName}NoOfDevice`] === 0 ? 0 : Number((values?.[`${item?.fieldName}NoOfHour`] * values?.[`${item?.fieldName}NoOfDevice`] * item?.ef).toFixed(5)) || 0;
      //     return {
      //         type: item?.name,
      //         noOfHour: values?.[`${item?.fieldName}NoOfHour`],
      //         noOfDevice: values?.[`${item?.fieldName}NoOfDevice`],
      //         emission,
      //     };
      // });

      // const dataFieldFour = fieldDataFour?.map((item) => {
      //     const emission = values?.[`${item?.fieldName}NoOfHour`] === 0 || values?.[`${item?.fieldName}NoOfLight`] === 0 ? 0 : Number((values?.[`${item?.fieldName}NoOfHour`] * values?.[`${item?.fieldName}NoOfLight`] * item?.ef).toFixed(5)) || 0;
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
          type: 'Ply Wood',
          area: values?.sawnTimberArea,
          emission: sawnTimberEmission > 0 ? sawnTimberEmission : '',
        },
        {
          type: 'MDF',
          area: values?.mdfArea,
          emission: mdfEmission > 0 ? mdfEmission : '',
        },
        // {
        //   name: 'Open Panel Timber Frame',
        //   area: values?.openPanelTimberFrameArea,
        //   emission: openPanelTimberFrameEmission > 0 ? openPanelTimberFrameEmission : '',
        // },
        // {
        //   name: 'Carpet',
        //   area: values?.carpetArea,
        //   emission: carpetEmission > 0 ? carpetEmission : '',
        // },
        // {
        //   name: 'Adhesive Vinyl',
        //   area: values?.adhesiveVinylArea,
        //   emission: adhesiveVinylEmission > 0 ? adhesiveVinylEmission : '',
        // },
        // {
        //   name: 'Cardboard',
        //   area: values?.cardboardArea,
        //   emission: cardboardEmission > 0 ? cardboardEmission : '',
        // },
        // {
        //   name: 'Nylon',
        //   area: values?.nylonArea,
        //   emission: nylonEmission > 0 ? nylonEmission : '',
        // },
        // {
        //   type: 'Wood',
        //   kgs: values?.woodKgs,
        //   emission: woodEmission > 0 ? woodEmission : '',
        // },
        {
          type: 'Aluminium',
          kgs: values?.aluminiumKgs,
          emission: aluminiumEmission > 0 ? aluminiumEmission : '',
        },
        {
          type: 'Steel ',
          kgs: values?.steelKgs,
          emission: steelEmission > 0 ? steelEmission : '',
        },
        // {
        //   type: 'Iron',
        //   kgs: values?.ironKgs,
        //   emission: ironEmission > 0 ? ironEmission : '',
        // },
        // {
        //   type: 'Paper',
        //   kgs: values?.paperKgs,
        //   emission: paperEmission > 0 ? paperEmission : '',
        // },
        // {
        //   type: 'Recycled Paper',
        //   kgs: values?.recycledPaperKgs,
        //   emission: recycledPaperEmission > 0 ? recycledPaperEmission : '',
        // },
        // {
        //   type: 'Paint',
        //   kgs: values?.paintKgs,
        //   emission: paintEmission > 0 ? paintEmission : '',
        // },
        // //
        // {
        //   type: 'Projector',
        //   noOfHour: values?.projectorNoOfHour,
        //   noOfDevice: values?.projectorNoOfDevice,
        //   emission: projectorEmission > 0 ? projectorEmission : '',
        // },
        // {
        //   type: 'LED Screen Panel (500mmx500mm)',
        //   noOfHour: values?.ledScreenPanelNoOfHour,
        //   noOfDevice: values?.ledScreenPanelNoOfDevice,
        //   emission: ledScreenPanelEmission > 0 ? ledScreenPanelEmission : '',
        // },
        // {
        //   type: 'Electricity',
        //   kwh: values?.kwh,
        //   emission: kwhEmission > 0 ? kwhEmission : '',
        // },

        {
          type: 'PVC',
          hdpeBanner: values?.hdpeBanner,
          emission: hdpeBannerEmission > 0 ? hdpeBannerEmission : '',
        },
        {
          type: 'Polyethylene HDPE',
          pvcBanners: values?.pvcBanners,
          emission: pvcBannersEmission > 0 ? pvcBannersEmission : '',
        },
        // {
        //   type: 'CottonBanner',
        //   cottonBanner: values?.cottonBanner,
        //   emission: cottonBannerEmission > 0 ? cottonBannerEmission : '',
        // },
        {
          type: 'Polyethylene LDPE',
          plasticBadgeHolders: values?.plasticBadgeHolders,
          emission: plasticBadgeHoldersEmission > 0 ? plasticBadgeHoldersEmission : '',
        },

        {
          type: 'Jute Carpet Flooring',
          juteCarpet: values?.juteCarpet,
          emission: juteCarpetEmissions > 0 ? juteCarpetEmissions : '',
        },
        {
          type: 'Wooden Flooring',
          wooden: values?.wooden,
          emission: WoddenEmissions > 0 ? WoddenEmissions : '',
        },
        {
          type: 'PVC Flooring',
          pvcFlooring: values?.pvcFlooring,
          emission: pvcFlooringEmission > 0 ? pvcFlooringEmission : '',
        },
        {
          type: 'Cotton Bags',
          cottenBages: values?.cottenBages,
          emission: cottenBagesEmission > 0 ? cottenBagesEmission : '',
        },
        {
          type: 'Jute Bags',
          Jutebags: values?.Jutebags,
          emission: JutebagsEmission > 0 ? JutebagsEmission : '',
        },
        {
          type: 'Paper Bags',
          Paperbags: values?.Paperbags,
          emission: PaperbagsEmission > 0 ? PaperbagsEmission : '',
        },
        {
          type: 'Recycled Paper Bags',
          Recycledpaperbags: values?.Recycledpaperbags,
          emission: RecycledpaperbagsEmission > 0 ? RecycledpaperbagsEmission : '',
        },
        // {
        //   type: 'JuteBagsA4Size',
        //   juteBagsA4Size: values?.juteBagsA4Size,
        //   emission: juteBagsA4SizeEmission > 0 ? juteBagsA4SizeEmission : '',
        // },
        // {
        //   type: 'CottonBagsA4Size',
        //   cottonBagsA4Size: values?.cottonBagsA4Size,
        //   emission: cottonBagsA4SizeEmission > 0 ? cottonBagsA4SizeEmission : '',
        // },
      ];

      const tableData = [
        {
          subType: 'Structural Frame Works',
          subTypeData: {
            th: ['Material Type', 'Weight (Kgs)', 'Emissions'],
            td: [
              //   {
              //     pType: 'Wood',
              //     kgs: values?.woodKgs,
              //     emissions: woodEmission > 0 ? woodEmission : '',
              //   },
              {
                pType: 'Aluminium',
                kgs: values?.aluminiumKgs,
                emissions: aluminiumEmission > 0 ? aluminiumEmission : '',
              },
              {
                pType: 'Steel',
                kgs: values?.steelKgs,
                emissions: steelEmission > 0 ? steelEmission : '',
              },
            ],
          },
        },
        {
          subType: 'Structural Frame Works',
          subTypeData: {
            th: ['Material Type', 'Area (m3)', 'Emissions'],
            td: [
              {
                pType: 'Ply Wood',
                area: values?.sawnTimberArea,
                emissions: sawnTimberEmission > 0 ? sawnTimberEmission : '',
              },
              {
                pType: 'MDF',
                area: values?.mdfArea,
                emissions: mdfEmission > 0 ? mdfEmission : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: 'Flooring Materials',
          subTypeData: {
            th: ['Material Type', 'Area (m²)', 'Emissions'],
            td: [
              {
                pType: 'Jute Carpet Flooring',
                noOfUnits: values?.juteCarpet,
                emissions: juteCarpetEmissions > 0 ? juteCarpetEmissions : '',
              },
              {
                pType: 'Wooden Flooring',
                noOfUnits: values?.wooden,
                emissions: WoddenEmissions > 0 ? WoddenEmissions : '',
              },
              {
                pType: 'PVC Flooring',
                noOfUnits: values?.pvcFlooring,
                emissions: pvcFlooringEmission > 0 ? pvcFlooringEmission : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: 'Branding Display',
          subTypeData: {
            th: ['Material Type', 'Weight (Kgs)', 'Emissions'],
            td: [
              {
                // pType: "Polyethylene HDPE Banner",
                pType: 'PVC',
                kgs: values?.hdpeBanner,
                emissions: hdpeBannerEmission > 0 ? hdpeBannerEmission : '',
              },
              {
                pType: 'Polyethylene HDPE',
                kgs: values?.pvcBanners,
                emissions: pvcBannersEmission > 0 ? pvcBannersEmission : '',
              },
              {
                pType: 'Polyethylene LDPE',
                kgs: values?.plasticBadgeHolders,
                emissions: plasticBadgeHoldersEmission > 0 ? plasticBadgeHoldersEmission : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: 'Giveaways',
          subTypeData: {
            th: ['Material Type', 'No. of Bags', 'Emissions'],
            td: [
              {
                pType: 'Cotton Bags',
                kgs: values?.cottenBages,
                emissions: cottenBagesEmission > 0 ? cottenBagesEmission : '',
              },
              {
                pType: 'Jute Bags',
                kgs: values?.Jutebags,
                emissions: JutebagsEmission > 0 ? JutebagsEmission : '',
              },
              {
                pType: 'Paper Bags',
                kgs: values?.Paperbags,
                emissions: PaperbagsEmission > 0 ? PaperbagsEmission : '',
              },
              {
                pType: 'Recycled Paper Bags',
                kgs: values?.Recycledpaperbags,
                emissions: RecycledpaperbagsEmission > 0 ? RecycledpaperbagsEmission : '',
              },
            ],
          },
        },
      ];

      dispatch(addProductionData({ data }));
      dispatch(addResultTableData({ from: 'f2fEvent', data: tableData, tabTitle: 'Event Agency' }));
    },
  });

  const handeleDelete = () => {
    dispatch(deleteProductionData());
    dispatch(deleteResTabProductionData());
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
      formik.setFieldValue('sawnTimberArea', allData?.[0]?.area);
      formik.setFieldValue('sawnTimberEmission', allData?.[0]?.emission);
      formik.setFieldValue('mdfArea', allData?.[1]?.area);
      formik.setFieldValue('mdfEmission', allData?.[1]?.emission);

      formik.setFieldValue('steelKgs', allData?.[3]?.kgs);
      formik.setFieldValue('steelEmission', allData?.[3]?.emission);
      formik.setFieldValue('aluminiumKgs', allData?.[2]?.kgs);
      formik.setFieldValue('aluminiumEmission', allData?.[2]?.emission);

      formik.setFieldValue('cottenBages', allData?.[10]?.cottenBages);
      formik.setFieldValue('cottenBagesEmission', allData?.[10]?.emission);

      formik.setFieldValue('Jutebags', allData?.[11]?.Jutebags);
      formik.setFieldValue('JutebagsEmission', allData?.[11]?.emission);
      formik.setFieldValue('Paperbags', allData?.[12]?.Paperbags);
      formik.setFieldValue('PaperbagsEmission', allData?.[12]?.emission);
      formik.setFieldValue('Recycledpaperbags', allData?.[13]?.Recycledpaperbags);
      formik.setFieldValue('RecycledpaperbagsEmission', allData?.[13]?.emission);

      formik.setFieldValue('hdpeBanner', allData?.[4]?.hdpeBanner);
      formik.setFieldValue('hdpeBannerEmission', allData?.[4]?.emission);
      formik.setFieldValue('pvcBanners', allData?.[5]?.pvcBanners);
      formik.setFieldValue('pvcBannersEmission', allData?.[5]?.emission);
      formik.setFieldValue('plasticBadgeHolders', allData?.[6]?.plasticBadgeHolders);
      formik.setFieldValue('plasticBadgeHoldersEmission', allData?.[6]?.emission);

      formik.setFieldValue('juteCarpet', allData?.[7]?.juteCarpet);
      formik.setFieldValue('juteCarpetEmissions', allData?.[7]?.emission);
      formik.setFieldValue('wooden', allData?.[8]?.wooden);
      formik.setFieldValue('WoddenEmissions', allData?.[8]?.emission);
      formik.setFieldValue('pvcFlooring', allData?.[9]?.pvcFlooring);
      formik.setFieldValue('pvcFlooringEmission', allData?.[9]?.emission);
    }
  }, [value]);

  return (
    <div>
      <Container maxWidth style={{ maxWidth: 'auto' }}>
        <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
          <Typography variant="h4" className="text-center text-white mb-4">
            Structural Frame Works
          </Typography>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              mx={useMediaQuery(theme.breakpoints.up('lg')) && 15}
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <IconDiv>
                <img width={100} src={ProductionImg} alt="Food" className="tabImgWhite" />
              </IconDiv>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th />
                          <th className="ps-2" >
                            Weight (Kgs)
                          </th>
                          <th className="ps-2" >
                            Emissions (kgCO<sub>2</sub>e)
                          </th>
                        </tr>
                        {fieldDataTwo &&
                          fieldDataTwo?.map((ite) => (
                            <>
                              <tr key={`two${ite}`}>
                                <td className="py-1">{ite.name}</td>
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
                                        Number((e.target.value * ite?.ef).toFixed(5))
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

                <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th />
                          <th className="ps-2" >
                            Area (m<sup>3</sup>)
                          </th>
                          <th className="ps-2" >
                            Emissions (kgCO<sub>2</sub>e)
                          </th>
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
                                        Number((e.target.value * item?.ef).toFixed(5))
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

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h4" className="text-center text-white mb-4">
                    Flooring Materials
                  </Typography>
                  <Box>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th />
                          <th className="ps-2">
                            Area (m²)
                          </th>
                          <th className="ps-2" >
                            Emissions (kgCO<sub>2</sub>e)
                          </th>
                        </tr>
                        <tr>
                          <td className="py-1 pe-3">Jute Carpet</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="juteCarpet"
                              value={formik?.values?.juteCarpet}
                              onChange={(e) => {
                                formik.setFieldValue('juteCarpet', e.target.value);
                                formik.setFieldValue(
                                  'juteCarpetEmissions',
                                  Number(7.5561 * Number(e.target.value)).toFixed(5)
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
                              name="juteCarpetEmissions"
                              value={formik?.values?.juteCarpetEmissions}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1">Wooden</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="wooden"
                              value={formik?.values?.wooden}
                              onChange={(e) => {
                                formik.setFieldValue('wooden', e.target.value);
                                formik.setFieldValue(
                                  'WoddenEmissions',
                                  Number(14.6 * Number(e.target.value)).toFixed(5)
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
                              name="WoddenEmissions"
                              value={formik?.values?.WoddenEmissions}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1">PVC</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="pvcFlooring"
                              value={formik?.values?.pvcFlooring}
                              onChange={(e) => {
                                formik.setFieldValue('pvcFlooring', e.target.value);
                                formik.setFieldValue(
                                  'pvcFlooringEmission',
                                  Number(5.8786 * Number(e.target.value)).toFixed(5)
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
                              name="pvcFlooringEmission"
                              value={formik?.values?.pvcFlooringEmission}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h4" className="text-center text-white mb-4">
                    Branding Display
                  </Typography>
                  <Box>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th />
                          <th className="ps-2" >
                            Weight (Kgs)
                          </th>
                          <th className="ps-2" >
                            Emissions (kgCO<sub>2</sub>e)
                          </th>
                        </tr>
                        <tr>
                          <td className="py-1">PVC</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="hdpeBanner"
                              value={formik?.values?.hdpeBanner}
                              onChange={(e) => {
                                formik.setFieldValue('hdpeBanner', e.target.value);
                                formik.setFieldValue(
                                  'hdpeBannerEmission',
                                  Number(2.21 * Number(e.target.value)).toFixed(5)
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
                              name="hdpeBannerEmission"
                              value={formik?.values?.hdpeBannerEmission}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1">Polyethylene HDPE</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="pvcBanners"
                              value={formik?.values?.pvcBanners}
                              onChange={(e) => {
                                formik.setFieldValue('pvcBanners', e.target.value);
                                formik.setFieldValue(
                                  'pvcBannersEmission',
                                  Number(2.15 * Number(e.target.value)).toFixed(5)
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
                              name="pvcBannersEmission"
                              value={formik?.values?.pvcBannersEmission}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1">Polyethylene LDPE</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="plasticBadgeHolders"
                              value={formik?.values?.plasticBadgeHolders}
                              onChange={(e) => {
                                formik.setFieldValue('plasticBadgeHolders', e.target.value);
                                formik.setFieldValue(
                                  'plasticBadgeHoldersEmission',
                                  Number(1.84 * Number(e.target.value)).toFixed(5)
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

                <Box className="d-flex justify-content-center mt-4 w-100" >
                  <div className="table-responsive">
                    {/* <Grid item xs={12} sm={12} md={12}> */}
                    <Typography variant="h4" className="text-center text-white mb-4 mt-4">
                      Giveaways
                    </Typography>
                    <Box>
                      <div className="table-responsive">
                        <table className="table-custom-inpt-field">
                          <tr>
                            <th />
                            <th className="ps-2">No. of Bags</th>
                            <th className="ps-2">
                              Emissions (kgCO<sub>2</sub>e)
                            </th>
                          </tr>
                          <tr>
                            <td className="py-1">Cotton Bags</td>
                            <td className="ps-2 py-1">
                              <TextField
                                size="small"
                                type="number"
                                name="cottenBages"
                                value={formik?.values?.cottenBages}
                                onChange={(e) => {
                                  formik.setFieldValue('cottenBages', e.target.value);
                                  formik.setFieldValue(
                                    'cottenBagesEmission',
                                    Number(0.09 * Number(e.target.value)).toFixed(5)
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
                                name="cottenBagesEmission"
                                value={formik?.values?.cottenBagesEmission}
                                onChange={formik.handleChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1">Jute Bags</td>
                            <td className="ps-2 py-1">
                              <TextField
                                size="small"
                                type="number"
                                name="Jutebags"
                                value={formik?.values?.Jutebags}
                                onChange={(e) => {
                                  formik.setFieldValue('Jutebags', e.target.value);
                                  formik.setFieldValue(
                                    'JutebagsEmission',
                                    Number(0.03962 * Number(e.target.value)).toFixed(5)
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
                                name="JutebagsEmission"
                                value={formik?.values?.JutebagsEmission}
                                onChange={formik.handleChange}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1">Paper Bags</td>
                            <td className="ps-2 py-1">
                              <TextField
                                size="small"
                                type="number"
                                name="Paperbags"
                                value={formik?.values?.Paperbags}
                                onChange={(e) => {
                                  formik.setFieldValue('Paperbags', e.target.value);
                                  formik.setFieldValue(
                                    'PaperbagsEmission',
                                    Number(0.28 * Number(e.target.value)).toFixed(5)
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
                                name="PaperbagsEmission"
                                value={formik?.values?.PaperbagsEmission}
                                onChange={formik.handleChange}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1">Recycled Paper Bags</td>
                            <td className="ps-2 py-1">
                              <TextField
                                size="small"
                                type="number"
                                name="Recycledpaperbags"
                                value={formik?.values?.Recycledpaperbags}
                                onChange={(e) => {
                                  formik.setFieldValue('Recycledpaperbags', e.target.value);
                                  formik.setFieldValue(
                                    'RecycledpaperbagsEmission',
                                    Number(0.17665 * Number(e.target.value)).toFixed(5)
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
                                name="RecycledpaperbagsEmission"
                                value={formik?.values?.RecycledpaperbagsEmission}
                                onChange={formik.handleChange}
                                disabled
                              />
                            </td>
                          </tr>
                        </table>
                      </div>
                    </Box>
                    {/* </Grid> */}
                  </div>
                </Box>

                {/* <Grid item xs={12} sm={12} md={12} marginTop={3}>
                  <Typography color="white">Note:</Typography>
                  <li className="text-white ms-3">
                    Please seek support from your event management agency before filling out the contents of this page.
                  </li>
                  <li className="text-white ms-3">100% Recyclable/ Biodegradable</li>
                </Grid> */}

                <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                  <Stack columnGap={2} rowGap={2} className="flex-xl-row flex-md-row flex-sm-column">
                    {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                    <Button
                      variant="contained"
                      onClick={() => {
                        formik.handleSubmit();
                        handleSaveToDb();
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
                        handleSaveToDb();
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
                    {`Total Event Agency Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e
                  </Typography>
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

// import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
// import { useFormik } from 'formik';
// import { useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProductionData, deleteProductionData } from '../../redux/slice/totalProductionSlice';
// import { addResultTableData, deleteResTabProductionData, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
// import ProductionImg from '../../assets/production.png';
// import { IconDiv } from '../../components/IconDiv';
// import useEventData from '../../hooks/useEventData';

// const Production = (props) => {
//     const { setValue, value } = props;
//     const theme = useTheme();
//     const dispatch = useDispatch();
//     const allData = useSelector((state) => state?.totalProductionDetails?.data?.[0]?.data);
//     const totalEmission = useSelector((state) => state?.totalProductionDetails?.totalEmission);
//     const resultTableData = useSelector(state => state?.resultTableDataDetails);
//     const eventsData = useEventData();

//     const fieldDataOne = [
//         { name: 'Sawn Timber', ef: 0.263, fieldName: 'sawnTimber' },
//         { name: 'MDF', ef: 0.856, fieldName: 'mdf' },
//         { name: 'Open Panel Timber Frame', ef: 0.345, fieldName: 'openPanelTimberFrame' },
//         { name: 'Carpet ', ef: 6.7, fieldName: 'carpet' },
//         { name: 'Adhesive Vinyl', ef: 3.1, fieldName: 'adhesiveVinyl' },
//         { name: 'Cardboard', ef: 0.94, fieldName: 'cardboard' },
//         { name: 'Nylon', ef: 12.7, fieldName: 'nylon' },
//     ];
//     const fieldDataTwo = [
//         { name: 'Wood', ef: 1.8, fieldName: 'wood' },
//         { name: 'Steel ', ef: 1.36, fieldName: 'steel' },
//         { name: 'Aluminium', ef: 2.663, fieldName: 'aluminium' },
//         { name: 'Iron', ef: 0.64, fieldName: 'iron' },
//         { name: 'Paper', ef: 0.0005, fieldName: 'paper' },
//         { name: 'Recycled Paper', ef: 0.02, fieldName: 'recycledPaper' },
//         { name: 'Paint ', ef: 1.15, fieldName: 'paint' },
//     ];
//     const fieldDataThree = [
//         { name: 'Projector', ef: 0.215, fieldName: 'projector' },
//         { name: 'LED Screen Panel (500mmx500mm)', ef: 0.043, fieldName: 'ledScreenPanel' },
//     ];
//     const fieldDataFour = [
//         { name: 'Electricity', ef: 0.716, fieldName: 'electricity' },
//     ];

//     const fieldDataFive = [
//         // { name: 'Polyethylene HDPE Banner', ef: 3.11, fieldName: 'hdpeBanner' },
//         { name: 'Polyethylene Banner', ef: 3.11, fieldName: 'hdpeBanner' },
//         { name: 'PVC Banners', ef: 7.83, fieldName: 'pvcBanners' },
//         { name: 'Cotton Banner', ef: 14.5, fieldName: 'cottonBanner' },
//         { name: 'Plastic Badge Holders (Polycorbonate)', ef: 4.2, fieldName: 'plasticBadgeHolders' },
//     ];

//     const fieldDataSix = [
//         { name: 'Printing a Coloured Brochure/ Page (<130 GSM)', ef: 1.56, fieldName: 'colouredBrochurePage' },
//         { name: 'Giveaway Paper bags (200 GSM)- A4 Size', ef: 0.3125, fieldName: 'paperBagsA4Size' },
//         { name: 'Giveaway Paper bags (200 GSM)- A5 Size', ef: 0.125, fieldName: 'paperBagsA5Size' },
//         { name: 'Giveaway Jute bags*- A4 Size', ef: 0.73, fieldName: 'juteBagsA4Size' },
//         { name: 'Giveaway Cotton bags- A4 Size', ef: 17, fieldName: 'cottonBagsA4Size' },
//     ];

//     //  hdpeBanner: 0,
//     //     pvcBanners: 0,
//     //     cottonBanner: 0,
//     //     plasticBadgeHolders: 0,
//     //     hdpeBannerEmission: 0,
//     //     pvcBannersEmission: 0,
//     //     cottonBannerEmission: 0,
//     //     plasticBadgeHoldersEmission: 0,

//     //     colouredBrochurePage: 0,
//     //     paperBagsA4Size: 0,
//     //     paperBagsA5Size: 0,
//     //     juteBagsA4Size: 0,
//     //     cottonBagsA4Size: 0,
//     //     colouredBrochurePageEmission: 0,
//     //     paperBagsA4SizeEmission: 0,
//     //     paperBagsA5SizeEmission: 0,
//     //     juteBagsA4SizeEmission: 0,
//     //     cottonBagsA4SizeEmission: 0,

//     // const initialValues = {
//     //     ...fieldDataOne?.reduce((fieldOne, item) => {
//     //         fieldOne[`${item?.fieldName}Area`] = 0;
//     //         fieldOne[`${item?.fieldName}Emission`] = 0;
//     //         return fieldOne;
//     //     }, {}),
//     //     ...fieldDataTwo?.reduce((fieldTwo, item) => {
//     //         fieldTwo[`${item?.fieldName}Kgs`] = 0;
//     //         fieldTwo[`${item?.fieldName}Emission`] = 0;
//     //         return fieldTwo;
//     //     }, {}),
//     //     ...fieldDataThree?.reduce((fieldThr, item) => {
//     //         fieldThr[`${item?.fieldName}NoOfHour`] = 0;
//     //         fieldThr[`${item?.fieldName}NoOfDevice`] = 0;
//     //         fieldThr[`${item?.fieldName}Emission`] = 0;
//     //         return fieldThr;
//     //     }, {}),
//     //     ...fieldDataFour?.reduce((fieldFr, item) => {
//     //         fieldFr[`${item?.fieldName}NoOfHour`] = 0;
//     //         fieldFr[`${item?.fieldName}NoOfLight`] = 0;
//     //         fieldFr[`${item?.fieldName}Emission`] = 0;
//     //         return fieldFr;
//     //     }, {}),
//     // };

//     const initialValues = {
//         // sawnTimberArea: 0,
//         // sawnTimberEmission: 0,
//         // mdfArea: 0,
//         // mdfEmission: 0,
//         // openPanelTimberFrameArea: 0,
//         // openPanelTimberFrameEmission: 0,
//         // carpetArea: 0,
//         // carpetEmission: 0,
//         // adhesiveVinylArea: 0,
//         // adhesiveVinylEmission: 0,
//         // cardboardArea: 0,
//         // cardboardEmission: 0,
//         // nylonArea: 0,
//         // nylonEmission: 0,
//         // woodKgs: 0,
//         // woodEmission: 0,
//         // steelKgs: 0,
//         // steelEmission: 0,
//         // aluminiumKgs: 0,
//         // aluminiumEmission: 0,
//         // ironKgs: 0,
//         // ironEmission: 0,
//         // paperKgs: 0,
//         // paperEmission: 0,
//         // recycledPaperKgs: 0,
//         // recycledPaperEmission: 0,
//         // paintKgs: 0,
//         // paintEmission: 0,
//         // projectorNoOfHour: 0,
//         // projectorNoOfDevice: 0,
//         // projectorEmission: 0,
//         // ledScreenPanelNoOfHour: 0,
//         // ledScreenPanelNoOfDevice: 0,
//         // ledScreenPanelEmission: 0,
//         // kwh: 0,
//         // kwhEmission: 0,

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

//         sawnTimberArea: '',
//         sawnTimberEmission: '',
//         mdfArea: '',
//         mdfEmission: '',
//         openPanelTimberFrameArea: '',
//         openPanelTimberFrameEmission: '',
//         carpetArea: '',
//         carpetEmission: '',
//         adhesiveVinylArea: '',
//         adhesiveVinylEmission: '',
//         cardboardArea: '',
//         cardboardEmission: '',
//         nylonArea: '',
//         nylonEmission: '',
//         woodKgs: '',
//         woodEmission: '',
//         steelKgs: '',
//         steelEmission: '',
//         aluminiumKgs: '',
//         aluminiumEmission: '',
//         ironKgs: '',
//         ironEmission: '',
//         paperKgs: '',
//         paperEmission: '',
//         recycledPaperKgs: '',
//         recycledPaperEmission: '',
//         paintKgs: '',
//         paintEmission: '',
//         projectorNoOfHour: '',
//         projectorNoOfDevice: '',
//         projectorEmission: '',
//         ledScreenPanelNoOfHour: '',
//         ledScreenPanelNoOfDevice: '',
//         ledScreenPanelEmission: '',
//         kwh: '',
//         kwhEmission: '',

//         hdpeBanner: '',
//         pvcBanners: '',
//         cottonBanner: '',
//         plasticBadgeHolders: '',
//         hdpeBannerEmission: '',
//         pvcBannersEmission: '',
//         cottonBannerEmission: '',
//         plasticBadgeHoldersEmission: '',

//         colouredBrochurePage: '',
//         paperBagsA4Size: '',
//         paperBagsA5Size: '',
//         juteBagsA4Size: '',
//         cottonBagsA4Size: '',
//         colouredBrochurePageEmission: '',
//         paperBagsA4SizeEmission: '',
//         paperBagsA5SizeEmission: '',
//         juteBagsA4SizeEmission: '',
//         cottonBagsA4SizeEmission: ''
//     };

//     const formik = useFormik({
//         initialValues,
//         onSubmit: async (values) => {

//             const sawnTimberEmission = values?.sawnTimberArea === 0 ? 0 : Number((values?.sawnTimberArea * 0.263).toFixed(5))
//             const mdfEmission = values?.mdfArea === 0 ? 0 : Number((values?.mdfArea * 0.856).toFixed(5))
//             const openPanelTimberFrameEmission = values?.openPanelTimberFrameArea === 0 ? 0 : Number((values?.openPanelTimberFrameArea * 0.345).toFixed(5))
//             const carpetEmission = values?.carpetArea === 0 ? 0 : Number((values?.carpetArea * 6.7).toFixed(5))
//             const adhesiveVinylEmission = values?.adhesiveVinylArea === 0 ? 0 : Number((values?.adhesiveVinylArea * 3.1).toFixed(5))
//             const cardboardEmission = values?.cardboardArea === 0 ? 0 : Number((values?.cardboardArea * 0.94).toFixed(5))
//             const nylonEmission = values?.nylonArea === 0 ? 0 : Number((values?.nylonArea * 12.7).toFixed(5))
//             const woodEmission = values?.woodKgs === 0 ? 0 : Number((values?.woodKgs * 1.8).toFixed(5))
//             const steelEmission = values?.steelKgs === 0 ? 0 : Number((values?.steelKgs * 1.36).toFixed(5))
//             const aluminiumEmission = values?.aluminiumKgs === 0 ? 0 : Number((values?.aluminiumKgs * 2.663).toFixed(5))
//             const ironEmission = values?.ironKgs === 0 ? 0 : Number((values?.ironKgs * 0.64).toFixed(5))
//             const paperEmission = values?.paperKgs === 0 ? 0 : Number((values?.paperKgs * 0.0005).toFixed(5))
//             const recycledPaperEmission = values?.recycledPaperKgs === 0 ? 0 : Number((values?.recycledPaperKgs * 0.02).toFixed(5))
//             const paintEmission = values?.paintKgs === 0 ? 0 : Number((values?.paintKgs * 1.15).toFixed(5))
//             const projectorEmission = values?.projectorNoOfHour === 0 || values?.projectorNoOfDevice === 0 ? 0 : Number((values?.projectorNoOfHour * values?.projectorNoOfDevice * 0.215).toFixed(5))
//             const ledScreenPanelEmission = values?.ledScreenPanelNoOfHour === 0 || values?.ledScreenPanelNoOfDevice === 0 ? 0 : Number((values?.ledScreenPanelNoOfHour * values?.ledScreenPanelNoOfDevice * 0.043).toFixed(5))
//             const kwhEmission = Number((values?.kwh * 0.716).toFixed(5))
//             // const plasticWrappingEmission = Number(Number(values?.plasticWrapping) * 1 * 7.83).toFixed(5)
//             const hdpeBannerEmission = Number(3.11 * Number(values?.hdpeBanner)).toFixed(5)
//             const pvcBannersEmission = Number(7.83 * Number(values?.pvcBanners)).toFixed(5)
//             const cottonBannerEmission = Number(14.5 * Number(values?.cottonBanner)).toFixed(5)
//             const plasticBadgeHoldersEmission = Number(4.2 * Number(values?.plasticBadgeHolders)).toFixed(5);
//             const colouredBrochurePageEmission = Number(1.56 * Number(values?.colouredBrochurePage)).toFixed(5)
//             const paperBagsA4SizeEmission = Number(0.3125 * Number(values?.paperBagsA4Size)).toFixed(5)
//             const paperBagsA5SizeEmission = Number(0.125 * Number(values?.paperBagsA5Size)).toFixed(5)
//             const juteBagsA4SizeEmission = Number(0.73 * Number(values?.juteBagsA4Size)).toFixed(5)
//             const cottonBagsA4SizeEmission = Number(17 * Number(values?.cottonBagsA4Size)).toFixed(5)

//             if (sawnTimberEmission > 0) formik.setFieldValue('sawnTimberEmission', sawnTimberEmission);
//             if (mdfEmission > 0) formik.setFieldValue('mdfEmission', mdfEmission);
//             if (openPanelTimberFrameEmission > 0) formik.setFieldValue('openPanelTimberFrameEmission', openPanelTimberFrameEmission);
//             if (carpetEmission > 0) formik.setFieldValue('carpetEmission', carpetEmission);
//             if (adhesiveVinylEmission > 0) formik.setFieldValue('adhesiveVinylEmission', adhesiveVinylEmission);
//             if (cardboardEmission > 0) formik.setFieldValue('cardboardEmission', cardboardEmission);
//             if (nylonEmission > 0) formik.setFieldValue('nylonEmission', nylonEmission);

//             if (woodEmission > 0) formik.setFieldValue('woodEmission', woodEmission);
//             if (steelEmission > 0) formik.setFieldValue('steelEmission', steelEmission);
//             if (aluminiumEmission > 0) formik.setFieldValue('aluminiumEmission', aluminiumEmission);
//             if (ironEmission > 0) formik.setFieldValue('ironEmission', ironEmission);
//             if (paperEmission > 0) formik.setFieldValue('paperEmission', paperEmission);
//             if (recycledPaperEmission > 0) formik.setFieldValue('recycledPaperEmission', recycledPaperEmission);
//             if (paintEmission > 0) formik.setFieldValue('paintEmission', paintEmission);

//             if (projectorEmission > 0) formik.setFieldValue('projectorEmission', projectorEmission);
//             if (ledScreenPanelEmission > 0) formik.setFieldValue('ledScreenPanelEmission', ledScreenPanelEmission);

//             if (kwhEmission > 0) formik.setFieldValue('kwhEmission', kwhEmission);

//             // if (plasticWrappingEmission > 0) formik.setFieldValue('plasticWrappingEmission', plasticWrappingEmission);
//             if (hdpeBannerEmission > 0) formik.setFieldValue('hdpeBannerEmission', hdpeBannerEmission);
//             if (pvcBannersEmission > 0) formik.setFieldValue('pvcBannersEmission', pvcBannersEmission);
//             if (cottonBannerEmission > 0) formik.setFieldValue('cottonBannerEmission', cottonBannerEmission);
//             if (plasticBadgeHoldersEmission > 0) formik.setFieldValue('plasticBadgeHoldersEmission', plasticBadgeHoldersEmission);

//             if (colouredBrochurePageEmission > 0) formik.setFieldValue('colouredBrochurePageEmission', colouredBrochurePageEmission);
//             if (paperBagsA4SizeEmission > 0) formik.setFieldValue('paperBagsA4SizeEmission', paperBagsA4SizeEmission);
//             if (paperBagsA5SizeEmission > 0) formik.setFieldValue('paperBagsA5SizeEmission', paperBagsA5SizeEmission);
//             if (juteBagsA4SizeEmission > 0) formik.setFieldValue('juteBagsA4SizeEmission', juteBagsA4SizeEmission);
//             if (cottonBagsA4SizeEmission > 0) formik.setFieldValue('cottonBagsA4SizeEmission', cottonBagsA4SizeEmission);

//             // const dataFieldOne = fieldDataOne?.map((item) => {
//             //     const emission = values?.[`${item?.fieldName}Area`] === 0 ? 0 : Number((values?.[`${item?.fieldName}Area`] * item?.ef).toFixed(5)) || 0;
//             //     return {
//             //         type: item?.name,
//             //         area: values?.[`${item?.fieldName}Area`],
//             //         emission,
//             //     };
//             // });

//             // const dataFieldTwo = fieldDataTwo?.map((item) => {
//             //     const emission = values?.[`${item?.fieldName}Kgs`] === 0 ? 0 : Number((values?.[`${item?.fieldName}Kgs`] * item?.ef).toFixed(5)) || 0;
//             //     return {
//             //         type: item?.name,
//             //         kgs: values?.[`${item?.fieldName}Kgs`],
//             //         emission,
//             //     };
//             // });

//             // const dataFieldThree = fieldDataThree?.map((item) => {
//             //     const emission = values?.[`${item?.fieldName}NoOfHour`] === 0 || values?.[`${item?.fieldName}NoOfDevice`] === 0 ? 0 : Number((values?.[`${item?.fieldName}NoOfHour`] * values?.[`${item?.fieldName}NoOfDevice`] * item?.ef).toFixed(5)) || 0;
//             //     return {
//             //         type: item?.name,
//             //         noOfHour: values?.[`${item?.fieldName}NoOfHour`],
//             //         noOfDevice: values?.[`${item?.fieldName}NoOfDevice`],
//             //         emission,
//             //     };
//             // });

//             // const dataFieldFour = fieldDataFour?.map((item) => {
//             //     const emission = values?.[`${item?.fieldName}NoOfHour`] === 0 || values?.[`${item?.fieldName}NoOfLight`] === 0 ? 0 : Number((values?.[`${item?.fieldName}NoOfHour`] * values?.[`${item?.fieldName}NoOfLight`] * item?.ef).toFixed(5)) || 0;
//             //     return {
//             //         type: item?.name,
//             //         noOfHour: values?.[`${item?.fieldName}NoOfHour`],
//             //         noOfLight: values?.[`${item?.fieldName}NoOfLight`],
//             //         emission,
//             //     };
//             // });

//             // const data = [...dataFieldOne, ...dataFieldTwo, ...dataFieldThree, ...dataFieldFour];

//             const data = [
//                 {
//                     type: 'Sawn Timber',
//                     area: values?.sawnTimberArea,
//                     emission: sawnTimberEmission > 0 ? sawnTimberEmission : ''
//                 },
//                 {
//                     type: 'MDF',
//                     area: values?.mdfArea,
//                     emission: mdfEmission > 0 ? mdfEmission : ''
//                 },
//                 {
//                     name: 'Open Panel Timber Frame',
//                     area: values?.openPanelTimberFrameArea,
//                     emission: openPanelTimberFrameEmission > 0 ? openPanelTimberFrameEmission : ''
//                 },
//                 {
//                     name: 'Carpet',
//                     area: values?.carpetArea,
//                     emission: carpetEmission > 0 ? carpetEmission : ''
//                 },
//                 {
//                     name: 'Adhesive Vinyl',
//                     area: values?.adhesiveVinylArea,
//                     emission: adhesiveVinylEmission > 0 ? adhesiveVinylEmission : ''
//                 },
//                 {
//                     name: 'Cardboard',
//                     area: values?.cardboardArea,
//                     emission: cardboardEmission > 0 ? cardboardEmission : ''
//                 },
//                 {
//                     name: 'Nylon',
//                     area: values?.nylonArea,
//                     emission: nylonEmission > 0 ? nylonEmission : ''
//                 },
//                 {
//                     type: 'Wood',
//                     kgs: values?.woodKgs,
//                     emission: woodEmission > 0 ? woodEmission : ''
//                 },
//                 {
//                     type: 'Steel ',
//                     kgs: values?.steelKgs,
//                     emission: steelEmission > 0 ? steelEmission : ''
//                 },
//                 {
//                     type: 'Aluminium',
//                     kgs: values?.aluminiumKgs,
//                     emission: aluminiumEmission > 0 ? aluminiumEmission : ''
//                 },
//                 {
//                     type: 'Iron',
//                     kgs: values?.ironKgs,
//                     emission: ironEmission > 0 ? ironEmission : ''
//                 },
//                 {
//                     type: 'Paper',
//                     kgs: values?.paperKgs,
//                     emission: paperEmission > 0 ? paperEmission : ''
//                 },
//                 {
//                     type: 'Recycled Paper',
//                     kgs: values?.recycledPaperKgs,
//                     emission: recycledPaperEmission > 0 ? recycledPaperEmission : ''
//                 },
//                 {
//                     type: 'Paint',
//                     kgs: values?.paintKgs,
//                     emission: paintEmission > 0 ? paintEmission : ''
//                 },
//                 //
//                 {
//                     type: 'Projector',
//                     noOfHour: values?.projectorNoOfHour,
//                     noOfDevice: values?.projectorNoOfDevice,
//                     emission: projectorEmission > 0 ? projectorEmission : ''
//                 },
//                 {
//                     type: 'LED Screen Panel (500mmx500mm)',
//                     noOfHour: values?.ledScreenPanelNoOfHour,
//                     noOfDevice: values?.ledScreenPanelNoOfDevice,
//                     emission: ledScreenPanelEmission > 0 ? ledScreenPanelEmission : ''
//                 },
//                 {
//                     type: 'Electricity',
//                     kwh: values?.kwh,
//                     emission: kwhEmission > 0 ? kwhEmission : ''
//                 },

//                 {
//                     type: 'PolyethyleneHDPEBanner',
//                     hdpeBanner: values?.hdpeBanner,
//                     emission: hdpeBannerEmission > 0 ? hdpeBannerEmission : ''
//                 },
//                 {
//                     type: 'PVCBanners',
//                     pvcBanners: values?.pvcBanners,
//                     emission: pvcBannersEmission > 0 ? pvcBannersEmission : ''
//                 },
//                 {
//                     type: 'CottonBanner',
//                     cottonBanner: values?.cottonBanner,
//                     emission: cottonBannerEmission > 0 ? cottonBannerEmission : ''
//                 },
//                 {
//                     type: 'PlasticBadgeHolders',
//                     plasticBadgeHolders: values?.plasticBadgeHolders,
//                     emission: plasticBadgeHoldersEmission > 0 ? plasticBadgeHoldersEmission : ''
//                 },

//                 {
//                     type: 'ColouredBrochurePage',
//                     colouredBrochurePage: values?.colouredBrochurePage,
//                     emission: colouredBrochurePageEmission > 0 ? colouredBrochurePageEmission : ''
//                 },
//                 {
//                     type: 'PaperBagsA4Size',
//                     paperBagsA4Size: values?.paperBagsA4Size,
//                     emission: paperBagsA4SizeEmission > 0 ? paperBagsA4SizeEmission : ''
//                 },
//                 {
//                     type: 'PaperBagsA5Size',
//                     paperBagsA5Size: values?.paperBagsA5Size,
//                     emission: paperBagsA5SizeEmission > 0 ? paperBagsA5SizeEmission : ''
//                 },
//                 {
//                     type: 'JuteBagsA4Size',
//                     juteBagsA4Size: values?.juteBagsA4Size,
//                     emission: juteBagsA4SizeEmission > 0 ? juteBagsA4SizeEmission : ''
//                 },
//                 {
//                     type: 'CottonBagsA4Size',
//                     cottonBagsA4Size: values?.cottonBagsA4Size,
//                     emission: cottonBagsA4SizeEmission > 0 ? cottonBagsA4SizeEmission : ''
//                 },
//             ];

//             const tableData = [
//                 {
//                     subType: "Production Material",
//                     subTypeData: {
//                         th: ["", "Weight (Kgs)", "Emissions"],
//                         td: [
//                             {
//                                 pType: "Wood",
//                                 kgs: values?.woodKgs,
//                                 emissions: woodEmission > 0 ? woodEmission : ''
//                             },
//                             {
//                                 pType: "Steel",
//                                 kgs: values?.steelKgs,
//                                 emissions: steelEmission > 0 ? steelEmission : ''
//                             },
//                             {
//                                 pType: "Aluminium",
//                                 kgs: values?.aluminiumKgs,
//                                 emissions: aluminiumEmission > 0 ? aluminiumEmission : ''
//                             },
//                             {
//                                 pType: "Iron",
//                                 kgs: values?.ironKgs,
//                                 emissions: ironEmission > 0 ? ironEmission : ''
//                             },
//                             {
//                                 pType: "Paper",
//                                 kgs: values?.paperKgs,
//                                 emissions: paperEmission > 0 ? paperEmission : ''
//                             },
//                             {
//                                 pType: "Recycled Paper",
//                                 kgs: values?.recycledPaperKgs,
//                                 emissions: recycledPaperEmission > 0 ? recycledPaperEmission : ''
//                             },
//                             {
//                                 pType: "Paint",
//                                 kgs: values?.paintKgs,
//                                 emissions: paintEmission > 0 ? paintEmission : ''
//                             }
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Production Material",
//                     subTypeData: {
//                         th: ["", "Total Area (m2)", "Emissions"],
//                         td: [
//                             {
//                                 pType: "Sawn Timber",
//                                 area: values?.sawnTimberArea,
//                                 emissions: sawnTimberEmission > 0 ? sawnTimberEmission : ''
//                             },
//                             {
//                                 pType: "MDF",
//                                 area: values?.mdfArea,
//                                 emissions: mdfEmission > 0 ? mdfEmission : ''
//                             },
//                             {
//                                 pType: "Open Panel Timber Frame",
//                                 area: values?.openPanelTimberFrameArea,
//                                 emissions: openPanelTimberFrameEmission > 0 ? openPanelTimberFrameEmission : ''
//                             },
//                             {
//                                 pType: "Carpet",
//                                 area: values?.carpetArea,
//                                 emissions: carpetEmission > 0 ? carpetEmission : ''
//                             },
//                             {
//                                 pType: "Adhesive Vinyl",
//                                 area: values?.adhesiveVinylArea,
//                                 emissions: adhesiveVinylEmission > 0 ? adhesiveVinylEmission : ''
//                             },
//                             {
//                                 pType: "Cardboard",
//                                 area: values?.cardboardArea,
//                                 emissions: cardboardEmission > 0 ? cardboardEmission : ''
//                             },
//                             {
//                                 pType: "Nylon",
//                                 area: values?.nylonArea,
//                                 emissions: nylonEmission > 0 ? nylonEmission : ''
//                             },
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Branding",
//                     subTypeData: {
//                         th: ["", "In Kgs", "Emissions"],
//                         td: [
//                             {
//                                 // pType: "Polyethylene HDPE Banner",
//                                 pType: "Polyethylene Banner",
//                                 kgs: values?.hdpeBanner,
//                                 emissions: hdpeBannerEmission > 0 ? hdpeBannerEmission : ''
//                             },
//                             {
//                                 pType: "PVC Banners",
//                                 kgs: values?.pvcBanners,
//                                 emissions: pvcBannersEmission > 0 ? pvcBannersEmission : ''
//                             },
//                             {
//                                 pType: "Cotton Banner",
//                                 kgs: values?.cottonBanner,
//                                 emissions: cottonBannerEmission > 0 ? cottonBannerEmission : ''
//                             },
//                             {
//                                 // pType: "Plastic Badge Holders (Polycorbonate)",
//                                 pType: "Plastic Badges",
//                                 kgs: values?.plasticBadgeHolders,
//                                 emissions: plasticBadgeHoldersEmission > 0 ? plasticBadgeHoldersEmission : ''
//                             },
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Branding",
//                     subTypeData: {
//                         th: ["", "No. of Units", "Emissions"],
//                         td: [
//                             {
//                                 pType: "Printing a Coloured Brochure/ Page (>130 GSM)",
//                                 noOfUnits: values?.colouredBrochurePage,
//                                 emissions: colouredBrochurePageEmission > 0 ? colouredBrochurePageEmission : ''
//                             },
//                             {
//                                 // pType: "Giveaway Paper bags (200 GSM)- A4 Size",
//                                 pType: "Paper Bags",
//                                 noOfUnits: values?.paperBagsA4Size,
//                                 emissions: paperBagsA4SizeEmission > 0 ? paperBagsA4SizeEmission : ''
//                             },
//                             {
//                                 pType: "Giveaway Paper bags (200 GSM)- A5 Size",
//                                 noOfUnits: values?.paperBagsA5Size,
//                                 emissions: paperBagsA5SizeEmission > 0 ? paperBagsA5SizeEmission : ''
//                             },
//                             {
//                                 // pType: "Giveaway Jute bags*- A4 Size",
//                                 pType: "Jute Bags",
//                                 noOfUnits: values?.juteBagsA4Size,
//                                 emissions: juteBagsA4SizeEmission > 0 ? juteBagsA4SizeEmission : ''
//                             },
//                             {
//                                 // pType: "Giveaway Cotton bags- A4 Size",
//                                 pType: "Cotton Bags",
//                                 noOfUnits: values?.cottonBagsA4Size,
//                                 emissions: cottonBagsA4SizeEmission > 0 ? cottonBagsA4SizeEmission : ''
//                             },
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Stage Screen",
//                     subTypeData: {
//                         th: ["", "No of Hours", "No of Devices/ Panels", "Emissions"],
//                         td: [
//                             {
//                                 pType: "Projector",
//                                 noOfHour: values?.projectorNoOfHour,
//                                 noOfDevice: values?.projectorNoOfDevice,
//                                 emissions: projectorEmission > 0 ? projectorEmission : ''
//                             },
//                             {
//                                 pType: "LED Screen Panel (500mmx500mm)",
//                                 noOfHour: values?.ledScreenPanelNoOfHour,
//                                 noOfDevice: values?.ledScreenPanelNoOfDevice,
//                                 emissions: ledScreenPanelEmission > 0 ? ledScreenPanelEmission : ''
//                             }
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Stage Lighting & AV",
//                     subTypeData: {
//                         th: ["", "kwh", "Emissions"],
//                         td: [
//                             {
//                                 pType: "Electricity",
//                                 kwh: values?.kwh,
//                                 emissions: kwhEmission > 0 ? kwhEmission : ''
//                             }
//                         ]
//                     },
//                     // scope: 3
//                 },
//             ];

//             dispatch(addProductionData({ data }));
//             dispatch(addResultTableData({ from: "f2fEvent", data: tableData, tabTitle: "Event Agency" }));
//         },
//     });

//     const handeleDelete = () => {
//         dispatch(deleteProductionData());
//         dispatch(deleteResTabProductionData());
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
//             // fieldDataOne?.forEach((item, i) => {
//             //     formik.setFieldValue(`${item?.fieldName}Area`, allData[i]?.area);
//             //     formik.setFieldValue(`${item?.fieldName}Emission`, allData[i]?.emission);
//             // });

//             // fieldDataTwo?.forEach((item, i) => {
//             //     formik.setFieldValue(`${item?.fieldName}Kgs`, allData[i]?.kgs);
//             //     formik.setFieldValue(`${item?.fieldName}Emission`, allData[i]?.emission);
//             // });

//             // fieldDataThree?.forEach((item, i) => {
//             //     formik.setFieldValue(`${item?.fieldName}NoOfHour`, allData[i]?.noOfHour);
//             //     formik.setFieldValue(`${item?.fieldName}NoOfDevice`, allData[i]?.noOfDevice);
//             //     formik.setFieldValue(`${item?.fieldName}Emission`, allData[i]?.emission);
//             // });

//             // fieldDataFour?.forEach((item, i) => {
//             //     formik.setFieldValue(`${item?.fieldName}NoOfHour`, allData[i]?.noOfHour);
//             //     formik.setFieldValue(`${item?.fieldName}NoOfLight`, allData[i]?.noOfLight);
//             //     formik.setFieldValue(`${item?.fieldName}Emission`, allData[i]?.emission);
//             // });

//             formik.setFieldValue('sawnTimberArea', allData?.[0]?.area);
//             formik.setFieldValue('sawnTimberEmission', allData?.[0]?.emission);
//             formik.setFieldValue('mdfArea', allData?.[1]?.area);
//             formik.setFieldValue('mdfEmission', allData?.[1]?.emission);
//             formik.setFieldValue('openPanelTimberFrameArea', allData?.[2]?.area);
//             formik.setFieldValue('openPanelTimberFrameEmission', allData?.[2]?.emission);
//             formik.setFieldValue('carpetArea', allData?.[3]?.area);
//             formik.setFieldValue('carpetEmission', allData?.[3]?.emission);
//             formik.setFieldValue('adhesiveVinylArea', allData?.[4]?.area);
//             formik.setFieldValue('adhesiveVinylEmission', allData?.[4]?.emission);
//             formik.setFieldValue('cardboardArea', allData?.[5]?.area);
//             formik.setFieldValue('cardboardEmission', allData?.[5]?.emission);
//             formik.setFieldValue('nylonArea', allData?.[6]?.area);
//             formik.setFieldValue('nylonEmission', allData?.[6]?.emission);

//             formik.setFieldValue('woodKgs', allData?.[7]?.kgs);
//             formik.setFieldValue('woodEmission', allData?.[7]?.emission);
//             formik.setFieldValue('steelKgs', allData?.[8]?.kgs);
//             formik.setFieldValue('steelEmission', allData?.[8]?.emission);
//             formik.setFieldValue('aluminiumKgs', allData?.[9]?.kgs);
//             formik.setFieldValue('aluminiumEmission', allData?.[9]?.emission);
//             formik.setFieldValue('ironKgs', allData?.[10]?.kgs);
//             formik.setFieldValue('ironEmission', allData?.[10]?.emission);
//             formik.setFieldValue('paperKgs', allData?.[11]?.kgs);
//             formik.setFieldValue('paperEmission', allData?.[11]?.emission);
//             formik.setFieldValue('recycledPaperKgs', allData?.[12]?.kgs);
//             formik.setFieldValue('recycledPaperEmission', allData?.[12]?.emission);
//             formik.setFieldValue('paintKgs', allData?.[13]?.kgs);
//             formik.setFieldValue('paintEmission', allData?.[13]?.emission);

//             formik.setFieldValue('projectorNoOfHour', allData?.[14]?.noOfHour);
//             formik.setFieldValue('projectorNoOfDevice', allData?.[14]?.noOfDevice);
//             formik.setFieldValue('projectorEmission', allData?.[14]?.emission);
//             formik.setFieldValue('ledScreenPanelNoOfHour', allData?.[15]?.noOfHour);
//             formik.setFieldValue('ledScreenPanelNoOfDevice', allData?.[15]?.noOfDevice);
//             formik.setFieldValue('ledScreenPanelEmission', allData?.[15]?.emission);

//             formik.setFieldValue('kwh', allData?.[16]?.kwh);
//             formik.setFieldValue('kwhEmission', allData?.[16]?.emission);

//             formik.setFieldValue('hdpeBanner', allData?.[17]?.hdpeBanner);
//             formik.setFieldValue('hdpeBannerEmission', allData?.[17]?.emission);
//             formik.setFieldValue('pvcBanners', allData?.[18]?.pvcBanners);
//             formik.setFieldValue('pvcBannersEmission', allData?.[18]?.emission);
//             formik.setFieldValue('cottonBanner', allData?.[19]?.cottonBanner);
//             formik.setFieldValue('cottonBannerEmission', allData?.[19]?.emission);
//             formik.setFieldValue('plasticBadgeHolders', allData?.[20]?.plasticBadgeHolders);
//             formik.setFieldValue('plasticBadgeHoldersEmission', allData?.[20]?.emission);

//             formik.setFieldValue('colouredBrochurePage', allData?.[21]?.colouredBrochurePage);
//             formik.setFieldValue('colouredBrochurePageEmission', allData?.[21]?.emission);
//             formik.setFieldValue('paperBagsA4Size', allData?.[22]?.paperBagsA4Size);
//             formik.setFieldValue('paperBagsA4SizeEmission', allData?.[22]?.emission);
//             formik.setFieldValue('paperBagsA5Size', allData?.[23]?.paperBagsA5Size);
//             formik.setFieldValue('paperBagsA5SizeEmission', allData?.[23]?.emission);
//             formik.setFieldValue('juteBagsA4Size', allData?.[24]?.juteBagsA4Size);
//             formik.setFieldValue('juteBagsA4SizeEmission', allData?.[24]?.emission);
//             formik.setFieldValue('cottonBagsA4Size', allData?.[25]?.cottonBagsA4Size);
//             formik.setFieldValue('cottonBagsA4SizeEmission', allData?.[25]?.emission);
//         }
//     }, [value]);

//     return (
//         <div>
//             <Container maxWidth style={{ maxWidth: 'auto' }} >
//                 <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
//                     <Typography variant="h4" className="text-center text-white mb-4">
//                         Production Material
//                     </Typography>
//                     <Box style={{ display: 'flex', justifyContent: 'center' }}>
//                         <Box
//                             mx={useMediaQuery(theme.breakpoints.up('lg')) && 15}
//                             display={'flex'}
//                             alignItems={'center'}
//                             flexDirection={'column'}
//                         >
//                             <IconDiv>
//                                 <img width={100} src={ProductionImg} alt="Food" className='tabImgWhite' />
//                             </IconDiv>

//                             <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th width="30%" />
//                                                     <th className="ps-2" width="30%">Weight (Kgs)</th>
//                                                     <th className="ps-2" width="30%">Emissions</th>
//                                                 </tr>
//                                                 {fieldDataTwo &&
//                                                     fieldDataTwo?.map((ite) => (
//                                                         <>
//                                                             <tr key={`two${ite}`}>
//                                                                 <td className="py-1">{ite.name}</td>
//                                                                 <td className="ps-2 py-1">
//                                                                     <TextField
//                                                                         size="small"
//                                                                         type="number"
//                                                                         name={`${ite?.fieldName}Kgs`}
//                                                                         value={formik.values[`${ite?.fieldName}Kgs`]}
//                                                                         onChange={(e) => {
//                                                                             formik.handleChange(e);
//                                                                             formik.setFieldValue(
//                                                                                 `${ite?.fieldName}Emission`,
//                                                                                 Number((e.target.value * ite?.ef).toFixed(5))
//                                                                             );
//                                                                             formik.handleSubmit();
//                                                                         }}
//                                                                         inputProps={{ style: { color: 'white' } }}
//                                                                     />
//                                                                 </td>
//                                                                 <td className="ps-2 py-1">
//                                                                     <TextField
//                                                                         size="small"
//                                                                         type="number"
//                                                                         disabled
//                                                                         name={`${ite?.fieldName}Emission`}
//                                                                         value={formik.values[`${ite?.fieldName}Emission`]}
//                                                                         onChange={formik.handleChange}
//                                                                     />
//                                                                 </td>
//                                                             </tr>
//                                                         </>
//                                                     ))}
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>

//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>

//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th width="30%" />
//                                                     <th className="ps-2" width="30%">Total Area (m<sup>2</sup>)</th>
//                                                     <th className="ps-2" width="30%">Emissions</th>
//                                                 </tr>
//                                                 {fieldDataOne &&
//                                                     fieldDataOne?.map((item) => (
//                                                         <>
//                                                             <tr key={`one${item}`}>
//                                                                 <td className="ps-2 py-1">{item.name}</td>
//                                                                 <td className="ps-2 py-1">
//                                                                     <TextField
//                                                                         size="small"
//                                                                         type="number"
//                                                                         name={`${item?.fieldName}Area`}
//                                                                         value={formik.values[`${item?.fieldName}Area`]}
//                                                                         onChange={(e) => {
//                                                                             formik.handleChange(e);
//                                                                             formik.setFieldValue(
//                                                                                 `${item?.fieldName}Emission`,
//                                                                                 Number((e.target.value * item?.ef).toFixed(5))
//                                                                             );
//                                                                             formik.handleSubmit();
//                                                                         }}
//                                                                         inputProps={{ style: { color: 'white' } }}
//                                                                     />
//                                                                 </td>
//                                                                 <td className="ps-2 py-1">
//                                                                     <TextField
//                                                                         size="small"
//                                                                         type="number"
//                                                                         disabled
//                                                                         name={`${item?.fieldName}Emission`}
//                                                                         value={formik.values[`${item?.fieldName}Emission`]}
//                                                                         onChange={formik.handleChange}
//                                                                     />
//                                                                 </td>
//                                                             </tr>
//                                                         </>
//                                                     ))}
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>

//                                 <Grid item xs={12} sm={12} md={12}>
//                                     <Typography variant='h4' className='text-center text-white mb-4'>
//                                         Branding
//                                     </Typography>
//                                 </Grid>

//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th width="30%" />
//                                                     <th className="ps-2" width="30%">Weight (In kgs)</th>
//                                                     <th className="ps-2" width="30%">Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="py-1">Polyethylene Banner*</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="hdpeBanner"
//                                                             value={formik?.values?.hdpeBanner}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('hdpeBanner', e.target.value);
//                                                                 formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(e.target.value)).toFixed(5));
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
//                                                             name="hdpeBannerEmission"
//                                                             value={formik?.values?.hdpeBannerEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="py-1">PVC Banners</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="pvcBanners"
//                                                             value={formik?.values?.pvcBanners}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('pvcBanners', e.target.value);
//                                                                 formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(e.target.value)).toFixed(5));
//                                                                 formik.handleSubmit();
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
//                                                 {/* <tr>
//                                                     <td className="ps-2 py-1">Cotton Banner</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="cottonBanner"
//                                                             value={formik?.values?.cottonBanner}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('cottonBanner', e.target.value);
//                                                                 formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(e.target.value)).toFixed(5));
//                                                                 formik.handleSubmit();
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
//                                                 </tr> */}
//                                                 <tr>
//                                                     <td className="py-1">Plastic Badge</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="plasticBadgeHolders"
//                                                             value={formik?.values?.plasticBadgeHolders}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('plasticBadgeHolders', e.target.value);
//                                                                 formik.setFieldValue('plasticBadgeHoldersEmission', Number(4.2 * Number(e.target.value)).toFixed(5));
//                                                                 formik.handleSubmit();
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
//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th width="30%" />
//                                                     <th className="ps-2" width="30%">No.of A4 Units</th>
//                                                     <th className="ps-2" width="30%">Emissions</th>
//                                                 </tr>
//                                                 {/* <tr>
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
//                                                             name="colouredBrochurePageEmission"
//                                                             value={formik?.values?.colouredBrochurePageEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr> */}
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Paper bags</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="paperBagsA4Size"
//                                                             value={formik?.values?.paperBagsA4Size}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('paperBagsA4Size', e.target.value);
//                                                                 formik.setFieldValue('paperBagsA4SizeEmission', Number(0.3125 * Number(e.target.value)).toFixed(5));

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
//                                                             name="paperBagsA4SizeEmission"
//                                                             value={formik?.values?.paperBagsA4SizeEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 {/* <tr>
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
//                                                             name="paperBagsA5SizeEmission"
//                                                             value={formik?.values?.paperBagsA5SizeEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr> */}
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Jute bags*</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="juteBagsA4Size"
//                                                             value={formik?.values?.juteBagsA4Size}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('juteBagsA4Size', e.target.value);
//                                                                 formik.setFieldValue('juteBagsA4SizeEmission', Number(0.73 * Number(e.target.value)).toFixed(5));

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
//                                                             name="juteBagsA4SizeEmission"
//                                                             value={formik?.values?.juteBagsA4SizeEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="ps-2 py-1">Cotton bags</td>
//                                                     <td className="ps-2 py-1">
//                                                         <TextField
//                                                             size="small"
//                                                             type="number"
//                                                             name="cottonBagsA4Size"
//                                                             value={formik?.values?.cottonBagsA4Size}
//                                                             onChange={(e) => {
//                                                                 formik.setFieldValue('cottonBagsA4Size', e.target.value);
//                                                                 formik.setFieldValue('cottonBagsA4SizeEmission', Number(17 * Number(e.target.value)).toFixed(5));

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
//                                                             name="cottonBagsA4SizeEmission"
//                                                             value={formik?.values?.cottonBagsA4SizeEmission}
//                                                             onChange={formik.handleChange}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>

//                                 <Grid item xs={12} sm={12} md={0.5} />
//                                 <Grid item xs={12} sm={12} md={11}>
//                                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//                                         <Typography variant="h4" className="text-center text-white mb-4">
//                                             Stage Screen
//                                         </Typography>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th width="25%" />
//                                                     <th className="ps-2" width="25%">No of Hours</th>
//                                                     <th className="ps-2" width="25%">No of Devices/ Panels</th>
//                                                     <th className="ps-2" width="25%">Emissions</th>
//                                                 </tr>
//                                                 {fieldDataThree &&
//                                                     fieldDataThree?.map((it) => (
//                                                         <>
//                                                             <tr key={`three${it}`}>
//                                                                 <td className="ps-2 py-1">{it.name}</td>
//                                                                 <td className="ps-2 py-1">
//                                                                     <TextField
//                                                                         size="small"
//                                                                         type="number"
//                                                                         name={`${it?.fieldName}NoOfHour`}
//                                                                         value={formik.values[`${it?.fieldName}NoOfHour`]}
//                                                                         onChange={(e) => {
//                                                                             formik.handleChange(e);
//                                                                             formik.setFieldValue(
//                                                                                 `${it?.fieldName}Emission`,
//                                                                                 Number((e.target.value * formik.values[`${it?.fieldName}NoOfDevice`] * it?.ef).toFixed(5))
//                                                                             );
//                                                                             formik.handleSubmit();
//                                                                         }}
//                                                                         inputProps={{ style: { color: 'white' } }}
//                                                                     />
//                                                                 </td>
//                                                                 <td className="ps-2 py-1">
//                                                                     <TextField
//                                                                         size="small"
//                                                                         type="number"
//                                                                         name={`${it?.fieldName}NoOfDevice`}
//                                                                         value={formik.values[`${it?.fieldName}NoOfDevice`]}
//                                                                         onChange={(e) => {
//                                                                             formik.handleChange(e);
//                                                                             formik.setFieldValue(
//                                                                                 `${it?.fieldName}Emission`,
//                                                                                 Number((formik.values[`${it?.fieldName}NoOfHour`] * e.target.value * it?.ef).toFixed(5))
//                                                                             );
//                                                                             formik.handleSubmit();
//                                                                         }}
//                                                                         inputProps={{ style: { color: 'white' } }}
//                                                                     />
//                                                                 </td>
//                                                                 <td className="ps-2 py-1">
//                                                                     <TextField
//                                                                         size="small"
//                                                                         type="number"
//                                                                         disabled
//                                                                         name={`${it?.fieldName}Emission`}
//                                                                         value={formik.values[`${it?.fieldName}Emission`]}
//                                                                         onChange={formik.handleChange}
//                                                                     />
//                                                                 </td>
//                                                             </tr>
//                                                         </>
//                                                     ))}
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={0.5} />

//                                 {/* <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <Typography variant="h4" className="text-center text-white mb-4">
//                                             Stage Lighting & AV
//                                         </Typography>
//                                         <div className="table-responsive">
//                                             <table className="table-custom-inpt-field">
//                                                 <tr>
//                                                     <th width="250" />
//                                                     <th className="ps-2">kwh</th>
//                                                     <th className="ps-2">Emissions</th>
//                                                 </tr>
//                                                 <>
//                                                     <tr >
//                                                         <td className="ps-2 py-1">Electricity</td>
//                                                         <td className="ps-2 py-1">
//                                                             <TextField
//                                                                 size="small"
//                                                                 type="number"
//                                                                 name={'kwh'}
//                                                                 value={formik.values.kwh}
//                                                                 onChange={(e) => {
//                                                                     formik.handleChange(e);
//                                                                     formik.setFieldValue(
//                                                                         `kwhEmission`,
//                                                                         Number((e.target.value * 0.716).toFixed(5))
//                                                                     );
//                                                                     formik.handleSubmit();
//                                                                 }}
//                                                                 inputProps={{ style: { color: 'white' } }}
//                                                             />
//                                                         </td>
//                                                         <td className="ps-2 py-1">
//                                                             <TextField
//                                                                 size="small"
//                                                                 type="number"
//                                                                 disabled
//                                                                 name={`kwhEmission`}
//                                                                 value={formik.values.kwhEmission}
//                                                                 onChange={formik.handleChange}
//                                                             />
//                                                         </td>
//                                                     </tr>
//                                                 </>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid> */}

//                                 <Grid item xs={12} sm={12} md={12} marginTop={3}>
//                                     <Typography color="white">Note:</Typography>
//                                     <li className="text-white ms-3">Please seek support from your event management agency before filling out the contents of this page.</li>
//                                     <li className="text-white ms-3">100% Recyclable/ Biodegradable</li>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
//                                     <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
//                                         {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
//                                         <Button
//                                             variant="contained"
//                                             onClick={() => {
//                                                 formik.handleSubmit();
//                                                 handleSaveToDb();
//                                                 setValue(value - 1);
//                                             }}
//                                             className="custom-btn"
//                                             startIcon={<FaAngleDoubleLeft />}
//                                         >
//                                             Save and Previous Page
//                                         </Button>
//                                         <Button
//                                             variant="contained"
//                                             onClick={() => {
//                                                 formik.handleSubmit();
//                                                 handleSaveToDb();
//                                                 setValue(value + 1);
//                                             }}
//                                             className="custom-btn"
//                                             endIcon={<FaAngleDoubleRight />}
//                                         >
//                                             {' '}
//                                             Save and Next Page
//                                         </Button>
//                                         <Button
//                                             variant="contained"
//                                             endIcon={<FaAngleDoubleRight />}
//                                             onClick={() => setValue(9)}
//                                             className="custom-btn"
//                                         >
//                                             Go To Result
//                                         </Button>
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
//                                     <Typography color="white">{`Total Event Agency Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Box>
//                 </Card>
//             </Container>
//         </div>
//     );
// };

// export default Production;
