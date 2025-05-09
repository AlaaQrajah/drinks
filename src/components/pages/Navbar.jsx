import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import "../../styles/Navbar.css";
import Image from "../../../public/components/Image";
import logo from "../../../public/assets/logo.png";
import FormButton from "../../../public/components/FormButton";
import FormInput from "../../../public/components/FormInput";
import LoadingSpinner from "../../../public/components/LoadingSpinner";
import api from "../../services/api-client";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [lang, setLang] = useState(i18n.language || "en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const searchDrinks = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await api.get(`search.php?s=${query}`);
      setSearchResults(response.data.drinks || []);
    } catch (error) {
      console.error("Error searching drinks:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchDrinks(searchQuery);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchDrinks]);

  const handleDrinkClick = (drink) => {
    setSearchQuery("");
    setShowResults(false);
    navigate(`/drink/${drink.idDrink}`);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".navbar__search")) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to="/" className="navbar__logo-link">
            <Image
              src={logo}
              alt={t("navbar.logo")}
              className="navbar__logo-image"
            />
            <span className="navbar__logo-text">{t("navbar.logo")}</span>
          </Link>
        </div>

        <div className="navbar__hamburger" onClick={toggleMenu}>
          <FaBars className="hamburger-icon" />
        </div>

        <div className={`navbar__content ${isMenuOpen ? "open" : ""}`}>
          <div className="navbar__search">
            <FormInput
              placeholder={t("navbar.search")}
              type="text"
              className="input"
              value={searchQuery}
              onChange={handleSearch}
              icon={FaSearch}
            />
            {isSearching && (
              <div className="search-loading">
                <LoadingSpinner />
              </div>
            )}
            {showResults && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((drink) => (
                  <div
                    key={drink.idDrink}
                    className="search-result-item"
                    onClick={() => handleDrinkClick(drink)}
                  >
                    <img
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      className="search-result-image"
                    />
                    <span className="search-result-name">{drink.strDrink}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="navbar__actions">
            <FormButton
              onClick={handleHomeClick}
              text={t("navbar.home")}
              className={`navbar__lang-btn${
                window.location.pathname === "/" ? " active" : ""
              }`}
            />
            <FormButton
              onClick={toggleLanguage}
              text={lang === "en" ? "العربية" : "English"}
              className="navbar__lang-btn"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
