import React, { useState } from "react";

const Image = ({
  src,
  alt,
  className = "",
  onLoad,
  style = {},
  placeholderSrc,
  fallbackSrc,
  lazy = true,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <img
      src={hasError && fallbackSrc ? fallbackSrc : src}
      alt={alt || "Image"}
      className={`${className} ${!isLoaded && placeholderSrc ? "loading" : ""}`}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        transition: "opacity 0.3s ease",
        opacity: isLoaded ? 1 : placeholderSrc ? 0 : 1,
        ...style,
      }}
      loading={lazy ? "lazy" : "eager"}
      onClick={onClick}
    />
  );
};

export default Image;
