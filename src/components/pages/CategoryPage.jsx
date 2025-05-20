import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFetchCategoryDrinks from "../../hooks/useFetchCategoryDrinks"; // Assuming this hook exists and works
import CardList from "./CardList"; // Assuming CardList component exists
import LoadingSpinner from "../../../public/components/LoadingSpinner"; // Assuming LoadingSpinner exists
import ErrorPage from "../../../public/components/ErrorPage"; // Assuming ErrorPage exists
import Container from "../Container/Container"; // Using the Container component
import "../../styles/CategoryPage.css"; // Link to the styling file

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get category name from URL
  const { t } = useTranslation();

  // Use the hook to fetch drinks for the category
  const {
    data: drinks,
    isLoading,
    isError,
  } = useFetchCategoryDrinks(categoryName);

  if (isLoading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (isError) {
    return <ErrorPage />; // Show error page on error
  }

  const displayCategoryName = categoryName
    ? categoryName.replace(/_/g, " ")
    : t("Category"); // Format category name for display

  return (
    <div className="category-page">
      <Container>
        <h1 className="category-page__title">
          {displayCategoryName} {t("Drinks", "Drinks")}
        </h1>{" "}
        {/* Display category name */}
        {drinks && drinks.length > 0 ? (
          <CardList items={drinks} type="drink" /> // Display the list of drinks
        ) : (
          <div className="category-page__empty">
            {t("cardlist.empty", "No items found.")}
          </div> // Message if no drinks are found
        )}
      </Container>
    </div>
  );
};

export default CategoryPage;
