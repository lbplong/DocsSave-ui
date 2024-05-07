/** @format */

import React, { useEffect, useState } from "react";
import FileApi from "../../../API/ModuleAPI/FileApi";
import CustomDetailList from "../../../components/layoutComponent/CustomDetailList";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";
import { ROWS_PER_PAGE } from "../../../constants";
import shareFileColumnSchema from "../columnsShareSchema/shareFileColumnSchema";
import PropTypes from "prop-types";

export default function ListFileShare(props) {
  const { parentId } = props;
  const [files, setFiles] = useState(undefined);
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
    const filesResult = await FileApi.getShareFileByParentId(data);

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

    const filesResult = await FileApi.getShareFileByParentId(data);
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
    const filesResult = await FileApi.getShareFileByParentId(data);
    if (!filesResult.isAxiosError) {
      const { items, totalPages } = filesResult.data;
      setFiles(items);
      setPagination({ pageSize, page: 0, totalPages });
    }
  };

  useEffect(() => {
    parentId && _getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  return (
    <>
      {files?.length > 0 ? (
        <CustomDetailList
          striped
          items={files}
          columns={shareFileColumnSchema(_getFiles)}
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
    </>
  );
}
ListFileShare.propTypes = {
  parentId: PropTypes.string,
};
ListFileShare.defaultProps = {
  parentId: undefined,
};
