import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify/Iconify';
import { fetchSmsData } from '../../redux/slice/smsSlice';
import { deleteManyApi } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import Add from './Add';

// ----------------------------------------------------------------------
function CustomToolbar({ selectedRowIds, fetchSmsData }) {
  const [opendelete, setOpendelete] = useState(false);
  const dispatch = useDispatch()
  const handleCloseDelete = () => setOpendelete(false)

  const handleOpenDelete = () => setOpendelete(true)

  const deleteManyTasks = async (data) => {
    const result = await deleteManyApi('task/deletemany', data)
    dispatch(fetchSmsData());
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
      <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyTasks} id={selectedRowIds} />
    </GridToolbarContainer>
  );
}

const Sms = () => {
  const [allSms, setAllSms] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [openNew, setOpenNew] = useState(false);
  const [userAction, setUserAction] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userid = sessionStorage.getItem('user_id');
  const userRole = sessionStorage.getItem("userRole")

  const { data, isLoading } = useSelector((state) => state?.smsDetails)

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  // open task model
  const handleOpenTask = () => setOpenNew(true);
  const handleCloseTask = () => setOpenNew(false);

  const statusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'pending'
      case 'deliverd':
        return 'deliverd'
      case 'failed':
        return 'failed'
      default:
        return 'deliverd'

    }
  }

  const columns = [
    {
      field: "senderName",
      headerName: "Sender Name",
      cellClassName: "name-column--cell name-column--cell--capitalize",
      width: 250,
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/sms/view/${params.row._id}`)
        };
        return (
          <Box onClick={handleFirstNameClick}>
            {params.value ? params.value : '-'}
          </Box>
        );
      }
    },
    {
      field: "reciverName",
      headerName: "Reciver Name",
      cellClassName: " name-column--cell--capitalize",
      width: 280,
      renderCell: (params) => {
        return (
          <Box>
            {params?.row?.reciverName ? params?.row?.reciverName : '--'}
          </Box>
        );
      }
    },

    {
      field: allSms.relatedTo === "Lead" ? "lead_id" : "contact_id",
      headerName: "Related To",
      cellClassName: "name-column--cell--capitalize",
      width: 250,
      renderCell: (params) => {
        return (
          <Box >
            {params?.row?.relatedTo ? params?.row?.relatedTo : '--'}
          </Box>
        );
      }
    },
    {
      field: "reciverNumber",
      headerName: "Receiver Number",
      width: 150,
      renderCell: (params) => {
        return (
          <Box>
            {params.value ? params.value : '-'}
          </Box>
        );
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 250,
      headerClassName: 'status-column--cell',

      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              variant="outlined"
              className={statusColor(params?.value?.toLowerCase())}
            >
              {params?.value ? params?.value : '--'}
            </Button>
          </Box>
        );
      },
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 250,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },

  ];
  const csvColumns = [
    {
      Header: "Sender Name", accessor: 'senderName'
    },
    {
      Header: "Reciver Name", accessor: 'reciverName'
    },
    {
      Header: "Related To", accessor: 'relatedTo'
    },
    {
      Header: "Reciver Number", accessor: 'reciverNumber'
    },
    {
      Header: "Status", accessor: 'status'
    },
    {
      Header: "Start Time", accessor: 'startTime', type: 'date'
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
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "SMS", extension, setSelectedRowIds });
    } else {
      const AllRecordsWithSpecificFileds = formatRecords(data);
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "SMS", extension, setSelectedRowIds });
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
    dispatch(fetchSmsData());
  }, [userAction])

  return (
    <>

      {/* Add Tasks */}
      <Add open={openNew} handleClose={handleCloseTask} setUserAction={setUserAction} />

      <Container maxWidth>
        <TableStyle>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">
              Sms List
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenTask}>
                Add New
              </Button>
              <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportSms('xlsx') }}  >
                {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}

              </Button>
            </Stack>
          </Stack>
          <Box width="100%" >
            {isLoading ? (
              <Card style={{ display: 'flex', justifyContent: 'center', height: "600px" }}>
                <span className="loader" />
              </Card>
            ) : (
              <Card style={{ height: "600px" }}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchSmsData }) }}
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

export default Sms