/** @format */

import { mergeStyleSets, Persona, PersonaSize, Stack } from "@fluentui/react";
import FileApi from "../../../API/ModuleAPI/FileApi";
import FileBiz from "../../../biz/FileBiz";
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

const renderNameColumn = item => (
  <Stack horizontal verticalAlign='center'>
    <Persona
      text={item.receiver}
      size={PersonaSize.size48}
      styles={{ root: { cursor: "pointer" } }}
    />
  </Stack>
);

const _onRemoveShare = async (row, refreshFolders) => {
  const { id, email } = row;
  const data = {
    fileId: id,
    receiverEmail: email,
  };

  const recallShare = await FileApi.recallShare(data);

  if (recallShare.isAxiosError) {
    window.alert(recallShare.response.data.message, {
      title: "Remove this share failed",
    });
  } else {
    success("Remove this share successfully");
    refreshFolders();
  }
};

const _getFolderMenuProps = (row, refreshFolders) => {
  const result = {
    items: [
      {
        key: "delete",
        text: <CustomText color='textDanger'>Recall Share</CustomText>,
        onClick: () => _onRemoveShare(row, refreshFolders),
      },
    ],
    directionalHint: 6,
  };
  return result;
};

const _renderActionsBtn = (item, refreshFolders) => {
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
      menuProps={_getFolderMenuProps(item, refreshFolders)}
    />
  );
};

const MyShareFileColumnSchema = refreshFile => [
  {
    key: "receiver",
    name: "Receiver",
    fieldName: "receiver",
    minWidth: 250,
    iaSorted: true,
    isSortedDescending: true,
    isResizable: true,
    onRender: item => renderNameColumn(item),
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
    onRender: item => _renderActionsBtn(item, refreshFile),
  },
];
export default MyShareFileColumnSchema;
