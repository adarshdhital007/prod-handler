import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Products from "./components/Products/Products";
import ProductManagement from "./components/Products/ProductManagement";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<ProductManagement />} />
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
