import { Box, Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import VirtualEvent from './VirtualEvent';
import Result from './result';
import virtualEventImg from '../../layouts/user/assets/images/virtualEvent.png';
import outboundIcon from '../../assets/outboundIcon.png';
import result from '../../assets/result.png';

const VirtualEventCalculation = () => {

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
                        {/* <Tab icon={<img src={virtualEventImg} alt='' width={60} className='tabImgZoomIn tabImgWhite' />} label="Virtual Event" className='tab-text' /> */}
                        <Tab icon={<img src={outboundIcon} alt='' width={42} className='tabImgZoomIn tabImgWhite' />} label="Outbound Marketing" className='tab-text' />
                        <Tab icon={<img src={result} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Summary" className='tab-text' />
                    </Tabs>
                </Box>
                <Box my={2} pb={2}>
                    {value === 0 && <VirtualEvent setValue={setValue} value={value} />}
                    {value === 1 && <Result setValue={setValue} value={value} />}
                </Box>
            </Container>
        </div>
    )
}

export default VirtualEventCalculation
