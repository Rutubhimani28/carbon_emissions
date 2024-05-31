
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
// import { DataGrid, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import DeleteModel from '../../components/Deletemodle';
// import TableStyle from '../../components/TableStyle';
// import Iconify from '../../components/iconify';
// import { fetchContactUsData } from '../../redux/slice/contactUsSlice';
// import { commonUtils } from '../../utils/utils';
// import AddEdit from './AddEdit';
// import { apidelete } from '../../service/api';

// // ----------------------------------------------------------------------

// const Production = () => {

//     const [userAction, setUserAction] = useState(null)
//     const [selectedRowIds, setSelectedRowIds] = useState([]);
//     const [openAdd, setOpenAdd] = useState(false);
//     const [type, setType] = useState('')
//     const [selectedData, setSelectedData] = useState({})
//     const [opendelete, setOpendelete] = useState(false);
//     const [id, setId] = useState('')
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const { data, isLoading } = useSelector((state) => state?.contactUs)

//     const handleSelectionChange = (selectionModel) => {
//         setSelectedRowIds(selectionModel);
//     };
//     const handleOpenAdd = () => setOpenAdd(true);
//     const handleCloseAdd = () => setOpenAdd(false);

//     const handleCloseDelete = () => setOpendelete(false)
//     const handleOpenDelete = () => setOpendelete(true)

//     const columns = [
//         {
//             field: "material",
//             headerName: "Material",
//             flex: 1,
//             cellClassName: "name-column--cell--capitalize",
//         },
//         {
//             field: "totalArea",
//             headerName: "Total Area (m2)/ Amount",
//             flex: 1,
//         },
//         {
//             field: "action",
//             headerName: "Action",
//             sortable: false,
//             flex: 1,
//             renderCell: (params) => {
//                 const handleFirstNameClick = async (data) => {
//                     setSelectedData(data)
//                     handleOpenAdd();
//                 };
//                 const handleClick = async (data) => {
//                     setId(data?._id)
//                     handleOpenDelete();
//                 };
//                 return (
//                     <>
//                         <Button variant='text' size='small' color='primary' onClick={() => { handleFirstNameClick(params?.row); setType("edit") }}><EditIcon /></Button>
//                         <Button variant='text' size='small' color='primary' onClick={() => { handleClick(params?.row); }}><DeleteIcon color='error' /></Button>
//                     </>
//                 );
//             }
//         },

//     ];

//     const csvColumns = [
//         {
//             accessor: "firstName",
//             Header: "First Name"
//         },
//         {
//             accessor: "lastName",
//             Header: "Last Name"
//         },
//         {
//             accessor: "workEmail",
//             Header: "Email"
//         },
//         {
//             accessor: "mobile",
//             Header: "Mobile"
//         },
//         {
//             accessor: "organisation",
//             Header: "Organisation"
//         },
//         {
//             accessor: "designation",
//             Header: "Designation"
//         },
//         {
//             accessor: "message",
//             Header: "Message"
//         }
//     ];

//     const handleDelete = async (id) => {
//         const result = await apidelete(`api/production/${id}`)
//         setUserAction(result)
//         handleCloseDelete();
//     }

//     const downloadCsvOrExcel = async (extension, selectedIds) => {
//         if (selectedIds && selectedIds?.length > 0) {
//             const selectedRecordsWithSpecificFileds = data?.filter((rec) => selectedIds.includes(rec._id))?.map((rec) => {
//                 const selectedFieldsData = {};
//                 csvColumns?.forEach((item) => {
//                     selectedFieldsData[item.accessor] = rec[item.accessor];
//                 });
//                 return selectedFieldsData;
//             });
//             commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName: "User", extension, setSelectedRowIds });
//         } else {
//             const AllRecordsWithSpecificFileds = data?.map((rec) => {
//                 const selectedFieldsData = {};
//                 csvColumns?.forEach((item) => {
//                     selectedFieldsData[item?.accessor] = rec[item?.accessor];
//                 });
//                 return selectedFieldsData;
//             });
//             commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName: "User", extension, setSelectedRowIds });
//         }

//     };

//     const handleExportSms = (extension) => {
//         if (selectedRowIds && selectedRowIds?.length > 0) {
//             downloadCsvOrExcel(extension, selectedRowIds)
//         } else {
//             downloadCsvOrExcel(extension);
//         }
//     };

//     useEffect(() => {
//         dispatch(fetchContactUsData());
//     }, [userAction])

//     return (
//         <>
//             <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />
//             <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={handleDelete} id={id} />

//             <Container maxWidth>
//                 <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//                     <Typography variant="h4">
//                         Production
//                     </Typography>
//                     <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
//                         <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} className="custom-btn" onClick={() => { handleOpenAdd(); setType("add") }}>
//                             Add New
//                         </Button>

//                         {/* <Button variant="contained" startIcon={<CiExport icon="eva:plus-fill" />} onClick={() => { handleExportSms('xlsx') }} className='custom-btn'>
//                             {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}
//                         </Button> */}
//                     </Stack>
//                 </Stack>
//                 <TableStyle>
//                     <Box width="100%" >
//                         {isLoading ? (
//                             <Card style={{ display: 'flex', justifyContent: 'center', height: "600px" }}>
//                                 <span className="loader" />
//                             </Card>
//                         ) : (
//                             <Card style={{ height: "600px" }}>
//                                 <DataGrid
//                                     rows={data || []}
//                                     columns={columns}
//                                     // checkboxSelection
//                                     onRowSelectionModelChange={handleSelectionChange}
//                                     rowSelectionModel={selectedRowIds}
//                                     components={{
//                                         Toolbar: () => (<Box padding={"10px 0"}>
//                                             <GridToolbarColumnsButton />
//                                             <GridToolbarFilterButton />
//                                             <GridToolbarDensitySelector
//                                                 slotProps={{ tooltip: { title: 'Change density' } }}
//                                             />

//                                         </Box>)
//                                     }}
//                                     getRowId={row => row._id}
//                                 />
//                             </Card>
//                         )}

//                     </Box>
//                 </TableStyle>
//             </Container>
//         </>
//     );
// }

// export default Production






import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TablePagination from '@mui/material/TablePagination'

function createData(Material, Details = []) {
    return {
        Material,
        Details: [
            { TotalArea: '2', action: '' },
            { TotalArea: '2', action: '' },
            { TotalArea: '2', action: '' },
            { TotalArea: '2', action: '' }
        ]
    }
}
function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className='text-dark fw-bolder fs-6' component='th' scope='row'>
                    {row.Material}{' '}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box >
                            {/* <Typography variant='h6' gutterBottom component='div'>
                                Details
                            </Typography> */}
                            <Table size='small' aria-label='purchases'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='fw-bolder text-muted fs-6 text-center'>Total Area</TableCell>
                                        <TableCell className='fw-bolder text-muted fs-6 text-center'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.Details.map((historyRow) => (
                                        <TableRow key={historyRow.employee1} sx={{ borderBottom: 0 }}>

                                            <TableCell className='text-dark fw-bolder fs-6 text-center'>{historyRow.TotalArea}</TableCell>
                                            <TableCell className='text-dark fw-bolder fs-6 text-center'><span className="pe-4 text-success " style={{ cursor: "pointer" }}><EditIcon /></span><span style={{ cursor: "pointer" }}><DeleteIcon color='error' /></span> </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

const rows = [
    createData('Open Panel Timber Frame'),
    createData('MDF'),
    createData('Sawn Timber'),
    createData('Carpet'),
    createData('Adhesive Vinyl'),
    createData('Wood'),
    createData('Steel'),
    createData('Aluminium'),
    createData('Iron'),
    createData('Wooden Floor'),
    createData('Paint'),
    createData('Cotton Banner'),
    createData('Cardboard'),
    createData("paper"),
    createData('Polyester'),
    createData('Cotton canvas'),
    createData('Lanyards'),
    createData('Poly Ethelene'),
    createData('Nylon'),
]

export default function CollapsibleTable() {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    return (
        <>
            <Paper>
                <div className='d-flex justify-content-between pt-3 px-5'>
                    <Typography variant='h5' className='text-dark fw-bolder'>
                        Production
                    </Typography>

                </div>
                <TableContainer component={Paper}>
                    <Table aria-label='collapsible table'>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell className='fs-6 text-muted fw-bolder'>Material</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <Row key={row.employee} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    )
}
