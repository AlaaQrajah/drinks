import React from 'react';
import { FiInfo } from 'react-icons/fi';

const FormLabel = ({
  name,
  className = '',
  htmlFor,
  required = false,
  tooltip,
}) => {
  return (
    <label htmlFor={htmlFor} className={`form-input-label ${className}`}>
      {name}
      {required && <span className="required-mark">*</span>}
      {tooltip && (
        <span className="label-tooltip" title={tooltip}>
          <FiInfo size={14} />
        </span>
      )}
    </label>
  );
};

export default FormLabel;
