/** @format */

export const LIGHT_THEME = {
  defaultFontStyle: { fontFamily: "SourceHanSansKR, sans-serif" },
  fonts: {
    smallPlus: {
      fontSize: "13px",
    },
  },
  palette: {
    themePrimary: "#f79f1a",
    themeLighterAlt: "#fff8ed",
    themeLighter: "#feefda",
    themeLight: "#fcd9a3",
    themeTertiary: "#fac575",
    themeSecondary: "#f8aa36",
    themeDarkAlt: "#df8f18",
    themeDark: "#bc7915",
    themeDarker: "#8b590f",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#fafafa",
    neutralLight: "#f4f4f4",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#c8c8c8",
    neutralTertiaryAlt: "#c6c6c6",
    neutralTertiary: "#c4c4c4",
    neutralSecondaryAlt: "#6c6c6c",
    neutralSecondary: "#4a4a4a",
    neutralPrimaryAlt: "#363636",
    neutralPrimary: "#1e1e1e",
    neutralDark: "#111111",
    black: "#000000",
    white: "#ffffff",
    orangeLight: "#ff6100",
    red: "#e4002b",
    gray: "#c4c4c4",
    darkLight: "#f5f5f5",
    magentaLight: "#e40f9b",
    greenLight: "#0cbc82",
    grayLight: "#fbfbfb",
    topaz: "#22C1C3",
    yellowLight: "#fdbb2d",
  },
  semanticColors: {
    bodyDivider: "#dadada",
    buttonText: "#6c6c6c",
  },
};
export const PAGE_PATHS = {
  DASHBOARD: "dashboard",
  CONTENT: "contents",
  DATAROOM: "data-room",
  SETTING: "settings",
  MY_FOLDER: "my-folder",
  SHARE_WITH_ME: "share-with-me",
  FAVORITES: "favorites",
  MY_SHARE: "my-share",
  VIEW_FILE: "view-file",
  PROFILE: "profile",
  SEARCH: "search",
  SEARCH_ALL: "search-all",
};
export const MODEL_NAME = {
  SEARCH_HEADER_MODEL: "SEARCH_HEADER_MODEL",
  ADD_CONTENT_TO_DOC_FOLDER: "ADD_CONTENT_TO_DOC_FOLDER",
  ADD_FOLDER_TO_DOC_FOLDER: "ADD_FOLDER_TO_DOC_FOLDER",
  ADD_FILE_TO_DOC_FOLDER: "ADD_FILE_TO_DOC_FOLDER",
  LIST_FILES: "LIST_FILES",
  ADD_FOLDER_TO_SHARE: "ADD_FOLDER_TO_SHARE",
  ADD_FILE_TO_SHARE: "ADD_FILE_TO_SHARE",
  VIEW_FOLDER_IN_MY_SHARE: "VIEW_FOLDER_IN_MY_SHARE",
};
export const ROWS_PER_PAGE = {
  FIVE: 5,
  TEN: 10,
  FIFTEEN: 15,
  TWENTY: 20,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const NAV_GROUPS = [
  {
    key: "my-folder",
    name: "My Folder",
    url: `/${PAGE_PATHS.MY_FOLDER}`,
    icon: "FabricUserFolder",
  },
  {
    key: "share-with-me",
    name: "Share with me",
    url: `/${PAGE_PATHS.SHARE_WITH_ME}`,
    icon: "Share",
  },
  {
    key: "favorites",
    name: "Favorites",
    url: `/${PAGE_PATHS.FAVORITES}`,
    icon: "FavoriteStar",
  },
  {
    key: "my-share",
    name: "My share",
    url: `/${PAGE_PATHS.MY_SHARE}`,
    icon: "Send",
  },
];

export const TYPE_FILE = [
  {
    key: "document",
    name: "document",
    type: "application/pdf",
    iconName: "doc-svg",
  },
  { key: "music", name: "music", type: "audio/mpeg", iconName: "mp3-svg" },
  { key: "photo", name: "photo", type: "image/jpeg", iconName: "pic-svg" },
  { key: "movie", name: "movie", type: "video/mp4", iconName: "mov-svg" },
];

export const TYPE_FILE_NAME = {
  DOCUMENT: "document",
  MUSIC: "music",
  PHOTO: "photo",
  MOVIE: "movie",
  FOLDER: "folder",
};

export const UPLOAD_FILE_STATUS = {
  READY_TO_UPLOAD: 0,
  IN_UPLOAD_PROCESS: 1,
  UPLOAD_SUCCESS: 2,
  UPLOAD_ERROR: 3,
};

export const ROOT_FOLDER_ID = "572eec8a-bd43-11ec-9d64-0242ac120002";

export const ANOTHER_VALUE = {
  MAX_NUMBER_FILE_UPLOAD: 10,
  MAX_SIZE_FILE_UPLOAD: 104857600, // 100MB
};
