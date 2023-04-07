import Calendar from '../body/Calendar';
import SplitPane from 'react-split-pane';
import { useRef, useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useSwipeable, SwipeEventData } from 'react-swipeable';
import '@/styles/split.css';
import { toDateTime } from '@/utils';

const SplitLayout = () => {
  const { uiStore } = useCalendarStores();
  const [topPanelHeight, setTopPanelHeight] = useState<number>();
  const [bottomPanelHeight, setBottomPanelHeight] = useState<number>(0);
  const { innerHeight } = window;
  const LayoutHeight = innerHeight - 46; // TODO: Header Height
  const halfHeight = LayoutHeight / 2;

  const setHalfHeight = () => {
    setTopPanelHeight(halfHeight);
    setBottomPanelHeight(halfHeight);
  };

  const getRow = () => {
    const { mainApi } = uiStore;
    const activeStart = toDateTime(mainApi.view.activeStart);
    const { days } = uiStore.dateDay.diff(activeStart, 'days');
    return Math.floor(days / 7) + 1;
  };

  const handleSwipe = (eventData: SwipeEventData) => {
    const { dir } = eventData;
    const { mainApi } = uiStore;
    if (dir === 'Up') {
      if (bottomPanelHeight === 0) {
        setHalfHeight();
        mainApi.setOption('eventClassNames', 'small-event');
        mainApi.updateSize();
      } else {
        setTopPanelHeight(LayoutHeight * 0.11);
        setBottomPanelHeight(LayoutHeight * 0.89);
        mainApi.updateSize();
        uiStore.setToggleViewRow(getRow());
      }
    } else {
      if (bottomPanelHeight > halfHeight) {
        setHalfHeight();
        uiStore.setToggleViewRow();
      } else {
        setTopPanelHeight(LayoutHeight);
        setBottomPanelHeight(0);
        mainApi.setOption('eventClassNames', '');
      }
    }
  };

  const wrapperRef = useRef<HTMLDivElement>();

  const swipeRef = (el: HTMLDivElement) => {
    swipeHandlers.ref(el);
    wrapperRef.current = el;
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: handleSwipe,
    onSwipedDown: handleSwipe,
  });

  return (
    <div ref={swipeRef} {...swipeHandlers}>
      <SplitPane split="horizontal" size={topPanelHeight} defaultSize={'100%'} allowResize>
        <div style={{ width: '100%', height: topPanelHeight }}>
          <Calendar />
        </div>
        <div style={{ height: bottomPanelHeight, background: '#F8F9FA' }}>Panel 2 영역</div>
      </SplitPane>
    </div>
  );
};

export default SplitLayout;
