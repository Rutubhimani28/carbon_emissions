import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { setAirTravelAllData, deleteAirTravelData } from '../redux/slice/totalAirTravelSlice';
import {
  setLocalTranspotationAllData,
  deleteLocalTranspotationData,
} from '../redux/slice/totalLocalTranspotationSlice';
import { setHotelAllData, deleteHotelData } from '../redux/slice/totalHotelSlice';
import { setFoodAllData, deleteFoodData } from '../redux/slice/totalFoodSlice';
import { setAirFreightlAllData, deleteLogisticsData } from '../redux/slice/totalAirFreightSlice';
import { setEnergyAllData, deleteEnergyData } from '../redux/slice/totalEnergyUpdatedSlice';
import { setDigitalCommsAllData, deleteData } from '../redux/slice/totalDigitalContSlice';
import { setProductionAllData, deleteProductionData } from '../redux/slice/totalProductionSlice';
import { setDigitalCampaignAllData, deleteCampaignData } from '../redux/slice/totalDigitalCampaignSlice';
import { setWasteAllData, deleteWasteData } from '../redux/slice/totalWasteSlice';
import { setVirtualEventAllData, deleteVirtualEventData } from '../redux/slice/totalVirtualEventSlice';
import { setCommsAllData, deleteCommsData } from '../redux/slice/totalCommsSlice';
import { setPrAgencyAllData, deletePrAgencyData } from '../redux/slice/totalPrAgencySlice';
import { setHospitalityAllData, deleteHospitalityData } from '../redux/slice/totalHospitalitySlice';
import { setToolFormAllData, clearToolData, clearToolFormData } from '../redux/slice/toolSlice';
import {
  setResultTableAllData,
  deleteResultTableAllData,
  deleteResTabAirTravelData,
  deleteResTabLocalTransData,
  deleteResTabFBData,
  deleteResTabLogisticsData,
  deleteResTabProductionData,
  deleteResTabEnergyData,
  deleteResTableDigitalContData,
  deleteResTabWasteData,
  deleteResTabHotelData,
  deleteResTabDgCampaignData,
  deleteResTabVrtEventData,
  deleteResTabCommsData,
  deleteResTabHospitalityData,
  deleteResTabPrAgencyData,
  deleteCommsCatogorywiseEmission,
  deletePrAgencyCatogorywiseEmission,
  deleteHospitalityCatogorywiseEmission,
  deleteprEventEmissionCatogorywise,
} from '../redux/slice/resultTableDataSlice';
import VirtualEvent from '../pages/virtualEvent/VirtualEvent';
import { deleteImageData, setImageAllData } from '../redux/slice/imageSlice';
import { deleteVideoData, setVideoAllData } from '../redux/slice/videoSlice';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const useSetEventData = () => {
  const dispatch = useDispatch();


  const setParticularEventFetchedData = (currentEventData) => {
    console.log(currentEventData , "currentEventData");
    const userSessionData = sessionStorage.getItem('user');
    const userData = JSON.parse(userSessionData);

    const resAirTravelAllData = currentEventData?.airTravelAllData;
    const resLocalTranspotationAllData = currentEventData?.localTranspotationAllData;
    const resHotelAllData = currentEventData?.hotelAllData;
    const resFoodAllData = currentEventData?.foodAllData;
    const resAirFreightAllData = currentEventData?.airFreightAllData;
    const resProductionAllData = currentEventData?.productionAllData;
    const resEnergyAllData = currentEventData?.energyAllData;
    const resDigitalCommsAllData = currentEventData?.digitalCommsAllData;
    const resWasteAllData = currentEventData?.wasteAllData;
    const resVirtualEventAllData = currentEventData?.vitrualEventAllData;
    const resCommsAllData = currentEventData?.commsAllData;
    const resPrAgencyAllData = currentEventData?.prAgencyAllData;
    const resHospitalityAllData = currentEventData?.hospitalityAllData;
    const resDigitalCampaignAllData = currentEventData?.digitalCampaignAllData;
    const resImageAllData = currentEventData?.imageAllData;
    const resVideoAllData = currentEventData?.videoAllData;
    const resResultTableAllData = {
      eventDataId: currentEventData?._id,
      isLoading: false,
      error: '',
      data: [
        {
          from: 'f2fEvent',
          // allDataOfTab: [currentEventData?.f2fEventData],
          allDataOfTab: currentEventData?.f2fEventData,
        },
        {
          from: 'prEvent',
          // allDataOfTab: [currentEventData?.prEventData]
          allDataOfTab: currentEventData?.prEventData,
        },
        {
          from: 'virtualEvent',
          // allDataOfTab: [currentEventData?.virtualEventData]
          allDataOfTab: currentEventData?.virtualEventData,
        },
        {
          from: 'digitalCampaign',
          // allDataOfTab: [currentEventData?.digitalCampaignData]
          allDataOfTab: currentEventData?.digitalCampaignData,
        },
      ],
      // data: {
      //     data: [
      //         {
      //             from: "f2fEvent",
      //             allDataOfTab: [currentEventData?.f2fEventData],
      //         },
      //         {
      //             from: "prEvent",
      //             allDataOfTab: [currentEventData?.prEventData]
      //         },
      //         {
      //             from: "virtualEvent",
      //             allDataOfTab: [currentEventData?.virtualEventData]
      //         },
      //         {
      //             from: "digitalCampaign",
      //             allDataOfTab: [currentEventData?.digitalCampaignData]
      //         }
      //     ]
      // },
      // userAllEventsData: [],               // fetchAllEventsData
      // prEventEmissionDataCategorywise: [
      //     {
      //         "catgName": "Email Invitations",
      //         "emission": 2470382.54
      //     },
      //     {
      //         "catgName": "PR Assets",
      //         "emission": 0
      //     }
      // ]
    };

    const resToolFormData = {
      type: 'toolForm',
      name: userData?.cnctPerson,
      email: userData?.loginId,
      activityName: currentEventData?.activityName,
      country: currentEventData?.country,
      budget: currentEventData?.budget,
      actionChoice: 'retrieve',
      // dateTime: dayjs(currentEventData?.dateTime).format('YYYY-MM-DD') || '',
      dateTime: currentEventData?.dateTime || null,
      // dateTime: dayjs(currentEventData?.dateTime).format('MM/DD/YYYY hh:mm') || null,
      isValidData: true,
      isDirtyData: false,
      previousEvent: {
        value: `${currentEventData?._id}`,
        label: `${currentEventData?.activityName} - ${currentEventData?.dateTime}`,
      },
      isSubmited: true,
    };

    // Dispatch the action to set the data in slices
    dispatch(setAirTravelAllData(resAirTravelAllData));
    dispatch(setLocalTranspotationAllData(resLocalTranspotationAllData));
    dispatch(setHotelAllData(resHotelAllData));
    dispatch(setFoodAllData(resFoodAllData));
    dispatch(setAirFreightlAllData(resAirFreightAllData));
    dispatch(setProductionAllData(resProductionAllData));
    dispatch(setEnergyAllData(resEnergyAllData));
    dispatch(setDigitalCommsAllData(resDigitalCommsAllData));
    dispatch(setWasteAllData(resWasteAllData));
    dispatch(setVirtualEventAllData(resVirtualEventAllData));
    dispatch(setCommsAllData(resCommsAllData));
    dispatch(setPrAgencyAllData(resPrAgencyAllData));
    dispatch(setHospitalityAllData(resHospitalityAllData));
    dispatch(setDigitalCampaignAllData(resDigitalCampaignAllData));
    dispatch(setDigitalCampaignAllData(resDigitalCampaignAllData));
    dispatch(setToolFormAllData([resToolFormData]));
    dispatch(setResultTableAllData(resResultTableAllData));
    dispatch(setImageAllData(resImageAllData));
    dispatch(setVideoAllData(resVideoAllData));
  };

  // clear all slice
  const handleDeleteAllData = () => {
    // dispatch(clearToolFormData());
    dispatch(clearToolData());
    dispatch(deleteResultTableAllData());
    dispatch(deleteResTabAirTravelData());
    dispatch(deleteResTabLocalTransData());
    dispatch(deleteResTabFBData());
    dispatch(deleteResTabLogisticsData());
    dispatch(deleteResTabProductionData());
    dispatch(deleteResTabEnergyData());
    dispatch(deleteResTableDigitalContData());
    dispatch(deleteResTabWasteData());
    dispatch(deleteResTabHotelData());
    dispatch(deleteResTabDgCampaignData());
    dispatch(deleteResTabVrtEventData());
    dispatch(deleteResTabCommsData());
    dispatch(deleteResTabHospitalityData());
    dispatch(deleteResTabPrAgencyData());
    dispatch(deleteCommsCatogorywiseEmission());
    dispatch(deletePrAgencyCatogorywiseEmission());
    dispatch(deleteHospitalityCatogorywiseEmission());
    dispatch(deleteprEventEmissionCatogorywise());
    // dispatch(setResultTableAllData());
    dispatch(deleteAirTravelData()); // updated
    dispatch(deleteLocalTranspotationData());
    dispatch(deleteHotelData());
    dispatch(deleteFoodData());
    dispatch(deleteLogisticsData());
    dispatch(deleteEnergyData());
    dispatch(deleteData());
    dispatch(deleteProductionData());
    dispatch(deleteCampaignData());
    dispatch(deleteWasteData());
    dispatch(deleteVirtualEventData());
    dispatch(deleteCommsData());
    dispatch(deletePrAgencyData());
    dispatch(deleteHospitalityData());
    dispatch(deleteImageData());
    dispatch(deleteVideoData());
  };

  return {
    setParticularEventFetchedData,
    handleDeleteAllData,
  };
};

export default useSetEventData;
