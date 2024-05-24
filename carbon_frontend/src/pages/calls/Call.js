/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import AddCall from '../../components/call/Addcalls';
import Iconify from '../../components/iconify/Iconify';
import { fetchCallData } from '../../redux/slice/callSlice';
import { deleteManyApi } from '../../service/api';
import { commonUtils } from '../../utils/utils';


// ----------------------------------------------------------------------
const CustomToolbar = ({ selectedRowIds, fetchCallData }) => {
  const [opendelete, setOpendelete] = useState(false);
  const dispatch = useDispatch()
  // open DeleteModel
  const handleCloseDelete = () => setOpendelete(false);
  const handleOpenDelete = () => setOpendelete(true);

  const deleteManyCalls = async (data) => {
    await deleteManyApi('call/deletemany', data)
    dispatch(fetchCallData());
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

const Call = () => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [openCall, setOpenCall] = useState(false);
  const [userAction, setUserAction] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector((state) => state?.callDetails)

  // open call model
  const handleOpenCall = () => setOpenCall(true);
  const handleCloseCall = () => setOpenCall(false);

  const userid = sessionStorage.getItem('user_id');
  const userRole = sessionStorage.getItem("userRole")

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  const columns = [
    {
      field: "subject",
      headerName: "Subject",
      width: 250,
      cellClassName: "name-column--cell name-column--cell--capitalize",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/call/view/${params.row._id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "startDateTime",
      headerName: "Start Date & Time",
      width: 250,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },

    { field: "duration", headerName: "Duration", headerAlign: "left", align: "left", width: 250 },
    { field: "status", headerName: "Status", headerAlign: "left", align: "left", width: 250 },
    {
      field: data?.relatedTo === "Lead" ? "lead_id" : "contact_id",
      headerName: "Related To",
      cellClassName: " name-column--cell--capitalize",
      width: 250,
      renderCell: (params) => {
        return (
          <Box >
            {params?.row?.related ? params?.row?.related : "-"}
          </Box>
        );
      }
    },
    {
      field: "createdBy",
      headerName: "Created By",
      cellClassName: " name-column--cell--capitalize",
      width: 250,
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
      Header: "Start Date & Time", accessor: 'startDateTime', type: 'date'
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
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "Call", extension, setSelectedRowIds });
    } else {
      const AllRecordsWithSpecificFileds = formatRecords(data);
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "Call", extension, setSelectedRowIds });
    }
  };

  const handleExportCall = (extension) => {
    if (selectedRowIds && selectedRowIds?.length > 0) {
      downloadCsvOrExcel(extension, selectedRowIds)
    } else {
      downloadCsvOrExcel(extension);
    }
  };


  useEffect(() => {
    dispatch(fetchCallData());
  }, [userAction])

  return (
    <>
      {/* Add Calls */}
      <AddCall open={openCall} handleClose={handleCloseCall} setUserAction={setUserAction} />

      <Container maxWidth>
        <TableStyle>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">
              Calls List
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenCall}>
                Add New
              </Button>
              <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportCall('xlsx') }}   >
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
                  rows={data || []}
                  columns={columns}
                  components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchCallData }) }}
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

export default Call