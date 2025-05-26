import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../Container/Container";
import "../../styles/AboutPage.css";
import { FaInfoCircle } from "react-icons/fa";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <Container>
        <h1 className="about-page__title">
          <FaInfoCircle className="about-page__title-icon" />
          {t("footer.links.about", "About")}
        </h1>
        <p className="about-page__description">
          {t(
            "aboutPage.description",
            "Welcome to TheCocktailDB! We are passionate about bringing you the best cocktail recipes from around the world. Our mission is to make it easy for you to discover, mix, and enjoy delicious drinks responsibly."
          )}
        </p>
      </Container>
    </div>
  );
};

export default AboutPage;
