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
    let newIndex = index + 1;
    if (newIndex == products.length) {
      newIndex = 0
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
      newIndex = products.length -1
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
    })
  }

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
            id="id"
            name="id"
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
        <div class="mt-2">
          <label for="productName" class="form-label">
            Product
          </label>
          <input
            type="text"
            className="form-control m-auto"
            id="title"
            name="title"
            value={values.title}
            onChange={(e) => onChange(e)}
            style={{ width: "300px" }}
          />
        </div>
        <div class="mt-2">
          <label for="productBrand" class="form-label">
            Brand
          </label>
          <input
            type="text"
            className="form-control m-auto"
            id="brand"
            name="brand"
            value={values.brand}
            onChange={(e) => onChange(e)}
            style={{ width: "300px" }}
          />
        </div>
        <div class="mt-2">
          <label for="productCategory" class="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control m-auto"
            id="category"
            name="category"
            value={values.category}
            onChange={(e) => onChange(e)}
            style={{ width: "300px" }}
          />
        </div>
        <div class="mt-2">
          <label for="productDescription" class="form-label">
            Description
          </label>
          <textarea
            className="form-control m-auto"
            id="description"
            name="description"
            value={values.description}
            onChange={(e) => onChange(e)}
            style={{ width: "300px" }}
          />
        </div>
        <div class="mt-2">
          <label for="productPrice" class="form-label">
            Price €
          </label>
          <input
            type="number"
            className="form-control m-auto"
            id="price"
            name="price"
            value={values.price}
            onChange={(e) => onChange(e)}
            style={{ width: "100px" }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductForm;
