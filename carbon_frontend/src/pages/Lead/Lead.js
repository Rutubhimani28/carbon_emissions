import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import { Box, Button, Card, Container, Stack, Typography, styled } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { CiExport, CiImport } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../../components/Deletemodle';
import ImportModel from '../../components/Import/ImportModel';
import SMSModel from '../../components/SMSModel';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import { fetchLeadData } from '../../redux/slice/leadSlice';
import { apipost, deleteManyApi } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import AddLead from './Add';
import EditModel from './Edit';

// ----------------------------------------------------------------------

const StyledMenu = styled((props) => (
  <Menu
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
  },
}));

function CustomToolbar({ selectedRowIds, fetchdata }) {
  const [opendelete, setOpendelete] = useState(false);
  const [smsModelOpen, setSmsModelOpen] = useState(false);
  const [userAction, setUserAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleCloseDelete = () => setOpendelete(false)

  const handleOpenDelete = () => setOpendelete(true)

  const handleSmsModelOpen = () => setSmsModelOpen(true)

  const handleSmsModelClose = () => setSmsModelOpen(false)

  const deleteManyLead = async (data) => {
    const result = await deleteManyApi('lead/deletemany', data)
    dispatch(fetchLeadData())
    setUserAction(result)
    handleCloseDelete();
  }

  const sendSMS = async (payload) => {
    setIsLoading(true)
    try {
      const result = await apipost('sms/lead', payload)
      if (result?.status === 200) {
        setUserAction(result)
        handleSmsModelClose();
        dispatch(fetchLeadData())
      } else {
        handleSmsModelClose();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
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

        {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize', fontSize: "15px", padding: "4px 5px 2px  0" }} startIcon={<SmsRoundedIcon style={{ fontSize: '19px', marginLeft: "8px" }} />} onClick={handleSmsModelOpen}>Send sms</Button>}
        {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize', fontSize: "13", padding: "4px 5px 2px  0", marginRight: "3px" }} startIcon={<DeleteIcon style={{ fontSize: '19px', marginLeft: "8px", marginBottom: "2px" }} />} onClick={handleOpenDelete}>Delete</Button>}
      </Box>
      <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyLead} id={selectedRowIds} />
      <SMSModel open={smsModelOpen} onClose={handleSmsModelClose} sendSMS={sendSMS} ids={selectedRowIds} isLoading={isLoading} />
    </GridToolbarContainer>
  );
}

const Lead = () => {

  const [userAction, setUserAction] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [leadData, setLeadData] = useState({})
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openImpt, setOpenImpt] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const userid = sessionStorage.getItem('user_id');

  const { data, isLoading } = useSelector((state) => state?.leadDetails)

  const fieldsInCrm = [
    { Header: "First Name", accessor: 'firstName', type: 'string', required: true },
    { Header: "Last Name", accessor: 'lastName', type: 'string', required: true },
    { Header: "Gender", accessor: 'gender', type: 'string', required: true },
    { Header: "Phone Number", accessor: 'phoneNumber', type: 'string' },
    { Header: "Email Address", accessor: 'emailAddress', type: 'string', required: true },
    { Header: "Title", accessor: 'title', type: 'string', required: true },
    { Header: "Address", accessor: 'address', type: 'string', required: true },
    { Header: "Date Of Birth", accessor: 'dateOfBirth', type: 'string', required: true },     // string in backend
    { Header: "Create Date", accessor: 'createdOn', type: 'date', isDisplay: false, defVal: new Date() },
    { Header: "Create By", accessor: 'createdBy', type: 'string', isDisplay: false, defVal: userid, required: true },
    { Header: "Deleted", accessor: 'deleted', type: 'boolean', isDisplay: false, defVal: false },
  ];

  const csvColumns = [
    { Header: "Title", accessor: 'title' },
    { Header: "First Name", accessor: 'firstName' },
    { Header: "Last Name", accessor: 'lastName' },
    { Header: "Gender", accessor: 'gender' },
    { Header: "Phone Number", accessor: 'phoneNumber' },
    { Header: "Email Address", accessor: 'emailAddress' },
    { Header: "Date Of Birth", accessor: 'dateOfBirth' },
    { Header: "Address", accessor: 'address' },
    { Header: "Create Date", accessor: 'createdOn' },
  ];

  // open edit model
  const handleOpenEdit = () => setOpenEdit(true);;
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleFirstNameClick = (id) => {
    navigate(`/dashboard/lead/view/${id}`)
  };
  const handleOpenImpt = () => {
    setOpenImpt(true);
    handleClose()
  };
  const handleCloseImpt = () => setOpenImpt(false);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const columns = [
    {
      field: "firstName",
      headerName: "Frist Name",
      width: 230,
      cellClassName: "name-column--cell name-column--cell--capitalize",
      renderCell: (params) => {
        return (
          <Box onClick={() => handleFirstNameClick(params?.row?._id)}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 230,
      cellClassName: "name-column--cell--capitalize",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 180,
    },
    {
      field: "emailAddress",
      headerName: "Email Address",
      width: 250,
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
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const handleFirstNameClick = async (data) => {
          setLeadData(data)
          handleOpenEdit();
        };
        return (
          <>
            <Button variant='text' size='small' color='primary' onClick={() => handleFirstNameClick(params?.row)}><EditIcon /></Button>
          </>
        );
      }
    },
  ];


  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  const downloadCsvOrExcel = async (extension, selectedIds) => {
    const formatDateOfBirth = (dateString, filednm) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      if (filednm === "dateOfBirth") {
        return moment(dateString).format('DD/MM/YYYY')
      }
      return moment(dateString).format('DD/MM/YYYY HH:MM A')

    };

    const formatRecords = (records) => {
      return records.map((rec) => {
        const selectedFieldsData = {};
        csvColumns?.forEach((item) => {
          if (item?.accessor === 'dateOfBirth') {
            selectedFieldsData[item?.accessor] = formatDateOfBirth(rec[item?.accessor], "dateOfBirth");
          } else if (item?.accessor === 'createdOn') {
            selectedFieldsData[item?.accessor] = formatDateOfBirth(rec[item?.accessor], "createdOn");
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
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "Lead", extension, setSelectedRowIds });
    } else {
      const AllRecordsWithSpecificFileds = formatRecords(data);
      commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "Lead", extension, setSelectedRowIds });
    }
  };

  const handleExportLeads = (extension) => {
    if (selectedRowIds && selectedRowIds.length > 0) {
      downloadCsvOrExcel(extension, selectedRowIds);
    } else {
      downloadCsvOrExcel(extension);
    }
  };


  useEffect(() => {
    dispatch(fetchLeadData())
  }, [userAction])
  return (
    <>
      {/* Add Lead Model */}
      <AddLead open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />
      {/* Edit Lead Model */}
      <EditModel open={openEdit} handleClose={handleCloseEdit} setUserAction={setUserAction} leadData={leadData} />

      <ImportModel open={openImpt} handleClose={handleCloseImpt} moduleName="Leads" api="lead/addMany" back="/dashboard/lead" fieldsInCrm={fieldsInCrm} />

      <Container maxWidth>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"}>
          <Typography variant="h4" >
            Lead
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add New
            </Button>
            <div>
              <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Action
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleOpenImpt} disableRipple>
                  <CiImport style={{ marginRight: "7px" }} />
                  Import
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); handleExportLeads('xlsx') }} disableRipple>
                  <CiExport style={{ marginRight: "7px" }} />
                  {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}
                </MenuItem>
              </StyledMenu>
            </div>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            {isLoading ? (
              <Card style={{ display: 'flex', justifyContent: 'center', height: "600px" }}>
                <span className="loader" />
              </Card>
            ) : (
              <Card style={{ height: "600px" }} className='tableWraper'>
                <DataGrid
                  rows={data || []}
                  columns={columns.map((column, index) => ({
                    ...column,
                    disableColumnMenu: index === columns.length - 1 // Disable menu icon for the last column
                  }))}
                  components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchLeadData }) }}
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

export default Lead