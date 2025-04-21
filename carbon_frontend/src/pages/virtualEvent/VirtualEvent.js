import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Icon,
  Modal,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TiInfoLarge } from 'react-icons/ti';
import CloseIcon from '@mui/icons-material/Close';
import { BiSolidTv } from 'react-icons/bi';
import { FaSheetPlastic, FaRectangleAd } from 'react-icons/fa6';
import { IoNewspaper } from 'react-icons/io5';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  Pinterest as PinterestIcon,
  LinkedIn as LinkedInIcon,
  Reddit as RedditIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material';
import { FaSnapchat, FaTwitch, FaTiktok, FaAngleDoubleRight, FaImage, FaFileVideo } from 'react-icons/fa';
import { GiVideoConference } from 'react-icons/gi';
import { IconDiv } from '../../components/IconDiv';
import { addVirtualEventData, deleteVirtualEventData } from '../../redux/slice/totalVirtualEventSlice';
import {
  addResultTableData,
  deleteResTabVrtEventData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';
import VirtualEventIcon from '../../layouts/user/assets/images/virtualEvent.png';
import outboundIcon from '../../assets/outboundIcon.png';
import podcastIcon from '../../assets/podcastIcon.png';
import TVImg from '../../layouts/user/assets/images/tv.png';
import PrintImg from '../../layouts/user/assets/images/prints.png';
import useEventData from '../../hooks/useEventData';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  height: 650,
  bgcolor: 'background.paper',
  // border: '2px solid #fff',
  boxShadow: 20,
  p: 4,
};

const VirtualEvent = (props) => {
  const { setValue, value } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const allData = useSelector((state) => state?.totalVirtualEventDetails?.data);

  const totalEmission = useSelector((state) => state?.totalVirtualEventDetails?.totalEmission);
  const [openInfo, setOpenInfo] = useState(false);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  const eventsData = useEventData();

  const initialValues = {
    // imgSize: '',
    // deviceEnergy1: '',       // 0.01(1/60)
    // somePlatformEnergy1: '', // =(0.4/1000)*imgSize
    // networkEnergy1: '',      // =(0.2/1000)*imgSize
    // totalEnergy1: '',        // = deviceEnergy1 + somePlatformEnergy1 + networkEnergy1
    // efOne: '',               // = totalEnergy1*0.43
    // impressionsOne: '',      //
    // emissionOne: '',

    // videoSize: '',
    // videoMins: '',
    // deviceEnergy2: '',       // = 0.01*( videoMins/60)
    // somePlatformEnergy2: '', // = ( videoSize/1000)*0.4
    // networkEnergy2: '',      // = (0.2/1000)* videoSize
    // totalEnergy2: '',        // = deviceEnergy2 + somePlatformEnergy2 + networkEnergy2
    // efTwo: '',               // = totalEnergy2*0.43
    // impressionsTwo: '',
    // emissionTwo: '',         // videoSize * videoMins * impressionsTwo * efTwo

    // Socail Media Platforms
    // Tiktok
    noOfMinsOne: '',
    noOfPeopleOne: '',
    efThree: 2.63,
    emissionThree: '',
    // Reditt
    noOfMinsTwo: '',
    noOfPeopleTwo: '',
    efFour: 2.48,
    emissionFour: '',
    // Pinterest
    noOfMinsThree: '',
    noOfPeopleThree: '',
    efFive: 1.3,
    emissionFive: '',
    // Instagram Live
    noOfMinsFour: '',
    noOfPeopleFour: '',
    efSix: 1.05,
    emissionSix: '',
    // Snapchat
    noOfMinsFive: '',
    noOfPeopleFive: '',
    efSeven: 0.87,
    emissionSeven: '',
    // Facebook Live
    noOfMinsSix: '',
    noOfPeopleSix: '',
    efEight: 0.79,
    emissionEight: '',
    // LinkedIn Live
    noOfMinsSeven: '',
    noOfPeopleSeven: '',
    efNine: 0.71,
    emissionNine: '',
    // Twitter Live
    noOfMinsEight: '',
    noOfPeopleEight: '',
    efTen: 0.6,
    emissionTen: '',
    // Twitch
    noOfMinsNine: '',
    noOfPeopleNine: '',
    efEleven: 0.55,
    emissionEleven: '',
    // Youtube
    noOfMinsTen: '',
    noOfPeopleTen: '',
    efTwelve: 0.46,
    emissionTwelve: '',

    // Video Conferencing
    noOfMinsEleven: '',
    noOfPeopleEleven: '',
    efThirteen: 2.25,
    emissionThirteen: '',

    // Newspaper- Full page Ad
    noOfCopiesOne: '',
    efFourteen: 0.02105,
    emissionFourteen: '',

    // Magazine
    noOfPages: '',
    noOfCopiesTwo: '',
    efFifteen: 0.005857143,
    emissionFifteen: '',

    //  Outdoor Branding:
    // Polyethylene HDPE Banner
    hdpeBanner: '', // Weight (kgs)
    efSixteen: 2.15,
    emissionSixteen: '',
    // PVC Banners
    pvcBanners: '', // Weight (kgs)
    efSeventeen: 2.42,
    emissionSeventeen: '',

    // TV Ad
    adDuration: '', // Ad Duration (In Sec)
    noOfSlots: '',
    viewers: '',
    efEighteen: 0.0000222,
    emissionEightteen: '',
    efEighteen1: 0.8552,

    // Podcast
    podcastSize: '', // Podcast Size (in Mb)
    noOfListeners: '',
    podcastKwh: 0.00004296,
    podcastTotal: '', // podcastSize * podcastKwh
    emissionNineteen: '', // podcastTotal * noOfListeners

    // Energy
    energyKwh: '',
    efTwenty: 0.8552,
    energyRenewable: '',
    emissionTwenty: '',

    // Newspaper- Half page Ad
    noOfCopiesHalf: '',
    efHalf: 0.010525,
    emissionHalf: '',

    // Print Ad
    colourNoOfPage: '',
    efColour: 0.034,
    copyOne: '',
    emissionColour: '',

    // blackWhite Ad
    blackWhiteNoOfPage: '',
    efBlackWhite: 0.017,
    copyTwo: '',
    emissionBlackWhite: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      // Image
      const emissionOne =
        values?.imgSize === 0 || values?.impressionsOne === 0 || values?.efOne === 0
          ? 0
          : Number(Number(values?.imgSize) * Number(values?.impressionsOne) * Number(values?.efOne)).toFixed(5);
      // Video
      const emissionTwo =
        values?.videoSize === 0 || values?.videoMins === 0 || values?.impressionsTwo === 0 || values?.efTwo === 0
          ? 0
          : Number(
            Number(values?.videoSize) *
            Number(values?.videoMins) *
            Number(values?.impressionsTwo) *
            Number(values?.efTwo)
          ).toFixed(5);

      // Socail Media Platforms
      const emissionThree =
        values?.noOfMinsOne === 0 || values?.noOfPeopleOne === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsOne) * Number(values?.noOfPeopleOne) * Number(values?.efThree)) / 1000
          ).toFixed(5);
      const emissionFour =
        values?.noOfMinsTwo === 0 || values?.noOfPeopleTwo === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsTwo) * Number(values?.noOfPeopleTwo) * Number(values?.efFour)) / 1000
          ).toFixed(5);
      const emissionFive =
        values?.noOfMinsThree === 0 || values?.noOfPeopleThree === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsThree) * Number(values?.noOfPeopleThree) * Number(values?.efFive)) / 1000
          ).toFixed(5);
      const emissionSix =
        values?.noOfMinsFour === 0 || values?.noOfPeopleFour === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsFour) * Number(values?.noOfPeopleFour) * Number(values?.efSix)) / 1000
          ).toFixed(5);
      const emissionSeven =
        values?.noOfMinsFive === 0 || values?.noOfPeopleFive === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsFive) * Number(values?.noOfPeopleFive) * Number(values?.efSeven)) / 1000
          ).toFixed(5);
      const emissionEight =
        values?.noOfMinsSix === 0 || values?.noOfPeopleSix === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsSix) * Number(values?.noOfPeopleSix) * Number(values?.efEight)) / 1000
          ).toFixed(5);
      const emissionNine =
        values?.noOfMinsSeven === 0 || values?.noOfPeopleSeven === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsSeven) * Number(values?.noOfPeopleSeven) * Number(values?.efNine)) / 1000
          ).toFixed(5);
      const emissionTen =
        values?.noOfMinsEight === 0 || values?.noOfPeopleEight === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsEight) * Number(values?.noOfPeopleEight) * Number(values?.efTen)) / 1000
          ).toFixed(5);
      const emissionEleven =
        values?.noOfMinsNine === 0 || values?.noOfPeopleNine === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsNine) * Number(values?.noOfPeopleNine) * Number(values?.efEleven)) / 1000
          ).toFixed(5);
      const emissionTwelve =
        values?.noOfMinsTen === 0 || values?.noOfPeopleTen === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsTen) * Number(values?.noOfPeopleTen) * Number(values?.efTwelve)) / 1000
          ).toFixed(5);
      // Video Conferencing
      const emissionThirteen =
        values?.noOfMinsEleven === 0 || values?.noOfPeopleEleven === 0
          ? 0
          : Number(
            (Number(values?.noOfMinsEleven) * Number(values?.noOfPeopleEleven) * Number(values?.efThirteen)) / 1000
          ).toFixed(5);

      const emissionFourteen =
        values?.noOfCopiesOne === 0 ? 0 : Number(Number(values?.noOfCopiesOne) * Number(values?.efFourteen)).toFixed(5);
      const emissionFifteen =
        values?.noOfPages === 0 || values?.noOfCopiesTwo === 0
          ? 0
          : Number(Number(values?.noOfPages) * Number(values?.noOfCopiesTwo) * Number(values?.efFifteen)).toFixed(5);
      const emissionSixteen =
        values?.hdpeBanner === 0 ? 0 : Number(Number(values?.hdpeBanner) * Number(values?.efSixteen)).toFixed(5);
      const emissionSeventeen =
        values?.pvcBanners === 0 ? 0 : Number(Number(values?.pvcBanners) * Number(values?.efSeventeen)).toFixed(5);
      const emissionEightteen =
        values?.adDuration === 0
          ? 0
          : Number(
            Number(values?.adDuration) *
            Number(values?.noOfSlots) *
            Number(values?.viewers) *
            Number(values?.efEighteen) *
            Number(values?.efEighteen1)
          ).toFixed(5);
      const emissionNineteen =
        values?.podcastTotal === 0 || values?.noOfListeners === 0
          ? 0
          : Number(Number(values?.podcastTotal) * Number(values?.noOfListeners)).toFixed(5);
      // const emissionTwenty = values?.energyKwh === 0 ? 0 : Number(Number(values?.energyKwh) * Number(values?.efTwenty)).toFixed(5);
      const minusRenewanle = 100 - values?.energyRenewable;
      const emissionTwenty =
        values?.energyKwh === 0
          ? 0
          : Number((Number(values?.energyKwh) * Number(values?.efTwenty) * minusRenewanle) / 100).toFixed(5);
      const divededEf = values?.efFourteen / 2;
      const emissionHalf =
        values?.noOfCopiesHalf === 0 ? 0 : Number(Number(values?.noOfCopiesHalf) * Number(divededEf)).toFixed(5);

      const emissionColour =
        values?.colourNoOfPage === 0
          ? 0
          : Number(Number(values?.colourNoOfPage) * Number(values?.copyOne) * Number(values?.efColour)).toFixed(5);
      const emissionBlackWhite =
        values?.blackWhiteNoOfPage === 0
          ? 0
          : Number(Number(values?.blackWhiteNoOfPage) * Number(values?.copyTwo) * Number(values?.efBlackWhite)).toFixed(
            5
          );

      if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);

      if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);

      if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
      if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);
      if (emissionFive > 0) formik.setFieldValue('emissionFive', emissionFive);
      if (emissionSix > 0) formik.setFieldValue('emissionSix', emissionSix);
      if (emissionSeven > 0) formik.setFieldValue('emissionSeven', emissionSeven);
      if (emissionEight > 0) formik.setFieldValue('emissionEight', emissionEight);
      if (emissionNine > 0) formik.setFieldValue('emissionNine', emissionNine);
      if (emissionTen > 0) formik.setFieldValue('emissionTen', emissionTen);
      if (emissionEleven > 0) formik.setFieldValue('emissionEleven', emissionEleven);
      if (emissionTwelve > 0) formik.setFieldValue('emissionTwelve', emissionTwelve);

      if (emissionThirteen > 0) formik.setFieldValue('emissionThirteen', emissionThirteen);

      if (emissionFourteen > 0) formik.setFieldValue('emissionFourteen', emissionFourteen);
      if (emissionFifteen > 0) formik.setFieldValue('emissionFifteen', emissionFifteen);
      if (emissionSixteen > 0) formik.setFieldValue('emissionSixteen', emissionSixteen);
      if (emissionSeventeen > 0) formik.setFieldValue('emissionSeventeen', emissionSeventeen);
      if (emissionEightteen > 0) formik.setFieldValue('emissionEightteen', emissionEightteen);

      if (emissionNineteen > 0) formik.setFieldValue('emissionNineteen', emissionNineteen);
      if (emissionTwenty > 0) formik.setFieldValue('emissionTwenty', emissionTwenty);
      if (emissionHalf > 0) formik.setFieldValue('emissionHalf', emissionHalf);
      if (emissionColour > 0) formik.setFieldValue('emissionColour', emissionColour);
      if (emissionBlackWhite > 0) formik.setFieldValue('emissionBlackWhite', emissionBlackWhite);

      const data = [
        // {
        //   type: 'Image',
        //   // imgSize: values?.imgSize,
        //   // deviceEnergy1: values?.deviceEnergy1,
        //   // somePlatformEnergy1: values?.somePlatformEnergy1,
        //   // networkEnergy1: values?.networkEnergy1,
        //   // totalEnergy1: values?.totalEnergy1,
        //   // efOne: values?.efOne,
        //   // impressionsOne: values?.impressionsOne,
        //   // emission: emissionOne > 0 ? emissionOne : ''
        // },
        // {
        //   type: 'Video',
        //   // videoSize: values?.videoSize,
        //   // videoMins: values?.videoMins,
        //   // deviceEnergy2: values?.deviceEnergy2,
        //   // somePlatformEnergy2: values?.somePlatformEnergy2,
        //   // networkEnergy2: values?.networkEnergy2,
        //   // totalEnergy2: values?.totalEnergy2,
        //   // efTwo: values?.efTwo,
        //   // impressionsTwo: values?.impressionsTwo,
        //   // emission: emissionTwo > 0 ? emissionTwo : ''
        // },

        // {
        //   name: 'Tiktok',
        //   noOfMins: values?.noOfMinsOne,
        //   noOfPeople: values?.noOfPeopleOne,
        //   // ef: values?.efThree,
        //   emission: emissionThree > 0 ? emissionThree : '',
        // },
        // {
        //   name: 'Reditt',
        //   noOfMins: values?.noOfMinsTwo,
        //   noOfPeople: values?.noOfPeopleTwo,
        //   // ef: values?.efFour,
        //   emission: emissionFour > 0 ? emissionFour : '',
        // },
        // {
        //   name: 'Pinterest',
        //   noOfMins: values?.noOfMinsThree,
        //   noOfPeople: values?.noOfPeopleThree,
        //   // ef: values?.efFive,
        //   emission: emissionFive > 0 ? emissionFive : '',
        // },
        // {
        //   name: 'Instagram Live',
        //   noOfMins: values?.noOfMinsFour,
        //   noOfPeople: values?.noOfPeopleFour,
        //   // ef: values?.efSix,
        //   emission: emissionSix > 0 ? emissionSix : '',
        // },
        // {
        //   name: 'Snapchat',
        //   noOfMins: values?.noOfMinsFive,
        //   noOfPeople: values?.noOfPeopleFive,
        //   // ef: values?.efSeven,
        //   emission: emissionSeven > 0 ? emissionSeven : '',
        // },
        // {
        //   name: 'Facebook Live',
        //   noOfMins: values?.noOfMinsSix,
        //   noOfPeople: values?.noOfPeopleSix,
        //   // ef: values?.efEight,
        //   emission: emissionEight > 0 ? emissionEight : '',
        // },
        // {
        //   name: 'LinkedIn Live',
        //   noOfMins: values?.noOfMinsSeven,
        //   noOfPeople: values?.noOfPeopleSeven,
        //   // ef: values?.efNine,
        //   emission: emissionNine > 0 ? emissionNine : '',
        // },
        // {
        //   name: 'Twitter Live',
        //   noOfMins: values?.noOfMinsEight,
        //   noOfPeople: values?.noOfPeopleEight,
        //   // ef: values?.efTen,
        //   emission: emissionTen > 0 ? emissionTen : '',
        // },
        // {
        //   name: 'Twitch',
        //   noOfMins: values?.noOfMinsNine,
        //   noOfPeople: values?.noOfPeopleNine,
        //   // ef: values?.efEleven,
        //   emission: emissionEleven > 0 ? emissionEleven : '',
        // },
        // {
        //   name: 'Youtube',
        //   noOfMins: values?.noOfMinsTen,
        //   noOfPeople: values?.noOfPeopleTen,
        //   // ef: values?.efTwelve,
        //   emission: emissionTwelve > 0 ? emissionTwelve : '',
        // },

        // {
        //   name: 'Video Conferencing',
        //   noOfMins: values?.noOfMinsEleven,
        //   noOfPeople: values?.noOfPeopleEleven,
        //   // ef: values?.efThirteen,
        //   emission: emissionThirteen > 0 ? emissionThirteen : '',
        // },

        {
          name: 'Newspaper- Full page Ad',
          noOfCopiesOne: values?.noOfCopiesOne,
          // ef: values?.efFourteen,
          emission: emissionFourteen > 0 ? emissionFourteen : '',
        },
        // {
        //     name: 'Magazine',
        //     noOfPages: values?.noOfPages,
        //     noOfCopiesTwo: values?.noOfCopiesTwo,
        //     // ef: values?.efFifteen,
        //     emission: emissionFifteen > 0 ? emissionFifteen : '',
        // },
        {
          name: 'Polyethylene HDPE Banner',
          hdpeBanner: values?.hdpeBanner,
          // ef: values?.efSixteen,
          emission: emissionSixteen > 0 ? emissionSixteen : '',
        },
        {
          name: 'PVC Banners',
          pvcBanners: values?.pvcBanners,
          // ef: values?.efSeventeen,
          emission: emissionSeventeen > 0 ? emissionSeventeen : '',
        },
        {
          name: 'TV Ad',
          adDuration: values?.adDuration,
          noOfSlots: values?.noOfSlots,
          viewers: values?.viewers,
          // ef: values?.efEighteen,
          emission: emissionEightteen > 0 ? emissionEightteen : '',
        },

        {
          name: 'Podcast',
          podcastSize: values?.podcastSize,
          noOfListeners: values?.noOfListeners,
          podcastKwh: values?.podcastKwh,
          podcastTotal: values?.podcastTotal,
          emission: emissionNineteen > 0 ? emissionNineteen : '',
        },
        {
          name: 'Energy',
          energyKwh: values?.energyKwh,
          // ef: values?.efTwenty,
          energyRenewable: values?.energyRenewable,
          emission: emissionTwenty > 0 ? emissionTwenty : '',
        },
        {
          name: 'Newspaper- Half page Ad',
          noOfCopiesHalf: values?.noOfCopiesHalf,
          // ef: values?.efHalf,
          emission: emissionHalf > 0 ? emissionHalf : '',
        },
        {
          name: 'Colour Print Ad',
          colourNoOfPage: values?.colourNoOfPage,
          copyOne: values?.copyOne,
          // ef: values?.efColour,
          emission: emissionColour > 0 ? emissionColour : '',
        },
        {
          name: 'Black & White',
          blackWhiteNoOfPage: values?.blackWhiteNoOfPage,
          copyTwo: values?.copyTwo,
          // ef: values?.efBlackWhite,
          emission: emissionBlackWhite > 0 ? emissionBlackWhite : '',
        },
      ];
      dispatch(addVirtualEventData({ data }));
      const tableData = [
        {
          subType: '',
          subTypeData: {
            th: ['', 'No. of copies', 'Emissions'],
            td: [
              {
                vtType: 'Newspaper- Full page Ad',
                noOfCopiesOne: values?.noOfCopiesOne,
                emissions: emissionFourteen > 0 ? emissionFourteen : '',
              },
            ],
          },
          // scope: 3
        },
        // {
        //     subType: "",
        //     subTypeData: {
        //         th: ["", "No of pages", "No of copies", "Emissions"],
        //         td: [
        //             {
        //                 vtType: "Magazine",
        //                 noOfPages: values?.noOfPages,
        //                 noOfCopiesTwo: values?.noOfCopiesTwo,
        //                 emissions: emissionFifteen > 0 ? emissionFifteen : '',
        //             },
        //         ]
        //     },
        //     // scope: 3
        // },
        {
          subType: '',
          subTypeData: {
            th: ['', 'Weight (Kgs)', 'Emissions'],
            td: [
              {
                vtType: 'Polyethylene', // "Polyethylene HDPE Banner"
                kgs: values?.hdpeBanner,
                emissions: emissionSixteen > 0 ? emissionSixteen : '',
              },
              {
                vtType: 'PVC', // PVC Banners
                kgs: values?.pvcBanners,
                emissions: emissionSeventeen > 0 ? emissionSeventeen : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: '',
          subTypeData: {
            th: ['', 'Ad duration (In Sec)', 'No. of slots', 'Viewers', 'Emissions'],
            td: [
              {
                vtType: 'TV Ad',
                adDuration: values?.adDuration,
                noOfSlots: values?.noOfSlots,
                viewers: values?.viewers,
                emissions: emissionEightteen > 0 ? emissionEightteen : '',
              },
            ],
          },
          // scope: 3
        },
        // {
        //   subType: '',
        //   subTypeData: {
        //     th: ['', 'Podcast Size (in Mb)', 'No. of Listeners', 'Emissions'],
        //     td: [
        //       {
        //         vtType: 'Podcast',
        //         podcastSize: values?.podcastSize,
        //         noOfListeners: values?.noOfListeners,
        //         emissions: emissionNineteen > 0 ? emissionNineteen : '',
        //       },
        //     ],
        //   },
        //   // scope: 3
        // },
        {
          subType: '',
          subTypeData: {
            th: ['', 'kwh', 'Renewable', 'Emissions'],
            td: [
              {
                vtType: 'Energy',
                energyKwh: values?.energyKwh,
                energyRenewable: values?.energyRenewable,
                emissions: emissionTwenty > 0 ? emissionTwenty : '',
              },
            ],
          },
          // scope: 3
        },
        // {
        //     subType: "Event Promotion on Social Media",
        //     subTypeData: {
        //         // th: ["Image", "Image Size (in Mb)", "Impressions", "Emissions"],
        //         th: ["", "Image Size (in Mb)", "Impressions", "Emissions"],
        //         td: [
        //             {
        //                 vtType: "Image",
        //                 imgSize: values?.imgSize,
        //                 impressionsOne: values?.impressionsOne,
        //                 emissions: emissionOne > 0 ? emissionOne : '',
        //             },
        //         ]
        //     },
        //     scope: 3
        // },
        // {
        //     subType: "",
        //     subTypeData: {
        //         // th: ["Video", "Video Size (in Mb)", "Video (in mins)", "Impressions", "Emissions"],
        //         th: ["", "Video Size (in Mb)", "Video (in mins)", "Impressions", "Emissions"],
        //         td: [
        //             {
        //                 vtType: "Video",
        //                 videoSize: values?.videoSize,
        //                 videoMins: values?.videoMins,
        //                 impressionsTwo: values?.impressionsTwo,
        //                 emissions: emissionTwo > 0 ? emissionTwo : '',
        //             },
        //         ]
        //     },
        //     scope: 3
        // },
        // {
        //   subType: 'Live Broadcasting',
        //   subTypeData: {
        //     th: ['', 'No. of Minutes', 'No. of People', 'Emissions'],
        //     td: [
        //       {
        //         vtType: 'Tiktok',
        //         noOfMins: values?.noOfMinsOne,
        //         noOfPeople: values?.noOfPeopleOne,
        //         emissions: emissionThree > 0 ? emissionThree : '',
        //       },
        //       {
        //         vtType: 'Reddit',
        //         noOfMins: values?.noOfMinsTwo,
        //         noOfPeople: values?.noOfPeopleTwo,
        //         emissions: emissionFour > 0 ? emissionFour : '',
        //       },
        //       {
        //         vtType: 'Pinterest',
        //         noOfMins: values?.noOfMinsThree,
        //         noOfPeople: values?.noOfPeopleThree,
        //         emissions: emissionFive > 0 ? emissionFive : '',
        //       },
        //       {
        //         vtType: 'Instagram Live',
        //         noOfMins: values?.noOfMinsFour,
        //         noOfPeople: values?.noOfPeopleFour,
        //         emissions: emissionSix > 0 ? emissionSix : '',
        //       },
        //       {
        //         vtType: 'Snapchat',
        //         noOfMins: values?.noOfMinsFive,
        //         noOfPeople: values?.noOfPeopleFive,
        //         emissions: emissionSeven > 0 ? emissionSeven : '',
        //       },
        //       {
        //         vtType: 'Facebook Live',
        //         noOfMins: values?.noOfMinsSix,
        //         noOfPeople: values?.noOfPeopleSix,
        //         emissions: emissionEight > 0 ? emissionEight : '',
        //       },
        //       {
        //         vtType: 'LinkedIn Live',
        //         noOfMins: values?.noOfMinsSeven,
        //         noOfPeople: values?.noOfPeopleSeven,
        //         emissions: emissionNine > 0 ? emissionNine : '',
        //       },
        //       {
        //         vtType: 'Twitter Live',
        //         noOfMins: values?.noOfMinsEight,
        //         noOfPeople: values?.noOfPeopleEight,
        //         emissions: emissionTen > 0 ? emissionTen : '',
        //       },
        //       {
        //         vtType: 'Twitch',
        //         noOfMins: values?.noOfMinsNine,
        //         noOfPeople: values?.noOfPeopleNine,
        //         emissions: emissionEleven > 0 ? emissionEleven : '',
        //       },
        //       {
        //         vtType: 'Youtube',
        //         noOfMins: values?.noOfMinsTen,
        //         noOfPeople: values?.noOfPeopleTen,
        //         emissions: emissionTwelve > 0 ? emissionTwelve : '',
        //       },
        //       {
        //         vtType: 'Video Conferencing',
        //         noOfMins: values?.noOfMinsEleven,
        //         noOfPeople: values?.noOfPeopleEleven,
        //         emissions: emissionThirteen > 0 ? emissionThirteen : '',
        //       },
        //     ],
        //   },
        //   // scope: 2
        // },
        {
          subType: '',
          subTypeData: {
            th: ['', 'No. of copies', 'Emissions'],
            td: [
              {
                vtType: 'Newspaper- Half page Ad',
                noOfCopiesHalf: values?.noOfCopiesHalf,
                emissions: emissionHalf > 0 ? emissionHalf : '',
              },
            ],
          },
        },
        {
          subType: '',
          subTypeData: {
            th: ['', 'No. of Page', 'No of Copies', 'Emissions'],
            td: [
              {
                vtType: 'Colour Print Ad',
                noOfPages: values?.colourNoOfPage,
                noOfCopy: values?.copyOne,
                emissions: emissionColour > 0 ? emissionColour : '',
              },
              {
                vtType: 'Black & White',
                noOfPages: values?.blackWhiteNoOfPage,
                noOfCopy: values?.copyTwo,
                emissions: emissionBlackWhite > 0 ? emissionBlackWhite : '',
              },
            ],
          },
        },
      ];
      // dispatch(addVirtualEventData({ data }));

      // dispatch(addResultTableData({ from: "virtualEvent", data: tableData, tabTitle: "Outbound Marketing" }));
      // dispatch(addResultTableData({ from: "virtualEvent", data: tableData, tabTitle: "Outbound Marketing" }));
      // dispatch(addVirtualEventData({ data }));
      // dispatch(addResultTableData({ from: "virtualEvent", data: tableData, tabTitle: "Outbound Marketing" }));
      dispatch(addResultTableData({ from: 'virtualEvent', data: tableData, tabTitle: 'Outbound Marketing' }));
      dispatch(addResultTableData({ from: 'virtualEvent', data: tableData, tabTitle: 'Outbound Marketing' }));
    },
  });

  const { values } = formik;

  const handeleDelete = () => {
    dispatch(deleteVirtualEventData());
    dispatch(deleteResTabVrtEventData());
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

  const handleOpenInfo = () => setOpenInfo(true);
  const handleInfoClose = () => setOpenInfo(false);

  // useEffect(() => {
  //   if (allData?.length > 0) {
  //     // formik.setFieldValue('imgSize', allData?.[0]?.imgSize);
  //     // formik.setFieldValue('deviceEnergy1', allData?.[0]?.deviceEnergy1);
  //     // formik.setFieldValue('somePlatformEnergy1', allData?.[0]?.somePlatformEnergy1);
  //     // formik.setFieldValue('networkEnergy1', allData?.[0]?.networkEnergy1);
  //     // formik.setFieldValue('totalEnergy1', allData?.[0]?.totalEnergy1);
  //     // formik.setFieldValue('efOne', allData?.[0]?.efOne);
  //     // formik.setFieldValue('impressionsOne', allData?.[0]?.impressionsOne);
  //     // formik.setFieldValue('emissionOne', allData?.[0]?.emission);

  //     // formik.setFieldValue('videoSize', allData?.[1]?.videoSize);
  //     // formik.setFieldValue('videoMins', allData?.[1]?.videoMins);
  //     // formik.setFieldValue('deviceEnergy2', allData?.[1]?.deviceEnergy2);
  //     // formik.setFieldValue('somePlatformEnergy2', allData?.[1]?.somePlatformEnergy2);
  //     // formik.setFieldValue('networkEnergy2', allData?.[1]?.networkEnergy2);
  //     // formik.setFieldValue('totalEnergy2', allData?.[1]?.totalEnergy2);
  //     // formik.setFieldValue('efTwo', allData?.[1]?.efTwo);
  //     // formik.setFieldValue('impressionsTwo', allData?.[1]?.impressionsTwo);
  //     // formik.setFieldValue('emissionTwo', allData?.[1]?.emission);

  //     formik.setFieldValue('noOfMinsOne', allData?.[2]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleOne', allData?.[2]?.noOfPeople);
  //     formik.setFieldValue('efThree', allData?.[2]?.ef);
  //     formik.setFieldValue('emissionThree', allData?.[2]?.emission);

  //     formik.setFieldValue('noOfMinsTwo', allData?.[3]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleTwo', allData?.[3]?.noOfPeople);
  //     formik.setFieldValue('efFour', allData?.[3]?.ef);
  //     formik.setFieldValue('emissionFour', allData?.[3]?.emission);

  //     formik.setFieldValue('noOfMinsThree', allData?.[4]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleThree', allData?.[4]?.noOfPeople);
  //     formik.setFieldValue('efFive', allData?.[4]?.ef);
  //     formik.setFieldValue('emissionFive', allData?.[4]?.emission);

  //     formik.setFieldValue('noOfMinsFour', allData?.[5]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleFour', allData?.[5]?.noOfPeople);
  //     formik.setFieldValue('efSix', allData?.[5]?.ef);
  //     formik.setFieldValue('emissionSix', allData?.[5]?.emission);

  //     formik.setFieldValue('noOfMinsFive', allData?.[6]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleFive', allData?.[6]?.noOfPeople);
  //     formik.setFieldValue('efSeven', allData?.[6]?.ef);
  //     formik.setFieldValue('emissionSeven', allData?.[6]?.emission);

  //     formik.setFieldValue('noOfMinsSix', allData?.[7]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleSix', allData?.[7]?.noOfPeople);
  //     formik.setFieldValue('efEight', allData?.[7]?.ef);
  //     formik.setFieldValue('emissionEight', allData?.[7]?.emission);

  //     formik.setFieldValue('noOfMinsSeven', allData?.[8]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleSeven', allData?.[8]?.noOfPeople);
  //     formik.setFieldValue('efNine', allData?.[8]?.ef);
  //     formik.setFieldValue('emissionNine', allData?.[8]?.emission);

  //     formik.setFieldValue('noOfMinsEight', allData?.[9]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleEight', allData?.[9]?.noOfPeople);
  //     formik.setFieldValue('efTen', allData?.[9]?.ef);
  //     formik.setFieldValue('emissionTen', allData?.[9]?.emission);

  //     formik.setFieldValue('noOfMinsNine', allData?.[10]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleNine', allData?.[10]?.noOfPeople);
  //     formik.setFieldValue('efEleven', allData?.[10]?.ef);
  //     formik.setFieldValue('emissionEleven', allData?.[10]?.emission);

  //     formik.setFieldValue('noOfMinsTen', allData?.[11]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleTen', allData?.[11]?.noOfPeople);
  //     formik.setFieldValue('efTwelve', allData?.[11]?.ef);
  //     formik.setFieldValue('emissionTwelve', allData?.[11]?.emission);

  //     formik.setFieldValue('noOfMinsEleven', allData?.[12]?.noOfMins);
  //     formik.setFieldValue('noOfPeopleEleven', allData?.[12]?.noOfPeople);
  //     formik.setFieldValue('efThirteen', allData?.[12]?.ef);
  //     formik.setFieldValue('emissionThirteen', allData?.[12]?.emission);

  //     formik.setFieldValue('noOfCopiesOne', allData?.[13]?.noOfCopiesOne);
  //     formik.setFieldValue('efFourteen', allData?.[13]?.ef);
  //     formik.setFieldValue('emissionFourteen', allData?.[13]?.emission);

  //     formik.setFieldValue('noOfPages', allData?.[14]?.noOfPages);
  //     formik.setFieldValue('noOfCopiesTwo', allData?.[14]?.noOfCopiesTwo);
  //     formik.setFieldValue('efFifteen', allData?.[14]?.ef);
  //     formik.setFieldValue('emissionFifteen', allData?.[14]?.emission);

  //     formik.setFieldValue('hdpeBanner', allData?.[15]?.hdpeBanner);
  //     formik.setFieldValue('efSixteen', allData?.[15]?.ef);
  //     formik.setFieldValue('emissionSixteen', allData?.[15]?.emission);

  //     formik.setFieldValue('pvcBanners', allData?.[16]?.pvcBanners);
  //     formik.setFieldValue('efSeventeen', allData?.[16]?.ef);
  //     formik.setFieldValue('emissionSeventeen', allData?.[16]?.emission);

  //     formik.setFieldValue('adDuration', allData?.[17]?.adDuration);
  //     formik.setFieldValue('noOfSlots', allData?.[17]?.noOfSlots);
  //     formik.setFieldValue('viewers', allData?.[17]?.viewers);
  //     formik.setFieldValue('efEighteen', allData?.[17]?.ef);
  //     formik.setFieldValue('emissionEightteen', allData?.[17]?.emission);

  //     formik.setFieldValue('podcastSize', allData?.[18]?.podcastSize);
  //     formik.setFieldValue('noOfListeners', allData?.[18]?.noOfListeners);
  //     formik.setFieldValue('podcastKwh', allData?.[18]?.podcastKwh);
  //     formik.setFieldValue('podcastTotal', allData?.[18]?.podcastTotal);
  //     formik.setFieldValue('emissionNineteen', allData?.[18]?.emission);

  //     formik.setFieldValue('energyKwh', allData?.[19]?.energyKwh);
  //     formik.setFieldValue('efTwenty', allData?.[19]?.ef);
  //     formik.setFieldValue('emissionTwenty', allData?.[19]?.emission);
  //   }
  // }, [value]);

  useEffect(() => {
    if (allData?.[0]?.data?.length > 0) {
      const formValues = {
        ...initialValues,
      };

      allData?.[0]?.data?.forEach((item) => {
        if (item.name === 'Newspaper- Full page Ad' || item.type === 'Newspaper- Full page Ad') {
          formValues.noOfCopiesOne = item.noOfCopiesOne;
          formValues.emissionFourteen = item.emission;
        } else if (item.name === 'Polyethylene HDPE Banner' || item.type === 'Polyethylene HDPE Banner') {
          formValues.hdpeBanner = item.hdpeBanner;
          formValues.emissionSixteen = item.emission;
        } else if (item.name === 'PVC Banners' || item.type === 'PVC Banners') {
          formValues.pvcBanners = item.pvcBanners;
          formValues.emissionSeventeen = item.emission;
        } else if (item.name === 'TV Ad' || item.type === 'TV Ad') {
          formValues.adDuration = item.adDuration;
          formValues.noOfSlots = item.noOfSlots;
          formValues.viewers = item.viewers;
          formValues.emissionEightteen = item.emission;
        } else if (item.name === 'Energy' || item.type === 'Energy') {
          formValues.energyKwh = item.energyKwh;
          formValues.energyRenewable = item.energyRenewable;
          formValues.emissionTwenty = item.emission;
        } else if (item.name === 'Newspaper- Half page Ad' || item.type === 'Newspaper- Half page Ad') {
          formValues.noOfCopiesHalf = item.noOfCopiesHalf;
          formValues.emissionHalf = item.emission;
        } else if (item.name === 'Colour Print Ad' || item.type === 'Colour Print Ad') {
          formValues.colourNoOfPage = item.colourNoOfPage;
          formValues.copyOne = item.copyOne;
          formValues.emissionColour = item.emission;
        } else if (item.name === 'Black & White' || item.type === 'Black & White') {
          formValues.blackWhiteNoOfPage = item.blackWhiteNoOfPage;
          formValues.copyTwo = item.copyTwo;
          formValues.emissionBlackWhite = item.emission;
        }
      });

      formik.setValues(formValues);
    }
  }, [value]);

  useEffect(() => {
    formik.setFieldValue(
      'totalEnergy1',
      Number(values.deviceEnergy1) + Number(values.somePlatformEnergy1) + Number(values.networkEnergy1)
    );
  }, [values.deviceEnergy1, values.somePlatformEnergy1, values.networkEnergy1]);

  useEffect(() => {
    formik.setFieldValue(
      'totalEnergy2',
      Number(values.deviceEnergy2) + Number(values.somePlatformEnergy2) + Number(values.networkEnergy2)
    );
  }, [values.deviceEnergy2, values.somePlatformEnergy2, values.networkEnergy2]);

  useEffect(() => {
    formik.setFieldValue('efOne', Number(values.totalEnergy1) * 0.43);
  }, [values.totalEnergy1]);

  useEffect(() => {
    formik.setFieldValue('efTwo', Number(values.totalEnergy2) * 0.43);
  }, [values.totalEnergy2]);

  return (
    <div>
      <Container maxWidth>
        <Card className="p-3 custom-inner-bg">
          {/* <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}> */}
          <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
            {/* <IconDiv><img width={100} src={VirtualEventIcon} alt="Virtual Event" className="tabImgWhite" /></IconDiv> */}
            <IconDiv>
              <img width={100} src={outboundIcon} alt="Ads" className="tabImgWhite" />
            </IconDiv>

            {/* <TiInfoLarge className="fs-3 bg-white text-dark rounded-circle mx-3 p-1" onClick={() => handleOpenInfo()} style={{ cursor: 'pointer', position: 'absolute', right: '4px' }} /> */}

            {/*
                        <Typography variant="h4" className="text-center text-white mt-4">Event Promotion on Social Media</Typography>
                        <Box style={{ padding: '0px !important', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            <Card
                                sx={{
                                    width: 280,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FaImage} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Image</Typography>
                                    <TextField size='small' type="number" name={'imgSize'} value={values?.imgSize}
                                        label="Image Size (in Mb)"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("imgSize", Number(e.target.value));
                                            formik.setFieldValue("deviceEnergy1", 0.01 * (1 / 60));
                                            formik.setFieldValue("somePlatformEnergy1", (0.4 / 1000) * Number(e.target.value));
                                            formik.setFieldValue("networkEnergy1", (0.2 / 1000) * Number(e.target.value));
                                            formik.setFieldValue("totalEnergy1", (0.01 * (Number(e.target.value) / 60)) + ((0.4 / 1000) * Number(e.target.value)) + ((0.2 / 1000) + Number(e.target.value)));     // maybe
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" name={'impressionsOne'} value={values?.impressionsOne}
                                        label="Impressions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("impressionsOne", Number(e.target.value));
                                            formik.setFieldValue("emissionOne", (Number(e.target.value) * Number(values.imgSize) * Number(values.efOne)).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" disabled name={'emissionOne'}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        value={values?.emissionOne} onChange={formik.handleChange} sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FaFileVideo} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Video</Typography>
                                    <TextField size='small' type="number" name={'videoSize'} value={values?.videoSize}
                                        label="Video Size (in Mb)"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("videoSize", Number(e.target.value));
                                            formik.setFieldValue("somePlatformEnergy2", Number((Number(e.target.value) / 1000) * 0.4));
                                            formik.setFieldValue("networkEnergy2", Number((0.2 / 1000) * Number(e.target.value)));
                                            formik.setFieldValue("emissionTwo", (Number(e.target.value) * Number(values?.impressionsTwo) * Number(values.videoMins) * Number(values.efTwo)).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" name={'videoMins'} value={values?.videoMins}
                                        label="Video (in mins)"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("videoMins", Number(e.target.value));
                                            formik.setFieldValue("deviceEnergy2", Number(0.01 * (Number(e.target.value) / 60)));
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" name={'impressionsTwo'} value={values?.impressionsTwo}
                                        label="Impressions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("impressionsTwo", Number(e.target.value));
                                            formik.setFieldValue("emissionTwo", (Number(e.target.value) * Number(values.videoSize) * Number(values.videoMins) * Number(values.efTwo)).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" disabled
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        name={'emissionTwo'}
                                        value={values?.emissionTwo} onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                        </Box> */}

            <Box
              style={{
                padding: '0px !important',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
              className="mt-5"
            >
              <Card
                sx={{
                  width: 260,
                  maxWidth: '100%',
                  boxShadow: 'lg',
                  marginY: '16px',
                }}
              >
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                  {/* <Icon component={BiSolidTv} sx={{ fontSize: 60, color: 'black' }} /> */}
                  <img src={TVImg} alt="tv" style={{ width: '65px', margin: 'auto' }} />
                  <Typography variant="h6" sx={{ marginY: 1 }}>
                    TV Ad
                  </Typography>
                  <TextField
                    size="small"
                    type="number"
                    name={'adDuration'}
                    value={values?.adDuration}
                    label="Ad duration (In Secs)"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      formik.setFieldValue('adDuration', Number(e.target.value));
                      formik.setFieldValue(
                        'emissionEightteen',
                        Number(
                          Number(e.target.value) *
                          Number(values?.noOfSlots) *
                          Number(values?.viewers) *
                          Number(values?.efEighteen)
                        ).toFixed(5)
                      );
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: 2 }}
                    inputProps={{ style: { color: 'black' } }}
                  />
                  <TextField
                    size="small"
                    type="number"
                    name={'noOfSlots'}
                    value={values?.noOfSlots}
                    label="No of slots"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      formik.setFieldValue('noOfSlots', Number(e.target.value));
                      formik.setFieldValue(
                        'emissionEightteen',
                        Number(
                          Number(e.target.value) *
                          Number(values?.adDuration) *
                          Number(values?.viewers) *
                          Number(values?.efEighteen)
                        ).toFixed(5)
                      );
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: 2 }}
                    inputProps={{ style: { color: 'black' } }}
                  />
                  <TextField
                    size="small"
                    type="number"
                    name={'viewers'}
                    value={values?.viewers}
                    label="No. of viewers"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      formik.setFieldValue('viewers', Number(e.target.value));
                      formik.setFieldValue(
                        'emissionEightteen',
                        Number(
                          Number(e.target.value) *
                          Number(values?.adDuration) *
                          Number(values?.noOfSlots) *
                          Number(values?.efEighteen)
                        ).toFixed(5)
                      );
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: 2 }}
                    inputProps={{ style: { color: 'black' } }}
                  />
                  <TextField
                    size="small"
                    type="number"
                    disabled
                    label="Emissions"
                    variant="outlined"
                    fullWidth
                    name={'emissionEightteen'}
                    value={values?.emissionEightteen}
                    onChange={formik.handleChange}
                    sx={{ marginTop: 2 }}
                  />
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: 280,
                  maxWidth: '100%',
                  boxShadow: 'lg',
                  marginY: '16px',
                }}
              >
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                  <Icon component={IoNewspaper} sx={{ fontSize: 60, color: 'black' }} />
                  <Typography variant="h6" sx={{ marginY: 1 }}>
                    Newspaper- Full page Ad
                  </Typography>
                  <TextField
                    size="small"
                    type="number"
                    name={'noOfCopiesOne'}
                    value={values?.noOfCopiesOne}
                    label="No of copies"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      formik.setFieldValue('noOfCopiesOne', Number(e.target.value));
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: 2 }}
                    inputProps={{ style: { color: 'black' } }}
                  />
                  <TextField
                    size="small"
                    type="number"
                    disabled
                    name={'emissionFourteen'}
                    label="Emissions"
                    variant="outlined"
                    fullWidth
                    value={values?.emissionFourteen}
                    onChange={formik.handleChange}
                    sx={{ marginTop: 2 }}
                  />
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: 280,
                  maxWidth: '100%',
                  boxShadow: 'lg',
                  marginY: '16px',
                }}
              >
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                  <Icon component={IoNewspaper} sx={{ fontSize: 60, color: 'black' }} />
                  <Typography variant="h6" sx={{ marginY: 1 }}>
                    Newspaper- Half page Ad
                  </Typography>
                  <TextField
                    size="small"
                    type="number"
                    name={'noOfCopiesHalf'}
                    value={values?.noOfCopiesHalf}
                    label="No of copies"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      formik.setFieldValue('noOfCopiesHalf', Number(e.target.value));
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: 2 }}
                    inputProps={{ style: { color: 'black' } }}
                  />
                  <TextField
                    size="small"
                    type="number"
                    disabled
                    name={'emissionHalf'}
                    label="Emissions"
                    variant="outlined"
                    fullWidth
                    value={values?.emissionHalf}
                    onChange={formik.handleChange}
                    sx={{ marginTop: 2 }}
                  />
                </CardContent>
              </Card>
              {/* <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={MenuBookIcon} color="yellow" sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Magazine</Typography>
                                    <TextField size='small' type="number" name={'noOfPages'} value={values?.noOfPages}
                                        label="No of pages"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPages", Number(e.target.value));
                                            formik.setFieldValue("emissionFifteen", Number(Number(e.target.value) * Number(values?.noOfCopiesTwo)).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" name={'noOfCopiesTwo'} value={values?.noOfCopiesTwo}
                                        label="No of copies"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfCopiesTwo", Number(e.target.value));
                                            formik.setFieldValue("emissionFifteen", Number(Number(e.target.value) * Number(values?.noOfPages)).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" disabled
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        name={'emissionFifteen'}
                                        value={values?.emissionFifteen}
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card> */}
              {/* <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <img src={podcastIcon} alt="tv" style={{ width: "55px", height: '55px', margin: "auto" }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Podcast</Typography>
                                    <TextField size='small' type="number" name={'podcastSize'} value={values?.podcastSize}
                                        label="Podcast Size (in Mb)"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            const podcastTotal = Number(e.target.value) * Number(values?.podcastKwh);
                                            const emissionNineteen = Number(Number(podcastTotal) * Number(values?.noOfListeners)).toFixed(5);
                                            formik.setFieldValue("podcastSize", Number(e.target.value));
                                            formik.setFieldValue("podcastTotal", podcastTotal);
                                            formik.setFieldValue("emissionNineteen", emissionNineteen);
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" name={'noOfListeners'} value={values?.noOfListeners}
                                        label="No of Listeners"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            const emissionNineteen = Number(Number(values?.podcastTotal) * Number(e.target.value)).toFixed(5);
                                            formik.setFieldValue("noOfListeners", Number(e.target.value));
                                            formik.setFieldValue("emissionNineteen", emissionNineteen);
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" disabled
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        name={'emissionNineteen'}
                                        value={values?.emissionNineteen}
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card> */}
            </Box>

            <Box
              style={{
                padding: '0px !important',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
              className="mt-5"
            >
              <Card
                sx={{
                  width: 260,
                  maxWidth: '100%',
                  boxShadow: 'lg',
                  marginY: '16px',
                }}
              >
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                  {/* <Icon component={BiSolidTv} sx={{ fontSize: 60, color: 'black' }} /> */}
                  <img src={PrintImg} alt="printer" style={{ width: '65px', margin: 'auto' }} />
                  <Typography variant="h6" sx={{ marginY: 1 }}>
                    Colour Print
                  </Typography>
                  <TextField
                    size="small"
                    type="number"
                    name={'colourNoOfPage'}
                    value={values?.colourNoOfPage}
                    label="No of page"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      formik.setFieldValue('colourNoOfPage', Number(e.target.value));
                      // formik.setFieldValue("emissionColour", Number(Number(e.target.value) * Number(values?.colour)  * Number(values?.efPage)).toFixed(5));
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: 2 }}
                    inputProps={{ style: { color: 'black' } }}
                  />

                  <TextField
                    size="small"
                    type="number"
                    name={'copyOne'}
                    value={values?.copyOne}
                    label="No of Copies"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      formik.setFieldValue('copyOne', Number(e.target.value));
                      // formik.setFieldValue("emissionColour", Number(Number(e.target.value) * Number(values?.colour)  * Number(values?.efPage)).toFixed(5));
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: 2 }}
                    inputProps={{ style: { color: 'black' } }}
                  />

                  <TextField
                    size="small"
                    type="number"
                    disabled
                    label="Emissions"
                    variant="outlined"
                    fullWidth
                    name={'emissionColour'}
                    value={values?.emissionColour}
                    onChange={formik.handleChange}
                    sx={{ marginTop: 2 }}
                  />
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: 260,
                  maxWidth: '100%',
                  boxShadow: 'lg',
                  marginY: '16px',
                }}
              >
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                  {/* <Icon component={BiSolidTv} sx={{ fontSize: 60, color: 'black' }} /> */}
                  <img src={PrintImg} alt="tv" style={{ width: '65px', margin: 'auto' }} />
                  <Typography variant="h6" sx={{ marginY: 1 }}>
                    B&W Print
                  </Typography>
                  <TextField
                    size="small"
                    type="number"
                    name={'blackWhiteNoOfPage'}
                    value={values?.blackWhiteNoOfPage}
                    label="No of page"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      formik.setFieldValue('blackWhiteNoOfPage', Number(e.target.value));
                      // formik.setFieldValue("emissionColour", Number(Number(e.target.value) * Number(values?.colour)  * Number(values?.efPage)).toFixed(5));
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: 2 }}
                    inputProps={{ style: { color: 'black' } }}
                  />

                  <TextField
                    size="small"
                    type="number"
                    name={'copyTwo'}
                    value={values?.copyTwo}
                    label="No of Copies"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      formik.setFieldValue('copyTwo', Number(e.target.value));
                      // formik.setFieldValue("emissionColour", Number(Number(e.target.value) * Number(values?.colour)  * Number(values?.efPage)).toFixed(5));
                      formik.handleSubmit();
                    }}
                    sx={{ marginTop: 2 }}
                    inputProps={{ style: { color: 'black' } }}
                  />

                  <TextField
                    size="small"
                    type="number"
                    disabled
                    label="Emissions"
                    variant="outlined"
                    fullWidth
                    name={'emissionBlackWhite'}
                    value={values?.emissionBlackWhite}
                    onChange={formik.handleChange}
                    sx={{ marginTop: 2 }}
                  />
                </CardContent>
              </Card>
            </Box>

            <Box className="mb-4">
              <Typography variant="h4" className="text-center text-white mt-4 mb-2">
                Outdoor Billboard
              </Typography>
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <div className="table-responsive">
                    {/* <table className="table-custom-inpt-field textborder"> */}
                    <table className="textborder">
                      <tr className="text-white">
                        <th />
                        <th className="ps-2">Weight (Kgs)</th>
                        <th className="ps-2">Emissions</th>
                      </tr>
                      <tr>
                        <td className="ps-4 py-1 text-white">Polyethylene</td>
                        <td className="ps-2 py-1">
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            name={'hdpeBanner'}
                            value={values?.hdpeBanner}
                            onChange={(e) => {
                              formik.setFieldValue('hdpeBanner', Number(e.target.value));
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
                            fullWidth
                            name={'emissionSixteen'}
                            value={values?.emissionSixteen}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-4 py-1 text-white">PVC</td>
                        <td className="ps-2 py-1">
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            name={'pvcBanners'}
                            value={values?.pvcBanners}
                            onChange={(e) => {
                              formik.setFieldValue('pvcBanners', Number(e.target.value));
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
                            fullWidth
                            name={'emissionSeventeen'}
                            value={values?.emissionSeventeen}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Grid>
            </Box>

            <Box className="mb-4">
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <div className="table-responsive">
                    {/* <table className="table-custom-inpt-field textborder"> */}
                    <table className="textborder">
                      <tr className="text-white">
                        <th width={'122px'} />
                        <th className="ps-2">kwh</th>
                        <th className="ps-2">% Renewable</th>
                        <th className="ps-2">Emissions</th>
                      </tr>
                      <tr>
                        <td className="ps-4 py-1 text-white">Energy</td>
                        <td className="ps-2 py-1">
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            name={'energyKwh'}
                            value={values?.energyKwh}
                            onChange={(e) => {
                              formik.setFieldValue('energyKwh', Number(e.target.value));
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        {/* <td className="ps-4 py-1 text-white">% Renewable</td> */}
                        <td className="ps-2 py-1">
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            name={'energyRenewable'}
                            value={values?.energyRenewable}
                            onChange={(e) => {
                              formik.setFieldValue('energyRenewable', Number(e.target.value));
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
                            fullWidth
                            name={'emissionTwenty'}
                            value={values?.emissionTwenty}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Grid>
            </Box>

            {/* <Typography variant="h4" className="text-center text-white my-4">Live Broadcasting</Typography>
                        <Box style={{ padding: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FaTiktok} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Tiktok</Typography>
                                    <TextField
                                        size="small"
                                        type="number"
                                        name="noOfMinsOne"
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        value={values?.noOfMinsOne}
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsOne", e.target.value);
                                            formik.setFieldValue("emissionThree", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleOne) * 0.46).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField
                                        size="small"
                                        type="number"
                                        name="noOfPeopleOne"
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        value={values?.noOfPeopleOne}
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleOne", e.target.value);
                                            formik.setFieldValue("emissionTwelve", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsOne) * 0.46).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField
                                        size="small"
                                        type="number"
                                        name={`emissionThree`}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        disabled
                                        value={values?.emissionThree}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={RedditIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Reddit</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsTwo'} value={values?.noOfMinsTwo}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsTwo", e.target.value);
                                            formik.setFieldValue("emissionFour", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleTwo) * 2.48).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleTwo'} value={values?.noOfPeopleTwo}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleTwo", e.target.value);
                                            formik.setFieldValue("emissionFour", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsTwo) * 2.48).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionFour`}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth value={values?.emissionFour} onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={PinterestIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Pinterest</Typography><TextField size='small' type="number" name={'noOfMinsThree'} value={values?.noOfMinsThree}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsThree", e.target.value);
                                            formik.setFieldValue("emissionFive", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleThree) * 1.3).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleThree'} value={values?.noOfPeopleThree}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleThree", e.target.value);
                                            formik.setFieldValue("emissionFive", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsThree) * 1.3).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionFive`}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        value={values?.emissionFive} onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={InstagramIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Instagram Live</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsFour'} value={values?.noOfMinsFour}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsFour", e.target.value);
                                            formik.setFieldValue("emissionSix", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleFour) * 1.05).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleFour'} value={values?.noOfPeopleFour}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleFour", e.target.value);
                                            formik.setFieldValue("emissionSix", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsFour) * 1.05).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionSix`} value={values?.emissionSix}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />

                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FaSnapchat} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Snapchat</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsFive'} value={values?.noOfMinsFive}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsFive", e.target.value);
                                            formik.setFieldValue("emissionSeven", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleFive) * 0.87).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleFive'} value={values?.noOfPeopleFive}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleFive", e.target.value);
                                            formik.setFieldValue("emissionSeven", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsFive) * 0.87).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionSeven`} value={values?.emissionSeven}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FacebookIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Facebook Live</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsSix'} value={values?.noOfMinsSix}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsSix", e.target.value);
                                            formik.setFieldValue("emissionEight", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleSix) * 0.79).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleSix'} value={values?.noOfPeopleSix}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleSix", e.target.value);
                                            formik.setFieldValue("emissionEight", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsSix) * 0.79).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionEight`} value={values?.emissionEight}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}

                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={LinkedInIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>LinkedIn Live</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsSeven'} value={values?.noOfMinsSeven}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsSeven", e.target.value);
                                            formik.setFieldValue("emissionNine", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.emissionNine) * 0.71).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleSeven'} value={values?.noOfPeopleSeven}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleSeven", e.target.value);
                                            formik.setFieldValue("emissionNine", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsSeven) * 0.71).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionNine`} value={values?.emissionNine}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={TwitterIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Twitter Live</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsEight'} value={values?.noOfMinsEight}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsEight", e.target.value);
                                            formik.setFieldValue("emissionTen", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleEight) * 0.6).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleEight'} value={values?.noOfPeopleEight}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleEight", e.target.value);
                                            formik.setFieldValue("emissionTen", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsSix) * 0.6).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionTen`} value={values?.emissionTen}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FaTwitch} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Twitch</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsNine'} value={values?.noOfMinsNine}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsNine", e.target.value);
                                            formik.setFieldValue("emissionEleven", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleNine) * 0.55).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleNine'} value={values?.noOfPeopleNine}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleNine", e.target.value);
                                            formik.setFieldValue("emissionEleven", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsNine) * 0.55).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionEleven`} value={values?.emissionEleven}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={YouTubeIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Youtube</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsTen'} value={values?.noOfMinsTen}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsTen", e.target.value);
                                            formik.setFieldValue("emissionTwelve", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleFive) * 0.46).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleTen'} value={values?.noOfPeopleTen}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleTen", e.target.value);
                                            formik.setFieldValue("emissionTwelve", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsTen) * 0.46).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionTwelve`} value={values?.emissionTwelve}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 260,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={GiVideoConference} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Video Conferencing</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsEleven'} value={values?.noOfMinsEleven}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsEleven", e.target.value);
                                            formik.setFieldValue("emissionThirteen", e.target.value === 0 ? 0 : Number((Number(e.target.value) * Number(values?.noOfPeopleEleven) * 2.7) / 1000).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleEleven'} value={values?.noOfPeopleEleven}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleEleven", e.target.value);
                                            formik.setFieldValue("emissionThirteen", e.target.value === 0 ? 0 : Number((Number(e.target.value) * Number(values?.noOfPeopleEleven) * 2.7) / 1000).toFixed(5));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionThirteen`} value={values?.emissionThirteen}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                        </Box> */}
          </Box>
          <Grid>
            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
              <Stack direction={'row'} spacing={2}>
                <Button
                  variant="contained"
                  endIcon={<FaAngleDoubleRight />}
                  onClick={() => {
                    handleSaveToDb();
                    setValue(value + 1);
                  }}
                  className="custom-btn"
                >
                  Save and Next Page
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
            {/* <Grid item xs={12} sm={12} md={12} marginTop={3}><Typography color='white' className='text-center'>{`Total Virtual Event Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography></Grid> */}
            <Grid item xs={12} sm={12} md={12} marginTop={3}>
              <Typography color="white" className="text-center">
                {`Total Ads Carbon Footprint = ${Number(totalEmission || 0).toFixed(5)} `}kgCO<sub>2</sub>e
              </Typography>
            </Grid>
          </Grid>
        </Card>

        <Modal
          open={openInfo}
          onClose={handleInfoClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="h5"
                style={{ fontStyle: 'italic', textDecoration: 'underline', marginLeft: '-18px' }}
              >
                Note
              </Typography>
              <CloseIcon onClick={handleInfoClose} style={{ cursor: 'pointer' }} />
            </Box>
            <Box style={{ overflowY: 'auto', maxHeight: 'calc(100% - 40px)', marginTop: '16px' }}>
              <Box>
                <Typography
                  variant="h5"
                  style={{ fontStyle: 'italic', textDecoration: 'underline', marginBottom: '10px' }}
                >
                  Platform Comparisons and Recommendations
                </Typography>
                <ol className="strong-ol">
                  <li>
                    <strong>YouTube</strong>
                    <ul>
                      <li>
                        Pros: Widely accessible, high video quality, excellent CDN, robust analytics, investments in
                        renewable energy.
                      </li>
                      <li>Cons: High data usage due to high-definition streaming.</li>
                      <li>Best For: Large audiences, public events, and educational content.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>LinkedIn</strong>
                    <ul>
                      <li>
                        Pros: Professional audience, good for B2B events, webinars, and professional networking,
                        improving energy efficiency in data centers.
                      </li>
                      <li>Cons: Limited interactive features.</li>
                      <li>Best For: Professional events, industry conferences, and networking.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Facebook</strong>
                    <ul>
                      <li>
                        Pros: Large user base, diverse audience, integrated event features, interactive options,
                        commitment to 100% renewable energy.
                      </li>
                      <li>Cons: Potential data privacy concerns.</li>
                      <li>Best For: Community events, diverse audience reach, and interactive sessions.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Instagram</strong>
                    <ul>
                      <li>
                        Pros: Highly visual platform, good for engaging younger audiences, strong live streaming
                        features.
                      </li>
                      <li>Cons: Limited in-depth interaction and longer video formats.</li>
                      <li>Best For: Visual-centric events, influencer partnerships, and short interactive sessions.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Twitter</strong>
                    <ul>
                      <li>Pros: Real-time interaction, good for quick updates and engagement, trending topics.</li>
                      <li>Cons: Limited video hosting capabilities.</li>
                      <li>Best For: Real-time updates, discussions, and live chats.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>TikTok</strong>
                    <ul>
                      <li>Pros: Popular with younger audiences, highly engaging short video format.</li>
                      <li>Cons: Limited long-form content capabilities, higher energy usage due to high engagement.</li>
                      <li>Best For: Short, engaging, and viral content.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Snapchat</strong>
                    <ul>
                      <li>Pros: Strong among younger demographics, good for short, interactive content.</li>
                      <li>Cons: Limited reach beyond its core audience.</li>
                      <li>Best For: Short, interactive, and visually engaging content.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Reddit</strong>
                    <ul>
                      <li>Pros: Community-driven, good for niche audiences, and in-depth discussions.</li>
                      <li>Cons: Limited live event features.</li>
                      <li>Best For: Niche community engagement and in-depth discussions.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Pinterest</strong>
                    <ul>
                      <li>
                        Pros: Excellent for visual discovery, long-tail engagement, audience interested in DIY,
                        lifestyle, and creative ideas, commitments to carbon neutrality.
                      </li>
                      <li>Cons: Limited live streaming features.</li>
                      <li>Best For: Visual content, long-term engagement, and discovery-focused events.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Twitch</strong>
                    <ul>
                      <li>
                        Pros: Real-time interaction, strong community-building tools, high-performance live streaming,
                        various monetization options.
                      </li>
                      <li>Cons: Niche audience, higher data usage, steeper learning curve for hosts.</li>
                      <li>Best For: Live, interactive events with high engagement levels.</li>
                    </ul>
                  </li>
                </ol>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  style={{ fontStyle: 'italic', textDecoration: 'underline', marginBottom: '10px' }}
                >
                  Recommendations for Lower Emissions and Effective Hosting
                </Typography>
                <ol className="strong-ol">
                  <li>
                    <strong>YouTube and LinkedIn:</strong>
                    <ul>
                      <li>
                        Both platforms are good choices due to their energy-efficient data centers and robust
                        infrastructure. YouTube is ideal for large, public events, while LinkedIn is better for
                        professional and B2B events.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Facebook</strong>
                    <ul>
                      <li>
                        Suitable for community events and diverse audience reach. Its commitment to renewable energy
                        makes it an environmentally friendly choice.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Facebook</strong>
                    <ul>
                      <li>
                        Pros: Large user base, diverse audience, integrated event features, interactive options,
                        commitment to 100% renewable energy.
                      </li>
                      <li>Cons: Potential data privacy concerns.</li>
                      <li>Best For: Community events, diverse audience reach, and interactive sessions.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Twitch</strong>
                    <ul>
                      <li>
                        Ideal for highly interactive events despite higher energy usage. Great for gaming, live
                        performances, and community-driven events.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Pinterest</strong>
                    <ul>
                      <li>
                        Best for visual-centric and long-term engagement events. Its sustainability initiatives align
                        well with a focus on reducing carbon footprints.
                      </li>
                    </ul>
                  </li>
                </ol>
                <Typography>
                  The choice of platform should balance your event's interactivity needs, audience engagement, and
                  environmental impact. YouTube, LinkedIn, and Facebook offer a good mix of accessibility, features, and
                  sustainability. Twitch and Pinterest can also be effective based on the nature of your event and
                  target audience.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};
export default VirtualEvent;
