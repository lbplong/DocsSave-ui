/** @format */

import { Stack, TextField } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import CustomButton from "../../../components/CustomButton";
import CustomDetailList from "../../../components/layoutComponent/CustomDetailList";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";
import CustomModal from "../../../components/modals";
import { LIGHT_THEME, MODEL_NAME, ROWS_PER_PAGE } from "../../../constants";
import folderColumnSchema from "../ColumnsSchema/folderColumnSchema";
import PropTypes from "prop-types";
import { success } from "../../../components/ToastMessage";

const textFieldStyles = {
  field: {
    fontSize: 12,
    lineHeight: 14,
  },
  fieldGroup: {
    height: 40,
    padding: 0,
  },
};

export default function ListFolder(props) {
  const { parentId, selectFolder, fileType } = props;
  const [folders, setFolders] = useState(undefined);
  const [folderName, setFolderName] = useState("");
  const [modalName, setModalName] = useState("");
  const [idShare, setIdShare] = useState(undefined);
  const [emailReceiver, setEmailReceiver] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
    pageSize: ROWS_PER_PAGE.TEN,
  });

  const _handleChangePageIndex = async page => {
    const data = {
      parentId: parentId,
      ...pagination,
      page,
    };

    const folders = await DirectoryApi.getFolderByParentId(data);
    if (!folders.isAxiosError) {
      const { items, totalPages } = folders.data;
      setFolders(items);
      setPagination({ ...pagination, page, totalPages });
    }
  };

  const _handleChangePageSize = async pageSize => {
    const data = {
      parentId: parentId,
      ...pagination,
      pageSize,
      page: 0,
    };
    const folders = await DirectoryApi.getFolderByParentId(data);
    if (!folders.isAxiosError) {
      const { items, totalPages } = folders.data;
      setFolders(items);
      setPagination({ pageSize, page: 0, totalPages });
    }
  };

  const _getFolders = async () => {
    const data = {
      parentId: parentId,
      ...pagination,
    };
    const folders = await DirectoryApi.getFolderByParentId(data);
    if (!folders.isAxiosError) {
      const { items, totalPages } = folders.data;

      setFolders(items);
      setPagination({ ...pagination, totalPages });
    }
  };

  const _toggleModal = (name = "") => {
    setEmailReceiver("");
    setFolderName("");
    setIsSubmitting(false);
    setModalName(name);
  };

  const _handleFolderNameChange = value => {
    setFolderName(value);
  };

  const _handleReceiverFolder = value => {
    setEmailReceiver(value);
  };

  const _handelDismiss = () => {
    setFolderName();
    _toggleModal();
  };

  const _submitContent = async () => {
    const data = {
      parentId: parentId,
      name: folderName || "New Folder",
      level: fileType,
    };

    setIsSubmitting(true);
    const createFolder = await DirectoryApi.createFolder(data);

    if (createFolder.isAxiosError) {
      window.alert(createFolder.response.data.message, {
        title: `Error Create Directory!`,
      });
    } else {
      _getFolders();
      _handelDismiss();
    }
  };

  const _submitAddFolderToShares = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      directoryId: idShare,
      emailReceiver,
    };
    const addFolderToShares = await DirectoryApi.addFolderToShare(data);
    if (addFolderToShares.isAxiosError) {
      window.alert(addFolderToShares.response.data.message, {
        title: "Share folder error!",
      });
    } else {
      success(addFolderToShares.data);
    }
  };

  const _onShareFolder = row => {
    if (row?.id) {
      setIdShare(row.id);
      setModalName(MODEL_NAME.ADD_FOLDER_TO_SHARE);
    }
  };

  const _onDismissShareFolderModal = () => {
    setIdShare(undefined);
    setEmailReceiver("");
    _toggleModal();
  };

  useEffect(() => {
    parentId && _getFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  return (
    <>
      {folders?.length > 0 ? (
        <CustomDetailList
          items={folders}
          columns={folderColumnSchema(
            selectFolder,
            _getFolders,
            _onShareFolder
          )}
          isPagination
          pagingOptions={{
            ...pagination,
            onChangePageIndex: page => _handleChangePageIndex(page),
            onChangePageSize: pageSize => _handleChangePageSize(pageSize),
          }}
        />
      ) : (
        <EmptyContent
          title='This folder is empty'
          subTitle='Please add content to this folder!'
          imageProps={{
            src: "/img/group-105.png",
            srcSet: "/img/group-105-2x.png 2x, /img/group-105-3x.png 3x",
            alt: "Empty data room content",
            width: 376,
            height: 280,
          }}
          primaryButtonProps={{
            iconProps: {
              iconName: "plus-svg",
              styles: {
                root: {
                  height: 26,
                  fill: LIGHT_THEME.palette.white,
                },
              },
            },
            text: "Add Folder",
            onClick: () => _toggleModal(MODEL_NAME.ADD_FOLDER_TO_DOC_FOLDER),
          }}
        />
      )}
      <CustomModal
        isOpen={modalName === MODEL_NAME.ADD_FOLDER_TO_DOC_FOLDER}
        onDismiss={_toggleModal}
        title='Add folder'>
        <Stack>
          <Stack styles={{ root: { paddingBottom: 20 } }}>
            <TextField
              autoFocus
              value={folderName}
              onChange={(_e, value) => _handleFolderNameChange(value)}
              styles={textFieldStyles}
              placeholder='Folder name'
            />
          </Stack>
          <Stack horizontal horizontalAlign='space-between'>
            <CustomButton text='Cancel' onClick={_handelDismiss} />
            <CustomButton
              primary
              text='Add Folder'
              onClick={_submitContent}
              disabled={folderName === "" || isSubmitting}
            />
          </Stack>
        </Stack>
      </CustomModal>
      <CustomModal
        isOpen={modalName === MODEL_NAME.ADD_FOLDER_TO_SHARE}
        onDismiss={_onDismissShareFolderModal}
        title='Share Folder'>
        <form onSubmit={_submitAddFolderToShares}>
          <Stack>
            <Stack styles={{ root: { paddingBottom: 20 } }}>
              <TextField
                autoFocus
                value={emailReceiver}
                onChange={(_e, value) => _handleReceiverFolder(value)}
                styles={textFieldStyles}
                placeholder='Email receiver'
                type='email'
              />
            </Stack>
            <Stack horizontal horizontalAlign='space-between'>
              <CustomButton
                text='Cancel'
                onClick={_onDismissShareFolderModal}
              />
              <CustomButton
                primary
                text='Share Folder'
                type='submit'
                disabled={emailReceiver === "" || isSubmitting}
              />
            </Stack>
          </Stack>
        </form>
      </CustomModal>
    </>
  );
}
ListFolder.propTypes = {
  parentId: PropTypes.string,
  selectFolder: PropTypes.func,
  fileType: PropTypes.number.isRequired,
};
ListFolder.defaultProps = {
  parentId: undefined,
  selectFolder: undefined,
};
