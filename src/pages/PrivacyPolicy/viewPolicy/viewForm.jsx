// src/DetailsPage.js

import { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import Viewcrumb from './viewbreadcrubs.page'
import {Paper} from '@mui/material';
import {usePolicyById} from '../../../Services/fetchApi/fetchPrivacyPolicy/mutationPrivacypolicy.api'
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';
import AdsClickIcon from '@mui/icons-material/AdsClick';

const DetailsPage = () => {
  
  const {id} = useParams()
  const {data} = usePolicyById(id)
  const [isloading, setLoading] = useState(true);
  const [details, setDetails] = useState({ title: '', description: '' });

  useEffect(() => {
   if(data){
     setDetails({title: data.title, description: data.description });
   }
  setTimeout(() => {
  setLoading(false);
}, 1000);
  
  }, [data]);

  return (
      <Box className='list' >

      {isloading?<Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>:(  
            <Container maxWidth="md" sx={{marginTop:'5%'}}>
      <Paper my={4} sx={{width:'900px',height:'800px'}}>
       <Link to={`/Privacy-Policy/${id}/update`}>
       <Button color='error' endIcon={<AdsClickIcon/>}>
       Update</Button></Link>
      <Typography variant="h4" component="h1" gutterBottom sx={{textAlign:'center'}}>
         {details.title}
        </Typography>
        <Typography variant="body1" component="p" sx={{justifyContent:'center',gap:'2px'}}>
          {details.description}
        </Typography>
      </Paper>
    </Container>
    )}

    </Box>
  );
};

export default DetailsPage;
