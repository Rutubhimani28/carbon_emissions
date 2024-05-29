import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Card, Container, Grid, Stack, Typography, styled } from '@mui/material';
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
// import ImportModel from '../../components/Import/ImportModel';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { fetchAirFreightData } from '../../redux/slice/airFreightSlice';
import { apidelete, deleteManyApi } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import AddEdit from './AddEdit';
import TableStyleTwo from '../../components/TableStyleTwo';
// import airFreightFile from '../../assets/SAM_air_Freight_.xlsx'

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

    const handleCloseDelete = () => setOpendelete(false);

    const handleOpenDelete = () => setOpendelete(true);


    const deleteManyData = async (data) => {
        const result = await deleteManyApi('api/airFreight/deleteMany', data);
        dispatch(fetchAirFreightData());
        setUserAction(result);
        handleCloseDelete();
    }


    useEffect(() => {
        setUserAction(userAction);
    }, [userAction]);

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
};

const AirFreight = () => {

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
    const [opendelete, setOpendelete] = useState(false);
    const [id, setId] = useState('')

    const handleCloseDelete = () => setOpendelete(false)
    const handleOpenDelete = () => setOpendelete(true)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const userid = sessionStorage.getItem('user_id');

    const { data, isLoading } = useSelector((state) => state?.airFreightDetails)

    const fieldsInCrm = [
        { Header: "Type", accessor: 'type', type: 'string' },
        { Header: "No Of Kms", accessor: 'noOfKms', type: 'number' },
        { Header: "Weight (Kgs)", accessor: 'weightInKgs', type: 'number' },
        { Header: "Emissions", accessor: 'emission', type: 'number' },
        { Header: "EF", accessor: 'ef', type: 'number' },
        { Header: "Create Date", accessor: 'createdOn', type: 'date', isDisplay: false, defVal: new Date() },
    ];

    const csvColumns = [
        { Header: "Type", accessor: 'type' },
        { Header: "No Of Kms", accessor: 'noOfKms' },
        { Header: "Weight (Kgs)", accessor: 'weightInKgs' },
        { Header: "Emissions", accessor: 'emission' },
        { Header: "Create Date", accessor: 'createdOn' },
    ];


    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleDelete = async (id) => {
        const result = await apidelete(`api/airFreight/${id}`)
        setUserAction(result)
        handleCloseDelete();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const columns = [
        // {
        //     field: "type",
        //     headerName: "Type",
        //     width: 230,
        //     flex: 1,
        //     cellClassName: "name-column--cell--capitalize",
        //     renderCell: (params) => {
        //         return (
        //             <Box >
        //                 {params.value ? params.value : '-'}
        //             </Box>
        //         );
        //     }
        // },
        {
            field: "noOfKms",
            headerName: "No Of Kms",
            width: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },
        {
            field: "weightInKgs",
            headerName: "Weight (Kgs)",
            width: 200,
            flex: 1,
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
            flex: 1,
            renderCell: (params) => {
                const handleFirstNameClick = async (data) => {
                    setSelectedData(data)
                    handleOpenAdd();
                };
                const handleClick = async (data) => {
                    setId(data?._id)
                    handleOpenDelete();
                };
                return (
                    <>
                        <Button variant='text' size='small' color='primary' onClick={() => { handleFirstNameClick(params?.row); setType("edit") }}><EditIcon /></Button>
                        <Button variant='text' size='small' color='primary' onClick={() => { handleClick(params?.row); }}><DeleteIcon color='error' /></Button>
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
                return moment(dateString).format('DD/MM/YYYY');
            }
            return moment(dateString).format('DD/MM/YYYY HH:MM A');

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
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "air_freight", extension, setSelectedRowIds });
        } else {
            const AllRecordsWithSpecificFileds = formatRecords(data);
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "air_freight", extension, setSelectedRowIds });
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
        dispatch(fetchAirFreightData())
    }, [userAction]);

    return (
        <>
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={handleDelete} id={id} />

            {/* <ImportModel open={openImpt} handleClose={handleCloseImpt} moduleName="Air Freight" api="api/airFreight/addMany" back="/dashboard/airFreight" fieldsInCrm={fieldsInCrm} filePath={airFreightFile} fileName={"SampleAirFreightTemplete.xlsx"} routeName={"airFreight"} /> */}

            <Container maxWidth>
                <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"}>
                    <Typography variant="h4" >
                        Air Freight
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => { handleOpenAdd(); setType("add") }} className="custom-btn">
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
                                className="custom-btn"
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
                                {/* <MenuItem onClick={handleOpenImpt} disableRipple>
                                    <CiImport style={{ marginRight: "7px" }} />
                                    Import
                                </MenuItem> */}
                                <MenuItem onClick={() => { handleClose(); handleExportLeads('xlsx') }} disableRipple>
                                    <CiExport style={{ marginRight: "7px" }} />
                                    {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}
                                </MenuItem>
                            </StyledMenu>
                        </div>
                    </Stack>
                </Stack>
                {/* <TableStyle>
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
                                    components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchAirFreightData }) }}
                                    checkboxSelection
                                    onRowSelectionModelChange={handleSelectionChange}
                                    rowSelectionModel={selectedRowIds}
                                    getRowId={row => row._id}
                                />

                            </Card>
                        )}

                    </Box>
                </TableStyle> */}



                <div>
                    {/* <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />
                    <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={handleDelete} id={id} /> */}
                    <Card className='tableWraper'>
                        <Box p={2} style={{ cursor: "pointer" }}>
                            <Grid container display="flex" alignItems="center">
                                <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                                    <Stack direction="row" spacing={1} alignItems={"center"}>
                                        <Typography variant="h5">Air</Typography>
                                    </Stack>

                                </Stack>
                            </Grid>
                        </Box>
                        <TableStyleTwo>
                            <Box width="100%" height="50vh">
                                <DataGrid
                                    rows={data || []}
                                    getRowId={row => row._id}
                                    // columnHeaderHeight={40}
                                    pagination={false}
                                    columns={columns.map((column, index) => ({
                                        ...column,
                                        disableColumnMenu: index === columns.length - 1 // Disable menu icon for the last column
                                    }))}
                                    disableSelectionOnClick
                                    onRowClick={(params, event) => {
                                        event.defaultMuiPrevented = true;
                                    }}
                                />
                            </Box>
                        </TableStyleTwo>

                    </Card>
                </div>
            </Container>
        </>
    );
}

export default AirFreight;