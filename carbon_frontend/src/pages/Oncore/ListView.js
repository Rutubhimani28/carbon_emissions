import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const columns = [
    {
        field: 'nurseName', headerName: 'Nurse name', flex: 1, renderCell: (params) => {
            return (
                <>
                    <div className='d-flex ' >
                        <div><img src={params.row.img} alt="user" height="40px" width="40px" className='rounded-circle me-1 my-1' /></div>
                        <div>

                            <div>
                                {params.formattedValue}
                            </div>
                            <Typography variant='caption' className='text-secondary'>{params.row.mail}</Typography>
                        </div>
                    </div>
                </>
            );
        }
    },
    { field: 'patientName', headerName: 'Patient name', flex: 1 },
    { field: 'chair', headerName: 'Chair #' },
    { field: 'startTime', headerName: 'Start time', flex: 1 },
    { field: 'infusionLength', headerName: 'Infusion Length', flex: 1 },
    {
        field: 'acuity', headerName: 'Acuity', renderCell: (params) => {
            return (
                <>
                    <div className={params.formattedValue === 'High' ? 'high commonAcuity' : params.formattedValue === 'Low' ? 'low commonAcuity' : params.formattedValue === 'Med' ? 'mid commonAcuity' : "commonAcuity"}> {params.formattedValue}</div>
                </>
            );
        }
    },
];

const rows = [{
    "id": 1, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL_zpTULJ9oHSTLYX2iaSAeeCxoPUi3hWKQ&s", "nurseName": "Andrei", mail: "mailto:andrei@hmail.com", "patientName": "Emily Anderson", "chair": 4, "startTime": "3: 57 AM", "infusionLength": 42, "acuity": "High"
},
{
    "id": 2, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s", "nurseName": "Hanna", mail: "mailto:hanna@gmail.com", "patientName": "Emily Anderson", "chair": 2, "startTime": "9: 46 AM", "infusionLength": 84, "acuity": "High"
},
{
    "id": 3, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL_zpTULJ9oHSTLYX2iaSAeeCxoPUi3hWKQ&s", "nurseName": "Renata", mail: "mailto:renata@gmail.com", "patientName": "Ava Davis", "chair": 10, "startTime": "8: 57 AM", "infusionLength": 209, "acuity": "Low"
},
{
    "id": 4, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dBjSy5wKWwdIwHjB9oecrcTUv71kI9yj-Q&s", "nurseName": "Rivkah", mail: "mailto:hanna@gmail.com", "patientName": "Isabella Miller", "chair": 4, "startTime": "6: 13 PM", "infusionLength": 232, "acuity": "Med"
},
{
    "id": 5, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL_zpTULJ9oHSTLYX2iaSAeeCxoPUi3hWKQ&s", "nurseName": "Demetra", mail: "mailto:demetra@gmail.com", "patientName": "Olivia Smith", "chair": 3, "startTime": "10: 21 AM", "infusionLength": 225, "acuity": "Med"
},
{
    "id": 6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL_zpTULJ9oHSTLYX2iaSAeeCxoPUi3hWKQ&s", "nurseName": "Sibyl", mail: "mailto:sibyl@gmail.com", "patientName": "James Taylor", "chair": 6, "startTime": "3:02 AM", "infusionLength": 91, "acuity": "Med"
}]

export default function DataTable() {
    return (
        <div style={{ height: 400, width: '100%', borderRadius: "10px" }} className='shadow ' >
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
        </div>
    );
}
