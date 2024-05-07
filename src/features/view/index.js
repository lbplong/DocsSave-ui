/** @format */

import { Image, Stack, Text } from "@fluentui/react";
import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FileApi from "../../API/ModuleAPI/FileApi";
import CustomText from "../../components/CustomText";
import { LIGHT_THEME } from "../../constants";
import ContentFile from "./components/ContentFile";

const viewFileWrapper = {
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: LIGHT_THEME.palette.black,
  },
};

const headerContent = {
  root: {
    width: "100%",
    height: 100,
    backgroundColor: LIGHT_THEME.palette.neutralSecondaryAlt,
    opacity: 0.2,
    transitionDelay: 0.5,
    "&:hover": {
      opacity: 1,
    },
  },
};

const textFileName = {
  root: { fontSize: 18 },
};

export default function ViewFile() {
  const [file, setFile] = useState(undefined);

  const { id } = useParams();

  const _getImageSrc = async () => {
    const response = await FileApi.getFileAsBytes(id);
    if (!response.isAxiosError) {
      // const url = `data:image/jpeg;base64,${response.data.content}`;
      setFile(response.data);
    }
  };

  useEffect(() => {
    _getImageSrc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack styles={viewFileWrapper}>
      <Stack
        styles={headerContent}
        horizontalAlign='center'
        verticalAlign='center'>
        <CustomText color={LIGHT_THEME.palette.black} styles={textFileName}>
          {file?.name}
        </CustomText>
      </Stack>
      <ContentFile type={file?.type} data={file?.content} />
    </Stack>
  );
}
