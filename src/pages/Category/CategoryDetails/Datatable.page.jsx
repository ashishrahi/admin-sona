import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import {useCategory,useStatusMutationCategory} from '../../../Services/fetchApi/fetchCategory/mutationCategory.api'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Chip from '@mui/material/Chip';
import {Avatar} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import {Container} from '@mui/material';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { red } from '@mui/material/colors';
import { Grid } from '@mui/material';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => randomArrayItem(roles);

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Link to={`/Category-List/new`}>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Category
      </Button>
      </Link>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { data } = useCategory();

  const [rows, setRows] = React.useState(data);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: '' });
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const {mutateAsync:statusMutation} = useStatusMutationCategory();

  React.useEffect(() => {
    // Simulate a data fetch
    if(data){
      setRows(data)
    }

    setTimeout(() => {
      setInitialLoading(false);
    }, 500);
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
  try {
    const row = rows.find((row) => row._id === id);
    const updatedStatus = !row.status;
    statusMutation(id)
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
      field: 'image',
      headerName: 'Image',
      width: 280,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} />
      ),
    },
    { field: 'categoryname', headerName: 'Category Name', width: 280,},

    {
      field: 'variantdetails',
      headerName: 'Variant Details',
      width: 200,
      renderCell: (params) => (
        
        
        <Grid container rowSpacing={3} sx={{gap:'5px',height:'10vh',overflow:'scroll'}} >
          <strong>Color:</strong> {params.value.color},<br />
          <strong>Dandi:</strong> {params.value.dandi},<br />
          <strong>Gender:</strong> {params.value.gender},<br />
          <strong>Purity:</strong> {params.value.purity},<br />
          <strong>Kunda:</strong> {params.value.kunda},<br />
          <strong>Size:</strong> {params.value.size},<br />
          <strong>Weight:</strong> {params.value.weight},<br />
          <strong>Gauge Size:</strong> {params.value.gaugesize},<br />
          <strong>Status:</strong> {params.value.status ? <span style={{color:'green'}}>{'Available'} </span>: 'Not Available'}
        </Grid>
      ),
    },

    { field: 'status', headerName: 'Status', width: 280,
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
          ];
        }

        return [
          <Link to={`/Category-List/${id}`}>
          <GridActionsCellItem
            icon={<VisibilityTwoToneIcon />}
            label="View"
            className="textPrimary"
            color="inherit"
          /></Link>,
          // <Link to={`/Category-List/${id}`}>
          // <GridActionsCellItem
          //   icon={<VisibilityIcon />}
          //   label="view"
          //   color="inherit"
          // /></Link>,
        ];
      },
    },
  ];

  const getRowHeight = () => {
    return 70; // Adjust the height based on your needs
  };


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
            <Container
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
            </Container>
          )}
          <DataGrid
            rows={rows}
            columns={columns}
            getRowHeight={getRowHeight}
            editMode="row"
            getRowId={(row) => row._id}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0', // Light grey color for header
                 fontWeight:'bold'
            },
              '& .MuiDataGrid-columnHeader': {
                color: '#000', // Text color for header
                },}}
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
  );
}
