import React, { useState, useEffect } from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import * as Yup from 'yup';
import AddCrumb from './addbreadcrubs.page';
import CircularProgress from '../../../Components/Circularprogress/circularprogress';
import { useAddKarigarMutation } from '../../../Services/fetchApi/fetchKarigar/mutationKarigar.api';
import {
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Container,
  Grid,
  Avatar,
  Input
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  avatar: Yup.string().default('avatar.png'),
  name: Yup.string(),
  phone: Yup.string().required('Phone is required'),
  address: Yup.array().of(
    Yup.object().shape({
      house: Yup.string().required('House is required'),
      pincode: Yup.string().required('Pincode is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      status: Yup.boolean().default(true)
    })
  ),
  status: Yup.boolean().default(true)
});

const VenderForm = () => {
  const [avatarPreview, setAvatarPreview] = useState('avatar.png');
  const [uploading, setUploading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { mutateAsync: addMutationKarigar } = useAddKarigarMutation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: [{ house: '', pincode: '', city: '', country: '', status: true }],
      status: true
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        const file = formik.values.avatar;
        if (file) {
          formData.append('file', file);
        }
        formData.append('values', JSON.stringify(values));

        await addMutationKarigar(formData);

        console.log('Form values:', values);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      formik.setFieldValue('avatar', file);
    }
  };

  return (
    <Box className='list' >
        <Box marginTop={1} marginLeft={2.5}><AddCrumb /></Box>
        {isLoading ? <CircularProgress /> : (
          <Container sx={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              Vender Form
            </Typography>
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <Avatar src={avatarPreview} alt="Avatar" sx={{ width: 56, height: 56 }} />
                  <Box marginLeft={2}>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      disabled={uploading}
                    />
                    {uploading && <CircularProgress size={24} />}
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  margin="normal"
                />

                <FieldArray name="address">
                  {({ push, remove, form }) => (
                    <div>
                      {form.values.address.map((_, index) => (
                        <Box key={index} marginBottom={2}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                id={`address[${index}].house`}
                                name={`address[${index}].house`}
                                label="House"
                                value={form.values.address[index].house}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={Boolean(
                                  form.touched.address?.[index]?.house &&
                                  form.errors.address?.[index]?.house
                                )}
                                helperText={
                                  form.touched.address?.[index]?.house &&
                                  form.errors.address?.[index]?.house
                                }
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                id={`address[${index}].pincode`}
                                name={`address[${index}].pincode`}
                                label="Pincode"
                                value={form.values.address[index].pincode}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={Boolean(
                                  form.touched.address?.[index]?.pincode &&
                                  form.errors.address?.[index]?.pincode
                                )}
                                helperText={
                                  form.touched.address?.[index]?.pincode &&
                                  form.errors.address?.[index]?.pincode
                                }
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                id={`address[${index}].city`}
                                name={`address[${index}].city`}
                                label="City"
                                value={form.values.address[index].city}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={Boolean(
                                  form.touched.address?.[index]?.city &&
                                  form.errors.address?.[index]?.city
                                )}
                                helperText={
                                  form.touched.address?.[index]?.city &&
                                  form.errors.address?.[index]?.city
                                }
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                id={`address[${index}].country`}
                                name={`address[${index}].country`}
                                label="Country"
                                value={form.values.address[index].country}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={Boolean(
                                  form.touched.address?.[index]?.country &&
                                  form.errors.address?.[index]?.country
                                )}
                                helperText={
                                  form.touched.address?.[index]?.country &&
                                  form.errors.address?.[index]?.country
                                }
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <IconButton
                                onClick={() => remove(index)}
                                color="secondary"
                                size="large"
                                aria-label="delete"
                              >
                                <Delete />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          push({
                            house: '',
                            pincode: '',
                            city: '',
                            country: '',
                            status: true
                          })
                        }
                      >
                        Add Address
                      </Button>
                    </div>
                  )}
                </FieldArray>

                <Button color="primary" variant="contained" fullWidth type="submit">
                  Submit
                </Button>
              </form>
            </FormikProvider>
          </Container>
        )}
      </Box>
  );
};

export default VenderForm;
