import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import {
    Box,
    Button,
    Card,
    Container,
    Menu,
    MenuItem,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { CiExport, CiImport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../../components/Deletemodle';
import ImportModel from '../../components/Import/ImportModel';
import SMSModel from '../../components/SMSModel';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { fetchContactData } from '../../redux/slice/contactSlice';
import { apipost, deleteManyApi } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import AddContact from './Add';
import EditContact from './Edit';

// ----------------------------------------------------------------------
const StyledMenu = styled((props) => (
    <Menu
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 100,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
    },
}));

function CustomToolbar({ selectedRowIds, fetchContactData }) {
    const [opendelete, setOpendelete] = useState(false);
    const [smsModelOpen, setSmsModelOpen] = useState(false);
    const [openImpt, setOpenImpt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const userid = sessionStorage.getItem('user_id');


    const handleSmsModelOpen = () => setSmsModelOpen(true)

    const handleSmsModelClose = () => setSmsModelOpen(false)

    const handleCloseDelete = () => {
        setOpendelete(false)
    }

    const handleOpenDelete = () => {
        setOpendelete(true)
    }

    const deleteManyContact = async (data) => {
        await deleteManyApi('contact/deletemany', data)
        handleCloseDelete();
        dispatch(fetchContactData())
    }

    const sendSMS = async (payload) => {
        setIsLoading(true)
        try {
            const result = await apipost('sms/contact', payload)
            if (result?.status === 200) {
                handleSmsModelClose();
                dispatch(fetchContactData())
            } else {
                handleSmsModelClose();
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)

    }



    return (
        <GridToolbarContainer>
            <Box padding={"10px 0"}>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector
                    slotProps={{ tooltip: { title: 'Change density' } }}
                />

                {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize', fontSize: "15px", padding: "4px 5px 2px  0" }} startIcon={<SmsRoundedIcon style={{ fontSize: '19px', marginLeft: "8px" }} />} onClick={handleSmsModelOpen}>Send SMS</Button>}
                {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize', fontSize: "13", padding: "4px 5px 2px  0", marginRight: "3px" }} startIcon={<DeleteIcon style={{ fontSize: '19px', marginLeft: "8px", marginBottom: "2px" }} />} onClick={handleOpenDelete}>Delete</Button>}
            </Box>
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyContact} id={selectedRowIds} />
            <SMSModel open={smsModelOpen} onClose={handleSmsModelClose} sendSMS={sendSMS} ids={selectedRowIds} isLoading={isLoading} />
        </GridToolbarContainer>
    );
}


const Contact = () => {

    const [contactData, setContactData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [id, setId] = useState('');
    const open = Boolean(anchorEl);

    const navigate = useNavigate()
    const [openImpt, setOpenImpt] = useState(false);
    const dispatch = useDispatch()
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole")

    const { data, isLoading } = useSelector((state) => state?.contactDetails)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // open add model
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    // open edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };
    const handleOpenImpt = () => setOpenImpt(true);
    const handleCloseImpt = () => setOpenImpt(false);

    const fieldsInCrm = [
        { Header: "First Name", accessor: 'firstName', type: 'string', required: true },
        { Header: "Last Name", accessor: 'lastName', type: 'string', required: true },
        { Header: "Gender", accessor: 'gender', type: 'string', required: true },
        { Header: "Phone Number", accessor: 'phoneNumber', type: 'string' },
        { Header: "Email Address", accessor: 'emailAddress', type: 'string', required: true },
        { Header: "Date Of Birth", accessor: 'dateOfBirth', type: 'string', required: true },
        { Header: "Address", accessor: 'address', type: 'string', required: true },
        { Header: "Created On", accessor: 'createdOn', type: 'date', isDisplay: false, defVal: new Date() },
        { Header: "Create By", accessor: 'createdBy', type: 'string', isDisplay: false, defVal: userid, required: true },
        { Header: "Deleted", accessor: 'deleted', type: 'boolean', isDisplay: false, defVal: false },
    ];

    const csvColumns = [
        { Header: "First Name", accessor: 'firstName' },
        { Header: "Last Name", accessor: 'lastName' },
        { Header: "Gender", accessor: 'gender' },
        { Header: "Phone Number", accessor: 'phoneNumber' },
        { Header: "Email Address", accessor: 'emailAddress' },
        { Header: "Date Of Birth", accessor: 'dateOfBirth' },
        { Header: "Address", accessor: 'address' },
        { Header: "Create Date", accessor: 'createdOn' },
    ];

    const columns = [
        {
            field: "firstName",
            headerName: "Frist Name",
            width: 250,
            cellClassName: "name-column--cell name-column--cell--capitalize",
            renderCell: (params) => {
                const handleFirstNameClick = () => {
                    navigate(`/dashboard/contact/view/${params.id}`)
                };

                return (
                    <Box onClick={handleFirstNameClick}>
                        {params.value}
                    </Box>
                );
            }
        },
        {
            field: "lastName",
            headerName: "Last Name",
            width: 250,
            cellClassName: "name-column--cell--capitalize"
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 150,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 200,
        },
        {
            field: "emailAddress",
            headerName: "Email Address",
            width: 250,
        },
        {
            field: "createdOn",
            headerName: "Create Date",
            width: 270,
            renderCell: (params) => {
                return (
                    <>
                        {moment(params?.row?.createdOn).format('lll')}
                    </>
                );
            }
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
                const handleFirstNameClick = async (data) => {
                    setContactData(data)
                    handleOpenEdit();
                };
                return (
                    <Box>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='text' size='small' color='primary' onClick={() => handleFirstNameClick(params?.row)}><EditIcon /></Button>
                        </Stack>
                    </Box>
                );
            }
        },

    ];

    const downloadCsvOrExcel = async (extension, selectedIds) => {
        const formatDateOfBirth = (dateString, filednm) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            if (filednm === "dateOfBirth") {
                return moment(dateString).format('DD/MM/YYYY')
            }
            return moment(dateString).format('DD/MM/YYYY HH:MM A')

        };
        const formatRecords = (records) => {
            return records.map((rec) => {
                const selectedFieldsData = {};
                csvColumns?.forEach((item) => {
                    if (item?.accessor === 'dateOfBirth') {
                        selectedFieldsData[item?.accessor] = formatDateOfBirth(rec[item?.accessor], "dateOfBirth");
                    } else if (item?.accessor === 'createdOn') {
                        selectedFieldsData[item?.accessor] = formatDateOfBirth(rec[item?.accessor], "createdOn");
                    }
                    else {
                        selectedFieldsData[item?.accessor] = rec[item?.accessor];
                    }
                });
                return selectedFieldsData;
            });
        };

        if (selectedIds && selectedIds?.length > 0) {
            const selectedRecordsWithSpecificFileds = formatRecords(data?.filter((rec) => selectedIds?.includes(rec._id)));
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "Contact", extension, setSelectedRowIds });
        } else {
            const AllRecordsWithSpecificFileds = formatRecords(data);
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "Contact", extension, setSelectedRowIds });
        }
    };

    const handleExportLeads = (extension) => {
        if (selectedRowIds && selectedRowIds?.length > 0) {
            downloadCsvOrExcel(extension, selectedRowIds)
        } else {
            downloadCsvOrExcel(extension);
        }
    };


    useEffect(() => {
        dispatch(fetchContactData());
    }, [userAction])
    return (
        <>
            {/* Add Contact Model */}
            <AddContact open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />
            {/* Edit Contact Model */}
            <EditContact open={openEdit} handleClose={handleCloseEdit} contactData={contactData} setUserAction={setUserAction} />
            <ImportModel open={openImpt} handleClose={handleCloseImpt} moduleName="Contacts" api="contact/addMany" back="/dashboard/contact" fieldsInCrm={fieldsInCrm} />

            <Container maxWidth>
                <TableStyle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4">
                            Contact
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                Add New
                            </Button>
                            <div>
                                <Button
                                    id="demo-customized-button"
                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleClick}
                                    endIcon={<KeyboardArrowDownIcon />}
                                >
                                    Action
                                </Button>
                                <StyledMenu
                                    id="demo-customized-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'demo-customized-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleOpenImpt} disableRipple>
                                        <CiImport style={{ marginRight: "7px" }} />
                                        Import
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleClose(); handleExportLeads('xlsx') }} disableRipple>
                                        <CiExport style={{ marginRight: "7px" }} />
                                        {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}
                                    </MenuItem>
                                </StyledMenu>
                            </div>
                        </Stack>
                    </Stack>
                    <Box width="100%">
                        {isLoading ? (
                            <Card style={{ display: 'flex', justifyContent: 'center', height: "600px" }}>
                                <span className="loader" />
                            </Card>
                        ) : (
                            <Card style={{ height: "600px" }}>
                                <DataGrid
                                    rows={data || []}
                                    columns={columns.map((column, index) => ({
                                        ...column,
                                        disableColumnMenu: index === columns.length - 1 // Disable menu icon for the last column
                                    }))} components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchContactData }) }}
                                    checkboxSelection
                                    onRowSelectionModelChange={handleSelectionChange}
                                    rowSelectionModel={selectedRowIds}
                                    getRowId={row => row._id}
                                />
                            </Card>
                        )}
                    </Box>
                </TableStyle>
            </Container>
        </>
    );
}

export default Contact