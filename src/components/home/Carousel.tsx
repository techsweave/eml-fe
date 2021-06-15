import React from 'react';
import { Models } from 'utilities-techsweave';
import CarouselItem from '@components/home/CarouselItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination, Controller,
} from 'swiper';

SwiperCore.use([Navigation, Pagination, Controller]);
const Carousel = (prop: { product: Models.Tables.IProduct[] }) => {
  const { product } = prop;
  return (
    <Swiper
      id='main'
      tag="section"
      wrapperTag="ul"
      navigation
      spaceBetween={0}
      slidesPerView={1}
    >
      {product.map((products) => (
        <SwiperSlide
          id={products.id}
          tag="li"
          style={{ listStyle: 'none' }}
        >
          <CarouselItem
            product={products}
            key={products.id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Carousel;
