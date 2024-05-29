/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import TableStyleTwo from '../../components/TableStyleTwo';

const Meetings = ({ rows, style, toggleVisibilityMeeting, isVisibleMeetings, _id, setUserAction, data, type }) => {
    const attechment = rows.filter((item) => item.type === 'Attachment')
    console.log(attechment);


    const columns = [
        {
            field: "mb",
            headerName: "Mb",
            flex: 1,
            valueFormatter: (params) => params.value
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
                // const handleFirstNameClick = async (data) => {
                //     setLeadData(data)
                //     handleOpenEdit();
                // };
                return (
                    <>
                        <Button variant='text' size='small' color='primary'><EditIcon /></Button>
                    </>
                );
            }
        },
    ];

    return (
        <div>
            {/* Add Meeting */}

            <Box style={{ cursor: "pointer" }} p={2}>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                        <Stack direction="row" spacing={1} alignItems={"center"}>
                            <Button
                                onClick={toggleVisibilityMeeting}
                                color="secondary"
                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px", backgroundColor: "#4ABD43" }}
                            >
                                {isVisibleMeetings ? <RemoveIcon /> : <AddIcon />}
                            </Button>
                            <Typography variant="h5">Attechments</Typography>
                        </Stack>

                    </Stack>
                </Grid>
            </Box>
            {
                isVisibleMeetings &&
                <TableStyleTwo>
                    <Box width="100%" height="30vh">
                        <DataGrid
                            rows={attechment}
                            columns={columns}
                            getRowId={row => row._id}
                            columnHeaderHeight={40}
                        />
                    </Box>
                </TableStyleTwo>
            }
        </div>
    )
}

export default Meetings
