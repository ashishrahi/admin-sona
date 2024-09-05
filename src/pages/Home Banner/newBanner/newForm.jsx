import React, { useState,useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useAddCategoryMutation } from '../../../Services/fetchApi/fetchCategory/mutationCategory.api';
import Newcrumb from './newbreadcrubs.page'
import Circularprogress from '../../../Components/Circularprogress/circularprogress';
const validationSchema = Yup.object({
  bannername: Yup.string()
    .required('Category Name is required'),
  image: Yup.mixed()
    .required('An image file is required')
    .test('fileSize', 'File too large', value => value && value.size <= 5242880) // 5MB
    .test('fileType', 'Unsupported File Format', value => value && ['image/jpeg', 'image/png', 'image/gif', 'image/avif'].includes(value.type)),
});

const FormComponent = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { mutateAsync: addCategory } = useAddCategoryMutation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const formik = useFormik({
    initialValues: {
      bannername: '',
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try { 
        const formData = new FormData();
        formData.append('bannername', values.bannername); // Append category name
        
        if (values.image) { // Check if file is not null
          formData.append('file', values.image); // Append file
        }

        await addCategory(formData);
        formik.resetForm();
        setImagePreview(null); // Clear image preview after submission
      } catch (error) {
        console.error('Error adding category:', error);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('image', file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
<Box className='list' >
        {isLoading ? <Circularprogress/>:(
    <Container sx={{marginTop:'10%'}}>
     <Paper sx={{width:'400px',marginLeft:'20%'}}>
           <Typography variant='h6' sx={{textAlign:'center'}}>New Banner</Typography>      
     <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', padding: 2 }}
    >
      <TextField
        fullWidth
        id="bannername"
        name="bannername"
        label="Banner Name"
        value={formik.values.bannername}
        onChange={formik.handleChange}
        error={formik.touched.bannername && Boolean(formik.errors.bannername)}
        helperText={formik.touched.bannername && formik.errors.bannername}
      />
      
      <Button
        variant="contained"
        component="label"
        sx={{ marginTop: 2 }}
      >
        Upload Image
        <input
          id="image"
          name="image"
          type="file"
          onChange={handleFileChange}
          hidden
        />
      </Button>
      
      {formik.touched.image && formik.errors.image && (
        <Typography color="error" sx={{ marginTop: 1 }}>{formik.errors.image}</Typography>
      )}

      {imagePreview && (
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }} />
        </Box>
      )}

      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </Box> 
    </Paper>
    </Container>
   
    )}
    </Box>
  );
};

export default FormComponent;
