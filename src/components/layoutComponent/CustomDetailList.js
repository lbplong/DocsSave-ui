/** @format */

import {
  mergeStyleSets,
  SelectionMode,
  ShimmeredDetailsList,
  Stack,
  Text,
} from "@fluentui/react";
import React from "react";
import PropTypes from "prop-types";
import { LIGHT_THEME } from "../../constants";
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

export default function CustomDetailList(props) {
  const {
    title,
    isPagination,
    pagingOptions,
    items,
    columns,
    isHeaderVisible,
  } = props;

  const baseDetailList = (
    <ShimmeredDetailsList
      isHeaderVisible={isHeaderVisible}
      items={items}
      columns={columns}
      selectionMode={SelectionMode.none}
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
CustomDetailList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  isPagination: PropTypes.bool,
  pagingOptions: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
    onChangePageSize: PropTypes.func,
    onChangePageIndex: PropTypes.func,
  }),
  isHeaderVisible: PropTypes.bool,
};
CustomDetailList.defaultProps = {
  title: undefined,
  isPagination: false,
  pagingOptions: undefined,
  isHeaderVisible: true,
};
