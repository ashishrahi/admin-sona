import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


////////////////////////////fetch Genders//////////////////

const fetchGenders = async () => {
  try {
    const response = await api.get(`/genders`);
    return response.data;
       } 
  catch (error) {
    console.error('Error fetching genders:', error);
    throw error;
    }};
 

// Fetch dandi by ID
const fetchGenderById = async (id) => {
  try {
    const response = await api.get(`/genders/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching gender by ID:', error);
  }
};




/////////////////////////////add Gender////////////////////////////////


  const addGender = async (newGender) => {
    try {
        const response = await api.post(`/genders/gender`,newGender);
        return response.data;
        } 
    catch (error) {
    console.error('Error Adding genders:', error);
  }};

//////////////////////// delete Gender /////////////////////////////////



  const deleteGender = async (id) => {
    try {
      const response = await api.delete(`/genders/${id}`);
  return response.data;
    } 
    catch (error) {
     console.error('Error Deleting genders:', error);
      }};

/////////////////////// update Gender ///////////////////////////////


  const updateGender = async ({id,gender}) => {
  const response = await api.put(`/genders/${id}`,{gender}); 
  return response.data;
  };


////////////////////// Status Gender ///////////////////////////////


const statusGender = async (id) => {
  const response = await api.patch(`/genders/${id}/status`); 
  return response.data;
  };






////////////////////////// fetching Genders mutations /////////////////////////////////////

 // 
 export const useGender = () => {
 return useQuery('genders', fetchGenders);
 };


//----------------------- gaugesize by Id

export const useGenderById = (id) => {
  return useQuery(['genders', id], () => fetchGenderById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};



 ///////////////////////// Add user Mutations ////////////////////////////////////////////////

 
 
 export const useAddGenderMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(addGender,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('genders');
        navigate(`/Gender`);
      },
    },
    {
      onError:(err) => {
        console.error('Error adding gender:', err);
        alert('Failed to add gender. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete gender Mutations /////////////////////////////////
  

  export const useDeleteMutationGender = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteGender,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('genders');
      },},
      {
        onError:(err) => {
          console.error('Error deleting gender:', err);
          alert('Failed to delete gender. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update gender Mutations ///////////////////////////////
  

  
  export const useStatusgender = () => {
  const queryClient = useQueryClient();
  return useMutation(statusGender,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('genders');
      },},{
        onError:(err) => {
          console.error('Error updating gender:', err);
          alert('Failed to update gender. Please try again later.');
        }
      });};



      export const useUpdateMutationgender = () => {
        const navigate = useNavigate()
        const queryClient = useQueryClient();
        return useMutation(updateGender,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('genders');
              navigate(`/Gender`);
            },},{
              onError:(err) => {
                console.error('Error updating gender:', err);
                alert('Failed to update gender. Please try again later.');
              }
            });};




