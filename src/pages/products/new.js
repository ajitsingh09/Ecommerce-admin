import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

const NewProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleOnChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("data sending...", productDetails);
    // let res=await axios.post("/api/add-products",productDetails)
  };

  return (
    <Layout>
      <h1>
        <b>Add Product</b>
      </h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="title">Product Name:</label>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={handleOnChange}
          placeholder="Product Name"
        />
        <label htmlFor="description">Product Description:</label>
        <textarea
          type="text"
          name="description"
          value={productDetails.description}
          onChange={handleOnChange}
          placeholder="Description"
        />
        <label htmlFor="price">Product Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Product price"
          value={productDetails.price}
          onChange={handleOnChange}
        />
        <button type="submit" className="btn-primary w-28">
          Save
        </button>
      </form>
    </Layout>
  );
};
export default NewProduct;
