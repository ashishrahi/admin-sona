import React, { useState,useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useUpdateMutationCategory,useCategoryById} from '../../../Services/fetchApi/fetchCategory/mutationCategory.api';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import Updatecrumb from './updatebreadcrubs.page'
import Circularprogress from '../../../Components/Circularprogress/circularprogress';
import { useParams } from 'react-router-dom';
const validationSchema = Yup.object({
  categoryname: Yup.string()
    .required('Category Name is required'),
  image: Yup.mixed()
    .required('An image file is required')
    .test('fileSize', 'File too large', value => value && value.size <= 5242880) // 5MB
    .test('fileType', 'Unsupported File Format', value => value && ['image/jpeg', 'image/png', 'image/gif', 'image/avif'].includes(value.type)),
});

const FormComponent = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const{id}= useParams();
  console.log(id)
  const {data} = useCategoryById(id)
  const { mutateAsync: updateCategory } = useUpdateMutationCategory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      formik.setValues({ categoryname: data.categoryname });
      setImagePreview(data.image); // Set image preview from server
      
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      categoryname: '',
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try { 
        const formData = new FormData();
        formData.append('categoryname', values.categoryname); // Append category name
        
        if (values.image) { // Check if file is not null
          formData.append('file', values.image); // Append file
        }
console.log(id)
        await updateCategory({id,formData});
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
<Box className='list' style={{ display: 'flex' }}>
      <Sidebar />
      <Box className="listContainer" style={{ flex: 6 }}>
        <Navbar />
        <Box marginTop={1} marginLeft={2.5}><Updatecrumb /></Box>
        {isLoading ? <Circularprogress/>:(
    <Container sx={{marginTop:'10%'}}>
     <Paper sx={{width:'400px',marginLeft:'20%'}}>
           <Typography variant='h6' sx={{textAlign:'center'}}>Update Category</Typography>      
     <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', padding: 2 }}
    >
      <TextField
        fullWidth
        id="categoryname"
        name="categoryname"
        label="Category Name"
        value={formik.values.categoryname}
        onChange={formik.handleChange}
        error={formik.touched.categoryname && Boolean(formik.errors.categoryname)}
        helperText={formik.touched.categoryname && formik.errors.categoryname}
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
    </Box>
  );
};

export default FormComponent;
