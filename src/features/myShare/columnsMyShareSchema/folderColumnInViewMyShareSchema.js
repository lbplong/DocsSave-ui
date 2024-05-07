/** @format */

import { Icon, Link, Stack } from "@fluentui/react";

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

const folderColumnInViewMyShareSchema = selectFolder => [
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
];
export default folderColumnInViewMyShareSchema;
