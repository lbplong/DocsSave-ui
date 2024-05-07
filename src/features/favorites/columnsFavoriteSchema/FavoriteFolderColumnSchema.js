/** @format */

import { Icon, Link, mergeStyleSets, Stack } from "@fluentui/react";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import CustomIconButton from "../../../components/CustomIconButton";
import CustomText from "../../../components/CustomText";
import { success } from "../../../components/ToastMessage";

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

const _onRemoveFavorite = async (row, refreshFolders) => {
  const { id } = row;
  const removeFolderResult = await DirectoryApi.removeDirectoryInFavorite(id);

  if (removeFolderResult.isAxiosError) {
    window.alert(removeFolderResult.response.data.message, {
      title: "Remove folder failed",
    });
  } else {
    success("Remove folder successfully");
    refreshFolders();
  }
};

const _getFolderMenuProps = (row, refreshFolders, onShareFolder) => {
  const result = {
    items: [
      {
        key: "add-to-share",
        text: "Share this folder",
        onClick: () => onShareFolder(row?.id),
      },
      {
        key: "delete",
        text: <CustomText color='textDanger'>Remove</CustomText>,
        onClick: () => _onRemoveFavorite(row, refreshFolders),
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

const FavoriteFolderColumnSchema = (
  selectFolder,
  refreshFolders,
  onShareFolder
) => [
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

export default FavoriteFolderColumnSchema;
