import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const SearchProduct = ({ setProducts, setIndex, setValues }) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5005/categories");
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onSearch = async (e) => {
    try {
      const res = await axios.get("http://localhost:5005/products", {
        params: {
          search: search,
          category: selectedCategory,
        },
      });
      setProducts(res.data);
      setIndex(0);
      setValues({
        id: res.data[0].id,
        title: res.data[0].title,
        description: res.data[0].description,
        price: res.data[0].price,
        brand: res.data[0].brand,
        category: res.data[0].category,
        thumbnail: res.data[0].thumbnail,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => onSearch(e)}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchProduct;
