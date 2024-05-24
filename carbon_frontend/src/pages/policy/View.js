import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material';
import Card from '@mui/material/Card';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Actionbutton from '../../components/Actionbutton';
import { commonUtils } from '../../utils/utils';
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';
import DeleteModel from '../../components/Deletemodle';
import Header from '../../components/Header';
import Claim from '../../components/claim/Claim';
import Notes from '../../components/note/Note';
import { apidelete, apiget } from '../../service/api';
import AddModel from './Add';
import EditModel from './Edit';
import Moreinformation from './Moreinformation';
import Other from './Other';
import Overview from './Overview';
import PolicyDocuments from './policyDocument/policyDocuments';

const View = () => {

    const [policyData, setPolicyData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [value, setValue] = useState(0);
    const [isVisibleClaim, setIsVisibleClaim] = useState(false);
    const [isVisibleNotes, setIsVisibleNotes] = useState(false);
    const [isVisiblePolicyDoc, setIsVisiblePolicyDoc] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams()
    const navigate = useNavigate()

    // open add model
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    // open add model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    // toggleButton
    const toggleVisibilityClaim = () => setIsVisibleClaim(!isVisibleClaim);
    const toggleVisibilityNotes = () => setIsVisibleNotes(!isVisibleNotes);
    const toggleVisibilityPolicyDoc = () => setIsVisiblePolicyDoc(!isVisiblePolicyDoc);

    const back = () => {
        navigate('/dashboard/policy')
    }


    // fetch api
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const result = await apiget(`policy/view/${params.id}`);
            if (result && result.status === 200) {
                setPolicyData(result?.data?.policy[0]);
            }
        } catch (error) {
            console.error("Error fetching policy data:", error);
        }
        setIsLoading(false)
    };

    // delete api
    const deletedata = async () => {
        await apidelete(`policy/delete/${params.id}`)
        navigate('/dashboard/policy')
    }

    const csvColumns = [
        { Header: "Policy number", accessor: 'policyNumber' },
        { Header: "Policy start date", accessor: 'policyStartDate', type: 'date' },
        { Header: "Policy end date", accessor: 'policyEndDate', type: 'date' },
        { Header: "Policy type", accessor: 'policyType' },
        { Header: "Policy status", accessor: 'policyStatus' },
        { Header: "Coverage Amounts", accessor: 'coverageAmounts' },
        { Header: "Deductibles", accessor: 'deductibles' },
        { Header: "Limits ", accessor: 'limits' },
        { Header: "Insured person's name", accessor: 'insuredPersonName' },
        { Header: "Insured person's date of birth", accessor: 'insuredPersonDateOfBirth', type: 'dobDate' },
        { Header: "Relationship to the insured (if applicable)", accessor: 'relationshipToTheInsured' },
        { Header: "Phone Number", accessor: 'phoneNumber' },
        { Header: "Email ", accessor: 'emailAddress' },
        { Header: "Instagram Profile", accessor: 'instagramProfile' },
        { Header: "Twitter Profile", accessor: 'twitterProfile' },
        { Header: "Additional insured person's name", accessor: 'additionalInsuredPersonName' },
        { Header: "Additional Phone Number", accessor: 'additionalPhoneNumber' },
        { Header: "Additional Insured person's date of birth", accessor: 'additionalInsuredDateOfBirth', type: 'dobDate' },
        { Header: "Additional Email", accessor: 'additionalEmailAddress' },
        { Header: "Additional Relationship to the insured (if applicable)", accessor: 'additionalRelationshipToTheInsured' },
        { Header: "Additional Instagram Profile", accessor: 'additionalInstagramProfile' },
        { Header: "Additional Twitter Profile", accessor: 'additionalTwitterProfile' },
        { Header: "Underwriting Name", accessor: 'underwriterName' },
        { Header: "Underwriting Email", accessor: 'underwriterEmail' },
        { Header: "Underwriting Phone", accessor: 'underwriterPhone' },
        { Header: "Decisions Or Remark", accessor: 'underwriterDecisions' },
        { Header: "Premium amount", accessor: 'premiumAmount' },
        { Header: "Frequency of premium payments", accessor: 'FrequencyOfPremiumPayments' },
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
                selectedFieldsData[item.accessor] = formatDate(policyData[item.accessor], item?.type);
            } else {
                selectedFieldsData[item.accessor] = policyData[item.accessor];
            }
        });

        const jsonArray = [selectedFieldsData];

        commonUtils.convertJsonToCsvOrExcel({ jsonArray, csvColumns, fileName: "Policy", extension });
    };

    const handleExport = (extension) => {
        downloadCsvOrExcel(extension);
    };

    useEffect(() => {
        fetchData();
    }, [userAction])

    return (
        <div>
            {/* Add Model */}
            <AddModel open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

            {/* Edit Mode */}
            <EditModel open={openEdit} handleClose={handleCloseEdit} setUserAction={setUserAction} policyData={policyData} fetchPolicy={fetchData} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container maxWidth>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        {
                            policyData?.contact_id ?
                                <Header
                                    title={!isLoading ? `${policyData?.contact_id?.firstName} ${policyData?.contact_id?.lastName}` : "Loading..."}
                                    subtitle="Policy Details"
                                />
                                :
                                <Header
                                    title={!isLoading ? policyData?.insuredPersonName : "Loading..."}
                                    subtitle="Policy Details"
                                />
                        }
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {/* Action Butoon */}
                            <Actionbutton
                                handleOpen={handleOpenAdd}
                                handleOpenEdit={handleOpenEdit}
                                handleOpenDelete={handleOpenDelete}
                                handleExport={() => handleExport("xlsx")}
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
                        <Overview data={policyData} setUserAction={setUserAction} isLoading={isLoading} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Moreinformation data={policyData} isLoading={isLoading} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Other data={policyData} isLoading={isLoading} />
                    </CustomTabPanel>
                </Box>


                {/* Notes Table */}
                <Card sx={{ marginTop: "50px" }}>
                    <Notes toggleVisibilityNotes={toggleVisibilityNotes} isVisibleNotes={isVisibleNotes} rows={policyData?.notes} _id={params.id} setUserAction={setUserAction} />
                </Card>

                {/* Claim Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Claim toggleVisibilityClaim={toggleVisibilityClaim} isVisibleClaim={isVisibleClaim} rows={policyData?.claims} _id={params.id} setUserAction={setUserAction} />
                </Card>

                {/* PolicyDoc Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <PolicyDocuments toggleVisibilityPolicyDoc={toggleVisibilityPolicyDoc} isVisiblePolicyDoc={isVisiblePolicyDoc} rows={policyData?.policydocuments} _id={params.id} setUserAction={setUserAction} />
                </Card>

            </Container>


        </div>
    )
}

export default View
