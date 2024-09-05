import{Navbar,Sidebar} from '../../../pages/index'
import Addform from './addForm'
import { Box } from '@mui/material'
import Newcrumb from './newbreadcrubs.page'

const About = () => {

  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
      <Box marginLeft={3}><Newcrumb/></Box>
     <Addform/>
        </Box>
      </Box>
  )
}

export default About