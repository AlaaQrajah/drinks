import React from "react";

const FormInput = ({ value, type, placeholder, className }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
      />
    </>
  );
};

export default FormInput;
