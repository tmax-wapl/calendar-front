import { Wrapper, NoResultTitle } from './NoResult.style';
// import noResult from '@common/assets/C_Illust.svg';

const NoResult = () => {
  return (
    <Wrapper>
      {/* <img src={noResult} /> */}
      <div style={{ width: 100, height: 100, background: 'blue' }} />
      <NoResultTitle>일정이 없습니다.</NoResultTitle>
    </Wrapper>
  );
};

export default NoResult;
