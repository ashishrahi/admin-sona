import{Navbar,Sidebar} from '../../../pages/index'
import ViewCategory from './viewCategory.page'
import Viewbreadcrubs from './viewbreadcrubs.page'
import { Box } from '@mui/material'

const ViewPage = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
    <Box marginLeft={4}><Viewbreadcrubs/></Box>
     <ViewCategory/>
        </Box>
      </Box>
  )
}

export default ViewPage