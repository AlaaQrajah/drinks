import React, { useState, useCallback } from "react";
import "../../styles/LoginHero.css";
import FormInput from "../../../public/components/FormInput";
import FormButton from "../../../public/components/FormButton";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const LoginHero = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field as user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  // Validation logic
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = t("login.errors.emailOrUsernameRequired");
    }
    if (!formData.password.trim()) {
      newErrors.password = t("login.errors.passwordRequired");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form before attempting submission
    if (validateForm()) {
      // Add your login logic here
      console.log("Login form submitted:", formData);
      // For now, simulate a successful login
      const userData = {
        // Replace with actual user data from backend
        emailOrPhone: formData.emailOrPhone,
        // Do not store password in local storage
      };
      login(userData); // Call login from AuthContext
      navigate("/application"); // Navigate to application page after login
    }
  };

  return (
    <div className="login-container">
      {/* Keep the background shapes */}
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      {/* Add noValidate to prevent default browser validation */}
      <form onSubmit={handleSubmit} noValidate>
        <h3>{t("login.title")}</h3>

        {/* Use FormInput component for Username/Email */}
        {/* Pass the specific error message for emailOrPhone */}
        <FormInput
          label={t("login.emailOrUsername")}
          type="text"
          name="emailOrPhone"
          placeholder=" "
          value={formData.emailOrPhone}
          onChange={handleChange}
          error={errors.emailOrPhone} // Pass error message here
          required
          icon={FaUser}
        />

        {/* Use FormInput component for Password */}
        {/* Pass the specific error message for password */}
        <FormInput
          label={t("register.password")} // Reusing register.password for consistency, or add a new login.password key and use it here
          type="password"
          name="password"
          placeholder=" "
          value={formData.password}
          onChange={handleChange}
          error={errors.password} // Pass error message here
          required
          icon={FaLock}
        />

        {/* Use FormButton component for the submit button */}
        <FormButton type="submit" text={t("login.submit")} />

        {/* Keep the social login section */}
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginHero;
