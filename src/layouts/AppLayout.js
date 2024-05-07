/** @format */

import React from "react";
import { makeStyles, Stack } from "@fluentui/react";

const useStyles = makeStyles({
  wrapperContent: {
    width: "100%",
    height: "calc(100% - 60px)",
    overflow: "hidden",
    marginTop: 60,
  },
  contentBody: {
    height: "100%",
    width: "100%",
    maxWidth: 1440,
    margin: "auto",
  },
});

export default function AppLayout(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Stack className={classes.wrapperContent}>
        <Stack className={classes.contentBody}>{children}</Stack>
      </Stack>
    </div>
  );
}
