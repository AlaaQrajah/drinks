import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "../../services/api-client";
import CardList from "./CardList";
import "../../styles/Home.css";
import ErrorPage from "../../../public/components/ErrorPage";
import LoadingSpinner from "../../../public/components/LoadingSpinner";
import FormButton from "../../../public/components/FormButton";
function getRandomItems(arr, n) {
  if (!Array.isArray(arr)) return [];
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [popularIngredients, setPopularIngredients] = useState([]);
  const [randomIngredients, setRandomIngredients] = useState([]);
  const [latestDrinks, setLatestDrinks] = useState([]);
  const [popularDrinks, setPopularDrinks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(false);
    // Fetch all ingredients
    api
      .get("list.php?i=list")
      .then((res) => {
        const allIngredients = res.data.drinks || [];
        setPopularIngredients(allIngredients.slice(0, 8));
        setRandomIngredients(getRandomItems(allIngredients, 8));
      })
      .catch(() => setError(true));
    // Fetch latest drinks (by first letter 'a')
    api
      .get("search.php?f=a")
      .then((res) => setLatestDrinks(res.data.drinks || []))
      .catch(() => setError(true));
    // Fetch popular drinks (Cocktail category)
    api
      .get("filter.php?c=Cocktail")
      .then((res) => setPopularDrinks(res.data.drinks || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <ErrorPage />;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">{t("home.title")}</h1>
        <p className="home__description">{t("home.description")}</p>
        <FormButton
          text={t("home.apply")}
          className="home__apply-btn"
          onClick={() => navigate("/application")}
        />
      </section>

      <section className="home__section">
        <h2 className="home__section-title">{t("home.popularDrinks")}</h2>
        <CardList items={popularDrinks} type="drink" />
      </section>

      <section className="home__section">
        <h2 className="home__section-title">{t("home.popularIngredients")}</h2>
        <CardList items={popularIngredients} type="ingredient" />
      </section>

      <section className="home__section">
        <h2 className="home__section-title">{t("home.latestDrinks")}</h2>
        <CardList items={latestDrinks} type="drink" />
      </section>

      <section className="home__section">
        <h2 className="home__section-title">{t("home.randomIngredients")}</h2>
        <CardList items={randomIngredients} type="ingredient" />
      </section>
    </div>
  );
};

export default Home;
