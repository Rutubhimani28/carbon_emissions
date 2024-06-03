import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddEdit from './AddEdit'

const Waste = () => {
    const [openAdd, setOpenAdd] = useState(false);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    return (
        <div>
            Waste
            <Button onClick={handleOpenAdd}>Add</Button>
            <AddEdit open={openAdd} handleClose={handleCloseAdd} type={"add"} />
        </div>
    )
}

export default Waste
