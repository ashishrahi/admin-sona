import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import {Box} from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import HomeIcon from '@mui/icons-material/Home';
import Circularprogress from '../../../Components/Circularprogress/circularprogress';
import {useUserbyId} from '../../../Services/fetchApi/fetchUsers/mutationUsers.api'

const ViewUser = () => {
  const { id } = useParams(); // Assumes you're using React Router for routing
  const{data} = useUserbyId(id)
  console.log(data)
  const [user, setUser] = useState();
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    if(data){
      setUser(data)
    }
  setTimeout(() => {
  setLoading(false)
}, 1000);

  }, [data]);

  let avatar, username,email, phone, status, house, city, country;
  if (user) {
    ({ avatar, username, email,phone, status, address: [{ house, city, country }] = [{}] } = user);
  }

  return (
    <Box className='list' >

   {isloading ? <Circularprogress/>:(
    <Container style={{marginTop:'20px'}}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Avatar
                alt={username}
                src={avatar}
                sx={{ width: 50, height: 50 }}
              />
            </Grid>
            <Grid item xs={14} sm={8} >
              <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <Typography variant="h4">{username}</Typography>
              <Typography variant="subtitle1" gap={1} sx={{display:'flex'}}><EmailIcon/>Email:{email}</Typography>
              <Typography variant="body1" gap={1} sx={{display:'flex'}}><PhoneAndroidIcon/>Phone: {phone}</Typography>
              <Typography variant="body1" gap={1} sx={{display:'flex'}}><AutorenewIcon/>Status: {status ? <Typography sx={{color:'green'}}>{'Active'}</Typography> : 'Inactive'}</Typography>
              <Typography variant="body1" gap={1} sx={{color:'brown',display:'flex'}}>
              <HomeIcon/> Address: {house}, {city}, {country}
              </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
    )}
    </Box>
  );
};

export default ViewUser;
