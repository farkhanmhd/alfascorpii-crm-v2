import React from 'react';
import { Provider } from 'jotai';

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default GlobalProvider;
