import React from "react";
import { Fragment } from "react";

const ProductForm = ({ products, index, values, setValues, setIndex }) => {
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const nextProduct = (e) => {
    e.preventDefault();
    //setError("");
    //setSuccess("");
    const newIndex = index + 1;
    if (newIndex == products.length) {
      setIndex(0);
    } else {
      setIndex(newIndex);
    }
  };

  const prevProduct = (e) => {
    e.preventDefault();
    //setError("");
    //setSuccess("");
    const newIndex = index - 1;
    if (newIndex < 0) {
      setIndex(products.length - 1);
    } else {
      setIndex(newIndex);
    }
  };

  return (
    <Fragment>
      <div className="text-center mt-3">
        <img
          src={products[index].thumbnail}
          alt={products[index].thumbnail}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      </div>
      <div className="text-center mt-2">
        <label for="productId" className="form-label">
          Product ID
        </label>
        <div className="input-group mb-1 m-auto" style={{ width: "200px" }}>
          <button
            class="btn btn-outline-secondary"
            type="button"
            onClick={(e) => prevProduct(e)}
          >
            Prev
          </button>
          <input
            type="number"
            className="form-control m-auto"
            id="productId"
            name="productId"
            value={values.id}
            onChange={(e) => onChange(e)}
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            onClick={(e) => {
              nextProduct(e);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductForm;
