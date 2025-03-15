import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import './banner.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { BannerItem } from './banner-item';
import {
  getIsPromoProductsLoaded,
  getPromoProducts,
} from '../../../store/slices/products/products-selectors';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { DefaultParam, ServiceParam } from '../../../const/const';
import { useEffect } from 'react';
import { fetchPromoAction } from '../../../store/api-actions/api-actions';

export function Banner() {
  const dispatch = useAppDispatch();
  const promoProducts = useAppSelector(getPromoProducts);
  const isPromoProductLoaded = useAppSelector(getIsPromoProductsLoaded);

  useEffect(() => {
    if (!isPromoProductLoaded) {
      dispatch(fetchPromoAction());
    }
  }, [dispatch, promoProducts, isPromoProductLoaded]);

  const isVoid =
    promoProducts.length === DefaultParam.ZeroValue || !isPromoProductLoaded;

  return isVoid ? null : (
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
        {promoProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <BannerItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
