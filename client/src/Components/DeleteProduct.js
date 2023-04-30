import React, { Fragment } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const DeleteProduct = ({
  products,
  index,
  setIndex,
  setProducts,
  setSuccess,
}) => {
  const onDelete = async (e) => {
    setSuccess("");
    e.preventDefault();
    const productId = products[index].id;
    try {
      await axios
        .delete(`http://localhost:5005/products/${productId}`)
        .then((res) => {
          console.log(res.data.deletedProduct.id);
          setProducts((products) =>
            products.filter(
              (product) => product.id !== res.data.deletedProduct.id
            )
          );
          if (index == 0) {
            const newIndex = products.length - 2;
            setIndex(newIndex);
            console.log(newIndex);
          } else {
            const newIndex = index - 1;
            setIndex(newIndex);
          }
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          onDelete(e);
        }}
      >
        Delete
      </button>
    </Fragment>
  );
};

export default DeleteProduct;
