/* eslint-disable react/prop-types */
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import TableStyleTwo from '../../components/TableStyleTwo';

const Notes = ({ rows, toggleVisibilityNotes, isVisibleNotes, _id, setUserAction, method, leadView }) => {

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
                // const handleFirstNameClick = async (data) => {
                //     setLeadData(data)
                //     handleOpenEdit();
                // };
                return (
                    <>
                        <Button variant='text' size='small' color='primary' ><EditIcon /></Button>
                    </>
                );
            }
        },

    ];

    // open note model
    const [openNote, setOpenNote] = useState(false);
    const handleOpenNote = () => {
        setOpenNote(true);
    };
    const handleCloseNote = () => setOpenNote(false);

    return (
        <div>
            <Box p={2} style={{ cursor: "pointer" }}>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                        <Stack direction="row" spacing={1} alignItems={"center"}>
                            <Button
                                onClick={toggleVisibilityNotes}

                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px", backgroundColor: "#4ABD43", '&hover': { backgroundColor: "#4ABD43" } }}
                            >
                                {isVisibleNotes ? <RemoveIcon /> : <AddIcon />}
                            </Button>
                            <Typography variant="h5">Emails</Typography>
                        </Stack>

                    </Stack>
                </Grid>
            </Box>
            {
                isVisibleNotes &&
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
