import { useEffect, useState } from 'react';
import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';
import Header from '../../components/Header';
import { apiget } from '../../service/api';
import Other from './Other';
import Overview from './Overview';
import Actionbutton from '../../components/Actionbutton';

const View = () => {

    const [paymentDetails, setPaymentDetails] = useState({});
    const [openAdd, setOpenAdd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [value, setValue] = useState(0);
    const navigate = useNavigate()
    const params = useParams()

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    const back = () => {
        navigate('/dashboard/payment')
    }

    // fetch api
    const fetchdata = async () => {
        setIsLoading(true)
        try {
            const result = await apiget(`payment/view/${params.id}`);
            if (result && result.status === 200) {
                setPaymentDetails(result?.data?.paymentData);
            }
        } catch (error) {
            console.error("Error fetching SMS data:", error);
        }
        setIsLoading(false)
    };

    useEffect(() => {
        fetchdata();
    }, [openAdd])

    return (
        <div>
            <Container maxWidth>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title={!isLoading ? `${paymentDetails?.firstName} ${paymentDetails?.lastName}` : "Loading..."}
                            subtitle="Payment Details"
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
                        <Overview data={paymentDetails} isLoading={isLoading} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Other data={paymentDetails} isLoading={isLoading} />
                    </CustomTabPanel>
                </Box>
            </Container>
        </div>
    )
}

export default View
