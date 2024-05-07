/** @format */

import { Link, makeStyles, Stack, Text } from "@fluentui/react";
import React, { useState } from "react";
import CustomButton from "../../../components/CustomButton";
import { LIGHT_THEME } from "../../../constants";
import AuthApi from "../../../API/ModuleAPI/AuthApi";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  formStyle: {
    width: "100%",
    height: "calc(100% - 80px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 40,
  },
  loginInput: {
    marginBottom: 20,
    fontSize: 14,
    padding: 10,
  },
  labelInput: {
    fontSize: 20,
  },
  buttonSubmit: {
    backgroundColor: LIGHT_THEME.palette.themePrimary,
    color: LIGHT_THEME.palette.white,
    border: "none",
    width: "fit-content",
  },
}));

const wrapLogin = {
  root: {
    width: "100vw",
    height: "100vh",
    background: `linear-gradient(135deg, ${LIGHT_THEME.palette.topaz} 0%, ${LIGHT_THEME.palette.yellowLight} 100%)`,
    display: "flex",
    justifyContent: "center",
  },
};

const formStyle = {
  root: {
    backgroundColor: LIGHT_THEME.palette.white,
    width: "90%",
    maxWidth: 380,
    minWidth: 280,
    maxheight: 640,
    minHeight: 400,
    borderRadius: 30,
    paddingLeft: 40,
    paddingRight: 40,
  },
};

const headerLoginForm = {
  root: {
    width: "100%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 32,
    fontFamily: "auto",
    borderBottom: `2px solid ${LIGHT_THEME.palette.neutralPrimary}`,
  },
};

export default function Login() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const _handleSubmit = async e => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    console.log(data);
    const loginResult = await AuthApi.authLogin(data);
    if (loginResult.isAxiosError) {
      window.alert(loginResult.response.data.message, {
        title: `Error Login!`,
        actionText: `Try Login`,
      });
    } else {
      localStorage.setItem("token", loginResult.data.token);
      navigate("/");
    }
  };

  const _handleChangeUsername = e => {
    setUsername(e.target.value);
  };

  const _handleChangePassword = e => {
    setPassword(e.target.value);
  };

  return (
    <Stack styles={wrapLogin} horizontalAlign='center'>
      <Stack vertical horizontalAlign='center' styles={formStyle}>
        <Text variant='xLarge' styles={headerLoginForm}>
          Login
        </Text>
        <form onSubmit={_handleSubmit} className={classes.formStyle}>
          <label className={classes.labelInput}>Username</label>
          <input
            className={classes.loginInput}
            type='text'
            name='username'
            id='username'
            placeholder='Enter Username'
            value={username}
            minLength={6}
            onChange={_handleChangeUsername}
            required
          />
          <label className={classes.labelInput}>Password</label>
          <input
            className={classes.loginInput}
            type='password'
            name='password'
            id='password'
            placeholder='Enter Password'
            value={password}
            minLength={6}
            onChange={_handleChangePassword}
            required
          />
          <Stack>
            <CustomButton primary type='submit' text='Log in' />
            <Link href='/register'>Create an account</Link>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
