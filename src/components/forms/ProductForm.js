import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({ _id, name, description, price }) {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState({
    name: name || "",
    description: description || "",
    price: price || "",
  });

  const handleOnChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    try {
      let res = await axios.post("/api/products", productDetails);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const editProduct = async () => {
    try {
      let res = await axios.put("/api/products", { ...productDetails, _id });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("data sending...", productDetails);
    let resp = null;
    if (_id) {
      //update product...
      resp = await editProduct();
    } else {
      //add product...
      resp = await addProduct();
    }
    if (resp?.data) {
      router.push("/products");
    }
  };

  return (
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
  );
}
