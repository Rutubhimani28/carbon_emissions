import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { fetchUserData } from '../../redux/slice/userSlice';
import { commonUtils } from '../../utils/utils';
import { fetchContactUsData } from '../../redux/slice/contactUsSlice';
import { fetchEventsData } from '../../redux/slice/eventsSlice';

const EventVenue = () => {

    const [userAction, setUserAction] = useState(null)
    const [selectedRowIds, setSelectedRowIds] = useState([]);

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };
    const dispatch = useDispatch()

    const { data, isLoading } = useSelector((state) => state?.events)

    const columns = [
        {
            field: "firstName",
            headerName: "First Name",
            width: 200,
            cellClassName: "name-column--cell--capitalize",
        },
        {
            field: "lastName",
            headerName: "Last Name",
            cellClassName: "name-column--cell--capitalize",
            width: 200,
        },
        {
            field: "email",
            headerName: "Email",
            width: 300,
        },
        {
            field: "mobile",
            headerName: "Mobile",
            cellClassName: "name-column--cell--capitalize",
            width: 200,
        },
        {
            field: "designation",
            headerName: "Designation",
            cellClassName: "name-column--cell--capitalize",
            width: 200
        },
        {
            field: "organisationName",
            headerName: "Organisation",
            width: 300,
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
        dispatch(fetchEventsData("eventVenue"));
    }, [userAction])

    return (
        <>
            <Container maxWidth>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">
                        Event Venue
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                        {/* <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportSms('xlsx') }} >
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
    )
}

export default EventVenue
