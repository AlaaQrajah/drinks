import "../../src/styles/ErrorPage.css";
import Image from "./Image";
import illustration from "../../public/assets/404-illustration.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="errorpage-container">
      <div className="errorpage-content">
        <Image
          src={illustration}
          alt="404 Illustration"
          className="errorpage-image"
        />
        <div className="errorpage-text">
          <h1 className="errorpage-title">{t("errorpage.title")}</h1>
          <h2 className="errorpage-subtitle">{t("errorpage.subtitle")}</h2>
          <p className="errorpage-description">{t("errorpage.description")}</p>
          <Link to="/" className="errorpage-button">
            {t("errorpage.link")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
