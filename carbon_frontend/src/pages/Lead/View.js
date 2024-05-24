import { Box, Container, Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Actionbutton from '../../components/Actionbutton';
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';
import DeleteModel from '../../components/Deletemodle';
import Header from '../../components/Header';
import Calls from '../../components/call/Call';
import Emails from '../../components/email/Email';
import Meetings from '../../components/meeting/Meeting';
import Notes from '../../components/note/Note';
import Tasks from '../../components/task/Task';
import { apidelete, apiget } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import AddLead from './Add';
import EditModel from './Edit';
import Moreinformation from './Moreinformation';
import Other from './Other';
import Overview from './Overview';

const View = () => {
    const [leadData, setLeadData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [isVisibleNotes, setIsVisibleNotes] = useState(false);
    const [isVisibleCall, setIsVisibleCall] = useState(false);
    const [isVisibleMeetings, setIsVisibleMeetings] = useState(false);
    const [isVisibleEmail, setIsVisibleEmail] = useState(false);
    const [isVisibleTask, setIsVisibleTask] = useState(false);

    const params = useParams()
    const navigate = useNavigate()

    // open add model
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    // open edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    // toggleButtons
    const toggleVisibilityNotes = () => setIsVisibleNotes(!isVisibleNotes);
    const toggleVisibilityCall = () => setIsVisibleCall(!isVisibleCall);
    const toggleVisibilityMeeting = () => setIsVisibleMeetings(!isVisibleMeetings);
    const toggleVisibilityEmail = () => setIsVisibleEmail(!isVisibleEmail);
    const toggleVisibilityTask = () => setIsVisibleTask(!isVisibleTask);

    const back = () => {
        navigate('/dashboard/lead')
    }

    // fetch api
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const result = await apiget(`lead/view/${params.id}`);
            if (result && result.status === 200) {
                setLeadData(result?.data?.lead);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false)
    };

    // delete api
    const deletedata = async () => {
        await apidelete(`lead/delete/${params.id}`)
        navigate('/dashboard/lead')
    }

    useEffect(() => {
        if (params.id) {
            fetchData();
        }
    }, [userAction])

    const csvColumns = [
        { Header: "Title", accessor: 'title' },
        { Header: "First Name", accessor: 'firstName' },
        { Header: "Last Name", accessor: 'lastName' },
        { Header: "Gender", accessor: 'gender' },
        { Header: "Phone Number", accessor: 'phoneNumber' },
        { Header: "Email Address", accessor: 'emailAddress' },
        { Header: "Date Of Birth", accessor: 'dateOfBirth', type: 'dobDate' },
        { Header: "Address", accessor: 'address' },
        { Header: "Lead Source", accessor: 'leadSource' },
        { Header: "Lead Score", accessor: 'leadScore' },
        { Header: "Lead Status", accessor: 'leadStatus' },
        { Header: "Assigned Agent", accessor: 'assignedUser' },
        { Header: "Instagram Profile", accessor: 'instagramProfile' },
        { Header: "Twitter Profile", accessor: 'twitterProfile' },
        { Header: "Alternate Phone Number", accessor: 'alternatePhoneNumber' },
        { Header: "Additional Email Address", accessor: 'additionalEmailAddress' },
        { Header: "Types Of Insurance", accessor: 'typeOfInsurance' },
        { Header: "Specifice Policy Feature Or Add-ons Requested", accessor: 'specificPolicyFeatures' },
        { Header: "Desired Coverage Amount", accessor: 'desiredCoverageAmount' },
        { Header: "Qualification Status", accessor: 'QualificationStatus' },
        { Header: "Policy Types", accessor: 'policyType' },
        { Header: "Policy Number", accessor: 'policyNumber' },
        { Header: "Start Date", accessor: 'startDate', type: 'date' },
        { Header: "End Date", accessor: 'endDate', type: 'date' },
        { Header: "Coverage Amount", accessor: 'coverageAmount' },
        { Header: "Tearm Length", accessor: 'termLength' },
        { Header: "Conversion Date & Time", accessor: 'conversionDateTime', type: 'date' },
        { Header: "Lead category or segment", accessor: 'leadCategory' },
        { Header: "Create Date", accessor: 'createdOn', type: 'date' },
    ];
    const formatDate = (dateString, type) => {
        if (type === "date") {
            return dateString && moment(dateString).format('DD/MM/YYYY HH:MM A')
        }
        return dateString && moment(dateString).format('DD/MM/YYYY')

    };

    const downloadCsvOrExcel = async (extension) => {
        const selectedFieldsData = {};
        csvColumns.forEach((item) => {
            if (item.type === 'date') {
                selectedFieldsData[item.accessor] = formatDate(leadData[item.accessor], item?.type);
            } else {
                selectedFieldsData[item.accessor] = leadData[item.accessor];
            }
        });

        const jsonArray = [selectedFieldsData];

        commonUtils.convertJsonToCsvOrExcel({ jsonArray, csvColumns, fileName: "Lead", extension });
    };
    const handleExportLead = (extension) => {
        downloadCsvOrExcel(extension);
    };
    return (
        <div>
            {/* Add Lead Model */}
            <AddLead open={openAdd} handleClose={handleCloseAdd} />

            {/* Add Edit Model */}
            <EditModel open={openEdit} handleClose={handleCloseEdit} leadData={leadData} setUserAction={setUserAction} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container maxWidth>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title={!isLoading ? `${leadData?.title} ${leadData?.firstName} ${leadData?.lastName}` : "Loading..."}
                            subtitle="Lead"
                        />
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {/* Action Butoon */}
                            <Actionbutton
                                handleOpen={handleOpenAdd}
                                handleOpenEdit={handleOpenEdit}
                                handleOpenDelete={handleOpenDelete}
                                handleExport={() => handleExportLead('xlsx')}
                                back={back}
                            />
                        </Stack>
                    </Stack>
                </Grid>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "0px", overflowX: "auto" }}>
                        <Tabs value={value} onChange={handleChange} style={{ overflowX: "auto" }}>
                            <Tab label="OVERVIEW" {...a11yProps(0)} />
                            <Tab label="MORE INFORMATION" {...a11yProps(1)} />
                            <Tab label="OTHER" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Overview data={leadData} setUserAction={setUserAction} isLoading={isLoading} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Moreinformation data={leadData} isLoading={isLoading} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Other data={leadData} isLoading={isLoading} />
                    </CustomTabPanel>
                </Box>

                {/* Notes Table */}
                <Card sx={{ marginTop: "50px" }}>
                    <Notes toggleVisibilityNotes={toggleVisibilityNotes} isVisibleNotes={isVisibleNotes} setUserAction={setUserAction} rows={leadData?.notes} _id={params.id} method="lead" />
                </Card>

                {/* Tasks Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Tasks toggleVisibilityTask={toggleVisibilityTask} isVisibleTask={isVisibleTask} setUserAction={setUserAction} rows={leadData?.tasks} data={leadData} _id={params.id} type={"lead"} />
                </Card>

                {/* Meetings Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Meetings toggleVisibilityMeeting={toggleVisibilityMeeting} isVisibleMeetings={isVisibleMeetings} setUserAction={setUserAction} rows={leadData?.meetings} _id={params.id} data={leadData} type={"lead"} />
                </Card>

                {/* Calls Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Calls toggleVisibilityCall={toggleVisibilityCall} isVisibleCall={isVisibleCall} setUserAction={setUserAction} rows={leadData?.calls} _id={params.id} type={"lead"} />
                </Card>

                {/* Emails Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Emails toggleVisibilityEmail={toggleVisibilityEmail} isVisibleEmail={isVisibleEmail} setUserAction={setUserAction} rows={leadData?.emails} _id={params.id} data={leadData} module={"Lead"} />
                </Card>

            </Container>

        </div>
    )
}

export default View
