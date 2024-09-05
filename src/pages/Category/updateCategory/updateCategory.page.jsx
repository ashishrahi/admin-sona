import{Navbar,Sidebar} from '../../../pages/index'
import UpdateForm from './updateForm'
import Updatebreadcrubs from './updatebreadcrubs.page'
import { Box } from '@mui/material'
const UpdateCategory = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
    <Box marginLeft={4}>  <Updatebreadcrubs/></Box>
     <UpdateForm/>
        </Box>
      </Box>
  )
}

export default UpdateCategory