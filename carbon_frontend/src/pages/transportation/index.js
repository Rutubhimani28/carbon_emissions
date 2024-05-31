import { Button } from '@mui/material';
import React, { useState } from 'react'
import AddEdit from './AddEdit';
import Iconify from '../../components/iconify';

const Transportation = () => {
    const [openAdd, setOpenAdd] = useState(false);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    return (
        <div>
            Transportation
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type="add" />

            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => { handleOpenAdd(); }} className="custom-btn">
                Add New
            </Button>
        </div>
    )
}

export default Transportation
