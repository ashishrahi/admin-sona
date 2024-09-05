import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


////////////////////////////fetch Policies//////////////////

const fetchPolicies = async () => {
const response = await api.get(`/policies`);
console.log(response.data)
return response.data;
};
 


//-------------------Fetch color by ID
const fetchPolicyById = async (id) => {
  try {
    const response = await api.get(`/policies/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching policy by ID:', error);
  }
};


/////////////////////////////add Policy////////////////////////////////


  const addPolicy = async (newPolicy) => {
  const response = await api.post(`/policies/policy`,newPolicy);
  return response.data;
  };

//////////////////////// delete Policies /////////////////////////////////



  const deletePolicy = async (id) => {
  const response = await api.delete(`/policies/${id}`);
  return response.data;
  };

/////////////////////// update Policies ///////////////////////////////


  const updatePolicy = async ({id,values}) => {
  const response = await api.put(`/policies/${id}`,values); 
  return response.data;
  };


////////////////////////// fetching Policies mutations /////////////////////////////////////

 // 
 export const usePolicy = () => {
 return useQuery('policies', fetchPolicies);
 };


//--------------- Mutation to get color by ID

export const usePolicyById = (id) => {
  return useQuery(['policies', id], () => fetchPolicyById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};





 ///////////////////////// Add Policies Mutations ////////////////////////////////////////////////

 
 
 export const useAddPolicyrMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(addPolicy,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('policies');
        navigate('/Privacy-Policy')
      },
    },
    {
      onError:(err) => {
        console.error('Error adding policy:', err);
        alert('Failed to add policy. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete Policies Mutations /////////////////////////////////
  

  export const useDeleteMutationPolicy = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePolicy,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('policies');
      },},
      {
        onError:(err) => {
          console.error('Error deleting policy:', err);
          alert('Failed to delete policy. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update Policies Mutations ///////////////////////////////
  

  
  export const useUpdateMutationPolicy = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(updatePolicy,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('policies');
         navigate('/Privacy-Policy')
      },},{
        onError:(err) => {
          console.error('Error updating policy:', err);
          alert('Failed to update policy. Please try again later.');
        }
      });};

