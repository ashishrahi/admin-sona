import {TextField,Container, Paper} from '@mui/material';
import {Button,Box} from '@mui/material';
import { useState,useEffect } from 'react';
import { useUpdateMutationgender,useGenderById } from '../../../../Services/fetchApi/fetchVariantDetails/mutationGender.api.jsx';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import UpdateCrumb from './updatebreadcrubs.page.jsx'
import CircularProgress from '../../../../Components/Circularprogress/circularprogress.jsx'


const Update = () => {
  const { id } = useParams();
  const {data} = useGenderById(id)
  const{mutateAsync:updateMutate} = useUpdateMutationgender();
  const[gender,setGender] = useState('')
  const[isloading,setLoading] = useState(true)
  
  //Fetching Data
  useEffect(() => {
  if(data){
  setGender(data.gender)
    }
  setTimeout(() => {
  setLoading(false)
  }, 1000);
  }, [data])


//updateMutate

  const handleSubmit = async(e) => {
        e.preventDefault();
       await updateMutate({id,gender});
  };

  return (
    <Box className='new' >
        {isloading ? <CircularProgress/>:(      
        <Container>
        <Box sx={{display:'flex',flexDirection:'column',marginTop:'10px',marginLeft:'20%',width:'400px',height:'400px',alignItems:'center'}}>
        <form method='post' onSubmit={handleSubmit}>
          <Paper style={{display:'flex',backgroundColor:'white', flexDirection:'column',border:'2px,3px solid',alignItems:'center',marginTop:'50%',width:'300px',height:'80%'}}>
          <Box className="formInput" style={{ display: 'flex' ,flexDirection: 'column', gap: '10px' }}>
            
            <TextField
              label="update Gender"
              required
              autoFocus
              variant="outlined"
              value={gender}
              
              name="Gender"
              sx={{width:'200px',marginTop:'30%',size:'small',border:'5px 2px solid'}}
              onChange={(e)=>setGender(e.target.value)}
            />
            
          </Box>
          <Button  type='submit' variant='contained' size='small' color='primary' endIcon={<AddIcon/>}
            sx={{
              marginTop: '30px', width: '150px', padding: '10px', border: 'none',
               cursor: 'pointer', alignItems: 'center',
            }}>
            Update Gender
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