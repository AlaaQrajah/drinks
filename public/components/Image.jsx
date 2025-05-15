const Image = ({ src, alt, className, onLoad, style }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={onLoad}
      style={style}
    />
  );
};

export default Image;
