import { useQuery} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Karigars//////////////////

const fetchInActiveKarigars = async () => {
const response = await api.get(`/karigars/status/false`);
console.log(response.data)
return response.data;
};
 
////////////////////////// fetching karigars mutations /////////////////////////////////////

 // 
 export const useInActiveKarigar = () => {
 return useQuery('karigars', fetchInActiveKarigars);
 };

