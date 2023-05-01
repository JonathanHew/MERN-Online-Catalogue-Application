import React, { Fragment } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const DeleteProduct = ({
  products,
  index,
  setIndex,
  setProducts,
  setSuccess,
  setValues,
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

          let newIndex;
          if (index == 0) {
            newIndex = products.length - 2;
            setIndex(newIndex);
          } else {
            newIndex = index - 1;
            setIndex(newIndex);
          }

          setValues({
            id: products[newIndex].id,
            title: products[newIndex].title,
            description: products[newIndex].description,
            price: products[newIndex].price,
            brand: products[newIndex].brand,
            category: products[newIndex].category,
            thumbnail: products[newIndex].thumbnail,
          });
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        className="btn btn-danger"
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
