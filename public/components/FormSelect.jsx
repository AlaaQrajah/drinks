import React from "react";

const FormSelect = ({
  id,
  name,
  options,
  className,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <select
      id={id}
      name={name}
      className={className}
      value={value}
      onChange={onChange}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
