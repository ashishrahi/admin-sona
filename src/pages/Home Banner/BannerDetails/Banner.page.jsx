import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import Datatable from './Datatable.page'
import { Box } from '@mui/material'
import CategoryBreadcrubs from './bannerbreadcrubs.page'
const Category = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
     <Box marginLeft={4}> <CategoryBreadcrubs/> </Box>
     <Datatable/>
        </Box>
      </Box>
  )
}

export default Category