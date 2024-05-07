/** @format */

import { Icon, Link, Stack } from "@fluentui/react";
import FileBiz from "../../../biz/FileBiz";
import { PAGE_PATHS, TYPE_FILE } from "../../../constants";

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

const fileColumnInViewMyShareSchema = [
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
];
export default fileColumnInViewMyShareSchema;
