import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'
import { useNavigate } from 'react-router-dom';


////////////////////////////fetch Gaugesizes //////////////////

const fetchGaugesizes = async () => {
  try {
    const response = await api.get(`/gaugesizes`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching gaugesizes:', error);
    }};

// -------- Fetch dandi by ID

    const fetchGaugesizeById = async (id) => {
      try {
        const response = await api.get(`/gaugesizes/${id}`);
        return response.data;
      } catch (error) {
        console.log('Error fetching dandi by ID:', error);
      }
    };


/////////////////////////////add Gaugesizes////////////////////////////////


  const addGaugesize = async (newGaugesize) => {
    try {
      const response = await api.post(`/gaugesizes/gaugesize`,newGaugesize);
  return response.data;
    } 
    catch (error) {
      console.log('Error adding gaugesize:', error);
    }};

//////////////////////// delete Gaugesizes /////////////////////////////////



  const deleteGaugesize = async (id) => {
    try
     {
        const response = await api.delete(`/gaugesizes/${id}`);
       return response.data;
    } catch (error) {
      console.log('Error deleting gaugesize:', error);
      }};

/////////////////////// update Gaugesizes ///////////////////////////////


  const updateGaugesize = async ({id,gaugesize}) => {
    try {
        const response = await api.put(`/gaugesizes/${id}`,{gaugesize}); 
  return response.data;
    } catch (error) {
      console.log('Error updating gaugesize:', error);
      }};


/////////////////////// update Gaugesizes ///////////////////////////////


const statusGaugesize = async (id) => {
  try {
    const response = await api.put(`/gaugesizes/${id}/status`); 
    return response.data;
  } 
  catch (error) {
    console.log('Error updating gaugesize status:', error);
    
  }};



////////////////////////// fetching Gaugesizes mutations /////////////////////////////////////

 // 
 export const useGaugesize = () => {
 return useQuery('gaugesizes', fetchGaugesizes);
 };

 
 //----------------------- gaugesize by Id

export const useGaugeseizeById = (id) => {
  return useQuery(['gaugesizes', id], () => fetchGaugesizeById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 ///////////////////////// Add Gaugesize Mutations ////////////////////////////////////////////////

 export const useAddGaugesize = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(addGaugesize,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('gaugesizes');
        navigate('/GaugeSize');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding gaugesize:', err);
        alert('Failed to add gaugesize. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete gaugesize Mutations /////////////////////////////////
  

  export const useDeleteGaugesize = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteGaugesize,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('gaugesizes');
      },},
      {
        onError:(err) => {
          console.error('Error deleting gaugesize:', err);
          alert('Failed to delete gaugesize. Please try again later.');
        }}
    );};

  //////////////////////////////// update Gaugesize Mutations ///////////////////////////////
  
export const useUpdateGaugesize = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(updateGaugesize,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('gaugesizes');
        navigate('/GaugeSize')
      },},{
        onError:(err) => {
          console.error('Error updating gaugesize:', err);
          alert('Failed to update gaugesize. Please try again later.');
        }
      });};

//--------------------- Status Gaugesize
      export const useStatusGaugesize = () => {
        const queryClient = useQueryClient();
        return useMutation(statusGaugesize,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('gaugesizes');
            },},{
              onError:(err) => {
                console.error('Error updating gaugesize:', err);
                alert('Failed to update gaugesize. Please try again later.');
              }
            });};
      