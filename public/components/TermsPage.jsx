import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/TermsPage.css';
import Container from '../Container/Container';
import Background from '../../../public/assets/BackgroundImage/components/Background';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="terms-page">
      <div className="terms-page__background">
        <Background background="terms-page__bg" shape="terms-page__shape" />
      </div>

      <Container>
        <div className="terms-page__container">
          <h1 className="terms-page__title">
            {t('footer.legal.terms', 'Terms of Service')}
          </h1>

          <div className="terms-page__content">
            <div className="terms-page__section">
              <h2 className="terms-page__section-title">
                <FaInfoCircle className="terms-page__icon" />
                {t('termsPage.introduction.title', 'Introduction')}
              </h2>
              <p className="terms-page__text">
                {t(
                  'termsPage.introduction.content',
                  'Welcome to TheCocktailDB. By accessing our website or using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.'
                )}
              </p>
            </div>

            <div className="terms-page__section">
              <h2 className="terms-page__section-title">
                <FaCheckCircle className="terms-page__icon" />
                {t('termsPage.usage.title', 'Acceptable Use')}
              </h2>
              <p className="terms-page__text">
                {t(
                  'termsPage.usage.content',
                  'You must be at least 18 years old to use our services. You agree to use our content only for personal, non-commercial purposes. Reproduction or distribution of our content without permission is prohibited.'
                )}
              </p>
              <ul className="terms-page__list">
                <li>
                  {t(
                    'termsPage.usage.item1',
                    'You may not use our service for any illegal purposes'
                  )}
                </li>
                <li>
                  {t(
                    'termsPage.usage.item2',
                    'You may not attempt to gain unauthorized access to any part of our service'
                  )}
                </li>
                <li>
                  {t(
                    'termsPage.usage.item3',
                    'You may not use our service to harm others or damage our reputation'
                  )}
                </li>
              </ul>
            </div>

            <div className="terms-page__section">
              <h2 className="terms-page__section-title">
                <FaInfoCircle className="terms-page__icon" />
                {t('termsPage.account.title', 'User Accounts')}
              </h2>
              <p className="terms-page__text">
                {t(
                  'termsPage.account.content',
                  'When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.'
                )}
              </p>
            </div>

            <div className="terms-page__section">
              <h2 className="terms-page__section-title">
                <FaCheckCircle className="terms-page__icon" />
                {t('termsPage.content.title', 'Content')}
              </h2>
              <p className="terms-page__text">
                {t(
                  'termsPage.content.content',
                  'Our website contains information about alcoholic beverages. We promote responsible drinking and do not encourage excessive consumption of alcohol. Please consume alcoholic beverages responsibly.'
                )}
              </p>
            </div>

            <div className="terms-page__section">
              <h2 className="terms-page__section-title">
                <FaInfoCircle className="terms-page__icon" />
                {t('termsPage.changes.title', 'Changes to Terms')}
              </h2>
              <p className="terms-page__text">
                {t(
                  'termsPage.changes.content',
                  'We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of these terms and by maintaining a current version of the terms on our website.'
                )}
              </p>
            </div>
          </div>

          <div className="terms-page__footer">
            <p className="terms-page__footer-text">
              {t('termsPage.lastUpdated', 'Last Updated')}:{' '}
              {t('termsPage.date', 'January 1, 2023')}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;
