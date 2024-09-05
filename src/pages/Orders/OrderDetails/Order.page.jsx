import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import Datatable from './Datatable.page'
import OrderCrumb from './orderbreadcrubs.page'
import { Box } from '@mui/material'
const Order = () => {
  return (
    <Box className='list' style={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer">
      <Navbar/>
     <Box marginTop={1} marginLeft={2.5}> <OrderCrumb/></Box>
     <Datatable/>
        </Box>
      </Box>
  )
}

export default Order