import Categorybreadcrubs from './updatebreadcrubs.page'
import Circularprogress from '../../../Components/Circularprogress/circularprogress';
import { useEffect,useState } from 'react';
import { useFormik } from 'formik';
import {useAddCategoryMutation} from '../../../Services/fetchApi/fetchCategory/mutationCategory.api'
import {
  Card,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
  Box,
  Container,
  Typography,
} from '@mui/material';

const details = [
  { name: 'color', label: 'Color' },
  { name: 'dandi', label: 'Dandi' },
  { name: 'gaugesize',label: 'Gauge Size' },
  { name: 'gender', label: 'Gender' },
  { name: 'kunda', label: 'Kunda' },
  { name: 'purity', label: 'Purity' },
  { name: 'size', label: 'Size' },
  { name: 'weight', label: 'Weight' },
];

  const CategoryForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isloading, setLoading] = useState(true);
  const {mutateAsync:addCategory} = useAddCategoryMutation()

  // -------- Loading Progress
useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 2000);

}, [])



  const formik = useFormik({
    initialValues: {
      categoryname: '',
      variantdetails: details.reduce((acc, detail) => {
        acc[detail.name] = 'off'; // default value can be 'off'
        return acc;
      }, {}),
      image: null,
    },
    onSubmit: async (values) => {
      console.log(values)
          const formData = new FormData();
          const file = values.file;
          console.log(file)
          formData.append('values', JSON.stringify(values));
          formData.append('file', file);
         
        console.log(formData)
        await addCategory(formData)
       },});

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue('file', file);

    // Create an image preview
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

    {isloading ? <Circularprogress/>:   

    <Container>

   <Typography variant='h4' sx={{textAlign:'center'}}>Update Category</Typography>

    <Card
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow:'initial'
      }}
    >
    

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="categoryname"
          name="categoryname"
          label="Category Name"
          value={formik.values.categoryname}
          onChange={formik.handleChange}
          error={formik.touched.categoryname && Boolean(formik.errors.categoryname)}
          helperText={formik.touched.categoryname && formik.errors.categoryname}
          margin="normal"
          variant="outlined"
        />

        <FormControl fullWidth margin="normal">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {imagePreview && (
            <Box mt={2} mb={2}>
              <img src={imagePreview} alt="Image Preview" style={{ width: '100px', maxHeight: 200 }} />
            </Box>
          )}
        </FormControl>

        {details.map((detail) => (

          <FormControl component="fieldset" margin="normal" key={detail.name} fullWidth>
            <Box sx={{display:'flex',flexDirection:'column',alignItems:'column'}}>
           
            <FormLabel component="legend">{detail.label}</FormLabel>
            <RadioGroup
              row
              aria-label={detail.name}
              name={`variantdetails.${detail.name}`}
              value={formik.values.variantdetails[detail.name]}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="on" control={<Radio />} label="On" />
              <FormControlLabel value="off" control={<Radio />} label="Off" />
              <FormControlLabel value="optional" control={<Radio />} label="Optional" />
            </RadioGroup>
            </Box>
          </FormControl>
        ))}

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Card>
    </Container>
}
    </Box>

  );
};

export default CategoryForm;
