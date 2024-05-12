import React from "react";
import styles from "./styles.module.scss";
import MainSwiper from "./Swiper";
import Header from "./Header";
import Menu from "./Menu";
import Offers from "./Offers";
import User from "./User";
export default function Main() {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
}
