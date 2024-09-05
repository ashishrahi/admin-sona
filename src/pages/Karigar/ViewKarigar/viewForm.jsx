import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Avatar, Grid, Button, Box } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import HomeIcon from '@mui/icons-material/Home';
import { useKarigarById } from '../../../Services/fetchApi/fetchKarigar/mutationKarigar.api.jsx';
import CircularProgress from '../../../Components/Circularprogress/circularprogress.jsx';
const KarigarDetail = () => {
  const { id } = useParams(); // Assumes you're using React Router for routing
  const { data } = useKarigarById(id);
  const [karigar, setKarigar] = useState();
  const [isLoading, setLoading] = useState(true);

  // Fetching Data
  useEffect(() => {
    if (data) {
      setKarigar(data);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [data]);

  // Functions of View
  const handleUpdateClick = () => {
    // Handle the update button click event here
    console.log('Update button clicked');
    // You could redirect to an update form or open a modal, for example
      };


  // Destructure data with error handling
  let avatar, name, phone, status, house, pincode, city, country;
  if (karigar) {
    ({ avatar, name, phone, status, address: [{ house, pincode, city, country }] = [{}] } = karigar);
  }

  return (
    <Box className='list' >

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Container style={{ marginTop: '20px' }}>
            <Card>
              <Link to={`/Karigar-List/${id}/update`}>
                <Button variant="text" color="primary" onClick={handleUpdateClick}>
                  Update
                </Button>
              </Link>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Avatar
                      // alt={karigar.username}
                      src={avatar}
                      sx={{ width: 150, height: 150 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <Typography variant="h4">{name}</Typography>
                      {/* <Typography variant="subtitle1" gap={1} sx={{ display: 'flex' }}>
                        <EmailIcon /> Email: {karigar.email}
                      </Typography> */}
                      <Typography variant="body1" gap={1} sx={{ display: 'flex' }}>
                        <PhoneAndroidIcon /> Phone: {phone}
                      </Typography>
                      <Typography variant="body1" gap={1} sx={{ display: 'flex' }}>
                        <AutorenewIcon /> Status: {status ? <Typography sx={{ color: 'green' }}>{'Active'}</Typography> : 'Inactive'}
                      </Typography>
                      <Typography variant="body1" gap={1} sx={{ color: 'brown', display: 'flex' }}>
                        <HomeIcon /> Address: {house}, {pincode}, {city}, {country}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={2} sx={{ textAlign: 'right' }}>
                  {/* Additional content if needed */}
                </Box>
              </CardContent>
            </Card>
          </Container>
        )}
      </Box>
  );
};

export default KarigarDetail;
