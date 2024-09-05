import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


////////////////////////////fetch Karigars//////////////////

const fetchKarigars = async () => {
  try {
    const response = await api.get(`/karigars`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching karigars:', error);
    
  }

};
//------------- Karigar by Id

const fetchKarigarById = async (id) => {
  try {
    const response = await api.get(`/karigars/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching Karigar by ID:', error);
  }
};

 
///////////////////////////// add Karigars ////////////////////////////////


  const addKarigar = async (formData) => {
    try {
       const response = await api.post(`/karigars/karigar`,formData);
       console.log(response.data)
       return response.data;
    } 
    catch (error) {
      console.log('Error adding karigar:', error);
      }};

//////////////////////// fetching of delete Karigars /////////////////////////////////



  const deleteKarigar = async (id) => {
     try {
      const response = await api.delete(`/karigars/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting karigar:', error);
      
    }
 
  };

/////////////////////// fetching of update of Karigars ///////////////////////////////


  const updateKarigar = async ({id,formData}) => {
    console.log(id)
    try {
        const response = await api.put(`/karigars/${id}`,formData); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating karigar:', error);
       }};

  /////////////////////// fetching of Status of Karigars ///////////////////////////////


  const statusKarigar = async (id) => {
    try {
      const response = await api.put(`/karigars/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating karigar status:', error);
    }};


////////////////////////// fetching karigars mutations /////////////////////////////////////

 // 
 export const useKarigar = () => {
 return useQuery('karigars', fetchKarigars);
 };


//--------------- Mutation to get Vender by ID


export const useKarigarById = (id) => {
  return useQuery(['karigars', id], () => fetchKarigarById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 //--------------- Add karigar Mutations

 
 
 export const useAddKarigarMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(addKarigar,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('karigars');
        navigate('/Karigar-List');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding karigar:', err);
        alert('Failed to add karigar. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete karigar Mutations /////////////////////////////////
  

  export const useDeleteMutationKarigar = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteKarigar,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('karigars');
      },},
      {
        onError:(err) => {
          console.error('Error deleting karigar:', err);
          alert('Failed to delete karigar. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update Karigar Mutations ///////////////////////////////
  

  
  export const useUpdateMutationKarigar = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();

  return useMutation(updateKarigar,{
      onSuccess: () => {
        queryClient.invalidateQueries('karigars');
        navigate('/Karigar-List');
       },
    
      }
    );};

      export const useStatusMutationKarigar = () => {
        const queryClient = useQueryClient();
        return useMutation(statusKarigar,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('karigars');
            },},{
              onError:(err) => {
                console.error('Error updating karigar:', err);
                alert('Failed to update karigar. Please try again later.');
              }
            });};