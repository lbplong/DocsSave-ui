/** @format */

import { Icon, Stack, Link, mergeStyleSets } from "@fluentui/react";
import FileApi from "../../../API/ModuleAPI/FileApi";
import FileBiz from "../../../biz/FileBiz";
import CustomIconButton from "../../../components/CustomIconButton";
import { PAGE_PATHS, TYPE_FILE } from "../../../constants";
import { success } from "../../../components/ToastMessage";
import CustomText from "../../../components/CustomText";

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

const _renderNameColumn = item => (
  <Stack horizontal verticalAlign='center'>
    <Icon
      iconName={TYPE_FILE.filter(i => i.type === item.type)[0].iconName}
      styles={{ root: { width: 36, height: 36 } }}
    />
    <Link
      href={`/${PAGE_PATHS.VIEW_FILE}/${item.id}`}
      target='_blank'
      styles={{ root: { paddingLeft: 20 } }}>
      {item.name}
    </Link>
  </Stack>
);

const _renderActionsBtn = (item, refreshFile, onShareFile) => {
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
      menuProps={_getFileMenuProps(item, refreshFile, onShareFile)}
    />
  );
};

const _onDeleteFile = async (row, refreshFile) => {
  const { id } = row;

  const deleteFileResponse = await FileApi.deleteFileById(id);

  if (deleteFileResponse.isAxiosError) {
    window.alert(deleteFileResponse.response.data.message, {
      title: "Delete file failed",
    });
  } else {
    success("Delete file successfully");
    refreshFile();
  }
};

const _onAddFavorite = async row => {
  const data = { fileId: row?.id };
  const addFavoriteResult = await FileApi.addToFavorite(data);
  if (addFavoriteResult.isAxiosError) {
    window.alert(addFavoriteResult.response.data.message, {
      title: "Add to favorite failed",
    });
  } else {
    success("Add to favorite successfully");
  }
};

const _getFileMenuProps = (row, refreshFile, onShareFile) => {
  const result = {
    items: [
      {
        key: "share-folder",
        text: "Share this file",
        onClick: () => onShareFile(row),
      },
      {
        key: "add-to-favorite",
        text: "Add to Favorite",
        onClick: () => _onAddFavorite(row),
      },
      {
        key: "delete",
        text: <CustomText color='textDanger'>Delete File</CustomText>,
        onClick: () => _onDeleteFile(row, refreshFile),
      },
    ],
    directionalHint: 6,
  };
  return result;
};

const fileColumnSchema = (refreshFile, onShareFile) => [
  {
    key: "displayName",
    name: "Name",
    fieldName: "displayName",
    minWidth: 250,
    iaSorted: true,
    isSortedDescending: true,
    isResizable: true,
    onRender: item => _renderNameColumn(item),
  },
  {
    key: "size",
    name: "Size",
    fieldName: "size",
    minWidth: 80,
    maxWidth: 90,
    isRowHeader: true,
    isResizable: true,
    isSortable: true,
    isCollapsible: true,
    data: "string",
    onRender: item => FileBiz.formatSize(item.size),
  },
  {
    key: "actions",
    name: "",
    fieldName: "actions",
    minWidth: 35,
    className: classNames.cellAction,
    onRender: item => _renderActionsBtn(item, refreshFile, onShareFile),
  },
];

export default fileColumnSchema;
