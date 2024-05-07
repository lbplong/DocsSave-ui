/**
 * /* eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/**
 * /* eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

import { Icon, IconButton, Stack, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { LIGHT_THEME, TYPE_FILE, UPLOAD_FILE_STATUS } from "../../../constants";
import PropTypes from "prop-types";
import FileApi from "../../../API/ModuleAPI/FileApi";

const iconFilesStyle = {
  root: {
    width: 36,
    height: 36,
  },
  height: "100%",
};

const listFileStyles = {
  root: {
    marginTop: 10,
    marginBottom: 10,
  },
};

const fileNameStyle = {
  root: {
    width: "100%",
    maxWidth: 300,
    paddingLeft: 10,
    lineHeight: 35,
  },
};

const parentProcessBarStyle = {
  root: {
    width: "100%",
    height: 5,
    backgroundColor: LIGHT_THEME.palette.white,
  },
};

const childProcessBarStyle = (processUpload, uploading) => ({
  root: {
    backgroundColor:
      uploading === UPLOAD_FILE_STATUS.UPLOAD_ERROR
        ? LIGHT_THEME.palette.red
        : uploading === UPLOAD_FILE_STATUS.IN_UPLOAD_PROCESS
        ? LIGHT_THEME.palette.themePrimary
        : LIGHT_THEME.palette.greenLight,
    width:
      uploading === UPLOAD_FILE_STATUS.READY_TO_UPLOAD
        ? `0%`
        : uploading === UPLOAD_FILE_STATUS.IN_UPLOAD_PROCESS
        ? `${processUpload}%`
        : "100%",
    height: "100%",
  },
});

export default function UploadFileItem(props) {
  const [processUpload, setProcessUpload] = useState(0);
  const [uploadFileStatus, setUploadFileStatus] = useState(
    UPLOAD_FILE_STATUS.READY_TO_UPLOAD
  );
  const {
    file,
    index,
    flagUploadFile,
    fileInfo,
    fileType,
    directoryId,
    uploadNextFile,
    removeItem,
    isSubmitting,
    refresh,
  } = props;

  const _removeThisItem = () => {
    removeItem(fileInfo);
  };

  const _inUploadProgress = () => {
    setUploadFileStatus(UPLOAD_FILE_STATUS.IN_UPLOAD_PROCESS);
    setProcessUpload(1);
  };

  const _uploadFile = async () => {
    const formData = new FormData();
    formData.append(`multipartFile`, file);
    formData.append(`displayName`, file.name);
    formData.append(`level`, fileType);

    const uploadResult = await FileApi.createNewFile(formData, directoryId);
    if (uploadResult.isAxiosError) {
      setUploadFileStatus(UPLOAD_FILE_STATUS.UPLOAD_ERROR);
      window.alert(uploadResult.response.data.message, {
        title: "Upload Error",
        actionText: "Continue",
        onAction: () => uploadNextFile(flagUploadFile + 1),
      });
    } else {
      setUploadFileStatus(UPLOAD_FILE_STATUS.UPLOAD_SUCCESS);
      uploadNextFile(flagUploadFile + 1);
    }
    refresh();
  };

  useEffect(() => {
    setTimeout(() => {
      if (processUpload !== 0 && processUpload < 100) {
        setProcessUpload(processUpload + 1);
      }
      if (processUpload === 100) {
        _uploadFile();
      }
    }, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processUpload]);

  useEffect(() => {
    if (flagUploadFile === index) {
      _inUploadProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagUploadFile]);

  return (
    <Stack>
      <Stack horizontal horizontalAlign='space-between' styles={listFileStyles}>
        <Icon
          iconName={TYPE_FILE.filter(i => i.type === fileInfo.type)[0].iconName}
          styles={iconFilesStyle}
        />
        <Text variant='xLarge' nowrap styles={fileNameStyle}>
          {fileInfo.name}
        </Text>

        <IconButton
          iconProps={{
            iconName: "close-svg",
            styles: { icon: { height: "100%" } },
          }}
          disabled={isSubmitting}
          onClick={() => _removeThisItem(fileInfo)}
        />
      </Stack>
      <Stack styles={parentProcessBarStyle}>
        <Stack
          styles={() =>
            childProcessBarStyle(processUpload, uploadFileStatus)
          }></Stack>
      </Stack>
    </Stack>
  );
}
UploadFileItem.prototype = {
  file: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fileInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  index: PropTypes.number.isRequired,
  flagUploadFile: PropTypes.number.isRequired,
  fileType: PropTypes.number.isRequired,
  directoryId: PropTypes.string,
  uploadNextFile: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  refresh: PropTypes.func,
};
UploadFileItem.defaultProps = {
  directoryId: undefined,
  isSubmitting: false,
  refresh: undefined,
};
