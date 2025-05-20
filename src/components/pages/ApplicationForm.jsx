import React from "react";
import { useTranslation } from "react-i18next";
import FormButton from "../../../public/components/FormButton";
import FormInput from "../../../public/components/FormInput";
import FormSelect from "../../../public/components/FormSelect";
import LoadingSpinner from "../../../public/components/LoadingSpinner";
import Card from "./Card";
import CardList from "./CardList"; // Import CardList to display similar drinks
import "../../styles/ApplicationForm.css";
// Remove api and useQuery imports as they are in hooks
// import api from "../../services/api-client";
// import { useQuery } from "@tanstack/react-query";

// Import the custom hooks
import useFormOptions from "../../hooks/useFormOptions";
import useApplicationForm from "../../hooks/useApplicationForm"; // Import the new form hook
import useFetchSimilarDrinks from "../../hooks/useFetchSimilarDrinks"; // Import the new similar drinks hook

// مكون الفورم الرئيسي لتقديم الطلب
const ApplicationForm = () => {
  // استخدام الترجمة
  const { t } = useTranslation();

  // Use the custom hook for form logic
  const {
    step,
    form,
    errors,
    handleChange,
    handleSelectChange,
    handleMultiSelectChange,
    handleNext,
    handleBack,
    isFetchingDrink,
    drinkResult,
  } = useApplicationForm();

  // Use the useFormOptions hook for fetching options
  const {
    data: options = {
      categories: [],
      alcoholics: [],
      glasses: [],
      ingredients: [],
    },
    isLoading: loadingOptions,
    isError: errorOptions,
  } = useFormOptions();

  // Use the useFetchSimilarDrinks hook
  // Enabled only when drinkResult is available (i.e., after fetching the recommended drink)
  const {
    data: similarDrinks = [],
    isLoading: isLoadingSimilar, // Renamed to avoid conflict
    isError: isErrorSimilar,
  } = useFetchSimilarDrinks(drinkResult?.strCategory, drinkResult?.idDrink);

  // الخطوة الأولى: معلومات شخصية
  const renderStep1 = () => (
    <form className="form-card application-form-card" onSubmit={handleNext}>
      {/* عنوان الخطوة */}
      <h2 className="form-title">{t("form.personalInfo")}</h2>
      <div className="form-row">
        <div className="form-group">
          <FormInput
            type="text"
            name="name"
            placeholder={t("form.name")}
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input error" : "input"}
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <FormInput
            type="text"
            name="surname"
            placeholder={t("form.surname")}
            value={form.surname}
            onChange={handleChange}
            className={errors.surname ? "input error" : "input"}
          />
          {errors.surname && <div className="form-error">{errors.surname}</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <FormInput
            type="text"
            name="phone"
            placeholder={t("form.phone")}
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? "input error" : "input"}
          />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>
        <div className="form-group">
          <FormInput
            type="email"
            name="email"
            placeholder={t("form.email")}
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input error" : "input"}
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>
      </div>
      <div className="form-actions">
        <FormButton text={t("form.next")} type="submit" />
      </div>
    </form>
  );

  // الخطوة الثانية: تفضيلات المشروب
  const renderStep2 = () => (
    <form className="form-card application-form-card" onSubmit={handleNext}>
      <h2 className="form-title">{t("form.drinkPreferences")}</h2>
      <div className="form-row">
        <div className="form-group">
          <FormSelect
            name="category"
            value={form.category}
            onChange={handleSelectChange}
            options={options.categories}
            placeholder={t("form.category")}
            className={errors.category ? "form-select error" : "form-select"}
          />
          {errors.category && (
            <div className="form-error">{errors.category}</div>
          )}
        </div>
        <div className="form-group">
          <FormSelect
            name="alcoholic"
            value={form.alcoholic}
            onChange={handleSelectChange}
            options={options.alcoholics}
            placeholder={t("form.alcoholic")}
            className={errors.alcoholic ? "form-select error" : "form-select"}
          />
          {errors.alcoholic && (
            <div className="form-error">{errors.alcoholic}</div>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <FormSelect
            name="glass"
            value={form.glass}
            onChange={handleSelectChange}
            options={options.glasses}
            placeholder={t("form.glass")}
            className={errors.glass ? "form-select error" : "form-select"}
          />
          {errors.glass && <div className="form-error">{errors.glass}</div>}
        </div>
        <div className="form-group">
          <FormSelect
            name="ingredients"
            value={form.ingredients}
            onChange={handleMultiSelectChange}
            options={options.ingredients}
            className={errors.ingredients ? "form-select error" : "form-select"}
            multiple
          />
          {errors.ingredients && (
            <div className="form-error">{errors.ingredients}</div>
          )}
        </div>
      </div>
      <div className="form-actions">
        <FormButton text={t("form.back")} type="button" onClick={handleBack} />
        <FormButton
          text={t("form.confirm")}
          onClick={(e) => {
            e.preventDefault();
            handleNext();
          }}
        />
      </div>
    </form>
  );

  // الخطوة الثالثة: مراجعة البيانات
  const renderStep3 = () => (
    <div className="form-card application-form-card">
      <h2 className="form-title">{t("form.review")}</h2>
      <div className="form-review review-box">
        <div>
          <b>{t("form.name")}</b>: {form.name}
        </div>
        <div>
          <b>{t("form.surname")}</b>: {form.surname}
        </div>
        <div>
          <b>{t("form.phone")}</b>: {form.phone}
        </div>
        <div>
          <b>{t("form.email")}</b>: {form.email}
        </div>
        <div>
          <b>{t("form.category")}</b>: {form.category}
        </div>
        <div>
          <b>{t("form.alcoholic")}</b>: {form.alcoholic}
        </div>
        <div>
          <b>{t("form.glass")}</b>: {form.glass}
        </div>
        <div>
          <b>{t("form.ingredients")}</b>: {form.ingredients.join(", ")}
        </div>
      </div>
      <div className="form-actions">
        <FormButton text={t("form.back")} type="button" onClick={handleBack} />
        <FormButton
          text={t("form.confirm")}
          onClick={(e) => {
            e.preventDefault();
            handleNext();
          }}
        />
      </div>
    </div>
  );

  // الخطوة الرابعة: عرض النتيجة في كارد منسق والمشروبات المشابهة
  const renderStep4 = () => (
    <div className="form-card application-form-card">
      <h2 className="form-title">{t("form.result")}</h2>
      {isFetchingDrink ? (
        <LoadingSpinner />
      ) : drinkResult && drinkResult.length > 0 ? (
        <div className="form-drink-result">
          <Card item={drinkResult[0]} type="drink" />
          {/* Display similar drinks if available and loaded */}
          {isLoadingSimilar ? (
            <LoadingSpinner />
          ) : (
            similarDrinks &&
            similarDrinks.length > 0 && (
              <div className="form-similar-drinks">
                <h3 className="form-similar-drinks-title">
                  {t("Similar Drinks")}
                </h3>
                <CardList items={similarDrinks} type="drink" />
              </div>
            )
          )}
        </div>
      ) : (
        <div>{t("form.noResult")}</div>
      )}
      <div className="form-actions">
        <FormButton text={t("form.back")} type="button" onClick={handleBack} />
      </div>
    </div>
  );

  // Renamed from loadingOptions to maintain clarity with form fetching state
  if (loadingOptions) return <LoadingSpinner />;
  // Also handle errorOptions if needed, although the hook already returns isError
  if (errorOptions) return <div>Error loading options</div>; // You might want a more specific error component

  // عرض الخطوة الحالية
  return (
    <div className="application-form-outer">
      {/* عرض الخطوة المناسبة */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};

export default ApplicationForm;
