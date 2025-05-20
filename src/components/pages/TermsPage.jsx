import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles/TermsPage.css"; // Link to the styling file
import Container from "../Container/Container"; // Using the Container component

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="terms-page">
      <Container>
        <h1 className="terms-page__title">
          {t("footer.legal.terms", "Terms of Service")}
        </h1>{" "}
        {/* Use translation key for title */}
        <div className="terms-page__content">
          {/* Placeholder content for Terms of Service */}
          <p>
            {t(
              "termsPage.comingSoon",
              "Terms of Service content is coming soon. Please check back later for updates."
            )}
          </p>
          {/* In a real application, you would have detailed terms of service text here */}
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;
