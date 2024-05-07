/** @format */

import React, { useEffect, useState } from "react";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import CustomDetailList from "../../../components/layoutComponent/CustomDetailList";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";
import { ROWS_PER_PAGE } from "../../../constants";
import folderColumnInViewMyShareSchema from "../columnsMyShareSchema/folderColumnInViewMyShareSchema";
import PropTypes from "prop-types";

export default function DisplayFolder(props) {
  const { parentId, selectFolder } = props;

  const [folders, setFolders] = useState(undefined);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
    pageSize: ROWS_PER_PAGE.TEN,
  });

  const _getFolders = async () => {
    const data = {
      parentId: parentId,
      ...pagination,
    };
    const folders = await DirectoryApi.getFolderByParentId(data);
    if (!folders.isAxiosError) {
      const { items, totalPages } = folders.data;

      setFolders(items);
      setPagination({ ...pagination, totalPages });
    }
  };

  const _handleChangePageIndex = async page => {
    const data = {
      parentId: parentId,
      ...pagination,
      page,
    };

    const folders = await DirectoryApi.getFolderByParentId(data);
    if (!folders.isAxiosError) {
      const { items, totalPages } = folders.data;
      setFolders(items);
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
    const folders = await DirectoryApi.getFolderByParentId(data);
    if (!folders.isAxiosError) {
      const { items, totalPages } = folders.data;
      setFolders(items);
      setPagination({ pageSize, page: 0, totalPages });
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
          columns={folderColumnInViewMyShareSchema(selectFolder, _getFolders)}
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
          subTitle='Please add content to this folder!'
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
DisplayFolder.propTypes = {
  parentId: PropTypes.string,
  selectFolder: PropTypes.func,
};
DisplayFolder.defaultProps = {
  parentId: undefined,
  selectFolder: undefined,
};
