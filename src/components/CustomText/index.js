/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Text } from "@fluentui/react";
import { LIGHT_THEME } from "../../constants";

export default function CustomText(props) {
  const { children, styles, color } = props;

  const _getTextColor = theme => {
    if (color === "textSecondary") {
      return theme.palette.neutralSecondaryAlt;
    }
    if (color === "textSecondaryAlt") {
      return theme.palette.neutralQuaternaryAlt;
    }
    if (color === "textDanger") {
      return theme.palette.red;
    }
    if (color === "textSuccess") {
      return theme.palette.green;
    }
    return theme.palette[color];
  };

  return (
    <Text
      {...props}
      styles={{
        ...styles,
        root: {
          color: _getTextColor(LIGHT_THEME),
          overflow: "hidden",
          ...(styles && styles.root),
        },
      }}>
      {children}
    </Text>
  );
}
CustomText.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.object]),
  color: PropTypes.string,
};
CustomText.defaultProps = {
  styles: undefined,
  color: undefined,
};
