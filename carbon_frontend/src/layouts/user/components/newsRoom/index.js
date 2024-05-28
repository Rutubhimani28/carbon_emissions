import { Grid, Typography } from '@mui/material'
import React from 'react'

const Index = () => {
    return (
        <div>
            <div className='main py-5'>
                <Typography variant='h6' className='text-center fs-1 green pt-4 fontFamily fw-bold' >News Room & Blogs</Typography>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <div className='roombg1'>1</div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>2</div>
                        <div>2</div>
                    </Grid>

                </Grid>

            </div>
        </div>
    )
}

export default Index
