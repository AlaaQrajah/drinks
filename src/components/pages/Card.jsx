import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../styles/Card.css";
import LoadingSpinner from "../../../public/components/LoadingSpinner";
import Image from "../../../public/components/Image";
import FormButton from "../../../public/components/FormButton";
const Card = ({ item, type, onClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(false);
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
    image = `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(item.name)}-medium.png`;
    name = item.name;
    category = "";
    alcoholic = "";
    glass = "";
    instructions = "";
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
    >
      <Image
        src={image}
        alt={name}
        className="card__image-bg"
        onLoad={() => setImageLoading(false)}
        style={{ display: imageLoading ? "none" : "block" }}
      />
      {imageLoading && (
        <div className="card__loading">
          <LoadingSpinner />
        </div>
      )}
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
      {type === "drink" && (
        <div className="cart">
          <FormButton text="Add to cart" className="button" />
        </div>
      )}
    </div>
  );
};

export default Card;
