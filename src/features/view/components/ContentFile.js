/** @format */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TYPE_FILE } from "../../../constants";
import { ImageBase, mergeStyleSets, Stack } from "@fluentui/react";
import PdfViewerComponent from "./PdfViewerComponent";

const classNames = mergeStyleSets({
  audioClass: {
    width: "auto",
  },
});

const docContent = {
  root: {
    maxWidth: 720,
    width: "100vw",
    height: "calc(100vh - 100px)",
    margin: "auto",
    backgroundColor: "white",
  },
};

const musicContent = {
  root: {
    maxWidth: 720,
    width: "100vw",
    height: "calc(100vh - 130px)",
    margin: "auto",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
  },
};

const photoContent = {
  root: {
    maxWidth: 720,
    width: "100vw",
    height: "calc(100vh - 130px)",
    margin: "auto",
  },
};

const imageStyle = {
  root: {
    maxWidth: 720,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
  },
};

export default function ContentFile(props) {
  const { type, data } = props;
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (type && data) {
      setUrl(`data:${type};base64,${data}`);
    }
  }, [type, data]);

  if (type === TYPE_FILE[0].type) {
    return (
      <Stack styles={docContent}>
        <PdfViewerComponent data={data} type={type} />
      </Stack>
    );
  }

  if (type === TYPE_FILE[1].type) {
    return (
      <Stack styles={musicContent}>
        <audio className={classNames.audioClass} controls src={url} />
      </Stack>
    );
  }

  if (type === TYPE_FILE[2].type) {
    return (
      <Stack styles={photoContent}>
        <ImageBase styles={imageStyle} src={url} loading='lazy' />
      </Stack>
    );
  }

  if (type === TYPE_FILE[3].type) {
    return (
      <Stack styles={photoContent}>
        <video width='100%' height='100%' src={url} controls />
      </Stack>
    );
  }

  return null;
}
ContentFile.propTypes = {
  type: PropTypes.string,
  data: PropTypes.string,
};
ContentFile.defaultProps = {
  type: undefined,
  data: undefined,
};
