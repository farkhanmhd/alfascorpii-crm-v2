import React from 'react';
import { Provider } from 'jotai';

const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
