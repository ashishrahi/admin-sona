import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Box } from "@mui/material"
// import { useSelector } from "react-redux"
import './App.css'
import {
  Home,Login,Users,ActiveUser,InactiveUser,ViewUser,Category,ActiveCategory,InActiveCategory,NewCategory,UpdateCategory,
  ViewCategory,Purity,NewPurity,UpdatePurity,Gender,NewGender,UpdateGender,Color,NewColor,UpdateColor,Dandi,NewDandi,
  UpdateDandi,Kunda,NewKunda,UpdateKunda,Size,NewSize,UpdateSize,GaugeSize,NewGaugeSize,Weight,NewWeight,UpdateWeight,Karigar,
   ActiveKarigar,InactiveKarigar,NewKarigar,ViewKarigar,UpdateKarigar,Vender,NewVender,ViewVender,UpdateVender,Product,NewProduct,ViewProduct,
   UpdateProduct,Order,OrderView,About,NewAbout,UpdateAbout,ViewDetails,HomeBanner,NewBanner,UpdateBanner,PrivacyPolicy,NewPolicy,UpdatePolicy,ViewPolicy
  } from './pages/index'



const App = () => {
  
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
   const isAuthenticated=false;
  console.log(isAuthenticated)
  return (
    <Box sx={{color:'silver'}}>
      <BrowserRouter>
        <Routes>

        {/* Auth Router */}
        <Route path="/">
        <Route path='/admin' element={isAuthenticated?<Home/>:<Login/>}/>
        <Route path="login" element={<Login/>} />

          {/* User-List Router */}
          <Route path="/User-List">
          <Route index element={isAuthenticated?<Users/>:<Login/>} />
          <Route path=":id" element={isAuthenticated?<ViewUser/>:<Login/>}/>
          </Route>

          
          {/* Active User Router */}
          <Route path="/Active-User">
          <Route index element={isAuthenticated?<ActiveUser/>:<Login/>} />
          </Route>
          
          {/* InActive User Router */}
           
          <Route path="/Inactive-User">
          <Route index element={isAuthenticated?<InactiveUser/>:<Login/>} />
          </Route>

        {/* Category Router */}
           <Route path="/Category-List">
           <Route index element={isAuthenticated?<Category/>:<Login/>} />
          <Route path="new" element={isAuthenticated?<NewCategory/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<ViewCategory/>:<Login/>}/>
          <Route path=":id/update" element={isAuthenticated?<UpdateCategory/>:<Login/>}/>
         
          </Route>

        {/* Active Category Router */}
           <Route path="/Active-Category">
           <Route index element={isAuthenticated?<ActiveCategory/>:<Login/>} />
           </Route>
           {/* InActive Category Router */}
           <Route path="/Inactive-Category">
           <Route index element={isAuthenticated?<InActiveCategory/>:<Login/>} />
           </Route>
          
          {/*---------- OtherDetails Router */}

          <Route path="/Gender">
          <Route index element={isAuthenticated?<Gender/>:<Login/>} />
          <Route path="new" element={isAuthenticated?<NewGender/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<UpdateGender/>:<Login/>}/>

          </Route>

          {/* Parity */}
          <Route path="/Purity">
          <Route index element={isAuthenticated?<Purity/>:<Login/>} />
          <Route path="new" element={isAuthenticated?<NewPurity/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<UpdatePurity/>:<Login/>}/>
          </Route>

          {/* Color */}
          <Route path="/Color">
          <Route index element={isAuthenticated?<Color/>:<Login/>}/>
          <Route path="new" element={isAuthenticated?<NewColor/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<UpdateColor/>:<Login/>}/>
          </Route>

          {/* Dandi */}
         
          <Route path="/Dandi">
          <Route index element={isAuthenticated?<Dandi/>:<Login/>} />
          <Route path="new" element={isAuthenticated?<NewDandi/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<UpdateDandi/>:<Login/>}/>
         </Route>

          {/* Kunda */}
          <Route path="/Kunda">
          <Route index element={isAuthenticated?<Kunda/>:<Login/>} />
          <Route path="new" element={isAuthenticated?<NewKunda/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<UpdateKunda/>:<Login/>}/>
          </Route>

           {/* Size */}
           <Route path="/Size">
          <Route index element={isAuthenticated?<Size/>:<Login/>}/>
          <Route path="new" element={isAuthenticated?<NewSize/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<UpdateSize/>:<Login/>}/>
          </Route>

          {/* GaugeSize */}
          <Route path="/GaugeSize">
          <Route index element={isAuthenticated?<GaugeSize/>:<Login/>} />
          <Route path="new" element={isAuthenticated?<NewGaugeSize/>:<Login/>}/>
          {/* <Route path=":id" element={isAuthenticated?<UpdateGaugeSize/>:<Login/>}/> */}
          </Route>

          {/* Weight */}
          <Route path="/Weight">
          <Route index element={isAuthenticated?<Weight/>:<Login/>}/>
          <Route path="new" element={isAuthenticated?<NewWeight/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<UpdateWeight/>:<Login/>}/>
          </Route>

             
             
              {/* Karigar */}
          <Route path="/Karigar-List">
          <Route index element={isAuthenticated?<Karigar/>:<Login/>}/>
          <Route path="new" element={isAuthenticated?<NewKarigar/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<ViewKarigar/>:<Login/>}/>
          <Route path=":id/update" element={isAuthenticated?<UpdateKarigar/>:<Login/>}/>

          </Route>

          {/* Active Karigar */}
          <Route path="/Active-Karigar">
          <Route index element={isAuthenticated?<ActiveKarigar/>:<Login/>} />
          </Route>

            {/* InActive Karigar */}
            <Route path="/Inactive-Karigar">
          <Route index element={isAuthenticated?<InactiveKarigar/>:<Login/>} />
          </Route>

          {/* Vender */}
          <Route path="/Vender-List">
          <Route index element={isAuthenticated?<Vender/>:<Login/>} />
          <Route path="new" element={isAuthenticated?<NewVender/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<ViewVender/>:<Login/>}/>
          <Route path=":id/update" element={isAuthenticated?<UpdateVender/>:<Login/>}/>
          </Route>

            {/* Product  */}
           <Route path="/Product-List">
           <Route index element={isAuthenticated?<Product/>:<Login/>} />
           <Route path="new" element={isAuthenticated?<NewProduct/>:<Login/>}/>
           <Route path=":id" element={isAuthenticated?<UpdateProduct/>:<Login/>}/>
           <Route path=":id/update" element={isAuthenticated?<ViewProduct/>:<Login/>}/>
           </Route>



           {/* Order */}
           <Route path="/Order-List">
           <Route index element={isAuthenticated?<Order/>:<Login/>} />
          <Route path=":id" element={isAuthenticated?<OrderView/>:<Login/>}/>
          </Route>
          
          {/* About */}
          <Route path="/About">
          <Route index element={isAuthenticated?<About/>:<Login/>} />
          <Route path="new" element={isAuthenticated?<NewAbout/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<ViewDetails/>:<Login/>}/>
          <Route path=":id/update" element={isAuthenticated?<UpdateAbout/>:<Login/>}/>
          </Route>
          
          {/* Home Banner */}
          <Route path="/Home-Banner">
          <Route index element={isAuthenticated?<HomeBanner/>:<Login/>}/>
          <Route path="new" element={isAuthenticated?<NewBanner/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<UpdateBanner/>:<Login/>}/>
          </Route>
          
          
          
          {/* Privacy Policy */}
          <Route path="/Privacy-Policy">
          <Route index element={isAuthenticated?<PrivacyPolicy/>:<Login/>} />
          <Route path="new" element={isAuthenticated?<NewPolicy/>:<Login/>}/>
          <Route path=":id" element={isAuthenticated?<ViewPolicy/>:<Login/>}/>
          <Route path=":id/update" element={isAuthenticated?<UpdatePolicy/>:<Login/>}/>
          </Route>
          

          {/* Error Page */}
          <Route path="*" element={() => <h1>Page not found</h1>} />

        </Route>
      </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
