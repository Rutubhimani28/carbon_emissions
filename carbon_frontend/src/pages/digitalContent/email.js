/* eslint-disable react/prop-types */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import TableStyleTwo from '../../components/TableStyleTwo';
import AddEdit from './AddEdit';
import DeleteModel from '../../components/Deletemodle';
import { apidelete } from '../../service/api';

const Emails = ({ rows, toggleVisibilityEmails, isVisibleEmails, setUserAction }) => {

    const [type, setType] = useState('')
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedData, setSelectedData] = useState({})
    const [opendelete, setOpendelete] = useState(false);
    const [id, setId] = useState('')

    const emails = rows?.filter((item) => item?.type === 'Emails')

    const handleCloseDelete = () => setOpendelete(false)
    const handleOpenDelete = () => setOpendelete(true)

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleDelete = async (id) => {
        const result = await apidelete(`api/digitalContent/${id}`)
        setUserAction(result)
        handleCloseDelete();
    }

    const columns = [
        {
            field: "count",
            headerName: "Count",
            flex: 1,
            valueFormatter: (params) => params.value,
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
                        <Button variant='text' size='small' color='primary' onClick={() => { handleClick(params?.row); }}><DeleteIcon color='error' /></Button>
                    </>
                );
            }
        },

    ];


    return (
        <div>
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type={type} setUserAction={setUserAction} selectedData={selectedData} />
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={handleDelete} id={id} />

            <Box p={2} style={{ cursor: "pointer" }}>
                <Grid container display="flex" alignItems="center">
                    <Typography variant="h5">Emails</Typography>
                </Grid>
            </Box>
            
            <TableStyleTwo>
                <Box width="100%" height="50vh">
                    <DataGrid
                        rows={emails || []}
                        getRowId={row => row._id}
                        columnHeaderHeight={40}
                        pagination={false}
                        columns={columns.map((column, index) => ({
                            ...column,
                            disableColumnMenu: index === columns.length - 1 // Disable menu icon for the last column
                        }))}
                        disableSelectionOnClick
                        onRowClick={(params, event) => {
                            event.defaultMuiPrevented = true;
                        }}
                    />
                </Box>
            </TableStyleTwo>
        </div>
    )
}

export default Emails