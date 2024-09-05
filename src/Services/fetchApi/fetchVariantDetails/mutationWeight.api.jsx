import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


////////////////////////////fetch Weights//////////////////

const fetchWeights = async () => {
  try {
    const response = await api.get(`/weights`);
return response.data;
      } 
  catch (error) {
    console.log('Error fetching weights:', error.message);
  }};
 
// Fetch dandi by ID
const fetchWeightById = async (id) => {
  try {
    const response = await api.get(`/weights/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching dandi by ID:', error);
  }
};

/////////////////////////////add Weights////////////////////////////////


  const addWeight = async (weight) => {

try {
  const response = await api.post(`/weights/weight`,weight);
  return response.data;
    } 
catch (error) {
  console.log('Error adding weight:', error.message);
}

  
  };

//////////////////////// delete Weights /////////////////////////////////



  const deleteWeight = async (id) => {
   try {
      const response = await api.delete(`/weights/${id}`);
     return response.data;
   } 
   catch (error) {
    console.log('Error deleting weight:', error.message);
    }

  
  };

/////////////////////// update Weights ///////////////////////////////


  const updateWeight = async ({id,weight}) => {

    try {
          const response = await api.put(`/weights/${id}`,{weight}); 
          return response.data;
    } 
    catch (error) 
    {
      console.log('Error updating weight:', error.message);
      }};



  ///////////////////////// status weight Mutations /////////////////////////////////

  const updateStatusWeight = async (id) => {
    const response = await api.put(`/weights/${id}/status`); 
    return response.data;
    };




////////////////////////// fetching weight mutations /////////////////////////////////////

 // 
 export const useWeight = () => {
 return useQuery('weights', fetchWeights);
 };


  //------------------ Hook to get dandi by ID

  export const useWeightById = (id) => {
    return useQuery(['weights', id], () => fetchWeightById(id), {
      enabled: !!id,  // Ensure the query is only enabled if there's an id
    });
  };



 //-------------------- Add weight Mutations 

 
 
 export const useAddWeight = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(addWeight,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('weights');
        navigate(`/Weight`)
      },
    },
    {
      onError:(err) => {
        console.error('Error adding weight:', err);
        alert('Failed to add weight. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete weight Mutations /////////////////////////////////
  

  export const useDeleteWeight = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteWeight,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('weights');
      },},
      {
        onError:(err) => {
          console.error('Error deleting weight:', err);
          alert('Failed to delete weight. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update weight Mutations ///////////////////////////////
  

  
  export const useUpdateWeight = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(updateWeight,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('weights');
        navigate(`/Weight`)
      },},{
        onError:(err) => {
          console.error('Error updating weight:', err);
          alert('Failed to update weight. Please try again later.');
        }
      });};


      export const useStatusWeight = () => {
        const queryClient = useQueryClient();
        return useMutation(updateStatusWeight,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('weights');
            },},{
              onError:(err) => {
                console.error('Error updating weight:', err);
                alert('Failed to update weight. Please try again later.');
              }
            });};

