import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/RecipesPage.css'; // Link to the styling file
import Container from '../Container/Container'; // Using the Container component

const RecipesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="recipes-page">
      <Container>
        <h1 className="recipes-page__title">
          {t('footer.links.recipes', 'Recipes')}
        </h1>{' '}
        {/* Use translation key for title */}
        <p className="recipes-page__description">
          {t(
            'recipesPage.description',
            'Explore our collection of delicious cocktail recipes. Find your next favorite drink to mix!'
          )}{' '}
          {/* Placeholder description */}
        </p>
        {/* Content for recipes will go here (e.g., a list of recipes, search/filter options) */}
        <div className="recipes-page__content">
          {/* Placeholder for recipes list or other content */}
          <p>
            {t('recipesPage.comingSoon', 'Recipes content is coming soon!')}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default RecipesPage;
