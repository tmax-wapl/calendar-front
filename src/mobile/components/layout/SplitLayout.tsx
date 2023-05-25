import Calendar from '../body/Calendar';
import SplitPane from 'react-split-pane';
import { useEffect, useRef, useState } from 'react';
import { reaction } from 'mobx';
import { styled } from '@wapl/ui';
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
  const {
    screen: {
      orientation: { angle },
    },
  } = window;
  const [isRotate, setIsRotate] = useState(angle === 90 || angle === 270);

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
    const { target } = event;

    if (bottomPanelHeight > halfHeight) {
      const isScroll = bottomRef.current?.scrollHeight > bottomRef.current?.clientHeight;
      if (isScroll) {
        const isListView = (target as Element).closest('.listView');
        if (isListView) return;
      }
      setHalfHeight();
      changeGridMonth();
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

  const changeGridMonth = () => {
    const { mainApi } = uiStore;
    mainApi?.changeView('dayGridMonth');
    uiStore.changeDateRange();
  };

  const changeSplitterView = () => {
    if (isRotate) {
      const { mainApi } = uiStore;
      if (mainApi.view.type === 'dayGridWeek') changeGridMonth();
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
    mainApi.setOption('dayMaxEvents', handleMaxEvents());
  };

  const smallEventView = () => {
    const { mainApi } = uiStore;
    mainApi.setOption('eventClassNames', 'small-event');
    mainApi.setOption('dayMaxEvents', 2);
    mainApi.updateSize();
  };

  const handleRotate = () => {
    const { screen } = window;
    const {
      orientation: { angle },
    } = screen;

    setTimeout(() => {
      // 비동기를 넣어 rotate 완료된 후 view포트를 가져온다.
      setInnerHeight(window.innerHeight);
      setIsRotate(angle === 90 || angle === 270);
    }, 100);
  };

  const handleMaxEvents = () => {
    if (600 <= innerHeight && innerHeight < 700) return 3;
    else if (innerHeight >= 700) return 4;
    else return 2;
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

  useEffect(() => {
    changeSplitterView();
  }, [isRotate]);

  useEffect(() => {
    window.addEventListener('orientationchange', handleRotate);
    return () => window.removeEventListener('orientationchange', handleRotate);
  }, []);

  return (
    <SplitPaneWrapper ref={swipeRef} {...swipeHandlers}>
      <SplitPane
        size={topPanelHeight}
        defaultSize={'100%'}
        split={isRotate ? 'vertical' : 'horizontal'}
        style={{ overflowY: isRotate ? 'scroll' : 'hidden' }}
      >
        <TopPanel height={topPanelHeight}>
          <Calendar />
        </TopPanel>
        <BottomPanel height={bottomPanelHeight}>
          <EventListView bottomElement={bottomRef} />
        </BottomPanel>
      </SplitPane>
    </SplitPaneWrapper>
  );
};

export default SplitLayout;

const TopPanel = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
`;

const BottomPanel = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;
