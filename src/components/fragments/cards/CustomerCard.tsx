import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectOptions } from '@/types';
import { cn } from '@/lib/utils';
import MapItems from '@/utils/MapItems';

const DataItem = ({ label, value }: SelectOptions) => {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd
        className={cn('font-semibold capitalize', {
          'text-lg font-bold': label.toLowerCase() === 'nama',
        })}
      >
        {String(value).toLowerCase()}
      </dd>
    </div>
  );
};

type CustomerCardProps = {
  title: string;
  data: SelectOptions[];
};

const CustomerCard = ({ title, data }: CustomerCardProps) => {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          <MapItems
            of={data}
            render={(item, index) => (
              <DataItem key={index} label={item.label} value={item.value} />
            )}
          />
        </dl>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
