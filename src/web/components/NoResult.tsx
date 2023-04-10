import { useTheme, Icon } from '@wapl/ui';
import { NoResultContainer, NoResultTitle } from './NoResult.style';

interface Props {
  type?: 'event' | 'search';
  subtitle?: string;
}

const NoResult = ({ type = 'event', subtitle }: Props) => {
  const { Color } = useTheme();

  return (
    <NoResultContainer>
      {type === 'event' ? (
        <>
          <Icon.ErrorLine color={Color.Gray[600]} width={20} height={20} />
          <NoResultTitle>일정이 없습니다.</NoResultTitle>
        </>
      ) : (
        <>
          <Icon.ErrorLine color={Color.Gray[600]} width={20} height={20} />
          <NoResultTitle>‘{subtitle}’</NoResultTitle>
          <NoResultTitle>검색 결과가 없습니다.</NoResultTitle>
        </>
      )}
    </NoResultContainer>
  );
};

export default NoResult;
