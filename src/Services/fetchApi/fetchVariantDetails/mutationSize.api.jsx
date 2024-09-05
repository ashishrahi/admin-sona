import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';

//////////////////////////// fetch sizes //////////////////

const fetchsizes = async () => {
  try {
      const response = await api.get(`/sizes`);
     return response.data;
  } 
  catch (error) {
    console.error('Error fetching sizes:', error);
    }};
 
// Fetch dandi by ID
const fetchSizeById = async (id) => {
  try {
    const response = await api.get(`/sizes/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching size by ID:', error);
  }
};






///////////////////////////// add sizes////////////////////////////////


  const addsize = async (newsize) => {
    try {
        const response = await api.post(`/sizes/size`,newsize);
        return response.data;
    } 
    catch (error) {
      console.error('Error adding size:', error);
      }};

//////////////////////// delete sizes /////////////////////////////////



  const deletesize = async (id) => {
    try {
        const response = await api.delete(`/sizes/${id}`);
        return response.data;
        } 
    catch (error) {
      console.error('Error deleting size:', error);
      }};
       
/////////////////////// update sizes ///////////////////////////////


  const updatesize = async ({id,size}) => {
    try {
        const response = await api.put(`/sizes/${id}`,{size}); 
        return response.data;
        } 
    catch (error) {
    console.error('Error updating size:', error);
      }};

/////////////////////// update sizes ///////////////////////////////


const statussize = async (id) => {
  
  try {
    const response = await api.put(`/sizes/${id}/status`); 
    return response.data;
  } 
  catch (error) {
    console.error('Error updating size status:', error);
    }};



////////////////////////// fetching sizes mutations /////////////////////////////////////

 // 
 export const useSize = () => {
 return useQuery('sizes', fetchsizes);
 };

//------------------------ fetching by Id
 export const useSizeById = (id) => {
  return useQuery(['sizes', id], () => fetchSizeById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};




 ///////////////////////// Add Gaugesize Mutations ////////////////////////////////////////////////

 
 
 export const useAddsize = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  return useMutation(addsize,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sizes');
        navigate('/Size')
      },
    },
    {
      onError:(err) => {
        console.error('Error adding size:', err);
        alert('Failed to add size. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete size Mutations /////////////////////////////////
  

  export const useDeletesize = () => {
  const queryClient = useQueryClient();
  return useMutation(deletesize,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('sizes');
      },},
      {
        onError:(err) => {
          console.error('Error deleting size:', err);
          alert('Failed to delete size. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update size Mutations ///////////////////////////////
  

  
  export const useUpdatesize = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(updatesize,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sizes');
        navigate('/Size')
      },},{
        onError:(err) => {
          console.error('Error updating size:', err);
          alert('Failed to update size. Please try again later.');
        }
      });};


      export const useStatussize = () => {
        const queryClient = useQueryClient();
        return useMutation(statussize,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('sizes');
            },},{
              onError:(err) => {
                console.error('Error updating size:', err);
                alert('Failed to update size. Please try again later.');
              }
            });};
