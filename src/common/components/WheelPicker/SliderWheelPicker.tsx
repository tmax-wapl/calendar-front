import { useState, useRef, useEffect } from 'react';
import { useKeenSlider, KeenSliderOptions, KeenSliderInstance } from 'keen-slider/react';
import {
  WheelSliderContainer,
  WheelShadowTop,
  WheelShadowBottom,
  WheelInner,
  WheelSlides,
  WheelSlide,
  WheelLabel,
} from './SliderWheelPicker.style';

interface Props {
  slides: string[];
  loop?: boolean;
  initIndex?: number;
  onChange?: (index: number) => void;
  align?: 'center' | 'flex-start' | 'flex-end';
  width: number | string;
  label?: string;
}

const SliderWheelPicker = ({
  slides,
  loop = false,
  initIndex = 0,
  onChange,
  align = 'center',
  width,
  label,
}: Props) => {
  const wheelSize = 8;
  const slideDegree = 360 / wheelSize;
  const slidesPerView = loop ? 8 : 1;
  const [sliderState, setSliderState] = useState(null);
  const size = useRef(0);
  const options = useRef({
    slides: {
      number: slides.length < 6 ? slides.length * 3 : slides.length,
      origin: loop ? 'center' : 'auto',
      perView: slidesPerView,
    },
    vertical: true,
    initial: initIndex || 0,
    loop,
    dragSpeed: (speed: number) => {
      const height = size.current;
      return speed * (height / ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) / slidesPerView);
    },
    created: (s: KeenSliderInstance) => {
      size.current = s.size;
    },
    updated: (s: KeenSliderInstance) => {
      size.current = s.size;
    },
    detailsChanged: (s: KeenSliderInstance) => {
      setSliderState(s.track.details);
    },
    animationEnded: (s: KeenSliderInstance) => {
      onChange?.(s.track.details.rel % slides.length);
    },
    rubberband: !loop,
    mode: 'free-snap',
  } as KeenSliderOptions);
  const [sliderRef, slider] = useKeenSlider(options.current);
  const [radius, setRadius] = useState(0);

  const slideValues = () => {
    if (!sliderState) return [];
    const offset = loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;
    return (slides.length < 6 ? slides.concat(slides, slides) : slides).map((value, index) => {
      const distance: number = (sliderState.slides[index].distance - offset) * slidesPerView;
      const rotate: number = Math.abs(distance) > wheelSize / 2 ? 180 : distance * (360 / wheelSize) * -1;
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };
      return { style, value };
    });
  };

  useEffect(() => {
    if (slider.current) setRadius(slider.current.size / 2);
  }, [slider]);

  return (
    <WheelSliderContainer ref={sliderRef}>
      <WheelShadowTop
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
      <WheelInner align={align}>
        <WheelSlides width={width}>
          {slideValues().map(({ style, value }, idx) => (
            <WheelSlide style={style} key={idx}>
              {value}
            </WheelSlide>
          ))}
        </WheelSlides>
        {label && (
          <WheelLabel
            style={{
              transform: `translateZ(${radius}px)`,
              WebkitTransform: `translateZ(${radius}px)`,
            }}
          >
            {label}
          </WheelLabel>
        )}
      </WheelInner>
      <WheelShadowBottom
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
    </WheelSliderContainer>
  );
};

export default SliderWheelPicker;
