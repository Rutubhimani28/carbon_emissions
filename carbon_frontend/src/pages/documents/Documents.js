import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { constant } from '../../constant';
import { fetchDocumentData } from '../../redux/slice/documentSlice';
import { apidelete, apiget, deleteManyApi } from '../../service/api';
import AddDocument from './Add';
import AssignToUserModel from './AssignTo';
// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchDocumentData }) {
    const [opendelete, setOpendelete] = useState(false);
    const dispatch = useDispatch()
    const handleCloseDelete = () => {
        setOpendelete(false)
    }

    const handleOpenDelete = () => {
        setOpendelete(true)
    }

    // delete many api
    const deleteManyContact = async (data) => {
        await deleteManyApi('document/deletemany', data)
        dispatch(fetchDocumentData());
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
                {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize', fontSize: "13", padding: "4px 5px 2px  0", marginRight: "3px" }} startIcon={<DeleteIcon style={{ fontSize: '19px', marginLeft: "8px", marginBottom: "2px" }} />} onClick={handleOpenDelete}>Delete</Button>}
            </Box>
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyContact} id={selectedRowIds} />

        </GridToolbarContainer>
    );
}

const Documents = () => {
    const [userAction, setUserAction] = useState(null);
    const [documentList, setDocumentList] = useState([])
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [openAssignTo, setOpenAssignTo] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [docId, setDocId] = useState("")
    const [documentId, setDocumentId] = useState('');
    const dispatch = useDispatch()
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");

    const { data, isLoading } = useSelector((state) => state?.documentDetails)

    const handleOpenAdd = () => {
        setOpenAdd(true)
    }
    const handleCloseAdd = () => {
        setOpenAdd(false)
    }
    const handleCloseDelete = () => {
        setDocId("")
        setOpendelete(false)
    }

    const handleOpenDelete = (id) => {
        setDocId(id)
        setOpendelete(true)
    }
    const handleOpenAssignTo = (id) => {
        setDocumentId(id);
        setOpenAssignTo(true)
    }

    const handleCloseAssignTo = () => {
        setOpenAssignTo(false)
    }

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

    // file download api
    const downloadFile = async (id) => {
        const result = await apiget(`document/file/${id}`)
        setUserAction(result)
    }

    // file delete api
    const deleteFile = async (id) => {
        const result = await apidelete(`document/delete/${id}`)
        setUserAction(result)
    }

    const columns = [
        {
            field: "file",
            headerName: "File",
            width: 370,
        },

        {
            field: "fileName",
            headerName: "File Name",
            width: 370,
        },
        {
            field: "createdOn",
            headerName: "CreateOn",
            width: 370,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toDateString();
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 370,
            sortable: false,
            renderCell: (params) => {
                const handleFirstNameClick = async () => { downloadFile(params.row._id) };
                const downloadUrl = `${constant.baseUrl}document/file/${params.row._id}`;

                return (
                    <Box onClick={handleFirstNameClick}>
                        <Stack direction={"row"} spacing={2}>
                            <a href={downloadUrl}><Button variant='contained' size='small'>Download</Button></a>
                            {userRole !== "user" && <Button variant='outlined' size='small' onClick={() => handleOpenAssignTo(params.row._id)}>Assign To User</Button>}
                        </Stack>

                    </Box>
                );
            }
        },

    ];

    // fetch documents list
    useEffect(() => {
        dispatch(fetchDocumentData());
    }, [userAction])
    return (
        <>
            {/* Add Document Model */}
            <AddDocument open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

            <AssignToUserModel open={openAssignTo} handleClose={handleCloseAssignTo} documentId={documentId} />
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteFile} id={docId} />

            <Container maxWidth>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">
                        Documents
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                            Add New
                        </Button>
                    </Stack>
                </Stack>
                <TableStyle>
                    <Box width="100%">
                        {isLoading ? (
                            <Card style={{ display: 'flex', justifyContent: 'center', height: "600px" }}>
                                <span className="loader" />
                            </Card>
                        ) : (
                            <Card style={{ height: "600px" }}>
                                <DataGrid
                                    rows={data}
                                    columns={columns.map((column, index) => ({
                                        ...column,
                                        disableColumnMenu: index === columns.length - 1 // Disable menu icon for the last column
                                    }))} components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchDocumentData }) }}
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

export default Documents