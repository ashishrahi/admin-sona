import { TextField, Container, Paper} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Button, Box } from '@mui/material';
import { useAddPolicyrMutation } from '../../../Services/fetchApi/fetchPrivacyPolicy/mutationPrivacypolicy.api';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles for react-quill
import { useEffect, useState } from 'react';
import {CircularProgress} from '@mui/material'


const New = () => {
  const { mutateAsync: addMutatePolicy } = useAddPolicyrMutation();
  const[isloading,setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
    setLoading(false)
      
    }, 1000);
  }, [])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      
    },
    onSubmit: async (values, { resetForm }) => {
      await addMutatePolicy(values);
      resetForm();
    },
  });

  return (
    <Box className='new' >
        {/* Body */}
        {isloading?<Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>:
        <Container sx={{ marginTop: '30px', 'border-color': 'solid' }}>
          <form method='post' onSubmit={formik.handleSubmit}>
            <Paper style={{ alignItems: 'center', width: '1100px', height: 'auto', padding: '20px' }}>
              <Box className="formInput" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                  label="Title"
                  required
                  variant="outlined"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  sx={{ width: '100%' }}
                />
                {/* <TextField
                  label="Description"
                  required
                  variant="outlined"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  sx={{ width: '100%' }}
                /> */}
                <ReactQuill
                  value={formik.values.description}
                  onChange={(value) => formik.setFieldValue('description', value)}
                  theme="snow"
                   required
                  style={{ width: '100%', height: '250px' }} 
                />
              </Box>
          <Box className='about-button' sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>    
            <Button type='submit' variant='contained' endIcon={<SendIcon />}
                sx={{marginTop: '6%', width: '150px', padding: '10px', border: 'none',
                  cursor: 'pointer', alignItems: 'center',
                }}>
                Add Policy
              </Button></Box>
              </Paper>


          </form>
        </Container>
         }
      </Box>
  );
}

export default New;
