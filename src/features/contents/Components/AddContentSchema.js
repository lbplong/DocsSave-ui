/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  mergeStyleSets,
  TextField,
  Toggle,
  IconButton,
} from "@fluentui/react";
import CustomButton from "../../../components/CustomButton";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import CustomModal from "../../../components/modals";
import {
  ANOTHER_VALUE,
  MODEL_NAME,
  UPLOAD_FILE_STATUS,
} from "../../../constants";
import UploadFileItem from "./UploadFileItem";
import { error, success } from "../../../components/ToastMessage";
import FileBiz from "../../../biz/FileBiz";
import AppUtil from "../../../constants/utilService/AppUtil";

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

export default function AddContentSchema(props) {
  const [options, setOption] = useState(true);
  const [folderName, setFolderName] = useState("");
  const [filesUploadInfo, setFilesUploadInfo] = useState([]);
  const [objFiles, setObjFiles] = useState([]);
  const [modalName, setModalName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flagUploadFile, setFlagUploadFile] = useState(undefined);

  const { directoryId, onDismiss, fileType, refresh } = props;

  const _submitContent = async () => {
    const data = {
      parentId: directoryId,
      name: folderName || "NewFolder",
      level: fileType,
    };

    const createFolder = await DirectoryApi.createFolder(data);

    if (createFolder.isAxiosError) {
      window.alert(createFolder.response.data.message, {
        title: `Error Create Directory!`,
      });
    } else {
      refresh();
      _handelDismiss();
    }
  };

  const _handelDismiss = () => {
    setFilesUploadInfo([]);
    onDismiss();
  };

  const _selectFolderOrFile = value => {
    setOption(value);
  };

  const _handleFolderNameChange = value => {
    setFolderName(value);
  };

  const _toggleModalListFiles = (modalName = "") => {
    if (typeof modalName === "object") {
      _handelDismiss();
    }
    setModalName(modalName);
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

  const _submitFile = () => {
    setFlagUploadFile(0);
    setIsSubmitting(true);
  };

  const _uploadNextFile = value => {
    if (value === filesUploadInfo.length) {
      setIsSubmitting(false);
      success("Done");
    } else {
      setFlagUploadFile(value);
    }
  };

  return (
    <Stack>
      <Stack styles={{ root: { paddingBottom: 20 } }}>
        <Toggle
          label='Select folder or file'
          defaultChecked
          onText='Create Folder'
          offText={`Upload ${AppUtil.renderNameType()} File`}
          onChange={(_e, value) => _selectFolderOrFile(value)}
        />
        {options ? (
          <TextField
            autoFocus
            value={folderName}
            onChange={(_e, value) => _handleFolderNameChange(value)}
            styles={textFieldStyles}
          />
        ) : (
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
        )}
      </Stack>
      <Stack horizontal horizontalAlign='space-between'>
        <CustomButton text='Cancel' onClick={_handelDismiss} />
        <CustomButton
          primary
          text='Add Content'
          onClick={_submitContent}
          disabled={!options && filesUploadInfo.length === 0}
        />
      </Stack>
      <CustomModal
        title='List File'
        isOpen={modalName === MODEL_NAME.LIST_FILES}
        onDismiss={_toggleModalListFiles}
        primaryButtonText='Upload File'
        isSubmitting={isSubmitting}
        onPrimaryButtonClick={() => _submitFile()}
        primaryButtonProps={{ disabled: flagUploadFile !== undefined }}>
        {filesUploadInfo &&
          filesUploadInfo.map((file, key) => (
            <UploadFileItem
              key={key}
              fileInfo={file}
              file={objFiles[file.index]}
              index={key}
              flagUploadFile={flagUploadFile}
              fileType={fileType}
              directoryId={directoryId}
              uploadNextFile={_uploadNextFile}
              removeItem={_removeThisItem}
              refresh={refresh}
            />
          ))}
      </CustomModal>
    </Stack>
  );
}
AddContentSchema.propTypes = {
  directoryId: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
  fileType: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
};
AddContentSchema.defaultProps = {
  directoryId: undefined,
};
