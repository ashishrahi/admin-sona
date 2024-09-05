import {Navbar,Sidebar} from '../../../pages/index'
import Datatable from './Datatable.page'
import Activebreadcrubs from './activebreadcrubs.page'
import { Box } from '@mui/material'

const ActiveCategory = () => {

  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
    <Box marginLeft={4}> <Activebreadcrubs/></Box>
     <Datatable/>
        </Box>
      </Box>
  )
}

export default ActiveCategory