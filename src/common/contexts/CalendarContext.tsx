import React, { createContext } from 'react';

export const CalendarContext = createContext({ mode: '' });

/**
 * @props mode : app의 모드 'full' | 'module'
 */
interface CalendarProviderProps {
  mode: string;
  children: React.ReactNode;
}

const CalendarProvider = ({ mode = 'full', children }: CalendarProviderProps) => {
  const providerValue = {
    mode,
  };
  return <CalendarContext.Provider value={providerValue}>{children}</CalendarContext.Provider>;
};

export default CalendarProvider;
