import { useSelector } from 'react-redux';
import { date } from 'yup';

const useEventData = () => {
  const toolData = useSelector((state) => state.toolDetails?.data);
  const toolFormData = toolData.find((item) => item?.type === 'toolForm');
  const resultTableData = useSelector((state) => state.resultTableDataDetails); // pdf

  // f2f-event
  const airTravelAllData = useSelector((state) => state?.totalAirTravelDetails);
  const localTranspotationAllData = useSelector((state) => state?.totalLocalTranspotationDetails);
  const hotelAllData = useSelector((state) => state?.totalHotelDetails);
  const foodAllData = useSelector((state) => state?.totalFoodDetails);
  const airFreightAllData = useSelector((state) => state?.totalAirFreightDetails);
  const productionAllData = useSelector((state) => state?.totalProductionDetails);
  const energyUpdatedAllData = useSelector((state) => state?.totalEnergyUpdatedDetails);
  const digitalContentAllData = useSelector((state) => state?.totalDigitalContentDetails);
  const wasteAllData = useSelector((state) => state?.totalWasteDetails);

  // virtual-event
  const vitrualEventAllData = useSelector((state) => state?.totalVirtualEventDetails); // Outbound Marketing

  // pr-event
  const commsAllData = useSelector((state) => state?.totalCommsDetails);
  const prAgencyAllData = useSelector((state) => state?.totalPrAgencyDetails);
  const hospitalityAllData = useSelector((state) => state?.totalHospitalityDetails);

  // digital-campaign
  const digitalCampaignAllData = useSelector((state) => state?.totalDigitalCampaignDetails);
  const imageAllData = useSelector((state) => state?.totalImageDetails);
  const videoAllData = useSelector((state) => state?.totalVideoDetails);
  return {
    activityName: toolFormData?.activityName || '',
    budget: toolFormData?.budget || '',
    country: toolFormData?.country || '',
    dateTime: toolFormData?.dateTime || '',
    dateTo: toolFormData?.dateTo || '',
    dateFrom: toolFormData?.dateFrom || '',
    // All 4 Main Events data
    f2fEventData: resultTableData?.data?.find((item) => item.from === 'f2fEvent')?.allDataOfTab || [],
    virtualEventData: resultTableData?.data?.find((item) => item.from === 'virtualEvent')?.allDataOfTab || [],
    prEventData: resultTableData?.data?.find((item) => item.from === 'prEvent')?.allDataOfTab || [],
    digitalCampaignData: resultTableData?.data?.find((item) => item.from === 'digitalCampaign')?.allDataOfTab || [],

    // f2fEventData: resultTableData?.data?.data?.find(item => item.from === "f2fEvent")?.allDataOfTab || [],
    // virtualEventData: resultTableData?.data?.data?.find(item => item.from === "virtualEvent")?.allDataOfTab || [],
    // prEventData: resultTableData?.data?.data?.find(item => item.from === "prEvent")?.allDataOfTab || [],
    // digitalCampaignData: resultTableData?.data?.data?.find(item => item.from === "digitalCampaign")?.allDataOfTab || [],

    // each tab data
    airTravelAllData,
    localTranspotationAllData,
    hotelAllData,
    foodAllData,
    airFreightAllData,
    productionAllData,
    energyAllData: energyUpdatedAllData,
    digitalCommsAllData: digitalContentAllData,
    wasteAllData,

    vitrualEventAllData,
    commsAllData,
    prAgencyAllData,
    hospitalityAllData,
    videoAllData,
    imageAllData,
    digitalCampaignAllData,
  };
};

export default useEventData;
