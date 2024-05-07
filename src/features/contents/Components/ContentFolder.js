/** @format */

import { Breadcrumb, IconButton, Stack, Toggle } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import SpinnerLoading from "../../../components/multipleComponents/SpinnerLoading";
import PropTypes from "prop-types";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import { MODEL_NAME } from "../../../constants";
import CustomModal from "../../../components/modals";
import AddContentSchema from "./AddContentSchema";
import RestServiceHelper from "../../../API/RestServiceHelper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import ListFolder from "./ListFolder";
import ListFile from "./ListFile";
import { success } from "../../../components/ToastMessage";

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

export default function ContentFolder(props) {
  const [isLoadingFolderContent, setIsLoadingFolderContent] = useState(true);
  const [selectFolderId, setSelectFolderId] = useState();
  const [folderTree, setFolderTree] = useState([]);
  const [modalName, setModalName] = useState("");
  const [isListFolder, setIsListFolder] = useState(true);

  const { folder } = props;

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

  const _selectedItems = (_e, folder) => {
    setSelectFolderId(folder.key);
  };

  const _loadFolderContent = () => {
    _getFolderTree();
    setIsLoadingFolderContent(false);
  };

  useEffect(() => {
    setSelectFolderId(folder?.id);
  }, [folder]);

  useEffect(() => {
    selectFolderId && _loadFolderContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFolderId]);

  const _toggleAddContentClick = (name = "") => {
    setModalName(name);
  };

  const _selectFolder = id => {
    setSelectFolderId(id);
  };

  const _deleteFolderClick = async () => {
    const deleteDirectoryResult = await DirectoryApi.deleteDirectory(
      selectFolderId
    );
    if (deleteDirectoryResult.isAxiosError) {
      window.alert(deleteDirectoryResult.response.data.message, {
        title: `Delete error!`,
        actionText: `Close`,
      });
    } else {
      success("Delete directory successfully!");
      _selectFolder(folderTree[folderTree.length - 2].key);
    }
  };

  const menuProps = {
    items: [
      {
        key: "add-content",
        text: "Add Content",
        onClick: () =>
          _toggleAddContentClick(MODEL_NAME.ADD_CONTENT_TO_DOC_FOLDER),
      },
      {
        key: "gird-layout",
        text: "View in grid",
      },
      {
        key: "list-layout",
        text: "View in list",
      },
      {
        key: "delete-folder",
        text: <CustomText color='textDanger'>Delete Folder</CustomText>,
        onClick: () => _deleteFolderClick(),
      },
    ],
    directionalHint: 6,
  };

  const _isListFolder = value => {
    setIsListFolder(value);
  };

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
          <IconButton
            iconProps={{
              iconName: "more-svg",
              styles: { root: { width: 36, height: 36 } },
            }}
            menuProps={menuProps}
            styles={{ menuIcon: { display: "none" } }}
          />
        </Stack>
      </Stack>

      {isLoadingFolderContent ? (
        <SpinnerLoading />
      ) : (
        <Stack styles={areaContent}>
          {isListFolder ? (
            <ListFolder
              parentId={selectFolderId}
              selectFolder={_selectFolder}
              fileType={folder?.level}
            />
          ) : (
            <ListFile parentId={selectFolderId} fileType={folder?.level} />
          )}
        </Stack>
      )}
      <CustomModal
        isOpen={modalName === MODEL_NAME.ADD_CONTENT_TO_DOC_FOLDER}
        onDismiss={_toggleAddContentClick}
        title='Add content'>
        <AddContentSchema
          directoryId={selectFolderId}
          onDismiss={_toggleAddContentClick}
          fileType={folder?.level}
          refresh={_loadFolderContent}
        />
      </CustomModal>
    </Stack>
  );
}
ContentFolder.propTypes = {
  folder: PropTypes.object,
};
ContentFolder.defaultProps = {
  folder: {},
};
