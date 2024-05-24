import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Actionbutton from '../../components/Actionbutton';
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';
import DeleteModel from '../../components/Deletemodle';
import Header from '../../components/Header';
import { apidelete, apiget } from '../../service/api';
import AddUser from './Add';
import EditUser from './Edit';
import Other from './Other';
import Overview from './Overview';

const View = () => {

    const [userDetails, setUserDetails] = useState({});
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [value, setValue] = useState(0);
    const navigate = useNavigate()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const userdata = JSON.parse(sessionStorage.getItem('user'));

    // open add model
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    // open Edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    const back = () => {
        navigate('/dashboard/user')
    }

    const fetchdata = async () => {
        setIsLoading(true)
        try {
            const result = await apiget(`user/view/${params.id}`);
            if (result && result.status === 200) {
                setUserDetails(result.data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
        setIsLoading(false)
    };


    // delete api
    const deletedata = async () => {
        await apidelete(`user/delete/${params.id}`)
        navigate('/dashboard/user')
    }

    useEffect(() => {
        fetchdata();
    }, [])

    return (
        <div>

            {/* Add User Model */}
            <AddUser open={openAdd} handleClose={handleCloseAdd} />

            {/* Edit User Model */}
            <EditUser open={openEdit} emailEdit={!(location.state === null || (location.state && location.state.addButton !== false))} handleClose={handleCloseEdit} userDetails={userDetails} fetchUser={fetchdata} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container maxWidth>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title={!isLoading ? `${userDetails?.firstName} ${userDetails?.lastName}` : "Loading..."}
                            subtitle="Profile Details"
                        />
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {/* Action Butoon */}
                            {userdata.role === "admin" ?
                                <Actionbutton
                                    handleOpen={location.state === null || (location.state && location.state.addButton !== false) ? handleOpenAdd : null}
                                    handleOpenEdit={handleOpenEdit}
                                    handleOpenDelete={handleOpenDelete}
                                    back={back}
                                />
                                :
                                <Actionbutton
                                    handleOpenEdit={handleOpenEdit}
                                    handleOpenDelete={handleOpenDelete}
                                    back={back}
                                />
                            }
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
                        <Overview data={userDetails} isLoading={isLoading} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Other data={userDetails} isLoading={isLoading} />
                    </CustomTabPanel>
                </Box>
            </Container>
        </div>
    )
}

export default View
