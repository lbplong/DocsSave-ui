/** @format */

import { Stack, Toggle } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import SpinnerLoading from "../../../components/multipleComponents/SpinnerLoading";
import ListFileMyShare from "./ListFileMyShare";
import ListFolderMyShare from "./ListFolderMyShare";

const warpFolderContent = {
  root: {
    height: "100%",
    display: "flex",
  },
};

const areaContent = {
  root: {
    maxHeight: "calc(100% - 55px)",
    overflowY: "auto",
    paddingLeft: 20,
  },
};

export default function MyShareContent(props) {
  const [isListFolder, setIsListFolder] = useState(true);
  const [selectFolderId, setSelectFolderId] = useState(undefined);
  const [isLoadingFolderContent, setIsLoadingFolderContent] = useState(true);

  const { folder } = props;

  const _isListFolder = value => {
    setIsListFolder(value);
  };

  const _loadFolderContent = () => {
    setIsLoadingFolderContent(false);
  };

  useEffect(() => {
    selectFolderId && _loadFolderContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFolderId]);

  useEffect(() => {
    setSelectFolderId(folder?.id);
  }, [folder]);

  return (
    <Stack styles={warpFolderContent}>
      <Stack horizontal verticalAlign='center' horizontalAlign='end'>
        <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 10 }}>
          <Toggle
            onText='List Folder'
            offText='List File'
            defaultChecked
            onChange={(_event, value) => _isListFolder(value)}
            styles={{ root: { marginBottom: 0 } }}
          />
        </Stack>
      </Stack>
      {isLoadingFolderContent ? (
        <SpinnerLoading />
      ) : (
        <Stack styles={areaContent}>
          {isListFolder ? (
            <ListFolderMyShare parentId={selectFolderId} />
          ) : (
            <ListFileMyShare parentId={selectFolderId} />
          )}
        </Stack>
      )}
    </Stack>
  );
}
