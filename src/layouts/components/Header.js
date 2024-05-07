/** @format */

import {
  makeStyles,
  Stack,
  Link,
  Image,
  ImageFit,
  IconButton,
  SearchBox,
  Persona,
  PersonaSize,
  ContextualMenu,
} from "@fluentui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountApi from "../../API/ModuleAPI/AccountApi";
import CustomModal from "../../components/modals";
import { LIGHT_THEME, MODEL_NAME, PAGE_PATHS } from "../../constants";
import domainEvents from "../../constants/domainEvent";
import eventBus from "../../constants/utilService/eventBus";
import MenuLink from "./MenuLink";
const useStyles = makeStyles({
  largerHeader: {
    height: 60,
    width: "100vw",
    backgroundColor: `${LIGHT_THEME.palette.grayLight}`,
    borderBottom: `1px solid ${LIGHT_THEME.palette.gray}`,
    position: "fixed",
    zIndex: 10,
  },
  wrapHeader: {
    height: "100%",
    width: "100%",
    maxWidth: 1440,
    margin: "auto",
  },
});

const searchButtonStyles = {
  icon: {
    color: `${LIGHT_THEME.palette.neutralSecondaryAlt}`,
  },
  root: {
    width: 60,
    height: 60,
  },
};

export default function Header(props) {
  const classes = useStyles();
  const [modalName, setModalName] = useState("");
  const [isShowMenuPersonal, setIsShowMenuPersonal] = useState(false);
  const [accountInfo, setAccountInfo] = useState(undefined);
  const [keySearch, setKeySearch] = useState("");

  const personalMenuRef = useRef(null);
  const history = useNavigate();

  const _onLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("accountId");
    history("login");
  };

  const menuPersonals = [
    {
      key: "profile",
      text: `${accountInfo?.firstName} ${accountInfo?.lastName}` || "",
      onClick: () => history(`/${PAGE_PATHS.SETTING}`),
    },
    {
      key: "email",
      text: "balong@gmail.com",
      disabled: true,
    },
    {
      key: "setting",
      text: "settings",
      onClick: () => history(`/${PAGE_PATHS.SETTING}`),
    },
    {
      key: "logout",
      text: "logout",
      onClick: () => _onLogout(),
    },
  ];

  const _toggleSearch = modelName => {
    setModalName(modelName);
  };

  const _disMissModal = () => {
    setKeySearch("");
    setModalName("");
  };

  const _onShowPersonaMenu = () => {
    setIsShowMenuPersonal(true);
  };

  const _onHidePersonaMenu = () => {
    setIsShowMenuPersonal(false);
  };

  const _getAccountInfo = async () => {
    const accountResult = await AccountApi.getAccountInfo();

    if (accountResult.isAxiosError) {
      window.alert(accountResult.response.data.message);
    } else {
      setAccountInfo(accountResult.data);
    }
  };

  useEffect(() => {
    _getAccountInfo();
    eventBus.subscribe(
      this,
      domainEvents.CHANGE_ACCOUNT_NAME_DOMAINEVENT,
      () => {
        _getAccountInfo();
      }
    );
  }, []);

  const _onSearch = () => {
    _disMissModal();
    history(`/search?q=${keySearch}`);
  };

  return (
    <Stack className={classes.largerHeader}>
      <Stack
        className={`${classes.wrapHeader} ms-Grid-col ms-sm2 ms-md4 ms-lg2 ms-xl8`}
        grow
        horizontal
        horizontalAlign='space-between'
        verticalAlign='center'>
        <Stack horizontal verticalAlign='center'>
          <Link href='/'>
            <Image
              imageFit={ImageFit.contain}
              src='/img/logo-back.png'
              alt='logo'
            />
          </Link>
        </Stack>
        <Stack horizontal verticalAlign='center'>
          <IconButton
            iconProps={{ iconName: "Search" }}
            title='Search'
            ariaLabel='Search'
            styles={searchButtonStyles}
            onClick={() => _toggleSearch(MODEL_NAME.SEARCH_HEADER_MODEL)}
          />
          <Persona
            text={`${accountInfo?.firstName} ${accountInfo?.lastName}` || ""}
            ref={personalMenuRef}
            size={PersonaSize.size48}
            styles={{ root: { cursor: "pointer" } }}
            onClick={_onShowPersonaMenu}
          />
          <CustomModal
            isOpen={modalName === MODEL_NAME.SEARCH_HEADER_MODEL}
            onDismiss={_disMissModal}
            onPrimaryButtonClick={() => _onSearch()}
            primaryButtonText='Search'
            primaryButtonProps={{ disabled: keySearch.length < 3 }}
            title='Search'>
            <SearchBox
              placeholder='Search'
              onChange={value => setKeySearch(value.target.value)}
              onSearch={() => keySearch.length > 2 && _onSearch()}
            />
          </CustomModal>
          <ContextualMenu
            items={menuPersonals}
            hidden={!isShowMenuPersonal}
            target={personalMenuRef}
            shouldFocusOnMount={true}
            onDismiss={_onHidePersonaMenu}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
