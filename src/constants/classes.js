/** @format */

import { makeStyles } from "@fluentui/react";

export const BREAK_POINT = {
  sm: `@media screen and (max-width: 320.5px)`,
  md: `@media screen and (min-width: 320.6px and max-width: 480.5px)`,
  lg: `@media screen and (min-width: 480.6px and max-width: 640.5px)`,
  xl: `@media screen and (min-width: 640.5px and max-width: 768.5px)`,
  xxl: `@media screen and (min-width: 768.5px and max-width: 1024.5px)`,
  xxxl: `@media screen and (min-width: 1024.5px)`,
};

export const useStyles = makeStyles({
  showMobile: {},
});
