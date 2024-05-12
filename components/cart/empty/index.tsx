import React from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import Link from "next/link";
export default function Empty() {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <img src="../../../images/empty.png" alt="" />
      <h1>Cart Is Empty</h1>
      {!session && (
        <button onClick={() => signIn()} className={styles.empty__btn}>
          SIGN IN / REGISTER
        </button>
      )}
      <Link legacyBehavior href="/browse">
        <a href="">
          <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
            SHOP NOW
          </button>
        </a>
      </Link>
    </div>
  );
}
