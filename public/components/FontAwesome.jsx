import React from 'react';

const FontAwesome = ({
  className,
  icon,
  size = '1x',
  color,
  onClick,
  style = {},
}) => {
  const iconClass = icon ? `fa-${icon}` : '';
  const sizeClass = size ? `fa-${size}` : '';
  const customStyle = {
    color: color || 'inherit',
    cursor: onClick ? 'pointer' : 'inherit',
    ...style,
  };

  return (
    <i
      className={`fa ${iconClass} ${sizeClass} ${className || ''}`}
      style={customStyle}
      onClick={onClick}
    ></i>
  );
};

export default FontAwesome;
