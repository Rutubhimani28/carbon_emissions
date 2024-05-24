
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { fetchUserData } from '../../redux/slice/userSlice';
import AddUser from './Add';
import { commonUtils } from '../../utils/utils';

// ----------------------------------------------------------------------

const User = () => {

    const [allUser, setAllUser] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [userAction, setUserAction] = useState(null)
    const [selectedRowIds, setSelectedRowIds] = useState([]);

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data, isLoading } = useSelector((state) => state?.userDetails)

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const columns = [
        {
            field: "firstName",
            headerName: "First Name",
            width: 300,
            cellClassName: "name-column--cell name-column--cell--capitalize",
            renderCell: (params) => {
                const handleFirstNameClick = () => {
                    navigate(`/dashboard/user/view/${params.row._id}`)
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
            cellClassName: "name-column--cell--capitalize",
            width: 300,

        },
        {
            field: "emailAddress",
            headerName: "Email Address",
            width: 400,
        },
        {
            field: "role",
            headerName: "Role",
            cellClassName: "name-column--cell--capitalize",
            width: 300
        }
    ];
    const csvColumns = [
        {
            Header: "First Name", accessor: 'firstName'
        },
        {
            Header: "Last Name", accessor: 'lastName'
        },
        {
            Header: "Email Address", accessor: 'emailAddress'
        },
        {
            Header: "Role", accessor: 'role'
        }
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
            <AddUser open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

            <Container maxWidth>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
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
                                    checkboxSelection
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

export default User