import {TextField,Container, Paper} from '@mui/material';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import { useUpdateWeight,useWeightById } from '../../../../Services/fetchApi/fetchVariantDetails/mutationWeight.api';
import { useParams } from 'react-router-dom';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CircularProgress from '../../../../Components/Circularprogress/circularprogress';



const Update = () => {

  //State management
  const { id } = useParams();
  const {data} = useWeightById(id);
  const{mutateAsync:updateMutateWeight} = useUpdateWeight();
  const[weight,setWeight] = useState('')
  const[isloading,setLoading] = useState(true)
  const [open, setOpen] = useState(false);

  
 //fetching Data
  useEffect(() => {
    if(data){
      setWeight(data.weight)
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [data])

  //Update Weight 
    const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMutateWeight({id, weight});
    setOpen(true);
};


  return (
    <Box className='new' >
       {isloading ? <CircularProgress/> :(
       <Container>
        <Box sx={{display:'flex',flexDirection:'column',marginTop:'10px',marginLeft:'20%',width:'400px',height:'400px',alignItems:'center'}}>
        <form method='post' onSubmit={handleSubmit}>
          <Paper style={{display:'flex',backgroundColor:'white', flexDirection:'column',border:'2px,3px solid',alignItems:'center',marginTop:'50%',width:'300px',height:'80%'}}>
          <Box className="formInput" style={{ display: 'flex' ,flexDirection: 'column', gap: '10px' }}>
            
            <TextField
              label="Update Weight"
              required
              autoFocus
              variant="outlined"
              value={weight}
              
              name="WeightName"
              sx={{width:'200px',marginTop:'30%',size:'small',border:'5px 2px solid'}}
              onChange={(e)=>setWeight(e.target.value)}
            />
            
          </Box>
          <Button type='submit' variant='contained' size='small' color='primary' endIcon={<UpgradeIcon/>}
            sx={{
              marginTop: '30px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Update Weight
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