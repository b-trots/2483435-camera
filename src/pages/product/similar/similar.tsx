import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../../../components/main/product-card/product-card';
import { useAppSelector } from '../../../hooks/hooks';
import { getSimilarCameras } from '../../../store/slices/cameras/cameras-selectors';
import { SliderButtons } from './slider-buttons/slider-buttons';
import { Navigation } from 'swiper/modules';
import css from './similar.module.css';
import { useRef } from 'react';
import { Swiper as SwiperCore } from 'swiper/types';
import {
  ExplanationWord,
  NameSpace,
  ServiceParam,
} from '../../../const/const';

export function Similar() {
  const similarCameras = useAppSelector(getSimilarCameras);
  const swiperRef = useRef<SwiperCore | null>(null);

  if (!similarCameras.length) {
    return null;
  }

  const slides = [];
  for (let i = 0; i < similarCameras.length; i += 3) {
    slides.push(similarCameras.slice(i, i + 3));
  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">{ExplanationWord.SimilarProducts}</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              <Swiper
                className={css.swiper}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                speed={ServiceParam.ChangeSlideSpeed}
                spaceBetween={ServiceParam.SimilarSlideBetween}
                modules={[Navigation]}
                loop={false}
              >
                {slides.map((group) => (
                  <SwiperSlide
                    className={css['swiper-slide']}
                    key={group[NameSpace.FirstElement].id}
                  >
                    {group.map((camera) => (
                      <ProductCard key={camera.id} camera={camera} isActive />
                    ))}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <SliderButtons swiperRef={swiperRef} slidesCount={slides.length} />
          </div>
        </div>
      </section>
    </div>
  );
}
