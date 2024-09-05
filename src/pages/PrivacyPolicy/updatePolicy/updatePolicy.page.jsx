import{Navbar,Sidebar} from '../../../pages/index'
import UpdateForm from './updateForm'
import { Box } from '@mui/material'
import UpdateCrumb from './updatebreadcrubs.page'

const Policy = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
      <Box marginLeft={4}><UpdateCrumb/></Box>
     <UpdateForm/>
        </Box>
      </Box>
  )
}

export default Policy