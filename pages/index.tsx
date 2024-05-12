import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import db from "@/utils/db";
import Product from "@/models/Product";
import ProductCard from "@/components/products";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function home({ country, products }) {
  // console.log("products", products);
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.products}>
            {products.map((product: any) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let data = await axios
    .get("https://api.ipregistry.co/?key=5pkrc8g2c4pib5mi")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log({ data });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: {
        name: "Viet Nam",
        flag: "https://cdn-icons-png.flaticon.com/128/197/197473.png?w=360",
      },
    },
  };
}
