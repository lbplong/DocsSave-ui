/** @format */

import React, { useEffect, useState } from "react";
import CustomDetailList from "../../../components/layoutComponent/CustomDetailList";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";
import PropTypes from "prop-types";
import { MODEL_NAME, ROWS_PER_PAGE } from "../../../constants";
import FavoriteFolderColumnSchema from "../columnsFavoriteSchema/FavoriteFolderColumnSchema";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import CustomModal from "../../../components/modals";
import { success } from "../../../components/ToastMessage";
import { Stack, TextField } from "@fluentui/react";
import CustomButton from "../../../components/CustomButton";

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

export default function ListFolderFavorite(props) {
  const { parentId, selectFolder } = props;
  const [folders, setFolders] = useState(undefined);
  const [emailReceiver, setEmailReceiver] = useState("");
  const [modalName, setModalName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idShare, setIdShare] = useState(undefined);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
    pageSize: ROWS_PER_PAGE.TEN,
  });

  const _getFolders = async () => {
    const data = {
      directoryId: parentId,
      ...pagination,
    };
    const resultFolders = await DirectoryApi.getFolderInFavorite(data);
    if (!resultFolders.isAxiosError) {
      const { items, totalPages } = resultFolders.data;
      setFolders(items);
      setPagination({ ...pagination, totalPages });
    }
  };

  const _handleChangePageIndex = async page => {
    const data = {
      directoryId: parentId,
      ...pagination,
      page,
    };

    const folders = await DirectoryApi.getFolderInFavorite(data);
    if (!folders.isAxiosError) {
      const { items, totalPages } = folders.data;
      setFolders(items);
      setPagination({ ...pagination, page, totalPages });
    }
  };

  const _handleChangePageSize = async pageSize => {
    const data = {
      directoryId: parentId,
      ...pagination,
      pageSize,
      page: 0,
    };
    const folders = await DirectoryApi.getFolderInFavorite(data);
    if (!folders.isAxiosError) {
      const { items, totalPages } = folders.data;
      setFolders(items);
      setPagination({ pageSize, page: 0, totalPages });
    }
  };

  const _onShareFolder = id => {
    setIdShare(id);
    _toggleModal(MODEL_NAME.ADD_FOLDER_TO_SHARE);
  };

  useEffect(() => {
    parentId && _getFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  const _toggleModal = (name = "") => {
    setEmailReceiver("");
    setIsSubmitting(false);
    setModalName(name);
  };

  const _onDismissShareFolderModal = () => {
    setIdShare(undefined);
    setEmailReceiver("");
    _toggleModal();
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

  const _handleReceiverFolder = value => {
    setEmailReceiver(value);
  };

  return (
    <>
      {folders?.length > 0 ? (
        <CustomDetailList
          items={folders}
          columns={FavoriteFolderColumnSchema(
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
          subTitle='There is no folder in this folder!'
          imageProps={{
            src: "/img/group-105.png",
            srcSet: "/img/group-105-2x.png 2x, /img/group-105-3x.png 3x",
            alt: "Empty data room content",
            width: 376,
            height: 280,
          }}
        />
      )}
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
ListFolderFavorite.propTypes = {
  parentId: PropTypes.string,
  selectFolder: PropTypes.func,
};
ListFolderFavorite.defaultProps = {
  parentId: undefined,
  selectFolder: undefined,
};
