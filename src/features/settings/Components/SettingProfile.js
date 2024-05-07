/** @format */

import { makeStyles, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import AccountApi from "../../../API/ModuleAPI/AccountApi";
import CustomButton from "../../../components/CustomButton";
import { success } from "../../../components/ToastMessage";
import { LIGHT_THEME } from "../../../constants";
import domainEvents from "../../../constants/domainEvent";
import eventBus from "../../../constants/utilService/eventBus";

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

export default function SettingProfile() {
  const classes = useStyles();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountInfo, setAccountInfo] = useState(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const _handleChangeFistName = e => {
    setFirstName(e.target.value);
  };

  const _handleChangeLastName = e => {
    setLastName(e.target.value);
  };

  const _handleSubmit = async e => {
    setIsSubmitting(true);
    e.preventDefault();
    const data = {
      firstName,
      lastName,
    };

    const changeName = await AccountApi.changeAccountInfo(data);

    if (changeName.isAxiosError) {
      window.alert(changeName.response.data.message, {
        title: "Error change account",
      });
    } else {
      success("Change account info successfully");
      _getAccountInfo();
    }
    setIsSubmitting(false);
  };

  const _getAccountInfo = async () => {
    const accountResult = await AccountApi.getAccountInfo();

    if (accountResult.isAxiosError) {
      window.alert(accountResult.response.data.message);
    } else {
      setAccountInfo(accountResult.data);
      eventBus.publish(domainEvents.CHANGE_ACCOUNT_NAME_DOMAINEVENT);
    }
  };

  useEffect(() => {
    _getAccountInfo();
  }, []);

  useEffect(() => {
    if (accountInfo !== undefined) {
      setFirstName(accountInfo?.firstName);
      setLastName(accountInfo?.lastName);
    }
  }, [accountInfo]);

  return (
    <Stack styles={settingProfileStyles}>
      <form onSubmit={_handleSubmit} className={classes.formStyle}>
        <label className={classes.labelInput}>First Name</label>
        <input
          className={classes.loginInput}
          type='text'
          name='firstName'
          id='firstName'
          placeholder='Enter First Name'
          value={firstName}
          onChange={_handleChangeFistName}
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
          onChange={_handleChangeLastName}
          required
        />
        <label className={classes.labelInput}>Email</label>
        <input
          className={classes.loginInput}
          type='text'
          name='email'
          id='email'
          placeholder='Enter email'
          value={accountInfo?.email}
          readOnly
        />
        <Stack horizontal horizontalAlign='center' tokens={{ childrenGap: 13 }}>
          {isSubmitting && <Spinner size={SpinnerSize.medium} />}
          <CustomButton
            primary
            type='submit'
            text='Change'
            disabled={
              (firstName === accountInfo?.firstName &&
                lastName === accountInfo?.lastName) ||
              isSubmitting
            }
          />
        </Stack>
      </form>
    </Stack>
  );
}
