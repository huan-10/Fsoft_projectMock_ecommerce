import React from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
export default function ProductCard({ product, onDelete }) {
  const handleDelete = (index: any) => {
    onDelete(index);
  };
  return (
    <div className={styles.product}>
      <h1 className={styles.product__name}>{product.name}</h1>
      <h2 className={styles.product__category}>#{product.category.name}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        style={{ padding: "5px 0 5px 5px" }}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {product.subProducts.map((p, i) => (
          <SwiperSlide>
            <div className={styles.product__item}>
              <div className={styles.product__item_img}>
                <img src={p.images[0].url} alt="" />
              </div>
              <div className={styles.product__actions}>
                <Link
                  legacyBehavior
                  href={`/admin/dashboard/product/${product._id}`}
                >
                  <TbEdit />
                </Link>
                <Link
                  legacyBehavior
                  href={`/product/${product.slug}?style=${i}`}
                >
                  <AiOutlineEye />
                </Link>
                {/* <Link
                  legacyBehavior
                  href=""
                  onClick={() => handleDelete(i)}
                  style={{ cursor: "pointer" }}
                >
                  <RiDeleteBin2Line />
                </Link> */}
                <button onClick={() => handleDelete(i)}>
                  <RiDeleteBin2Line />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
