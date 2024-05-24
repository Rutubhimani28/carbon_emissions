/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import moment from "moment";
import { CiExport } from "react-icons/ci";
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import AddTask from '../../components/task/AddTask';
import { fetchTaskData } from '../../redux/slice/taskSlice';
import { deleteManyApi } from '../../service/api';
import { commonUtils } from '../../utils/utils';



// ----------------------------------------------------------------------
function CustomToolbar({ selectedRowIds, fetchTaskData }) {
  const [opendelete, setOpendelete] = useState(false);
  const dispatch = useDispatch()
  const handleCloseDelete = () => setOpendelete(false)

  const handleOpenDelete = () => setOpendelete(true)

  const deleteManyTasks = async (data) => {
    const result = await deleteManyApi('task/deletemany', data)
    dispatch(fetchTaskData());
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
      <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyTasks} id={selectedRowIds} />
    </GridToolbarContainer>
  );
}

const Task = () => {
  const [allTask, setAllTask] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [openTask, setOpenTask] = useState(false);
  const [userAction, setUserAction] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userid = sessionStorage.getItem('user_id');
  const userRole = sessionStorage.getItem("userRole")
  const { data, isLoading } = useSelector((state) => state?.taskDetails)

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  // open task model
  const handleOpenTask = () => setOpenTask(true);
  const handleCloseTask = () => setOpenTask(false);

  const columns = [
    {
      field: "subject",
      headerName: "Subject",
      width: 200,
      cellClassName: "name-column--cell name-column--cell--capitalize",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/task/view/${params.row._id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
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
              className={statusColor(params?.value)}
            >
              {params?.value}
            </Button>
          </Box>
        );
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 200,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 200,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 250,
      headerClassName: 'status-column--cell',
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              variant="outlined"
              className={priorityColor(params?.value?.toLowerCase())}
            >
              {params?.value}
            </Button>
          </Box>
        );
      },
    },
    {
      field: data?.relatedTo === "Lead" ? "lead_id" : "contact_id",
      headerName: "Related To",
      cellClassName: " name-column--cell--capitalize",
      width: 200,
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
      width: 200,
      renderCell: (params) => {
        return (
          <Box >
            {params.row.createdUser ? params.row.createdUser : "-"}
          </Box>
        );
      }
    },
    {
      field: "createdOn",
      headerName: "Create Date",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {moment(params?.row?.createdOn).format('lll')}
          </>
        );
      }
    },


  ];
  const csvColumns = [
    {
      Header: "Subject", accessor: 'subject'
    },
    { Header: "Status", accessor: 'status' },
    {
      Header: "Start Date", accessor: 'startDate', type: 'date'
    },
    {
      Header: "End Date", accessor: 'endDate', type: 'date'
    },
    { Header: "Priority", accessor: 'priority' },
    {
      Header: "Related", accessor: 'relatedTo'
    },
    {
      Header: "Related To Name", accessor: 'related'
    },
    {
      Header: "Created By", accessor: 'createdUser'
    },
    {
      Header: "Create Date", accessor: 'createdOn', type: 'date'
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
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "Task", extension, setSelectedRowIds });
    } else {
      const AllRecordsWithSpecificFileds = formatRecords(data);
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "Task", extension, setSelectedRowIds });
    }
  };


  const handleExportTask = (extension) => {
    if (selectedRowIds && selectedRowIds?.length > 0) {
      downloadCsvOrExcel(extension, selectedRowIds)
    } else {
      downloadCsvOrExcel(extension);
    }
  };
  const priorityColor = (status) => {
    switch (status) {
      case 'medium':
        return 'pending'
      case 'low':
        return 'deliverd'
      case 'high':
        return 'failed'
      default:
        return 'deliverd'

    }
  }
  const statusColor = (status) => {
    switch (status) {
      case 'Pending Input':
        return 'pending'
      case 'Completed':
        return 'deliverd'
      case 'In Progress':
        return 'inProgress'
      case 'Note Started':
        return 'failed'
      case 'Deferred':
        return 'Deferred'
      default:
        return 'inProgress'

    }
  }

  useEffect(() => {
    dispatch(fetchTaskData())
  }, [userAction])

  return (
    <>

      {/* Add Tasks */}
      <AddTask open={openTask} handleClose={handleCloseTask} setUserAction={setUserAction} />

      <Container maxWidth>
        <TableStyle>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">
              Tasks
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenTask}>
                Add New
              </Button>
              <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportTask('xlsx') }}>
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
                  components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchTaskData }) }}
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

export default Task