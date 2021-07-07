import React from 'react';

const ProductDescription = ({ item }) => {
  return (
    <div>
      <section className="black-section">
        <div className="product-desc-contain">
          <h2 className="product-desc-title">תיאור המוצר</h2>
          <p className="product-desc">{item.description}</p>
        </div>
        <div className="product-feature-contain">
          <h2 className="product-feature-title">תכונות עיקריות</h2>
          <ul className="product-feature-list">
            {item.features.map((feature, index) => {
              return (
                <li key={index} className="product-feature">
                  {feature}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="product-specs-contain">
          <h2 className="product-specs-title">מפרט טכני</h2>
          {item.specs.map((spec, index) => {
            return (
              <div key={index}>
                <p className="product-specs">{spec}</p>
                <br />
              </div>
            );
          })}
        </div>
      </section>
      <section className="white-section">
        <div className="additional-info-contain">
          <h2 className="additional-info-title">מידע נוסף</h2>
          <p className="additional-info">{item.additionalInfo}</p>
        </div>
        <div className="product-videos-container">
          <h2 className="product-videos-title">המלצות</h2>
          <div className="product-videos">
            {item.videos.map((video, index) => {
              if (index < 3)
                return (
                  <iframe
                    key={index}
                    src={video}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen={true}
                    title="video"
                  />
                );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDescription;
