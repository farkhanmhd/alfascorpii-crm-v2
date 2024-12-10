'use client';

import React from 'react';
import db from '@/db';
import Dashboard from './dashboard';

const Page = () => {
  return (
    <div className="flex-1">
      <Dashboard />
    </div>
  );
};

export default Page;
