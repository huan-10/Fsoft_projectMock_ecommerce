import Empty from "@/components/cart/empty";
import Header from "@/components/cart/header";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/cart.module.scss";
import Product from "@/components/cart/product";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import PaymentMethods from "@/components/cart/paymentMethos";
import { saveCart } from "@/requests/user";
export default function cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  //-----------------------
  const [shippingFee, setShippingFee] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const shippingFeeTotal = selected
      .reduce((a, c) => a + Number(c.shipping), 0)
      .toFixed(2);
    const subTotal = selected
      .reduce((a, c) => a + c.price * c.qty, 0)
      .toFixed(2);
    const total = (Number(subTotal) + Number(shippingFeeTotal)).toFixed(2);

    setShippingFee(shippingFeeTotal);
    setSubTotal(subTotal);
    setTotal(total);
  }, [selected, shippingFee]);

  const saveCartToDbHandler = async () => {
    if (session) {
      await saveCart(selected);
      Router.push("/checkout");
    } else {
      signIn();
    }
  };
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product?._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subTotal={subTotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        {/* <ProductsSwiper products={women_swiper} /> */}
      </div>
    </>
  );
}
