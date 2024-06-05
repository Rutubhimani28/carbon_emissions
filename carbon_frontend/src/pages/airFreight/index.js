import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Button, Container } from '@mui/material'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteModel from '../../components/Deletemodle'
import Iconify from '../../components/iconify'
import { fetchAirFreightData } from '../../redux/slice/airFreightSlice'
import { apidelete } from '../../service/api'
import AddEdit from './AddEdit'

function Row(props) {
    const { row, setUserAction, setType, setSelectedData, handleOpenAdd } = props
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [opendelete, setOpendelete] = useState(false);
    const [id, setId] = useState('')

    const handleDelete = async (id) => {
        setIsLoading(true)
        try {
            const result = await apidelete(`api/airFreight/${id}`)
            setUserAction(result)
            handleCloseDelete();
        } catch (error) {
            console.error('Error deleting logistics:', error);
        }
        setIsLoading(false)
    };

    const handleCloseDelete = () => setOpendelete(false)

    return (
        <>
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={handleDelete} id={id} isLoading={isLoading} />
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className='text-dark fw-bolder fs-6' component='th' scope='row'>
                    {row.name}{' '}
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
                                        <TableCell className='fw-bolder text-muted fs-6 text-center'>No of Kms</TableCell>
                                        <TableCell className='fw-bolder text-muted fs-6 text-center'>Weight in Kgs</TableCell>
                                        <TableCell className='fw-bolder text-muted fs-6 text-center'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row?.details?.map((historyRow, i) => (
                                        <TableRow key={i} sx={{ borderBottom: 0 }}>
                                            <TableCell className='text-dark fw-bolder fs-6 text-center'>{historyRow?.noOfKms || '-'}</TableCell>
                                            <TableCell className='text-dark fw-bolder fs-6 text-center'>{historyRow?.weightInKgs || '-'}</TableCell>
                                            <TableCell className='text-dark fw-bolder fs-6 text-center'><span className="pe-4 text-success " style={{ cursor: "pointer" }}><EditIcon onClick={() => { handleOpenAdd(); setType('edit'); setSelectedData(historyRow) }} /></span><span style={{ cursor: "pointer" }}><DeleteIcon color='error' onClick={() => { setId(historyRow?._id); setOpendelete(true) }} /></span> </TableCell>
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

export default function CollapsibleTable() {

    const [userAction, setUserAction] = useState(null)
    const [type, setType] = useState('')
    const [selectedData, setSelectedData] = useState({})
    const [openAdd, setOpenAdd] = useState(false);
    const dispatch = useDispatch()

    const { data, isLoading } = useSelector((state) => state?.airFreightDetails)

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const updatedData = data.reduce((acc, obj) => {
        const existing = acc.find(item => item?.name === obj?.type);
        if (existing) {
            existing.details.push({ ...obj });
        } else {
            acc.push({ name: obj.type, details: [{ ...obj }] });
        }
        return acc;
    }, []);

    useEffect(() => {
        dispatch(fetchAirFreightData());
    }, [userAction])

    return (
        <>
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />
            <Container maxWidth>
                <Paper>
                    <div className='d-flex justify-content-between pt-3  pb-2 align-items-center'>
                        <Typography variant='h5' className='text-dark fw-bolder'>
                            Logistics
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
                                    <TableCell className='fs-6 text-muted fw-bolder'>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    isLoading ?
                                        <TableRow>
                                            <TableCell className='text-center' colSpan={2}> <span className="loader" /></TableCell>
                                        </TableRow>
                                        :
                                        updatedData?.map((row, i) => (
                                            <Row key={i} row={row} data={data} setUserAction={setUserAction} type={type} setSelectedData={setSelectedData} setType={setType} openAdd={openAdd} handleOpenAdd={handleOpenAdd} />
                                        ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>
            </Container>
        </>
    )
}
