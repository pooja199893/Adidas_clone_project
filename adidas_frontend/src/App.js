import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './components/Home/Home';
import Mens from './components/Mens/Mens';
import Womens from './components/Womens/Womens';
import Kids from './components/Kids/Kids';
import Login from './components/Register_Login/Login';
import Cart from './components/Cart/Cart';
import Register from './components/Register_Login/Register';
import Profile from './components/Profile/Profile';
import AdminRegister from './components/Admin/AdminRegister';
import AdminLogin from './components/Admin/AdminLogin';
import CreateCategoryProduct from './components/Admin/CreateCategoryProduct';
import CreateMenProduct from './components/Admin/CreateMenProduct';
import CreateWomenProduct from './components/Admin/CreateWomenProduct';
import CreateKidsProduct from './components/Admin/CreateKidsProduct';
import YourAddedProducts from './components/Admin/YourAddedProducts';
import SingleProduct from './components/SingleProduct/SingleProduct';
import OrderDetails from './components/OrderDetails/OrderDetails ';
import Wishlist from './components/Wishlist/Wishlist';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/men" element={<Mens/>}/>
        <Route path="/women" element={<Womens/>}/>
        <Route path="/kids" element={<Kids/>}/>
        <Route path="/sign-in" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/sign-up" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin-register" element={<AdminRegister/>}/>
        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path="/create-new-product" element={<CreateCategoryProduct/>}/>
        <Route path="/create-men-product" element={<CreateMenProduct />} />
        <Route path="/create-women-product" element={<CreateWomenProduct />} />
        <Route path="/create-kids-product" element={<CreateKidsProduct />} />
        <Route path="/admin-products" element={<YourAddedProducts/>}/>
        <Route path="/single-product/:id" element={<SingleProduct/>}/>
        <Route path="/order-details" element={<OrderDetails/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
      </Routes>
    </div>
  );
}

export default App;
