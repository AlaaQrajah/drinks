import React from "react";
import "../../src/components/Styles/StylesErrorPage/ErrorPage.css";
import Image from "./Image";
import illustration from "../../public/assets/404-illustration.jpg";
const ErrorPage = () => {
  return (
    <div className="errorpage-container">
      <div className="errorpage-content">
        <Image
          src={illustration}
          alt="404 Illustration"
          className="errorpage-image"
        />
        <div className="errorpage-text">
          <h1 className="errorpage-title">Opps!</h1>
          <h2 className="errorpage-subtitle">
            We Can't Seem to Find The Page You're Looking For.
          </h2>
          <p className="errorpage-description">
            Oops! The page you are looking for does not exist. It might have
            been moved or deleted.
          </p>
          <a href="/" className="errorpage-button">
            Go To Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
