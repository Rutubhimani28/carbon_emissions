import {
  Box,
  Button,
  Card,
  Container,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IconDiv } from '../../components/IconDiv';
import { addLogisticsData, deleteLogisticsData } from '../../redux/slice/totalAirFreightSlice';
import {
  addResultTableData,
  deleteResTabLogisticsData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';
import LogisticsImg from '../../assets/Logistics.png';
import useEventData from '../../hooks/useEventData';

const AirFreight = (props) => {
  const { setValue, value } = props;
  const theme = useTheme();

  const dispatch = useDispatch();
  const allData = useSelector((state) => state?.totalAirFreightDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalAirFreightDetails?.totalEmission);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  const eventsData = useEventData();

  // -----------   initialValues
  const initialValues = {
    noOfKmsOne: '', // Air Craft
    noOfKmsTwo: '', // Rail
    noOfKmsThree: '', // Road
    noOfKmsFour: '', // Cargo Ship (Container)
    noOfKmsFive: '', // Cargo Ship (Bulk Carrier)
    noOfKmsSix: '', // Sea Tanker
    noOfKmsSeven: '', // Light Good Vehicle
    noOfKmsEight: '', // Heavy Good Vehicle
    kgsOne: '',
    kgsTwo: '',
    kgsThree: '',
    kgsFour: '',
    kgsFive: '',
    kgsSix: '',
    kgsSeven: '',
    kgsEight: '',
    efOne: 0.5098,
    efTwo: 0.0124,
    efThree: 0.18,
    efFour: 0.016,
    efFive: 0.003,
    efSix: 0.005,
    efSeven: 0.405,
    efEight: 0.095,
    emissionOne: '',
    emissionTwo: '',
    emissionThree: '',
    emissionFour: '',
    emissionFive: '',
    emissionSix: '',
    emissionSeven: '',
    emissionEight: '',

    AirTone: '',
    AirTonekms: '',
    AirToneEmmisions: '',
    AirToneEf: 1.13,

    RoadTone: '',
    RoadTonekms: '',
    RoadToneEmmisions: '',
    RoadToneEF: 0.2,

    RailTone: '',
    RailTonekms: '',
    RailToneEmmisions: '',
    RailToneEF: 0.05,

    seaTone: '',
    seaTonekms: '',
    seaToneEmmisions: '',
    seaToneEF: 0.01,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      // Logistics, Emissions=(B24*C24*D24)/1000

      const AirToneEmmisions =
        values?.AirTone === 0 || values?.AirTonekms === 0
          ? 0
          : Number(
              parseFloat(values?.AirTone) * parseFloat(values?.AirTonekms) * parseFloat(values?.AirToneEf)
            ).toFixed(5);
      const RoadToneEmmisions =
        values?.RoadTone === 0 || values?.RoadTonekms === 0
          ? 0
          : Number(
              parseFloat(values?.RoadTone) * parseFloat(values?.RoadTonekms) * parseFloat(values?.RoadToneEF)
            ).toFixed(5);
      const RailToneEmmisions =
        values?.RailTone === 0 || values?.RailTonekms === 0
          ? 0
          : Number(
              parseFloat(values?.RailTone) * parseFloat(values?.RailTonekms) * parseFloat(values?.RailToneEF)
            ).toFixed(5);
      const seaToneEmmisions =
        values?.seaTone === 0 || values?.seaTonekms === 0
          ? 0
          : Number(parseFloat(values?.seaTone) * parseFloat(values?.seaTonekms) * 0.01).toFixed(5);
      const emissionOne =
        values?.noOfKmsOne === 0 || values?.kgsOne === 0
          ? 0
          : Number((Number(values?.noOfKmsOne) * Number(values?.kgsOne) * Number(values?.efOne)) / 1000).toFixed(5);
      const emissionTwo =
        values?.noOfKmsTwo === 0 || values?.kgsTwo === 0
          ? 0
          : Number((Number(values?.noOfKmsTwo) * Number(values?.kgsTwo) * Number(values?.efTwo)) / 1000).toFixed(5);
      const emissionThree =
        values?.noOfKmsThree === 0 || values?.kgsThree === 0
          ? 0
          : Number((Number(values?.noOfKmsThree) * Number(values?.kgsThree) * Number(values?.efThree)) / 1000).toFixed(
              2
            );
      const emissionFour =
        values?.noOfKmsFour === 0 || values?.kgsFour === 0
          ? 0
          : Number((Number(values?.noOfKmsFour) * Number(values?.kgsFour) * Number(values?.efFour)) / 1000).toFixed(5);
      const emissionFive =
        values?.noOfKmsFive === 0 || values?.kgsFive === 0
          ? 0
          : Number((Number(values?.noOfKmsFive) * Number(values?.kgsFive) * Number(values?.efFive)) / 1000).toFixed(5);
      const emissionSix =
        values?.noOfKmsSix === 0 || values?.kgsSix === 0
          ? 0
          : Number((Number(values?.noOfKmsSix) * Number(values?.kgsSix) * Number(values?.efSix)) / 1000).toFixed(5);
      const emissionSeven =
        values?.noOfKmsSeven === 0 || values?.kgsSeven === 0
          ? 0
          : Number((Number(values?.noOfKmsSeven) * Number(values?.kgsSeven) * Number(values?.efSeven)) / 1000).toFixed(
              2
            );
      const emissionEight =
        values?.noOfKmsEight === 0 || values?.kgsEight === 0
          ? 0
          : Number((Number(values?.noOfKmsEight) * Number(values?.kgsEight) * Number(values?.efEight)) / 1000).toFixed(
              2
            );
      if (AirToneEmmisions > 0) formik.setFieldValue('AirToneEmmisions', AirToneEmmisions);
      if (RoadToneEmmisions > 0) formik.setFieldValue('RoadToneEmmisions', RoadToneEmmisions);
      if (RailToneEmmisions > 0) formik.setFieldValue('RailToneEmmisions', RailToneEmmisions);
      if (seaToneEmmisions > 0) formik.setFieldValue('seaToneEmmisions', seaToneEmmisions);
      if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
      if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
      if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
      if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);
      if (emissionFive > 0) formik.setFieldValue('emissionFive', emissionFive);
      if (emissionSix > 0) formik.setFieldValue('emissionSix', emissionSix);
      if (emissionSeven > 0) formik.setFieldValue('emissionSeven', emissionSeven);
      if (emissionEight > 0) formik.setFieldValue('emissionEight', emissionEight);

      const data = [
        {
          type: 'Air',
          AirTone: values?.AirTone,
          AirTonekms: values?.AirTonekms,
          AirToneEf: values?.AirToneEf,
          emission: AirToneEmmisions > 0 ? AirToneEmmisions : '',
        },
        {
          type: 'Road',
          RoadTone: values?.RoadTone,
          RoadTonekms: values?.RoadTonekms,
          RoadToneEF: values?.RoadToneEF,
          emission: RoadToneEmmisions > 0 ? RoadToneEmmisions : '',
        },
        {
          type: 'Rail',
          RailTone: values?.RailTone,
          RailTonekms: values?.RailTonekms,
          RailToneEF: values?.RailToneEF,
          emission: RailToneEmmisions > 0 ? RailToneEmmisions : '',
        },
        {
          type: 'Sea/ Inland Water',
          seaTone: values?.seaTone,
          seaTonekms: values?.seaTonekms,
          seaToneEF: values?.seaToneEF,
          emission: seaToneEmmisions > 0 ? seaToneEmmisions : '',
        },
        // {
        //   type: 'Air Craft',
        //   noOfKmsOne: values?.noOfKmsOne,
        //   kgsOne: values?.kgsOne,
        //   efOne: values?.efOne,
        //   emission: emissionOne > 0 ? emissionOne : '',
        // },
        // {
        //   type: 'Rail',
        //   noOfKmsTwo: values?.noOfKmsTwo,
        //   kgsTwo: values?.kgsTwo,
        //   efTwo: values?.efTwo,
        //   emission: emissionTwo > 0 ? emissionTwo : '',
        // },
        // {
        //   type: 'Road',
        //   noOfKmsThree: values?.noOfKmsThree,
        //   kgsThree: values?.kgsThree,
        //   efThree: values?.efThree,
        //   emission: emissionThree > 0 ? emissionThree : '',
        // },
        // {
        //   type: 'Cargo Ship (Container)',
        //   noOfKmsFour: values?.noOfKmsFour,
        //   kgsFour: values?.kgsFour,
        //   efFour: values?.efFour,
        //   emission: emissionTwo > 0 ? emissionFour : '',
        // },
        // {
        //   type: 'Cargo Ship (Bulk Carrier)',
        //   noOfKmsFive: values?.noOfKmsFive,
        //   kgsFive: values?.kgsFive,
        //   efFive: values?.efFive,
        //   emission: emissionFive > 0 ? emissionFive : '',
        // },
        // {
        //   type: 'Sea Tanker',
        //   noOfKmsSix: values?.noOfKmsSix,
        //   kgsSix: values?.kgsSix,
        //   efSix: values?.efSix,
        //   emission: emissionSix > 0 ? emissionSix : '',
        // },
        // {
        //   type: 'Light Good Vehicle',
        //   noOfKmsSeven: values?.noOfKmsSeven,
        //   kgsSeven: values?.kgsSeven,
        //   efSeven: values?.efSeven,
        //   emission: emissionSeven > 0 ? emissionSeven : '',
        // },
        // {
        //   type: 'Heavy Good Vehicle',
        //   noOfKmsEight: values?.noOfKmsEight,
        //   kgsEight: values?.kgsEight,
        //   efEight: values?.efEight,
        //   emission: emissionEight > 0 ? emissionEight : '',
        // },
      ];

      const tableData = [
        {
          subType: 'Mode of Freight',
          subTypeData: {
            th: ['', 'No. of tonnes', 'No. of tonne-kms', 'Emissions'],
            td: [
              {
                frType: 'Air',
                noOfTone: values?.AirTone,
                noofKms: values?.AirTonekms,
                // AirTone: values?.AirTone,
                // AirTonekms: values?.AirTonekms,
                emissions: AirToneEmmisions > 0 ? AirToneEmmisions : '',
              },
              {
                frType: 'Road',
                noOfTone: values?.RoadTone,
                noofKms: values?.RoadTonekms,
                // RoadTone: values?.RoadTone,
                // RoadTonekms: values?.RoadTonekms,
                emissions: RoadToneEmmisions > 0 ? RoadToneEmmisions : '',
              },
              {
                frType: 'Rail',
                noOfTone: values?.RailTone,
                noofKms: values?.RailTonekms,
                // RailTone: values?.RailTone,
                // RailTonekms: values?.RailTonekms,
                emissions: RailToneEmmisions > 0 ? RailToneEmmisions : '',
              },
              {
                frType: 'Sea/ Inland Water',
                noOfTone: values?.seaTone,
                noofKms: values?.seaTonekms,
                // seaTone: values?.seaTone,
                // seaTonekms: values?.seaTonekms,
                emissions: seaToneEmmisions > 0 ? seaToneEmmisions : '',
              },
            ],
          },
        },
        // {
        //   subType: 'Mode of Freight',
        //   subTypeData: {
        //     th: ['', 'No of Kms', 'Weight in Kgs', 'Emissions'],
        //     td: [
        //       {
        //         frType: 'Air Craft',
        //         noOfKms: values?.noOfKmsOne,
        //         kgs: values?.kgsOne,
        //         emissions: emissionOne > 0 ? emissionOne : '',
        //       },
        //       {
        //         frType: 'Rail',
        //         noOfKms: values?.noOfKmsTwo,
        //         kgs: values?.kgsTwo,
        //         emissions: emissionTwo > 0 ? emissionTwo : '',
        //       },
        //       {
        //         frType: 'Road',
        //         noOfKms: values?.noOfKmsThree,
        //         kgs: values?.kgsThree,
        //         emissions: emissionThree > 0 ? emissionThree : '',
        //       },
        //       {
        //         frType: 'Cargo Ship (Container)',
        //         noOfKms: values?.noOfKmsFour,
        //         kgs: values?.kgsFour,
        //         emissions: emissionFour > 0 ? emissionFour : '',
        //       },
        //       {
        //         frType: 'Cargo Ship (Bulk Container)',
        //         noOfKms: values?.noOfKmsFive,
        //         kgs: values?.kgsFive,
        //         emissions: emissionFive > 0 ? emissionFive : '',
        //       },
        //       {
        //         frType: 'Sea Tanker',
        //         noOfKms: values?.noOfKmsSix,
        //         kgs: values?.kgsSix,
        //         emissions: emissionSix > 0 ? emissionSix : '',
        //       },
        //       {
        //         frType: 'Light Goods Vehicle',
        //         noOfKms: values?.noOfKmsSeven,
        //         kgs: values?.kgsSeven,
        //         emissions: emissionSeven > 0 ? emissionSeven : '',
        //       },
        //       {
        //         frType: 'Heavy Goods Vehicle',
        //         noOfKms: values?.noOfKmsEight,
        //         kgs: values?.kgsEight,
        //         emissions: emissionEight > 0 ? emissionEight : '',
        //       },
        //     ],
        //   },
        //   // scope: 3
        // },
      ];

      dispatch(addLogisticsData({ data }));
      dispatch(addResultTableData({ from: 'f2fEvent', data: tableData, tabTitle: 'Logistics' }));
    },
  });

  const handeleDelete = () => {
    dispatch(deleteLogisticsData());
    dispatch(deleteResTabLogisticsData());
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
      //   formik.setFieldValue('noOfKmsOne', allData?.[0]?.noOfKmsOne);
      //   formik.setFieldValue('efOne', allData?.[0]?.efOne);
      //   formik.setFieldValue('emissionOne', allData?.[0]?.emission);
      //   formik.setFieldValue('kgsOne', allData?.[0]?.kgsOne);

      //   formik.setFieldValue('emissionTwo', allData?.[1]?.emission);
      //   formik.setFieldValue('noOfKmsTwo', allData?.[1]?.noOfKmsTwo);
      //   formik.setFieldValue('kgsTwo', allData?.[1]?.kgsTwo);
      //   formik.setFieldValue('efTwo', allData?.[1]?.efTwo);

      //   formik.setFieldValue('emissionThree', allData?.[2]?.emission);
      //   formik.setFieldValue('noOfKmsThree', allData?.[2]?.noOfKmsThree);
      //   formik.setFieldValue('kgsThree', allData?.[2]?.kgsThree);
      //   formik.setFieldValue('efThree', allData?.[2]?.efThree);

      //   formik.setFieldValue('emissionFour', allData?.[3]?.emission);
      //   formik.setFieldValue('noOfKmsFour', allData?.[3]?.noOfKmsFour);
      //   formik.setFieldValue('kgsFour', allData?.[3]?.kgsFour);
      //   formik.setFieldValue('efFour', allData?.[3]?.efFour);

      //   formik.setFieldValue('emissionFive', allData?.[4]?.emission);
      //   formik.setFieldValue('noOfKmsFive', allData?.[4]?.noOfKmsFive);
      //   formik.setFieldValue('kgsFive', allData?.[4]?.kgsFive);
      //   formik.setFieldValue('efFive', allData?.[4]?.efFive);

      //   formik.setFieldValue('emissionSix', allData?.[5]?.emission);
      //   formik.setFieldValue('noOfKmsSix', allData?.[5]?.noOfKmsSix);
      //   formik.setFieldValue('kgsSix', allData?.[5]?.kgsSix);
      //   formik.setFieldValue('efSix', allData?.[5]?.efSix);

      //   formik.setFieldValue('emissionSeven', allData?.[6]?.emission);
      //   formik.setFieldValue('noOfKmsSeven', allData?.[6]?.noOfKmsSeven);
      //   formik.setFieldValue('kgsSeven', allData?.[6]?.kgsSeven);
      //   formik.setFieldValue('efSeven', allData?.[6]?.efSeven);

      //   formik.setFieldValue('emissionEight', allData?.[7]?.emission);
      //   formik.setFieldValue('noOfKmsEight', allData?.[7]?.noOfKmsEight);
      //   formik.setFieldValue('kgsEight', allData?.[7]?.kgsEight);
      //   formik.setFieldValue('efEight', allData?.[7]?.efEight);

      formik.setFieldValue('AirTone', allData?.[0]?.AirTone);
      formik.setFieldValue('AirTonekms', allData?.[0]?.AirTonekms);
      formik.setFieldValue('AirToneEmmisions', allData?.[0]?.emission);
      formik.setFieldValue('AirToneEf', allData?.[0]?.AirToneEf || 1.13);

      formik.setFieldValue('RoadTone', allData?.[1]?.RoadTone);
      formik.setFieldValue('RoadTonekms', allData?.[1]?.RoadTonekms);
      formik.setFieldValue('RoadToneEmmisions', allData?.[1]?.emission);
      formik.setFieldValue('RoadToneEF', allData?.[1]?.RoadToneEF || 0.2);

      formik.setFieldValue('RailTone', allData?.[2]?.RailTone);
      formik.setFieldValue('RailTonekms', allData?.[2]?.RailTonekms);
      formik.setFieldValue('RailToneEmmisions', allData?.[2]?.emission);
      formik.setFieldValue('RailToneEF', allData?.[2]?.RailToneEF || 0.05);

      formik.setFieldValue('seaTone', allData?.[3]?.seaTone);
      formik.setFieldValue('seaTonekms', allData?.[3]?.seaTonekms);
      formik.setFieldValue('seaToneEmmisions', allData?.[3]?.emission);
      formik.setFieldValue('seaToneEF', allData?.[3]?.seaToneEF || 0.01);
    }
  }, [value]);

  return (
    <div>
      <Container maxWidth style={{ maxWidth: 'auto' }}>
        <Card
          className="p-4 custom-inner-bg textborder"
          style={{
            padding: '20px',

            flexDirection: useMediaQuery(theme.breakpoints.up('lg')) ? 'row' : 'column',
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconDiv>
              <img
                width={100}
                src={LogisticsImg}
                alt="Food"
                className="tabImgWhite"
                style={{ position: 'relative', bottom: '263px' }}
              />
            </IconDiv>
            <Box>
              <div className="table-responsive">
                <Typography variant="h4" className="text-center text-white mb-4">
                  Mode of Freight
                </Typography>
                <table className="table-custom-inpt-field">
                  <tr>
                    <th className="ps-2">Freight Mode</th>
                    <th className="ps-2">No. of tonnes</th>
                    <th className="ps-2">No. of tonne-kms</th>
                    <th className="ps-2">Emissions</th>
                  </tr>
                  <tr>
                    <td className="ps-2 py-1">Air</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="AirTone"
                        value={formik?.values?.AirTone}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'AirToneEmmisions',
                            (e.target.value * formik?.values?.AirTonekms * formik?.values?.AirToneEf).toFixed(5)
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
                        name="AirTonekms"
                        value={formik?.values?.AirTonekms}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'AirToneEmmisions',
                            Number(formik?.values?.AirTone * e.target.value * formik?.values?.AirToneEf).toFixed(5)
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
                        name="AirToneEmmisions"
                        value={formik?.values?.AirToneEmmisions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-2 py-1">Road</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="RoadTone"
                        value={formik?.values?.RoadTone}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'RoadToneEmmisions',
                            (e.target.value * formik?.values?.RoadTonekms * formik?.values?.RoadToneEF).toFixed(5)
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
                        name="RoadTonekms"
                        value={formik?.values?.RoadTonekms}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'RoadToneEmmisions',
                            Number(formik?.values?.RoadTone * e.target.value * formik?.values?.RoadToneEF).toFixed(5)
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
                        name="RoadToneEmmisions"
                        value={formik?.values?.RoadToneEmmisions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-2 py-1">Rail</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="RailTone"
                        value={formik?.values?.RailTone}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'RailToneEmmisions',
                            (e.target.value * formik?.values?.RailTonekms * formik?.values?.RailToneEF).toFixed(5)
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
                        name="RailTonekms"
                        value={formik?.values?.RailTonekms}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'RailToneEmmisions',
                            Number(formik?.values?.RailTone * e.target.value * formik?.values?.RailToneEF).toFixed(5)
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
                        name="RailToneEmmisions"
                        value={formik?.values?.RailToneEmmisions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-2 py-1">Sea / Inland Water</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="seaTone"
                        value={formik?.values?.seaTone}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'seaToneEmmisions',
                            (e.target.value * formik?.values?.seaTonekms * 0.01).toFixed(5)
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
                        name="seaTonekms"
                        value={formik?.values?.seaTonekms}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'seaToneEmmisions',
                            Number(formik?.values?.seaTone * e.target.value * 0.01).toFixed(5)
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
                        name="seaToneEmmisions"
                        value={formik?.values?.seaToneEmmisions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                </table>
              </div>
              {/* </Box> */}

              {/* <Box> */}
              {/* <div className="table-responsive">
                <Typography variant="h4" className="text-center text-white mb-4">
                  Mode of Freight
                </Typography>
                 <table className="table-custom-inpt-field">
                  <tr>
                    <th />
                    <th className="ps-2">No of Kms</th>
                    <th className="ps-2">Weight in Kgs</th>
                    <th className="ps-2">Emissions</th>
                  </tr>
                  <tr>
                    <td className="ps-2 py-1">Air Craft</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="noOfKmsOne"
                        value={formik?.values?.noOfKmsOne}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionOne',
                            Number((e.target.value * formik?.values?.kgsOne * formik?.values?.efOne) / 1000).toFixed(5)
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
                        name="kgsOne"
                        value={formik?.values?.kgsOne}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionOne',
                            Number((formik?.values?.kgsOne * e.target.value * formik?.values?.efOne) / 1000).toFixed(5)
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
                        name="emissionOne"
                        value={formik?.values?.emissionOne}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-2 py-1">Rail</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="noOfKmsTwo"
                        value={formik?.values?.noOfKmsTwo}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionTwo',
                            Number((e.target.value * formik?.values?.kgsTwo * formik?.values?.efTwo) / 1000).toFixed(5)
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
                        name="kgsTwo"
                        value={formik?.values?.kgsTwo}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionTwo',
                            Number(
                              (formik?.values?.noOfKmsTwo * e.target.value * formik?.values?.efTwo) / 1000
                            ).toFixed(5)
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
                        name="emissionTwo"
                        value={formik?.values?.emissionTwo}
                        onChange={formik.handleChange}
                        disabled
                      />
                    </td>
                  </tr>

               

                  <tr>
                    <td className="ps-2 py-1">Cargo Ship (Container)</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="noOfKmsFour"
                        value={formik?.values?.noOfKmsFour}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionFour',
                            Number((e.target.value * formik?.values?.kgsFour * formik?.values?.efFour) / 1000).toFixed(
                              2
                            )
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
                        name="kgsFour"
                        value={formik?.values?.kgsFour}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionFour',
                            Number(
                              (formik?.values?.noOfKmsFour * e.target.value * formik?.values?.emissionFour) / 1000
                            ).toFixed(5)
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
                        name="emissionFour"
                        value={formik?.values?.emissionFour}
                        onChange={formik.handleChange}
                        disabled
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-2 py-1">Cargo Ship (Bulk Carrier)</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="noOfKmsFive"
                        value={formik?.values?.noOfKmsFive}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionFive',
                            Number((e.target.value * formik?.values?.kgsFive * formik?.values?.efFive) / 1000).toFixed(
                              2
                            )
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
                        name="kgsFive"
                        value={formik?.values?.kgsFive}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionFive',
                            Number(
                              (formik?.values?.noOfKmsFive * e.target.value * formik?.values?.efFive) / 1000
                            ).toFixed(5)
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
                        name="emissionFive"
                        value={formik?.values?.emissionFive}
                        onChange={formik.handleChange}
                        disabled
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-2 py-1">Sea Tanker</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="noOfKmsSix"
                        value={formik?.values?.noOfKmsSix}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionSix',
                            Number((e.target.value * formik?.values?.kgsSix * formik?.values?.efSix) / 1000).toFixed(5)
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
                        name="kgsSix"
                        value={formik?.values?.kgsSix}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionSix',
                            Number(
                              (formik?.values?.noOfKmsSix * e.target.value * formik?.values?.efSix) / 1000
                            ).toFixed(5)
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
                        name="emissionSix"
                        value={formik?.values?.emissionSix}
                        onChange={formik.handleChange}
                        disabled
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-2 py-1">Light Goods Vehicle</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="noOfKmsSeven"
                        value={formik?.values?.noOfKmsSeven}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionSeven',
                            Number(
                              (e.target.value * formik?.values?.kgsSeven * formik?.values?.efSeven) / 1000
                            ).toFixed(5)
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
                        name="kgsSeven"
                        value={formik?.values?.kgsSeven}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionSeven',
                            Number(
                              (formik?.values?.noOfKmsSeven * e.target.value * formik?.values?.efSeven) / 1000
                            ).toFixed(5)
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
                        name="emissionSeven"
                        value={formik?.values?.emissionSeven}
                        onChange={formik.handleChange}
                        disabled
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-2 py-1">Heavy Goods Vehicle</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="noOfKmsEight"
                        value={formik?.values?.noOfKmsEight}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionEight',
                            Number(
                              (e.target.value * formik?.values?.kgsEight * formik?.values?.efEight) / 1000
                            ).toFixed(5)
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
                        name="kgsEight"
                        value={formik?.values?.kgsEight}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'emissionEight',
                            Number(
                              (formik?.values?.noOfKmsEight * e.target.value * formik?.values?.efEight) / 1000
                            ).toFixed(5)
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
                        name="emissionEight"
                        value={formik?.values?.emissionEight}
                        onChange={formik.handleChange}
                        disabled
                      />
                    </td>
                  </tr>
                </table>
              </div>  */}
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                display={'flex'}
                justifyContent={'center'}
                mt={3}
                style={{ maxWidth: 'auto' }}
              >
                <Stack columnGap={2} rowGap={2} className="flex-xl-row flex-md-row flex-sm-column">
                  {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                  <Button
                    variant="contained"
                    onClick={() => {
                      // formik.handleSubmit();
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
                    endIcon={<FaAngleDoubleRight />}
                    onClick={() => {
                      // formik.handleSubmit();
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
                      setValue(9);
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
              <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
                <Typography className="mt-3 text-white">
                  Total Logistics Carbon Footprint = {totalEmission} kgCO<sub>2</sub>e
                </Typography>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default AirFreight;

// import {
//     Box,
//     Button,
//     Card,
//     Container,
//     FormLabel,
//     Grid,
//     Stack,
//     TextField,
//     Typography,
//     useMediaQuery,
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import { useFormik } from 'formik';
// import { useEffect } from 'react';
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { IconDiv } from '../../components/IconDiv';
// import { addLogisticsData, deleteLogisticsData } from '../../redux/slice/totalAirFreightSlice';
// import { addResultTableData, deleteResTabLogisticsData, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
// import LogisticsImg from '../../assets/Logistics.png';
// import useEventData from '../../hooks/useEventData';

// const AirFreight = (props) => {
//     const { setValue, value } = props;
//     const theme = useTheme();

//     const dispatch = useDispatch();
//     const allData = useSelector((state) => state?.totalAirFreightDetails?.data?.[0]?.data);
//     const totalEmission = useSelector((state) => state?.totalAirFreightDetails?.totalEmission);
//     const resultTableData = useSelector(state => state?.resultTableDataDetails);
//     const eventsData = useEventData();

//     // -----------   initialValues
//     const initialValues = {
//         noOfKmsOne: '',       // Air Craft
//         noOfKmsTwo: '',       // Rail
//         noOfKmsThree: '',     // Road
//         noOfKmsFour: '',      // Cargo Ship (Container)
//         noOfKmsFive: '',      // Cargo Ship (Bulk Carrier)
//         noOfKmsSix: '',       // Sea Tanker
//         noOfKmsSeven: '',     // Light Good Vehicle
//         noOfKmsEight: '',     // Heavy Good Vehicle
//         kgsOne: '',
//         kgsTwo: '',
//         kgsThree: '',
//         kgsFour: '',
//         kgsFive: '',
//         kgsSix: '',
//         kgsSeven: '',
//         kgsEight: '',
//         efOne: 0.5098,
//         efTwo: 0.0124,
//         efThree: 0.18,
//         efFour: 0.016,
//         efFive: 0.003,
//         efSix: 0.005,
//         efSeven: 0.405,
//         efEight: 0.095,
//         emissionOne: '',
//         emissionTwo: '',
//         emissionThree: '',
//         emissionFour: '',
//         emissionFive: '',
//         emissionSix: '',
//         emissionSeven: '',
//         emissionEight: '',
//     };

//     const formik = useFormik({
//         initialValues,
//         onSubmit: async (values) => {
//             // Logistics, Emissions=(B24*C24*D24)/1000
//             const emissionOne = values?.noOfKmsOne === 0 || values?.kgsOne === 0 ? 0 : Number(Number(values?.noOfKmsOne) * Number(values?.kgsOne) * Number(values?.efOne) / 1000).toFixed(5);
//             const emissionTwo = values?.noOfKmsTwo === 0 || values?.kgsTwo === 0 ? 0 : Number(Number(values?.noOfKmsTwo) * Number(values?.kgsTwo) * Number(values?.efTwo) / 1000).toFixed(5);
//             const emissionThree = values?.noOfKmsThree === 0 || values?.kgsThree === 0 ? 0 : Number(Number(values?.noOfKmsThree) * Number(values?.kgsThree) * Number(values?.efThree) / 1000).toFixed(5);
//             const emissionFour = values?.noOfKmsFour === 0 || values?.kgsFour === 0 ? 0 : Number(Number(values?.noOfKmsFour) * Number(values?.kgsFour) * Number(values?.efFour) / 1000).toFixed(5);
//             const emissionFive = values?.noOfKmsFive === 0 || values?.kgsFive === 0 ? 0 : Number(Number(values?.noOfKmsFive) * Number(values?.kgsFive) * Number(values?.efFive) / 1000).toFixed(5);
//             const emissionSix = values?.noOfKmsSix === 0 || values?.kgsSix === 0 ? 0 : Number(Number(values?.noOfKmsSix) * Number(values?.kgsSix) * Number(values?.efSix) / 1000).toFixed(5);
//             const emissionSeven = values?.noOfKmsSeven === 0 || values?.kgsSeven === 0 ? 0 : Number(Number(values?.noOfKmsSeven) * Number(values?.kgsSeven) * Number(values?.efSeven) / 1000).toFixed(5);
//             const emissionEight = values?.noOfKmsEight === 0 || values?.kgsEight === 0 ? 0 : Number(Number(values?.noOfKmsEight) * Number(values?.kgsEight) * Number(values?.efEight) / 1000).toFixed(5);

//             if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
//             if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
//             if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
//             if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);
//             if (emissionFive > 0) formik.setFieldValue('emissionFive', emissionFive);
//             if (emissionSix > 0) formik.setFieldValue('emissionSix', emissionSix);
//             if (emissionSeven > 0) formik.setFieldValue('emissionSeven', emissionSeven);
//             if (emissionEight > 0) formik.setFieldValue('emissionEight', emissionEight);

//             const data = [
//                 {
//                     type: 'Air Craft',
//                     noOfKmsOne: values?.noOfKmsOne,
//                     kgsOne: values?.kgsOne,
//                     efOne: values?.efOne,
//                     emission: (emissionOne > 0) ? emissionOne : '',
//                 },
//                 {
//                     type: 'Rail',
//                     noOfKmsTwo: values?.noOfKmsTwo,
//                     kgsTwo: values?.kgsTwo,
//                     efTwo: values?.efTwo,
//                     emission: (emissionTwo > 0) ? emissionTwo : '',
//                 },
//                 {
//                     type: 'Road',
//                     noOfKmsThree: values?.noOfKmsThree,
//                     kgsThree: values?.kgsThree,
//                     efThree: values?.efThree,
//                     emission: (emissionThree > 0) ? emissionThree : '',
//                 },
//                 {
//                     type: 'Cargo Ship (Container)',
//                     noOfKmsFour: values?.noOfKmsFour,
//                     kgsFour: values?.kgsFour,
//                     efFour: values?.efFour,
//                     emission: (emissionTwo > 0) ? emissionFour : '',
//                 },
//                 {
//                     type: 'Cargo Ship (Bulk Carrier)',
//                     noOfKmsFive: values?.noOfKmsFive,
//                     kgsFive: values?.kgsFive,
//                     efFive: values?.efFive,
//                     emission: (emissionFive > 0) ? emissionFive : '',
//                 },
//                 {
//                     type: 'Sea Tanker',
//                     noOfKmsSix: values?.noOfKmsSix,
//                     kgsSix: values?.kgsSix,
//                     efSix: values?.efSix,
//                     emission: (emissionSix > 0) ? emissionSix : '',
//                 },
//                 {
//                     type: 'Light Good Vehicle',
//                     noOfKmsSeven: values?.noOfKmsSeven,
//                     kgsSeven: values?.kgsSeven,
//                     efSeven: values?.efSeven,
//                     emission: (emissionSeven > 0) ? emissionSeven : '',
//                 },
//                 {
//                     type: 'Heavy Good Vehicle',
//                     noOfKmsEight: values?.noOfKmsEight,
//                     kgsEight: values?.kgsEight,
//                     efEight: values?.efEight,
//                     emission: (emissionEight > 0) ? emissionEight : '',
//                 },
//             ];

//             const tableData = [
//                 {
//                     subType: "Mode of Freight",
//                     subTypeData: {
//                         th: ["", "No of Kms", "Weight in Kgs", "Emissions"],
//                         td: [
//                             {
//                                 frType: "Air Craft",
//                                 noOfKms: values?.noOfKmsOne,
//                                 kgs: values?.kgsOne,
//                                 emissions: emissionOne > 0 ? emissionOne : ''
//                             },
//                             {
//                                 frType: "Rail",
//                                 noOfKms: values?.noOfKmsTwo,
//                                 kgs: values?.kgsTwo,
//                                 emissions: emissionTwo > 0 ? emissionTwo : ''
//                             },
//                             {
//                                 frType: "Road",
//                                 noOfKms: values?.noOfKmsThree,
//                                 kgs: values?.kgsThree,
//                                 emissions: emissionThree > 0 ? emissionThree : ''
//                             },
//                             {
//                                 frType: "Cargo Ship (Container)",
//                                 noOfKms: values?.noOfKmsFour,
//                                 kgs: values?.kgsFour,
//                                 emissions: emissionFour > 0 ? emissionFour : ''
//                             },
//                             {
//                                 frType: "Cargo Ship (Bulk Container)",
//                                 noOfKms: values?.noOfKmsFive,
//                                 kgs: values?.kgsFive,
//                                 emissions: emissionFive > 0 ? emissionFive : ''
//                             },
//                             {
//                                 frType: "Sea Tanker",
//                                 noOfKms: values?.noOfKmsSix,
//                                 kgs: values?.kgsSix,
//                                 emissions: emissionSix > 0 ? emissionSix : ''
//                             },
//                             {
//                                 frType: "Light Goods Vehicle",
//                                 noOfKms: values?.noOfKmsSeven,
//                                 kgs: values?.kgsSeven,
//                                 emissions: emissionSeven > 0 ? emissionSeven : ''
//                             },
//                             {
//                                 frType: "Heavy Goods Vehicle",
//                                 noOfKms: values?.noOfKmsEight,
//                                 kgs: values?.kgsEight,
//                                 emissions: emissionEight > 0 ? emissionEight : ''
//                             },
//                         ]
//                     },
//                     // scope: 3
//                 }
//             ];

//             dispatch(addLogisticsData({ data }));
//             dispatch(addResultTableData({ from: "f2fEvent", data: tableData, tabTitle: "Logistics" }));
//         },
//     });

//     const handeleDelete = () => {
//         dispatch(deleteLogisticsData());
//         dispatch(deleteResTabLogisticsData());
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
//             formik.setFieldValue('noOfKmsOne', allData?.[0]?.noOfKmsOne);
//             formik.setFieldValue('efOne', allData?.[0]?.efOne);
//             formik.setFieldValue('emissionOne', allData?.[0]?.emission);
//             formik.setFieldValue('kgsOne', allData?.[0]?.kgsOne);

//             formik.setFieldValue('emissionTwo', allData?.[1]?.emission);
//             formik.setFieldValue('noOfKmsTwo', allData?.[1]?.noOfKmsTwo);
//             formik.setFieldValue('kgsTwo', allData?.[1]?.kgsTwo);
//             formik.setFieldValue('efTwo', allData?.[1]?.efTwo);

//             formik.setFieldValue('emissionThree', allData?.[2]?.emission);
//             formik.setFieldValue('noOfKmsThree', allData?.[2]?.noOfKmsThree);
//             formik.setFieldValue('kgsThree', allData?.[2]?.kgsThree);
//             formik.setFieldValue('efThree', allData?.[2]?.efThree);

//             formik.setFieldValue('emissionFour', allData?.[3]?.emission);
//             formik.setFieldValue('noOfKmsFour', allData?.[3]?.noOfKmsFour);
//             formik.setFieldValue('kgsFour', allData?.[3]?.kgsFour);
//             formik.setFieldValue('efFour', allData?.[3]?.efFour);

//             formik.setFieldValue('emissionFive', allData?.[4]?.emission);
//             formik.setFieldValue('noOfKmsFive', allData?.[4]?.noOfKmsFive);
//             formik.setFieldValue('kgsFive', allData?.[4]?.kgsFive);
//             formik.setFieldValue('efFive', allData?.[4]?.efFive);

//             formik.setFieldValue('emissionSix', allData?.[5]?.emission);
//             formik.setFieldValue('noOfKmsSix', allData?.[5]?.noOfKmsSix);
//             formik.setFieldValue('kgsSix', allData?.[5]?.kgsSix);
//             formik.setFieldValue('efSix', allData?.[5]?.efSix);

//             formik.setFieldValue('emissionSeven', allData?.[6]?.emission);
//             formik.setFieldValue('noOfKmsSeven', allData?.[6]?.noOfKmsSeven);
//             formik.setFieldValue('kgsSeven', allData?.[6]?.kgsSeven);
//             formik.setFieldValue('efSeven', allData?.[6]?.efSeven);

//             formik.setFieldValue('emissionEight', allData?.[7]?.emission);
//             formik.setFieldValue('noOfKmsEight', allData?.[7]?.noOfKmsEight);
//             formik.setFieldValue('kgsEight', allData?.[7]?.kgsEight);
//             formik.setFieldValue('efEight', allData?.[7]?.efEight);
//         }
//     }, [value]);

//     return (
//         <div>
//             <Container maxWidth style={{ maxWidth: 'auto' }}>
//                 <Card
//                     className="p-4 custom-inner-bg textborder"
//                     style={{
//                         padding: '20px',

//                         flexDirection: useMediaQuery(theme.breakpoints.up('lg')) ? 'row' : 'column',
//                     }}
//                 >
//                     <Box style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}>

//                         <IconDiv>
//                             <img width={100} src={LogisticsImg} alt="Food" className='tabImgWhite' style={{ position: 'relative', bottom: '263px' }} />
//                         </IconDiv>
//                         <Box>
//                             <div className="table-responsive">
//                                 <Typography variant="h4" className="text-center text-white mb-4">Mode of Freight</Typography>
//                                 <table className="table-custom-inpt-field">
//                                     <tr>
//                                         <th />
//                                         <th className="ps-2">No of Kms</th>
//                                         <th className="ps-2">Weight in Kgs</th>
//                                         <th className="ps-2">Emissions</th>
//                                     </tr>
//                                     <tr>
//                                         <td className="ps-2 py-1">Air Craft</td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="noOfKmsOne"
//                                                 value={formik?.values?.noOfKmsOne}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionOne', Number((e.target.value * formik?.values?.kgsOne * formik?.values?.efOne) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="kgsOne"
//                                                 value={formik?.values?.kgsOne}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionOne', Number((formik?.values?.kgsOne * e.target.value * formik?.values?.efOne) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 disabled
//                                                 name="emissionOne"
//                                                 value={formik?.values?.emissionOne}
//                                                 onChange={formik.handleChange}
//                                             />
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className="ps-2 py-1">Rail</td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="noOfKmsTwo"
//                                                 value={formik?.values?.noOfKmsTwo}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionTwo', Number((e.target.value * formik?.values?.kgsTwo * formik?.values?.efTwo) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="kgsTwo"
//                                                 value={formik?.values?.kgsTwo}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionTwo', Number((formik?.values?.noOfKmsTwo * e.target.value * formik?.values?.efTwo) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="emissionTwo"
//                                                 value={formik?.values?.emissionTwo}
//                                                 onChange={formik.handleChange}
//                                                 disabled
//                                             />
//                                         </td>
//                                     </tr>

//                                     {/* <tr>
//                                         <td className="ps-2 py-1">Road</td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="noOfKmsThree"
//                                                 value={formik?.values?.noOfKmsThree}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionThree', Number((e.target.value * formik?.values?.kgsThree * formik?.values?.efThree) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="kgsThree"
//                                                 value={formik?.values?.kgsThree}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionThree', Number((formik?.values?.noOfKmsThree * e.target.value * formik?.values?.efThree) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="emissionThree"
//                                                 value={formik?.values?.emissionThree}
//                                                 onChange={formik.handleChange}
//                                                 disabled
//                                             />
//                                         </td>
//                                     </tr> */}

//                                     <tr>
//                                         <td className="ps-2 py-1">Cargo Ship (Container)</td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="noOfKmsFour"
//                                                 value={formik?.values?.noOfKmsFour}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionFour', Number((e.target.value * formik?.values?.kgsFour * formik?.values?.efFour) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="kgsFour"
//                                                 value={formik?.values?.kgsFour}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionFour', Number((formik?.values?.noOfKmsFour * e.target.value * formik?.values?.emissionFour) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="emissionFour"
//                                                 value={formik?.values?.emissionFour}
//                                                 onChange={formik.handleChange}
//                                                 disabled
//                                             />
//                                         </td>
//                                     </tr>

//                                     <tr>
//                                         <td className="ps-2 py-1">Cargo Ship (Bulk Carrier)</td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="noOfKmsFive"
//                                                 value={formik?.values?.noOfKmsFive}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionFive', Number((e.target.value * formik?.values?.kgsFive * formik?.values?.efFive) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="kgsFive"
//                                                 value={formik?.values?.kgsFive}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionFive', Number((formik?.values?.noOfKmsFive * e.target.value * formik?.values?.efFive) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="emissionFive"
//                                                 value={formik?.values?.emissionFive}
//                                                 onChange={formik.handleChange}
//                                                 disabled
//                                             />
//                                         </td>
//                                     </tr>

//                                     <tr>
//                                         <td className="ps-2 py-1">Sea Tanker</td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="noOfKmsSix"
//                                                 value={formik?.values?.noOfKmsSix}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionSix', Number((e.target.value * formik?.values?.kgsSix * formik?.values?.efSix) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="kgsSix"
//                                                 value={formik?.values?.kgsSix}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionSix', Number((formik?.values?.noOfKmsSix * e.target.value * formik?.values?.efSix) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="emissionSix"
//                                                 value={formik?.values?.emissionSix}
//                                                 onChange={formik.handleChange}
//                                                 disabled
//                                             />
//                                         </td>
//                                     </tr>

//                                     <tr>
//                                         <td className="ps-2 py-1">Light Goods Vehicle</td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="noOfKmsSeven"
//                                                 value={formik?.values?.noOfKmsSeven}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionSeven', Number((e.target.value * formik?.values?.kgsSeven * formik?.values?.efSeven) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="kgsSeven"
//                                                 value={formik?.values?.kgsSeven}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionSeven', Number((formik?.values?.noOfKmsSeven * e.target.value * formik?.values?.efSeven) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="emissionSeven"
//                                                 value={formik?.values?.emissionSeven}
//                                                 onChange={formik.handleChange}
//                                                 disabled
//                                             />
//                                         </td>
//                                     </tr>

//                                     <tr>
//                                         <td className="ps-2 py-1">Heavy Goods Vehicle</td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="noOfKmsEight"
//                                                 value={formik?.values?.noOfKmsEight}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionEight', Number((e.target.value * formik?.values?.kgsEight * formik?.values?.efEight) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="kgsEight"
//                                                 value={formik?.values?.kgsEight}
//                                                 onChange={(e) => {
//                                                     formik.handleChange(e);
//                                                     formik.setFieldValue('emissionEight', Number((formik?.values?.noOfKmsEight * e.target.value * formik?.values?.efEight) / 1000).toFixed(5));
//                                                     formik.handleSubmit();
//                                                 }}
//                                                 inputProps={{ style: { color: 'white' } }}
//                                             />
//                                         </td>
//                                         <td className="ps-2 py-1">
//                                             <TextField
//                                                 size="small"
//                                                 type="number"
//                                                 name="emissionEight"
//                                                 value={formik?.values?.emissionEight}
//                                                 onChange={formik.handleChange}
//                                                 disabled
//                                             />
//                                         </td>
//                                     </tr>

//                                 </table>
//                             </div>
//                             <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'} mt={3} style={{ maxWidth: 'auto' }} >
//                                 <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
//                                     {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
//                                     <Button
//                                         variant="contained"
//                                         onClick={() => {
//                                             // formik.handleSubmit();
//                                             handleSaveToDb();
//                                             setValue(value - 1);
//                                         }}
//                                         className="custom-btn"
//                                         startIcon={<FaAngleDoubleLeft />}
//                                     >
//                                         Save and Previous Page
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         endIcon={<FaAngleDoubleRight />}
//                                         onClick={() => {
//                                             // formik.handleSubmit();
//                                             handleSaveToDb();
//                                             setValue(value + 1);
//                                         }}
//                                         className="custom-btn"
//                                     >
//                                         {' '}
//                                         Save and Next Page
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         endIcon={<FaAngleDoubleRight />}
//                                         onClick={() => {
//                                             handleSaveToDb();
//                                             setValue(9);
//                                         }}
//                                         className="custom-btn"
//                                     >
//                                         Go To Result
//                                     </Button>
//                                     {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
//                                     <Button
//                                         variant="outlined"
//                                         onClick={() => {
//                                             formik.resetForm();
//                                             handeleDelete();
//                                         }}
//                                         color="error"
//                                     >
//                                         Clear
//                                     </Button>
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
//                                 <Typography className="mt-3 text-white">Total Logistics Carbon Footprint = {totalEmission} kgCO<sub>2</sub>e</Typography>
//                             </Grid>

//                             {/* <Grid item xs={12} sm={12} md={12} marginLeft={3} mt={3}>
//                                 <ul>
//                                     {allData?.length > 0 &&
//                                         allData?.map((item) => (
//                                             <li style={{ color: 'white' }}>{`${item?.type} : ${item?.emission} `}kgCO<sub>2</sub>e</li>
//                                         ))}
//                                 </ul>
//                             </Grid> */}
//                         </Box>
//                     </Box>
//                 </Card>
//             </Container>
//         </div>
//     );
// };

// export default AirFreight;
