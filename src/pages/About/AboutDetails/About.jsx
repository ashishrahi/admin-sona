import {Navbar,Sidebar} from '../../../pages/index'
import Datatable from './Datatable'
import { Box } from '@mui/material'
import Aboutcrumb from './aboutbreadcrubs.page'

const About = () => {

  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:4}}>
      <Navbar/>
      <Box marginLeft={6}><Aboutcrumb /></Box>
     <Datatable/>
        </Box>
      </Box>
  )
}

export default About