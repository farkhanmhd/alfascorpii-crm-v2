import { Children, ReactNode } from 'react';

const MapItems = <T>({
  of,
  render,
}: {
  of: T[];
  render: (item: T, index: number) => ReactNode;
}): ReactNode[] => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default MapItems;
