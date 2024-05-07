/** @format */

import { Stack, TextField } from "@fluentui/react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import FileApi from "../../../API/ModuleAPI/FileApi";
import CustomButton from "../../../components/CustomButton";
import CustomDetailList from "../../../components/layoutComponent/CustomDetailList";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";
import CustomModal from "../../../components/modals";
import { success } from "../../../components/ToastMessage";
import { MODEL_NAME, ROWS_PER_PAGE } from "../../../constants";
import FavoriteFileColumnSchema from "../columnsFavoriteSchema/FavoriteFileColumnSchema";

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

export default function ListFileFavorite(props) {
  const { parentId } = props;
  const [files, setFiles] = useState(undefined);
  const [idShare, setIdShare] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalName, setModalName] = useState("");
  const [emailReceiver, setEmailReceiver] = useState("");
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
    pageSize: ROWS_PER_PAGE.TEN,
  });

  const _getFiles = async () => {
    const data = {
      parentId: parentId,
      ...pagination,
    };
    const filesResult = await FileApi.getFavoriteFileByParentId(data);

    if (!filesResult.isAxiosError) {
      const { items, totalPages } = filesResult.data;
      setFiles(items);
      setPagination({ ...pagination, totalPages });
    }
  };

  const _handleChangePageIndex = async page => {
    const data = {
      parentId: parentId,
      ...pagination,
      page,
    };

    const filesResult = await FileApi.getFavoriteFileByParentId(data);
    if (!filesResult.isAxiosError) {
      const { items, totalPages } = filesResult.data;
      setFiles(items);
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
    const filesResult = await FileApi.getFavoriteFileByParentId(data);
    if (!filesResult.isAxiosError) {
      const { items, totalPages } = filesResult.data;
      setFiles(items);
      setPagination({ pageSize, page: 0, totalPages });
    }
  };

  const _onShareFile = row => {
    if (row?.id) {
      setIdShare(row.id);
      setModalName(MODEL_NAME.ADD_FILE_TO_SHARE);
    }
  };

  const _toggleModal = (name = "") => {
    setEmailReceiver("");
    setIsSubmitting(false);
    setModalName(name);
  };

  const _onDismissShareFileModal = () => {
    setIdShare(undefined);
    setEmailReceiver("");
    _toggleModal();
  };

  useEffect(() => {
    parentId && _getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  const _submitAddFileToShares = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      fileId: idShare,
      emailReceiver,
    };
    const addFileToShares = await FileApi.addFileToShare(data);
    if (addFileToShares.isAxiosError) {
      window.alert(addFileToShares.response.data.message, {
        title: "Share file error!",
        onClose: () => _onDismissShareFileModal(),
      });
    } else {
      success(addFileToShares.data);
    }
  };

  const _handleReceiverFile = value => {
    setEmailReceiver(value);
  };

  return (
    <>
      {files?.length > 0 ? (
        <CustomDetailList
          striped
          items={files}
          columns={FavoriteFileColumnSchema(_getFiles, _onShareFile)}
          isPagination
          pagingOptions={{
            ...pagination,
            onChangePageIndex: page => _handleChangePageIndex(page),
            onChangePageSize: pageSize => _handleChangePageSize(pageSize),
          }}
        />
      ) : (
        <EmptyContent
          title='This folder is have no file!'
          subTitle='There is no file in this folder!'
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
        isOpen={modalName === MODEL_NAME.ADD_FILE_TO_SHARE}
        onDismiss={_onDismissShareFileModal}
        title='Share Folder'>
        <form onSubmit={_submitAddFileToShares}>
          <Stack>
            <Stack styles={{ root: { paddingBottom: 20 } }}>
              <TextField
                autoFocus
                value={emailReceiver}
                onChange={(_e, value) => _handleReceiverFile(value)}
                styles={textFieldStyles}
                placeholder='Email receiver'
                type='email'
              />
            </Stack>
            <Stack horizontal horizontalAlign='space-between'>
              <CustomButton text='Cancel' onClick={_onDismissShareFileModal} />
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
ListFileFavorite.propTypes = {
  parentId: PropTypes.string,
};
ListFileFavorite.defaultProps = {
  parentId: undefined,
};
