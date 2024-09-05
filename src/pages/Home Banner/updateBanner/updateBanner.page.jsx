import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import UpdateForm from './updateForm'
import Updatebreadcrubs from './updatebreadcrubs.page'
import { Box } from '@mui/material'
const ActiveCategory = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" >
      <Navbar/>
    <Box sx={{marginLeft:'20px',marginTop:'10px'}}>  <Updatebreadcrubs/></Box>
     <UpdateForm/>
        </Box>
      </Box>
  )
}

export default ActiveCategory