import { Box, Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import DigitalContent from './digitalContent';
import Result from './result';
import AirFreight from './airFreight';
import digital from '../../assets/Digital.png'
import Accommodation from '../../assets/Accommodation.png'
import Energy from '../../assets/Energy.png'
import food from '../../assets/Food & Beverage.png'
import Logistics from '../../assets/Logistics.png'
import Transportation from '../../assets/Transportation.png'
import AirTravel from '../../assets/Travel.png'
import waste from '../../assets/Waste.png'
import production from '../../assets/production.png'
import result from '../../assets/result.png'
import Production from './production';
import EnergyUpdated from './energyUpdated';
import Food from './food'
import Waste from './waste';
import LocalTranspotation from './localTranspotation';
import AirTravelComp from './airTravel';
import Hotel from './hotel';
import banner from '../../layouts/user/assets/images/home_banner.jpg';

const Calculation = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <Container maxWidth className="custom-outer-bg tab-fixed">
                <Box  className="tab-outer">
                    {/* <img src={banner} alt="top_img" width="100%" style={{ marginLeft: 'auto', marginRight: 'auto' }} /> */}
                    {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={banner} alt="top_img" width="100%" />
                    </div> */}
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab icon={<img src={AirTravel} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Air Travel" className='tab-text' />
                        <Tab icon={<img src={Transportation} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Local Transportation" className='tab-text' />
                        <Tab icon={<img src={Accommodation} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Hotel" className='tab-text' />
                        <Tab icon={<img src={food} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Food" className='tab-text' />
                        <Tab icon={<img src={Logistics} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Logistics" className='tab-text' />
                        <Tab icon={<img src={production} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Event Production" className='tab-text' />
                        <Tab icon={<img src={Energy} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Energy" className='tab-text' />
                        <Tab icon={<img src={digital} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Digital" className='tab-text' />
                        <Tab icon={<img src={waste} alt='' width={35} color="red" className='tabImgZoomIn tabImgWhite' />} label="Waste" className='tab-text' />
                        <Tab icon={<img src={result} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Summary" className='tab-text' />
                    </Tabs>
                </Box>
                <Box my={2} pb={2}>
                    {value === 0 && <AirTravelComp setValue={setValue} value={value} />}
                    {value === 1 && <LocalTranspotation setValue={setValue} value={value} />}
                    {value === 2 && <Hotel setValue={setValue} value={value} />}
                    {value === 3 && <Food setValue={setValue} value={value} />}
                    {value === 4 && <AirFreight setValue={setValue} value={value} />}
                    {value === 5 && <Production setValue={setValue} value={value} />}
                    {value === 6 && <EnergyUpdated setValue={setValue} value={value} />}
                    {value === 7 && <DigitalContent setValue={setValue} value={value} />}
                    {value === 8 && <Waste setValue={setValue} value={value} />}
                    {value === 9 && <Result setValue={setValue} value={value} />}
                </Box>
            </Container>
        </div>
    )
}

export default Calculation
