import { useQuery} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch active Users//////////////////

const fetchactiveUsers = async () => {
const response = await api.get(`/users/status/true`);
console.log(response.data)
return response.data;
};
 
////////////////////////// fetching users mutations /////////////////////////////////////

 // 
 export const useActiveUser = () => {
 return useQuery('users', fetchactiveUsers);
 };


 
 

