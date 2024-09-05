  import { useQuery,useQueryClient,useMutation} from 'react-query';
  import api from '../../../utilities/Api'
  import { useNavigate } from 'react-router-dom';


  ////////////////////////////fetch Colors//////////////////

  const fetchColors = async () => {
  const response = await api.get(`/colors`);
  return response.data;
  };
   
  
  // Fetch color by ID
  const fetchColorById = async (id) => {
  try {
    const response = await api.get(`/colors/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching dandi by ID:', error);
  }
};



/////////////////////////////add Colors////////////////////////////////


    const addColor = async (newColor) => {
    const response = await api.post(`/colors/color`,newColor);
    return response.data;
    };
 
 //////////////////////// delete Colors /////////////////////////////////



    const deleteColor = async (id) => {
    const response = await api.delete(`/colors/${id}`);
    return response.data;
    };

 /////////////////////// update Colors ///////////////////////////////


    const updateColor = async ({color,id}) => {
    const response = await api.put(`/colors/${id}`,{color}); 
    return response.data;
    };

 /////////////////////// status Colors ///////////////////////////////


 const statusColor = async (id) => {
  const response = await api.put(`/colors/${id}/status`); 
  return response.data;
  };





  ////////////////////////// fetching colors mutations /////////////////////////////////////

   // 
   export const useColor = () => {
   return useQuery('colors', fetchColors);
   };


  // Hook to get color by ID

  export const useColorById = (id) => {
    return useQuery(['color', id], () => fetchColorById(id), {
      enabled: !!id,  // Ensure the query is only enabled if there's an id
    });
  };


///////////////////////// Add Color Mutations ////////////////////////////////////////////////
  
      
   export const useAddColor = () => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    return useMutation(addColor,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('colors');
          navigate('/Color');
        },
      },
      {
        onError:(err) => {
          console.error('Error adding color:', err);
          alert('Failed to add color. Please try again later.');
        }
      }
      );};
  
   ///////////////////////////// delete color Mutations /////////////////////////////////
    

    export const useDeleteColor = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteColor,
      {
          onSuccess: () => {
          queryClient.invalidateQueries('colors');
        },},
        {
          onError:(err) => {
            console.error('Error deleting color:', err);
            alert('Failed to delete color. Please try again later.');
          }
        }
      
      );};

    //////////////////////////////// update color Mutations ///////////////////////////////
    

    
    export const useUpdateColor = () => {
      const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(updateColor,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('colors');
          navigate('/Color');
        },},{
          onError:(err) => {
            console.error('Error updating color:', err);
            alert('Failed to update color. Please try again later.');
          }
        });};

    //////////////////////////////// status color Mutations ///////////////////////////////
    

    
    export const useStatusColor = () => {
      const queryClient = useQueryClient();
      return useMutation(statusColor,
        {
          onSuccess: () => {
            queryClient.invalidateQueries('colors');
          },},{
            onError:(err) => {
              console.error('Error updating color:', err);
              alert('Failed to update color. Please try again later.');
            }
          });};
  