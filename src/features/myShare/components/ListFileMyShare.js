/** @format */

import React, { useEffect, useState } from "react";
import CustomDetailListGroup from "../../../components/layoutComponent/CustomDetailListGroup";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";
import PropTypes from "prop-types";
import FileApi from "../../../API/ModuleAPI/FileApi";
import MyShareFileColumnSchema from "../columnsMyShareSchema/MyShareFileColumnSchema";
import AppUtil from "../../../constants/utilService/AppUtil";
import { Icon, Link, Stack } from "@fluentui/react";
import { LIGHT_THEME, PAGE_PATHS, TYPE_FILE } from "../../../constants";

const headerGroupStyle = {
  root: {
    padding: 5,
    borderBottom: `1px solid ${LIGHT_THEME.palette.neutralQuaternaryAlt}`,
    "&:hover": {
      backgroundColor: LIGHT_THEME.palette.themeLighterAlt,
    },
  },
};

export default function ListFileMyShare(props) {
  const [files, setFiles] = useState();

  const { parentId } = props;

  const _getFiles = async () => {
    const filesResult = await FileApi.getListFileInMyShare(parentId);
    if (!filesResult.isAxiosError) {
      const { data } = filesResult;
      setFiles(data);
    }
  };

  const _onToggleCollapse = props => {
    return () => {
      props.onToggleCollapse(props.group);
    };
  };

  const _onRenderGroupHeader = props => {
    if (props) {
      console.log(props);
      return (
        <Stack
          styles={headerGroupStyle}
          horizontal
          verticalAlign='center'
          horizontalAlign='space-between'>
          <Stack horizontal verticalAlign='center'>
            <Icon
              iconName={
                TYPE_FILE.filter(
                  i => i.type === props.selection?._items[0].type
                )[0].iconName || "folder-svg"
              }
              styles={{ root: { width: 36, height: 36 } }}
            />
            <Link
              href={`/${PAGE_PATHS.VIEW_FILE}/${props.group.key}`}
              styles={{ root: { paddingLeft: 20 } }}>
              {props.group.name}
            </Link>
          </Stack>

          <Link onClick={_onToggleCollapse(props)}>View Receiver</Link>
        </Stack>
      );
    }
  };

  useEffect(() => {
    parentId && _getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  return (
    <>
      {files?.length > 0 ? (
        <CustomDetailListGroup
          items={files}
          columns={MyShareFileColumnSchema(_getFiles)}
          groups={AppUtil.convertItemToGroup(files)}
          groupProps={{
            onRenderHeader: _onRenderGroupHeader,
          }}
        />
      ) : (
        <EmptyContent
          title='This folder is empty'
          subTitle='You have not shared any file with anyone!'
          imageProps={{
            src: "/img/group-105.png",
            srcSet: "/img/group-105-2x.png 2x, /img/group-105-3x.png 3x",
            alt: "Empty data room content",
            width: 376,
            height: 280,
          }}
        />
      )}
    </>
  );
}
ListFileMyShare.propTypes = {
  parentId: PropTypes.string,
};
ListFileMyShare.defaultProps = {
  parentId: undefined,
};
