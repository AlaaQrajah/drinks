import React from "react";
import "../../src/styles/FormInput.css";

const FormInput = ({
  value,
  type = "text",
  placeholder,
  className = "",
  onChange,
  icon: Icon,
  name,
  label,
  error,
  disabled = false,
  required = false,
  onBlur,
  onFocus,
  autoComplete,
  maxLength,
  min,
  max,
}) => {
  return (
    <div className={`form-input-wrapper ${error ? "has-error" : ""}`}>
      {label && (
        <label htmlFor={name} className="form-input-label">
          {label} {required && <span className="required-mark">*</span>}
        </label>
      )}
      <div className="input-container">
        {Icon && <Icon className="input-icon" />}
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`form-input ${className} ${Icon ? "with-icon" : ""} ${
            error ? "input-error" : ""
          }`}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete={autoComplete}
          maxLength={maxLength}
          min={min}
          max={max}
        />
      </div>
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
};

export default FormInput;
