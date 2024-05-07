/** @format */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";
import CustomDetailList from "../../../components/layoutComponent/CustomDetailList";
import { ROWS_PER_PAGE } from "../../../constants";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import ShareFolderColumnSchema from "../columnsShareSchema/shareFolderColumnShema";

export default function ListFolderShare(props) {
  const { parentId, selectFolder } = props;
  const [folders, setFolders] = useState(undefined);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
    pageSize: ROWS_PER_PAGE.TEN,
  });

  const _handleChangePageIndex = async page => {
    const data = {
      directoryId: parentId,
      ...pagination,
      page,
    };

    const folders = await DirectoryApi.getFolderInShare(data);
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
    const folders = await DirectoryApi.getFolderInShare(data);
    if (!folders.isAxiosError) {
      const { items, totalPages } = folders.data;
      setFolders(items);
      setPagination({ pageSize, page: 0, totalPages });
    }
  };

  const _getFolders = async () => {
    const data = {
      directoryId: parentId,
      ...pagination,
    };
    const resultFolders = await DirectoryApi.getFolderInShare(data);
    if (!resultFolders.isAxiosError) {
      const { items, totalPages } = resultFolders.data;
      setFolders(items);
      setPagination({ ...pagination, totalPages });
    }
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
          columns={ShareFolderColumnSchema(selectFolder, _getFolders)}
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
    </>
  );
}
ListFolderShare.propTypes = {
  parentId: PropTypes.string,
  selectFolder: PropTypes.func,
};
ListFolderShare.defaultProps = {
  parentId: undefined,
  selectFolder: undefined,
};
