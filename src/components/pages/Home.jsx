import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "../../services/api-client";
import CardList from "./CardList";
import "../../styles/Home.css";
import ErrorPage from "../../../public/components/ErrorPage";
import LoadingSpinner from "../../../public/components/LoadingSpinner";
import FormButton from "../../../public/components/FormButton";
import useIngredients from "../../hooks/useIngredients";
import useLatestDrinks from "../../hooks/useLatestDrinks";
import usePopularDrinks from "../../hooks/usePopularDrinks";
import { getRandomItems } from "../../utils/array";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data: allIngredients = [],
    isLoading: loadingIngredients,
    isError: errorIngredients,
  } = useIngredients();

  const {
    data: latestDrinks = [],
    isLoading: loadingLatest,
    isError: errorLatest,
  } = useLatestDrinks();

  const {
    data: popularDrinks = [],
    isLoading: loadingPopular,
    isError: errorPopular,
  } = usePopularDrinks();

  const popularIngredients = allIngredients.slice(0, 8);
  const randomIngredients = getRandomItems(allIngredients, 8);

  const loading = loadingIngredients || loadingLatest || loadingPopular;
  const error = errorIngredients || errorLatest || errorPopular;

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
