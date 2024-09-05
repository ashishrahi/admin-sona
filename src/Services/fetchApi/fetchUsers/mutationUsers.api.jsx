import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Users//////////////////

const fetchUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
  }};
 
//--------------- Profile
const profileId = async (id) => {
  console.log(id)
  try {
    const response = await api.get(`/users/${id}`);

    return response.data;
  } catch (error) {
    console.log('Error fetching user profile:', error);
  }};
   


/////////////////////////////add Users////////////////////////////////


  const addUser = async (newUser) => {
    try {
      const response = await api.post(`/users/user`,newUser);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
  }};

//////////////////////// delete Users /////////////////////////////////



  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
  }};

/////////////////////// update Users ///////////////////////////////


  const updateUser = async (userData,id) => {
    try {
      const response = await api.patch(`/users/${id}`,userData); 
  console.log(response.data)
  return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
   }};

/////////////////////// update status Users ///////////////////////////////


const updateUserStatus = async (id) => {
  try {
    const response = await api.put(`/users/${id}/status`); 
  return response.data;
  } catch (error) {
    console.error('Error updating user status:', error);
  }};


////////////////////////// fetching users mutations /////////////////////////////////////

 //-------------- user mutations

 export const useUser = () => {
 return useQuery('users', fetchUsers);
 };

//---------------------- Profile

 export const useUserbyId = () => {
  const queryClient = useQueryClient();
  return useMutation(profileId,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding user:', err);
        alert('Failed to add user. Please try again later.');
      }
    }
    );
 
};



 ///////////////////////// Add user Mutations ////////////////////////////////////////////////

 export const useAddUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding user:', err);
        alert('Failed to add user. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete user Mutations /////////////////////////////////
  

  export const useDeleteMutationUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('users');
      },},
      {
        onError:(err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update User Mutations ///////////////////////////////
  

  
  export const useUpdateMutationUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Users');
      },},{
        onError:(err) => {
          console.error('Error updating user:', err);
          alert('Failed to update user. Please try again later.');
        }
      });};

  //////////////////////////////// update UserStatus Mutations ///////////////////////////////
  

  
  export const useUpdateMutationUserStatus = () => {
    const queryClient = useQueryClient();
    return useMutation(updateUserStatus,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('Users');
        },},{
          onError:(err) => {
            console.error('Error updating user:', err);
            alert('Failed to update user. Please try again later.');
          }
        });};
  