import ListItem from "./ListItem";
import styles from "./styles.module.scss";

export default function List({ coupons, setCoupons }) {
  return (
    <ul className={styles.list}>
      {coupons.map((coupon: any) => (
        <ListItem coupon={coupon} key={coupon._id} setCoupons={setCoupons} />
      ))}
    </ul>
  );
}
