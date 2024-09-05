import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';

//--------------------fetch About

const fetchAbout = async () => {
const response = await api.get(`/abouts`);
console.log(response.data)
return response.data;
};
 

//-------------------Fetch About by ID
 const fetchAboutById = async (id) => {
  try {
    const response = await api.get(`/abouts/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching about by ID:', error);
  }
};

//-------------------- add About

  const addAbout = async (newAbout) => {
  const response = await api.post(`/abouts/about`,newAbout);
  console.log(response.data)
  return response.data;
  };

//---------------------delete About 



  const deleteAbout = async (id) => {
  const response = await api.delete(`/abouts/${id}`);
  console.log(response.data)
  return response.data;
  };

//--------------------- update Abouts 


  const updateAbout = async ({values,id}) => {
  const response = await api.put(`/abouts/${id}`,values); 
  console.log(response.data)
  return response.data;
  };


//---------------- Mutation Abouts 

  
 export const useAbout = () => {
 return useQuery('abouts', fetchAbout);
 };

//--------------- Mutation to get color by ID

export const useAboutById = (id) => {
  return useQuery(['abouts', id], () => fetchAboutById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};





 ///////////////////////// Add About Mutations ////////////////////////////////////////////////

 
 
 export const useAddAbout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(addAbout,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('abouts');
        navigate(`/About`)
      },
    },
    {
      onError:(err) => {
        console.error('Error adding about:', err);
        alert('Failed to add about. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete about Mutations /////////////////////////////////
  

  export const useDeleteAbout = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAbout,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('abouts');
      },},
      {
        onError:(err) => {
          console.error('Error deleting about:', err);
          alert('Failed to delete about. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update about Mutations ///////////////////////////////
  

  
  export const useUpdateAbout = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(updateAbout,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('abouts');
        navigate(`/About`)
      },},{
        onError:(err) => {
          console.error('Error updating about:', err);
          alert('Failed to update about. Please try again later.');
        }
      });};

