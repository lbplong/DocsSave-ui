/** @format */

import "./GlobalStyles/GlobalStyle.css";
import { Component } from "react";
import { initializeIcons } from "@fluentui/react";

import { registerIcons } from "@fluentui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./features/ErrorPage";
import LayoutPage from "./layouts/LayoutPage";
import { initializeFileTypeIcons } from "@uifabric/file-type-icons";
import { SGV_REGISTER } from "./constants/SVGTheme";
import AlertDialog from "./components/AlertDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import Login from "./features/auth/login";
import Register from "./features/auth/register";

class App extends Component {
  constructor(props) {
    super(props);
    initializeIcons();
    initializeFileTypeIcons();
    registerIcons(SGV_REGISTER);
    window.confirm = ConfirmDialog;
    window.alert = AlertDialog;
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/internal-error' element={<ErrorPage />} />
          <Route path='*' element={<LayoutPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
