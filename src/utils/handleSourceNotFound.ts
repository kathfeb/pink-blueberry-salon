/**
 * @description Utils for handle source not found example
 */

import { RefObject } from "react";

export const HandleSourceNotFound =
  (ref: RefObject<HTMLImageElement> | any, defaultSource: string) =>
  (): void => {
    try {
      ref.current.src = defaultSource;
    } catch (error) {
      console.error("Not found resource: ", error);
    }
  };
