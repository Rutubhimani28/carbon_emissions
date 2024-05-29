import { Box, Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import EventExecutionAgency from './EventExecutionAgency';
import EventVenue from './EventVenue';

const Events = () => {

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
                        <Tab label="Event Venue" />
                        <Tab label="Event Execution Agency" />
                    </Tabs>
                </Box>
                <Box mt={2}>
                    {value === 0 && <EventVenue />}
                    {value === 1 && <EventExecutionAgency />}
                </Box>
            </Container>
        </div>
    );
}

export default Events