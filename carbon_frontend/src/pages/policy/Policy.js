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
import Iconify from '../../components/iconify';
import { fetchPolicyData } from '../../redux/slice/policySlice';
import { deleteManyApi } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import AddPolicy from './Add';

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchPolicyData }) {
  const [opendelete, setOpendelete] = useState(false);
  const dispatch = useDispatch()

  const handleCloseDelete = () => {
    setOpendelete(false)
  }

  const handleOpenDelete = () => {
    setOpendelete(true)
  }

  const deleteManyContact = async (data) => {
    await deleteManyApi('policy/deletemany', data)
    dispatch(fetchPolicyData())
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


const Policy = () => {

  const [policyList, setPolicyList] = useState([]);
  const [userAction, setUserAction] = useState(null)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userid = sessionStorage.getItem('user_id')
  const userRole = sessionStorage.getItem("userRole")
  const { data, isLoading } = useSelector((state) => state?.policyDetails)
  // open add model
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };


  const columns = [
    {
      field: "policyNumber",
      headerName: "Policy Number",
      width: 300,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/policy/view/${params.id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "policyType",
      headerName: "Policy Type",
      width: 300,
    },
    {
      field: "policyStartDate",
      headerName: "Policy Start Date",
      width: 300,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toDateString();
      },
    },
    {
      field: "policyEndDate",
      headerName: "Policy End Date",
      width: 300,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toDateString();
      },
    },
    {
      field: "policyStatus",
      headerName: "Policy Status",
      width: 300,
    }
  ];

  const csvColumns = [
    { Header: "Policy Number", accessor: 'policyNumber' },
    { Header: "Policy Type", accessor: 'policyType' },
    { Header: "Policy Start Date", accessor: 'policyStartDate', type: 'date' },
    { Header: "Policy End Date", accessor: 'policyEndDate', type: 'date' },
    { Header: "Policy Status", accessor: 'policyStatus' },
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
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "Policy", extension, setSelectedRowIds });
    } else {
      const AllRecordsWithSpecificFileds = formatRecords(data);
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "Policy", extension, setSelectedRowIds });
    }
  };
  const handleExportPolicy = (extension) => {
    if (selectedRowIds && selectedRowIds?.length > 0) {
      downloadCsvOrExcel(extension, selectedRowIds)
    } else {
      downloadCsvOrExcel(extension);
    }
  };

  useEffect(() => {
    dispatch(fetchPolicyData());
  }, [userAction])

  return (
    <>
      {/* Add Lead Model */}
      <AddPolicy open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

      <Container maxWidth>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" >
            Policy
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add New
            </Button>
            <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleClose(); handleExportPolicy('xlsx') }}>
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
                  components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchPolicyData }) }}
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

export default Policy