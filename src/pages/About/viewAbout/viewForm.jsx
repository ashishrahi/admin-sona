import  { useEffect, useState } from 'react';
import { Container, Typography, Box, } from '@mui/material';
import { useParams } from 'react-router-dom';
import {Paper} from '@mui/material';
import {useAboutById} from '../../../Services/fetchApi/fetchAbout/mutationAbout.api'
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import Circularprogress from '../../../Components/Circularprogress/circularprogress';

const DetailsPage = () => {
  
  //State Mangement
  const {id} = useParams()
  const {data} = useAboutById(id)
  const [isloading, setLoading] = useState(true);
  const [details, setDetails] = useState({ title: '', description: '' });

  // Fetching Data
  useEffect(() => {

   if(data){
     setDetails({title: data.title, description: data.description });
     setTimeout(() => {
     setLoading(false);
    }, 2000);
   }}, [data]);

  

  return (
      <Box className='list' >

      {isloading ? <Circularprogress/> :(
      <Container maxWidth="md" sx={{marginTop:'5%'}}>
      <Paper my={4} sx={{width:'900px',height:'800px'}}>
       <Link to={`/About/${id}/update`}>
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
