import Circularprogress from '../../../Components/Circularprogress/circularprogress';
import { useEffect, useState } from 'react';
import { useCategoryById } from '../../../Services/fetchApi/fetchCategory/mutationCategory.api'
import { Link, useParams } from 'react-router-dom';
import {Button} from '@mui/material';
import {
  Card,
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const details = [
  { name: 'color', label: 'Color' },
  { name: 'dandi', label: 'Dandi' },
  { name: 'gaugesize', label: 'Gauge Size' },
  { name: 'gender', label: 'Gender' },
  { name: 'kunda', label: 'Kunda' },
  { name: 'purity', label: 'Purity' },
  { name: 'size', label: 'Size' },
  { name: 'weight', label: 'Weight' },
];

const CategoryView = () => {
  
  const { id } = useParams();
   const { data } = useCategoryById(id);
  const [imagePreview, setImagePreview] = useState(null);
  const [isloading, setLoading] = useState(true);

  
  // -------- Loading Progress
  useEffect(() => {
    if (data) {
      setImagePreview(data.image); // Set image preview from server
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [data]);

  

  return (
    <Box className="list" >
      

        {isloading ? (
          <Circularprogress />
        ) : (
          <Container>
           
         <Card
              sx={{
                maxWidth: 600,
                mx: 'auto',
                mt: 4,
                p: 3,
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
               <Typography variant="h6" sx={{ textAlign: 'center' }}>
             View Category Details
            </Typography>
              <Link to={`Category-List/${id}/update`}><Button>Update</Button></Link>
              {imagePreview && (
                <Box mt={2} mb={2} sx={{ textAlign: 'center' }}>
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{ width: '100px', maxHeight: 200 }}
                  />
                </Box>
              )}
              <List>
                <ListItem>
                  <ListItemText
                    primary="Category Name"
                    secondary={data?.categoryname || 'N/A'}
                    sx={{fontWeight:'bold'}}
                  />
                </ListItem>
                <Divider />
                {details.map((detail) => (
                  <ListItem key={detail.name}>
                    <ListItemText
                      primary={detail.label}
                      secondary={data?.variantdetails[detail.name] || 'Off'}
                    />
                  </ListItem>
                ))}
              </List>

            </Card>
          </Container>
        )}
      </Box>
  );
};

export default CategoryView;
