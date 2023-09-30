import Layout from "@/components/Layout";
import Modal from "@/components/parts/product/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categoryInputData, setCategoryInputData] = useState({
    name: "",
    parentCategory: "",
    properties: [],
  });
  const [editedCategory, setEditedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const handleOnChange = (e) => {
    setCategoryInputData({
      ...categoryInputData,
      [e.target.name]: e.target.value,
    });
  };

  const [open, setOpen] = useState({ status: false, data: {} });

  const onOpenModal = (category) => {
    setOpen({ status: true, data: category });
  };
  const onCloseModal = () => setOpen({ status: false, data: {} });

  const getCatergoryData = async () => {
    try {
      let res = await axios.get("/api/categories");
      if (res) {
        console.log(res);
        setCategoryData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = (category) => {
    console.log(category);
    setEditedCategory(category);

    setCategoryInputData({
      name: category.name,
      parentCategory: category?.parent?._id || "",
      properties: category?.properties.map((p) => ({
        name: p.name,
        values: p.values.join(","),
      })),
    });
  };

  const deleteCategory = async () => {
    console.log("delete the product", open.data._id);
    try {
      let res = await axios.delete("/api/categories?id=" + open.data._id);
      if (res) {
        setCategoryData(res?.data?.result);
        onCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        name: categoryInputData.name,
        parent: categoryInputData.parentCategory,
        properties: categoryInputData.properties.map((p) => ({
          name: p.name,
          values: p.values.split(","),
        })),
      };
      let res;
      if (editedCategory) {
        data._id = editedCategory._id;
        res = await axios.put("/api/categories", data);
      } else {
        res = await axios.post("/api/categories", data);
      }
      if (res) {
        console.log(res?.data, "form data res");
        setCategoryData(res?.data?.result);
        setCategoryInputData({
          name: "",
          parentCategory: "",
          properties: [],
        });
        setEditedCategory(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function addProperty() {
    setCategoryInputData((prev) => {
      return {
        ...prev,
        properties: [...prev.properties, { name: "", values: "" }],
      };
    });
  }
  function handlePropertyNameChange(index, newName) {
    setCategoryInputData((prev) => {
      const properties = [...prev.properties];
      properties[index].name = newName;
      return {
        ...prev,
        properties,
      };
    });
  }
  function handlePropertyValuesChange(index, newValues) {
    setCategoryInputData((prev) => {
      const properties = [...prev.properties];
      properties[index].values = newValues;
      return {
        ...prev,
        properties,
      };
    });
  }
  function removeProperty(indexToRemove) {
    setCategoryInputData((prev) => {
      const properties = prev.properties.filter((p, i) => i !== indexToRemove);
      return {
        ...prev,
        properties,
      };
    });
  }

  useEffect(() => {
    getCatergoryData();
  }, []);

  return (
    <Layout>
      <h1>
        <b>
          {editedCategory
            ? `Edit category ${editedCategory.name}`
            : "Create new category"}
        </b>
      </h1>
      <label htmlFor="name"> Category Name </label>
      <form onSubmit={handleFormSubmit}>
        <div className="flex gap-1">
          <input
            type="text"
            name="name"
            className="m-0"
            value={categoryInputData.name}
            onChange={handleOnChange}
            required
          />
          <select
            name="parentCategory"
            className="m-0"
            onChange={handleOnChange}
            value={categoryInputData.parentCategory}
          >
            <option value="">No parent category</option>
            {categoryData.length > 0 &&
              categoryData.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {categoryInputData.properties.length > 0 &&
            categoryInputData.properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  className="m-0"
                  onChange={(ev) =>
                    handlePropertyNameChange(index, ev.target.value)
                  }
                  placeholder="property name (example: color)"
                />
                <input
                  type="text"
                  className="m-0"
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, ev.target.value)
                  }
                  value={property.values}
                  placeholder="values, comma separated"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryInputData({
                  name: "",
                  parentCategory: "",
                  properties: [],
                });
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>

      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent Category Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categoryData.length > 0 &&
              categoryData.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td
                    className={category?.parent?.name ? "" : "text-slate-400"}
                  >
                    {category?.parent?.name || "N/A"}
                  </td>
                  <td className="flex gap-1">
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-default flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      <span className="hidden sm:block">Edit</span>
                    </button>
                    <button
                      onClick={() => onOpenModal(category)}
                      className="btn-red m-0 flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>

                      <span className="hidden sm:block">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <div className="relative">
        {open.status && (
          <Modal
            closeModal={onCloseModal}
            deleteProduct={deleteCategory}
            productName={open.data?.name}
            isCategory={true}
          />
        )}
      </div>
    </Layout>
  );
};

export default Categories;
