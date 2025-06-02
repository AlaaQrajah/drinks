import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import '../../src/styles/FormSelect.css';

const FormSelect = ({
  id,
  name,
  options = [],
  className = '',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  label,
  icon: Icon,
}) => {
  return (
    <div className={`form-select-wrapper ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={id} className="form-input-label">
          {label} {required && <span className="required-mark">*</span>}
        </label>
      )}

      <div className="select-container">
        {Icon && <Icon className="select-icon" />}
        <select
          id={id}
          name={name}
          className={`form-select ${className} ${Icon ? 'with-icon' : ''} ${
            error ? 'select-error' : ''
          }`}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="select-arrow" />
      </div>

      {error && <div className="select-error-message">{error}</div>}
    </div>
  );
};

export default FormSelect;
