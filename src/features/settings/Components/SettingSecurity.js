/** @format */

import { makeStyles, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import React from "react";
import { useState } from "react";
import AuthApi from "../../../API/ModuleAPI/AuthApi";
import CustomButton from "../../../components/CustomButton";
import { success } from "../../../components/ToastMessage";
import { LIGHT_THEME } from "../../../constants";

const settingProfileStyles = {
  root: {
    padding: 15,
    width: "100%",
  },
};

const useStyles = makeStyles(() => ({
  formStyle: {
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

export default function SettingSecurity() {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckedPassword, setIsCheckedPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const _handleSubmitOldPassword = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      password,
    };

    const checkPassword = await AuthApi.checkPassword(data);
    if (checkPassword.isAxiosError) {
      window.alert(checkPassword.response.data.message, {
        title: "Your old password is wrong!",
      });
    } else {
      setToken(checkPassword.data.token);
      success("Correct password");
      setIsCheckedPassword(true);
    }
    setIsSubmitting(false);
  };

  const _handleChangeOldPassword = e => {
    setPassword(e.target.value);
  };

  const _handleSubmitNewPassword = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      token,
      newPassword,
      confirmPassword,
    };
    const changePassword = await AuthApi.changePassword(data);

    if (changePassword.isAxiosError) {
      window.alert(changePassword.response.data.message, {
        title: "Change password failed",
      });
    } else {
      success("Change password successfully");
      setIsSubmitting(false);
    }
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsCheckedPassword(false);
  };

  const _handleChangeNewPassword = e => {
    setNewPassword(e.target.value);
  };

  const _handleChangeConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };

  if (isCheckedPassword) {
    return (
      <Stack styles={settingProfileStyles}>
        <form onSubmit={_handleSubmitNewPassword} className={classes.formStyle}>
          <label className={classes.labelInput}>Your New Password</label>
          <input
            className={classes.loginInput}
            type='password'
            name='newPassword'
            id='newPassword'
            placeholder='Enter your new password'
            minLength={6}
            value={newPassword}
            onChange={_handleChangeNewPassword}
            required
          />
          <label className={classes.labelInput}>Confirm New Password</label>
          <input
            className={classes.loginInput}
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Enter confirm password'
            minLength={6}
            value={confirmPassword}
            onChange={_handleChangeConfirmPassword}
            required
          />
          <Stack
            horizontal
            horizontalAlign='center'
            tokens={{ childrenGap: 13 }}>
            {isSubmitting && <Spinner size={SpinnerSize.medium} />}
            <CustomButton
              primary
              type='submit'
              text='Change Password'
              disabled={
                newPassword === "" ||
                newPassword !== confirmPassword ||
                isSubmitting
              }
            />
          </Stack>
        </form>
      </Stack>
    );
  }

  return (
    <Stack styles={settingProfileStyles}>
      <form onSubmit={_handleSubmitOldPassword} className={classes.formStyle}>
        <label className={classes.labelInput}>Your Odl Password</label>
        <input
          className={classes.loginInput}
          type='password'
          name='password'
          id='password'
          placeholder='Enter your old password'
          minLength={6}
          value={password}
          onChange={_handleChangeOldPassword}
          required
        />
        <Stack horizontal horizontalAlign='center' tokens={{ childrenGap: 13 }}>
          {isSubmitting && <Spinner size={SpinnerSize.medium} />}
          <CustomButton
            primary
            type='submit'
            text='Reset Password'
            disabled={password === "" || isSubmitting}
          />
        </Stack>
      </form>
    </Stack>
  );
}
