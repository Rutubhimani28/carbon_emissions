/* eslint-disable react/prop-types */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import TableStyleTwo from '../../components/TableStyleTwo';
import AddEdit from './AddEdit';

const Emails = ({ rows, toggleVisibilityEmails, isVisibleEmails, setUserAction }) => {

    const [type, setType] = useState('')
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedData, setSelectedData] = useState({})

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const emails = rows?.filter((item) => item?.type === 'Emails')

    const columns = [
        {
            field: "count",
            headerName: "Count",
            width: 400,
            valueFormatter: (params) => params.value,
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 200,
            renderCell: (params) => {
                const handleFirstNameClick = async (data) => {
                    setSelectedData(data)
                    handleOpenAdd();
                };
                return (
                    <>
                        <Button variant='text' size='small' color='primary' onClick={() => { handleFirstNameClick(params?.row); setType("edit") }}><EditIcon /></Button>
                        <Button variant='text' size='small' color='primary'><DeleteIcon /></Button>
                    </>
                );
            }
        },

    ];


    return (
        <div>
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />

            <Box p={2} style={{ cursor: "pointer" }}>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                        <Stack direction="row" spacing={1} alignItems={"center"}>
                            {/* <Button
                                onClick={toggleVisibilityEmails}
                                className='custom-btn'
                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px", backgroundColor: "#4ABD43", '&hover': { backgroundColor: "#4ABD43" } }}
                            >
                                {isVisibleEmails ? <RemoveIcon /> : <AddIcon />}
                            </Button> */}
                            <Typography variant="h5">Emails</Typography>
                        </Stack>

                    </Stack>
                </Grid>
            </Box>
            {/* {
                isVisibleEmails && */}
            <TableStyleTwo>
                <Box width="100%" height="30vh">
                    <DataGrid
                        rows={emails}
                        columns={columns}
                        getRowId={row => row._id}
                        columnHeaderHeight={40}
                        pagination={false}
                    />
                </Box>
            </TableStyleTwo>

            {/* } */}
        </div>
    )
}

export default Emails
