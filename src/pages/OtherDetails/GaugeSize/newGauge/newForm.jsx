import {TextField,Container, Paper} from '@mui/material';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import { useAddGaugesize } from '../../../../Services/fetchApi/fetchVariantDetails/mutationGaugesize.api';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import NewCrumb from './newbreadcrubs.page'
import {CircularProgress} from '@mui/material';

const Add = () => {

  const{mutateAsync:addMutateGaugesize} = useAddGaugesize();
  const[gaugesize,setGaugesize] = useState('')
  const { id } = useParams();
  const[isloading,setLoading] = useState(true)
  
useEffect(() => {

setTimeout(() => {
  setLoading(false)
}, 1000);
}, [])



  const handleSubmit = async(e) => {
        e.preventDefault();
       await addMutateGaugesize({id,gaugesize});
  };

  return (
    // sidebar
    <Box className='new' >

        {isloading ?<Box display="flex" justifyContent="center" alignItems="center" height="80vh"> <CircularProgress/> </Box> : (
        <Container sx={{display:'flex',flexDirection:'column',marginTop:'10px',marginLeft:'20%',width:'400px',height:'400px',alignItems:'center'}}>
        <form method='post' onSubmit={handleSubmit}>
          <Paper style={{display:'flex',backgroundColor:'white', flexDirection:'column',border:'2px,3px solid',alignItems:'center',marginTop:'50%',width:'300px',height:'80%'}}>
          <Box className="formInput" style={{ display: 'flex' ,flexDirection: 'column', gap: '10px' }}>
            
            <TextField
              label="Add Gaugesize"
              required
              autoFocus
              variant="outlined"
              value={gaugesize}
              
              name="Gaugesize Name"
              sx={{width:'200px',marginTop:'30%',size:'small',border:'5px 2px solid'}}
              onChange={(e)=>setGaugesize(e.target.value)}
            />
            
          </Box>
          <Button type='submit' variant='contained' size='small' color='primary' endIcon={<AddIcon/>}
            sx={{
              marginTop: '30px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Add GaugeSize
          </Button>
          </Paper>
        </form>
        </Container>
        )}
       </Box>
  );
}

export default Add;