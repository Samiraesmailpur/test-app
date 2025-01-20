import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/ProductsPage";
import Product from "./components/Product";
import Home from "./pages/Home";
import SharedLayout from "./components/SharedLayout";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SharedLayout />} >
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:asin" element={<Product />} />
          </Route>
        </Routes>
      </Router>
  );
};

export default App;
