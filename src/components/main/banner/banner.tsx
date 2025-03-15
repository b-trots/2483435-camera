import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import './banner.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { BannerItem } from './banner-item';
import {
  getAllProducts,
  getIsAllProductsLoad,
} from '../../../store/slices/products/products-selectors';
import { useAppSelector } from '../../../hooks/hooks';
import { ServiceParam } from '../../../const/const';
import { getRandomElements } from '../../../utils/utils';

export function Banner() {
  const allPproducts = Object.values(useAppSelector(getAllProducts));
  const bannerProducts = getRandomElements(
    allPproducts,
    ServiceParam.BannerItems
  );

  const isProductsLoaded = useAppSelector(getIsAllProductsLoad);
  return !isProductsLoaded ? null : (
    <div className="banner">
      <Swiper
        autoplay={{
          delay: ServiceParam.SwiperSlideTime,
          pauseOnMouseEnter: true,
        }}
        loop
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {bannerProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <BannerItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
