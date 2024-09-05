import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Navbar from '../../../../Components/Navbar/Navbar'
import NewForm from './newForm'
import { Box } from '@mui/material'
import Newbreadcrub from './newdandicrubs.page'
const Dandi = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
     <Box className="breadcrub" marginLeft={4}><Newbreadcrub/></Box>
     <NewForm/>
        </Box>
      </Box>
  )
}

export default Dandi