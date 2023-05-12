import Calendar from '../body/Calendar';
import SplitPane from 'react-split-pane';
import { useEffect, useRef, useState } from 'react';
import { reaction } from 'mobx';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useSwipeable, SwipeEventData } from 'react-swipeable';
import '@/styles/split.css';
import EventListView from '@/mobile/components/EventListView';
import { SplitPaneWrapper } from './SplitLayout.style';

const SplitLayout = () => {
  const { uiStore } = useCalendarStores();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [topPanelHeight, setTopPanelHeight] = useState<number>();
  const [bottomPanelHeight, setBottomPanelHeight] = useState<number>(0);

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const LayoutHeight = innerHeight - (56 + 48);
  const halfHeight = LayoutHeight / 2;
  const isRotate = LayoutHeight < 360;

  const wrapperRef = useRef<HTMLDivElement>();

  const swipeRef = (el: HTMLDivElement) => {
    swipeHandlers.ref(el);
    wrapperRef.current = el;
  };

  const handleSwipe = (eventData: SwipeEventData) => {
    const { dir } = eventData;
    if (isRotate) return;
    dir === 'Up' ? handleSwipeUp() : handleSwipeDown(eventData);
  };

  const handleSwipeUp = () => {
    const { mainApi } = uiStore;

    if (bottomPanelHeight === 0) {
      setHalfHeight();
      smallEventView();
    } else {
      if (bottomPanelHeight > halfHeight) return;
      else {
        setTopPanelHeight(LayoutHeight * 0.11);
        setBottomPanelHeight(LayoutHeight * 0.89);
        mainApi?.changeView('dayGridWeek', uiStore.dateDay.toJSDate());
        mainApi.updateSize();
      }
    }
  };

  const handleSwipeDown = (eventData: SwipeEventData) => {
    const { event } = eventData;
    const { mainApi } = uiStore;
    const { target } = event;

    if (bottomPanelHeight > halfHeight) {
      const isScroll = bottomRef.current?.scrollHeight > bottomRef.current?.clientHeight;
      if (isScroll) {
        const isListView = (target as Element).closest('.listView');
        if (isListView) return;
      }
      setHalfHeight();
      mainApi?.changeView('dayGridMonth');
      uiStore.changeDateRange();
    } else initialView();
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: handleSwipe,
    onSwipedDown: handleSwipe,
  });

  const setHalfHeight = () => {
    setTopPanelHeight(halfHeight);
    setBottomPanelHeight(halfHeight);
  };

  const changeDateClickView = () => {
    setHalfHeight();
    smallEventView();
  };

  const changeSplitterView = () => {
    if (innerHeight <= 360 && isRotate) {
      const LayoutHeight = window.innerWidth / 2;
      setTopPanelHeight(LayoutHeight);
      setBottomPanelHeight(LayoutHeight);
      smallEventView();
    } else initialView();
  };

  const initialView = () => {
    const { mainApi } = uiStore;
    setTopPanelHeight(LayoutHeight);
    setBottomPanelHeight(0);
    mainApi.setOption('eventClassNames', '');
    mainApi.setOption('dayMaxEvents', 4);
  };

  const smallEventView = () => {
    const { mainApi } = uiStore;
    mainApi.setOption('eventClassNames', 'small-event');
    mainApi.setOption('dayMaxEvents', 2);
    mainApi.updateSize();
  };

  useEffect(() => {
    const dispose = reaction(
      () => uiStore.dateDay,
      (_, previousDateDay) => {
        if (previousDateDay) {
          const bottom = bottomRef.current?.clientHeight ?? 0; // 매우 간헐적으로 undefined 값 반환 예외처리
          const bottomHeader = 56;
          if (bottom + bottomHeader < halfHeight) changeDateClickView();
        }
      },
    );
    return () => dispose();
  }, []);

  const handleRotate = () => {
    setTimeout(() => {
      setInnerHeight(window.innerHeight); // 비동기를 넣어 rotate 완료된 후 view포트를 가져온다.
    }, 100);
  };

  useEffect(() => {
    changeSplitterView();
  }, [innerHeight]);

  useEffect(() => {
    window.addEventListener('orientationchange', handleRotate);
    return () => window.removeEventListener('orientationchange', handleRotate);
  }, []);

  return (
    <SplitPaneWrapper ref={swipeRef} {...swipeHandlers}>
      <SplitPane
        size={topPanelHeight}
        defaultSize={'100%'}
        allowResize
        split={isRotate ? 'vertical' : 'horizontal'}
        style={{ overflowY: isRotate ? 'scroll' : 'hidden' }}
      >
        <div style={{ width: '100%', height: topPanelHeight }}>
          <Calendar />
        </div>
        <div style={{ height: bottomPanelHeight }}>
          <EventListView bottomElement={bottomRef} />
        </div>
      </SplitPane>
    </SplitPaneWrapper>
  );
};

export default SplitLayout;
