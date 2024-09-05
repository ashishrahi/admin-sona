import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { Chip, Container } from '@mui/material';
import {useUser,useUpdateMutationUserStatus} from '../../../Services/fetchApi/fetchUsers/mutationUsers.api'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import {Grid} from '@mui/material';

import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
} from '@mui/x-data-grid-generator';






export default function FullFeaturedCrudGrid() {
  const {data}= useUser();
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: '' });
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const {mutateAsync:updateUserStatus} = useUpdateMutationUserStatus();

  React.useEffect(() => {
    // Simulate a data fetch
    if(data){
      setRows(data);
    }

    setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
  }, [data]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    setLoading(true);
    // Simulate an async save operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setSnackbar({ open: true, message: 'Row saved successfully', severity: 'success' });
  };

  const handleDeleteClick = (id) => async () => {
    setLoading(true);
    setRows(rows.filter((row) => row.id !== id));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);

    setSnackbar({ open: true, message: 'Row deleted successfully', severity: 'error' });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
   };

//--------------- Toggle Status
   const handleStatusToggle = async (id) => {
    console.log(id)
    try {
      const row = rows.find((row) => row._id === id);
      const updatedStatus = !row.status;
       updateUserStatus(id)
       setRows((prevRows) =>
        prevRows.map((row) =>
          row._id === id ? { ...row, status: updatedStatus } : row
        )
      );
    } catch (error) {
      console.error('Error updating status', error);
    }
  };




  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 90,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} />
      ),
    },
    { field: 'username', headerName: 'User Name', width: 180,
      valueGetter:(params)=>{
        return params.row.username ? params.row.username:'';
      }
     },
    { field: 'email', headerName: 'Email', width: 180,},
    { field: 'phone', headerName: 'Phone', width: 180,},
    {
      field: 'address',
      headerName: 'Address',
      width: 180,
      renderCell: (params) => {
        
       const addressArray = params.value;
       const address = addressArray[0]
          return (
            <Grid container rowSpacing={1} sx={{ gap: '5px', height: 'auto', overflow: 'auto',marginTop:'1px' }}>
              <div><strong>House:</strong> {address.house}</div>
              <div><strong>City:</strong> {address.city}</div>
            </Grid>
          );
        } 
      
    },
     { field: 'status', headerName: 'Status', width: 180,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status ? (
        <Chip
          value={params.value}
          icon={<CheckCircleIcon style={{ color: 'green' }} />}
          label="Active"
          variant="outlined"
          onClick={() => handleStatusToggle(params.row._id)}
        />
      ) :  <Chip
           value={params.value}
          icon={<CancelIcon style={{ color: 'red' }} />}
          label="inActive"
          variant="outlined"
          onClick={() => handleStatusToggle(params.row._id)}

      />}
          </div>
        );
      },
     },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        // if (isInEditMode) {
        //   return [
        //     <GridActionsCellItem
        //       icon={<SaveIcon />}
        //       label="Save"
        //       sx={{
        //         color: 'primary.main',
        //       }}
        //       onClick={handleSaveClick(id)}
        //     />,
        //     <GridActionsCellItem
        //       icon={<CancelIcon />}
        //       label="Cancel"
        //       className="textPrimary"
        //       onClick={handleCancelClick(id)}
        //       color="inherit"
        //     />,
        //   ];
        // }

        return [
          // <GridActionsCellItem
          //   icon={<EditIcon />}
          //   label="Edit"
          //   className="textPrimary"
          //   color="inherit"
          // />,
          <Link to={`/User-List/${id}`}>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="view"
            color="inherit"
          />
          </Link>,
        ];
      },
    },
  ];

  return (
    <Container
      sx={{
        height: 500,
        marginLeft:'20px',
        marginRight:'40px',
        marginTop:'20px',
        width: '97%',
        position: 'relative',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {initialLoading ? (
        <Skeleton variant="rectangular" width="100%" height={500} />
      ) : (
        <>
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                marginRight:'10px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <DataGrid
            rows={rows}
            rowHeight={45}
            getRowId={(row) => row._id}
            columns={columns}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0', // Light grey color for header
                 fontWeight:'bold'
            },
              '& .MuiDataGrid-columnHeader': {
                color: '#000', // Text color for header
                },}}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            pagination
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            rowsPerPageOptions={[5, 10, 20]}
            
          />
        </>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
