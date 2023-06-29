import { ContextMenu as WaplContextMenu, Icon } from '@wapl/ui';
import { memo } from 'react';
import { BodyWrapper, ContentWrapper, ItemWrapper, Selected } from '../common/styles/common.style';
import EventBar from '../header/EventBar';
import { ItemContent } from './ContextMenu.style';

interface Props {
  open: boolean;
  title: string;
  height?: number;
  selected: string;
  isColor?: boolean;
  items: { value: string; label: string }[];
  type: 'color' | 'selectAll' | 'notification';
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
  type,
  onClose,
  onClick,
}: Props) => {
  const IconComponent = ({ value }: { value?: string }) => {
    if (type === 'notification') return <></>;
    switch (value) {
      case 'selectAll':
        return <Icon.SelectLine width={18} height={18} className="mr-8 mt-2" />;
      case 'deSelectAll':
        return <Icon.UnselectLine width={18} height={18} className="mr-8 mt-2" />;
      default:
        return <Icon.CalendarDotFill color={value} width={20} height={20} />;
    }
  };

  const Component = memo(({ value, label }: { value?: string; label?: string }) => (
    <ItemContent isGap={type === 'color'}>
      <IconComponent value={value} />
      <span>{label}</span>
    </ItemContent>
  ));

  return (
    <WaplContextMenu open={open} onClose={onClose}>
      <EventBar title={title} leftSide={[{ action: 'close', onClick: onClose }]} />
      <BodyWrapper height={height}>
        <ContentWrapper style={{ padding: '0 18px', minHeight: height ? `${height}px` : '575px' }}>
          {items.map(({ value, label }: { value: string; label: string }) => (
            <ItemWrapper isColor={isColor} key={value} onClick={() => onClick(value)}>
              <Component value={value} label={label} />
              <Selected selected={value === selected} />
            </ItemWrapper>
          ))}
        </ContentWrapper>
      </BodyWrapper>
    </WaplContextMenu>
  );
};
