import React, { Fragment, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const AddProduct = ({products, setProducts}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onClose = () => {
    setValues({
      id: "",
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      thumbnail: "",
    });
    setError("");
    setSuccess("");
  };

  const onCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (!values.id || !values.title || !values.description || !values.price || !values.brand || !values.category || !values.thumbnail) {
        setError("Please fill out all fields!");
        throw new Error("Please fill out all fields!");
      }

      await axios
        .post("http://localhost:5005/products/", values)
        .then((res) => {
          console.log(res.data);
          setProducts(products.concat(res.data));
          setSuccess(`New Product Added with ID: ${res.data.id}`);
        });
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    }
  };

  return (
    <Fragment>
      <button
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        New
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add a New Product!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  onClose();
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="id" className="form-label">
                    Product ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="id"
                    name="id"
                    value={values.id}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={(e) => onChange(e)}
                    required
                  />

                  <label for="brand" className="form-label">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    name="brand"
                    value={values.brand}
                    onChange={(e) => onChange(e)}
                    required
                  />

                  <label for="category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={values.category}
                    onChange={(e) => onChange(e)}
                    required
                  />

                  <label for="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control m-auto"
                    id="description"
                    name="description"
                    required=""
                    value={values.description}
                    onChange={(e) => onChange(e)}
                  />

                  <label for="price" className="form-label">
                    Price €
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <label for="thumbnail" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="thumbnail"
                    name="thumbnail"
                    value={values.thumbnail}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div style={{ color: "green" }}>{success}</div>
                <div style={{ color: "red" }}>{error}</div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => onClose()}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                onClick={(e) => onCreate(e)}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddProduct;
