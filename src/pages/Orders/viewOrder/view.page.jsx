import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import {Box} from '@mui/material';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import ViewCrumb from './viewbreadcrubs.page'
import CircularProgress from '../../../Components/Circularprogress/circularprogress';
import {useOrderById} from '../../../Services/fetchApi/fetchOrders/mutationsOrders.api'
import { useParams } from 'react-router-dom';
const OrderView = () => {
  const {id} = useParams()
 const {data} = useOrderById(id)
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(data){
      setOrder(data);
    }
    setTimeout(() => {
      setLoading(false);
      
    }, 2000);

  }, [data]);

  if (error) return <Typography color="error">Error: {error}</Typography>;

  if (!order) return <Typography>No order found.</Typography>;

  return (
<Box className='list' style={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer">
      <Navbar/>
     <Box marginTop={1} marginLeft={2.5}><ViewCrumb/></Box> 
     {loading?<CircularProgress/>:(

    <Container sx={{marginTop:'2%'}}>
      <Typography variant="h4" gutterBottom sx={{textAlign:'center'}}>Order Details</Typography>
      <Paper elevation={3} style={{textAlign:'center',display:'flex',flexDirection:'column', padding: 16,gap:'20px' }}>
        <Paper className='Order'>
        <Typography variant="h6">Order ID: {order._id}</Typography>
        <Typography variant="body1">Order Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
        <Typography variant="body1">Status: {order.status}</Typography>
        <Typography variant="body1">Total Amount: ${order.totalAmount.toFixed(2)}</Typography>
        </Paper>
        <Paper className='Address'>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <Typography variant="body1">{order.shippingAddress.street}</Typography>
        <Typography variant="body1">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</Typography>
        <Typography variant="body1">{order.shippingAddress.country}</Typography>
        </Paper> 
        <Paper>
        <Typography variant="h6" gutterBottom>Items</Typography>
        <List sx={{display:'flex',flexDirection:'row'}}> 
          {order.items.map((item) => (
            <ListItem key={item.product}>
              <ListItemText
                primary={item.product} // Assuming you have a way to get the product name
                secondary={`Quantity: ${item.quantity}, Price: $${item.price.toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        </Paper>
        <Divider />
        <Paper>
        <Typography variant="h6">Payment Method: {order.paymentMethod}</Typography>
        <Typography variant="body1">Payment Status: {order.paymentStatus}</Typography>
        </Paper>
      </Paper>

    </Container>
)}
    </Box>
    </Box>

  );
};

export default OrderView;
