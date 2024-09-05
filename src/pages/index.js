import Home from "../pages/Home/Home"
import Login from '../pages/Auth/Login/Login'
import Navbar from "../Components/Navbar/Navbar.jsx"
import Sidebar from "../Components/Sidebar/Sidebar.jsx"
// Users
import Users from './Users/UserDetails/Users.page.jsx'
import ActiveUser from '../pages/Users/ActiveUser/ActiveUser.page'
import InactiveUser from "../pages/Users/InActiveUser/InactiveUser.page.jsx";
import ViewUser from '../pages/Users/ViewUser/viewUser.page.jsx'
// Category
import Category from '../pages/Category/CategoryDetails/CategoryDetails.page.jsx'
import ActiveCategory from '../pages/Category/ActiveCategory/ActiveCategory.page'
import InActiveCategory from '../pages/Category/InactiveCategory/InactiveCategory.page'
import NewCategory from '../pages/Category/newCategory/newCategory.page.jsx'
import UpdateCategory from '../pages/Category/updateCategory/updateCategory.page.jsx'
import ViewCategory from '../pages/Category/ViewCategory/viewPage.jsx'
//-------------------Gender
import Gender from '../pages/OtherDetails/Gender/GenderDetails/Gender.page'
import NewGender from '../pages/OtherDetails/Gender/NewGender/newGender.page.jsx'
import UpdateGender from '../pages/OtherDetails/Gender/UpdateGender/updateGender.page.jsx'
//---------------------Purity
import Purity from '../pages/OtherDetails/Parity/ParityDetails/Purity.page'
import NewPurity from '../pages/OtherDetails/Parity/newPurity/newPurity.page'
import UpdatePurity from '../pages/OtherDetails/Parity/updatePurity/updatePurity.page.jsx'
//----------------------Color
import Color from '../pages/OtherDetails/Color/ColorDetails/Color.page'
import NewColor from '../pages/OtherDetails/Color/newColor/newColor.page.jsx'
import UpdateColor from '../pages/OtherDetails/Color/UpdateColor/updateColor.page.jsx'
//----------------------Dandi
import Dandi from '../pages/OtherDetails/Dandi/DandiDetails/Dandi.page'
import NewDandi from '../pages/OtherDetails/Dandi/NewDandi/newDandi.page.jsx'
import UpdateDandi from '../pages/OtherDetails/Dandi/UpdateDandi/updateDandi.page.jsx'
//----------------------Kunda
import Kunda from '../pages/OtherDetails/Kunda/KundaDetails/Kunda.page'
import NewKunda from '../pages/OtherDetails/Kunda/NewKunda/newKunda.page.jsx'
import UpdateKunda from '../pages/OtherDetails/Kunda/UpdateKunda/updateKunda.page.jsx'
//----------------------Size
import Size from '../pages/OtherDetails/Size/SizeDetails/Size.page'
import NewSize from '../pages/OtherDetails/Size/NewSize/newSize.page.jsx'
import UpdateSize from '../pages/OtherDetails/Size/UpdateSize/updateSize.page.jsx'
//----------------------GaugeSize
import GaugeSize from '../pages/OtherDetails/GaugeSize/GaugeDetails/GaugeSize.page'
import NewGaugeSize from '../pages/OtherDetails/GaugeSize/newGauge/newGauge.page.jsx'
//-----------------------Weight
import Weight from '../pages/OtherDetails/Weight/WeightDetails/Weight.page'
import NewWeight from '../pages/OtherDetails/Weight/NewWeight/newWeight.page.jsx'
import UpdateWeight from '../pages/OtherDetails/Weight/UpdateWeight/updateWeight.page.jsx'
//-----------------------Karigar
import Karigar from '../pages/Karigar/KarigarDetails/Karigar.page'
import ActiveKarigar from '../pages/Karigar/ActiveKarigar/ActiveKarigar.page'
import InactiveKarigar from '../pages/Karigar/InactiveKarigar/InactiveKarigar.page'
import NewKarigar from '../pages/Karigar/addKarigar/addKarigar.page.jsx'
import ViewKarigar from '../pages/Karigar/ViewKarigar/ViewKarigar.page.jsx'
import UpdateKarigar from '../pages/Karigar/updateKarigar/updateKarigar.page.jsx'
// Vender
import Vender from '../pages/Vender/VenderDetails/Vender.page'
import NewVender from '../pages/Vender/addVender/addVender.page.jsx'
import ViewVender from '../pages/Vender/ViewVender/viewVender.page.jsx'
import UpdateVender from  '../pages/Vender/updateVender/update.page'
// Product
import Product from '../pages/Products/ProductDetails/Product.page.jsx'
import NewProduct from '../pages/Products/newProduct/newProduct.page.jsx'
import ViewProduct from '../pages/Products/viewProduct/viewForm.jsx'
import UpdateProduct from '../pages/Products/updateProduct/updateProduct.page.jsx'
//---------------------------Order
import Order from '../pages/Orders/OrderDetails/Order.page'
import OrderView from '../pages/Orders/viewOrder/view.page'
// .....................About
import About from '../pages/About/AboutDetails/About.jsx'
import NewAbout from '../pages/About/newAbout/newAbout.page.jsx'
import UpdateAbout from '../pages/About/updateAbout/updateForm.page.jsx'
import ViewDetails from '../pages/About/viewAbout/viewAbout.page.jsx'
// .....................Banner
import HomeBanner from '../pages/Home Banner/BannerDetails/Banner.page.jsx'  
import NewBanner from '../pages/Home Banner/newBanner/newBanner.page.jsx'
import UpdateBanner from '../pages/Home Banner/updateBanner/updateBanner.page.jsx'
// .....................Policy
 import PrivacyPolicy from '../pages/PrivacyPolicy/policyDetails/Policy.page'
 import NewPolicy from '../pages/PrivacyPolicy/newPolicy/newPolicy.page.jsx'
 import UpdatePolicy from '../pages/PrivacyPolicy/updatePolicy/updatePolicy.page.jsx'
 import ViewPolicy from '../pages/PrivacyPolicy/viewPolicy/viewPolicy.page.jsx'

export {Navbar,Sidebar,
Home,Login,Users,ActiveUser,InactiveUser,ViewUser,Category,ActiveCategory,InActiveCategory,NewCategory,UpdateCategory,
ViewCategory,Purity,NewPurity,UpdatePurity,Gender,NewGender,UpdateGender,Color,NewColor,UpdateColor,Dandi,NewDandi,
UpdateDandi,Kunda,NewKunda,UpdateKunda,Size,NewSize,UpdateSize,GaugeSize,NewGaugeSize,Weight,NewWeight,UpdateWeight,Karigar,
 ActiveKarigar,InactiveKarigar,NewKarigar,ViewKarigar,UpdateKarigar,Vender,NewVender,ViewVender,UpdateVender,Product,NewProduct,ViewProduct,
 UpdateProduct,Order,OrderView,About,NewAbout,UpdateAbout,ViewDetails,HomeBanner,NewBanner,UpdateBanner,PrivacyPolicy,NewPolicy,UpdatePolicy,ViewPolicy
}