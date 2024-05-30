import { Box, Card } from '@mui/material';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';

const DataGridComponent = (props) => {
    const { data, columns, checkboxSelection, setSelectedRowIds, selectedRowIds, toolbar } = props;

    const handleSelectionChange = (selectionModel) => {
        if (setSelectedRowIds) {
            setSelectedRowIds(selectionModel);
        }
    };
    const CustomToolbar = () => (
        <Box padding={'10px 0'}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
        </Box>
    );

    return (
        <Card style={{ height: '600px' }}>
            <DataGrid
                rows={data || []}
                columns={columns}
                checkboxSelection={checkboxSelection || true}
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedRowIds}
                components={{
                    Toolbar: toolbar !== false && CustomToolbar,
                }}
                getRowId={(row) => row._id}
            />
        </Card>
    );
};

export default DataGridComponent;
