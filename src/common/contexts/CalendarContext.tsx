import React, { createContext } from 'react';

export const CalendarContext = createContext({ mode: '', userId: null });

/**
 * @props mode : app의 모드 'full' | 'module'
 * @todo : appId ... 등등 props로 정의 필요
 */
interface CalendarProviderProps {
  mode: string;
  userId: number;
  children: React.ReactNode;
}

const CalendarProvider = ({ mode = 'full', userId, children }: CalendarProviderProps) => {
  const providerValue = {
    mode,
    userId,
  };
  return <CalendarContext.Provider value={providerValue}>{children}</CalendarContext.Provider>;
};

export default CalendarProvider;
