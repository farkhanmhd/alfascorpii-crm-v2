import { RefObject, useEffect } from 'react';

const useClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        refs.some(
          (ref) => ref.current && ref.current.contains(event.target as Node)
        )
      ) {
        return;
      }
      handleOnClickOutside(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handleOnClickOutside]);
};

export default useClickOutside;
