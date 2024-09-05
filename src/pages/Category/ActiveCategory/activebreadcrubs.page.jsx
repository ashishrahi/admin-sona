import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import TableViewIcon from '@mui/icons-material/TableView';
import { Link } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={`/`}
          underline="hover"
          style={{ display: 'flex', alignItems: 'center',textDecoration:'none' }}
          color="inherit"
        >
          <HomeIcon sx={{ mr: 0.5 ,color:'black'}} fontSize="inherit" />
         <span style={{color:'black'}}>Dashboard</span> 
        </Link>
        <Link
           to={`/Category-List`}
          underline="hover"
          style={{ display: 'flex', alignItems: 'center',cursor: 'pointer',textDecoration:'none' }}
          color="inherit"
        >
          <TableViewIcon sx={{ mr: 0.5,color:'black' }} fontSize="inherit"/>
          <span style={{color:'black'}}>Categories</span> 
         
        </Link>
        <Link
          underline="none"
          style={{ display: 'flex', alignItems: 'center',textDecoration:'none'}}
          color="inherit"
        >
          <TableViewIcon sx={{ mr: 0.5,color:'blue' }} fontSize="inherit" />
          <span style={{color:'black'}}>Active Category</span> 
         
        </Link>
        {/* <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography> */}
      </Breadcrumbs>
    </div>
  );
}