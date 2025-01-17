import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:asin" element={<Product />} />
        </Routes>
      </Router>
  );
};

export default App;
