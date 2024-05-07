/** @format */

import AxiosPort from "./../AxiosPort";

class DirectoryApi {
  getFolderByParentId = query => {
    const url = `directories/${query.parentId}?page=${query.page}&pageSize=${query.pageSize}`;
    return AxiosPort.get(url);
  };

  getFolderTreeByFolderId(selectFolderId) {
    const url = `directories/folder-tree/${selectFolderId}`;
    return AxiosPort.get(url);
  }

  createFolder = data => {
    const url = `directories`;
    return AxiosPort.post(url, data);
  };

  deleteDirectory = directoryId => {
    const url = `directories/deleted/${directoryId}`;
    return AxiosPort.delete(url);
  };

  addToFavorite = data => {
    const url = `directories/add-favorite`;
    return AxiosPort.post(url, data);
  };

  addFolderToShare = data => {
    const url = `directories/add-to-share`;
    return AxiosPort.post(url, data);
  };

  getListShareFolderTree = selectFolderId => {
    const url = `directories/share-tree/${selectFolderId}`;
    return AxiosPort.get(url);
  };

  getFolderInShare = data => {
    const url = `directories/shares-with-me/${data.directoryId}?page=${data.page}&pageSize=${data.pageSize}`;
    return AxiosPort.get(url);
  };

  removeDirectoryInShareFromCustomer = directoryId => {
    const url = `directories/customer-delete-share/${directoryId}`;
    return AxiosPort.delete(url);
  };

  getListFavoriteFolderTree = directoryId => {
    const url = `directories/favorite-tree/${directoryId}`;
    return AxiosPort.get(url);
  };

  getFolderInFavorite = data => {
    const url = `directories/favorites/${data.directoryId}?page=${data.page}&pageSize=${data.pageSize}`;
    return AxiosPort.get(url);
  };

  removeDirectoryInFavorite = id => {
    const url = `directories/delete-favorite/${id}`;
    return AxiosPort.delete(url);
  };

  getFolderInMyShare = parentId => {
    const url = `directories/my-share/${parentId}`;
    return AxiosPort.get(url);
  };

  recallShare = data => {
    const url = `directories/owner-delete-share/${data.directoryId}?receiverEmail=${data.receiverEmail}`;
    return AxiosPort.delete(url);
  };

  getDirectoryInfo = id => {
    const url = `directories/info/${id}`;
    return AxiosPort.get(url);
  };

  getFolderTreeInMyShare = data => {
    const url = `directories/my-share-tree/${data.selectFolderId}?selectId=${data.selectedFolderId}`;
    return AxiosPort.get(url);
  };

  searchFolderWithKeyWord = data => {
    const url = `search/${data.fileType}?keySearch=${data.keySearch}&page=${data.page}&pageSize=${data.pageSize}`;
    return AxiosPort.get(url);
  };
}
export default new DirectoryApi();
