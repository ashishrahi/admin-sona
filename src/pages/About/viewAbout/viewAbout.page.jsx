import {Navbar,Sidebar} from '../../../pages/index'
import ViewForm from './viewForm'
import { Box } from '@mui/material'
import Viewcrumb from './viewbreadcrubs.page'

const About = () => {

  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
      <Box marginLeft={4}><Viewcrumb /></Box>
     <ViewForm/>
        </Box>
      </Box>
  )
}

export default About