import React from 'react';

import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scrollarea';
import { SidebarNav } from './components/sidebar-nav';

export const metadata: Metadata = {
  title: 'Customer',
};

const sidebarNavItems = [
  {
    title: 'Customer Data',
    href: '/customers/1',
  },
  {
    title: 'Motorcycle',
    href: '/customers/1/motorcycle',
  },
  {
    title: 'Deals',
    href: '/customers/1/deals',
  },
  {
    title: 'Follow Up',
    href: '/customers/1/follow-up',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="grid max-h-[calc(100dvh-48px)] flex-1 grid-rows-[auto_auto_1fr] gap-y-6 pb-6 lg:px-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customer</h2>
        <p className="hidden text-muted-foreground sm:block">
          Efficiently organize and oversee all aspects of customer information,
          including personal details, contact information, purchase history, and
          communication preferences, to ensure seamless customer relationship
          management and improve service quality.
        </p>
      </div>

      <Separator />

      <div className="flex flex-1 flex-col space-y-8 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;

//  {/* <div className="hidden">
//         <Image
//           src="/examples/forms-light.png"
//           width={1280}
//           height={791}
//           alt="Forms"
//           className="block dark:hidden"
//         />
//         <Image
//           src="/examples/forms-dark.png"
//           width={1280}
//           height={791}
//           alt="Forms"
//           className="hidden dark:block"
//         />
//       </div> */}
