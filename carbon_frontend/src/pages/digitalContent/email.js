/* eslint-disable react/prop-types */
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import TableStyleTwo from '../../components/TableStyleTwo';
import AddEdit from './AddEdit';

const Notes = ({ rows, toggleVisibilityEmails, isVisibleEmails, _id, setUserAction, method, leadView }) => {

    const [type, setType] = useState('')
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedData, setSelectedData] = useState({})

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const emails = rows.filter((item) => item.type === 'Emails')

    const columns = [

        {
            field: "",
            headerName: "",
            flex: 1,
        },
        {
            field: "count",
            headerName: "Count",
            flex: 1,
            valueFormatter: (params) => params.value,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                const handleFirstNameClick = async (data) => {
                    setSelectedData(data)
                    handleOpenAdd();
                };
                return (
                    <>
                        <Button variant='text' size='small' color='primary' onClick={() => { handleFirstNameClick(params?.row); setType("edit") }}><EditIcon /></Button>
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
                            <Button
                                onClick={toggleVisibilityEmails}
                                className='custom-btn'
                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px", backgroundColor: "#4ABD43", '&hover': { backgroundColor: "#4ABD43" } }}
                            >
                                {isVisibleEmails ? <RemoveIcon /> : <AddIcon />}
                            </Button>
                            <Typography variant="h5">Emails</Typography>
                        </Stack>

                    </Stack>
                </Grid>
            </Box>
            {
                isVisibleEmails &&
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

            }
        </div>
    )
}

export default Notes
