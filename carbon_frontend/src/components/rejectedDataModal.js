import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, Grid, Modal, Select, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${value.row.firstName || ''} ${value.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const RejectedDataModal = (props) => {
    const { open, handleClose } = props
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('1000px'));
    const is4xlScreen = useMediaQuery(theme.breakpoints.up('4xl'));
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display={"flex"} justifyContent={"space-between"} mb={2}>
                        <Typography variant="h6">Add New</Typography>
                        <Typography>
                            <ClearIcon
                                onClick={handleClose}
                                style={{ cursor: "pointer" }}
                            />
                        </Typography>
                    </Box>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                    <Box textAlign={"end"} mt={2}>

                        <Button variant='contained' color='primary' style={{ marginRight: "5px" }}>Save</Button>
                        <Button variant='outlined' color='error'>Cancle</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default RejectedDataModal
