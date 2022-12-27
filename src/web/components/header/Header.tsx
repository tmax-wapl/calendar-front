import React from 'react';
import CalendarHeader from './CalendarHeader';
import EventHeader from './EventHeader';
import { styled } from '@wapl/ui';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 20px 10px 16px;
  max-height: 62px;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <CalendarHeader />
      <EventHeader />
    </HeaderContainer>
  );
};

export default React.memo(Header);
