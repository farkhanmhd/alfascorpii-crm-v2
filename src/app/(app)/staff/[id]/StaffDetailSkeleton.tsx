import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const StaffDetailSkeleton = () => {
  return (
    <div className="h-full rounded-md bg-background p-6">
      <Button variant="ghost" className="mb-4" disabled>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="mt-6 grid gap-4">
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="text-center sm:text-left">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="mt-2 h-4 w-32" />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Separator className="my-2" />
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Separator className="my-2" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 lg:flex-row lg:justify-between">
            <Skeleton className="h-10 w-full lg:w-32" />
            <Skeleton className="h-10 w-full lg:w-32" />
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-36" />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="mt-auto">
            <Skeleton className="h-10 w-40" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StaffDetailSkeleton;
