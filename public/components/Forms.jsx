import React from 'react';
import FormLabel from './FormLabel';
import FormInput from './FormInput';
import FormButton from './FormButton';
import '../../src/styles/form.css';

const Forms = ({
  value,
  type = 'text',
  placeholder,
  classNameLabel,
  name,
  classNameInput,
  htmlFor,
  text,
  onSubmit,
  onChange,
  required = false,
  error,
  icon,
  buttonVariant = 'primary',
  buttonSize = 'medium',
  children,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {children || (
        <>
          <div className="form-label-input">
            <FormLabel
              htmlFor={htmlFor}
              className={classNameLabel}
              name={name}
              required={required}
            />
            <FormInput
              type={type}
              placeholder={placeholder}
              className={classNameInput}
              value={value}
              onChange={onChange}
              name={htmlFor}
              icon={icon}
              error={error}
            />
          </div>
          <FormButton
            text={text}
            type="submit"
            variant={buttonVariant}
            size={buttonSize}
          />
        </>
      )}

      <section className="bg-stars">
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
      </section>
    </form>
  );
};

export default Forms;
