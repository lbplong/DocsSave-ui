/** @format */

import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { PAGE_PATHS } from "../constants";
import Contents from "../features/contents";
import DashBoard from "../features/dashboard";
import DataRoom from "../features/dataroom";
import Profile from "../features/profile";
import Search from "../features/search";
import AllFileSearch from "../features/search/AllFileSearch";
import Setting from "../features/settings";
import AppLayout from "./AppLayout";
import Header from "./components/Header";

export default class HomeLayout extends Component {
  render() {
    return (
      <>
        <Header />
        <AppLayout>
          <Routes>
            <Route path={`/${PAGE_PATHS.PROFILE}`} element={<Profile />} />
            <Route path={`/${PAGE_PATHS.SEARCH}`} element={<Search />} />
            <Route
              path={`/${PAGE_PATHS.SEARCH_ALL}/:fileType`}
              element={<AllFileSearch />}
            />
            <Route path={`/${PAGE_PATHS.SETTING}`} element={<Setting />} />
            <Route path={`/${PAGE_PATHS.DATAROOM}`} element={<DataRoom />} />
            <Route path={`/${PAGE_PATHS.DASHBOARD}`} element={<DashBoard />} />
            <Route path={`/${PAGE_PATHS.CONTENT}/*`} element={<Contents />} />
            <Route path='*' element={<Contents />} />
          </Routes>
        </AppLayout>
      </>
    );
  }
}
