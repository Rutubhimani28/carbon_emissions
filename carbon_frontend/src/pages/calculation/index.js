import { Box, Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import DigitalContent from './digitalContent';
import Result from './result';

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
                        <Tab label="Production" />
                        <Tab label="Air Freight" />
                        <Tab label="Food" />
                        <Tab label="Energy Updated" />
                        <Tab label="Travel" />
                        <Tab label="Digital Content" />
                        <Tab label="Local Transportation" />
                        <Tab label="Accomodation" />
                        <Tab label="Waste" />
                        <Tab label="Result" />
                    </Tabs>
                </Box>
                <Box mt={2}>
                    {value === 5 && <DigitalContent />}
                    {value === 9 && <Result />}
                </Box>
            </Container>
        </div>
    )
}

export default Calculation
