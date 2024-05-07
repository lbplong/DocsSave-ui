/** @format */

import { Dropdown, Icon, makeStyles, Stack, Text } from "@fluentui/react";
import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { LIGHT_THEME, ROWS_PER_PAGE } from "../../constants";

const useStyles = makeStyles({
  container: {
    display: "flex",
    paddingLeft: 0,
    listStyle: "none",
    justifyContent: "flex-end",
  },
  pageItem: {
    boxSizing: "border-box",
    display: "list-item",
    cursor: "pointer",
  },
  btnStyle: {
    padding: "4px 10px",
    border: `1px solid ${LIGHT_THEME.palette.neutralQuaternaryAlt}`,
    color: LIGHT_THEME.semanticColors.buttonText,
    borderRadius: 2,
  },
  linkPage: {
    marginLeft: 2,
    marginRight: 2,
  },
  prevLinkBtn: {
    marginRight: 2,
  },
  nextLinkBtn: {
    marginLeft: 2,
  },
  nextPrevBtnCursor: {
    cursor: "pointer",
  },
  active: {
    borderColor: LIGHT_THEME.palette.themePrimary,
    color: LIGHT_THEME.palette.themePrimary,
  },
  disable: {
    borderColor: LIGHT_THEME.palette.gray,
    color: LIGHT_THEME.palette.gray,
    cursor: "not-allowed",
  },
});

const getKeyByPageSize = pageSize => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(ROWS_PER_PAGE)) {
    if (value === pageSize) {
      return key;
    }
  }

  return undefined;
};

export default function CustomPagination({
  page,
  pageSize,
  totalPages,
  onChangePageSize,
  onChangePageIndex,
}) {
  const classes = useStyles();

  return (
    <Stack horizontal horizontalAlign='space-between'>
      <Stack horizontal verticalAlign='center'>
        <Text className='ms-hiddenMdDown' styles={{ root: { marginRight: 8 } }}>
          Rows per page
        </Text>
        <Dropdown
          name='page-size'
          options={Object.keys(ROWS_PER_PAGE).map(i => ({
            key: i,
            text: ROWS_PER_PAGE[i],
          }))}
          onChange={(_, value) =>
            onChangePageSize && onChangePageSize(value.text)
          }
          styles={{
            root: { minWidth: 60 },
            title: { height: 30, lineHeight: 28 },
          }}
          selectedKey={getKeyByPageSize(pageSize)}
        />
      </Stack>
      <Stack.Item>
        <ReactPaginate
          breakLabel='...'
          forcePage={page}
          nextLabel={
            <Icon iconName='ChevronRight' styles={{ root: { fontSize: 12 } }} />
          }
          onPageChange={pageSelected =>
            onChangePageIndex && onChangePageIndex(pageSelected.selected)
          }
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          pageCount={totalPages}
          previousLabel={
            <Icon iconName='ChevronLeft' styles={{ root: { fontSize: 12 } }} />
          }
          renderOnZeroPageCount={null}
          containerClassName={classes.container}
          pageClassName={classes.pageItem}
          pageLinkClassName={`${classes.btnStyle} ${classes.linkPage}`}
          previousLinkClassName={`${classes.prevLinkBtn} ${classes.btnStyle}`}
          nextLinkClassName={`${classes.nextLinkBtn} ${classes.btnStyle}`}
          nextClassName={classes.nextPrevBtnCursor}
          previousClassName={classes.nextPrevBtnCursor}
          activeLinkClassName={classes.active}
          disabledLinkClassName={classes.disable}
          breakClassName={classes.pageItem}
          breakLinkClassName={`${classes.btnStyle} ${classes.linkPage}`}
        />
      </Stack.Item>
    </Stack>
  );
}
CustomPagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  onChangePageIndex: PropTypes.func.isRequired,
  onChangePageSize: PropTypes.func.isRequired,
};

CustomPagination.defaultProps = {
  pageSize: 5,
};
