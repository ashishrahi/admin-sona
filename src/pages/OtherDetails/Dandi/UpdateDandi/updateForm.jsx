import {TextField,Container, Paper, CircularProgress} from '@mui/material';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import { useUpdatedandi,useDandiById} from '../../../../Services/fetchApi/fetchVariantDetails/mutationDandi.api';
import { useParams } from 'react-router-dom';
import UpgradeIcon from '@mui/icons-material/Upgrade';


const Update = () => {

  //State Management
  const { id } = useParams();
  const {data} = useDandiById(id)
  const{mutateAsync:updateMutateDandi} = useUpdatedandi();
  const[updatedandi,setUpdatedandi] = useState('')
  const[isloading,setLoading] = useState(true)
  
  //Fetch Data
  useEffect(() => {
  if(data){
    setUpdatedandi(data.dandi)
       }
   setTimeout(() => {
setLoading(false)
   }, 1000);
  }, [data])



const handleSubmit = async(e) => {
        e.preventDefault();
       await updateMutateDandi({id,updatedandi});
  };

  return (
    <Box className='new' >
        {isloading ?<Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress/>
          </Box>:(
        <Container>
        <Box sx={{display:'flex',flexDirection:'column',marginTop:'10px',marginLeft:'20%',width:'400px',height:'400px',alignItems:'center'}}>
        <form method='post' onSubmit={handleSubmit}>
          <Paper style={{display:'flex',backgroundColor:'white', flexDirection:'column',border:'2px,3px solid',alignItems:'center',marginTop:'50%',width:'300px',height:'80%'}}>
          <Box className="formInput" style={{ display: 'flex' ,flexDirection: 'column', gap: '10px' }}>
            
            <TextField
              label="Update Dandi"
              required
              autoFocus
              variant="outlined"
              value={updatedandi}
              
              name="Dandi Name"
              sx={{width:'200px',marginTop:'30%',size:'small',border:'5px 2px solid'}}
              onChange={(e)=>setUpdatedandi(e.target.value)}
            />
            
          </Box>
          <Button type='submit' variant='contained' size='small' color='primary' endIcon={<UpgradeIcon/>}
            sx={{
              marginTop: '30px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Update Dandi
          </Button>
          </Paper>
        </form>
        </Box>
        </Container>
        )}
       </Box>
  );
}

export default Update;