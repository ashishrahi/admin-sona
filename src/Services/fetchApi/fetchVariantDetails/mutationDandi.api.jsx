import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


//--------------fetch dandis
const fetchdandis = async () => {
  
  try {
    const response = await api.get(`/dandis`);
return response.data;
  } 
  catch (error) {
    console.log('Error fetching dandis:', error);
  }};


// Fetch dandi by ID
const fetchDandiById = async (id) => {
  try {
    const response = await api.get(`/dandis/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching dandi by ID:', error);
  }
};
 
//---------------------add dandis
  const adddandi = async (newdandi) => {
    try {
         const response = await api.post(`/dandis/dandi`,newdandi);
         return response.data;
         } 
    catch (error) {
      console.log('Error adding dandi:', error);
    }};

//delete dandis
  const deletedandi = async (id) => {
    try {
      const response = await api.delete(`/dandis/${id}`);
      return response.data;
         } 
    catch (error) {
      console.log('Error deleting dandi:', error);
    }};

  //-------------------update dandi
  const updatedandi = async ({id,updatedandi}) => {
    try {
      const response = await api.put(`/dandis/${id}`,{updatedandi});
      return response.data;
         } 
    catch (error) {
      console.log('Error updating dandi:', error);
    }};

//-----------------------status dandis
const statusdandi = async (id) => {
  try {
    const response = await api.put(`/dandis/${id}/status`);
     return response.data;
      } 
  catch (error) {
    console.log('Error updating status dandi:', error);
  }};



//////////////////////////////////////////////////////////////////////////////////

 // fetching dandis mutations


 export const useDandis = () => {
  return useQuery('dandis', fetchdandis);
  };


  // Hook to get dandi by ID

export const useDandiById = (id) => {
  return useQuery(['dandi', id], () => fetchDandiById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};

  
  
// Add dandi Mutations

  export const useAdddandis = () => {
    const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(adddandi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dandis');
        navigate('/Dandi');
      },});};

  //delete dandi Mutations

  export const useDeletedandi = () => {
  const queryClient = useQueryClient();
  return useMutation(deletedandi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dandis');
      },});};

  //update dandi Mutations
  
  export const useUpdatedandi = () => {
    const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(updatedandi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dandis');
        navigate('/Dandi');
      },});};

       //update dandi Mutations
  
  export const useStatusdandi = () => {
    const queryClient = useQueryClient();
    return useMutation(statusdandi,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('dandis');
        },});};

