const FormLabel = ({ name, className, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {name}
    </label>
  );
};

export default FormLabel;
