import Layout from "@/components/Layout";
import { useRouter } from "next/router";
const Products = () => {
  const router = useRouter();

  return (
    <Layout>
      <button
        onClick={() => {
          router.push("/products/new");
        }}
        className="btn-primary"
      >
        Add new product
      </button>
    </Layout>
  );
};

export default Products;
