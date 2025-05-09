import "../../src/styles/FormButton.css";
const FormButton = ({ type = "submit", text, onClick }) => {
  return (
    <button type={type} className="btn-donate" onClick={onClick}>
      <span className="btn-txt"> {text}</span>
    </button>
  );
};

export default FormButton;
