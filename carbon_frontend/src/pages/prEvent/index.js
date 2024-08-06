import { Box, Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Comms from './comms';
import Hospitality from './hospitality';
import PrAgency from './prAgency';
import Result from './result';
import hospitalityImg from '../../assets/Accommodation.png';
import prAgencyImg from '../../assets/Transportation.png';
import commsImg from '../../assets/Travel.png';
import result from '../../assets/result.png';

const PrEventCalculation = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Container maxWidth className="custom-outer-bg tab-fixed mt-2">
                <Box className="tab-outer">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab icon={<img src={commsImg} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Comms" className='tab-text' />
                        <Tab icon={<img src={prAgencyImg} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="PR Agency" className='tab-text' />
                        <Tab icon={<img src={hospitalityImg} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Hospitality" className='tab-text' />
                        <Tab icon={<img src={result} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Summary" className='tab-text' />
                    </Tabs>
                </Box>
                <Box my={2} pb={2}>
                    {value === 0 && <Comms setValue={setValue} value={value} />}
                    {value === 1 && <PrAgency setValue={setValue} value={value} />}
                    {value === 2 && <Hospitality setValue={setValue} value={value} />}
                    {value === 3 && <Result setValue={setValue} value={value} />}
                </Box>
            </Container>
        </div>
    )
}

export default PrEventCalculation
