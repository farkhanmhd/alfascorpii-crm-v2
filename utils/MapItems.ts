import { Children, ReactNode } from 'react';

const MapItems =({
  of,
  render,
}): ReactNode[] => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default MapItems;

