import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import Image from "../../../public/components/Image";
import logo from "../../../public/assets/logo.png";
import FormButton from "../../../public/components/FormButton";
import FormInput from "../../../public/components/FormInput";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add your search submission logic here
    console.log("Searching for:", searchQuery);
  };

  // Search icon component
  const SearchIcon = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

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
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
        </div>

        <div className={`navbar__content ${isMenuOpen ? "open" : ""}`}>
          <form className="navbar__search" onSubmit={handleSearchSubmit}>
            <FormInput
              placeholder={t("navbar.search")}
              type="text"
              className="input"
              value={searchQuery}
              onChange={handleSearch}
              icon={SearchIcon}
            />
            <button type="submit" className="search-button">
              <SearchIcon className="search-button-icon" />
            </button>
          </form>

          <div className="navbar__actions">
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
