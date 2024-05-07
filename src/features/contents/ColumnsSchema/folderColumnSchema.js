/** @format */

import { Icon, Link, mergeStyleSets, Stack } from "@fluentui/react";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import CustomIconButton from "../../../components/CustomIconButton";
import CustomText from "../../../components/CustomText";
import { success } from "../../../components/ToastMessage";

const renderNameColumn = (item, selectFolder) => (
  <Stack horizontal verticalAlign='center'>
    <Icon iconName='folder-svg' styles={{ root: { width: 36, height: 36 } }} />{" "}
    <Link
      onClick={() => selectFolder(item.id)}
      styles={{ root: { paddingLeft: 20 } }}>
      {item.name}
    </Link>
  </Stack>
);

const classNames = mergeStyleSets({
  listWrapper: {
    position: "relative",
    marginBottom: 30,
  },
  cellAction: {
    padding: "0 !important",
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
  },
  width100: {
    div: {
      "div.ms-GroupedList": {
        width: "100%",
      },
    },
  },
});

const _onDeleteFolder = async (row, refreshFolders) => {
  const { id } = row;
  const deleteFolderResult = await DirectoryApi.deleteDirectory(id);

  if (deleteFolderResult.isAxiosError) {
    window.alert(deleteFolderResult.response.data.message, {
      title: "Delete folder failed",
    });
  } else {
    success("Delete folder successfully");
    refreshFolders();
  }
};

const _onAddFavorite = async row => {
  const data = { directoryId: row?.id };
  const addFavoriteResult = await DirectoryApi.addToFavorite(data);
  if (addFavoriteResult.isAxiosError) {
    window.alert(addFavoriteResult.response.data.message, {
      title: "Add to favorite failed",
    });
  } else {
    success("Add to favorite successfully");
  }
};

const _getFolderMenuProps = (row, refreshFolders, onShareFolder) => {
  const result = {
    items: [
      {
        key: "share-folder",
        text: "Share this folder",
        onClick: () => onShareFolder(row),
      },
      {
        key: "add-to-favorite",
        text: "Add to Favorite",
        onClick: () => _onAddFavorite(row),
      },
      {
        key: "delete",
        text: <CustomText color='textDanger'>Delete Folder</CustomText>,
        onClick: () => _onDeleteFolder(row, refreshFolders),
      },
    ],
    directionalHint: 6,
  };
  return result;
};

const _renderActionsBtn = (item, refreshFolders, onShareFolder) => {
  return (
    <CustomIconButton
      className='action-btn-overlay'
      styles={{
        root: { paddingRight: 28 },
        menuIcon: { width: 28 },
        rootHovered: {
          svg: { fill: "#363636" },
        },
      }}
      menuIconProps={{ iconName: "more-svg" }}
      title='Actions'
      ariaLabel='Actions'
      menuProps={_getFolderMenuProps(item, refreshFolders, onShareFolder)}
    />
  );
};

const folderColumnSchema = (selectFolder, refreshFolders, onShareFolder) => [
  {
    key: "name",
    name: "name",
    fieldName: "Name",
    minWidth: 250,
    iaSorted: true,
    isSortedDescending: true,
    isResizable: true,
    onRender: item => renderNameColumn(item, selectFolder),
  },
  {
    key: "actions",
    name: "",
    fieldName: "actions",
    minWidth: 35,
    className: classNames.cellAction,
    onRender: item => _renderActionsBtn(item, refreshFolders, onShareFolder),
  },
];

export default folderColumnSchema;
