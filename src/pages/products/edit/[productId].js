import Layout from "@/components/Layout";
import ProductForm from "@/components/forms/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { productId } = router.query;
  useEffect(() => {
    if (!productId) {
      return;
    }
    axios.get("/api/products?id=" + productId).then((response) => {
      setProductInfo(response.data);
    });
  }, [productId]);
  return (
    <Layout>
      <h1>
        <b>Edit Product</b>
      </h1>
      <ProductForm {...productInfo} />
    </Layout>
  );
}
