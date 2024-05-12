import Layout from "@/components/admin/layout";
import Category from "@/models/Category";
import Product from "@/models/Product";
import db from "@/utils/db";
import React, { useState } from "react";
import styles from "../../../../styles/products.module.scss";
import ProductCard from "@/components/admin/products/productCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function All({ products }) {
  console.log(products);
  const [productList, setProductList] = useState(products);
  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`/api/product/${id}`);
      const updatedProducts = productList.filter(
        (product: any) => product._id !== id
      );
      setProductList(updatedProducts);
      setProductList(productList);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <div className={styles.header}>All Products</div>
      {products.map((product: any) => (
        <ProductCard
          product={product}
          key={product._id}
          onDelete={() => handleDelete(product._id)}
        />
      ))}
    </Layout>
  );
}
export async function getServerSideProps(ctx: any) {
  await db.connectDb();
  const products = await Product.find({})
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
