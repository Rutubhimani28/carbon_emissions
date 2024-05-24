import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify/Iconify';
import { fetchSmsTemplateData } from '../../redux/slice/smsTemplateSlice';
import { deleteManyApi } from '../../service/api';
import AddSmsTemplate from './Add';
import EditSmsTemplate from './Edit';

function CustomToolbar({ selectedRowIds, fetchSmsTemplateData }) {
    const [opendelete, setOpendelete] = useState(false);
    const [userAction, setUserAction] = useState(null);
    const dispatch = useDispatch()
    const handleCloseDelete = () => setOpendelete(false)

    const handleOpenDelete = () => setOpendelete(true)

    const deleteManySMSTemplate = async (data) => {
        const result = await deleteManyApi('smstemplate/deletemanny', data)
        dispatch(fetchSmsTemplateData())
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
            </Box>
            {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize' }} startIcon={<DeleteOutline />} onClick={handleOpenDelete}>Delete</Button>}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManySMSTemplate} id={selectedRowIds} />
        </GridToolbarContainer>
    );
}

const SMSTemplate = () => {

    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [tempData, setTempData] = useState({})
    const [openEdit, setOpenEdit] = useState(false);

    const [userAction, setUserAction] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { data, isLoading } = useSelector((state) => state?.smsTempDetails)

    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const columns = [
        {
            field: "name",
            headerName: "Template Name",
            width: 300,
            cellClassName: "name-column--cell--capitalize",
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value}
                    </Box>
                );
            }

        },
        {
            field: "createdOn",
            headerName: "CreatedOn",
            width: 300,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString();
            },
        },
        {
            field: "modifiedOn",
            headerName: "ModifiedOn",
            width: 300,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString();
            },
        },
        {
            field: "createdBy",
            headerName: "Created By",
            cellClassName: "name-column--cell--capitalize",
            width: 300,
            renderCell: (params) => {
                return (
                    <Box>
                        {`${params.row.createdBy.firstName} ${params.row.createdBy.lastName}`}
                    </Box>
                );
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 300,
            sortable: false,
            renderCell: (params) => {
                const handleEditClick = async (data) => {
                    setTempData(data)
                    handleOpenEdit();
                };
                return (
                    <>
                        <Button variant='text' size='small' color='primary' onClick={() => handleEditClick(params?.row)}><EditIcon /></Button>
                    </>
                );
            }
        },
    ];

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

    useEffect(() => {
        dispatch(fetchSmsTemplateData())
    }, [userAction])

    return (
        <div>
            <AddSmsTemplate open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />
            <EditSmsTemplate open={openEdit} handleClose={handleCloseEdit} setUserAction={setUserAction} tempData={tempData} />

            <Container maxWidth>
                <TableStyle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4">
                            SMS Template List
                        </Typography>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                            Add New
                        </Button>
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
                                    }))}
                                    components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchSmsTemplateData }) }}
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
        </div>
    )
}

export default SMSTemplate
