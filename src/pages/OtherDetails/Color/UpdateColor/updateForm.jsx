import {TextField,Container, Paper, CircularProgress} from '@mui/material';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import { useUpdateColor,useColorById} from '../../../../Services/fetchApi/fetchVariantDetails/mutationColor.api';
import { useParams } from 'react-router-dom';
import UpgradeIcon from '@mui/icons-material/Upgrade';


const Update = () => {

  //State Management
  const { id } = useParams();
  const {data} = useColorById(id)
  const{mutateAsync:updateMutateColor} = useUpdateColor();
  const[color,setColor] = useState('')
  const[isloading,setLoading] = useState(true)
  
  //Fetch Data
  useEffect(() => {
  if(data){
    setColor(data.color)
       }
   setTimeout(() => {
setLoading(false)
   }, 1000);
  }, [data])



const handleSubmit = async(e) => {
        e.preventDefault();
       await updateMutateColor({id,color});
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
              label="Update Color"
              required
              autoFocus
              variant="outlined"
              value={color}
              
              name="Color Name"
              sx={{width:'200px',marginTop:'30%',size:'small',border:'5px 2px solid'}}
              onChange={(e)=>setColor(e.target.value)}
            />
            
          </Box>
          <Button type='submit' variant='contained' size='small' color='primary' endIcon={<UpgradeIcon/>}
            sx={{
              marginTop: '30px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Update Color
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