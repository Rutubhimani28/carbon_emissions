import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Actionbutton from '../../components/Actionbutton';
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';
import Header from '../../components/Header';
import { apiget } from '../../service/api';
import Other from './Other';
import Overview from './Overview';

const View = () => {
    const [smsData, setSmsData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams()
    const navigate = useNavigate()

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    const back = () => {
        navigate('/dashboard/sms')
    }

    // fetch api
    const fetchSmsdata = async () => {
        setIsLoading(true)
        try {
            const result = await apiget(`sms/view/${params.id}`);
            if (result && result.status === 200) {
                setSmsData(result?.data?.sms[0]);
            }
        } catch (error) {
            console.error("Error fetching SMS data:", error);
        }
        setIsLoading(false)
    };

    useEffect(() => {
        fetchSmsdata();
    }, [userAction])

    return (
        <div>
            <Container maxWidth>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title="SMS Details"
                        />
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            <Actionbutton
                                back={back}
                            />
                        </Stack>
                    </Stack>
                </Grid>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "0px" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="OVERVIEW" {...a11yProps(0)} />
                            <Tab label="OTHER" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Overview data={smsData} setUserAction={setUserAction} isLoading={isLoading} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Other data={smsData} isLoading={isLoading} />
                    </CustomTabPanel>
                </Box>

            </Container>
        </div>
    )
}

export default View
