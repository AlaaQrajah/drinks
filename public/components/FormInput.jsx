import "../../src/styles/FormInput.css";

const FormInput = ({
  value,
  type,
  placeholder,
  className,
  onChange,
  icon: Icon,
}) => {
  return (
    <div className="form-input-wrapper">
      <div className="input-container">
        {Icon && <Icon className="input-icon" />}
        <input
          type={type}
          placeholder={placeholder}
          className={`form-input ${className} ${Icon ? "with-icon" : ""}`}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormInput;
