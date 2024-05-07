/** @format */

import { Pivot, PivotItem, Stack, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import DirectoryApi from "../../API/ModuleAPI/DirectoryApi";
import EmptyContent from "../../components/layoutComponent/EmptyContent";
import LoadingPage from "../../components/multipleComponents/LoadingPage";
import { LIGHT_THEME, ROOT_FOLDER_ID, ROWS_PER_PAGE } from "../../constants";
import { TEXT_TITLE, WH_100 } from "../../constants/styles";
import { BREAKPOINTS_RESPONSIVE } from "../../constants/SVGTheme";
import MyShareContent from "./components/MyShareContent";

const displayTabStyles = {
  root: {
    ...WH_100.root,
    display: "flex",
  },
};

const pivotSettingStyles = {
  root: {
    marginBottom: 29,
    [BREAKPOINTS_RESPONSIVE.mdDown]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  linkIsSelected: {
    borderTop: `3px solid ${LIGHT_THEME.palette.themePrimary}`,
    color: `${LIGHT_THEME.palette.black}`,
    borderRadius: `0 !important`,
  },
  link: {
    marginRight: 8,
    minWidth: 100,
    maxWidth: 200,
    width: "100%",
    backgroundColor: `${LIGHT_THEME.palette.gray}`,
    "&:hover": {
      backgroundColor: `${LIGHT_THEME.palette.gray}`,
    },
    [BREAKPOINTS_RESPONSIVE.mdDown]: {
      width: "25%",
    },
  },
  itemContainer: {
    height: "calc(100vh - 220px)",
  },
};

export default function MyShare() {
  const [isLoading, setIsLoading] = useState(true);
  const [rootFolders, setRootFolders] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
    pageSize: ROWS_PER_PAGE.TEN,
  });

  const _getRootFolders = async () => {
    const rootFolderResult = await DirectoryApi.getFolderByParentId({
      parentId: ROOT_FOLDER_ID,
      ...pagination,
    });
    if (rootFolderResult.isAxiosError) {
      window.alert(rootFolderResult.response.data.message);
    } else {
      setRootFolders(rootFolderResult.data.items);
      setPagination({ ...pagination, totalPages: rootFolderResult.totalPages });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    _getRootFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack styles={displayTabStyles}>
      <Text variant='xLarge' styles={TEXT_TITLE}>
        Your share
      </Text>
      {isLoading ? (
        <LoadingPage />
      ) : rootFolders?.length > 0 ? (
        <Pivot
          aria-label='Basic Pivot Example'
          defaultSelectedKey={rootFolders[0].id}
          styles={pivotSettingStyles}>
          {rootFolders?.map((folder, key) => (
            <PivotItem
              itemKey={folder.id}
              key={key}
              headerText={folder.name}
              style={{ height: "100%" }}>
              <MyShareContent folder={folder} />
            </PivotItem>
          ))}
        </Pivot>
      ) : (
        <EmptyContent />
      )}
    </Stack>
  );
}
