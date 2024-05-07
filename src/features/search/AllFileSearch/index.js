/** @format */

import { FontWeights, Stack, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FileApi from "../../../API/ModuleAPI/FileApi";
import { ROWS_PER_PAGE, TYPE_FILE_NAME } from "../../../constants";
import EmptySearch from "../Components/EmptySearch";
import ListResult from "../Components/ListResult";
import ListResultFolder from "../Components/ListResultFolder";

const boldText = {
  root: {
    fontWeight: FontWeights.bold,
  },
};

const stackWrapperStyles = {
  root: {
    margin: 26,
  },
};

export default function AllFileSearch() {
  const { fileType } = useParams();
  const [searchParams] = useSearchParams();
  const keySearch = searchParams.get("keySearch");

  const [items, setItems] = useState(undefined);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
    pageSize: ROWS_PER_PAGE.TEN,
  });

  const _getFilesResultInSearch = async () => {
    const data = {
      keySearch,
      fileType,
      ...pagination,
    };
    const itemsResult = await FileApi.searchFileWithKeyWord(data);
    if (!itemsResult.isAxiosError) {
      const { items, totalPages } = itemsResult.data;
      setItems(items);
      setPagination({ ...pagination, totalPages });
    }
  };

  const _handleChangePageIndex = async page => {
    const data = {
      keySearch,
      fileType,
      ...pagination,
      page,
    };

    const itemsResult = await FileApi.searchFileWithKeyWord(data);
    if (!itemsResult.isAxiosError) {
      const { items, totalPages } = itemsResult.data;
      setItems(items);
      setPagination({ ...pagination, page, totalPages });
    }
  };

  const _handleChangePageSize = async pageSize => {
    const data = {
      keySearch,
      fileType,
      ...pagination,
      pageSize,
      page: 0,
    };

    const itemsResult = await FileApi.searchFileWithKeyWord(data);
    if (!itemsResult.isAxiosError) {
      const { items, totalPages } = itemsResult.data;
      setItems(items);
      setPagination({ pageSize, page: 0, totalPages });
    }
  };

  useEffect(() => {
    _getFilesResultInSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (items?.length) {
    return (
      <>
        <Stack horizontal horizontalAlign='center' styles={stackWrapperStyles}>
          <br />
          <Text block variant='xLarge' styles={boldText}>
            {`Search ${fileType} for: ${keySearch}`}
          </Text>
        </Stack>
        {fileType === TYPE_FILE_NAME.FOLDER ? (
          <ListResultFolder
            items={items}
            keySearch={keySearch}
            isPagination
            pagingOptions={{
              ...pagination,
              onChangePageIndex: page => _handleChangePageIndex(page),
              onChangePageSize: pageSize => _handleChangePageSize(pageSize),
            }}
          />
        ) : (
          <ListResult
            items={items}
            keySearch={keySearch}
            isPagination
            pagingOptions={{
              ...pagination,
              onChangePageIndex: page => _handleChangePageIndex(page),
              onChangePageSize: pageSize => _handleChangePageSize(pageSize),
            }}
          />
        )}
      </>
    );
  }
  return (
    <>
      <EmptySearch
        title={`Search ${fileType} for: ${keySearch}`}
        subTitle='No responsive for you'
      />
    </>
  );
}
