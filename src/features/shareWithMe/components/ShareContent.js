/** @format */

import { Breadcrumb, Stack, Toggle } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/CustomButton";
import PropTypes from "prop-types";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import RestServiceHelper from "../../../API/RestServiceHelper";
import SpinnerLoading from "../../../components/multipleComponents/SpinnerLoading";
import ListFolderShare from "./ListFolderShare";
import ListFileShare from "./ListFileShare";

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
  },
};

export default function ShareContent(props) {
  const [folderTree, setFolderTree] = useState([]);
  const [isListFolder, setIsListFolder] = useState(true);
  const [selectFolderId, setSelectFolderId] = useState(undefined);
  const [isLoadingFolderContent, setIsLoadingFolderContent] = useState(true);

  const { folder } = props;

  const _isListFolder = value => {
    setIsListFolder(value);
  };

  const _selectedItems = (_e, folder) => {
    setSelectFolderId(folder.key);
  };

  const _getFolderTreeInShare = async () => {
    setIsLoadingFolderContent(true);
    const resultShareFolderTree = await DirectoryApi.getListShareFolderTree(
      selectFolderId
    );

    let tempFolderTree = [];
    if (resultShareFolderTree.isAxiosError) {
      RestServiceHelper.handleResponse(resultShareFolderTree, "Folder Error");
    } else {
      const { data } = resultShareFolderTree;

      for (const folder of data) {
        const item =
          data.indexOf(folder) === data.length - 1
            ? {
                key: folder.id,
                text: folder.name,
                isCurrentItem: true,
              }
            : {
                key: folder.id,
                text: folder.name,
                onClick: _selectedItems,
              };
        tempFolderTree.push(item);
      }
      setFolderTree(tempFolderTree);
    }
  };

  const _loadFolderContent = () => {
    _getFolderTreeInShare();
    setIsLoadingFolderContent(false);
  };

  const _selectFolder = id => {
    setSelectFolderId(id);
  };

  useEffect(() => {
    setSelectFolderId(folder?.id);
  }, [folder]);

  useEffect(() => {
    selectFolderId && _loadFolderContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFolderId]);

  return (
    <Stack styles={warpFolderContent}>
      <Stack horizontal verticalAlign='center' horizontalAlign='space-between'>
        <Stack horizontal verticalAlign='center'>
          {folderTree.length && (
            <Breadcrumb
              items={folderTree.filter(i => i.isCurrentItem !== true)}
              overflowAriaLabel='More links'
              maxDisplayedItems={5}
              overflowIndex={
                folderTree.filter(i => i.isCurrentItem !== true)?.length === 1
                  ? 0
                  : 1
              }
              styles={{ root: { margin: 0 } }}
            />
          )}
          {folderTree.length >= 1 &&
            folderTree
              .filter(i => i.isCurrentItem === true)
              .map(item => <CustomButton {...item} />)}
        </Stack>
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
            <ListFolderShare
              parentId={selectFolderId}
              selectFolder={_selectFolder}
            />
          ) : (
            <ListFileShare parentId={selectFolderId} />
          )}
        </Stack>
      )}
    </Stack>
  );
}
ShareContent.propTypes = {
  folder: PropTypes.object,
};
ShareContent.defaultProps = {
  folder: {},
};
