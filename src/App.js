import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Login'
import Home from './Home'
import Layout from './Layout'
import Contact from './Contact';
import Product from './Product'
import ProductList from './ProductList';
import Category from './Category';
import CategoryGrid from './CategoryGrid';
import BrandGrid from './BrandGrid';
import Brand from './Brand';
import CategoryList from './CategoryList';
import ProductDetail from './ProductDetail';
import BrandList from './BrandList';
import Register from './Register';
import TodoList from './TodoList';
import DescriptionBox from './DescriptionBox';
import CartDrawer from './CartDrawer';
import Payment from './Payment';
import PaymentSuccess from './PaymentSuccess';
import DBoard from './DBoard';
import ProtectedRoute from './ProtectedRoute';
import AdminHome from './AdminHome';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        
        {/* Public Routes */}
  <Route path='/signup' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Product' element={<Product/>}/>
        <Route path='/ProductList' element={<ProductList/>}/>
        <Route path='/Category' element={<Category/>}/>
        <Route path='/CategoryGrid' element={<CategoryGrid/>}/>
        <Route path='/BrandGrid' element={<BrandGrid/>}/>
        <Route path='/Brand' element={<Brand/>}/>
        <Route path='/CategoryList' element={<CategoryList/>}/>
        <Route path='/ProductDetail' element={<ProductDetail/>}/>
        <Route path='/BrandList' element={<BrandList/>}/>
        <Route path='/TodoList' element={<TodoList/>}/>
        <Route path='/DescriptionBox' element={<DescriptionBox/>}/>
        <Route path='/CartDrawer' element={<CartDrawer/>}/>
    <Route path='/payment' element={<Payment/>} />
    <Route path='/payment/success' element={<PaymentSuccess/>} />
        <Route path='/AdminHome' element={<AdminHome/>}/>

        {/* ✅ Protected Customer Home */}
        <Route path='/' element={
          <ProtectedRoute role="customer">
            <Home/>
          </ProtectedRoute>
        }/>

        {/* ✅ Protected Admin Dashboard */}
        <Route path='/DBoard' element={
          <ProtectedRoute role="admin">
            <DBoard/>
          </ProtectedRoute>
        }/>

      </Route>
    </Routes>
  );
}

export default App;
