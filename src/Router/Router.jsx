import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import ErrorPage from "../../public/components/ErrorPage";
import DrinkDetails from "../components/pages/DrinkDetails";
import ApplicationForm from "../components/pages/ApplicationForm";
import PrivacyPage from "../components/pages/PrivacyPage";
import TermsPage from "../components/pages/TermsPage";
// import AboutPage from "../components/pages/AboutPage";
import AboutPage from "../components/pages/AboutPage";
import RecipesPage from "../components/pages/RecipesPage";
import ContactPage from "../components/pages/ContactPage";
import CategoryPage from "../components/pages/CategoryPage";
import LoginHero from "../components/pages/LoginHero";

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/application" element={<ApplicationForm />} />

      {/* Drink Details Route */}
      <Route path="/drink/:id" element={<DrinkDetails />} />

      {/* Legal Routes */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/login" element={<LoginHero />} />
      {/* Category Routes */}
      <Route path="/category">
        <Route path="popular" element={<CategoryPage type="popular" />} />
        <Route path="latest" element={<CategoryPage type="latest" />} />
        <Route
          path="non-alcoholic"
          element={<CategoryPage type="non-alcoholic" />}
        />
        <Route path="random" element={<CategoryPage type="random" />} />
      </Route>

      {/* 404 Error Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
