import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addPrAgencyData, deletePrAgencyData } from '../../redux/slice/totalPrAgencySlice';
import {
  addResultTableData,
  deleteResTabPrAgencyData,
  prEventEmissionCatogorywise,
  deletePrAgencyCatogorywiseEmission,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';
import LocalTransportImg from '../../assets/pr agency.png';
import { IconDiv } from '../../components/IconDiv';
import useEventData from '../../hooks/useEventData';

const PrAgency = (props) => {
  const { setValue, value } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const allData = useSelector((state) => state?.totalPrAgencyDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalPrAgencyDetails?.totalEmission);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  const eventsData = useEventData();

  const initialValues = {
    meetingRoomArea: '',
    meetingDuration: '',
    meetingRoomEmission: '',

    noOfHours: '',
    projectorNoOfDevice: '',
    projectorEmission: '',

    hdpeBanner: '',
    hdpeBannerEmission: '',
    pvcBanners: '',
    pvcBannersEmission: '',
    // cottonBanner: '',
    // cottonBannerEmission: '',
    plasticBadgeHolders: '',
    plasticBadgeHoldersEmission: '',

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
    // electricKms: '',
    // electricEmission: '',

    electricityKwh: '',
    electricityEmission: '',
    renewableEnergy: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const meetingRoomEmission =
        values?.meetingRoomArea === 0 || values?.meetingDuration === 0
          ? 0
          : Number((0.00104 * values?.meetingRoomArea * values?.meetingDuration).toFixed(2));
      // const projectorEmission = values?.noOfHours === 0 ? 0 : Number(Number(values?.noOfHours) * Number(0.215)).toFixed(2);
      const projectorEmission =
        values?.noOfHours === 0 || values?.projectorNoOfDevice === 0
          ? 0
          : Number((values?.noOfHours * values?.projectorNoOfDevice * 0.215).toFixed(2));
      const hdpeBannerEmission = Number(3.11 * Number(values?.hdpeBanner)).toFixed(2);
      const pvcBannersEmission = Number(7.83 * Number(values?.pvcBanners)).toFixed(2);
      // const cottonBannerEmission = Number(14.5 * Number(values?.cottonBanner)).toFixed(2);
      const plasticBadgeHoldersEmission = Number(4.2 * Number(values?.plasticBadgeHolders)).toFixed(2);
      const paperBagsA4SizeEmission = Number(0.3125 * Number(values?.paperBagsA4Size)).toFixed(2);
      const paperBagsA5SizeEmission = Number(0.125 * Number(values?.paperBagsA5Size)).toFixed(2);
      const juteBagsA4SizeEmission = Number(0.73 * Number(values?.juteBagsA4Size)).toFixed(2);
      const cottonBagsA4SizeEmission = Number(17 * Number(values?.cottonBagsA4Size)).toFixed(2);
      const colouredBrochurePageEmission = Number(1.56 * Number(values?.colouredBrochurePage)).toFixed(2);
      const a4Size75GsmEmission = Number(0.0047 * Number(values?.a4Size75Gsm)).toFixed(2);
      const petrolEmission = values?.petrolKms === 0 ? 0 : Number(0.163 * values?.petrolKms).toFixed(2);
      const dieselEmission = values?.dieselKms === 0 ? 0 : Number(0.168 * values?.dieselKms).toFixed(2);
      const hybridEmission = values?.hybridKms === 0 ? 0 : Number(0.118 * values?.hybridKms).toFixed(2);
      // const electricEmission = values?.electricKms === 0 ? 0 : Number(0.047 * values?.electricKms).toFixed(2);
      //   const electricityEmission = values?.electricityKwh === 0 ? 0 : Number(0.716 * values?.electricityKwh).toFixed(2);
      let renewableEnergy = Number(values?.renewableEnergy);
      if (renewableEnergy > 100) {
        renewableEnergy = 100;
        formik.setFieldValue('renewableEnergy', 100);
      }
      const energyused = 100 - values?.renewableEnergy;

      const emissionsValue = values?.electricityKwh === 0 ? 0 : Number(0.716 * values?.electricityKwh).toFixed(2);
      // const emissionOne = Number((values?.kwh * 0.716).toFixed(2));
      const electricityEmission = Number(((emissionsValue * energyused) / 100).toFixed(2));

      if (meetingRoomEmission > 0) formik.setFieldValue('meetingRoomEmission', meetingRoomEmission);
      if (projectorEmission > 0) formik.setFieldValue('projectorEmission', projectorEmission);
      if (hdpeBannerEmission > 0) formik.setFieldValue('hdpeBannerEmission', hdpeBannerEmission);
      if (pvcBannersEmission > 0) formik.setFieldValue('pvcBannersEmission', pvcBannersEmission);
      // if (cottonBannerEmission > 0) formik.setFieldValue('cottonBannerEmission', cottonBannerEmission);
      if (plasticBadgeHoldersEmission > 0)
        formik.setFieldValue('plasticBadgeHoldersEmission', plasticBadgeHoldersEmission);
      if (paperBagsA4SizeEmission > 0) formik.setFieldValue('paperBagsA4SizeEmission', paperBagsA4SizeEmission);
      if (paperBagsA5SizeEmission > 0) formik.setFieldValue('paperBagsA5SizeEmission', paperBagsA5SizeEmission);
      if (juteBagsA4SizeEmission > 0) formik.setFieldValue('juteBagsA4SizeEmission', juteBagsA4SizeEmission);
      if (cottonBagsA4SizeEmission > 0) formik.setFieldValue('cottonBagsA4SizeEmission', cottonBagsA4SizeEmission);
      if (colouredBrochurePageEmission > 0)
        formik.setFieldValue('colouredBrochurePageEmission', colouredBrochurePageEmission);
      if (a4Size75GsmEmission > 0) formik.setFieldValue('a4Size75GsmEmission', a4Size75GsmEmission);
      if (petrolEmission > 0) formik.setFieldValue('petrolEmission', petrolEmission);
      if (dieselEmission > 0) formik.setFieldValue('dieselEmission', dieselEmission);
      if (hybridEmission > 0) formik.setFieldValue('hybridEmission', hybridEmission);
      // if (electricEmission > 0) formik.setFieldValue('electricEmission', electricEmission);
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
          projectorNoOfDevice: values?.projectorNoOfDevice,
          emission: projectorEmission > 0 ? projectorEmission : '',
        },
        {
          type: 'PolyethyleneHDPEBanner',
          hdpeBanner: values?.hdpeBanner,
          emission: hdpeBannerEmission > 0 ? hdpeBannerEmission : '',
        },
        {
          type: 'PVCBanners',
          pvcBanners: values?.pvcBanners,
          emission: pvcBannersEmission > 0 ? pvcBannersEmission : '',
        },
        {
          // type: 'CottonBanner',
          // cottonBanner: values?.cottonBanner,
          // emission: cottonBannerEmission > 0 ? cottonBannerEmission : ''
          type: 'PlasticBadgeHolders',
          plasticBadgeHolders: values?.plasticBadgeHolders,
          emission: plasticBadgeHoldersEmission > 0 ? plasticBadgeHoldersEmission : '',
        },
        {
          type: 'PaperBagsA4Size',
          paperBagsA4Size: values?.paperBagsA4Size,
          emission: paperBagsA4SizeEmission > 0 ? paperBagsA4SizeEmission : '',
        },
        {
          type: 'PaperBagsA5Size',
          paperBagsA5Size: values?.paperBagsA5Size,
          emission: paperBagsA5SizeEmission > 0 ? paperBagsA5SizeEmission : '',
        },
        {
          type: 'JuteBagsA4Size',
          juteBagsA4Size: values?.juteBagsA4Size,
          emission: juteBagsA4SizeEmission > 0 ? juteBagsA4SizeEmission : '',
        },
        {
          type: 'CottonBagsA4Size',
          cottonBagsA4Size: values?.cottonBagsA4Size,
          emission: cottonBagsA4SizeEmission > 0 ? cottonBagsA4SizeEmission : '',
        },
        {
          type: 'ColouredBrochurePage',
          colouredBrochurePage: values?.colouredBrochurePage,
          emission: colouredBrochurePageEmission > 0 ? colouredBrochurePageEmission : '',
        },
        {
          type: 'A4Size75Gsm', // Black & White
          a4Size75Gsm: values?.a4Size75Gsm,
          emission: a4Size75GsmEmission > 0 ? a4Size75GsmEmission : '',
        },
        {
          type: 'Petrol',
          petrolKms: values?.petrolKms,
          emission: petrolEmission > 0 ? petrolEmission : '',
        },
        {
          type: 'Diesel',
          dieselKms: values?.dieselKms,
          emission: dieselEmission > 0 ? dieselEmission : '',
        },
        {
          type: 'Hybrid',
          hybridKms: values?.hybridKms,
          emission: hybridEmission > 0 ? hybridEmission : '',
        },
        // {
        //     type: 'Electric',
        //     electricKms: values?.electricKms,
        //     emission: electricEmission > 0 ? electricEmission : ''
        // },
        {
          type: 'Electricity',
          electricityKwh: values?.electricityKwh,
          renewableEnergy: values?.renewableEnergy,
          emission: electricityEmission > 0 ? electricityEmission : '',
        },
      ];


      const tableData = [
        {
          subType: 'Meeting / Ball Room',
          subTypeData: {
            th: ['', 'Meeting Room Area (SqFt)', 'Meeting Duration (No of Hrs)', 'Emissions'],
            td: [
              {
                prType: 'Energy Consumption',
                meetingRoomArea: values?.meetingRoomArea,
                meetingDuration: values?.meetingDuration,
                emissions: meetingRoomEmission > 0 ? meetingRoomEmission : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: 'Projector',
          subTypeData: {
            th: ['', 'No of Hours', 'No of Devices', 'Emissions'],
            td: [
              {
                prType: 'Projector',
                kgs: values?.noOfHours,
                noOfDevice: values?.projectorNoOfDevice,
                emissions: projectorEmission > 0 ? projectorEmission : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: 'Branding',
          subTypeData: {
            th: ['', 'Weight (Kgs)', 'Emissions'],
            td: [
              {
                prType: 'Polyethylene Banner*',
                kgs: values?.hdpeBanner,
                emissions: hdpeBannerEmission > 0 ? hdpeBannerEmission : '',
              },
              {
                prType: 'PVC Banners/ Standee',
                kgs: values?.pvcBanners,
                emissions: pvcBannersEmission > 0 ? pvcBannersEmission : '',
              },
              {
                // prType: "Cotton Banner",
                // kgs: values?.cottonBanner,
                // emissions: cottonBannerEmission > 0 ? cottonBannerEmission : ''
                prType: 'Plastic Badges',
                kgs: values?.plasticBadgeHolders,
                emissions: plasticBadgeHoldersEmission > 0 ? plasticBadgeHoldersEmission : '',
              },
              {
                prType: 'Paper Bags',
                kgs: values?.paperBagsA4Size,
                emissions: paperBagsA4SizeEmission > 0 ? paperBagsA4SizeEmission : '',
              },
              {
                prType: 'Paper Bags- A5 Size',
                kgs: values?.paperBagsA5Size,
                emissions: paperBagsA5SizeEmission > 0 ? paperBagsA5SizeEmission : '',
              },
              {
                prType: 'Jute Bags',
                kgs: values?.juteBagsA4Size,
                emissions: juteBagsA4SizeEmission > 0 ? juteBagsA4SizeEmission : '',
              },
              {
                prType: 'Cotton Bags',
                kgs: values?.cottonBagsA4Size,
                emissions: cottonBagsA4SizeEmission > 0 ? cottonBagsA4SizeEmission : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: 'PR Assets',
          subTypeData: {
            th: ['', 'No. of Pages', 'Emissions'],
            td: [
              {
                prType: 'Printing a Coloured Brochure/ Page (<130 GSM)',
                noOfPages: values?.colouredBrochurePage,
                emissions: colouredBrochurePageEmission > 0 ? colouredBrochurePageEmission : '',
              },
              {
                prType: 'A4 Size (75GSM)',
                noOfPages: values?.a4Size75Gsm,
                emissions: a4Size75GsmEmission > 0 ? a4Size75GsmEmission : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: 'Transportation',
          subTypeData: {
            th: ['Model of Transport', 'No of Kms', 'Emissions'],
            td: [
              {
                prType: 'Petrol',
                noOfKms: values?.petrolKms,
                emissions: petrolEmission > 0 ? petrolEmission : '',
              },
              {
                prType: 'Diesel',
                noOfKms: values?.dieselKms,
                emissions: dieselEmission > 0 ? dieselEmission : '',
              },
              {
                prType: 'Hybrid',
                noOfKms: values?.hybridKms,
                emissions: hybridEmission > 0 ? hybridEmission : '',
              },
              // {
              //     prType: "Electric",
              //     noOfKms: values?.electricKms,
              //     emissions: electricEmission > 0 ? electricEmission : ''
              // },
            ],
          },
          // scope: 3
        },
        {
          subType: 'Energy',
          subTypeData: {
            th: ['', 'kwh', 'RenewableEnergy', 'Emissions'],
            td: [
              {
                prType: 'Electricity',
                kwh: values?.electricityKwh,
                renewableEnergy: values?.renewableEnergy,
                emissions: electricityEmission > 0 ? electricityEmission : '',
              },
            ],
          },
          // scope: 3
        },
      ];


      /* for meeting room, projector, and branding, transportation */
      // const totalBrandingEmission = (Number(hdpeBannerEmission) || 0) + (Number(pvcBannersEmission) || 0) + (Number(cottonBannerEmission) || 0) + (Number(paperBagsA4SizeEmission) || 0) + (Number(paperBagsA5SizeEmission) || 0) + (Number(juteBagsA4SizeEmission) || 0) + (Number(cottonBagsA4SizeEmission) || 0);
      const totalBrandingEmission =
        (Number(hdpeBannerEmission) || 0) +
        (Number(pvcBannersEmission) || 0) +
        (Number(plasticBadgeHoldersEmission) || 0) +
        (Number(paperBagsA4SizeEmission) || 0) +
        (Number(paperBagsA5SizeEmission) || 0) +
        (Number(juteBagsA4SizeEmission) || 0) +
        (Number(cottonBagsA4SizeEmission) || 0);
      // const totalTransportationEmission = (Number(petrolEmission) || 0) + (Number(dieselEmission) || 0) || (Number(hybridEmission) || 0) + (Number(electricEmission) || 0);
      const totalTransportationEmission =
        (Number(petrolEmission) || 0) + (Number(dieselEmission) || 0) || Number(hybridEmission) || 0;
      const meetingBrandingProjectotTranspotatorEmission =
        (Number(meetingRoomEmission) || 0) +
        (Number(projectorEmission) || 0) +
        (Number(electricityEmission) || 0) +
        totalBrandingEmission +
        totalTransportationEmission;

      dispatch(addPrAgencyData({ data }));
      dispatch(addResultTableData({ from: 'prEvent', data: tableData, tabTitle: 'PR Agency' }));
      dispatch(
        prEventEmissionCatogorywise({
          categories: [{ catgName: 'PR Agency', emission: meetingBrandingProjectotTranspotatorEmission }],
        })
      );
    },
  });

  const handeleDelete = () => {
    dispatch(deletePrAgencyData());
    dispatch(deleteResTabPrAgencyData());
    dispatch(deletePrAgencyCatogorywiseEmission());
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
      formik.setFieldValue('meetingRoomArea', allData?.[0]?.meetingRoomArea);
      formik.setFieldValue('meetingDuration', allData?.[0]?.meetingDuration);
      formik.setFieldValue('meetingRoomEmission', allData?.[0]?.emission);

      formik.setFieldValue('noOfHours', allData?.[1]?.noOfHours);
      formik.setFieldValue('projectorNoOfDevice', allData?.[1]?.projectorNoOfDevice);
      formik.setFieldValue('projectorEmission', allData?.[1]?.emission);

      formik.setFieldValue('hdpeBanner', allData?.[2]?.hdpeBanner);
      formik.setFieldValue('hdpeBannerEmission', allData?.[2]?.emission);
      formik.setFieldValue('pvcBanners', allData?.[3]?.pvcBanners);
      formik.setFieldValue('pvcBannersEmission', allData?.[3]?.emission);
      // formik.setFieldValue("cottonBanner", allData?.[4]?.cottonBanner);
      // formik.setFieldValue("cottonBannerEmission", allData?.[4]?.emission);
      formik.setFieldValue('plasticBadgeHolders', allData?.[4]?.plasticBadgeHolders);
      formik.setFieldValue('plasticBadgeHoldersEmission', allData?.[4]?.emission);
      formik.setFieldValue('paperBagsA4Size', allData?.[5]?.paperBagsA4Size);
      formik.setFieldValue('paperBagsA4SizeEmission', allData?.[5]?.emission);
      formik.setFieldValue('paperBagsA5Size', allData?.[6]?.paperBagsA5Size);
      formik.setFieldValue('paperBagsA5SizeEmission', allData?.[6]?.emission);
      formik.setFieldValue('juteBagsA4Size', allData?.[7]?.juteBagsA4Size);
      formik.setFieldValue('juteBagsA4SizeEmission', allData?.[7]?.emission);
      formik.setFieldValue('cottonBagsA4Size', allData?.[8]?.cottonBagsA4Size);
      formik.setFieldValue('cottonBagsA4SizeEmission', allData?.[8]?.emission);
      formik.setFieldValue('colouredBrochurePage', allData?.[9]?.colouredBrochurePage);
      formik.setFieldValue('colouredBrochurePageEmission', allData?.[9]?.emission);
      formik.setFieldValue('a4Size75Gsm', allData?.[10]?.a4Size75Gsm);
      formik.setFieldValue('a4Size75GsmEmission', allData?.[10]?.emission);
      formik.setFieldValue('petrolKms', allData?.[11]?.petrolKms);
      formik.setFieldValue('petrolEmission', allData?.[11]?.emission);
      formik.setFieldValue('dieselKms', allData?.[12]?.dieselKms);
      formik.setFieldValue('dieselEmission', allData?.[12]?.emission);
      formik.setFieldValue('hybridKms', allData?.[13]?.hybridKms);
      formik.setFieldValue('hybridEmission', allData?.[13]?.emission);
      // formik.setFieldValue("electricKms", allData?.[14]?.electricKms);
      // formik.setFieldValue("electricEmission", allData?.[14]?.emission);
      formik.setFieldValue('electricityKwh', allData?.[14]?.electricityKwh);
      formik.setFieldValue('renewableEnergy', allData?.[14]?.renewableEnergy);
      formik.setFieldValue('electricityEmission', allData?.[14]?.emission);
    }
  }, [value]);

  const { values } = formik;
  return (
    <div className="containResponsive">
      <Container maxWidth>
        <Card
          className="p-4 custom-inner-bg textborder"
          style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}
        >
          {/* <Box mx={useMediaQuery(theme.breakpoints.up('lg')) } display={'flex'} alignItems={'center'} flexDirection={'column'}> */}
          <Box
            mx={useMediaQuery(theme.breakpoints.up('lg'))}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <IconDiv>
              <img src={LocalTransportImg} alt="Local Transportation" width={100} className="tabImgWhite" />
            </IconDiv>
            <h4 style={{ display: 'block', margin: 'auto', color: 'white' }} className="py-3">
              Meeting Room Energy Consumption
            </h4>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                <Box>
                  <div className="table-responsive">
                    <table className="table-custom-inpt-field">
                      <tr>
                        <td className="ps-5">Total Meeting Room Area(Sqft)</td>
                        <td className="ps-5">Projector(No Of Hours)</td>
                        <td className="ps-5">Energy Utilised(kwh)*</td>
                      </tr>
                      <tr>
                        <td className="ps-5 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="meetingRoomArea"
                            fullWidth
                            value={formik.values.meetingRoomArea}
                            onChange={(e) => {
                              formik.setFieldValue('meetingRoomArea', e.target.value);
                              formik.setFieldValue(
                                'meetingRoomEmission',
                                e.target.value === 0 || values?.meetingDuration === 0
                                  ? 0
                                  : Number((0.00104 * e.target.value * values?.meetingDuration).toFixed(2))
                              );
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="py-1 ps-5">
                          <TextField
                            size="small"
                            type="number"
                            name="noOfHours"
                            fullWidth
                            value={formik.values.noOfHours}
                            onChange={(e) => {
                              formik.setFieldValue('noOfHours', e.target.value);
                              formik.setFieldValue(
                                'projectorEmission',
                                e.target.value === 0 || values?.noOfHours === 0
                                  ? 0
                                  : Number((0.215 * e.target.value).toFixed(2))
                              );
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-5 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="electricityKwh"
                            value={values?.electricityKwh}
                            onChange={(e) => {
                              formik.setFieldValue('electricityKwh', e.target.value);
                              formik.setFieldValue(
                                'electricityEmission',
                                Number(Number(e.target.value) * 0.716).toFixed(2)
                              );
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-5 pt-2">Meeting Duration(No of Hrs)</td>
                        <td className="ps-5 pt-2">Projector(No of Device)</td>
                        <td className="ps-5">Renewable Energy</td>
                      </tr>
                      <tr>
                        <td className="ps-5 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="meetingDuration"
                            fullWidth
                            value={formik.values.meetingDuration}
                            onChange={(e) => {
                              formik.setFieldValue('meetingDuration', e.target.value);
                              formik.setFieldValue(
                                'meetingRoomEmission',
                                e.target.value === 0 || values?.meetingRoomArea === 0
                                  ? 0
                                  : Number((0.00104 * e.target.value * values?.meetingRoomArea).toFixed(2))
                              );
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-5">
                          <TextField
                            size="small"
                            type="number"
                            name="projectorNoOfDevice"
                            fullWidth
                            value={formik.values.projectorNoOfDevice}
                            onChange={(e) => {
                              formik.setFieldValue('projectorNoOfDevice', e.target.value);
                              formik.setFieldValue(
                                'projectorEmission',
                                e.target.value === 0 || values?.noOfHours === 0
                                  ? 0
                                  : Number((0.215 * Number(values?.noOfHours) * e.target.value).toFixed(2))
                              );
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-5 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="renewableEnergy"
                            fullWidth
                            value={formik.values.renewableEnergy}
                            onChange={(e) => {
                              formik.setFieldValue('renewableEnergy', e.target.value);
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-5 pt-2">Emissions</td>
                        <td className="ps-5 pt-2">Emissions</td>
                        <td className="ps-5 pt-2">Emissions</td>
                      </tr>
                      <tr>
                        <td className="ps-5">
                          <TextField
                            size="small"
                            type="number"
                            disabled
                            name="meetingRoomEmission"
                            value={values?.meetingRoomEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                        <td className="ps-5">
                          <TextField
                            size="small"
                            type="number"
                            disabled
                            name="projectorEmission"
                            value={values?.projectorEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                        <td className="ps-5 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="electricityEmission"
                            disabled
                            value={values?.electricityEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="ps-5 py-2">
                          <Typography color={'white'}>* If you have the exact energy consumption from hotel</Typography>
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Grid>

              {/* <Grid item xs={12} sm={12} md={6} display={'flex'} justifyContent={'center'}>
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
                                    <td className='ps-2 py-1 me-5 mb-xl-1 mb-md-5 SETPrinting'>Energy Utilised(kwh)*</td>

                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>
                                        <TextField size='small' type="number" name='electricityKwh' value={values?.electricityKwh}
                                            onChange={(e) => {
                                                formik.setFieldValue("electricityKwh", e.target.value);
                                                formik.setFieldValue("electricityEmission", Number(Number(e.target.value) * 0.716).toFixed(2));
                                                formik.handleSubmit();
                                            }}
                                            inputProps={{ style: { color: 'white' } }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='ps-2'>Emissions</td>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='electricityEmission' disabled value={values?.electricityEmission} onChange={formik.handleChange} /></td>

                                </tr>
                                <tr>
                                    <td className='ps-2' style={{ maxWidth: "250px" }}>* If you have the exact energy consumption from hotel</td>
                                </tr>
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

                                <tr>
                                    <td className='ps-2 py-1 setPosition '>A4 Size (75GSM)</td>
                                    <td className='ps-3 py-1 '>
                                        <TextField size='small' type="number" name='a4Size75Gsm' value={values?.a4Size75Gsm}
                                            onChange={(e) => {
                                                formik.setFieldValue("a4Size75Gsm", Number(e.target.value));
                                                formik.handleSubmit();
                                            }}
                                            inputProps={{ style: { color: 'white' } }} />
                                    </td>
                                    <td className='ps-2 py-1 '><TextField size='small' type="number" name='a4Size75GsmEmission' disabled value={values?.a4Size75GsmEmission} onChange={formik.handleChange} /></td>
                                </tr>
                            </table>
                        </div>
                    </Box>
                </Grid> */}

              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h4" className="text-center text-white mb-4">
                  Branding
                </Typography>
              </Grid>
              <Grid item xs={12} sm={1} md={1} />

              <Grid item xs={12} sm={12} md={5}>
                <Box>
                  <div className="table-responsive">
                    <table className="table-custom-inpt-field">
                      <tr>
                        <th width="30%" />
                        <th className="ps-2" width="30%">
                          No.of A4 Units
                        </th>
                        <th className="ps-2" width="30%">
                          Emissions
                        </th>
                      </tr>
                      <tr>
                        <td className="ps-2 py-1">Paper Bags</td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="paperBagsA4Size"
                            value={formik?.values?.paperBagsA4Size}
                            onChange={(e) => {
                              formik.setFieldValue('paperBagsA4Size', e.target.value);
                              formik.setFieldValue(
                                'paperBagsA4SizeEmission',
                                Number(0.3125 * Number(e.target.value)).toFixed(2)
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
                            name="paperBagsA4SizeEmission"
                            disabled
                            value={values?.paperBagsA4SizeEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>

                      {/* <tr>
                                                <td className="ps-2 py-1">Paper Bags- A5 Size</td>
                                                <td className="ps-2 py-1">
                                                    <TextField size='small' type="number" name="paperBagsA5Size"
                                                        value={formik?.values?.paperBagsA5Size}
                                                        onChange={(e) => {
                                                            formik.setFieldValue('paperBagsA5Size', e.target.value);
                                                            formik.setFieldValue('paperBagsA5SizeEmission', Number(0.125 * Number(e.target.value)).toFixed(2));

                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className="ps-2 py-1">
                                                    <TextField size='small' type="number" name='paperBagsA5SizeEmission' disabled value={values?.paperBagsA5SizeEmission} onChange={formik.handleChange} />
                                                </td>
                                            </tr> */}
                      <tr>
                        <td className="ps-2 py-1">Jute Bags</td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="juteBagsA4Size"
                            value={formik?.values?.juteBagsA4Size}
                            onChange={(e) => {
                              formik.setFieldValue('juteBagsA4Size', e.target.value);
                              formik.setFieldValue(
                                'juteBagsA4SizeEmission',
                                Number(0.73 * Number(e.target.value)).toFixed(2)
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
                            name="juteBagsA4SizeEmission"
                            disabled
                            value={values?.juteBagsA4SizeEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-2 py-1">Cotton Bags</td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="cottonBagsA4Size"
                            value={formik?.values?.cottonBagsA4Size}
                            onChange={(e) => {
                              formik.setFieldValue('cottonBagsA4Size', e.target.value);
                              formik.setFieldValue(
                                'cottonBagsA4SizeEmission',
                                Number(17 * Number(e.target.value)).toFixed(2)
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
                            name="cottonBagsA4SizeEmission"
                            disabled
                            value={values?.cottonBagsA4SizeEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <Box>
                  <div className="table-responsive">
                    <table className="table-custom-inpt-field">
                      <tr>
                        <th width="30%" />
                        <th className="ps-2" width="30%">
                          Weight (In kgs)
                        </th>
                        <th className="ps-2" width="30%">
                          Emissions
                        </th>
                      </tr>
                      <tr>
                        <td className="py-1">Polyethylene Banner*</td>
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
                                Number(3.11 * Number(e.target.value)).toFixed(2)
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
                        <td className="py-1">PVC Banners</td>
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
                                Number(7.83 * Number(e.target.value)).toFixed(2)
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
                            disabled
                            value={values?.pvcBannersEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      {/* <tr>
                                                    <td className="ps-2 py-1">Cotton Banner</td>
                                                    <td className="ps-2 py-1">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            name="cottonBanner"
                                                            value={formik?.values?.cottonBanner}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('cottonBanner', e.target.value);
                                                                formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(e.target.value)).toFixed(2));
                                                                formik.handleSubmit();
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
                                                </tr> */}
                      <tr>
                        <td className="py-1">Plastic Badge</td>
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
                                Number(4.2 * Number(e.target.value)).toFixed(2)
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
                            disabled
                            value={values?.plasticBadgeHoldersEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={1} md={1} />
              <Grid item xs={12} sm={3} md={3.5} />

              {/* <Grid item xs={12} sm={12} md={5} display={'flex'} justifyContent={'center'} className='mx-auto'>
                                <Box>
                                    <div className='table-responsive'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4'>Branding</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='' width="40%" />
                                                <th className='ps-3' width="30%">Weight (kgs)</th>
                                                <th className='ps-2' width="30%">Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className=''>Polyethylene Banner*</td>
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
                                                <td className=' py-1'>PVC Banners</td>
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
                                                <td className='py-1'>Cotton Banner</td>
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
                                                <td className='py-1'>Paper Bags- A4 Size</td>
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
                                                <td className='py-1'>Paper Bags- A5 Size</td>
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
                                                <td className='py-1'>Jute Bags- A4 Size</td>
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
                                                <td className='py-1 '>Cotton Bags- A4 Size</td>
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
                            </Grid> */}

              <Grid item xs={12} sm={12} md={5}>
                <Box>
                  <div className="table-responsive">
                    <Typography
                      variant="h4"
                      className="text-white mb-4 d-flex justify-content-center align-items-center my-4 "
                    >
                      Transportation
                    </Typography>
                    <table className="table-custom-inpt-field">
                      <tr>
                        <th className="" width="23%">
                          Model of Transport
                        </th>
                        <th className="ps-3" width="30%">
                          No of Kms
                        </th>
                        <th className="ps-2" width="30%">
                          Emissions
                        </th>
                      </tr>
                      <tr>
                        <td className="py-1">Petrol</td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="petrolKms"
                            value={values?.petrolKms}
                            onChange={(e) => {
                              formik.setFieldValue('petrolKms', e.target.value);
                              formik.setFieldValue('petrolEmission', Number(Number(e.target.value) * 0.163).toFixed(2));
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="petrolEmission"
                            disabled
                            value={values?.petrolEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">Diesel</td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="dieselKms"
                            value={values?.dieselKms}
                            onChange={(e) => {
                              formik.setFieldValue('dieselKms', e.target.value);
                              formik.setFieldValue('dieselEmission', Number(Number(e.target.value) * 0.168).toFixed(2));
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="dieselEmission"
                            disabled
                            value={values?.dieselEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">Hybrid</td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="hybridKms"
                            value={values?.hybridKms}
                            onChange={(e) => {
                              formik.setFieldValue('hybridKms', e.target.value);
                              formik.setFieldValue('hybridEmission', Number(Number(e.target.value) * 0.118).toFixed(2));
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="hybridEmission"
                            disabled
                            value={values?.hybridEmission}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      {/* <tr>
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
                                            </tr> */}
                    </table>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={3.5} />

              {/* <Grid item xs={12} sm={6} md={6} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive my-4'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center'>Energy</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'/>
                                                <th className='ps-2'>kwh</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1 setPosition'>Electricity</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='electricityKwh' value={values?.electricityKwh}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("electricityKwh", e.target.value);
                                                            formik.setFieldValue("electricityEmission", Number(Number(e.target.value) * 0.716).toFixed(2));
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

                            <Grid item xs={12} sm={6} md={6} display={'flex'} justifyContent={'center'}>
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
                            </Grid> */}

              <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'} className="mx-auto">
                <Stack direction={'row'} spacing={2}>
                  {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                  <Button
                    variant="contained"
                    startIcon={<FaAngleDoubleLeft />}
                    onClick={() => {
                      handleSaveToDb();
                      setValue(value - 1);
                    }}
                    className="custom-btn"
                  >
                    Save and Previous Page
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<FaAngleDoubleRight />}
                    onClick={() => {
                      handleSaveToDb();
                      setValue(value + 1);
                    }}
                    className="custom-btn"
                  >
                    {' '}
                    Save and Next Page
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<FaAngleDoubleRight />}
                    onClick={() => {
                      handleSaveToDb();
                      setValue(3);
                    }}
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

              <Grid item xs={12} sm={12} md={12} marginY={2} display={'flex'} justifyContent={'center'}>
                <Typography color="white">
                  {`Total PR Agency Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </div>
  );

  // return (
  //     <div className='containResponsive'>
  //         <Container maxWidth>
  //             <Card className='p-4 custom-inner-bg textborder' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
  //                 <Box mx={useMediaQuery(theme.breakpoints.up('lg'))} display={'flex'} alignItems={'center'} flexDirection={'column'}>
  //                     <IconDiv>
  //                         <img src={LocalTransportImg} alt="Local Transportation" width={100} className='tabImgWhite' />
  //                     </IconDiv>
  //                     <Grid
  //                         container
  //                         rowSpacing={3}
  //                         columnSpacing={{ xs: 0, sm: 5, md: 4 }}
  //                     >

  //                         <Grid item xs={12} sm={6} md={6} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Projector</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2' />
  //                                             <th className='ps-5'>No of Hours</th>
  //                                             <th className='ps-5'>No of Devices</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 setdata'>Projector</td>
  //                                             <td className='ps-5 py-1 setallignment'>
  //                                                 <TextField size='small' type="number"
  //                                                     name="noOfHours"
  //                                                     fullWidth
  //                                                     value={formik.values.noOfHours}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('noOfHours', e.target.value);
  //                                                         formik.setFieldValue('projectorEmission', (e.target.value === 0 || values?.noOfDevice === 0) ? 0 : Number((0.215 * Number(values?.noOfDevice) * e.target.value).toFixed(2)));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }}
  //                                                 />
  //                                             </td>
  //                                             <td className='ps-2 py-1 setallignment'>
  //                                                 <TextField size='small' type="number"
  //                                                     name="projectorNoOfDevice"
  //                                                     fullWidth
  //                                                     value={formik.values.projectorNoOfDevice}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('projectorNoOfDevice', e.target.value);
  //                                                         formik.setFieldValue('projectorEmission', (e.target.value === 0 || values?.noOfHours === 0) ? 0 : Number((0.215 * Number(values?.noOfHours) * e.target.value).toFixed(2)));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }}
  //                                                 />
  //                                             </td>
  //                                             <td className='ps-2 py-1 ms-4'>
  //                                                 <TextField size='small' type="number" disabled name='projectorEmission' value={values?.projectorEmission} onChange={formik.handleChange} />
  //                                             </td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={6} md={6} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>PR Assets</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2' />
  //                                             <th className='ps-3'>No. of Pages</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 me-5 mb-xl-1 mb-md-5 SETPrinting'>Printing a Coloured Brochure/ Page (&lt;130 GSM)</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="colouredBrochurePage"
  //                                                     value={formik?.values?.colouredBrochurePage}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('colouredBrochurePage', e.target.value);
  //                                                         formik.setFieldValue('colouredBrochurePageEmission', Number(1.56 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='colouredBrochurePageEmission' disabled value={values?.colouredBrochurePageEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition '>A4 Size (75GSM)</td>
  //                                             <td className='ps-3 py-1 '>
  //                                                 <TextField size='small' type="number" name='a4Size75Gsm' value={values?.a4Size75Gsm}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("a4Size75Gsm", Number(e.target.value));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1 '><TextField size='small' type="number" name='a4Size75GsmEmission' disabled value={values?.a4Size75GsmEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={6} md={6} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex   justify-content-center align-items-center my-4 '>Branding</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2' />
  //                                             <th className='ps-3'>Weight (kgs)</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 setPosition '>Polyethylene Banner*</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="hdpeBanner"
  //                                                     value={formik?.values?.hdpeBanner}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('hdpeBanner', e.target.value);
  //                                                         formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size="small" type="number" disabled name="hdpeBannerEmission" value={formik?.values?.hdpeBannerEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>PVC Banners</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="pvcBanners"
  //                                                     value={formik?.values?.pvcBanners}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('pvcBanners', e.target.value);
  //                                                         formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='pvcBannersEmission' disabled value={values?.pvcBannersEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>Cotton Banner</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="cottonBanner"
  //                                                     value={formik?.values?.cottonBanner}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('cottonBanner', e.target.value);
  //                                                         formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='cottonBannerEmission' disabled value={values?.cottonBannerEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>Paper Bags- A4 Size</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="paperBagsA4Size"
  //                                                     value={formik?.values?.paperBagsA4Size}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('paperBagsA4Size', e.target.value);
  //                                                         formik.setFieldValue('paperBagsA4SizeEmission', Number(0.3125 * Number(e.target.value)).toFixed(2));

  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='paperBagsA4SizeEmission' disabled value={values?.paperBagsA4SizeEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>Paper Bags- A5 Size</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="paperBagsA5Size"
  //                                                     value={formik?.values?.paperBagsA5Size}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('paperBagsA5Size', e.target.value);
  //                                                         formik.setFieldValue('paperBagsA5SizeEmission', Number(0.125 * Number(e.target.value)).toFixed(2));

  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='paperBagsA5SizeEmission' disabled value={values?.paperBagsA5SizeEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>Jute Bags- A4 Size</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="juteBagsA4Size"
  //                                                     value={formik?.values?.juteBagsA4Size}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('juteBagsA4Size', e.target.value);
  //                                                         formik.setFieldValue('juteBagsA4SizeEmission', Number(0.73 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='juteBagsA4SizeEmission' disabled value={values?.juteBagsA4SizeEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2  py-1 cotten'>Cotton Bags- A4 Size</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="cottonBagsA4Size"
  //                                                     value={formik?.values?.cottonBagsA4Size}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('cottonBagsA4Size', e.target.value);
  //                                                         formik.setFieldValue('cottonBagsA4SizeEmission', Number(17 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='cottonBagsA4SizeEmission' disabled value={values?.cottonBagsA4SizeEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={6} md={6} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Transportation</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2 setPosition'>Model of Transport</th>
  //                                             <th className='ps-3'>No of Kms</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>Petrol</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='petrolKms' value={values?.petrolKms}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("petrolKms", e.target.value);
  //                                                         formik.setFieldValue("petrolEmission", Number(Number(e.target.value) * 0.163).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='petrolEmission' disabled value={values?.petrolEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>Diesel</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='dieselKms' value={values?.dieselKms}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("dieselKms", e.target.value);
  //                                                         formik.setFieldValue("dieselEmission", Number(Number(e.target.value) * 0.168).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='dieselEmission' disabled value={values?.dieselEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>Hybrid</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='hybridKms' value={values?.hybridKms}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("hybridKms", e.target.value);
  //                                                         formik.setFieldValue("hybridEmission", Number(Number(e.target.value) * 0.118).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='hybridEmission' disabled value={values?.hybridEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>Electric</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='electricKms' value={values?.electricKms}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("electricKms", e.target.value);
  //                                                         formik.setFieldValue("electricEmission", Number(Number(e.target.value) * 0.047).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='electricEmission' disabled value={values?.electricEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={6} md={6} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive my-4'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center'>Energy</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2'/>
  //                                             <th className='ps-2'>kwh</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1 setPosition'>Electricity</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='electricityKwh' value={values?.electricityKwh}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("electricityKwh", e.target.value);
  //                                                         formik.setFieldValue("electricityEmission", Number(Number(e.target.value) * 0.716).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='electricityEmission' disabled value={values?.electricityEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={6} md={6} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Meeting / Ball Room</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2' />
  //                                             <th className='ps-2'>Meeting Room Area (Sqft)</th>
  //                                             <th className='ps-2'>Meeting Duration (No of Hrs)</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2'>Energy Consumption</td>
  //                                             <td className='ps-2 py-1'>
  //                                                 <TextField size='small' type="number"
  //                                                     name="meetingRoomArea"
  //                                                     fullWidth
  //                                                     value={formik.values.meetingRoomArea}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('meetingRoomArea', e.target.value);
  //                                                         formik.setFieldValue('meetingRoomEmission', (e.target.value === 0 || values?.meetingDuration === 0) ? 0 : Number((0.00104 * e.target.value * values?.meetingDuration).toFixed(2)));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }}
  //                                                 />
  //                                             </td>
  //                                             <td className='ps-2 py-1'>
  //                                                 <TextField size='small' type="number" name="meetingDuration"
  //                                                     label=""
  //                                                     fullWidth
  //                                                     value={formik.values.meetingDuration}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('meetingDuration', e.target.value);
  //                                                         formik.setFieldValue('meetingRoomEmission', (e.target.value === 0 || values?.meetingRoomArea === 0) ? 0 : Number((0.00104 * e.target.value * values?.meetingRoomArea).toFixed(2)));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'>
  //                                                 <TextField size='small' type="number" disabled name='meetingRoomEmission' value={values?.meetingRoomEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
  //                             <Stack direction={"row"} spacing={2}>
  //                                 <Button variant='contained' startIcon={<FaAngleDoubleLeft />} onClick={() => { formik.handleSubmit(); setValue(value - 1); }} className='custom-btn'>Save and Previous Page</Button>
  //                                 <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'> Save and Next Page</Button>
  //                                 <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
  //                                 <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
  //                             </Stack>
  //                         </Grid>

  //                         <Grid item xs={12} sm={12} md={12} marginY={2} display={"flex"} justifyContent={"center"}>
  //                             <Typography color='white'>{`Total PR Agency Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
  //                         </Grid>

  //                     </Grid>
  //                 </Box>
  //             </Card>
  //         </Container>
  //     </div>
  // )
  // return (
  //     <div>
  //         <Container maxWidth>
  //             <Card className='p-4 custom-inner-bg textborder' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>

  //                 <Box mx={useMediaQuery(theme.breakpoints.up('lg'))} display={'flex'} alignItems={'center'} flexDirection={'column'}>
  //                     <IconDiv>
  //                         <img src={LocalTransportImg} alt="Local Transportation" width={100} className='tabImgWhite' />
  //                     </IconDiv>
  //                     <Grid
  //                         // container
  //                         rowSpacing={3}
  //                         columnSpacing={{ xs: 0, sm: 5, md: 4 }}
  //                     >
  //                         <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Meeting / Ball Room</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2' />
  //                                             <th className='ps-2'>Meeting Room Area (Sqft)</th>
  //                                             <th className='ps-2'>Meeting Duration (No of Hrs)</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2'>Energy Consumption</td>
  //                                             <td className='ps-2 py-1'>
  //                                                 <TextField size='small' type="number"
  //                                                     name="meetingRoomArea"
  //                                                     fullWidth
  //                                                     value={formik.values.meetingRoomArea}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('meetingRoomArea', e.target.value);
  //                                                         formik.setFieldValue('meetingRoomEmission', (e.target.value === 0 || values?.meetingDuration === 0) ? 0 : Number((0.00104 * e.target.value * values?.meetingDuration).toFixed(2)));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }}
  //                                                 />
  //                                             </td>
  //                                             <td className='ps-2 py-1'>
  //                                                 <TextField size='small' type="number" name="meetingDuration"
  //                                                     label=""
  //                                                     fullWidth
  //                                                     value={formik.values.meetingDuration}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('meetingDuration', e.target.value);
  //                                                         formik.setFieldValue('meetingRoomEmission', (e.target.value === 0 || values?.meetingRoomArea === 0) ? 0 : Number((0.00104 * e.target.value * values?.meetingRoomArea).toFixed(2)));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'>
  //                                                 <TextField size='small' type="number" disabled name='meetingRoomEmission' value={values?.meetingRoomEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Projector</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2' />
  //                                             <th className='ps-2'>No of Hours</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2'>Projector</td>
  //                                             <td className='ps-2 py-1'>
  //                                                 <TextField size='small' type="number"
  //                                                     name="noOfHours"
  //                                                     fullWidth
  //                                                     value={formik.values.noOfHours}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('noOfHours', e.target.value);
  //                                                         formik.setFieldValue('projectorEmission', (e.target.value === 0 || values?.noOfHours === 0) ? 0 : Number((0.215 * e.target.value).toFixed(2)));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }}
  //                                                 />
  //                                             </td>
  //                                             <td className='ps-2 py-1'>
  //                                                 <TextField size='small' type="number" disabled name='projectorEmission' value={values?.projectorEmission} onChange={formik.handleChange} />
  //                                             </td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Branding</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2' />
  //                                             <th className='ps-3'>Weight (kgs)</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2'>Polyethylene Banner*</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="hdpeBanner"
  //                                                     value={formik?.values?.hdpeBanner}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('hdpeBanner', e.target.value);
  //                                                         formik.setFieldValue('hdpeBannerEmission', Number(3.11 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size="small" type="number" disabled name="hdpeBannerEmission" value={formik?.values?.hdpeBannerEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>PVC Banners</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="pvcBanners"
  //                                                     value={formik?.values?.pvcBanners}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('pvcBanners', e.target.value);
  //                                                         formik.setFieldValue('pvcBannersEmission', Number(7.83 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='pvcBannersEmission' disabled value={values?.pvcBannersEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Cotton Banner</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="cottonBanner"
  //                                                     value={formik?.values?.cottonBanner}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('cottonBanner', e.target.value);
  //                                                         formik.setFieldValue('cottonBannerEmission', Number(14.5 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='cottonBannerEmission' disabled value={values?.cottonBannerEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Paper Bags- A4 Size</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="paperBagsA4Size"
  //                                                     value={formik?.values?.paperBagsA4Size}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('paperBagsA4Size', e.target.value);
  //                                                         formik.setFieldValue('paperBagsA4SizeEmission', Number(0.3125 * Number(e.target.value)).toFixed(2));

  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='paperBagsA4SizeEmission' disabled value={values?.paperBagsA4SizeEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Paper Bags- A5 Size</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="paperBagsA5Size"
  //                                                     value={formik?.values?.paperBagsA5Size}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('paperBagsA5Size', e.target.value);
  //                                                         formik.setFieldValue('paperBagsA5SizeEmission', Number(0.125 * Number(e.target.value)).toFixed(2));

  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='paperBagsA5SizeEmission' disabled value={values?.paperBagsA5SizeEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Jute Bags- A4 Size</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="juteBagsA4Size"
  //                                                     value={formik?.values?.juteBagsA4Size}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('juteBagsA4Size', e.target.value);
  //                                                         formik.setFieldValue('juteBagsA4SizeEmission', Number(0.73 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='juteBagsA4SizeEmission' disabled value={values?.juteBagsA4SizeEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Cotton Bags- A4 Size</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="cottonBagsA4Size"
  //                                                     value={formik?.values?.cottonBagsA4Size}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('cottonBagsA4Size', e.target.value);
  //                                                         formik.setFieldValue('cottonBagsA4SizeEmission', Number(17 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='cottonBagsA4SizeEmission' disabled value={values?.cottonBagsA4SizeEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>PR Assets</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2' />
  //                                             <th className='ps-3'>No. of Pages</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Printing a Coloured Brochure/ Page (&lt;130 GSM)</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name="colouredBrochurePage"
  //                                                     value={formik?.values?.colouredBrochurePage}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue('colouredBrochurePage', e.target.value);
  //                                                         formik.setFieldValue('colouredBrochurePageEmission', Number(1.56 * Number(e.target.value)).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='colouredBrochurePageEmission' disabled value={values?.colouredBrochurePageEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>A4 Size (75GSM)</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='a4Size75Gsm' value={values?.a4Size75Gsm}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("a4Size75Gsm", Number(e.target.value));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='a4Size75GsmEmission' disabled value={values?.a4Size75GsmEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center my-4 '>Transportation</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2'>Model of Transport</th>
  //                                             <th className='ps-3'>No of Kms</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Petrol</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='petrolKms' value={values?.petrolKms}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("petrolKms", e.target.value);
  //                                                         formik.setFieldValue("petrolEmission", Number(Number(e.target.value) * 0.163).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='petrolEmission' disabled value={values?.petrolEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Diesel</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='dieselKms' value={values?.dieselKms}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("dieselKms", e.target.value);
  //                                                         formik.setFieldValue("dieselEmission", Number(Number(e.target.value) * 0.168).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='dieselEmission' disabled value={values?.dieselEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Hybrid</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='hybridKms' value={values?.hybridKms}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("hybridKms", e.target.value);
  //                                                         formik.setFieldValue("hybridEmission", Number(Number(e.target.value) * 0.118).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='hybridEmission' disabled value={values?.hybridEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Electric</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='electricKms' value={values?.electricKms}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("electricKms", e.target.value);
  //                                                         formik.setFieldValue("electricEmission", Number(Number(e.target.value) * 0.047).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='electricEmission' disabled value={values?.electricEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
  //                             <Box>
  //                                 <div className='table-responsive my-4'>
  //                                     <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center'>Energy</Typography>
  //                                     <table className='table-custom-inpt-field'>
  //                                         <tr>
  //                                             <th className='ps-2' />
  //                                             <th className='ps-2'>kwh</th>
  //                                             <th className='ps-2'>Emissions</th>
  //                                         </tr>
  //                                         <tr>
  //                                             <td className='ps-2 py-1'>Electricity</td>
  //                                             <td className='ps-3 py-1'>
  //                                                 <TextField size='small' type="number" name='electricityKwh' value={values?.electricityKwh}
  //                                                     onChange={(e) => {
  //                                                         formik.setFieldValue("electricityKwh", e.target.value);
  //                                                         formik.setFieldValue("electricityEmission", Number(Number(e.target.value) * 0.716).toFixed(2));
  //                                                         formik.handleSubmit();
  //                                                     }}
  //                                                     inputProps={{ style: { color: 'white' } }} />
  //                                             </td>
  //                                             <td className='ps-2 py-1'><TextField size='small' type="number" name='electricityEmission' disabled value={values?.electricityEmission} onChange={formik.handleChange} /></td>
  //                                         </tr>
  //                                     </table>
  //                                 </div>
  //                             </Box>
  //                         </Grid>

  //                         <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
  //                             <Stack direction={"row"} spacing={2}>
  //                                 <Button variant='contained' startIcon={<FaAngleDoubleLeft />} onClick={() => { formik.handleSubmit(); setValue(value - 1); }} className='custom-btn'>Save and Previous Page</Button>
  //                                 <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'> Save and Next Page</Button>
  //                                 <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
  //                                 <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
  //                             </Stack>
  //                         </Grid>
  //                         <Grid item xs={12} sm={12} md={12} marginY={2}>
  //                             <Typography color='white'>{`Total PR Agency Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
  //                         </Grid>
  //                     </Grid>
  //                 </Box>
  //             </Card>
  //         </Container>
  //     </div>
  // )
};

export default PrAgency;
