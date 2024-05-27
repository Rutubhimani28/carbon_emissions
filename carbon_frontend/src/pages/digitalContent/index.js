import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Card, Container, Stack, Typography, styled } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { CiExport, CiImport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../../components/Deletemodle';
import ImportModel from '../../components/Import/ImportModel';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { fetchDigitalContentData } from '../../redux/slice/digitalContentSlice';
import { deleteManyApi } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import AddEdit from './AddEdit';

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

function CustomToolbar({ selectedRowIds, fetchdata }) {
    const [opendelete, setOpendelete] = useState(false);
    const [userAction, setUserAction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleCloseDelete = () => setOpendelete(false)

    const handleOpenDelete = () => setOpendelete(true)


    const deleteManyData = async (data) => {
        const result = await deleteManyApi('api/digitalContent/deleteMany', data)
        dispatch(fetchDigitalContentData())
        setUserAction(result)
        handleCloseDelete();
    }


    useEffect(() => {
        setUserAction(userAction)
    }, [userAction])

    return (
        <GridToolbarContainer>
            <Box padding={"10px 0"}>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector
                    slotProps={{ tooltip: { title: 'Change density' } }}
                />

                {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize', fontSize: "13", padding: "4px 5px 2px  0", marginRight: "3px" }} startIcon={<DeleteIcon style={{ fontSize: '19px', marginLeft: "8px", marginBottom: "2px" }} />} onClick={handleOpenDelete}>Delete</Button>}
            </Box>
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyData} id={selectedRowIds} />
        </GridToolbarContainer>
    );
}

const DigitalContent = () => {

    const [userAction, setUserAction] = useState(null);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedData, setSelectedData] = useState({})
    const [openAdd, setOpenAdd] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openImpt, setOpenImpt] = useState(false);
    const [type, setType] = useState('')
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const userid = sessionStorage.getItem('user_id');

    const { data, isLoading } = useSelector((state) => state?.digitalContentDetails)

    const fieldsInCrm = [
        { Header: "Type", accessor: 'type', type: 'string' },
        { Header: "Count", accessor: 'count', type: 'number' },
        { Header: "MB", accessor: 'mb', type: 'number' },
        { Header: "No. of Attendees", accessor: 'noOfAttendees', type: 'number' },
        { Header: "No. of Hours", accessor: 'noOfHours', type: 'number' },
        { Header: "Service life of Laptop", accessor: 'serviceLifeOfLaptop', type: 'number' },
        { Header: "EF", accessor: 'ef', type: 'number' },
        { Header: "Create Date", accessor: 'createdOn', type: 'date', isDisplay: false, defVal: new Date() },
    ];

    const csvColumns = [
        { Header: "Type", accessor: 'type' },
        { Header: "Count", accessor: 'count' },
        { Header: "MB", accessor: 'mb' },
        { Header: "No. of Attendees", accessor: 'noOfAttendees' },
        { Header: "No. of Hours", accessor: 'noOfHours' },
        { Header: "Service life of Laptop", accessor: 'serviceLifeOfLaptop' },
        { Header: "EF", accessor: 'ef' },
        { Header: "Create Date", accessor: 'createdOn' },
    ];


    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenImpt = () => {
        setOpenImpt(true);
        handleClose()
    };
    const handleCloseImpt = () => setOpenImpt(false);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const columns = [
        {
            field: "type",
            headerName: "Type",
            width: 230,
            cellClassName: "name-column--cell--capitalize",
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },
        {
            field: "count",
            headerName: "Count",
            width: 150,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },
        {
            field: "mb",
            headerName: "MB",
            width: 180,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },

        {
            field: "noOfAttendees",
            headerName: "No. of Attendees",
            width: 250,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },
        {
            field: "noOfHours",
            headerName: "No. of Hours",
            width: 250,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },
        {
            field: "serviceLifeOfLaptop",
            headerName: "Service life of Laptop",
            width: 250,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },
        {
            field: "ef",
            headerName: "EF",
            width: 250,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },

        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
                const handleFirstNameClick = async (data) => {
                    setSelectedData(data)
                    handleOpenAdd();
                };
                return (
                    <>
                        <Button variant='text' size='small' color='primary' onClick={() => { handleFirstNameClick(params?.row); setType('edit') }}><EditIcon /></Button>
                    </>
                );
            }
        },
    ];


    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

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
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "digital_Content", extension, setSelectedRowIds });
        } else {
            const AllRecordsWithSpecificFileds = formatRecords(data);
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "digital_Content", extension, setSelectedRowIds });
        }
    };

    const handleExportLeads = (extension) => {
        if (selectedRowIds && selectedRowIds.length > 0) {
            downloadCsvOrExcel(extension, selectedRowIds);
        } else {
            downloadCsvOrExcel(extension);
        }
    };


    useEffect(() => {
        dispatch(fetchDigitalContentData())
    }, [userAction])
    return (
        <>
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />

            <ImportModel open={openImpt} handleClose={handleCloseImpt} moduleName="Digital Content" api="api/digitalContent/addMany" back="/dashboard/digitalContent" fieldsInCrm={fieldsInCrm} />

            <Container maxWidth>
                <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"}>
                    <Typography variant="h4" >
                        Digital Content
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => { handleOpenAdd(); setType("add") }}>
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
                <TableStyle>
                    <Box width="100%">
                        {isLoading ? (
                            <Card style={{ display: 'flex', justifyContent: 'center', height: "600px" }}>
                                <span className="loader" />
                            </Card>
                        ) : (
                            <Card style={{ height: "600px" }} className='tableWraper'>
                                <DataGrid
                                    rows={data || []}
                                    columns={columns.map((column, index) => ({
                                        ...column,
                                        disableColumnMenu: index === columns.length - 1 // Disable menu icon for the last column
                                    }))}
                                    components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchDigitalContentData }) }}
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

export default DigitalContent