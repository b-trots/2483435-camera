import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './banner.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { BannerItem } from './banner-item';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { DefaultParam, ServiceParam } from '@/const/const';
import { useEffect } from 'react';
import {
  getIsPromoCamerasLoaded,
  getPromoCameras,
} from '@/store/slices/cameras/cameras-selectors';
import { fetchPromoAction } from '@/store/slices/cameras/cameras-actions';

export function Banner() {
  const dispatch = useAppDispatch();
  const promoCameras = useAppSelector(getPromoCameras);
  const isPromoCamerasLoaded = useAppSelector(getIsPromoCamerasLoaded);

  useEffect(() => {
    if (!isPromoCamerasLoaded) {
      dispatch(fetchPromoAction());
    }
  }, [dispatch, promoCameras, isPromoCamerasLoaded]);

  const isVoid =
    promoCameras.length === DefaultParam.ZeroValue || !isPromoCamerasLoaded;

  return isVoid ? null : (
    <div className="banner">
      <Swiper
        simulateTouch={false}
        speed={ServiceParam.ChangeSlideSpeed as number}
        autoplay={{
          delay: ServiceParam.SwiperSlideTime as number,
          pauseOnMouseEnter: true,
        }}
        loop
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {promoCameras.map((camera) => (
          <SwiperSlide key={camera.id}>
            <BannerItem camera={camera} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
