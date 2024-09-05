import { TextField, Container, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Button, Box } from '@mui/material';
import { useAddAbout } from '../../../Services/fetchApi/fetchAbout/mutationAbout.api';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles for react-quill
import { useState,useEffect } from 'react';
import Circularprogress from '../../../Components/Circularprogress/circularprogress';

const New = () => {
  const { mutateAsync: addMutateAbout } = useAddAbout();
  const[isloading,setLoading] = useState(true)

useEffect(() => {
 setTimeout(() => {
  setLoading(false)
 }, 1000);
}, [])



  const formik = useFormik({
    initialValues: {
      title: '',
      // description: '',
      description: ''
    },
    onSubmit: async (values, { resetForm }) => {
      await addMutateAbout(values);
      resetForm();
    },
  });

  return (
    <Box className='new' >
        {/* Body */}
        {isloading ? <Circularprogress/>:(
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
                  style={{ width: '100%', height: '250px' }} 
                />
              </Box>
          <Box className='about-button' sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>    
            <Button type='submit' variant='contained' endIcon={<SendIcon />}
                sx={{marginTop: '7%', width: '150px', padding: '10px', border: 'none',
                  cursor: 'pointer', alignItems: 'center',
                }}>
                Add About
              </Button></Box>
              </Paper>
         </form>
        </Container>
        )}
    </Box>
  );
}

export default New;
