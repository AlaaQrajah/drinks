import React from "react";
import "../../styles/Home.css";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  console.log(i18n.language, t("home.title"));
  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">{t("home.title")}</h1>
        <p className="home__description">{t("home.description")}</p>
      </section>

      {/* <section className="home__features">
        <div className="home__feature">
          <h2>{t("home.features.discover.title")}</h2>
          <p>{t("home.features.discover.description")}</p>
        </div>
        <div className="home__feature">
          <h2>{t("home.features.explore.title")}</h2>
          <p>{t("home.features.explore.description")}</p>
        </div>
        <div className="home__feature">
          <h2>{t("home.features.share.title")}</h2>
          <p>{t("home.features.share.description")}</p>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
