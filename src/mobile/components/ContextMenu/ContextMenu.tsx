import { ContextMenu as WaplContextMenu } from '@wapl/ui';
import { BodyWrapper, ContentWrapper, ItemWrapper, Selected } from '../common/styles/common.style';
import EventBar from '../header/EventBar';

interface Props {
  open: boolean;
  title: string;
  height?: number;
  selected: string;
  isColor?: boolean;
  items: { value: string; label: string }[];
  Component: ({ color, label }: { color?: string; label?: string }) => JSX.Element;
  onClose: () => void;
  onClick: (value: string) => void;
}

export const ContextMenu = ({
  open,
  title,
  height,
  selected = '',
  isColor = false,
  items,
  Component,
  onClose,
  onClick,
}: Props) => {
  return (
    <WaplContextMenu open={open} onClose={onClose}>
      <EventBar title={title} leftSide={[{ action: 'close', onClick: onClose }]} />
      <BodyWrapper height={height}>
        <ContentWrapper style={{ padding: '0 18px', minHeight: height ? `${height}px` : '575px' }}>
          {items.map(({ value, label }: { value: string; label: string }) => (
            <ItemWrapper isColor={isColor} key={value} onClick={() => onClick(value)}>
              <Component color={value as string} label={label} />
              <Selected selected={value === selected} />
            </ItemWrapper>
          ))}
        </ContentWrapper>
      </BodyWrapper>
    </WaplContextMenu>
  );
};
