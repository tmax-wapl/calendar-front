import { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { InfiniteScrollLoopWrapper, LoopContents } from './InfiniteScrollLoop.style';

interface Props {
  itemHeight: number;
  visibleHeight: number;
  itemCount: number;
  surroundingBackup?: number;
  scrollTopValue?: string;
  onValueChange?: (index: number) => void;
}

const InfiniteScrollLoop = ({
  itemHeight,
  visibleHeight,
  itemCount,
  surroundingBackup = 1,
  scrollTopValue,
  onValueChange,
  children,
}: React.PropsWithChildren<Props>) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const backupHeight = contentHeight * surroundingBackup;
  const visibleCount = visibleHeight / itemHeight;
  let isScrolling: any = null;

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    if (scrollTop < backupHeight || scrollTop >= backupHeight + contentHeight) {
      scrollRef.current.scrollTop = backupHeight + (scrollTop % contentHeight);
    }
    if (onValueChange) {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        onValueChange(
          Math.floor(((scrollRef.current.scrollTop + (visibleCount * itemHeight) / 2) / itemHeight) % itemCount),
        );
      }, 200);
    }
  }, [contentHeight, backupHeight]);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    setContentHeight(contentRef.current.offsetHeight);
    const currendElement = Array.from(contentRef.current.querySelectorAll('div')).find(
      el => el.textContent === scrollTopValue,
    );
    const scrollTop = currendElement?.offsetTop;
    scrollRef.current.scrollTop =
      scrollTop - Math.floor(visibleCount / 2) * itemHeight || contentRef.current.offsetHeight * surroundingBackup;
  }, [surroundingBackup, itemCount]);

  return (
    <InfiniteScrollLoopWrapper>
      <LoopContents ref={scrollRef} height={visibleHeight} onScroll={handleScroll}>
        {[...Array(surroundingBackup)].map((_, index) => (
          <div key={index}>{children}</div>
        ))}
        <div ref={contentRef}>{children}</div>
        {[...Array(surroundingBackup)].map((_, index) => (
          <div key={index}>{children}</div>
        ))}
      </LoopContents>
    </InfiniteScrollLoopWrapper>
  );
};

export default InfiniteScrollLoop;
// export default React.memo(InfiniteScrollLoop, (prev, next) => prev.visibleHeight === next.visibleHeight);
