/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stack } from "@fluentui/react";
import CustomDetailList from "../../../components/layoutComponent/CustomDetailList";
import CustomPagination from "../../../components/layoutComponent/CustomPagination";
import CustomButton from "../../../components/CustomButton";
import folderSearchSchema from "../columnSearchSchema/folderSearchSchema";
import CustomModal from "../../../components/modals";
import { MODEL_NAME } from "../../../constants";
import ContentViewSearch from "./ContentViewSearch";

const listSearchStyle = {
  root: {
    width: "100%",
    maxWidth: 720,
    margin: "auto",
  },
};

export default function ListResultFolder(props) {
  const { items, fileType, viewAllButtonProps, isPagination, pagingOptions } =
    props;

  const [modalName, setModalName] = useState("");
  const [titleModel, setTitleModel] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("");

  const _selectViewFolder = row => {
    setTitleModel(row.name);
    setSelectedFolderId(row.id);
    _onToggleModel(MODEL_NAME.VIEW_FOLDER_IN_MY_SHARE);
  };

  const _onToggleModel = (value = "") => {
    setModalName(value);
  };

  const _onDismissModal = () => {
    _onToggleModel();
    setTitleModel("");
    setSelectedFolderId("");
  };

  return (
    <Stack styles={listSearchStyle}>
      {fileType}
      <CustomDetailList
        striped
        isHeaderVisible={false}
        items={items}
        columns={folderSearchSchema(_selectViewFolder)}
      />
      <CustomModal
        isOpen={modalName === MODEL_NAME.VIEW_FOLDER_IN_MY_SHARE}
        onDismiss={_onDismissModal}
        title={`View folder: ${titleModel}`}>
        <ContentViewSearch selectedFolderId={selectedFolderId} isFolder />
      </CustomModal>
      {isPagination ? <CustomPagination {...pagingOptions} /> : null}
      {viewAllButtonProps && (
        <CustomButton
          size='medium'
          styles={{ root: { width: 150, margin: "auto" } }}
          {...viewAllButtonProps}
        />
      )}
    </Stack>
  );
}
ListResultFolder.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  typeFile: PropTypes.string,
  viewAllButtonProps: PropTypes.object,
  isPagination: PropTypes.bool,
  pagingOptions: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
    onChangePageSize: PropTypes.func,
    onChangePageIndex: PropTypes.func,
  }),
};
ListResultFolder.defaultProps = {
  viewAllButtonProps: undefined,
  title: undefined,
  totalItem: 0,
  isPagination: false,
  pagingOptions: undefined,
};
