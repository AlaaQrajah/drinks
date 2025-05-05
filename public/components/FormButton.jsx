import React from "react";

const FormButton = ({ type = "submit", className, text }) => {
  return (
    <button type={type} className={className}>
      {text}
    </button>
  );
};

export default FormButton;
