/** @format */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";
import CustomDetailList from "../../../components/layoutComponent/CustomDetailList";
import {
  ANOTHER_VALUE,
  LIGHT_THEME,
  MODEL_NAME,
  ROWS_PER_PAGE,
  UPLOAD_FILE_STATUS,
} from "../../../constants";
import fileColumnSchema from "../ColumnsSchema/fileColumnSchema";
import FileApi from "../../../API/ModuleAPI/FileApi";
import CustomModal from "../../../components/modals";
import { IconButton, mergeStyleSets, Stack, TextField } from "@fluentui/react";
import { error, success } from "../../../components/ToastMessage";
import CustomButton from "../../../components/CustomButton";
import UploadFileItem from "./UploadFileItem";
import FileBiz from "../../../biz/FileBiz";

const classNames = mergeStyleSets({
  fileInput: {
    position: "absolute",
    zIndex: 5,
    top: 0,
    bottom: 0,
    opacity: 0,
    width: "100%",
    height: "100%",
    margin: 0,
    cursor: "pointer",
  },
});

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

const btnUploadFile = {
  root: {
    position: "relative",
    width: "100%",
    height: 100,
  },
};

const btnSelectFile = {
  root: {
    width: "100%",
    height: "100%",
  },
  icon: {
    height: "100%",
  },
};

export default function ListFile(props) {
  const { parentId, fileType } = props;
  const [files, setFiles] = useState(undefined);
  const [modalName, setModalName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [objFiles, setObjFiles] = useState([]);
  const [filesUploadInfo, setFilesUploadInfo] = useState([]);
  const [flagUploadFile, setFlagUploadFile] = useState(undefined);
  const [emailReceiver, setEmailReceiver] = useState("");
  const [idShare, setIdShare] = useState(undefined);
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

    const filesResult = await FileApi.getFileByParentId(data);
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
    const filesResult = await FileApi.getFileByParentId(data);
    if (!filesResult.isAxiosError) {
      const { items, totalPages } = filesResult.data;
      setFiles(items);
      setPagination({ pageSize, page: 0, totalPages });
    }
  };

  const _getFiles = async () => {
    const data = {
      parentId: parentId,
      ...pagination,
    };
    const filesResult = await FileApi.getFileByParentId(data);

    if (!filesResult.isAxiosError) {
      const { items, totalPages } = filesResult.data;
      setFiles(items);
      setPagination({ ...pagination, totalPages });
    }
  };

  useEffect(() => {
    parentId && _getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  const _toggleModal = (name = "") => {
    setEmailReceiver("");
    setIsSubmitting(false);
    setModalName(name);
  };

  const _handelDismiss = () => {
    setFlagUploadFile(0);
    setFilesUploadInfo([]);
    _toggleModal();
  };

  const _toggleModalListFiles = (modalName = "") => {
    if (typeof modalName === "object") {
      _handelDismiss();
    }
    setModalName(modalName);
  };

  const _submitFile = () => {
    setFlagUploadFile(0);
    setIsSubmitting(true);
  };

  const _onChangeFile = value => {
    const objFiles = value.target.files;
    if (objFiles) {
      if (objFiles?.length < ANOTHER_VALUE.MAX_NUMBER_FILE_UPLOAD) {
        setObjFiles(objFiles);
        let arr = [];
        let errorContinue = 0;
        Array.from(objFiles).map((file, key) => {
          if (file.size > ANOTHER_VALUE.MAX_SIZE_FILE_UPLOAD) {
            errorContinue = 1;
          }
          if (FileBiz.checkTypeOfFileSuccess(file) === false) {
            errorContinue = 2;
          }
          if (errorContinue === 0) {
            arr.push({
              name: file.name,
              url: URL.createObjectURL(file),
              index: key,
              type: file.type,
              uploading: UPLOAD_FILE_STATUS.READY_TO_UPLOAD,
            });
          }
          return 1;
        });
        if (errorContinue === 0) {
          setFilesUploadInfo(arr);
          _toggleModalListFiles(MODEL_NAME.LIST_FILES);
        } else if (errorContinue === 1) {
          error("File upload size  must be smaller than 100MB");
        } else {
          error("File upload Type incorrect");
        }
      } else {
        error("Maximum upload 10 files only");
      }
    }
  };

  const _removeThisItem = item => {
    if (filesUploadInfo.length === 1) {
      _toggleModalListFiles();
    }
    setFilesUploadInfo(filesUploadInfo.filter(i => i !== item));
  };

  const _uploadNextFile = value => {
    if (value === filesUploadInfo.length) {
      setIsSubmitting(false);
      success("Done");
      _getFiles();
    } else {
      setFlagUploadFile(value);
    }
  };

  const _onShareFile = row => {
    if (row?.id) {
      setIdShare(row.id);
      setModalName(MODEL_NAME.ADD_FILE_TO_SHARE);
    }
  };

  const _onDismissShareFileModal = () => {
    setIdShare(undefined);
    setEmailReceiver("");
    _toggleModal();
  };

  const _handleReceiverFile = value => {
    setEmailReceiver(value);
  };

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

  return (
    <>
      {files?.length > 0 ? (
        <CustomDetailList
          striped
          items={files}
          columns={fileColumnSchema(_getFiles, _onShareFile)}
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
            text: "Add File",
            onClick: () => _toggleModal(MODEL_NAME.ADD_FILE_TO_DOC_FOLDER),
          }}
        />
      )}
      <CustomModal
        isOpen={modalName === MODEL_NAME.ADD_FILE_TO_DOC_FOLDER}
        onDismiss={_toggleModal}
        title='Add File'>
        <Stack>
          <Stack styles={{ root: { paddingBottom: 20 } }}>
            <Stack styles={btnUploadFile}>
              <input
                label='upload file'
                name='upload-file-input'
                id='upload-file-input'
                multiple
                type='file'
                className={classNames.fileInput}
                onChange={_onChangeFile}
              />
              <IconButton
                primary
                iconProps={{ iconName: "upload-file-svg" }}
                styles={btnSelectFile}
              />
            </Stack>
          </Stack>
          <Stack horizontal horizontalAlign='space-between'>
            <CustomButton text='Cancel' onClick={_handelDismiss} />
            <CustomButton primary text='Add File' disabled />
          </Stack>
        </Stack>
      </CustomModal>
      <CustomModal
        title='List File'
        isOpen={modalName === MODEL_NAME.LIST_FILES}
        onDismiss={_toggleModalListFiles}
        primaryButtonText='Upload File'
        isSubmitting={isSubmitting}
        onPrimaryButtonClick={() => _submitFile()}
        primaryButtonProps={{ disabled: flagUploadFile !== undefined }}
        cancelButtonProps={{ disabled: flagUploadFile !== undefined }}>
        {filesUploadInfo &&
          filesUploadInfo.map((file, key) => (
            <UploadFileItem
              key={key}
              fileInfo={file}
              file={objFiles[file.index]}
              index={key}
              flagUploadFile={flagUploadFile}
              isSubmitting={isSubmitting}
              fileType={fileType}
              directoryId={parentId}
              uploadNextFile={_uploadNextFile}
              removeItem={_removeThisItem}
            />
          ))}
      </CustomModal>
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
ListFile.propTypes = {
  parentId: PropTypes.string,
  selectFolder: PropTypes.func,
  fileType: PropTypes.number.isRequired,
};
ListFile.defaultProps = {
  parentId: undefined,
  selectFolder: undefined,
};
