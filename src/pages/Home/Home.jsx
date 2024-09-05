import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Widgets from '../../Components/Widgets/Widgets'
import Featured from '../../Components/Featured/Featured'
import Chart from '../../Components/Chart/Chart'
import { Box } from '@mui/material'
const Home = () => {
  return (
    <Box className='home' sx={{display:'flex'}}>
     <Sidebar/>
    <Box className="homeContainer">
     <Navbar/>
     <Box className="widgets" sx={{display:'flex',padding:'20px',gap:'20px'}}>
     <Widgets type="user"/>

     <Widgets type='order'/>
     <Widgets type='earning'/>
     <Widgets type='balance'/>
     </Box>
     <Box className="charts" sx={{display:'flex',padding:'20px 5px',marginLeft:'20px'}}>
      <Featured/>
      <Chart title='Last 6 Months (Revenue)' aspect={2/1}  />
     </Box>
     <Box className='listContainer' sx={{
    boxShadow: 3,
    padding: '20px',
    margin: '20px',
  }}>
      <Box className='listTitle' sx={{font:' weight 500',
  color:'gray','margin-bottom':'15px'}}>Latest Transactions </Box>
     </Box>
     </Box>
      </Box>
  )
}

export default Home