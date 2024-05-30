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
            field: "totalArea",
            headerName: "Total Area",
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


    const fileldData = [
        { name: 'MDF', ef: 0.345, fieldName: 'mdf' },
        { name: 'Open Panel Timber Frame ', ef: 0.856, fieldName: 'openPanelTimberFrame' },
        { name: 'Carpet ', ef: 0.263, fieldName: 'carpet' },
        { name: 'Sawn Timber', ef: 6.7, fieldName: 'sawnTimber' },
        { name: 'Wood', ef: 3.1, fieldName: 'wood' },
        { name: 'Adhesive Vinyl', ef: 6.4, fieldName: 'adhesiveVinyl' },
        { name: 'Aluminium', ef: 1.83, fieldName: 'aluminium' },
        { name: 'Steel ', ef: 0.42, fieldName: 'steel' },
        { name: 'Carpet ', ef: 0.64, fieldName: 'carpet' },
        { name: 'Iron', ef: 0, fieldName: 'iron' },
        { name: 'Paint ', ef: 0, fieldName: 'paint' },
        { name: 'Wooden Floor', ef: 0, fieldName: 'woodenFloor' },
        { name: 'Cardboard', ef: 8.3, fieldName: 'cardboard' },
        { name: 'Cotton Banner', ef: 0.94, fieldName: 'cottonBanner' },
        { name: 'Polyester', ef: 1.2, fieldName: 'polyester' },
        { name: 'paper', ef: 12.7, fieldName: 'paper' },
        { name: 'Lanyards', ef: 14.5, fieldName: 'lanyards' },
        { name: 'Cotton canvas ', ef: 22.74, fieldName: 'cottonCanvas' },
        { name: 'Nylon', ef: 2.792, fieldName: 'nylon' },
        { name: 'Poly Ethelene', ef: 12.7, fieldName: 'polyEthelene' },
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
            </Grid>
        </div>
    );
};

export default Production;
