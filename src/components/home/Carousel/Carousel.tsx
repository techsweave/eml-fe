import React from 'react';
import { Models } from 'utilities-techsweave';
import CarouselItem from '@components/home/Carousel/CarouselItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination, Controller,
} from 'swiper';
import { Heading } from '@chakra-ui/react';

SwiperCore.use([Navigation, Pagination, Controller]);
const Carousel = (prop: { product: Models.Tables.IProduct[] }) => {
  const { product } = prop;
  return (
    <div>
      <Heading textAlign='center' m='5'>Offer products</Heading>
      <Swiper
        id='main'
        tag="section"
        wrapperTag="ul"
        navigation
        pagination={{ clickable: true }}
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
    </div>
  );
};
export default Carousel;