import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Home from "./Pages/home/Home";
import Products from "./Pages/products/Products";
import Categories from "./Pages/Categories/Categories";
import Cart from "./Pages/cart/Cart";
import { CartProvider } from "./components/CartProvider";

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
