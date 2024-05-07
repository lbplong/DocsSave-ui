/** @format */
import {
  Dialog,
  DialogFooter,
  DialogType,
  mergeThemes,
  ThemeProvider,
} from "@fluentui/react";
import React, { useState } from "react";
import { LIGHT_THEME } from "../../constants";
import CustomButton from "../CustomButton";
import PropTypes from "prop-types";

export default function AlertComponent({
  title,
  subText,
  content,
  actionText,
  onClose,
  onAction,
  hideFooter,
}) {
  const [isHidden, setIsHidden] = useState(false);
  const theme = mergeThemes(LIGHT_THEME);
  const _handelDismiss = () => {
    onClose();
    setIsHidden(true);
    onAction();
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        hidden={isHidden}
        onDismiss={_handelDismiss}
        modalProps={{ isBlocking: true }}
        dialogContentProps={{
          type: DialogType.normal,
          title,
          subText,
        }}>
        {content}
        {!hideFooter && (
          <DialogFooter>
            <CustomButton
              primary
              size='medium'
              onClick={_handelDismiss}
              text={actionText}
            />
          </DialogFooter>
        )}
      </Dialog>
    </ThemeProvider>
  );
}
AlertComponent.propTypes = {
  title: PropTypes.string,
  subText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  actionText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  hideFooter: PropTypes.bool,
  onAction: PropTypes.func,
};
AlertComponent.defaultProps = {
  title: "Alert",
  subText: "",
  actionText: "OK",
  content: undefined,
  hideFooter: false,
  onAction: () => true,
};
