import Layout from "@/components/Layout";
import ProductForm from "@/components/forms/ProductForm";

const NewProduct = () => {
  return (
    <Layout>
      <h1>
        <b>Add Product</b>
      </h1>
      <ProductForm />
    </Layout>
  );
};
export default NewProduct;
