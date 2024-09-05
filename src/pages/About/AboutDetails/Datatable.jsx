import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { Container } from '@mui/material';
import {useAbout} from '../../../Services/fetchApi/fetchAbout/mutationAbout.api'
import VisibilityIcon from '@mui/icons-material/Visibility';
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
import { Link } from 'react-router-dom';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => randomArrayItem(roles);

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    status:'Active',
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    status:'Active',

  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    status:'Active',

  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    status:'Active',

  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    status:'Active',

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
      <Link to={`/About/new`}>
      <Button color="primary" startIcon={<AddIcon />} >
         About
      </Button>
      </Link>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { data } = useAbout();
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

   const handleStatusToggle = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, status: row.status === 'Active' ? 'Inactive' : 'Active' }
          : row
      )
    );
  };



  function stripHtmlTags(html) {
    return html.replace(/<[^>]*>/g, '');
  }

  const columns = [
    { field: 'title', headerName: 'Title', width: 300,},
    { field: 'description', headerName: 'Description', width: 300,
      valueGetter: (params) => stripHtmlTags(params.value),
    },
    // { field: 'status', headerName: 'Status', width: 180,
    //   renderCell: (params) => (
    //     <Chip
    //       label={params.value}
    //       sx={{
    //         backgroundColor: params.value === 'Active' ? 'green' : 'red',
    //         color: 'white',
    //         cursor: 'pointer',
    //       }}
    //       onClick={() => handleStatusToggle(params.id)}
    //     />
    //   ),
    //  },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 300,
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
          <Link to={`/About/${id}`}>
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
            rowHeight={45}
            columns={columns}
            getRowId={(row) => row._id}
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
  );
}
