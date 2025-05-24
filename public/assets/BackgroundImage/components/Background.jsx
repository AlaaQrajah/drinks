const Background = ({ background, shape }) => {
  return (
    <>
      <div className={background}>
        <div className={shape}></div>
        <div className={shape}></div>
      </div>
    </>
  );
};

export default Background;
