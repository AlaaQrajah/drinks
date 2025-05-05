import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
const Forms = ({
  value,
  type,
  placeholder,
  classNameLabel,
  name,
  classNameInput,
  htmlFor,
  classNameButton,
  text,
}) => {
  return (
    <form>
      <div className="form-label-input">
        <FormLabel htmlFor={htmlFor} className={classNameLabel} name={name} />
        <FormInput
          type={type}
          placeholder={placeholder}
          className={classNameInput}
          value={value}
        />
      </div>
      <FormButton text={text} className={classNameButton} />
    </form>
  );
};

export default Forms;
