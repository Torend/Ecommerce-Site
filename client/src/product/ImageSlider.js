import React from 'react';

const ImageSlider = ({ imgArr = [] }) => {
  const [imgIndex, setImgIndex] = React.useState(0);

  const nextImg = () => {
    if (imgIndex === imgArr.length - 1) setImgIndex(0);
    else setImgIndex(imgIndex + 1);
  };

  const prevImg = () => {
    if (imgIndex === 0) setImgIndex(imgArr.length - 1);
    else setImgIndex(imgIndex - 1);
  };

  return (
    <div className="slider">
      <img src={imgArr[imgIndex]} />
      <div className="slider-img-row">
        <div
          className="slider-btn"
          onClick={() => {
            prevImg();
          }}
        >
          {'<'}
        </div>
        {imgArr.map((img, index) => {
          return (
            <div
              key={index}
              style={{ width: 50, height: 50 }}
              onClick={() => {
                setImgIndex(index);
              }}
            >
              <img
                src={img}
                style={index == imgIndex ? { transform: 'scale(1.50)' } : null}
              />
            </div>
          );
        })}
        <div
          className="slider-btn"
          onClick={() => {
            nextImg();
          }}
        >
          {'>'}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
