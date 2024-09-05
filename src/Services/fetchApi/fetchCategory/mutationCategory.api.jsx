import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


////////////////////////////fetch Categories//////////////////

const fetchCategories = async () => {
  
  try {
    const response = await api.get(`/categories`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('Error fetching categories:', error);
    }};
    
 

//////////////////////////// active fetch Categories//////////////////

const fetchactiveCategories = async () => {
  try {
    const response = await api.get(`/categories/status/true`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching inactive categories:', error);
    }};

//////////////////////////// active fetch Categories//////////////////

const fetchinactiveCategories = async () => {
  try {
    const response = await api.get(`/categories/status/false`);
    return response.data;
  } catch (error) {
    console.log('Error fetching inactive categories:', error);
  }};



/////////////////////////////add Categories ////////////////////////////////


  const addCategory = async (formData) => {
      try {
          const response = await api.post(`/categories/category`,formData);
          return response.data;
          } 
      catch (error) {
      console.log('Error adding category:', error);
  }};

//////////////////////// delete Categories /////////////////////////////////



  const deleteCategory = async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error deleting category:', error);
      }};

/////////////////////// update Categories ///////////////////////////////


  const updateCategory = async ({id,formData}) => {
    try {
      const response = await api.put(`/categories/${id}`,formData); 
  return response.data;
    } catch (error) {
      console.log('Error updating category:', error);
      }};


  /////////////////////// update Categories ///////////////////////////////


  const updateCategoryStatus = async (id) => {
    try {
      const response = await api.put(`/categories/${id}/status`); 
    return response.data;
    } catch (error) {
      console.log('Error updating category status:', error);
      }};

//-------------------Fetch Category by ID
const fetchCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching about by ID:', error);
  }
};




////////////////////////// fetching category mutations /////////////////////////////////////

 // 
 export const useCategory = () => {
 return useQuery('categories', fetchCategories);
 };



//--------------- Mutation to get Category by ID

export const useCategoryById = (id) => {
  return useQuery(['categories', id], () => fetchCategoryById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};



////////////////////////// fetching active category mutations /////////////////////////////////////

 export const useActiveCategory = () => {
  return useQuery('categories', fetchactiveCategories);
  };

////////////////////////// fetching active category mutations /////////////////////////////////////

export const useInActiveCategory = () => {
  return useQuery('categories', fetchinactiveCategories);
  };


 ///////////////////////// Add category Mutations ////////////////////////////////////////////////

 
 export const useAddCategoryMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(addCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        navigate('/Category-List');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding category:', err);
        alert('Failed to add category. Please try again later.');
      }
    }
    );};

    

 ///////////////////////////// delete category Mutations /////////////////////////////////
  

  export const useDeleteMutationUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('categories');
      },},
      {
        onError:(err) => {
          console.error('Error deleting category:', err);
          alert('Failed to delete category. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update Category Mutations ///////////////////////////////
  

  
  export const useUpdateMutationCategory = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(updateCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        navigate('/Category-List');
      },},{
        onError:(err) => {
          console.error('Error updating category:', err);
          alert('Failed to update category. Please try again later.');
        }
      });};

  //////////////////////////////// update Category Mutations ///////////////////////////////
  

  
  export const useStatusMutationCategory = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(updateCategoryStatus,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        navigate('/Category-List');
      },},{
        onError:(err) => {
          console.error('Error updating category:', err);
          alert('Failed to update category. Please try again later.');
        }
      });};