/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// @mui
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
// components
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
// sections
// mock
import moment from 'moment';
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify/Iconify';
import AddMeeting from '../../components/meeting/Addmeetings';
import { fetchMeetingData } from '../../redux/slice/meetingSlice';
import { deleteManyApi } from '../../service/api';
import { commonUtils } from '../../utils/utils';

// ----------------------------------------------------------------------
function CustomToolbar({ selectedRowIds, fetchMeetingData }) {
  const [opendelete, setOpendelete] = useState(false);
  const dispatch = useDispatch()
  const handleCloseDelete = () => setOpendelete(false);
  const handleOpenDelete = () => setOpendelete(true);



  const deleteManyMettings = async (data) => {
    await deleteManyApi('meeting/deletemany', data)
    dispatch(fetchMeetingData());
    handleCloseDelete();
  }

  return (
    <GridToolbarContainer>
      {/* <GridToolbar /> */}
      <Box padding={"10px 0"}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: 'Change density' } }}
        />

        {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize', fontSize: "13", padding: "4px 5px 2px  0", marginRight: "3px" }} startIcon={<DeleteIcon style={{ fontSize: '19px', marginLeft: "8px", marginBottom: "2px" }} />} onClick={handleOpenDelete}>Delete</Button>}
      </Box>
      <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyMettings} id={selectedRowIds} />
    </GridToolbarContainer>
  );
}

const Meeting = () => {
  const [openMeeting, setOpenMeeting] = useState(false);
  const [userAction, setUserAction] = useState(null);
  const [allMeeting, setAllMeeting] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector((state) => state?.meetingDetails)
  const userid = sessionStorage.getItem('user_id');
  const userRole = sessionStorage.getItem("userRole")

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  // open Meeting model
  const handleOpenMeeting = () => setOpenMeeting(true);
  const handleCloseMeeting = () => setOpenMeeting(false);

  const columns = [
    {
      field: "subject",
      headerName: "Subject",
      width: 215,
      cellClassName: "name-column--cell name-column--cell--capitalize",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/meeting/view/${params.row._id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 215,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 215,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 215,
    },
    {
      field: "status",
      headerName: "Status",
      width: 215,
    },
    {
      field: allMeeting.relatedTo === "Lead" ? "lead_id" : "contact_id",
      headerName: "Related To",
      cellClassName: " name-column--cell--capitalize",
      width: 215,
      renderCell: (params) => {
        return (
          <Box >
            {params?.row?.related ? params?.row?.related : '-'}
          </Box>
        );
      }
    },
    {
      field: "createdBy",
      headerName: "Created By",
      cellClassName: "name-column--cell--capitalize",
      width: 215,
      renderCell: (params) => {
         return (
          <Box >
            {params.row.createdUser}
          </Box>
        );
      }
    }
  ];
  const csvColumns = [
    {
      Header: "Subject", accessor: 'subject'
    },
    {
      Header: "Start Date", accessor: 'startDate', type: 'date'
    },
    {
      Header: "End Date", accessor: 'endDate', type: 'date'
    },
    {
      Header: "Duration", accessor: 'duration'
    },
    {
      Header: "Status", accessor: 'status'
    },
    {
      Header: "Related", accessor: 'relatedTo'
    },
    {
      Header: "Related To Name", accessor: 'related'
    },
    {
      Header: "Created By", accessor: 'createdUser'
    },
  ];

  const downloadCsvOrExcel = async (extension, selectedIds) => {
    const formatDateOfBirth = (dateString) => {
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
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "Meeting", extension, setSelectedRowIds });
    } else {
      const AllRecordsWithSpecificFileds = formatRecords(data);
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "Meeting", extension, setSelectedRowIds });
    }
  };
  const handleExportMeeting = (extension) => {
    if (selectedRowIds && selectedRowIds?.length > 0) {
      downloadCsvOrExcel(extension, selectedRowIds)
    } else {
      downloadCsvOrExcel(extension);
    }
  };

  useEffect(() => {
    dispatch(fetchMeetingData());
  }, [userAction])

  return (
    <>
      {/* Add Meeting */}
      <AddMeeting open={openMeeting} handleClose={handleCloseMeeting} setUserAction={setUserAction} />

      <Container maxWidth>
        <TableStyle>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">
              Meetings List
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenMeeting}>
                Add New
              </Button>
              <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportMeeting('xlsx') }}  >
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
                  components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchMeetingData }) }}
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

export default Meeting