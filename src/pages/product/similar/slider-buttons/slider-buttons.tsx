import { BemMode, NameSpace, ServiceParam } from '@/const/const';
import { SliderButtonName } from '@/const/const-button';
import { SliderButton, SliderButtonBem } from './slider-button';
import { Swiper as SwiperCore } from 'swiper/types';
import { useState } from 'react';

interface SliderButtonsProps {
  swiperRef: React.MutableRefObject<SwiperCore | null>;
  slidesCount: number;
}

export function SliderButtons({ swiperRef, slidesCount }: SliderButtonsProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(
    Number(NameSpace.FirstPage)
  );

  const handlePrevClick = () => {
    if (swiperRef.current && currentSlideIndex > NameSpace.FirstPage) {
      swiperRef.current.slidePrev();
      setCurrentSlideIndex((prev) => prev - ServiceParam.PaginationStep);
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current && currentSlideIndex < slidesCount) {
      swiperRef.current.slideNext();
      setCurrentSlideIndex(
        (prev) => prev + Number(ServiceParam.PaginationStep)
      );
    }
  };

  const buttonsConfig = [
    {
      bemMode: BemMode.Prev,
      text: SliderButtonName.Prev,
      disabled: currentSlideIndex === NameSpace.FirstPage,
      onClick: handlePrevClick,
    },
    {
      bemMode: BemMode.Next,
      text: SliderButtonName.Next,
      disabled: currentSlideIndex === slidesCount,
      onClick: handleNextClick,
    },
  ];

  return (
    <>
      {buttonsConfig.map(({ bemMode, text, onClick, disabled }) => (
        <SliderButton
          key={bemMode}
          bemMode={bemMode as SliderButtonBem}
          text={text}
          onClick={onClick}
          disabled={disabled}
        />
      ))}
    </>
  );
}
