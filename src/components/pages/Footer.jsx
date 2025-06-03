import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../Container/Container';
import '../../styles/Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../../../public/assets/logo.png';
import { BiSolidRightArrow } from 'react-icons/bi';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">
              <img width="30px" src={logo} alt={t('footer.title')} />
               
                <Link to="/">{t('footer.title')}</Link>
               
            </h3>
            <p className="footer__description">{t('footer.subtitle')}</p>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">{t('footer.links.home')}</h4>
            <ul className="footer__links">
              <li>
                <BiSolidRightArrow className="footer__arrow-icon" />
                <Link to="/">{t('footer.links.home')}</Link>
              </li>
              <li>
                <BiSolidRightArrow className="footer__arrow-icon" />
                <Link to="/about">{t('footer.links.about')}</Link>
              </li>
              <li>
                <BiSolidRightArrow className="footer__arrow-icon" />
                <Link to="/recipes">{t('footer.links.recipes')}</Link>
              </li>
              <li>
                <BiSolidRightArrow className="footer__arrow-icon" />
                <Link to="/contact">{t('footer.links.contact')}</Link>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">
              {t('footer.categories.popular')}
            </h4>
            <ul className="footer__links">
              <li>
                <BiSolidRightArrow className="footer__arrow-icon" />
                <Link to="/category/popular">
                  {t('footer.categories.popular')}
                </Link>
              </li>
              <li>
                <BiSolidRightArrow className="footer__arrow-icon" />
                <Link to="/category/latest">
                  {t('footer.categories.latest')}
                </Link>
              </li>
              <li>
                <BiSolidRightArrow className="footer__arrow-icon" />
                <Link to="/category/non-alcoholic">
                  {t('footer.categories.non-alcoholic')}
                </Link>
              </li>
              <li>
                <BiSolidRightArrow className="footer__arrow-icon" />
                <Link to="/category/random">
                  {t('footer.categories.random')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">
              {t('footer.social.facebook') +
                ' & ' +
                t('footer.social.twitter') +
                ' & ' +
                t('footer.social.instagram')}
            </h4>
            <div className="footer__social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.social.facebook')}
              >
                <FaFacebookF className="footer__social-icon" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.social.twitter')}
              >
                <FaTwitter className="footer__social-icon" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.social.instagram')}
              >
                <FaInstagram className="footer__social-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            {t('footer.copyright', { year: currentYear })}
          </div>
          <div className="footer__legal">
            <Link to="/privacy">{t('footer.legal.privacy')}</Link>
            <Link to="/terms">{t('footer.legal.terms')}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
