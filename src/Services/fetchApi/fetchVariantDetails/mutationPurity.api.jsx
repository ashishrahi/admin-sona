import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


//////////////////////////// fetch Purity //////////////////

const fetchpurities = async () => {
  try {
    const response = await api.get(`/purities`);
    return response.data;
  } 
  catch (error) {
    console.error('Error fetching purities:', error);
    }};
 
//----------------- Fetch dandi by ID


const fetchPurityById = async (id) => {
  try {
    const response = await api.get(`/purities/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching purity by ID:', error);
  }
};

///////////////////////////// add Purity ////////////////////////////////


  const addpurity = async (newpurity) => {
    try {
       const response = await api.post(`/purities/purity`,newpurity);
       return response.data;
         } 
    catch (error) {
      console.error('Error adding purity:', error);
      }};

//////////////////////// delete Purity /////////////////////////////////



  const deletepurity = async (id) => {
    try {
      const response = await api.delete(`/purities/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting purity:', error);
      }};
      

/////////////////////// update Purity ///////////////////////////////


  const updatepurity = async ({id,purity}) => {
    try {
        const response = await api.put(`/purities/${id}`,{purity}); 
        return response.data;
         } 
    catch (error) {
      console.error('Error updating purity:', error);
      }};


/////////////////////// status Purity ///////////////////////////////


const statuspurity = async (id) => {
  try {
      const response = await api.put(`/purities/${id}/status`); 
      return response.data;
       } 
  catch (error) {
    console.error('Error updating purity status:', error);
    }};
    



////////////////////////// fetching Purity mutations /////////////////////////////////////
export const usePurity = () => {
 return useQuery('purities', fetchpurities);
 };



// ------------------ Purity by Id
 export const usePurityById = (id) => {
  return useQuery(['dandi', id], () => fetchPurityById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 ///////////////////////// Add Purity Mutations ////////////////////////////////////////////////

  export const useAddpurity = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(addpurity,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('purities');
        navigate('/Purity')
      },
    },
    {
      onError:(err) => {
        console.error('Error adding purity:', err);
        alert('Failed to add purity. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete purity Mutations /////////////////////////////////
  

  export const useDeletepurity = () => {
  const queryClient = useQueryClient();
  return useMutation(deletepurity,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('purities');
      },},
      {
        onError:(err) => {
          console.error('Error deleting purity:', err);
          alert('Failed to delete purity. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update purity Mutations ///////////////////////////////
  

  
  export const useUpdatepurity = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(updatepurity,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('purities');
        navigate('/Purity')
      },},{
        onError:(err) => {
          console.error('Error updating purity:', err);
          alert('Failed to update purity. Please try again later.');
        }
      });};


      export const useStatuspurity = () => {
        const queryClient = useQueryClient();
        return useMutation(statuspurity,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('purities');
            },},{
              onError:(err) => {
                console.error('Error updating purity:', err);
                alert('Failed to update purity. Please try again later.');
              }
            });};