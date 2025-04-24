import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '@/components/main/product-card/product-card';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  getCurrentCameraId,
  getIsSimilarCamerasLoaded,
  getSimilarCameras,
} from '@/store/slices/cameras/cameras-selectors';
import { SliderButtons } from './slider-buttons/slider-buttons';
import { Navigation } from 'swiper/modules';
import css from './similar.module.css';
import { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperCore } from 'swiper/types';
import {
  DefaultParam,
  ExplanationWord,
  NameSpace,
  ServiceParam,
} from '@/const/const';
import { fetchSimilarAction } from '@/store/slices/cameras/cameras-actions';

export function Similar() {
  const dispatch = useAppDispatch();
  const currentCameraId = useAppSelector(getCurrentCameraId);
  const similarCameras = useAppSelector(getSimilarCameras);
  const isSimilarCamerasLoaded = useAppSelector(getIsSimilarCamerasLoaded);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(
    DefaultParam.ZeroIndex
  );

  useEffect(() => {
    if (!isSimilarCamerasLoaded && currentCameraId) {
      dispatch(fetchSimilarAction(currentCameraId));
    }
  });

  if (!similarCameras.length) {
    return null;
  }

  const slides = [];
  for (let i = 0; i < similarCameras.length; i += ServiceParam.CardsPerSlide) {
    slides.push(
      similarCameras.slice(i, i + Number(ServiceParam.CardsPerSlide))
    );
  }

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveSlide(swiper.activeIndex);
  };

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
                onSlideChange={handleSlideChange}
                speed={ServiceParam.ChangeSlideSpeed as number}
                spaceBetween={ServiceParam.SimilarSlideBetween}
                modules={[Navigation]}
                simulateTouch={false}
                loop={false}
              >
                {slides.map((group, slideIndex) => (
                  <SwiperSlide
                    className={css['swiper-slide']}
                    key={group[NameSpace.FirstElement].id}
                  >
                    {group.map((camera) => (
                      <ProductCard
                        key={camera.id}
                        camera={camera}
                        isActive={slideIndex === activeSlide}
                      />
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
