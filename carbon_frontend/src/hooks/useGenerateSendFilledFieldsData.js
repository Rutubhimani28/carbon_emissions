import { useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { apipost } from '../service/api';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const UseGenerateSendFilledFieldsData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [isFieldsLoading, setIsFieldsLoading] = useState(false);

  const userid = sessionStorage.getItem('user_id');
  const userSessionData = sessionStorage.getItem('user');
  const userData = JSON.parse(userSessionData);

  const toolData = useSelector((state) => state?.toolDetails?.data);
  const toolFormData = toolData?.find((item) => item?.type === 'toolForm');
  const resultTableData = useSelector((state) => state?.resultTableDataDetails); // pdf
  const userAllEventsData = resultTableData?.userAllEventsData;

  // count total emission by event wise
  const allEventsEmissions = [];

  userAllEventsData?.forEach((event) => {
    // f2f-event
    const airTravelEmission = event?.airTravelAllData?.totalEmission;
    const localTranspotationEmission = event?.localTranspotationAllData?.totalEmission;
    const hotelEmission = event?.hotelAllData?.totalEmission;
    const foodEmission = event?.foodAllData?.totalEmission;
    const airFreightEmission = event?.airFreightAllData?.totalEmission;
    const productionEmission = event?.productionAllData?.totalEmission;
    const energyEmission = event?.energyAllData?.totalEmission;
    const digitalContentEmission = event?.digitalCommsAllData?.totalEmission;
    const wasteEmission = event?.wasteAllData?.totalEmission;

    // virtual-event
    const outboundMarketingEmission = event?.vitrualEventAllData?.totalEmission;

    // pr-event
    const commsEmission = event?.commsAllData?.totalEmission;
    const prAgencyEmission = event?.prAgencyAllData?.totalEmission;
    const hospitalityEmission = event?.hospitalityAllData?.totalEmission;

    // digital-campaign
    const imageAllDataEmission = event?.imageAllData?.totalEmission;
    const videoAllDataEmission = event?.videoAllData?.totalEmission;
    const pageViewAllDataEmission = event?.pageViewAllData?.totalEmission;
    const digitalCampaignEmission = event?.digitalCampaignAllData?.totalEmission;

    const f2fEventTotalEmission = Number(
      Number(airTravelEmission || 0) +
        Number(localTranspotationEmission || 0) +
        Number(hotelEmission || 0) +
        Number(foodEmission || 0) +
        Number(airFreightEmission || 0) +
        Number(productionEmission || 0) +
        Number(energyEmission || 0) +
        Number(digitalContentEmission || 0) +
        Number(wasteEmission || 0)
    ).toFixed(5);
    const virtualEventTotalEmission = Number(outboundMarketingEmission || 0).toFixed(5);
    const prEventTotalEmission = Number(
      Number(commsEmission || 0) + Number(prAgencyEmission || 0) + Number(hospitalityEmission || 0)
    ).toFixed(5);
    const digitalCampaignTotalEmission = Number(
      Number(imageAllDataEmission || 0) + Number(videoAllDataEmission || 0)
    ).toFixed(5);
    // const digitalCampaignTotalEmission = Number(digitalCampaignEmission || 0).toFixed(5);

    allEventsEmissions.push({
      f2fEventTotalEmission,
      virtualEventTotalEmission,
      prEventTotalEmission,
      digitalCampaignTotalEmission,
      activity: `${event?.activityName} - ${dayjs(event?.dateTime).format('DD/MM/YYYY hh:mm')}`,
      // activity: `${event?.activityName} - ${dayjs(event?.dateTime).format('DD/MM/YYYY hh:mm')}`,
      eventId: event?._id,
    });
  });

  const returnObj = {
    activityName: toolFormData?.activityName || '',
    budget: toolFormData?.budget || '',
    country: toolFormData?.country || '',
    dateTime: toolFormData?.dateTime || '',
    dateTo: toolFormData?.dateTo || '',
    dateFrom: toolFormData?.dateFrom || '',
    isAttachment: true,
    // subject: `${toolFormData?.activityName} activity all events emissions data`,
    subject: `${toolFormData?.activityName}- Data`,
    receiver: userData?.loginId,
    sender: userid,
    name: toolFormData?.name,
    // receiver: values?.emails,
    emailBodyTemplateName: 'retrieve_data_ebody_Template',
    // chatSuggestion
  };

  // f2f-event
  const allAirTravelData = useSelector((state) => state?.totalAirTravelDetails);
  const allLocalTranspotationData = useSelector((state) => state?.totalLocalTranspotationDetails);
  const allHotelData = useSelector((state) => state?.totalHotelDetails);
  const allFoodData = useSelector((state) => state?.totalFoodDetails);
  const allAirFreightData = useSelector((state) => state?.totalAirFreightDetails);
  const allProductionData = useSelector((state) => state?.totalProductionDetails);
  const allEnergyData = useSelector((state) => state?.totalEnergyUpdatedDetails);
  const allDigitalContentData = useSelector((state) => state?.totalDigitalContentDetails);
  const allWasteData = useSelector((state) => state?.totalWasteDetails);
  const total1 =
    Number(allProductionData?.totalEmission) +
    Number(allAirFreightData?.totalEmission) +
    Number(allFoodData?.totalEmission) +
    Number(allEnergyData?.totalEmission) +
    Number(allAirTravelData?.totalEmission) +
    Number(allDigitalContentData?.totalEmission) +
    Number(allLocalTranspotationData?.totalEmission) +
    Number(allHotelData?.totalEmission) +
    Number(allWasteData?.totalEmission);

  // virtual-event
  const allVirtualEventData = useSelector((state) => state?.totalVirtualEventDetails);
  const total2 = Number(allVirtualEventData?.totalEmission);

  // pr-event
  const allCommsData = useSelector((state) => state?.totalCommsDetails);
  const allPrAgencyData = useSelector((state) => state?.totalPrAgencyDetails);
  const allHospitalityData = useSelector((state) => state?.totalHospitalityDetails);
  const total3 =
    Number(allPrAgencyData?.totalEmission) +
    Number(allHospitalityData?.totalEmission) +
    Number(allCommsData?.totalEmission);

  // digital campaign
  const allimageData = useSelector((state) => state?.totalImageDetails);
  const allVideoData = useSelector((state) => state?.totalVideoDetails);
  const allPageViewData = useSelector((state) => state?.totalPageViewDetails);
  const allDigitalCampaignData = useSelector((state) => state?.totalDigitalCampaignDetails);
  const total4 = Number(allimageData?.totalEmission) + Number(allVideoData?.totalEmission);
  // Number(allDigitalCampaignData?.totalEmission);

  const dataOne = {
    totalAirTravel: Number(allAirTravelData?.totalEmission).toFixed(5),
    totalLocalTransportation: Number(allLocalTranspotationData?.totalEmission).toFixed(5),
    totalHotel: Number(allHotelData?.totalEmission).toFixed(5),
    totalFood: Number(allFoodData?.totalEmission).toFixed(5),
    totalAirFreight: Number(allAirFreightData?.totalEmission).toFixed(5),
    totlaProduction: Number(allProductionData?.totalEmission).toFixed(5),
    totalEnergyUpdated: Number(allEnergyData?.totalEmission).toFixed(5),
    totalDIgitalContent: Number(allDigitalContentData?.totalEmission).toFixed(5),
    totalWaste: Number(allWasteData?.totalEmission).toFixed(5),
    grandTotal: Number(total1).toFixed(5),
  };

  const dataTwo = {
    // "totalVirtualEvent": Number(allVirtualEventData?.totalEmission).toFixed(5),
    totalTvAd: Number(allVirtualEventData?.data?.[0]?.data?.[17]?.emission).toFixed(5),
    totalNewspaper: Number(allVirtualEventData?.data?.[0]?.data?.[13]?.emission).toFixed(5),
    totalMagazine: Number(allVirtualEventData?.data?.[0]?.data?.[14]?.emission).toFixed(5),
    totalPodcast: Number(allVirtualEventData?.data?.[0]?.data?.[18]?.emission).toFixed(5),
    totalPolyethylene: Number(allVirtualEventData?.data?.[0]?.data?.[15]?.emission).toFixed(5),
    totalPVC: Number(allVirtualEventData?.data?.[0]?.data?.[16]?.emission).toFixed(5),
    grandTotal: Number(total2).toFixed(5),
  };

  const dataThree = {
    totalComms: Number(allCommsData?.totalEmission).toFixed(5),
    totalPrAgency: Number(allPrAgencyData?.totalEmission).toFixed(5),
    totalHospitality: Number(allHospitalityData?.totalEmission).toFixed(5),
    grandTotal: Number(total3).toFixed(5),
  };

  const dataFour = {
    totalDigitalCampaign: Number(allDigitalCampaignData?.totalEmission).toFixed(5),
    grandTotal: Number(total4).toFixed(5),
    socialMediaEmission:
      Number(
        Number(Number(allDigitalCampaignData?.data?.[0]?.data?.[0]?.emission) || 0) +
          Number(Number(allDigitalCampaignData?.data?.[0]?.data?.[1]?.emission) || 0)
      ).toFixed(5) || 0,
    emailEmission: Number(allDigitalCampaignData?.data?.[0]?.data?.[2]?.emission).toFixed(5) || 0,
    podcastEmission: Number(allDigitalCampaignData?.data?.[0]?.data?.[3]?.emission).toFixed(5) || 0,
  };

  // f2f-event
  if (total1 > 0) {
    returnObj.dataOne = dataOne;
    returnObj.attachmentTemplateNameOne = 'f2f_event__retrieve_data_filled_fields_Template';
    returnObj.totalTonCo2One = (dataOne?.grandTotal / 1000).toFixed(5) || 0;
    returnObj.eveydolarCo2One = (dataOne?.grandTotal / toolFormData?.budget).toFixed(5) || 0;
    returnObj.resultTableDataOne = resultTableData?.data?.find((item) => item.from === 'f2fEvent');
    returnObj.attachmentPdfNameOne = `F2F Event- ${toolFormData?.activityName}`;
  }

  // virtual-event
  if (total2 > 0) {
    returnObj.dataTwo = dataTwo;
    returnObj.attachmentTemplateNameTwo = 'virtual_event_retrieve_data_filled_fields_Template';
    returnObj.totalTonCo2Two = (dataTwo?.grandTotal / 1000).toFixed(5) || 0;
    returnObj.eveydolarCo2Two = (dataTwo?.grandTotal / toolFormData?.budget).toFixed(5) || 0;
    returnObj.resultTableDataTwo = resultTableData?.data?.find((item) => item.from === 'virtualEvent');
    // returnObj.attachmentPdfNameTwo = `Virtual Event- ${toolFormData?.activityName}`;
    returnObj.attachmentPdfNameTwo = `Ads- ${toolFormData?.activityName}`;
  }

  // pr-event
  if (total3 > 0) {
    returnObj.dataThree = dataThree;
    returnObj.attachmentTemplateNameThree = 'pr_event_retrieve_data_filled_fields_Template';
    returnObj.totalTonCo2Three = (dataThree?.grandTotal / 1000).toFixed(5) || 0;
    returnObj.eveydolarCo2Three = (dataThree?.grandTotal / toolFormData?.budget).toFixed(5) || 0;
    returnObj.resultTableDataThree = resultTableData?.data?.find((item) => item.from === 'prEvent');
    returnObj.attachmentPdfNameThree = `PR Event- ${toolFormData?.activityName}`;
  }

  // digital-campaign
  if (total4 > 0) {
    returnObj.dataFour = dataFour;
    returnObj.attachmentTemplateNameFour = 'digital_campaign_retrieve_data_filled_fields_Template';
    returnObj.totalTonCo2Four = (dataFour?.grandTotal / 1000).toFixed(5) || 0;
    returnObj.eveydolarCo2Four = (dataFour?.grandTotal / toolFormData?.budget).toFixed(5) || 0;
    returnObj.resultTableDataFour = resultTableData?.data?.find((item) => item.from === 'digitalCampaign');
    returnObj.attachmentPdfNameFour = `Digital Campaign- ${toolFormData?.activityName}`;
  }

  // generate & send current eventn filled fields pdf
  const addEmail = async () => {
    setIsFieldsLoading(true);
    try {
      const payload = returnObj;
      await apipost('api/email/add', payload);
    } catch (error) {
      console.error('--- addEmail error ', error);
    }
    setIsFieldsLoading(false);
  };

  // send graph data to genearet pdf and send to mail
  const addEmailForGraph = async (eventDataId) => {
    setIsGraphLoading(true);
    const currentEventEmissions = allEventsEmissions?.filter((event) => event?.eventId === eventDataId);
    try {
      const payload = {
        allEventsEmissions: currentEventEmissions,
        receiver: [userData?.loginId],
        attachmentTemplateName: 'bar_chart',
        // attachmentPdfName: 'user_all_event_bar_chart'
        attachmentPdfName: `Marketing Activity Analytics`,
        name: userData?.cnctPerson,
        subject: `Retrieve Graphs`,
        activityName: `${toolFormData?.activityName} - graph chart`,
      };
      await apipost('api/email/addGraph', payload);
    } catch (error) {
      console.error('--- addEmail error ', error);
    }
    setIsGraphLoading(false);
  };

  return {
    ...returnObj,
    isLoading,
    isGraphLoading,
    isFieldsLoading,
    allEventsEmissions,
    addEmail,
    addEmailForGraph,
  };
};

export default UseGenerateSendFilledFieldsData;
