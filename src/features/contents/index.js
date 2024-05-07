/** @format */

import { Nav, Stack } from "@fluentui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { LIGHT_THEME, NAV_GROUPS } from "../../constants";
import Favorites from "../favorites";
import MyShare from "../myShare";
import ShareWithMe from "../shareWithMe";
import ContentArea from "./Components/ContentArea";

const navStyles = {
  root: {
    width: 300,
    height: `100%`,
    borderRight: `2px solid ${LIGHT_THEME.palette.themeDark}`,
  },
};

const contentArea = {
  root: {
    width: "calc(100% - 300px)",
    height: "100%",
  },
};

export default function Contents() {
  return (
    <Stack horizontal styles={{ root: { height: "100%" } }}>
      <Nav styles={navStyles} groups={[{ links: NAV_GROUPS }]} />
      <Stack styles={contentArea}>
        <Routes>
          <Route exact path='/' element={<ContentArea />} />
          <Route path='/my-folder' element={<ContentArea />} />
          <Route path='/share-with-me' element={<ShareWithMe />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/my-share' element={<MyShare />} />
        </Routes>
      </Stack>
    </Stack>
  );
}
