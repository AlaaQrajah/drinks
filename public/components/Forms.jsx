import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import "../../src/styles/form.css";
const Forms = ({
  value,
  type,
  placeholder,
  classNameLabel,
  name,
  classNameInput,
  htmlFor,
  text,
}) => {
  return (
    <form className="form">
      <div className="form-label-input">
        <FormLabel htmlFor={htmlFor} className={classNameLabel} name={name} />
        <FormInput
          type={type}
          placeholder={placeholder}
          className={classNameInput}
          value={value}
        />
      </div>
      <FormButton text={text} />

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
