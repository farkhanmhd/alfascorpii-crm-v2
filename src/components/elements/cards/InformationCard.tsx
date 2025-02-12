import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectOptions } from '@/types';
import MapItems from '@/utils/MapItems';
import { cn } from '@/lib/utils';

const DataItem = ({ label, value }: SelectOptions) => {
  return (
    <div>
      <dt className="font-semibold">{label}</dt>
      <dd
        className={cn('capitalize', {
          lowercase: label === 'Email',
        })}
      >
        {String(value).toLowerCase()}
      </dd>
    </div>
  );
};

type InformationCardProps = {
  title: string;
  data: SelectOptions[];
};

const InformationCard = ({ title, data }: InformationCardProps) => {
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
              <DataItem
                key={index}
                label={item.label}
                value={
                  item.value !== undefined && item.value !== null
                    ? item.value
                    : '-'
                }
              />
            )}
          />
        </dl>
      </CardContent>
    </Card>
  );
};

export default InformationCard;
