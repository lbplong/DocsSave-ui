/** @format */

import {
  mergeStyleSets,
  SelectionMode,
  ShimmeredDetailsList,
  Stack,
  Text,
} from "@fluentui/react";
import React from "react";
import { LIGHT_THEME } from "../../constants";
import PropTypes from "prop-types";
import CustomPagination from "./CustomPagination";
const titleStyles = {
  root: {
    marginTop: 16,
    marginBottom: 8,
  },
};

const classNames = mergeStyleSets({
  listWrapper: {
    position: "relative",
  },
  cellAction: {
    padding: "0 !important",
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
  },
  changeBgUserList: {
    backgroundColor: LIGHT_THEME.palette.grayLight,
  },
  width100: {
    div: {
      "div.ms-GroupedList": {
        width: "100%",
      },
    },
  },
});

export default function CustomDetailListGroup(props) {
  const {
    title,
    isPagination,
    pagingOptions,
    items,
    columns,
    groups,
    groupProps,
  } = props;

  const baseDetailList = (
    <ShimmeredDetailsList
      items={items}
      groups={groups}
      columns={columns}
      selectionMode={SelectionMode.none}
      groupProps={groupProps}
    />
  );
  return (
    <Stack>
      {title && (
        <Text variant='xLarge' block styles={titleStyles}>
          {title}
        </Text>
      )}
      <div className={classNames.listWrapper}>{baseDetailList}</div>
      {isPagination ? <CustomPagination {...pagingOptions} /> : null}
    </Stack>
  );
}
CustomDetailListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  isPagination: PropTypes.bool,
  pagingOptions: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
    onChangePageSize: PropTypes.func,
    onChangePageIndex: PropTypes.func,
  }),
  groupProps: PropTypes.object,
};
CustomDetailListGroup.defaultProps = {
  title: undefined,
  isPagination: false,
  pagingOptions: undefined,
  groupProps: undefined,
};
