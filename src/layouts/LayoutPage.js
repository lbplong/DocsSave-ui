/** @format */

import { Stack } from "@fluentui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PAGE_PATHS } from "../constants";
import ViewFile from "../features/view";
import CheckIn from "../security/CheckIn";
import HomeLayout from "./HomeLayout";

export default function LayoutPage() {
  console.log('hello');
  return (
    <Stack>
      <CheckIn>
        <Stack styles={{ root: { width: "100vw", height: "100vh" } }}>
          <Routes>
            <Route
              path={`/${PAGE_PATHS.VIEW_FILE}/:id`}
              element={<ViewFile />}
            />
            <Route path='*' element={<HomeLayout />} />
          </Routes>
        </Stack>
      </CheckIn>
    </Stack>
  );
}
