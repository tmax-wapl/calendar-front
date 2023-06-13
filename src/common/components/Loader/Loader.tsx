import { Icon, styled } from '@wapl/ui';
import SeoulLoadingIcon from '@common/assets/Seoul_Loading.svg';

export const Loader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Container>
      <Wrapper>
        <Icon.CalendarColor width={80} height={80} />
        <SeoulLoadingIcon />
      </Wrapper>
      {children}
    </Container>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme: { Color } }) => Color.Gray[700]};
`;
