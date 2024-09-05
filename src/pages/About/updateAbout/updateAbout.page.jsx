import {Navbar,Sidebar} from '../../../pages/index'
import UpdateForm from './updateForm.page'
import { Box } from '@mui/material'
import Aboutcrumb from './aboutbreadcrubs.page'

const About = () => {

  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
      <Box marginLeft={4}><Aboutcrumb /></Box>
     <UpdateForm/>
        </Box>
      </Box>
  )
}

export default About