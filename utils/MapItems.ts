import { Children, ReactNode } from 'react';

interface MapItemsProps<T> {
  of: T[]; // Array of items to map
  render: (item: T, index: number) => ReactNode; // Render function
}

const MapItems = <T>({ of, render }: MapItemsProps<T>): ReactNode[] => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default MapItems;
