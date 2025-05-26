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
import { useAuth } from "../Context/AuthContext";

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import navigation styles

// Import required Swiper modules
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // Import Navigation and Autoplay modules

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  // The main loading state is for the initial public content (Popular Drinks)
  const mainLoading = loadingPopular;
  const mainError = errorPopular;

  // Combined loading/error for the sections that appear after login
  const loggedInSectionsLoading = loadingIngredients || loadingLatest;
  const loggedInSectionsError = errorIngredients || errorLatest;

  if (mainError) return <ErrorPage />;
  if (mainLoading) return <LoadingSpinner fullScreen={true} overlay={true} />;

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

        {/* Display popular drinks in a Swiper carousel before login */}
        {!user ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            navigation={true} // Enable navigation arrows
            autoplay={{
              delay: 5000, // Autoplay delay in ms
              disableOnInteraction: false, // Keep autoplaying after user interaction
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination, Navigation, Autoplay]} // Add Navigation and Autoplay modules
            className="popular-drinks-swiper"
          >
            {popularDrinks.map((drink) => (
              <SwiperSlide key={drink.idDrink}>
                {/* Wrap single drink in array for CardList and center it */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CardList items={[drink]} type="drink" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <CardList items={popularDrinks} type="drink" />
        )}
      </section>

      {user && (
        <>
          <section className="home__section">
            <h2 className="home__section-title">
              {t("home.popularIngredients")}
            </h2>
            {loadingIngredients ? (
              <LoadingSpinner size="small" />
            ) : loggedInSectionsError ? (
              <ErrorPage />
            ) : (
              <CardList items={popularIngredients} type="ingredient" />
            )}
          </section>

          <section className="home__section">
            <h2 className="home__section-title">{t("home.latestDrinks")}</h2>
            {loadingLatest ? (
              <LoadingSpinner size="small" />
            ) : loggedInSectionsError ? (
              <ErrorPage />
            ) : (
              <CardList items={latestDrinks} type="drink" />
            )}
          </section>

          <section className="home__section">
            <h2 className="home__section-title">
              {t("home.randomIngredients")}
            </h2>
            {loadingIngredients ? (
              <LoadingSpinner size="small" />
            ) : loggedInSectionsError ? (
              <ErrorPage />
            ) : (
              <CardList items={randomIngredients} type="ingredient" />
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
