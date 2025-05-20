import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles/PrivacyPage.css"; // Link to the styling file
import Container from "../Container/Container"; // Using the Container component

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="privacy-page">
      <Container>
        <h1 className="privacy-page__title">
          {t("footer.legal.privacy", "Privacy Policy")}
        </h1>{" "}
        {/* Use translation key for title */}
        <div className="privacy-page__content">
          {/* Placeholder content for Privacy Policy */}
          <p>
            {t(
              "privacyPage.comingSoon",
              "Privacy Policy content is coming soon. Please check back later for updates."
            )}
          </p>
          {/* In a real application, you would have detailed privacy policy text here */}
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPage;
