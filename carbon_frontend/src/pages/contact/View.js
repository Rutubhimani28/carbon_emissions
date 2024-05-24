import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import Card from '@mui/material/Card';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Actionbutton from '../../components/Actionbutton';
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';
import DeleteModel from '../../components/Deletemodle';
import Header from '../../components/Header';
import Calls from '../../components/call/Call';
import Claim from '../../components/claim/Claim';
import Emails from '../../components/email/Email';
import Meetings from '../../components/meeting/Meeting';
import Notes from '../../components/note/Note';
import Task from '../../components/task/Task';
import { apidelete, apiget } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import AddContact from './Add';
import EditContact from './Edit';
import Lead from './Lead';
import Moreinformation from './Moreinformation';
import Other from './Other';
import Overview from './Overview';
import Policy from './Policy';

const View = () => {
    const [contactData, setContactData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [value, setValue] = useState(0);
    const [isVisibleLead, setIsVisibleLead] = useState(false);
    const [isVisibleClaim, setIsVisibleClaim] = useState(false);
    const [isVisiblePolicy, setIsVisiblePolicy] = useState(false);
    const [isVisibleEvent, setIsVisibleEvent] = useState(false)
    const [isVisibleNotes, setIsVisibleNotes] = useState(false);
    const [isVisibleCall, setIsVisibleCall] = useState(false);
    const [isVisibleMeetings, setIsVisibleMeetings] = useState(false);
    const [isVisibleEmail, setIsVisibleEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()

    // open add model
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // open Edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    // toggleButton
    const toggleVisibilityLead = () => setIsVisibleLead(!isVisibleLead);
    const toggleVisibilityEvent = () => setIsVisibleEvent(!isVisibleEvent)
    const toggleVisibilityClaim = () => setIsVisibleClaim(!isVisibleClaim);
    const toggleVisibilityPolicy = () => setIsVisiblePolicy(!isVisiblePolicy);
    const toggleVisibilityNotes = () => setIsVisibleNotes(!isVisibleNotes);
    const toggleVisibilityCall = () => setIsVisibleCall(!isVisibleCall);
    const toggleVisibilityMeeting = () => setIsVisibleMeetings(!isVisibleMeetings);
    const toggleVisibilityEmail = () => setIsVisibleEmail(!isVisibleEmail);



    const back = () => {
        navigate('/dashboard/contact')
    }


    // fetch api
    const fetchData = async () => {
        setIsLoading(true)
        try {
            if (params?.id) {
                const result = await apiget(`contact/view/${params.id}`);
                if (result && result.status === 200) {
                    setContactData(result?.data);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false)
    };

    // delete api
    const deletedata = async () => {
        await apidelete(`contact/delete/${params.id}`)
        navigate('/dashboard/contact')
    }



    const csvColumns = [
        { Header: "First Name", accessor: 'firstName' },
        { Header: "Last Name", accessor: 'lastName' },
        { Header: "Gender", accessor: 'gender' },
        { Header: "Phone Number", accessor: 'phoneNumber' },
        { Header: "Email Address", accessor: 'emailAddress' },
        { Header: "Date Of Birth", accessor: 'dateOfBirth', type: 'dobDate' },
        { Header: "Address", accessor: 'address' },
        { Header: "Assigned Agent", accessor: 'assignedUser' },
        { Header: "Alternate Phone Number", accessor: 'alternatePhoneNumber' },
        { Header: "Additional Email", accessor: 'additionalEmailAddress' },
        { Header: "Instagram Profile", accessor: 'instagramProfile' },
        { Header: "Twitter Profile", accessor: 'twitterProfile' },
        { Header: "Preferred Contact Method", accessor: 'preferredContactMethod' },
        { Header: "Referral source (if applicable)", accessor: 'referralSource' },
        { Header: "Referral Contact Name", accessor: 'referralContactName' },
        { Header: "Relationship to Referrer", accessor: 'relationshipToReferrer' },
        { Header: "Preferences For Marketing Communications", accessor: 'preferencesForMarketingCommunications' },
        { Header: "Preferred Language For Communication", accessor: 'preferredLanguage' },
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
                selectedFieldsData[item.accessor] = formatDate(contactData[item.accessor], item?.type);
            } else {
                selectedFieldsData[item.accessor] = contactData[item.accessor];
            }
        });

        const jsonArray = [selectedFieldsData];

        commonUtils.convertJsonToCsvOrExcel({ jsonArray, csvColumns, fileName: "Contact", extension });
    };

    const handleExport = (extension) => {
        downloadCsvOrExcel(extension);
    };

    useEffect(() => {
        fetchData();
    }, [userAction])

    return (
        <div>
            {/* Add Contact Model */}
            <AddContact open={open} handleClose={handleClose} />

            {/* Add Edit Model */}
            <EditContact open={openEdit} handleClose={handleCloseEdit} contactData={contactData} setUserAction={setUserAction} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container maxWidth>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title={!isLoading ? `${contactData?.firstName} ${contactData?.lastName}` : "Loading..."}
                            subtitle="Contact Details"
                        />
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {/* Action Butoon */}
                            <Actionbutton
                                handleOpen={handleOpen}
                                handleOpenEdit={handleOpenEdit}
                                handleOpenDelete={handleOpenDelete}
                                handleExport={() => handleExport('xlsx')}
                                back={back}
                            />
                        </Stack>
                    </Stack>
                </Grid>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "0px" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="OVERVIEW" {...a11yProps(0)} />
                            <Tab label="MORE INFORMATION" {...a11yProps(1)} />
                            <Tab label="OTHER" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Overview data={contactData} setUserAction={setUserAction} isLoading={isLoading} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Moreinformation data={contactData} isLoading={isLoading} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Other data={contactData} isLoading={isLoading} />
                    </CustomTabPanel>
                </Box>


                {/* Policy Table */}
                <Card sx={{ marginTop: "50px" }}>
                    <Policy toggleVisibilityPolicy={toggleVisibilityPolicy} isVisiblePolicy={isVisiblePolicy} rows={contactData?.policies} setUserAction={setUserAction} _id={params.id} />
                </Card>

                {/* Claim Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Claim toggleVisibilityClaim={toggleVisibilityClaim} isVisibleClaim={isVisibleClaim} rows={contactData?.claims} setUserAction={setUserAction} _id={params.id} />
                </Card>

                {/* Lead Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Lead toggleVisibilityLead={toggleVisibilityLead} isVisibleLead={isVisibleLead} rows={contactData?.leads} setUserAction={setUserAction} _id={params.id} />
                </Card>


                {/* Notes Table */}
                <Card sx={{ marginTop: "50px" }}>
                    <Notes toggleVisibilityNotes={toggleVisibilityNotes} isVisibleNotes={isVisibleNotes} rows={contactData?.notes} setUserAction={setUserAction} _id={params.id} />
                </Card>

                {/* Task Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Task toggleVisibilityTask={toggleVisibilityEvent} isVisibleTask={isVisibleEvent} rows={contactData?.tasks} setUserAction={setUserAction} _id={params.id} type={"contact"} />
                </Card>

                {/* Meetings Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Meetings toggleVisibilityMeeting={toggleVisibilityMeeting} isVisibleMeetings={isVisibleMeetings} rows={contactData?.meetings} setUserAction={setUserAction} _id={params.id} data={contactData} type={"contact"} />
                </Card>

                {/* Calls Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Calls toggleVisibilityCall={toggleVisibilityCall} isVisibleCall={isVisibleCall} rows={contactData?.calls} setUserAction={setUserAction} _id={params.id} type={"contact"} />
                </Card>

                {/* Emails Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Emails toggleVisibilityEmail={toggleVisibilityEmail} isVisibleEmail={isVisibleEmail} rows={contactData?.emails} setUserAction={setUserAction} _id={params.id} data={contactData} module={"Contact"} />
                </Card>
            </Container>


        </div>
    )
}

export default View
