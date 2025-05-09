import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import ErrorPage from "../../public/components/ErrorPage";

// Import other pages when they're created
const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About Page (Coming Soon)</div>} />
      <Route path="/recipes" element={<div>Recipes Page (Coming Soon)</div>} />
      <Route path="/contact" element={<div>Contact Page (Coming Soon)</div>} />

      {/* Category Routes */}
      <Route path="/category">
        <Route
          path="popular"
          element={<div>Popular Drinks (Coming Soon)</div>}
        />
        <Route
          path="latest"
          element={<div>Latest Recipes (Coming Soon)</div>}
        />
        <Route
          path="non-alcoholic"
          element={<div>Non-Alcoholic Drinks (Coming Soon)</div>}
        />
        <Route path="random" element={<div>Random Drink (Coming Soon)</div>} />
      </Route>

      {/* Legal Routes */}
      <Route
        path="/privacy"
        element={<div>Privacy Policy (Coming Soon)</div>}
      />
      <Route
        path="/terms"
        element={<div>Terms of Service (Coming Soon)</div>}
      />

      {/* 404 Error Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
