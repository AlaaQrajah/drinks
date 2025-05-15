import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../public/components/FormInput";
import FormButton from "../../../public/components/FormButton";
import "../../styles/RegisterForm.css";

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  return (
    <div className="register-form-outer">
      <button className="register-home-btn" onClick={() => navigate("/")}>
        {t("navbar.home")}
      </button>
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <p className="register-title">{t("register.title")}</p>
        <p className="register-message">{t("register.message")}</p>
        {submitted && (
          <div className="register-success">{t("register.success")}</div>
        )}
        <div className="register-flex">
          <label>
            <FormInput
              type="text"
              name="firstname"
              placeholder=" "
              value={form.firstname}
              onChange={handleChange}
              className={errors.firstname ? "input error" : "input"}
            />
            <span>{t("register.firstname")}</span>
            {errors.firstname && (
              <div className="register-error">{errors.firstname}</div>
            )}
          </label>
          <label>
            <FormInput
              type="text"
              name="lastname"
              placeholder=" "
              value={form.lastname}
              onChange={handleChange}
              className={errors.lastname ? "input error" : "input"}
            />
            <span>{t("register.lastname")}</span>
            {errors.lastname && (
              <div className="register-error">{errors.lastname}</div>
            )}
          </label>
        </div>
        <label>
          <FormInput
            type="email"
            name="email"
            placeholder=" "
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input error" : "input"}
          />
          <span>{t("register.email")}</span>
          {errors.email && <div className="register-error">{errors.email}</div>}
        </label>
        <label>
          <FormInput
            type="password"
            name="password"
            placeholder=" "
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "input error" : "input"}
          />
          <span>{t("register.password")}</span>
          {errors.password && (
            <div className="register-error">{errors.password}</div>
          )}
        </label>
        <label>
          <FormInput
            type="password"
            name="confirmPassword"
            placeholder=" "
            value={form.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "input error" : "input"}
          />
          <span>{t("register.confirmPassword")}</span>
          {errors.confirmPassword && (
            <div className="register-error">{errors.confirmPassword}</div>
          )}
        </label>
        <FormButton type="submit" text={t("register.submit")} />
        <p className="register-signin">
          {t("register.signinText")} <a href="#">{t("register.signinLink")}</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
