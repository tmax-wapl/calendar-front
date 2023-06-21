import React from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import { StyledSwiperSlide } from './SwiperWheelPicker.style';

interface Props {
  visibleHeight: number;
  slides: string[];
  slidesPerView: number;
  selectedIndex: number;
  surroundingBackup?: number;
  onValueChange?: (index: number) => void;
  loop?: boolean;
}

const SwiperWheelPicker = ({
  visibleHeight,
  slides,
  slidesPerView,
  selectedIndex,
  surroundingBackup,
  onValueChange,
  loop,
}: Props) => {
  return (
    <Swiper
      style={{ width: '100%', height: visibleHeight }}
      slidesPerView={slidesPerView}
      loop={loop}
      direction={'vertical'}
      initialSlide={selectedIndex}
      centeredSlides={true}
      onSlideChangeTransitionEnd={swiper => {
        if (swiper.realIndex % slides.length === selectedIndex) return;
        onValueChange?.(swiper.realIndex % slides.length);
      }}
    >
      {[...Array(surroundingBackup ?? 0)].map((_, index) => (
        <React.Fragment key={index}>
          {slides.map(slide => (
            <StyledSwiperSlide key={index + slide}>{slide}</StyledSwiperSlide>
          ))}
        </React.Fragment>
      ))}
      {slides.map(slide => (
        <StyledSwiperSlide key={slide}>{slide}</StyledSwiperSlide>
      ))}
      {[...Array(surroundingBackup ?? 0)].map((_, index) => (
        <React.Fragment key={surroundingBackup + index}>
          {slides.map(slide => (
            <StyledSwiperSlide key={surroundingBackup + index + slide}>{slide}</StyledSwiperSlide>
          ))}
        </React.Fragment>
      ))}
    </Swiper>
  );
};

export default SwiperWheelPicker;
