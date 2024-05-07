/** @format */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Breadcrumb, IconButton, Stack, Toggle } from "@fluentui/react";
import CustomButton from "../../../components/CustomButton";
import SpinnerLoading from "../../../components/multipleComponents/SpinnerLoading";
import DisplayFolder from "../../myShare/components/DisplayFolder";
import DisplayFile from "../../myShare/components/DisplayFile";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import RestServiceHelper from "../../../API/RestServiceHelper";

const warpFolderContent = {
  root: {
    width: "80vw",
    height: "80vh",
  },
};

const areaContent = {
  root: {
    maxHeight: "calc(100% - 55px)",
    overflowY: "auto",
  },
};

export default function ContentViewSearch(props) {
  const { selectedFolderId, isFolder } = props;
  const [folderTree, setFolderTree] = useState([]);
  const [isLoadingFolderContent, setIsLoadingFolderContent] = useState(false);
  const [selectFolderId, setSelectFolderId] = useState(undefined);
  const [isListFolder, setIsListFolder] = useState(true);

  const _selectedItems = (_e, folder) => {
    setSelectFolderId(folder.key);
  };

  const _isListFolder = value => {
    setIsListFolder(value);
  };

  const _selectFolder = id => {
    setSelectFolderId(id);
  };

  const _getFolderTree = async () => {
    setIsLoadingFolderContent(true);
    const folderTreeResult = await DirectoryApi.getFolderTreeByFolderId(
      selectFolderId
    );
    let tempFolderTree = [];
    if (folderTreeResult.isAxiosError) {
      RestServiceHelper.handleResponse(folderTreeResult, "Folder Error");
    } else {
      const { data } = folderTreeResult;

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
    _getFolderTree();
    setIsLoadingFolderContent(false);
    setIsListFolder(isFolder);
  };

  useEffect(() => {
    setSelectFolderId(selectedFolderId);
  }, [selectedFolderId]);

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
            defaultChecked={isFolder}
            onChange={(_event, value) => _isListFolder(value)}
            styles={{ root: { marginBottom: 0 } }}
          />
          <IconButton
            iconProps={{
              iconName: "more-svg",
              styles: { root: { width: 36, height: 36 } },
            }}
            styles={{ menuIcon: { display: "none" } }}
          />
        </Stack>
      </Stack>
      {isLoadingFolderContent ? (
        <SpinnerLoading />
      ) : (
        <Stack styles={areaContent}>
          {isListFolder ? (
            <DisplayFolder
              parentId={selectFolderId}
              selectFolder={_selectFolder}
            />
          ) : (
            <DisplayFile parentId={selectFolderId} />
          )}
        </Stack>
      )}
    </Stack>
  );
}
ContentViewSearch.propTypes = {
  selectedFolderId: PropTypes.string.isRequired,
  isFolder: PropTypes.bool,
};
ContentViewSearch.defaultProps = {
  isFolder: false,
};
