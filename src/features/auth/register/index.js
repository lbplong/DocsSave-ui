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
    justifyContent: "flex-start",
    margin: 40,
    paddingTop: 20,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-thumb": {
      background: LIGHT_THEME.palette.neutralSecondaryAlt,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: LIGHT_THEME.palette.neutralQuaternary,
      borderRadius: 10,
    },
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
    maxHeight: 640,
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

export default function Register() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmFailed, setConfirmFailed] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const _login = async data => {
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
  const _handleSubmit = async e => {
    e.preventDefault();
    const data = {
      username,
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
    };

    const registerResult = await AuthApi.authRegister(data);
    if (registerResult.isAxiosError) {
      window.alert(registerResult.response.data.message, {
        title: `Error Register!`,
        actionText: `Try Sign Up`,
      });
    } else {
      window.alert(registerResult.data.message, {
        title: `Successfully Register!`,
        actionText: `Continue login`,
        onAction: () => _login({ username, password }),
      });
    }
  };

  const _handleChangeUsername = e => {
    setUsername(e.target.value);
  };

  const _handleChangeFirstName = e => {
    setFirstName(e.target.value);
  };

  const _handleChangeLastName = e => {
    setLastName(e.target.value);
  };

  const _handleChangePassword = e => {
    setPassword(e.target.value);

    setConfirmFailed(
      confirmPassword !== e.target.value ? "Password not matching!" : ""
    );
  };

  const _handleChangeConfirmPassword = e => {
    setConfirmPassword(e.target.value);

    setConfirmFailed(
      password !== e.target.value ? "Password not matching!" : ""
    );
  };

  const _handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  return (
    <Stack styles={wrapLogin} horizontalAlign='center'>
      <Stack vertical horizontalAlign='center' styles={formStyle}>
        <Text variant='xLarge' styles={headerLoginForm}>
          Register
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
          <label className={classes.labelInput}>First Name</label>
          <input
            className={classes.loginInput}
            type='text'
            name='firstName'
            id='firstName'
            placeholder='Enter First Name'
            value={firstName}
            minLength={1}
            onChange={_handleChangeFirstName}
            required
          />
          <label className={classes.labelInput}>Last Name</label>
          <input
            className={classes.loginInput}
            type='text'
            name='lastName'
            id='lastName'
            placeholder='Enter Last Name'
            value={lastName}
            minLength={1}
            onChange={_handleChangeLastName}
            required
          />
          <label className={classes.labelInput}>Email</label>
          <input
            className={classes.loginInput}
            type='email'
            name='email'
            id='email'
            placeholder='Enter email'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$'
            value={email}
            minLength={6}
            onChange={_handleChangeEmail}
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
          <label className={classes.labelInput}>Confirm Password</label>
          {confirmFailed && (
            <Text style={{ color: "red" }} variant='small'>
              {confirmFailed}
            </Text>
          )}
          <input
            className={classes.loginInput}
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={confirmPassword}
            minLength={6}
            placeholder='Confirm Password'
            onChange={_handleChangeConfirmPassword}
            required
          />

          <Stack>
            <CustomButton primary type='submit' text='Sign Up' />
            <Link href='/login'>Already an account</Link>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
