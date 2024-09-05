import { useQuery} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch active Users//////////////////

const fetchinactiveUsers = async () => {
const response = await api.get(`/users/status/false`);
console.log(response.data)
return response.data;
};
 
////////////////////////// fetching users mutations /////////////////////////////////////

 // 
 export const useInactiveUser = () => {
 return useQuery('users', fetchinactiveUsers);
 };


 
 

