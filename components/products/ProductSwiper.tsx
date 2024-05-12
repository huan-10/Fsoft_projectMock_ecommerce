import styles from "./styles.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useRef } from "react";
import { Autoplay } from "swiper/modules";
export default function ProductSwiper({ images }) {
  //if need can add a type annotation to variables to tell compiler that it
  const swiperRef = useRef(null);
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }, [swiperRef]);
  return (
    <div
      className={styles.swiper}
      onMouseEnter={() => {
        swiperRef.current.swiper.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
      }}
    >
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        modules={[Autoplay]}
        speed={500}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.url} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
