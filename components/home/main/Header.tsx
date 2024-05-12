import Link from "next/link";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link legacyBehavior href="/browse">
            Store
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="">
            Watches
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/about">
            About
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
