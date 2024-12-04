import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const RecentSales = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="hidden text-sm text-muted-foreground sm:block">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto text-sm font-medium sm:text-base">
          +$1,999.00
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="hidden text-sm text-muted-foreground sm:block">
            jackson.lee@email.com
          </p>
        </div>
        <div className="ml-auto text-sm font-medium sm:text-base">+$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="hidden text-sm text-muted-foreground sm:block">
            isabella.nguyen@email.com
          </p>
        </div>
        <div className="ml-auto text-sm font-medium sm:text-base">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="hidden text-sm text-muted-foreground sm:block">
            will@email.com
          </p>
        </div>
        <div className="ml-auto text-sm font-medium sm:text-base">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="hidden text-sm text-muted-foreground sm:block">
            sofia.davis@email.com
          </p>
        </div>
        <div className="ml-auto text-sm font-medium sm:text-base">+$39.00</div>
      </div>
    </div>
  );
};

export default RecentSales;
