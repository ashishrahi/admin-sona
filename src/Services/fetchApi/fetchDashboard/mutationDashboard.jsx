import { useQuery,} from 'react-query';
import api from '../../../utilities/Api'

//-------------------- Count Users

const countUsers = async () => {
const response = await api.get(`/users/count`);
console.log(response.data)
return response.data;
};
 

//-------------------- add Orders

  const countOrders = async () => {
  const response = await api.post(`/orders/count`);
  console.log(response.data)
  return response.data;
  };


//---------------- Mutation About 

  
 export const useUsers = () => {
 return useQuery('users', countUsers);
 };

//---------------- Mutation Orders 

  
  export const useOrders = () => {
  return useQuery('orders', countOrders);
  };





 
