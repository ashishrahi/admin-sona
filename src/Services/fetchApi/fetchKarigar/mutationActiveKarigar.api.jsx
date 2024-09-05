import { useQuery} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Karigars//////////////////

const fetchActiveKarigars = async () => {
const response = await api.get(`/karigars/status/true`);
console.log(response.data)
return response.data;
};
 
////////////////////////// fetching karigars mutations /////////////////////////////////////

 // 
 export const useActiveKarigar = () => {
 return useQuery('karigars', fetchActiveKarigars);
 };

