import React from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import styles from "./styles.module.scss";

interface Detail {
  name: string;
  value: string;
}

interface DetailsProps {
  details: Detail[];
  product: {
    details: Detail[];
  };
  setProduct: React.Dispatch<
    React.SetStateAction<{
      details: Detail[];
    }>
  >;
}

const Details: React.FC<DetailsProps> = ({ details, product, setProduct }) => {
  const handleDetails = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...details];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, details: values });
  };

  const handleRemove = (i: number) => {
    if (details.length > 0) {
      const values = [...details];
      values.splice(i, 1);
      setProduct({ ...product, details: values });
    }
  };

  return (
    <div>
      <div className={styles.header}>Details</div>
      {details.length === 0 && (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              details: [
                ...details,
                {
                  name: "",
                  value: "",
                },
              ],
            });
          }}
        />
      )}
      {details.map((detail, i) => (
        <div className={styles.clicktoadd} key={i}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={detail.name}
            onChange={(e) => handleDetails(i, e)}
          />
          <input
            type="text"
            name="value"
            placeholder="Value"
            value={detail.value}
            onChange={(e) => handleDetails(i, e)}
          />
          <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
          <BsFillPatchPlusFill
            onClick={() => {
              setProduct({
                ...product,
                details: [
                  ...details,
                  {
                    name: "",
                    value: "",
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Details;
