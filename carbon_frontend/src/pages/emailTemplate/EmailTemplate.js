import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify/Iconify';
import { fetchTemplateData } from '../../redux/slice/emailTemplateSlice';
import { deleteManyApi } from '../../service/api';

function CustomToolbar({ selectedRowIds, fetchTemplateData }) {
    const [opendelete, setOpendelete] = useState(false);
    const [userAction, setUserAction] = useState(null);
    const dispatch = useDispatch();
    const handleCloseDelete = () => setOpendelete(false)

    const handleOpenDelete = () => setOpendelete(true)

    const deleteManyEmailTemplate = async (data) => {
        const result = await deleteManyApi('emailtemplate/deletemanny', data)
        dispatch(fetchTemplateData())
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
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyEmailTemplate} id={selectedRowIds} />
        </GridToolbarContainer>
    );
}

const EmailTemplate = () => {

    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");

    const { data, isLoading } = useSelector((state) => state?.tempDetails)

    const columns = [
        {
            field: "name",
            headerName: "Template Name",
            width: 370,
            cellClassName: "name-column--cell name-column--cell--capitalize",
            renderCell: (params) => {
                const handleFirstNameClick = () => {
                    navigate(`/dashboard/emailtemplate/view/${params.row._id}`)
                };

                return (
                    <Box onClick={handleFirstNameClick}>
                        {params.value}
                    </Box>
                );
            }

        },
        {
            field: "createdOn",
            headerName: "CreatedOn",
            width: 370,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString();
            },
        },
        {
            field: "modifiedOn",
            headerName: "ModifiedOn",
            width: 370,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString();
            },
        },
        {
            field: "createdBy",
            headerName: "Created By",
            cellClassName: "name-column--cell--capitalize",
            width: 370,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.row.createdUser}
                    </Box>
                );
            }
        }
    ];

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

    useEffect(() => {
        dispatch(fetchTemplateData())
    }, [])


    return (
        <div>
            <Container maxWidth>
                <TableStyle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4">
                            Email Template List
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} >
                                <Link to="/dashboard/emailtemplate/add" style={{ textDecoration: "none", color: "white" }}>Add New</Link>
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
                                    rows={data || []}
                                    columns={columns}
                                    components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchTemplateData }) }}
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

export default EmailTemplate
