import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Navbar from '../../../../Components/Navbar/Navbar'
import NewForm from './newForm'
import { Box } from '@mui/material'
import Genderbreadcrumb from './newbreadcrubs.page'
const NewGender = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
     <Box className='breadcrub' marginLeft={4}><Genderbreadcrumb/></Box> 
     <NewForm/>
        </Box>
      </Box>
  )
}

export default NewGender