import { NoResultContainer, NoResultTitle } from './NoResult.style';
import NotiIllust1 from '@common/assets/noti-blue.svg';
import NotiIllust2 from '@common/assets/noti-red.svg';

interface Props {
  type?: 'event' | 'search';
  subtitle?: string;
}

const NoResult = ({ type = 'event', subtitle }: Props) => {
  return (
    <NoResultContainer>
      {type === 'event' ? (
        <>
          <NotiIllust1 />
          <NoResultTitle>일정이 없습니다.</NoResultTitle>
        </>
      ) : (
        <>
          <NotiIllust2 />
          <NoResultTitle>‘{subtitle}’</NoResultTitle>
          <NoResultTitle>검색 결과가 없습니다.</NoResultTitle>
        </>
      )}
    </NoResultContainer>
  );
};

export default NoResult;
