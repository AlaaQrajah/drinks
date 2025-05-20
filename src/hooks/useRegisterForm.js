import { useState } from "react";
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

  const validate = () => {
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
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  return {
    form,
    errors,
    submitted,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
