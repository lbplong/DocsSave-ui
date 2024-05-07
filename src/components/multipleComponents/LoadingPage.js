/** @format */

import { Image, ImageFit, ProgressIndicator, Stack } from "@fluentui/react";
import React from "react";

const progressStyles = {
  root: {
    width: 120,
  },
  progressBar: {
    background: "#f79f1a",
  },
};

export default function LoadingPage() {
  return (
    <Stack
      verticalAlign='center'
      horizontalAlign='center'
      tokens={{ childrenGap: 16 }}
      styles={{ root: { height: "100vh" } }}>
      <Image
        imageFit={ImageFit.contain}
        src='/img/loading-logo.png'
        alt='Logo'
        width={300}
        height={200}
      />
      <ProgressIndicator
        styles={progressStyles}
        label=''
        description=''
        barHeight={2}
      />
    </Stack>
  );
}
