/** @format */

import { FontWeights, Stack, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DirectoryApi from "../../API/ModuleAPI/DirectoryApi";
import FileApi from "../../API/ModuleAPI/FileApi";
import { PAGE_PATHS, ROWS_PER_PAGE, TYPE_FILE_NAME } from "../../constants";
import EmptySearch from "./Components/EmptySearch";
import ListResult from "./Components/ListResult";
import ListResultFolder from "./Components/ListResultFolder";

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

export default function Search() {
  const [searchParams] = useSearchParams();
  const [docSearch, setDocSearch] = useState({ items: undefined, total: 0 });
  const [movieSearch, setMovieSearch] = useState({
    items: undefined,
    total: 0,
  });
  const [photoSearch, setPhotoSearch] = useState({
    items: undefined,
    total: 0,
  });
  const [musicSearch, setMusicSearch] = useState({
    items: undefined,
    total: 0,
  });
  const [folderSearch, setFolderSearch] = useState({
    items: undefined,
    total: 0,
  });

  const [pagination] = useState({
    page: 0,
    totalPages: 1,
    pageSize: ROWS_PER_PAGE.FIVE,
  });

  const keySearch = searchParams.get("q");

  const history = useNavigate();

  const _getResultDoc = async () => {
    const data = {
      keySearch,
      fileType: TYPE_FILE_NAME.DOCUMENT,
      ...pagination,
    };
    const docResult = await FileApi.searchFileWithKeyWord(data);
    if (!docResult.isAxiosError) {
      setDocSearch({
        items: docResult.data.items,
        total: docResult.data.totalRows,
      });
    }
  };

  const _getResultMusic = async () => {
    const data = {
      keySearch,
      fileType: TYPE_FILE_NAME.MUSIC,
      ...pagination,
    };
    const musicResult = await FileApi.searchFileWithKeyWord(data);
    if (!musicResult.isAxiosError) {
      setMusicSearch({
        items: musicResult.data.items,
        total: musicResult.data.totalRows,
      });
    }
  };

  const _getResultPhoto = async () => {
    const data = {
      keySearch,
      fileType: TYPE_FILE_NAME.PHOTO,
      ...pagination,
    };
    const photoResult = await FileApi.searchFileWithKeyWord(data);
    if (!photoResult.isAxiosError) {
      setPhotoSearch({
        items: photoResult.data.items,
        total: photoResult.data.totalRows,
      });
    }
  };

  const _getResultMovie = async () => {
    const data = {
      keySearch,
      fileType: TYPE_FILE_NAME.MOVIE,
      ...pagination,
    };
    const movieResult = await FileApi.searchFileWithKeyWord(data);
    if (!movieResult.isAxiosError) {
      setMovieSearch({
        items: movieResult.data.items,
        total: movieResult.data.totalRows,
      });
    }
  };

  const _getResultFolder = async () => {
    const data = {
      keySearch,
      fileType: TYPE_FILE_NAME.FOLDER,
      ...pagination,
    };
    const folderResult = await DirectoryApi.searchFolderWithKeyWord(data);
    if (!folderResult.isAxiosError) {
      setFolderSearch({
        items: folderResult.data.items,
        total: folderResult.data.totalRows,
      });
    }
  };

  const _getResultInSearch = () => {
    _getResultDoc();
    _getResultMusic();
    _getResultPhoto();
    _getResultMovie();
    _getResultFolder();
  };

  useEffect(() => {
    _getResultInSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySearch]);

  const _handelViewAll = fileType => {
    history(`/${PAGE_PATHS.SEARCH_ALL}/${fileType}?keySearch=${keySearch}`);
  };

  if (
    docSearch.items?.length ||
    musicSearch.items?.length ||
    photoSearch.items?.length ||
    movieSearch.items?.length ||
    folderSearch.items?.length
  ) {
    return (
      <>
        <Stack horizontal horizontalAlign='center' styles={stackWrapperStyles}>
          <br />
          <Text block variant='xLarge' styles={boldText}>
            {`Search for: ${keySearch}`}
          </Text>
        </Stack>
        {docSearch.items?.length && (
          <ListResult
            keySearch={keySearch}
            items={docSearch?.items}
            fileType={TYPE_FILE_NAME.DOCUMENT}
            viewAllButtonProps={{
              onClick: () => _handelViewAll(TYPE_FILE_NAME.DOCUMENT),
              text: `View All (${docSearch?.total})`,
            }}
          />
        )}
        {musicSearch.items?.length && (
          <ListResult
            keySearch={keySearch}
            items={musicSearch?.items}
            fileType={TYPE_FILE_NAME.MUSIC}
            viewAllButtonProps={{
              onClick: () => _handelViewAll(TYPE_FILE_NAME.MUSIC),
              text: `View All (${musicSearch?.total})`,
            }}
          />
        )}
        {photoSearch.items?.length && (
          <ListResult
            keySearch={keySearch}
            items={photoSearch?.items}
            fileType={TYPE_FILE_NAME.PHOTO}
            viewAllButtonProps={{
              onClick: () => _handelViewAll(TYPE_FILE_NAME.PHOTO),
              text: `View All (${photoSearch?.total})`,
            }}
          />
        )}
        {movieSearch.items?.length && (
          <ListResult
            keySearch={keySearch}
            items={movieSearch?.items}
            fileType={TYPE_FILE_NAME.MOVIE}
            viewAllButtonProps={{
              onClick: () => _handelViewAll(TYPE_FILE_NAME.MOVIE),
              text: `View All (${movieSearch?.total})`,
            }}
          />
        )}
        {folderSearch.items?.length && (
          <ListResultFolder
            keySearch={keySearch}
            items={folderSearch?.items}
            fileType={TYPE_FILE_NAME.FOLDER}
            viewAllButtonProps={{
              onClick: () => _handelViewAll(TYPE_FILE_NAME.FOLDER),
              text: `View All (${folderSearch?.total})`,
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <EmptySearch
        title={`Search for: ${keySearch}`}
        subTitle='No responsive for you'
      />
    </>
  );
}
