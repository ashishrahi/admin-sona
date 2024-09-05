import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Navbar from '../../../../Components/Navbar/Navbar'
import UpdateForm from './UpdateForm'
import { Box } from '@mui/material'
import Genderbreadcrumb from './updatebreadcrubs.page'
const Gender = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
     <Box className='breadcrub' marginLeft={4}><Genderbreadcrumb/></Box> 
     <UpdateForm/>
        </Box>
      </Box>
  )
}

export default Gender