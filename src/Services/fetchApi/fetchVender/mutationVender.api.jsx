import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


//--------------------------- fetch Venders

const fetchVenders = async () => {
  try {
    const response = await api.get(`/venders`);
    return response.data;
      } 
  catch (error) {
    console.log('Error fetching venders:', error);
    }};

//------------- Karigar by Id

const fetchVenderById = async (id) => {
  try {
    const response = await api.get(`/venders/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching Karigar by ID:', error);
  }
};




 
//---------------------------- add Venders


  const addVender = async (formData) => {
    try {
        const response = await api.post(`/venders/vender`,formData);
        return response.data;
        } 
    catch (error) {
      console.error('Error adding Vender:', error);
    }};

//--------------------------- Update Venders 

    const updateVender = async ({id,formData}) => {
      try {
          const response = await api.put(`/venders/${id}`,formData); 
          return response.data;
         }
     catch (error) {
        console.log('Error updating vender:', error);
         }};






//-----------------------  delete Venders 


  const deleteVender = async (id) => {
    try {
      const response = await api.delete(`/venders/${id}`);
      return response.data;
        } 
    catch (error) {
      console.error('Error deleting Vender:', error);
       }};



//----------------------------- Update vender  


const updateVenderStatus = async (venderData,id) => {
  try {
     const response = await api.put(`/venders/${id}`,venderData); 
  console.log(response.data)
  return response.data;
      } 
  catch (error) {
    console.log('Error updating Vender:', error);
    }};
//--------------- Mutation to get Vender by ID


export const useVenderById = (id) => {
  return useQuery(['venders', id], () => fetchVenderById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


/////////////////////////////// update Karigar Mutations ///////////////////////////////
  

  
export const useUpdateMutationKarigar = () => {
  const navigate = useNavigate()
const queryClient = useQueryClient();

return useMutation(updateVender,{
    onSuccess: () => {
      queryClient.invalidateQueries('venders');
      navigate('/Vender-List');
     },
  
    }
  );};



////////////////////////// fetching venders mutations /////////////////////////////////////

 // 
 export const useVenderMutation = () => {
 return useQuery('venders', fetchVenders);
 };

 ///////////////////////// Add vender Mutations ////////////////////////////////////////////////

 
 
 export const useAddVenderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addVender,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('venders');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding vender:', err);
        alert('Failed to add vender. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete Vender Mutations /////////////////////////////////
  

  export const useDeleteMutationVender= () => {
  const queryClient = useQueryClient();
  return useMutation(deleteVender,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('venders');
      },},
      {
        onError:(err) => {
          console.error('Error deleting vender:', err);
          alert('Failed to delete vender. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update Vender Mutations ///////////////////////////////
  

  
  export const useUpdateMutationVender = () => {
  const queryClient = useQueryClient();
  return useMutation(updateVender,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('venders');
      },},{
        onError:(err) => {
          console.error('Error updating vender:', err);
          alert('Failed to update vender. Please try again later.');
        }
      });};

//----------------Update Vender Status

export const useStatusMutationVender = () => {
  const queryClient = useQueryClient();
  return useMutation(updateVenderStatus,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('venders');
      },},{
        onError:(err) => {
          console.error('Error updating vender:', err);
          alert('Failed to update vender. Please try again later.');
        }
      });};
