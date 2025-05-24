import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

const useRegisterForm = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = useCallback(() => {
    const errs = {};
    if (!form.firstname.trim()) errs.firstname = t("register.errors.firstname");
    if (!form.lastname.trim()) errs.lastname = t("register.errors.lastname");
    if (!form.email.trim()) errs.email = t("register.errors.email");
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errs.email = t("register.errors.emailInvalid");
    if (!form.password) errs.password = t("register.errors.password");
    else if (form.password.length < 6)
      errs.password = t("register.errors.passwordShort");
    if (!form.confirmPassword)
      errs.confirmPassword = t("register.errors.confirmPassword");
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = t("register.errors.passwordMatch");
    return errs;
  }, [form, t]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
  }, []);

  const resetForm = useCallback(() => {
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setSubmitted(false);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitted(true);
        // You would typically make an API call here to register the user
        console.log("Form submitted successfully:", form);
      } catch (error) {
        console.error("Registration error:", error);
        setErrors(prev => ({ 
          ...prev, 
          submit: t("register.errors.submitFailed") 
        }));
      } finally {
        setLoading(false);
      }
    }
  }, [form, validate, t]);

  return {
    form,
    errors,
    submitted,
    loading,
    handleChange,
    handleSubmit,
    resetForm,
    isValid: Object.keys(validate()).length === 0
  };
};

export default useRegisterForm;