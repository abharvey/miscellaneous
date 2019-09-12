import { MutableRefObject, useEffect } from "react";

function useOutsideClick<T extends HTMLElement>(
    ref: MutableRefObject<T>,
        onClick: (e: MouseEvent) => void
        ) {
          useEffect(() => {
              const handleClick = (e: MouseEvent) => {
                    if (ref && ref.current && !ref.current.contains(e.target as any)) {
                            onClick(e);
                                  }
                                      };
                                          window.addEventListener("click", handleClick);
                                              return () => {
                                                    window.removeEventListener("click", handleClick);
                                                        };
                                                          }, []);
                                                          }

                                                          export { useOutsideClick };
