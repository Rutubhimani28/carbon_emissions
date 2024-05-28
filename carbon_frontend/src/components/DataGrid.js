import { Box, Card } from '@mui/material';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';

const DataGrid = (props) => {
    const { data, columns, checkboxSelection, setSelectedRowIds, selectedRowIds } = props;

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

    return (
        <Card style={{ height: '600px' }}>
            <DataGrid
                rows={data || []}
                columns={columns}
                checkboxSelection={checkboxSelection || true}
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedRowIds}
                components={{
                    Toolbar: () => (
                        <Box padding={'10px 0'}>
                            <GridToolbarColumnsButton />
                            <GridToolbarFilterButton />
                            <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
                        </Box>
                    ),
                }}
                getRowId={(row) => row._id}
            />
        </Card>
    );
};

export default DataGrid;
