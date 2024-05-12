import React, { useEffect, useState } from "react";
import styles from "../styles/checkout.module.scss";
import { getSession } from "next-auth/react";
import User from "@/models/User";
import db from "@/utils/db";
import Cart from "@/models/Cart";
import Shipping from "@/components/checkout/shipping";
import Products from "@/components/checkout/products";
import Header from "@/components/cart/header";
import Payment from "@/components/checkout/payment";
import Summary from "@/components/checkout/summary";
export default function Checkout({ cart, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  useEffect(() => {
    // if (!addresses) return;
    let check = addresses?.find((ad: any) => ad.active === true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress("");
    }
  }, [addresses]);
  console.log("address:", addresses);

  //   console.log("selected address:", selectedAddress);
  return (
    <>
      <Header />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping
            addresses={addresses}
            setAddresses={setAddresses}
            user={user}
          />
          <Products cart={cart} />
        </div>

        <div className={styles.checkout__side}>
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  const session = await getSession(context);
  //   console.log("user:", user);
  //   console.log("session", session);
  const user = await User.findById(session.user.id);
  const cart = await Cart.findOne({ user: user._id });
  console.log("cart:", cart);
  db.disconnectDb();
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
