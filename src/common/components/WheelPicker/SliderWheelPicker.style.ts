import { styled } from '@wapl/ui';

export const WheelSliderContainer = styled.div`
  display: block;
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  height: 100%;
  overflow: visible;
  width: 100%;
`;

export const WheelShadowTop = styled.div`
  background: linear-gradient(to bottom, rgba(248, 249, 250, 0.9) 0%, rgba(248, 249, 250, 0.5) 100%);
  left: 0;
  height: calc(30% + 2px);
  width: 100%;
  position: relative;
  margin-top: -2px;
  z-index: 5;
`;

export const WheelShadowBottom = styled(WheelShadowTop)`
  background: linear-gradient(to bottom, rgba(248, 249, 250, 0.5) 0%, rgba(248, 249, 250, 0.9) 100%);
  margin-top: 2px;
  border-bottom: none;
`;

export const WheelInner = styled.div<{ align: 'center' | 'flex-start' | 'flex-end' }>`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => align};
  ${({ align }) => align === 'flex-start' && 'padding-left: 25px; border-radius: 0 8px 8px 0;'};
  ${({ align }) => align === 'flex-end' && 'padding-right: 25px; border-radius: 8px 0 0 8px'};
  box-sizing: border-box;
  perspective: 1000px;
  transform-style: preserve-3d;
  height: 40%;
  width: 100%;
  background: ${({ theme: { Color } }) => Color.Black[6]};
`;

export const WheelSlides = styled.div<{ width?: number | string }>`
  position: relative;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: 100%;
`;

export const WheelSlide = styled.div`
  align-items: center;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  ${({ theme: { Font } }) => Font.Text.l.Regular};
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: center;
`;

export const WheelLabel = styled.div`
  ${({ theme: { Font } }) => Font.Text.l.Regular};
  margin-top: 1px;
  margin-left: 5px;
`;
