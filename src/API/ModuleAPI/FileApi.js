/** @format */

import AxiosPort from "./../AxiosPort";

class FileApi {
  createNewFile = (fileData, directoryId) => {
    const url = `files/upload/${directoryId}`;
    return AxiosPort.post(url, fileData);
  };

  getFileByParentId = data => {
    const url = `files/${data.parentId}?page=${data.page}&pageSize=${data.pageSize}`;
    return AxiosPort.get(url);
  };

  deleteFileById = id => {
    const url = `files/delete/${id}`;
    return AxiosPort.delete(url);
  };

  addToFavorite = data => {
    const url = `files/add-favorite`;
    return AxiosPort.post(url, data);
  };

  addFileToShare = data => {
    const url = `files/add-to-share`;
    return AxiosPort.post(url, data);
  };

  getShareFileByParentId = data => {
    const url = `files/shares-with-me/${data.parentId}?page=${data.page}&pageSize=${data.pageSize}`;
    return AxiosPort.get(url);
  };

  removeFileInShareFromCustomer = id => {
    const url = `files/customer-delete-share/${id}`;
    return AxiosPort.delete(url);
  };

  getFavoriteFileByParentId = data => {
    const url = `files/favorites/${data.parentId}?page=${data.page}&pageSize=${data.pageSize}`;
    return AxiosPort.get(url);
  };

  removeFileInFavorites = id => {
    const url = `files/delete-favorites/${id}`;
    return AxiosPort.delete(url);
  };

  getListFileInMyShare = parentId => {
    const url = `files/my-share/${parentId}`;
    return AxiosPort.get(url);
  };

  recallShare = data => {
    const url = `files/owner-remove-share/${data.fileId}?receiverEmail=${data.receiverEmail}`;
    return AxiosPort.delete(url);
  };

  searchFileWithKeyWord = data => {
    const url = `search/${data.fileType}?keySearch=${data.keySearch}&page=${data.page}&pageSize=${data.pageSize}`;
    return AxiosPort.get(url);
  };

  getFileAsBytes = id => {
    const url = `views/file/${id}`;
    return AxiosPort.get(url);
  };
}

export default new FileApi();
