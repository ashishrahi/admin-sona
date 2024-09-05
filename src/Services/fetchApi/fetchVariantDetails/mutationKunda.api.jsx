import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


////////////////////////////fetch Kundas//////////////////

const fetchKundas = async () => {
  try {
    const response = await api.get(`/kundas`);
     return response.data;
  } catch (error) {
    console.log('Error Fetching Kundas',error);
  }};
 

// Fetch Kunda by ID
const fetchKundaById = async (id) => {
  try {
    const response = await api.get(`/kundas/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching kunda by ID:', error);
  }
};





/////////////////////////////add Kundas////////////////////////////////


  const addKunda = async (newKunda) => {
    try {
       const response = await api.post(`/kundas/kunda`,newKunda);
       return response.data;
    } 
    catch (error) {
      console.log('Error Adding Kunda',error);
      }};

//////////////////////// delete Kundas /////////////////////////////////



  const deleteKunda = async (id) => {
    try {
        const response = await api.delete(`/kundas/${id}`);
        return response.data;
        } 
    catch (error) {
      console.log('Error deleting Kunda',error);
    }};
      
  

/////////////////////// update Kundas ///////////////////////////////


  const updateKunda = async ({id,kunda}) => {
    try {
       const response = await api.put(`/kundas/${id}`,{kunda}); 
       return response.data;
    } 
    catch (error) {
      console.log('Error Updating Kunda',error);
      }};

/////////////////////// status Kundas ///////////////////////////////


const statusKunda = async (id) => {
  try {
    const response = await api.put(`/kundas/${id}`); 
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }};









////////////////////////// fetching kundas mutations /////////////////////////////////////

 // 
 export const useKunda = () => {
 return useQuery('kundas', fetchKundas);
 };


  // Hook to get kunda by ID

  export const useKundaById = (id) => {
    return useQuery(['kundas', id], () => fetchKundaById(id), {
      enabled: !!id,  // Ensure the query is only enabled if there's an id
    });
  };




 ///////////////////////// Add kundas Mutations ////////////////////////////////////////////////

 
 
 export const useAddKundaMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(addKunda,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('kundas');
        navigate(`/Kunda`)
      },
    },
    {
      onError:(err) => {
        console.error('Error adding kunda:', err);
        alert('Failed to add kunda. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete kunda Mutations /////////////////////////////////
  

  export const useDeleteMutationKunda = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteKunda,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('kundas');
      },},
      {
        onError:(err) => {
          console.error('Error deleting kunda:', err);
          alert('Failed to delete kunda. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update Kunda Mutations ///////////////////////////////
  

  
  export const useUpdateMutationKunda = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(updateKunda,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('kundas');
        navigate(`/Kunda`)
      },},{
        onError:(err) => {
          console.error('Error updating kunda:', err);
          alert('Failed to update kunda. Please try again later.');
        }
      });};

// ==================> Status Mutation

      export const useStatusMutationKunda = () => {
        const queryClient = useQueryClient();
        return useMutation(statusKunda,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('kundas');
            },},{
              onError:(err) => {
                console.error('Error updating kunda:', err);
                alert('Failed to update kunda. Please try again later.');
              }
            });};