/** @format */

import React, { useEffect, useRef, useState } from "react";

import { IconButton, Stack } from "@fluentui/react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewerComponent(props) {
  const { type, data } = props;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const _nextPage = () => {
    if (numPages > pageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  const _prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <>
      <Stack
        styles={{
          root: { position: "relative", display: "flex", alignItems: "center" },
        }}>
        <IconButton
          onClick={_nextPage}
          iconProps={{ iconName: "Send" }}
          styles={{
            root: {
              position: "absolute",
              top: "50%",
              right: 0,
            },
          }}
        />
        <IconButton
          onClick={_prevPage}
          iconProps={{ iconName: "Send" }}
          styles={{
            root: {
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "rotate(180deg)",
            },
          }}
        />
        <Document
          file={`data:${type};base64,${data}`}
          onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Stack>
      Page {pageNumber} of {numPages}
    </>
  );
}
