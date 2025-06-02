import React from 'react';
import '../../src/styles/FormButton.css';

const FormButton = ({
  type = 'submit',
  text,
  onClick,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`btn ${variant} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-txt">{text}</span>
    </button>
  );
};

export default FormButton;
