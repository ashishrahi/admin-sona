import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { Chip, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { usePolicy } from '../../../Services/fetchApi/fetchPrivacyPolicy/mutationPrivacypolicy.api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => randomArrayItem(roles);



function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

 

  return (
    <GridToolbarContainer>
      <Link to='/Privacy-Policy/new'>
      <Button color="primary" startIcon={<AddIcon />} >
        Add Policy
      </Button>
      </Link>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const{data} = usePolicy();
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: '' });
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(0);

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
 function stripHtmlTags(html) {
    return html.replace(/<[^>]*>/g, '');
  }
  

  const columns = [
    { field: 'title', headerName: 'Title', width: 280,
      valueGetter:(params)=>{
        return params.row.title ? params.row.title:'';
      }
     },
    { field: 'description', headerName: 'Description', width: 280,
      
        valueGetter: (params) => stripHtmlTags(params.value),
      
     },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 280,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            // <GridActionsCellItem
            //   icon={<SaveIcon />}
            //   label="Save"
            //   sx={{
            //     color: 'primary.main',
            //   }}
            //   onClick={handleSaveClick(id)}
            // />,
            // <GridActionsCellItem
            //   icon={<CancelIcon />}
            //   label="Cancel"
            //   className="textPrimary"
            //   onClick={handleCancelClick(id)}
            //   color="inherit"
            // />,
          ];}

        return [
          <Link to={`/Privacy-Policy/${id}`}>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            className="textPrimary"
            color="inherit"
          /></Link>,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
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
            getRowId={(row) => row._id}
            rowHeight={45}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0', // Light grey color for header
                 fontWeight:'bold'
            },
              '& .MuiDataGrid-columnHeader': {
                color: '#000', // Text color for header
                },}}
            columns={columns}
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
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
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
  );}
