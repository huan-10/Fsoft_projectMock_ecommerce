import styles from "./styles.module.scss";

export default function Checkout({
  subTotal,
  shippingFee,
  total,
  selected,
  saveCartToDbHandler,
}) {
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h2>Order Summary</h2>
      <div className={styles.cart__checkout_line}>
        <span>Subtotal</span>
        <span>
          US <strong>${subTotal}</strong>
        </span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Shipping</span>
        <span>
          + <strong>${shippingFee}</strong>
        </span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Total</span>
        <span>US ${total}</span>
      </div>
      <div className={styles.submit}>
        <button
          disabled={selected.length == 0}
          style={{
            background: `${selected.length == 0 ? "#eee" : ""}`,
            cursor: `${selected.length == 0 ? "not-allowed" : ""}`,
          }}
          onClick={() => saveCartToDbHandler()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
