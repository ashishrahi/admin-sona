import {TextField,Container, Paper} from '@mui/material';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import { useUpdatesize,useSizeById } from '../../../../Services/fetchApi/fetchVariantDetails/mutationSize.api';
import { useParams } from 'react-router-dom';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import UpdateBreadCrumb from './updatebreadcrubs.page'
import Circularprogress from '../../../../Components/Circularprogress/circularprogress';

const Update = () => {
  
  // State management
  const { id } = useParams();
  const {data} = useSizeById(id)
  const{mutateAsync:updateMutateSize} = useUpdatesize();
  const[size,setSize] = useState('')
  const[isloading,setLoading] = useState(true)
  
useEffect(() => {
 if(data){
  setSize(data.size)
 }
 setTimeout(() => {
  setLoading(false)
 }, 1000);
}, [data])





  // Update Size
  const handleSubmit = async(e) => {
        e.preventDefault();
       await updateMutateSize({id,size});
        setOpen(true)
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
              label="Update Size"
              required
              autoFocus
              variant="outlined"
              value={size}
              
              name="SizeName"
              sx={{width:'200px',marginTop:'30%',size:'small',border:'5px 2px solid'}}
              onChange={(e)=>setSize(e.target.value)}
            />
            
          </Box>
          <Button type='submit' variant='contained' size='small' color='primary' endIcon={<UpgradeIcon/>}
            sx={{
              marginTop: '30px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Update Size
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