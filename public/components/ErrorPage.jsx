import "../../src/styles/ErrorPage.css";
import Image from "./Image";
import illustration from "../../public/assets/404-illustration.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="errorpage-container">
      <div className="errorpage-content">
        <div className="errorpage-image-container">
          <Image
            src={illustration}
            alt="404 Illustration"
            className="errorpage-image"
          />
          <div className="errorpage-stars">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`star star-${i + 1}`}></div>
            ))}
          </div>
        </div>
        <div className="errorpage-text">
          <h1 className="errorpage-title">ERROR 404</h1>
          <h2 className="errorpage-subtitle">{t("errorpage.subtitle")}</h2>
          <p className="errorpage-description">{t("errorpage.description")}</p>
          <Link to="/" className="errorpage-button">
            <FaHome className="home-icon" /> {t("errorpage.link")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
