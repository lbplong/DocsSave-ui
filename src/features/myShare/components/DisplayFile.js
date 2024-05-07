/** @format */

import React, { useEffect, useState } from "react";
import CustomDetailList from "../../../components/layoutComponent/CustomDetailList";
import fileColumnInViewMyShareSchema from "../columnsMyShareSchema/fileColumnInViewMyShareSchema";
import PropTypes from "prop-types";
import { ROWS_PER_PAGE } from "../../../constants";
import FileApi from "../../../API/ModuleAPI/FileApi";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";

export default function DisplayFile(props) {
  const { parentId } = props;
  const [files, setFiles] = useState(undefined);
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

  return (
    <>
      {files?.length > 0 ? (
        <CustomDetailList
          striped
          items={files}
          columns={fileColumnInViewMyShareSchema}
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
        />
      )}
    </>
  );
}
DisplayFile.propTypes = {
  parentId: PropTypes.string.isRequired,
};
