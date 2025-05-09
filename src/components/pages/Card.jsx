import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../styles/Card.css";
import LoadingSpinner from "../../../public/components/LoadingSpinner";

const Card = ({ item, type, onClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  let image = "";
  let name = "";
  let category = "";
  let alcoholic = "";
  let glass = "";
  let instructions = "";

  if (type === "drink") {
    image = item.strDrinkThumb;
    name = item.strDrink;
    category = item.strCategory;
    alcoholic = item.strAlcoholic;
    glass = item.strGlass;
    instructions = item.strInstructions
      ? item.strInstructions.slice(0, 60) +
        (item.strInstructions.length > 60 ? "..." : "")
      : "";
  } else if (type === "ingredient") {
    image = `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-medium.png`;
    name = item.strIngredient1;
    category = item.strType || "";
    alcoholic = item.strAlcohol ? t("yes") : t("no");
    glass = "";
    instructions = item.strDescription
      ? item.strDescription.slice(0, 60) +
        (item.strDescription.length > 60 ? "..." : "")
      : "";
  }

  const handleCardClick = () => {
    if (type === "drink" && item.idDrink) {
      navigate(`/drink/${item.idDrink}`);
    } else if (onClick) {
      onClick(item);
    }
  };

  return (
    <div
      className="card card--bg"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      style={{ backgroundImage: `url(${image})` }}
    >
      {imageLoading && (
        <div className="card__loading">
          <LoadingSpinner />
        </div>
      )}
      <img
        src={image}
        alt={name}
        className="card__image"
        onLoad={() => setImageLoading(false)}
        style={{ display: "none" }}
      />
      <div className="card__overlay">
        <h3 className="card__title">{name}</h3>
        {category && (
          <div className="card__meta">
            {t("Category")}: {category}
          </div>
        )}
        {alcoholic && (
          <div className="card__meta">
            {t("Alcoholic")}: {alcoholic}
          </div>
        )}
        {glass && (
          <div className="card__meta">
            {t("Glass")}: {glass}
          </div>
        )}
        {instructions && <div className="card__desc">{instructions}</div>}
      </div>
    </div>
  );
};

export default Card;
