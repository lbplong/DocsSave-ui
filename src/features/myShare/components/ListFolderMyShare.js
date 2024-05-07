/** @format */

import React, { useEffect, useState } from "react";
import EmptyContent from "../../../components/layoutComponent/EmptyContent";
import PropTypes from "prop-types";
import DirectoryApi from "../../../API/ModuleAPI/DirectoryApi";
import CustomDetailListGroup from "../../../components/layoutComponent/CustomDetailListGroup";
import MyShareFolderColumnSchema from "../columnsMyShareSchema/MyShareFolderColumnSchema";
import { Icon, Stack, Link } from "@fluentui/react";
import AppUtil from "../../../constants/utilService/AppUtil";
import { LIGHT_THEME, MODEL_NAME } from "../../../constants";
import CustomModal from "../../../components/modals";
import ContentViewFolderShared from "./ContentViewFolderShared";

const headerGroupStyle = {
  root: {
    padding: 5,
    borderBottom: `1px solid ${LIGHT_THEME.palette.neutralQuaternaryAlt}`,
    "&:hover": {
      backgroundColor: LIGHT_THEME.palette.themeLighterAlt,
    },
  },
};

export default function ListFolderMyShare(props) {
  const { parentId } = props;
  const [folders, setFolders] = useState(undefined);
  const [modalName, setModalName] = useState("");
  const [titleModel, setTitleModel] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("");

  const _getFolders = async () => {
    const resultFolders = await DirectoryApi.getFolderInMyShare(parentId);
    if (!resultFolders.isAxiosError) {
      const { data } = resultFolders;
      setFolders(data);
    }
  };

  useEffect(() => {
    parentId && _getFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  const _onToggleCollapse = props => {
    return () => {
      props.onToggleCollapse(props.group);
    };
  };
  const _onSelectFolderToView = props => {
    setTitleModel(props.group?.name);
    setSelectedFolderId(props.group?.key);
    _onToggleModel(MODEL_NAME.VIEW_FOLDER_IN_MY_SHARE);
  };

  const _onToggleModel = (modelName = "") => {
    setModalName(modelName);
  };

  const _onRenderGroupHeader = props => {
    if (props) {
      return (
        <Stack
          styles={headerGroupStyle}
          horizontal
          verticalAlign='center'
          horizontalAlign='space-between'>
          <Stack horizontal verticalAlign='center'>
            <Icon
              iconName='folder-svg'
              styles={{ root: { width: 36, height: 36 } }}
            />
            <Link
              onClick={() => _onSelectFolderToView(props)}
              styles={{ root: { paddingLeft: 20 } }}>
              {props.group.name}
            </Link>
          </Stack>

          <Link onClick={_onToggleCollapse(props)}>View Receiver</Link>
        </Stack>
      );
    }
    return null;
  };

  return (
    <>
      {folders?.length > 0 ? (
        <CustomDetailListGroup
          items={folders}
          columns={MyShareFolderColumnSchema(_getFolders)}
          groups={AppUtil.convertItemToGroup(folders)}
          groupProps={{
            onRenderHeader: _onRenderGroupHeader,
          }}
        />
      ) : (
        <EmptyContent
          title='This folder is empty'
          subTitle='You have not shared any folder with anyone!'
          imageProps={{
            src: "/img/group-105.png",
            srcSet: "/img/group-105-2x.png 2x, /img/group-105-3x.png 3x",
            alt: "Empty data room content",
            width: 376,
            height: 280,
          }}
        />
      )}
      <CustomModal
        isOpen={modalName === MODEL_NAME.VIEW_FOLDER_IN_MY_SHARE}
        onDismiss={_onToggleModel}
        title={`View folder: ${titleModel}`}>
        <ContentViewFolderShared selectedFolderId={selectedFolderId} />
      </CustomModal>
    </>
  );
}
ListFolderMyShare.propTypes = {
  parentId: PropTypes.string,
};
ListFolderMyShare.defaultProps = {
  parentId: undefined,
};
