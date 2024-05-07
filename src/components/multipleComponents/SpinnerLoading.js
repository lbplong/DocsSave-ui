/** @format */

import { Spinner, Stack } from "@fluentui/react";
import React from "react";
import { WH_100 } from "../../constants/styles";

const spinnerStyles = {
  ...WH_100,
  circle: {
    width: 100,
    height: 100,
    borderWidth: 30,
  },
};

export default function SpinnerLoading() {
  return (
    <Stack grow={1}>
      <Spinner styles={spinnerStyles} />
    </Stack>
  );
}
