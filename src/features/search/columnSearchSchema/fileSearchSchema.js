/** @format */

import { Icon, mergeStyleSets, Stack, Text } from "@fluentui/react";
import FileBiz from "../../../biz/FileBiz";
import CustomIconButton from "../../../components/CustomIconButton";
import { PAGE_PATHS, TYPE_FILE } from "../../../constants";

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
    <Text variant='medium'>{item.name}</Text>
  </Stack>
);

const _getFileMenuProps = (row, selectViewFolder) => {
  const result = {
    items: [
      {
        key: "view",
        text: "View This File",
        href: `/${PAGE_PATHS.VIEW_FILE}/${row.id}`,
        target: "_blank",
      },
      {
        key: "view",
        text: "View This Folder",
        onClick: () => selectViewFolder(row),
      },
    ],
    directionalHint: 6,
  };
  return result;
};

const _renderActionsBtn = (item, selectViewFolder) => {
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
      menuProps={_getFileMenuProps(item, selectViewFolder)}
    />
  );
};

const fileSearchSchema = selectViewFolder => [
  {
    key: "name",
    name: "Name",
    fieldName: "name",
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
    onRender: item => _renderActionsBtn(item, selectViewFolder),
  },
];
export default fileSearchSchema;
