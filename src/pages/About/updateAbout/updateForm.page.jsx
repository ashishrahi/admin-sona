import  { useEffect,useState } from 'react';

import { TextField, Container, Paper, Typography, Skeleton } from '@mui/material';
import { Button, Box } from '@mui/material';
import { useUpdateAbout, useAboutById } from '../../../Services/fetchApi/fetchAbout/mutationAbout.api';
import UpdateCrub from './updatebreadcrubs.page';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Circularprogress from '../../../Components/Circularprogress/circularprogress';
const New = () => {
  const { id } = useParams();
  const { data } = useAboutById(id);
  const { mutateAsync: updateMutateAbout } = useUpdateAbout();
  const[isloading,setLoading] = useState(true)


  useEffect(() => {
    if (data) {
      formik.setValues({ title: data.title, description: data.description });
    }
setTimeout(() => {
  setLoading(false)
}, 2000);

  }, [data]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    onSubmit: async (values, { resetForm }) => {
      await updateMutateAbout({id, values});
      resetForm();
    },
  });

  return (
    <Box className='new' >
        {/* breadcrubs */}
        <Box marginTop={1} marginLeft={2.5}><UpdateCrub/></Box>
        {/* Body */}
        {isloading ? <Circularprogress/> :(
        <Container sx={{ marginTop: '30px', 'border-color': 'solid' }}>
          <form method='post' onSubmit={formik.handleSubmit}>
            <Paper style={{ alignItems: 'center', width: '1100px', height: 'auto', padding: '20px' }}>
              <Box className="formInput" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
               
                  <>
                    <TextField
                      label="Title"
                      required
                      variant="outlined"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      sx={{ width: '100%' }}
                    />
                    <ReactQuill
                      value={formik.values.description}
                      onChange={(value) => formik.setFieldValue('description', value)}
                      theme="snow"
                      style={{ width: '100%', height: '250px' }}
                    />
                  </>
                
              </Box>
              <Box className='about-button' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button type='submit' variant='contained' endIcon={<UpgradeIcon />}
                  sx={{
                    marginTop: '7%', width: '150px', padding: '10px', border: 'none',
                    cursor: 'pointer', alignItems: 'center',
                  }}>
                  About
                </Button>
              </Box>
            </Paper>
          </form>
        </Container>
        )}
      </Box>
  );
}

export default New;
