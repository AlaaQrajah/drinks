import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Forms from "../../../public/components/Forms";
import FormButton from "../../../public/components/FormButton";
import FormInput from "../../../public/components/FormInput";
import FormLabel from "../../../public/components/FormLabel";
import FormSelect from "../../../public/components/FormSelect";
import "../../styles/ApplicationForm.css";
import api from "../../services/api-client";

const ApplicationForm = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    category: "",
    alcoholic: "",
    glass: "",
    ingredients: [],
  });
  const [drinkResult, setDrinkResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    categories: [],
    alcoholics: [],
    glasses: [],
    ingredients: [],
  });

  useEffect(() => {
    // Fetch options for selects
    const fetchOptions = async () => {
      const [cat, alc, glass, ing] = await Promise.all([
        api.get("list.php?c=list"),
        api.get("list.php?a=list"),
        api.get("list.php?g=list"),
        api.get("list.php?i=list"),
      ]);
      setOptions({
        categories: cat.data.drinks.map((d) => ({
          value: d.strCategory,
          label: d.strCategory,
        })),
        alcoholics: alc.data.drinks.map((d) => ({
          value: d.strAlcoholic,
          label: d.strAlcoholic,
        })),
        glasses: glass.data.drinks.map((d) => ({
          value: d.strGlass,
          label: d.strGlass,
        })),
        ingredients: ing.data.drinks.map((d) => ({
          value: d.strIngredient1,
          label: d.strIngredient1,
        })),
      });
    };
    fetchOptions();
  }, []);

  // Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleMultiSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, ingredients: selected });
  };

  const handleNext = async () => {
    if (step === 3) {
      setLoading(true);
      // Fetch a matching drink (by ingredient or category)
      let res = null;
      if (form.ingredients.length > 0) {
        res = await api.get(`filter.php?i=${form.ingredients[0]}`);
      } else if (form.category) {
        res = await api.get(`filter.php?c=${form.category}`);
      }
      setDrinkResult(res?.data?.drinks?.[0] || null);
      setLoading(false);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };
  const handleBack = () => setStep(step - 1);

  // Step 1: Personal Info
  const renderStep1 = () => (
    <div className="form-card">
      <h2 className="form-title">{t("form.personalInfo")}</h2>
      <div className="form-row">
        <FormInput
          type="text"
          name="name"
          placeholder={t("form.name")}
          value={form.name}
          onChange={handleChange}
        />
        <FormInput
          type="text"
          name="surname"
          placeholder={t("form.surname")}
          value={form.surname}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <FormInput
          type="text"
          name="phone"
          placeholder={t("form.phone")}
          value={form.phone}
          onChange={handleChange}
        />
        <FormInput
          type="email"
          name="email"
          placeholder={t("form.email")}
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <FormButton text={t("form.next")} onClick={handleNext} />
      </div>
    </div>
  );

  // Step 2: Drink Preferences
  const renderStep2 = () => (
    <div className="form-card">
      <h2 className="form-title">{t("form.drinkPreferences")}</h2>
      <div className="form-row">
        <FormSelect
          name="category"
          value={form.category}
          onChange={handleSelectChange}
          options={options.categories}
          placeholder={t("form.category")}
          className="form-select"
        />
        <FormSelect
          name="alcoholic"
          value={form.alcoholic}
          onChange={handleSelectChange}
          options={options.alcoholics}
          placeholder={t("form.alcoholic")}
          className="form-select"
        />
      </div>
      <div className="form-row">
        <FormSelect
          name="glass"
          value={form.glass}
          onChange={handleSelectChange}
          options={options.glasses}
          placeholder={t("form.glass")}
          className="form-select"
        />
      </div>
      <div className="form-row">
        <FormSelect
          name="ingredients"
          value={form.ingredients}
          onChange={handleMultiSelectChange}
          options={options.ingredients}
          className="form-select"
          multiple
        />
      </div>
      <div className="form-actions">
        <FormButton text={t("form.back")} onClick={handleBack} />
        <FormButton text={t("form.next")} onClick={handleNext} />
      </div>
    </div>
  );

  // Step 3: Review
  const renderStep3 = () => (
    <div className="form-card">
      <h2 className="form-title">{t("form.review")}</h2>
      <div className="form-review">
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
          <b>{t("form.ingredient")}</b>: {form.ingredients.join(", ")}
        </div>
      </div>
      <div className="form-actions">
        <FormButton text={t("form.back")} onClick={handleBack} />
        <FormButton text={t("form.confirm")} onClick={handleNext} />
      </div>
    </div>
  );

  // Step 4: Show Drink
  const renderStep4 = () => (
    <div className="form-card">
      <h2 className="form-title">{t("form.result")}</h2>
      {loading ? (
        <div>{t("loading")}</div>
      ) : drinkResult ? (
        <div className="form-drink-result">
          <img
            src={drinkResult.strDrinkThumb}
            alt={drinkResult.strDrink}
            style={{ width: 200, borderRadius: 12 }}
          />
          <h3>{drinkResult.strDrink}</h3>
          <div>
            {drinkResult.strCategory} | {drinkResult.strAlcoholic} |{" "}
            {drinkResult.strGlass}
          </div>
          <div>{drinkResult.strInstructions}</div>
        </div>
      ) : (
        <div>{t("form.noResult")}</div>
      )}
      <div className="form-actions">
        <FormButton text={t("form.back")} onClick={handleBack} />
      </div>
    </div>
  );

  return (
    <div className="application-form-container">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};

export default ApplicationForm;
