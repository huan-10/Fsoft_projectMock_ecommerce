import React from "react";
import styles from "./styles.module.scss";
import Ad from "./Ad";
import Top from "./Top";
import Main from "./Main";
// import { Main } from "next/document";
export default function Header({ country }) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={country} />
      <Main />
    </header>
  );
}
