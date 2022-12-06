import React from 'react';
import { styled, Mui } from '@wapl/ui';

export const EventDateContainer = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  > :not(:first-of-type) {
    margin-left: 28px;
  }
`;

export const ItemTitleContainer = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
  > :last-child {
    margin-left: auto;
  }
`;

export const DateRangeContainer = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
`;

export const PickerContainer = styled.div`
  display: flex;
  position: relative;
  :first-of-type {
    margin-left: auto;
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  :hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

export const DatePickerWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  margin-top: 8px;
  padding: 16px;
  background: #fff;
  box-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
  border-radius: 12px;
`;

export const TimeWrapper = styled.div`
  display: flex;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  :hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

// for input
export const TimeInput = styled.input`
  display: flex;
  width: 15px;
  outline: none;
  border: none;
  background: transparent;
`;

export const TimePickerWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  margin-top: 8px;
  background: #fff;
`;

export const TextField = styled(Mui.TextField)`
  .MuiOutlinedInput-input {
    padding: 0;
    font-size: 13px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  // input[type="time"]::-webkit-calendar-picker-indicator {
  //   background: none;
  // }
}
`;
