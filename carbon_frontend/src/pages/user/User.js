
import { Box, Button, Card, Container, Stack, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { fetchUserData } from '../../redux/slice/userSlice';
import AddEditUser from './AddEdit';
import { commonUtils } from '../../utils/utils';
import { apidelete } from '../../service/api';

const User = () => {

    const [allUser, setAllUser] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [userAction, setUserAction] = useState(null)
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data, isLoading } = useSelector((state) => state?.userDetails)

    const handleOpenAdd = () => setOpenAdd(true);
    // const handleCloseAdd = () => setOpenAdd(false);
    const handleCloseAdd = () => {
        setOpenAdd(false);
        setSelectedUser(null);
        setOpenAdd(false);
    }

    const handleEditClick = async (rowData) => {
        setSelectedUser(rowData); // Set selected user data for edit
        setOpenAdd(true);
    };

    const handleDeleteClick = async (rowData) => {
        try {
            const response = await apidelete(`api/user/delete/${rowData._id}`);
            if (response && response.status === 200) {
                alert(response.data.message);
                dispatch(fetchUserData()); // Fetch updated data after successful delete
            } else {
                alert("Failed to delete user");
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert("Failed to delete user");
        }
    };

    // Functional component to render action menu
    const ActionMenu = ({ row }) => {
        const [anchorEl, setAnchorEl] = useState(null);

        const handleClick = (event) => {
            event.stopPropagation(); // Prevents the row selection
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <Box>
                <IconButton
                    aria-label="actions"
                    aria-controls="actions-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="actions-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            zIndex: 1500, // Ensure menu appears above other elements
                        },
                    }}
                >
                    <MenuItem onClick={() => handleEditClick(row)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDeleteClick(row)}>Delete</MenuItem>
                </Menu>
            </Box>
        );
    };

    const clearSelectedUserData = () => {
        setSelectedUser(null);
        setOpenAdd(false);
    };

    const columns = [
        {
            "field": "companyName",
            "headerName": "Company Name",
            "width": 175
        },
        {
            "field": "loginId",
            "headerName": "Login Id",
            "width": 175
        },
        {
            "field": "companyWebsite",
            "headerName": "Company Website",
            "width": 175
        },
        {
            "field": "cnctPerson",
            "headerName": "Contact Person",
            "width": 175
        },
        {
            "field": "cnctPersonBusEmail",
            "headerName": "Contact Business Email",
            "width": 175
        },
        {
            "field": "regOffAddrs",
            "headerName": "Registered Office Address",
            "width": 175
        },
        {
            "field": "regOffCountry",
            "headerName": "Registered Country",
            "width": 175
        },
        {
            "field": "regOffPhoneNo",
            "headerName": "Office Phone No",
            "width": 175
        },
        {
            "field": "cnctPersonMob",
            "headerName": "Contact Mobile No",
            "width": 175
        },
        {
            "field": "altCnctPerson",
            "headerName": "Alternate Contact Person",
            "width": 175
        },
        {
            "field": "altCnctPersonBusEmail",
            "headerName": "Alternate Business Email",
            "width": 175
        },
        {
            "field": "altCnctPersonMob",
            "headerName": "Alternate Mobile No",
            "width": 175
        },
        {
            "field": "escCnctPerson",
            "headerName": "Escalation Contact Person",
            "width": 175
        },
        {
            "field": "escCnctPersonBusEmail",
            "headerName": "Escalation Business Email",
            "width": 175
        },
        {
            "field": "escCnctPersonMob",
            "headerName": "Escalation Mobile No",
            "width": 175
        },
        {
            "field": "subscriptionType",
            "headerName": "Subscription Type",
            "width": 175
        },
        {
            "field": "subscriptionStart",
            "headerName": "Subscription Start",
            "width": 175
        },
        {
            "field": "subscriptionEnd",
            "headerName": "Subscription End",
            "width": 175
        },
        {
            "field": "paymentReceivedDate",
            "headerName": "Payment Received Date Start",
            "width": 175
        },
        {
            "field": "paymentRemainderDate",
            "headerName": "Payment Remainder",
            "width": 175
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => (
                <ActionMenu row={params.row} />
            )
        },
    ];

    const csvColumns = [
        { Header: "Company Name", accessor: 'companyName' },

        { Header: "Login Id", accessor: 'loginId' },

        { Header: "Company Website", accessor: 'companyWebsite' },

        { Header: "Registered Office Address", accessor: 'regOffAddrs' },
        { Header: "Registered Country", accessor: 'regOffCountry' },
        { Header: "Office Phone No", accessor: 'regOffPhoneNo' },

        { Header: "Contact Person", accessor: 'cnctPerson' },
        { Header: "Contact Business Email", accessor: 'cnctPersonBusEmail' },
        { Header: "Contact Mobile No", accessor: 'cnctPersonMob' },

        { Header: "Alternate Contact Person", accessor: 'altCnctPerson' },
        { Header: "Alternate Business Email", accessor: 'altCnctPersonBusEmail' },
        { Header: "Alternate Mobile No", accessor: 'altCnctPersonMob' },

        { Header: "Escalation Contact Person", accessor: 'escCnctPerson' },
        { Header: "Escalation Business Email", accessor: 'escCnctPersonBusEmail' },
        { Header: "Escalation Mobile No", accessor: 'escCnctPersonMob' },

        { Header: "Subscription Type", accessor: 'subscriptionType' },
        { Header: "Subscription Start", accessor: 'subscriptionStart' },
        { Header: "Subscription End", accessor: 'subscriptionEnd' },

        { Header: "Payment Received Date", accessor: 'paymentReceivedDate' },
        { Header: "Payment Remainder", accessor: 'paymentRemainderDate' },

    ];

    const downloadCsvOrExcel = async (extension, selectedIds) => {
        if (selectedIds && selectedIds?.length > 0) {
            const selectedRecordsWithSpecificFileds = data?.filter((rec) => selectedIds.includes(rec._id))?.map((rec) => {
                const selectedFieldsData = {};
                csvColumns?.forEach((item) => {
                    selectedFieldsData[item.accessor] = rec[item.accessor];
                });
                return selectedFieldsData;
            });
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "User", extension, setSelectedRowIds });
        } else {
            const AllRecordsWithSpecificFileds = data?.map((rec) => {
                const selectedFieldsData = {};
                csvColumns?.forEach((item) => {
                    selectedFieldsData[item?.accessor] = rec[item?.accessor];
                });
                return selectedFieldsData;
            });
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "User", extension, setSelectedRowIds });
        }

    };

    const handleExportSms = (extension) => {
        if (selectedRowIds && selectedRowIds?.length > 0) {
            downloadCsvOrExcel(extension, selectedRowIds)
        } else {
            downloadCsvOrExcel(extension);
        }
    };

    useEffect(() => {
        dispatch(fetchUserData());
    }, [userAction])

    return (
        <>
            <AddEditUser open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} handleUserClear={clearSelectedUserData} selectedUser={selectedUser} />

            <Container maxWidth style={{ marginTop: "36px" }}>
                <Card style={{ height: "auto", padding: '10px' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variant="h4">
                            User
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                Add New
                            </Button>
                            <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportSms('xlsx') }} >
                                {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}
                            </Button>
                        </Stack>
                    </Stack>
                    <TableStyle>
                        {/* <Box width="100%" style={{ minHeight: '670px', overflowY: 'auto', padding: '10px' }} > */}
                        <Box width="100%" style={{ height: '680px', overflowY: 'auto', padding: '10px' }} >
                            {isLoading ? (
                                <Card style={{ display: 'flex', justifyContent: 'center', height: "680px" }}>
                                    <span className="loader" />
                                </Card>
                            ) : (
                                <DataGrid
                                    rows={data || []}
                                    columns={columns}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    onRowSelectionModelChange={handleSelectionChange}
                                    rowSelectionModel={selectedRowIds}
                                    components={{
                                        Toolbar: () => (
                                            <Box padding="10px 0">
                                                <GridToolbarColumnsButton />
                                                <GridToolbarFilterButton />
                                                <GridToolbarDensitySelector
                                                    slotProps={{ tooltip: { title: 'Change density' } }}
                                                />
                                            </Box>
                                        ),
                                        NoRowsOverlay: () => (
                                            <Typography
                                                className='fs-5'
                                                style={{
                                                    textAlign: "center",
                                                    padding: "20px",
                                                    marginTop: "50px", // Add margin to separate from pagination
                                                }}
                                            >
                                                No Records
                                            </Typography>
                                        ),
                                    }}
                                    getRowId={(row) => row._id}
                                    pageSize={5}
                                    pagination
                                    pageSizeOptions={[5, 10, 25, 50, 100]}
                                    initialState={{
                                        ...data?.initialState,
                                        pagination: { paginationModel: { pageSize: 10 } },
                                    }}
                                // rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                />
                            )}
                        </Box>
                    </TableStyle>
                </Card>
            </Container>
        </>
    );
}

export default User;