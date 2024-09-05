import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Select, MenuItem, Chip, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useOrders, useUpdateStatusMutationOrder,useAssignedMutationOrder } from '../../../Services/fetchApi/fetchOrders/mutationsOrders.api';
import { useParams } from 'react-router-dom';
import {useKarigar} from '../../../Services/fetchApi/fetchKarigar/mutationKarigar.api'

const statusOptions = ['New', 'Accepted', 'Rejected'];
const getStatusColor = (status) => {
  switch (status) {
    case 'New':
      return 'orange';
    case 'Accepted':
      return 'green';
    case 'Rejected':
      return 'red';
    default:
      return 'grey';
  }
};

const StatusEditCell = ({ id, value, api, field, options }) => {
  const handleChange = (event) => {
    api.setEditCellValue({ id, field, value: event.target.value });
  };

  return (
    <Select value={value} onChange={handleChange} autoFocus fullWidth>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

const EditableOrderDataGrid = () => {
  const {data:karigarData} = useKarigar();
  const { data } = useOrders();
  const{mutateAsync: assignedOrder,} = useAssignedMutationOrder()
  const [rows, setRows] = useState([]);
  const { id } = useParams();
  const [editRowsModel, setEditRowsModel] = useState({});
  const { mutateAsync: updateStatus } = useUpdateStatusMutationOrder(id);

  
  
  useEffect(() => {
    
    if (data) {
      setRows(data);
    }
  }, [data]);

  const handleEditRowsModelChange = (model) => {
    setEditRowsModel(model);
  };

  const handleProcessRowUpdate = async (newRow) => {
    const id = newRow._id;
    console.log(id)
    const status = newRow.status;
    const karigarname =newRow.karigar
    console.log(newRow)
    console.log(karigarname)
    assignedOrder({id,karigarname})

    try {
      await updateStatus({ id, status });
      setRows((prevRows) =>
        prevRows.map((row) => (row._id === newRow._id ? newRow : row))
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
    return newRow;
  };

  const columns = [
    { field: 'orderno', headerName: 'Order No.', width: 200 },
    { field: 'category', headerName: 'Category Name', width: 200 },
    { field: 'user', headerName: 'Customer Name', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 170,
      editable: true,
      renderEditCell: (params) => (
        <StatusEditCell {...params} options={statusOptions} />
      ),
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor: getStatusColor(params.value),
            color: 'white',
          }}
        />
      ),
    },
    {
      field: 'karigar',
      headerName: 'Assigned Karigar',
      width: 200,
      editable: true,
      renderEditCell: (params) => (
        <StatusEditCell {...params} options={karigarData.map(k => k.name)} 
        />
      ),
      renderCell: (params) => (
        
        <Chip
          label={params.value || 'Karigar Name'}

          style={{
            backgroundColor:'blue',
            color: 'white',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Link to={`/Order-List/${params.id}`}>
          <Button color="primary">
            <VisibilityIcon />
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Container sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0', // Light grey color for header
          },
          '& .MuiDataGrid-columnHeader': {
            color: '#000', // Text color for header
          },
        }}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Container>
  );
};

export default function App() {
  return (
    <Box sx={{ p: 2 }}>
      <EditableOrderDataGrid />
    </Box>
  );
}
