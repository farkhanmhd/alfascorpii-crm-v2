import React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import FollowUpList from './FollowUpList';

type Params = Promise<{ id: string | number }>;

const FollowUpPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-y-3">
      <div>
        <h3 className="text-lg font-medium">Follow Up</h3>
      </div>

      <Separator />

      <div className="grid grid-rows-[1fr_auto] gap-y-8">
        <FollowUpList />
        <Link
          href="/follow-up/new"
          className={cn('w-fit justify-self-end', buttonVariants())}
        >
          Tambah Follow Up
        </Link>
      </div>
    </div>
  );
};

export default FollowUpPage;
