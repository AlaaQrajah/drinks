import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../services/api-client";
import LoadingSpinner from "../../../public/components/LoadingSpinner";
import ErrorPage from "../../../public/components/ErrorPage";
import CardList from "./CardList";
import "../../styles/DrinkDetails.css";

const DrinkDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [similarDrinks, setSimilarDrinks] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    api
      .get(`lookup.php?i=${id}`)
      .then((res) => {
        if (res.data.drinks && res.data.drinks.length > 0) {
          setDrink(res.data.drinks[0]);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (drink && drink.strCategory) {
      api
        .get(`filter.php?c=${encodeURIComponent(drink.strCategory)}`)
        .then((res) => {
          if (res.data.drinks) {
            setSimilarDrinks(
              res.data.drinks.filter((d) => d.idDrink !== id).slice(0, 6)
            );
          }
        })
        .catch(() => setSimilarDrinks([]));
    }
  }, [drink, id]);

  if (loading) return <LoadingSpinner />;
  if (error || !drink) return <ErrorPage />;

  // Gather ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="drink-details">
      <div className="drink-details__card">
        <div className="drink-details__image-col">
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="drink-details__image"
          />
        </div>
        <div className="drink-details__info-col">
          <h1 className="drink-details__title">{drink.strDrink}</h1>
          <div className="drink-details__meta">
            <span>
              {t("Category")}: {drink.strCategory}
            </span>
            <span>
              {t("Alcoholic")}: {drink.strAlcoholic}
            </span>
            <span>
              {t("Glass")}: {drink.strGlass}
            </span>
          </div>
          <h2 className="drink-details__subtitle">{t("Ingredients")}</h2>
          <ul className="drink-details__ingredients">
            {ingredients.map((item, idx) => (
              <li key={idx}>
                {item.measure && <span>{item.measure} </span>}
                {item.ingredient}
              </li>
            ))}
          </ul>
          <h2 className="drink-details__subtitle">{t("Instructions")}</h2>
          <p className="drink-details__instructions">{drink.strInstructions}</p>
        </div>
      </div>
      {similarDrinks.length > 0 && (
        <div className="drink-details__similar">
          <h2 className="drink-details__subtitle">{t("Similar Drinks")}</h2>
          <CardList items={similarDrinks} type="drink" />
        </div>
      )}
    </div>
  );
};

export default DrinkDetails;
