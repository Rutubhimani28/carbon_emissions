import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import moment from "moment";
import { useEffect, useState } from 'react';
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { fetchPaymentData } from '../../redux/slice/paymentSlice';
import { commonUtils } from '../../utils/utils';
import MakeNewPayment from './Add';

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchdata }) {
    const [userAction, setUserAction] = useState(null);
    const userid = sessionStorage.getItem('user_id');
    const dispatch = useDispatch()

    useEffect(() => {
        setUserAction(userAction)
    }, [userAction])

    return (
        <GridToolbarContainer>
            <GridToolbar />
        </GridToolbarContainer>
    );
}

const Payment = () => {

    const [userAction, setUserAction] = useState(null);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { data, isLoading } = useSelector((state) => state.paymentDetails)

    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const columns = [
        {
            field: "firstName",
            headerName: "First Name",
            width: 250,
            cellClassName: "name-column--cell name-column--cell--capitalize",
            renderCell: (params) => {
                const handleFirstNameClick = () => {
                    navigate(`/dashboard/payment/view/${params.row._id}`)
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
            cellClassName: "name-column--cell--capitalize",
        },
        {
            field: "emailAddress",
            headerName: "Email Address",
            width: 300,
        },
        {
            field: "senderPhoneNumber",
            headerName: "Phone Number",
            width: 250,
        },
        {
            field: "accountNo",
            headerName: "Account Number",
            width: 180,
        },
        {
            field: "amount",
            headerName: "Amount",
            width: 180,
        },
        {
            field: "status",
            headerName: "Status",
            width: 250,
        },
        {
            field: "createdOn",
            headerName: "Transaction Date",
            width: 250,
            renderCell: (params) => {
                return (
                    <>
                        {moment(params?.row?.createdOn).format('lll')}
                    </>
                );
            }
        }
    ];

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };
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
            Header: "Phone Number", accessor: 'senderPhoneNumber'
        },
        {
            Header: "Amount", accessor: 'amount'
        },
        {
            Header: "Status", accessor: 'status'
        },
        {
            Header: "Transaction Date", accessor: 'modifiedOn', type: 'date'
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
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "Payment", extension, setSelectedRowIds });
        } else {
            const AllRecordsWithSpecificFileds = formatRecords(data);
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "Payment", extension, setSelectedRowIds });
        }
    };

    const handleExportPayments = (extension) => {
        if (selectedRowIds && selectedRowIds?.length > 0) {
            downloadCsvOrExcel(extension, selectedRowIds)
        } else {
            downloadCsvOrExcel(extension);
        }
    };

    useEffect(() => {
        dispatch(fetchPaymentData());
    }, [userAction])

    return (
        <>
            <MakeNewPayment open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

            <Container maxWidth>
                <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"}>
                    <Typography variant="h4" >
                        Payment
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                            Make New Payment
                        </Button>

                        <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportPayments('xlsx') }} >
                            {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}

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
                                    rows={data || []}
                                    columns={columns}
                                    components={{
                                        Toolbar: () => (<Box padding={"10px 0"}>
                                            <GridToolbarColumnsButton />
                                            <GridToolbarFilterButton />
                                            <GridToolbarDensitySelector
                                                slotProps={{ tooltip: { title: 'Change density' } }}
                                            />
                                        </Box>)
                                    }}
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

export default Payment