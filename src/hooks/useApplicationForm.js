import { useState } from "react";
import { useTranslation } from "react-i18next";
import useFetchFilteredDrink from "./useFetchFilteredDrink"; // Import the mutation hook

const useApplicationForm = () => {
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
  const [errors, setErrors] = useState({});

  // Use the useFetchFilteredDrink mutation hook inside this hook
  const {
    mutate: fetchDrinkMutation,
    isLoading: isFetchingDrink,
    data: drinkResult,
  } = useFetchFilteredDrink();

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!form.name.trim()) newErrors.name = t("form.errors.name");
      if (!form.surname.trim()) newErrors.surname = t("form.errors.surname");
      if (!form.phone.trim()) newErrors.phone = t("form.errors.phone");
      if (!form.email.trim()) newErrors.email = t("form.errors.email");
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
        newErrors.email = t("form.errors.emailInvalid");
    } else if (step === 2) {
      if (!form.category) newErrors.category = t("form.errors.category");
      if (!form.alcoholic) newErrors.alcoholic = t("form.errors.alcoholic");
      if (!form.glass) newErrors.glass = t("form.errors.glass");
      if (!form.ingredients || form.ingredients.length === 0)
        newErrors.ingredients = t("form.errors.ingredients");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };
  const handleSelectChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };
  const handleMultiSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, ingredients: selected });
    setErrors({ ...errors, ingredients: undefined });
  };

  const handleNext = async (e) => {
    if (e) e.preventDefault();
    if (!validateStep()) return;
    if (step === 3) {
      // Trigger the mutation to fetch the drink
      fetchDrinkMutation({
        ingredients: form.ingredients,
        category: form.category,
      });
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  return {
    step,
    form,
    errors,
    handleChange,
    handleSelectChange,
    handleMultiSelectChange,
    handleNext,
    handleBack,
    isFetchingDrink, // Expose loading state from mutation
    drinkResult, // Expose data from mutation
  };
};

export default useApplicationForm;
