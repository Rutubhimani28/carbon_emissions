import { useState } from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';
import VirtualEvent from './virtualEvent';
// import Result from './result';
import result from '../../assets/result.png';
import virtualEventImg from '../../assets/Travel.png';

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
                        <Tab icon={<img src={virtualEventImg} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Virtual Event" className='tab-text' />
                        <Tab icon={<img src={result} alt='' width={35} className='tabImgZoomIn tabImgWhite' />} label="Summary" className='tab-text' />
                    </Tabs>
                </Box>
                <Box my={2} pb={2}>
                    {value === 0 && <VirtualEvent setValue={setValue} value={value} />}
                    {/* {value === 1 && <Result setValue={setValue} value={value} />} */}
                </Box>
            </Container>
        </div>
    )
}

export default VirtualEventCalculation
