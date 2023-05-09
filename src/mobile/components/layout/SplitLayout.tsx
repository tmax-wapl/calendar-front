import Calendar from '../body/Calendar';
import SplitPane from 'react-split-pane';
import { useEffect, useRef, useState } from 'react';
import { reaction } from 'mobx';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useSwipeable, SwipeEventData } from 'react-swipeable';
import '@/styles/split.css';
import { toDateTime } from '@/utils';
import EventListView from '@/mobile/components/EventListView';
import { SplitPaneWrapper } from './SplitLayout.style';

const SplitLayout = () => {
  const { uiStore } = useCalendarStores();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [topPanelHeight, setTopPanelHeight] = useState<number>();
  const [bottomPanelHeight, setBottomPanelHeight] = useState<number>(0);
  const { innerHeight } = window;
  const LayoutHeight = innerHeight - (56 + 48);
  const halfHeight = LayoutHeight / 2;

  const setHalfHeight = () => {
    setTopPanelHeight(halfHeight);
    setBottomPanelHeight(halfHeight);
  };

  const handleSwipe = (eventData: SwipeEventData) => {
    const { dir } = eventData;
    dir === 'Up' ? handleSwipeUp() : handleSwipeDown(eventData);
  };

  const handleSwipeUp = () => {
    const { mainApi } = uiStore;

    if (bottomPanelHeight === 0) {
      setHalfHeight();
      mainApi.setOption('eventClassNames', 'small-event');
      mainApi?.setOption('dayMaxEvents', 2);
      mainApi.updateSize();
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
    } else {
      setTopPanelHeight(LayoutHeight);
      setBottomPanelHeight(0);
      mainApi.setOption('eventClassNames', '');
      mainApi?.setOption('dayMaxEvents', 4);
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

  const changeDateClickView = () => {
    const { mainApi } = uiStore;
    setHalfHeight();
    mainApi.setOption('eventClassNames', 'small-event');
    mainApi?.setOption('dayMaxEvents', 2);
    mainApi.updateSize();
  };

  useEffect(() => {
    const dispose = reaction(
      () => uiStore.dateDay,
      (_, previousDateDay) => {
        if (previousDateDay) {
          const bottom = bottomRef.current?.clientHeight;
          const bottomHeader = 56;
          if (bottom + bottomHeader < halfHeight) changeDateClickView();
        }
      },
    );
    return () => dispose();
  }, []);

  return (
    <SplitPaneWrapper ref={swipeRef} {...swipeHandlers}>
      <SplitPane split="horizontal" size={topPanelHeight} defaultSize={'100%'} allowResize>
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
