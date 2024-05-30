import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import DataGridComponent from '../../components/DataGridComponent';

const Production = () => {
    const data = [
        {
            "_id": "6656fe0f143c0c9cc7a72137",
            "type": "Emails",
            "count": 80,
            "mb": null,
            "noOfAttendees": null,
            "noOfHours": null,
            "serviceLifeOfLaptop": null,
            "emission": 1.04,
            "createdOn": "2024-05-29T10:06:07.091Z",
            "modifiedOn": "2024-05-29T10:06:07.092Z",
            "__v": 0
        },
        {
            "_id": "6656efd3ad220594438e5dac",
            "type": "Emails",
            "count": 10,
            "mb": null,
            "noOfAttendees": null,
            "noOfHours": null,
            "serviceLifeOfLaptop": null,
            "emission": 0.13,
            "createdOn": "2024-05-29T09:05:23.061Z",
            "modifiedOn": "2024-05-29T09:05:23.061Z",
            "__v": 0
        },
        {
            "_id": "665586877d504f228d5e6b57",
            "type": "Laptop",
            "count": null,
            "mb": null,
            "noOfAttendees": 10,
            "noOfHours": 15,
            "serviceLifeOfLaptop": 5840,
            "ef": 12,
            "createdOn": "2024-05-28T07:23:51.672Z",
            "modifiedOn": "2024-05-28T07:23:51.672Z",
            "__v": 0,
            "emission": 8.73
        },
        {
            "_id": "6655867e7d504f228d5e6b54",
            "type": "Attachment",
            "count": null,
            "mb": 1,
            "noOfAttendees": null,
            "noOfHours": null,
            "serviceLifeOfLaptop": null,
            "ef": 1,
            "createdOn": "2024-05-28T07:23:42.552Z",
            "modifiedOn": "2024-05-28T07:23:42.552Z",
            "__v": 0,
            "emission": 0.05
        }
    ]

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

                return (
                    <>
                        <Button variant='text' size='small' color='primary' ><DeleteIcon color='error' /></Button>
                        <Button variant='text' size='small' color='primary' ><EditIcon /></Button>
                    </>
                );
            }
        },

    ];

    return (
        <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ marginTop: '20px' }}>
                        <Box p={2} display="flex" alignItems="center" style={{ cursor: "pointer" }}>
                            <Typography variant="h5">Emails</Typography>
                        </Box>
                        <DataGridComponent
                            data={data}
                            columns={columns}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ marginTop: '20px' }}>
                        <DataGridComponent
                            data={data}
                            columns={columns}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ marginTop: '20px' }}>
                        <DataGridComponent
                            data={data}
                            columns={columns}
                        />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Production;
