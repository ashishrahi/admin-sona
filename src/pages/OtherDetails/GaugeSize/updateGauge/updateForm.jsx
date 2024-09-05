import Navbar from '../../../../Components/Navbar/Navbar'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import {TextField,Container, Paper} from '@mui/material';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import { useUpdateGaugesize,useGaugeseizeById } from '../../../../Services/fetchApi/fetchVariantDetails/mutationGaugesize.api';
import { useParams } from 'react-router-dom';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import UpdateBreadcrub from './updatebreadcrubs.page'
import {CircularProgress} from '@mui/material';

const Update = () => {
  const { id } = useParams();
  const {data} = useGaugeseizeById(id);
  const{mutateAsync:updateMutate} = useUpdateGaugesize();
  const[gaugesize,setGaugesize] = useState('')
  const [isloading, setLoading] = useState(true);
  
useEffect(() => {
 if(data){
  setGaugesize(data.gaugesize)
 }
setTimeout(() => {
  setLoading(false)
}, 1000);


}, [data])



  const handleSubmit = async(e) => {
        e.preventDefault();
       await updateMutate({id,gaugesize});
  };

  return (
    <Box className='new' >
        <Box sx={{marginLeft:'20px',marginTop:'20px'}}><UpdateBreadcrub/></Box>
        {/*Body  */}
        {isloading ?<Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress/></Box>:(
        <Container>

        <Box sx={{display:'flex',flexDirection:'column',marginTop:'10px',marginLeft:'20%',width:'400px',height:'400px',alignItems:'center'}}>
        <form method='post' onSubmit={handleSubmit}>
          <Paper style={{display:'flex',backgroundColor:'white', flexDirection:'column',border:'2px,3px solid',alignItems:'center',marginTop:'50%',width:'300px',height:'80%'}}>
          <Box className="formInput" style={{ display: 'flex' ,flexDirection: 'column', gap: '10px' }}>
            
            <TextField
              label="update Gaugesize"
              required
              autoFocus
              variant="outlined"
              value={gaugesize}
              
              name="GaugeSize"
              sx={{width:'200px',marginTop:'30%',size:'small',border:'5px 2px solid'}}
              onChange={(e)=>setGaugesize(e.target.value)}
            />
            
          </Box>
          <Button  type='submit' variant='contained' size='small' color='primary' endIcon={<UpgradeIcon/>}
            sx={{
              marginTop: '30px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Update
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