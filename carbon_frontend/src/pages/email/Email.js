/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import moment from "moment";
import { useEffect, useState } from 'react';
// @mui
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CiExport, CiImport } from "react-icons/ci";

// components
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { json, useNavigate } from 'react-router-dom';
// sections
// mock
import { DeleteOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify/Iconify';
import { fetchEmailData } from '../../redux/slice/emailSlice';
import { deleteManyApi } from '../../service/api';
import AddEmail from './Add';
import { commonUtils } from '../../utils/utils';

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchEmailData }) {
    const [opendelete, setOpendelete] = useState(false);
    const dispatch = useDispatch()
    // open DeleteModel
    const handleCloseDelete = () => setOpendelete(false);
    const handleOpenDelete = () => setOpendelete(true);

    const deleteManyCalls = async (data) => {
        await deleteManyApi('email/deletemany', data)
        dispatch(fetchEmailData());
        handleCloseDelete();
    }

    return (
        <GridToolbarContainer>
            <Box padding={"10px 0"}>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector
                    slotProps={{ tooltip: { title: 'Change density' } }}
                />

            </Box>
            {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize', fontSize: "13", padding: "4px 5px 2px  0", marginRight: "3px" }} startIcon={<DeleteIcon style={{ fontSize: '19px', marginLeft: "8px", marginBottom: "2px" }} />} onClick={handleOpenDelete}>Delete</Button>}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyCalls} id={selectedRowIds} />
        </GridToolbarContainer>
    );
}

const Email = () => {
    // eslint-disable-next-line no-unused-vars
    const [userAction, setUserAction] = useState(null);
    const [emailList, setEmailList] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data, isLoading } = useSelector((state) => state?.emailDetails)

    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole")

    // open add model
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

    const columns = [
        {
            field: "subject",
            headerName: "Subject",
            width: 400,
            cellClassName: "name-column--cell name-column--cell--capitalize",
            renderCell: (params) => {
                const handleFirstNameClick = () => {
                    navigate(`/dashboard/email/view/${params.row._id}`)
                };

                return (
                    <Box onClick={handleFirstNameClick}>
                        {params.value}
                    </Box>
                );
            }
        },
        {
            field: "sender",
            headerName: "Sender",
            width: 400,
            renderCell: (params) => {
                return (
                    <Box >
                        hello@anzianoinsuranceagency.com
                    </Box>
                );
            }
        },
        {
            field: "receiver",
            headerName: "Receiver",
            width: 400,
        },
        {
            field: "createdBy",
            headerName: "Created By",
            width: 300,
            cellClassName: "name-column--cell--capitalize",
            renderCell: (params) => {
                return (
                    <Box >
                        {params.row.createdUser}
                    </Box>
                );
            }
        },
        {
            field: "createdOn",
            headerName: "Create Date",
            width: 300,
            renderCell: (params) => {
                return (
                    <>
                        {moment(params?.row?.createdOn).format('lll')}
                    </>
                );
            }
        }
    ];
    const csvColumns = [
        {
            Header: "Subject", accessor: 'subject'
        },
        {
            Header: "Sender", accessor: 'senderName'
        },
        {
            Header: "Receiver", accessor: 'receiver'
        },
        {
            Header: "Created By", accessor: 'createdUser'
        },
        {
            Header: "Create Date", accessor: 'createdOn', type: 'date'
        },

    ];

    const downloadCsvOrExcel = async (extension, selectedIds) => {
        const formatDateOfBirth = (dateString, filednm) => {
            return moment(dateString).format('DD/MM/YYYY HH:MM A')
        };

        const formatRecords = (records) => {
            return records.map((rec) => {
                const selectedFieldsData = {};
                csvColumns?.forEach((item) => {
                    if (item?.type === 'date') {
                        selectedFieldsData[item?.accessor] = formatDateOfBirth(rec[item?.accessor]);
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
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "Email", extension, setSelectedRowIds });
        } else {
            const AllRecordsWithSpecificFileds = formatRecords(data);
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "Email", extension, setSelectedRowIds });
        }
    };


    const handleExportEmails = (extension) => {
        if (selectedRowIds && selectedRowIds?.length > 0) {
            downloadCsvOrExcel(extension, selectedRowIds)
        } else {
            downloadCsvOrExcel(extension);
        }
    };

    useEffect(() => {
        dispatch(fetchEmailData());
    }, [userAction])

    return (
        <>
            <AddEmail open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

            <Container maxWidth>
                <TableStyle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4">
                            Emails List
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} >
                                Add New
                            </Button>
                            <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportEmails('xlsx') }}   >
                                {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}

                            </Button>
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
                                    rows={data}
                                    columns={columns}
                                    components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchEmailData }) }}
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

export default Email