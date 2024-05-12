import React from "react";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
import { flashDealsArray } from "@/data/home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import FlashCard from "./Card";
import Countdown from "@/components/countdown";
export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          Flash Sale
          <MdFlashOn />
        </h1>
        <Countdown date={new Date(2024, 12, 30)} />
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals__swiper"
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
        <div className={styles.flashDeals__list}>
          {flashDealsArray.map((product, index) => (
            <SwiperSlide key={index} style={{ padding: "0 10px" }}>
              <FlashCard product={product} key={index} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
