import React from "react";
import { Fragment, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import ProductForm from "../Components/ProductForm";
axios.defaults.withCredentials = true;

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState(0);
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
  }, [index]);

  return loading ? (
    <Fragment>
      <h1>Loading...</h1>
    </Fragment>
  ) : (
    <Fragment>
      <div className="container">
        <div className="card mt-5">
          <div className="card-body">
            <h1 className="text-center">Product Catalogue Application</h1>
            <ProductForm
              products={products}
              index={index}
              values={values}
              setValues={setValues}
              setIndex={setIndex}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
