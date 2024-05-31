import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import DeleteModel from '../../components/Deletemodle';
import AddEdit from './AddEdit'
import { apidelete } from '../../service/api'
import { fetchProductionData } from '../../redux/slice/productionSlice'
import Iconify from '../../components/iconify'

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
    const { row, setUserAction, type, handleCloseAdd, openAdd, data } = props
    console.log(row.Material, "row----------");
    console.log(data, "datadatadatadata");
    const [open, setOpen] = useState(false)
    const [opendelete, setOpendelete] = useState(false);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [id, setId] = useState('')


    const handleDelete = async (id) => {
        const result = await apidelete(`api/production/${id}`)
        setUserAction(result)
        handleCloseDelete();
    }
    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

    const updatedData = []

    //     data.forEach( => {
    // console.log(item)
    //         // updatedData.push()
    //     });

    console.log(updatedData)
    const fData = data.filter((item) => item?.material === row?.Material)

    const handleCloseDelete = () => setOpendelete(false)
    const handleOpenDelete = () => setOpendelete(true)

    return (
        <>
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={handleDelete} id={id} />
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
                                    {row?.Details?.map((historyRow) => (
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

    const [userAction, setUserAction] = useState(null)
    const [type, setType] = useState('')
    const [selectedData, setSelectedData] = useState({})
    const [openAdd, setOpenAdd] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data, isLoading } = useSelector((state) => state?.productionDetails)

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    useEffect(() => {
        dispatch(fetchProductionData());
    }, [userAction])

    return (
        <>
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />
            <Paper>
                <div className='d-flex justify-content-between pt-3 px-5 pb-2 align-items-center'>
                    <Typography variant='h5' className='text-dark fw-bolder'>
                        Production
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} className="custom-btn" onClick={() => { handleOpenAdd(); setType("add") }}>
                        Add New
                    </Button>
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
                            {rows?.map((row, i) => (
                                <Row key={i} row={row} data={data} setUserAction={setUserAction} type={type} openAdd={openAdd} handleCloseAdd={handleCloseAdd} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </>
    )
}
