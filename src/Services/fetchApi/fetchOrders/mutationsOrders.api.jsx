import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Orders//////////////////

const fetchOrders = async () => {
  try {
     const response = await api.get(`/orders`);
     console.log(response.data)
     return response.data;
      } 
  catch (error) {
    console.log('Error fetching orders:', error);
  }};
 

//------------- Order by Id

const fetchOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching Order by ID:', error);
  }
};




/////////////////////////////add Orders ////////////////////////////////


  const addOrder = async (newOrder) => {
    try {
      const response = await api.post(`/orders/order`,newOrder);
      console.log(response.data)
      return response.data;
        } 
    catch (error) {
    console.error('Error adding Order:', error);
      }};

//////////////////////// delete Orders /////////////////////////////////



  const deleteOrder = async (id) => {
    try {
      const response = await api.delete(`/orders/${id}`);
      console.log(response.data)
      return response.data;
        } 
    catch (error) {
      console.error('Error deleting Order:', error);
        }};

/////////////////////// update Orders ///////////////////////////////


  const updateOrder = async ({id,OrderData}) => {
    console.log(OrderData)
    try {
      const response = await api.put(`/orders/${id}`,{OrderData}); 
      console.log(response.data)
      return response.data;
        } 
    catch (error) {
      console.error('Error updating Order:', error);
        }};
//------------------------ Assigned Order
const AssignedOrder = async ({id,karigarname}) => {
  try {
    const response = await api.put(`/orders/${id}/assign-karigar`,{karigarname}); 
    return response.data;
      } 
  catch (error) {
    console.error('Error updating Order:', error);
      }};

// Update Order Status

        const updateStatusOrder = async ({status,id}) => {
          try {
            const response = await api.put(`/orders/${id}/status`,{status}); 
            return response.data;
              } 
          catch (error) {
            console.error('Error updating Order:', error);
              }};
      





////////////////////////// fetching Orders mutations /////////////////////////////////////

 // 
 export const useOrders = () => {
 return useQuery('orders', fetchOrders);
 };


//--------------- Mutation to get color by ID


export const useOrderById = (id) => {
  return useQuery(['orders', id], () => fetchOrderById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};





 ///////////////////////// Add order Mutations ////////////////////////////////////////////////

 
 
 export const useAddOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addOrder,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding order:', err);
        alert('Failed to add order. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete order Mutations /////////////////////////////////
  

  export const useDeleteMutationOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOrder,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },},
      {
        onError:(err) => {
          console.error('Error deleting order:', err);
          alert('Failed to delete order. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update order Mutations ///////////////////////////////
  

  
  export const useUpdateMutationOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrder,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },},{
        onError:(err) => {
          console.error('Error updating order:', err);
          alert('Failed to update order. Please try again later.');
        }
      });};




      export const useAssignedMutationOrder = () => {
        const queryClient = useQueryClient();
        return useMutation(AssignedOrder,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('orders');
            },},{
              onError:(err) => {
                console.error('Error updating order:', err);
                alert('Failed to update order. Please try again later.');
              }
            });};
      


       //////////////////////////////// update order Mutations ///////////////////////////////
  

  
  export const useUpdateStatusMutationOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(updateStatusOrder,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('orders');
        },},{
          onError:(err) => {
            console.error('Error updating order:', err);
            alert('Failed to update order. Please try again later.');
          }
        });};
  

