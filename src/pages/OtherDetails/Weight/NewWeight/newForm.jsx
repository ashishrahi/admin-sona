import {TextField,Container, Paper} from '@mui/material';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import {useAddWeight} from '../../../../Services/fetchApi/fetchVariantDetails/mutationWeight.api'
import AddIcon from '@mui/icons-material/Add';
import Circularprogress from '../../../../Components/Circularprogress/circularprogress';

const Add = () => {

  const{mutateAsync:addMutate} = useAddWeight();
  const[weight,setWeight] = useState('')
  const[isloading,setLoading] = useState(true)
  
useEffect(() => {
setTimeout(() => {
  setLoading(false)
}, 2000);
}, [])




  const handleSubmit = async(e) => {
        e.preventDefault();
       await addMutate({weight});
  };

  return (
    <Box className='new' >
     {isloading ? <Circularprogress/> :(
     <Container>
        <Box sx={{display:'flex',flexDirection:'column',marginTop:'10px',marginLeft:'20%',width:'400px',height:'400px',alignItems:'center'}}>
        <form method='post' onSubmit={handleSubmit}>
          <Paper style={{display:'flex',backgroundColor:'white', flexDirection:'column',border:'2px,3px solid',alignItems:'center',marginTop:'50%',width:'300px',height:'80%'}}>
          <Box className="formInput" style={{ display: 'flex' ,flexDirection: 'column', gap: '10px' }}>
            
            <TextField
              label="Add Weight"
              required
              autoFocus
              variant="outlined"
              value={weight}
              
              name="WeightName"
              sx={{width:'200px',marginTop:'30%',size:'small',border:'5px 2px solid'}}
              onChange={(e)=>setWeight(e.target.value)}
            />
            
          </Box>
          <Button type='submit' variant='contained' size='small' color='primary' endIcon={<AddIcon/>}
            sx={{
              marginTop: '30px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Add Weight
          </Button>
          </Paper>
        </form>
        </Box>
        </Container>
     )}
       </Box>
  );
}

export default Add;