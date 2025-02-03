import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const DealDetailSkeleton = () => {
  return (
    <div className="mx-auto p-6">
      <header className="mb-6">
        <Skeleton className="h-9 w-64" />
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="mb-1 h-4 w-24" />
                  <Skeleton className="h-6 w-40" />
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="mb-1 h-4 w-32" />
                  <Skeleton className="h-6 w-48" />
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 md:grid-cols-2">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="mb-1 h-4 w-32" />
                  <Skeleton className="h-6 w-48" />
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end space-x-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};

export default DealDetailSkeleton;
