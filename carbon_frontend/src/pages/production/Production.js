
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { fetchContactUsData } from '../../redux/slice/contactUsSlice';
import { commonUtils } from '../../utils/utils';
import AddEdit from './AddEdit';
import { apidelete } from '../../service/api';

// ----------------------------------------------------------------------

const Production = () => {

    const [userAction, setUserAction] = useState(null)
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [type, setType] = useState('')
    const [selectedData, setSelectedData] = useState({})
    const [opendelete, setOpendelete] = useState(false);
    const [id, setId] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data, isLoading } = useSelector((state) => state?.contactUs)

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleCloseDelete = () => setOpendelete(false)
    const handleOpenDelete = () => setOpendelete(true)

    const columns = [
        {
            field: "material",
            headerName: "Material",
            flex: 1,
            cellClassName: "name-column--cell--capitalize",
        },
        {
            field: "totalArea",
            headerName: "Total Area (m2)/ Amount",
            flex: 1,
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

    const csvColumns = [
        {
            accessor: "firstName",
            Header: "First Name"
        },
        {
            accessor: "lastName",
            Header: "Last Name"
        },
        {
            accessor: "workEmail",
            Header: "Email"
        },
        {
            accessor: "mobile",
            Header: "Mobile"
        },
        {
            accessor: "organisation",
            Header: "Organisation"
        },
        {
            accessor: "designation",
            Header: "Designation"
        },
        {
            accessor: "message",
            Header: "Message"
        }
    ];

    const handleDelete = async (id) => {
        const result = await apidelete(`api/production/${id}`)
        setUserAction(result)
        handleCloseDelete();
    }

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
        dispatch(fetchContactUsData());
    }, [userAction])

    return (
        <>
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={handleDelete} id={id} />

            <Container maxWidth>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">
                        Production
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} className="custom-btn" onClick={() => { handleOpenAdd(); setType("add") }}>
                            Add New
                        </Button>

                        {/* <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportSms('xlsx') }} className='custom-btn'>
                            {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}
                        </Button> */}
                    </Stack>
                </Stack>
                <TableStyle>
                    <Box width="100%" >
                        {isLoading ? (
                            <Card style={{ display: 'flex', justifyContent: 'center', height: "600px" }}>
                                <span className="loader" />
                            </Card>
                        ) : (
                            <Card style={{ height: "600px" }}>
                                <DataGrid
                                    rows={data || []}
                                    columns={columns}
                                    // checkboxSelection
                                    onRowSelectionModelChange={handleSelectionChange}
                                    rowSelectionModel={selectedRowIds}
                                    components={{
                                        Toolbar: () => (<Box padding={"10px 0"}>
                                            <GridToolbarColumnsButton />
                                            <GridToolbarFilterButton />
                                            <GridToolbarDensitySelector
                                                slotProps={{ tooltip: { title: 'Change density' } }}
                                            />

                                        </Box>)
                                    }}
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

export default Production