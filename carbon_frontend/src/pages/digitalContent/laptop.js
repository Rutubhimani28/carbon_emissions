import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import TableStyleTwo from '../../components/TableStyleTwo';
import AddEdit from './AddEdit';
import { apidelete } from '../../service/api';
import DeleteModel from '../../components/Deletemodle';

const Laptop = ({ rows, toggleVisibilityLaptop, isVisibleLaptop, setUserAction }) => {

    const [type, setType] = useState('')
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedData, setSelectedData] = useState({})
    const [opendelete, setOpendelete] = useState(false);
    const [id, setId] = useState('')

    const laptop = rows?.filter((item) => item?.type === 'Laptop')

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleCloseDelete = () => setOpendelete(false)
    const handleOpenDelete = () => setOpendelete(true)

    const handleDelete = async (id) => {
        const result = await apidelete(`api/digitalContent/${id}`)
        setUserAction(result)
        handleCloseDelete();
    }


    const columns = [
        {
            field: "noOfAttendees",
            headerName: "No. of Attendees",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },
        {
            field: "noOfHours",
            headerName: "No. of Hours",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },
        {
            field: "serviceLifeOfLaptop",
            headerName: "Service life of Laptop",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box >
                        {params.value ? params.value : '-'}
                    </Box>
                );
            }
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                const handleFirstNameClick = async (data) => {
                    setSelectedData(data)
                    handleOpenAdd();
                };
                const handleClick = async (data) => {
                    setId(data?._id)
                    handleOpenDelete();
                };
                return (
                    <>
                        <Button variant='text' size='small' color='primary' onClick={() => { handleFirstNameClick(params?.row); setType("edit") }}><EditIcon /></Button>
                        <Button variant='text' size='small' color='primary' onClick={() => { handleClick(params?.row); }}><DeleteIcon /></Button>
                    </>
                );
            }
        },
    ];


    return (
        <div>
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={handleDelete} id={id} />

            <Box style={{ cursor: "pointer" }} p={2}>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                        <Stack direction="row" spacing={1} alignItems={"center"}>
                            {/* <Button
                                onClick={toggleVisibilityLaptop}
                                color="secondary"
                                className='custom-btn'
                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px", backgroundColor: "#4ABD43" }}
                            >
                                {isVisibleLaptop ? <RemoveIcon /> : <AddIcon />}
                            </Button> */}
                            <Typography variant="h5">Laptop</Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Box>
            {/* {
                isVisibleLaptop && */}
            <TableStyleTwo>
                <Box width="100%" height="50vh">
                    <DataGrid
                        rows={laptop || []}
                        columns={columns.map((column, index) => ({
                            ...column,
                            disableColumnMenu: index === columns.length - 1 // Disable menu icon for the last column
                        }))}
                        getRowId={row => row._id}
                        columnHeaderHeight={40}
                        disableSelectionOnClick
                        onRowClick={(params, event) => {
                            event.defaultMuiPrevented = true;
                        }}
                    />
                </Box>
            </TableStyleTwo>
            {/* } */}
        </div>
    )
}

export default Laptop
