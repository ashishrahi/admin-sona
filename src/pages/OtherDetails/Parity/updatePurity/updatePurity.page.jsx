import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Navbar from '../../../../Components/Navbar/Navbar'
import UpdateForm from './updateForm'
import { Box } from '@mui/material'
import PurityCrumb from './updatebreadcrubs.page'
const Purity = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
      <Box marginLeft={4}><PurityCrumb/></Box>
     <UpdateForm/>
        </Box>
      </Box>
  )
}

export default Purity