"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "../parts/product/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({ _id, name, description, price, images }) {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState({
    name: name || "",
    description: description || "",
    price: price || "",
    images: images || [],
  });
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleOnChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleUploadImages = async (e) => {
    console.log("files", e.target.files);
    setUploadingImages(true);
    try {
      let files = e.target.files;
      if (files.length > 0) {
        const data = new FormData();
        for (let file of files) {
          data.append("file", file);
        }

        const res = await axios.post("/api/upload", data);
        if (res?.data) {
          console.log(res?.data);
          setProductDetails({
            ...productDetails,
            images: [...productDetails.images, ...res.data.links],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setUploadingImages(false);
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

  const changeImageOrder = (images) => {
    setProductDetails({
      ...productDetails,
      images: [...images],
    });
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
      <label htmlFor="images">Images:</label>

      <div className="flex flex-row flex-wrap mt-1 gap-2">
        <div className="relative w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>

          <div>Add image</div>
          <input
            type="file"
            onChange={handleUploadImages}
            className="opacity-0 top-0 absolute w-24 h-24 z-20 "
          />
        </div>
        {productDetails.images.length > 0 ? (
          <ReactSortable
            list={productDetails.images}
            className="flex flex-wrap flex-row gap-1"
            setList={changeImageOrder}
          >
            {productDetails.images.map((img) => {
              return (
                <div className="w-24 h-24" key={img}>
                  <img
                    className="w-full h-full bg-slate-300 "
                    src={img}
                    alt={img}
                  />
                </div>
              );
            })}
          </ReactSortable>
        ) : (
          <div className="relative w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-slate-300 shadow-sm border border-primary">
            No images uploaded
          </div>
        )}
        {uploadingImages && (
          <div className="relative w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm">
            <Spinner />
          </div>
        )}
      </div>
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
