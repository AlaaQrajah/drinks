import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/PrivacyPage.css'; // Link to the styling file
import Container from '../Container/Container'; // Using the Container component

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="privacy-page">
      <Container>
        <h1 className="privacy-page__title">
          {t('footer.legal.privacy', 'Privacy Policy')}
        </h1>{' '}
        {/* Use translation key for title */}
        <div className="privacy-page__content">
          {/* Placeholder content for Privacy Policy */}
          <p>
            {t(
              'privacyPage.placeholder1',
              'Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information when you use our website.'
            )}
          </p>
          <p>
            {t(
              'privacyPage.placeholder2',
              'We are committed to being transparent about our practices and providing you with control over your data.'
            )}
          </p>
          <p>
            {t(
              'privacyPage.placeholder3',
              'Please note that this is a simplified placeholder policy. A comprehensive privacy policy will be added later.'
            )}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPage;
