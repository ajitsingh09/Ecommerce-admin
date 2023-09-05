import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get("/api/products");
      if (res?.data) {
        setProducts(res.data);
      }
    };
    getData();
  }, []);

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

      <table>
        <thead>
          <tr>
            <td>Products Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>
                  <button className="btn-primary">click me</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
