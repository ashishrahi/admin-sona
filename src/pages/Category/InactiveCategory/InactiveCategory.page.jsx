import {Navbar,Sidebar} from '../../../pages/index'
import Datatable from './Datatable.page'
import Inactivebreadcrubs from '../InactiveCategory/inactivecategorybreadcrubs.page'
import { Box } from '@mui/material'
const InactiveCategory = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer"flex={4}>
      <Navbar/>
     <Box marginLeft={4}><Inactivebreadcrubs/></Box>
     <Datatable/>
        </Box>
      </Box>
  )
}
export default InactiveCategory