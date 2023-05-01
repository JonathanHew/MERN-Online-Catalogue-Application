import React, { Fragment } from "react";

const ProductNavigation = ({ products, index, setValues, setIndex }) => {
  const nextProduct = (e) => {
    e.preventDefault();
    //setError("");
    //setSuccess("");
    let newIndex = index + 1;
    if (newIndex == products.length) {
      newIndex = 0;
      setIndex(newIndex);
    } else {
      setIndex(newIndex);
    }
    resetValues(newIndex);
  };

  const prevProduct = (e) => {
    e.preventDefault();
    //setError("");
    //setSuccess("");
    let newIndex = index - 1;
    if (newIndex < 0) {
      newIndex = products.length - 1;
      setIndex(newIndex);
    } else {
      setIndex(newIndex);
    }

    resetValues(newIndex);
  };

  const resetValues = (newIndex) => {
    setValues({
      id: products[newIndex].id,
      title: products[newIndex].title,
      description: products[newIndex].description,
      price: products[newIndex].price,
      brand: products[newIndex].brand,
      category: products[newIndex].category,
      thumbnail: products[newIndex].thumbnail,
    });
  };

  return (
    <Fragment>
      <button
        className="btn btn btn-outline-secondary me-2"
        onClick={(e) => prevProduct(e)}
      >
        Prev
      </button>
      <p className="mt-2">
        Product {index + 1} of {products.length}
      </p>
      <button
        className="btn btn btn-outline-secondary ms-2"
        onClick={(e) => nextProduct(e)}
      >
        Next
      </button>
    </Fragment>
  );
};

export default ProductNavigation;
