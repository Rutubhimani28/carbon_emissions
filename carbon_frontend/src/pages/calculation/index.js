import { Box, Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import DigitalContent from './digitalContent';
import Result from './result';
import AirFreight from './airFreight';
import digital from '../../assets/Digital.png'
import Accommodation from '../../assets/Accommodation.png'
import Energy from '../../assets/Energy.png'
import Food from '../../assets/Food & Beverage.png'
import Logistics from '../../assets/Logistics.png'
import Transportation from '../../assets/Transportation.png'
import Travel from '../../assets/Travel.png'
import Waste from '../../assets/Waste.png'
import production from '../../assets/production.png'
import result from '../../assets/result.png'
import EnergyUpdated from './energyUpdated';

const Calculation = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <Container maxWidth>
                <Box sx={{ maxWidth: { xs: 320, sm: 480, md: 1300 }, }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab icon={<img src={production} alt='' width={35} />} label="Production" />
                        <Tab icon={<img src={Travel} alt='' width={35} />} label="Air Freight" />
                        <Tab icon={<img src={Food} alt='' width={35} />} label="Food" />
                        <Tab icon={<img src={Energy} alt='' width={35} />} label="Energy Updated" />
                        <Tab icon={<img src={Travel} alt='' width={35} />} label="Travel" />
                        <Tab icon={<img src={digital} alt='' width={35} />} label="Digital Content" />
                        <Tab icon={<img src={Transportation} alt='' width={35} />} label="Local Transportation" />
                        <Tab icon={<img src={Accommodation} alt='' width={35} />} label="Accomodation" />
                        <Tab icon={<img src={Waste} alt='' width={35} />} label="Waste" />
                        <Tab icon={<img src={result} alt='' width={35} />} label="Result" />
                    </Tabs>
                </Box>
                <Box mt={2}>
                    {value === 1 && <AirFreight />}
                    {value === 3 && <EnergyUpdated />}
                    {value === 5 && <DigitalContent />}
                    {value === 9 && <Result />}
                </Box>
            </Container>
        </div>
    )
}

export default Calculation
