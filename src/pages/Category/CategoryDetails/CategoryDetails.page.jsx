import{Navbar,Sidebar} from '../../../pages/index'
import Datatable from './Datatable.page'
import { Box } from '@mui/material'
import CategoryBreadcrubs from './categorybreadcrubs.page'

const Category = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}} >
      <Navbar/>
     <Box marginLeft={5}> <CategoryBreadcrubs/> </Box>
     <Datatable/>
        </Box>
      </Box>
  )
}

export default Category