// SOURCE: https://medium.com/@kevinfelisilda/click-outside-element-event-using-react-hooks-2c540814b661 (08/10/2023)

import { useEffect } from "react";

export const useOutsideClick = (callback: () => void, ref: any) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
