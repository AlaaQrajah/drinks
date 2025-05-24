import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import useFetchFilteredDrink from "./useFetchFilteredDrink";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the useFetchFilteredDrink mutation hook inside this hook
  const {
    mutate: fetchDrinkMutation,
    isLoading: isFetchingDrink,
    data: drinkResult,
    error: fetchError,
    reset: resetFetch,
  } = useFetchFilteredDrink();

  const validateStep = useCallback(() => {
    const newErrors = {};
    if (step === 1) {
      if (!form.name.trim()) newErrors.name = t("form.errors.name");
      if (!form.surname.trim()) newErrors.surname = t("form.errors.surname");
      if (!form.phone.trim()) newErrors.phone = t("form.errors.phone");
      else if (!/^\+?[0-9\s\-()]{8,}$/.test(form.phone))
        newErrors.phone = t("form.errors.phoneInvalid");
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
  }, [form, step, t]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
  }, []);

  const handleSelectChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
  }, []);

  const handleMultiSelectChange = useCallback((e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm(prevForm => ({ ...prevForm, ingredients: selected }));
    setErrors(prevErrors => ({ ...prevErrors, ingredients: undefined }));
  }, []);

  const resetForm = useCallback(() => {
    setForm({
      name: "",
      surname: "",
      phone: "",
      email: "",
      category: "",
      alcoholic: "",
      glass: "",
      ingredients: [],
    });
    setErrors({});
    setStep(1);
    resetFetch();
  }, [resetFetch]);

  const handleNext = useCallback(async (e) => {
    if (e) e.preventDefault();
    if (!validateStep()) return;
    
    if (step === 3) {
      setIsSubmitting(true);
      try {
        // Trigger the mutation to fetch the drink
        await fetchDrinkMutation({
          ingredients: form.ingredients,
          category: form.category,
        });
        setStep(step + 1);
      } catch (error) {
        console.error("Error fetching drink:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(prevStep => prevStep + 1);
    }
  }, [fetchDrinkMutation, form, step, validateStep]);

  const handleBack = useCallback(() => {
    setStep(prevStep => prevStep - 1);
  }, []);

  return {
    step,
    form,
    errors,
    handleChange,
    handleSelectChange,
    handleMultiSelectChange,
    handleNext,
    handleBack,
    resetForm,
    isSubmitting,
    isFetchingDrink,
    drinkResult,
    fetchError,
    totalSteps: 4, // Added for better UI control
  };
};

export default useApplicationForm;