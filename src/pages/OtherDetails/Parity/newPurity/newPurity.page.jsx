import {TextField,Container, Paper} from '@mui/material';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import { useAddpurity } from '../../../../Services/fetchApi/fetchVariantDetails/mutationPurity.api';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Circularprogress from '../../../../Components/Circularprogress/circularprogress';

const Add = () => {

  const{mutateAsync:addMutatePurity} = useAddpurity();
  const[purity,setPurity] = useState('')
  const { id } = useParams();
  const[isloading,setLoading] = useState(true)
  
 useEffect(() => {
 setTimeout(() => {
  setLoading(false)
 }, 1000);
 }, [])
 



  const handleSubmit = async(e) => {
        e.preventDefault();
       await addMutatePurity({id,purity});
  };

  return (

    <Box className='new' >
        {isloading ? <Circularprogress/>:(
        <Container>
        <Box sx={{display:'flex',flexDirection:'column',marginTop:'10px',marginLeft:'20%',width:'400px',height:'400px',alignItems:'center'}}>
        <form method='post' onSubmit={handleSubmit}>
          <Paper style={{display:'flex',backgroundColor:'white', flexDirection:'column',border:'2px,3px solid',alignItems:'center',marginTop:'50%',width:'300px',height:'80%'}}>
          <Box className="formInput" style={{ display: 'flex' ,flexDirection: 'column', gap: '10px' }}>
            
            <TextField
              label="Add Purity"
              required
              autoFocus
              variant="outlined"
              value={purity}
              
              name="Purity Name"
              sx={{width:'200px',marginTop:'30%',size:'small',border:'5px 2px solid'}}
              onChange={(e)=>setPurity(e.target.value)}
            />
            
          </Box>
          <Button type='submit' variant='contained' size='small' color='primary' endIcon={<AddIcon/>}
            sx={{
              marginTop: '30px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Add Purity
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