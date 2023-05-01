import React from "react";
import { Fragment, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import AddProduct from "../Components/AddProduct";
import DeleteProduct from "../Components/DeleteProduct";
import EditProduct from "../Components/EditProduct";
import SearchProduct from "../Components/SearchProduct";
import ProductNavigation from "../Components/ProductNavigation";
axios.defaults.withCredentials = true;

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState("");
  const [values, setValues] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  useEffect(() => {
    (async () => {
      await axios.get("http://localhost:5005/products/").then((res) => {
        setProducts(res.data);
        setValues({
          id: res.data[index].id,
          title: res.data[index].title,
          description: res.data[index].description,
          price: res.data[index].price,
          brand: res.data[index].brand,
          category: res.data[index].category,
          thumbnail: res.data[index].thumbnail,
        });
      });
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <Fragment>
      <h1>Loading...</h1>
    </Fragment>
  ) : (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Product App</h1>

      <div class="d-flex justify-content-center mb-1">
        <SearchProduct
          setProducts={setProducts}
          setIndex={setIndex}
          setValues={setValues}
          setResponse={setResponse}
        />
        <AddProduct products={products} setProducts={setProducts} />
      </div>
      <div className="text-center mb-4" style={{color: "grey"}}>{response}</div>

      {products.length === 0 ? (
        <div className="alert alert-info mt-4 text-center" role="alert">
          No products available.
        </div>
      ) : (
        <div>
          <div className="card mb-4">
            <img
              src={products[index].thumbnail}
              alt={products[index].title}
              className="card-img-top"
              style={{ height: "400px", borderRadius: "4px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{products[index].title}</h5>
              <p className="card-text">{products[index].description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">ID: {products[index].id}</li>
              <li className="list-group-item">
                Brand: {products[index].brand}
              </li>
              <li className="list-group-item">
                Category: {products[index].category}
              </li>
              <li className="list-group-item">
                Price: €{products[index].price}
              </li>
            </ul>
            <div className="card-body d-flex justify-content-between">
              <EditProduct
                index={index}
                products={products}
                setProducts={setProducts}
                setNewValues={setValues}
              />
              <DeleteProduct
                products={products}
                index={index}
                setSuccess={setSuccess}
                setProducts={setProducts}
                setIndex={setIndex}
                setValues={setValues}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <ProductNavigation
              products={products}
              index={index}
              setValues={setValues}
              setIndex={setIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
