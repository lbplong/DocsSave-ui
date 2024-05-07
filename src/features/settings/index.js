/** @format */

import { Stack, Text, FontWeights, Pivot, PivotItem } from "@fluentui/react";
import React from "react";
import { LIGHT_THEME } from "../../constants";
import { BREAKPOINTS_RESPONSIVE } from "../../constants/SVGTheme";
import SettingProfile from "./Components/SettingProfile";
import SettingSecurity from "./Components/SettingSecurity";

const settingWrapperStyle = {
  root: {
    maxWidth: 720,
    width: "100%",
    height: "100%",
    margin: "auto",
  },
};

const stackControlStyles = {
  root: {
    paddingTop: 26,
    paddingBottom: 26,
  },
};

const pageTitleStyles = {
  root: {
    fontWeight: FontWeights.bold,
  },
};

const pivotSettingStyles = {
  root: {
    marginBottom: 29,
    borderBottom: `1px solid ${LIGHT_THEME.palette.neutralQuaternaryAlt}`,
    [BREAKPOINTS_RESPONSIVE.mdDown]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  linkIsSelected: {
    borderTop: `3px solid ${LIGHT_THEME.palette.themePrimary}`,
    color: `${LIGHT_THEME.palette.black}`,
    borderRadius: `0 !important`,
  },
  link: {
    marginRight: 8,
    minWidth: 100,
    [BREAKPOINTS_RESPONSIVE.mdDown]: {
      width: "50%",
    },
  },
};

export default function Setting() {
  return (
    <Stack styles={settingWrapperStyle}>
      <Stack
        horizontal
        horizontalAlign='space-between'
        tokens={{ childrenGap: 8 }}
        styles={stackControlStyles}>
        <Text variant='xLarge' styles={pageTitleStyles}>
          Settings
        </Text>
      </Stack>
      <Pivot aria-label='Basic Pivot Example' styles={pivotSettingStyles}>
        <PivotItem headerText='Profile'>
          <SettingProfile />
        </PivotItem>
        <PivotItem headerText='Security'>
          <SettingSecurity />
        </PivotItem>
      </Pivot>
    </Stack>
  );
}
